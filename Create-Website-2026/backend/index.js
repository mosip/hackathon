const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
const { google } = require("googleapis");

const secretsClient = new SecretsManagerClient();

exports.handler = async (event) => {
  try {
    const { fullName,country,email,organizationName,teamSize,teamName,themeChosen,ideaTitle,ideaDescription,linkedinUrl,consent } = JSON.parse(event.body);

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
        values: [[fullName,country,email,organizationName,teamSize,teamName,themeChosen,ideaTitle,ideaDescription,linkedinUrl,consent, new Date().toISOString()]],
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
