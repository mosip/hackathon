const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
const { google } = require("googleapis");
const secretsClient = new SecretsManagerClient();

// CORS headers
const headers = {
  "Access-Control-Allow-Origin": "https://create.mosip.io", // or your frontend domain
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

// Helper to validate required fields
function validateFields(data, requiredFields, extraChecks = []) {
  // Find missing fields
  const missingFields = requiredFields.filter(
    (f) => !data[f] || (typeof data[f] === "string" && data[f].trim() === "")
  );

  const errors = [];

  if (missingFields.length) {
    // Capitalize field names for readability
    const formattedFields = missingFields
      .map((f) =>
        f.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
      )
      .join(", ");
    errors.push(`Missing required fields: ${formattedFields}`);
  }

  // Run extra custom checks
  extraChecks.forEach((check) => {
    const error = check(data);
    if (error) errors.push(error);
  });

  return errors;
}

// Helper to format date for Google Sheets
// e.g., "09 September 2023, 03:45:30 PM"
function formatDateForSheet() {
  const now = new Date();
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // AM/PM format
  };
  return now.toLocaleString("en-US", options);
}

// Main Lambda handler
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

    // Decide required fields based on formType
    let requiredFields = [];
    if (data.formType === "registration") {
      requiredFields = [
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
    } else if (data.formType === "submission") {
      requiredFields = [
        "fullName",
        "teamName",
        "email",
        "themeChosen",
        "ideaTitle",
        "ideaDescription",
        "problemChallenge",
        "targetAudience",
        "consent",
        "recaptchaToken",
        "uploadedFiles",
      ];
    } else {
      return {
        statusCode: 400,
        //headers,
        body: JSON.stringify({
          error: "formType must be 'registration' or 'submission'",
        }),
      };
    }

    // Extra validation checks
    const extraChecks = [
      (d) =>
        typeof d.email !== "string" || !d.email.includes("@")
          ? "Invalid email format."
          : null,
      (d) =>
        typeof d.consent !== "boolean"
          ? "Consent must be true or false."
          : null,
      (d) =>
        d.formType === "submission" &&
        (!Array.isArray(d.uploadedFiles) || d.uploadedFiles.length === 0)
          ? "Uploaded files are required."
          : null,
    ];

    const errors = validateFields(data, requiredFields, extraChecks);

    if (errors.length > 0) {
      return {
        statusCode: 400,
        //headers,
        body: JSON.stringify({ error: errors.join(" ") }),
      };
    }

    // Verify reCAPTCHA
    const recaptchaSecretCmd = new GetSecretValueCommand({
      SecretId: "create-recaptcha-secret",
    });
    const recaptchaSecretResp = await secretsClient.send(recaptchaSecretCmd);
    const { secretKey } = JSON.parse(recaptchaSecretResp.SecretString);

    let verifyResult;
    try {
      const verifyResp = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${secretKey}&response=${data.recaptchaToken}`,
        }
      );
      verifyResult = await verifyResp.json();
    } catch (networkErr) {
      console.error("Network error during reCAPTCHA verification:", networkErr);
      return {
        statusCode: 502, // Bad Gateway
        //headers,
        body: JSON.stringify({
          error: "Failed to verify reCAPTCHA. Try again later.",
        }),
      };
    }

    // Check the reCAPTCHA result as before
    if (!verifyResult.success || verifyResult.score < 0.5) {
      return {
        statusCode: 403,
        //headers,
        body: JSON.stringify({ error: "Failed reCAPTCHA validation" }),
      };
    }

    // Google Sheets auth
    const secretResponse = await secretsClient.send(
      new GetSecretValueCommand({ SecretId: "google-sheets-credentials" })
    );
    const credentials = JSON.parse(secretResponse.SecretString);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // Determine spreadsheetId based on formType
    const spreadsheetId = process.env.SPREADSHEET_ID;

    // Append row depending on formType
    if (data.formType === "registration") {
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
      } = data;
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "Sheet1!A1",
          valueInputOption: "RAW",
          requestBody: {
            values: [
              [
                fullName,
                country,
                email,
                organizationName,
                teamSize,
                teamName,
                themeChosen,
                ideaTitle,
                ideaDescription,
                linkedinUrl || "",
                consent,
                formatDateForSheet(),
              ],
            ],
          },
        });
      } catch (sheetErr) {
        console.error(
          "Error appending registration data to Google Sheets:",
          sheetErr
        );
        return {
          statusCode: 500,
          //headers,
          body: JSON.stringify({
            error: "Failed to write registration data to Google Sheets",
          }),
        };
      }
    } else if (data.formType === "submission") {
      const {
        fullName,
        teamName,
        email,
        themeChosen,
        ideaTitle,
        ideaDescription,
        problemChallenge,
        targetAudience,
        additionalComments,
        uploadedFiles,
        consent,
      } = data;
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "Sheet2!A1",
          valueInputOption: "RAW",
          requestBody: {
            values: [
              [
                fullName,
                teamName,
                email,
                themeChosen,
                ideaTitle,
                ideaDescription,
                problemChallenge,
                targetAudience,
                additionalComments || "",
                (uploadedFiles || []).join("; "),
                consent,
                formatDateForSheet(),
              ],
            ],
          },
        });
      } catch (sheetErr) {
        console.error(
          "Error appending submission data to Google Sheets:",
          sheetErr
        );
        return {
          statusCode: 500,
          //headers,
          body: JSON.stringify({
            error: "Failed to write submission data to Google Sheets",
          }),
        };
      }
    }

    return {
      statusCode: 200,
      //headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Error in Lambda:", err);
    return {
      statusCode: 500,
      //headers,
      body: JSON.stringify({
        error: "Server error",
        details: err.message,
      }),
    };
  }
};