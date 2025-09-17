const { S3Client } = require("@aws-sdk/client-s3");
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post");
const { v4: uuidv4 } = require("uuid"); // install uuid in your Lambda layer/package
const s3 = new S3Client({ region: process.env.AWS_REGION });
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
    const { fileName, fileType } = JSON.parse(event.body || "{}");
    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "fileName and fileType are required" }),
      };
    }
    const bucketName = process.env.BUCKET_NAME;
    // Generate unique filename: uuid + original name
    const uniqueFileName = `${uuidv4()}-${fileName}`;
    // Max size = 10 MB
    const maxSize = 10 * 1024 * 1024;
    // Generate a presigned POST policy
    const presignedPost = await createPresignedPost(s3, {
      Bucket: bucketName,
      Key: uniqueFileName,
      Fields: {
        "Content-Type": fileType,
      },
      Conditions: [
        ["content-length-range", 0, maxSize],
        ["eq", "$Content-Type", fileType],
      ],
      Expires: 300, // 5 mins
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...presignedPost,
        fileName: uniqueFileName, // return so frontend knows the final stored name
      }),
    };
  } catch (err) {
    console.error("Error generating presigned POST:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate presigned POST" }),
    };
  }
};