const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
const { google } = require("googleapis");

const secretsClient = new SecretsManagerClient();

const headers = {
  "Access-Control-Allow-Origin": "https://create.mosip.io", // or your frontend domain
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};


exports.handler = async (event) => {

  // Handle OPTIONS preflight
  if (event.requestContext.http.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "CORS preflight OK" }),
    };
  }


  try {
    // Parse request body
    const data = JSON.parse(event.body || "{}");

    // Required fields
    const requiredFields = [
      "fullName",
      "country",
      "email",
      "organizationName",
      "teamSize",
      "teamName",
      "themeChosen",
      "ideaTitle",
      "ideaDescription",
      "consent",
      "recaptchaToken",
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter((f) => data[f] === undefined || data[f] === null || data[f] === "");
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: `Missing required fields: ${missingFields.join(", ")}`,
        }),
      };
    }

    // Extra validation
    if (typeof data.email !== "string" || !data.email.includes("@")) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email format" }),
      };
    }

    if (typeof data.consent !== "boolean") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "consent must be true/false" }),
      };
    }

    const recaptchaSecretCmd = new GetSecretValueCommand({
      SecretId: "create-recaptcha-secret",
    });
    const recaptchaSecretResp = await secretsClient.send(recaptchaSecretCmd);
    const { secretKey } = JSON.parse(recaptchaSecretResp.SecretString);
    const verifyResp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${data.recaptchaToken}`,
    });

    const verifyResult = await verifyResp.json();
    console.log("reCAPTCHA verification:", verifyResult);
    if (!verifyResult.success || verifyResult.score < 0.5) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: "Failed reCAPTCHA validation" }),
      };
    }


    // Destructure only after validation passes
    const {
      fullName,
      country,
      email,
      organizationName,
      teamSize,
      teamName,
      themeChosen,
      ideaTitle,
      ideaDescription,
      linkedinUrl,
      consent,
      recaptchaToken,
    } = data;

    const command = new GetSecretValueCommand({
      SecretId: "google-sheets-credentials",
    });

    const secretResponse = await secretsClient.send(command);
    const credentials = JSON.parse(secretResponse.SecretString);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: [[fullName,country,email,organizationName,teamSize,teamName,themeChosen,ideaTitle,ideaDescription,linkedinUrl,consent,new Date().toISOString()]],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Error in Lambda:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error",
        details: err.message,
      }),
    };
  }
};
