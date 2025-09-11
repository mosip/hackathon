# 📂 AWS Lambda File Upload to S3 (Presigned POST)

This project demonstrates how to build an AWS Lambda function that generates **presigned POST URLs** for uploading files directly from the browser to Amazon S3.
It includes:

* Unique filenames (`uuid`)
* File size restriction (e.g., max 10 MB)
* File type restriction (`Content-Type`)
* CORS-ready responses

---

## 🚀 Setup Instructions

### 1. Prerequisites

* AWS account with:

  * **S3 bucket** created
  * **Lambda** permissions to access S3
* AWS CLI installed and configured (`aws configure`)
* Node.js v18+ installed locally

---

### 2. Project Structure

```
lambda-upload/
 ├── index.js
 ├── package.json
 ├── package-lock.json
 └── node_modules/
```

---

Install dependencies:

```bash
npm install
```

---

### 5. Package and Deploy

Zip your code + dependencies:

```bash
zip -r function.zip index.js package.json package-lock.json node_modules
```

Create Lambda function (if not already created):

```bash
aws lambda create-function \
  --function-name fileUploadLambda \
  --runtime nodejs18.x \
  --role arn:aws:iam::<ACCOUNT_ID>:role/<LAMBDA_ROLE> \
  --handler index.handler \
  --zip-file fileb://function.zip
```

Or update existing:

```bash
aws lambda update-function-code \
  --function-name fileUploadLambda \
  --zip-file fileb://function.zip
```

Set environment variables:

```bash
aws lambda update-function-configuration \
  --function-name fileUploadLambda \
  --environment "Variables={BUCKET_NAME=my-upload-bucket,AWS_REGION=ap-south-1}"
```

---

### 6. Test With Frontend

```html
<input type="file" id="fileInput" />

<script>
async function uploadFile(file) {
  // 1. Request presigned URL from Lambda
  const res = await fetch("YOUR_LAMBDA_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: file.name, fileType: file.type }),
  });

  const { url, fields, fileName: storedName } = await res.json();

  // 2. Upload directly to S3
  const formData = new FormData();
  Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
  formData.append("file", file);

  const upload = await fetch(url, { method: "POST", body: formData });

  if (upload.ok) {
    alert(`✅ File uploaded as ${storedName}`);
  } else {
    alert("❌ Upload failed");
  }
}

document.getElementById("fileInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) uploadFile(file);
});
</script>
```

---

## 🔒 Notes

* **File size & type** are enforced by S3 (rejects invalid uploads).
* All uploaded files are uniquely named using `uuid`.
* Set up proper **IAM permissions**: Lambda needs `s3:PutObject` on your bucket.
* Enable **CORS** on your S3 bucket if frontend needs to fetch the file later.




