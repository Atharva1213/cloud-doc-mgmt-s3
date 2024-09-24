# Cloud-Based Document Management System with AWS S3 Integration

A simple cloud-based document management system that allows users to upload, view, and manage documents stored in AWS S3. The system includes file upload functionality, document listing, and basic access management using AWS services.

## Features
- Upload documents to AWS S3.
- View a list of uploaded documents.
- Download and delete documents from AWS S3.
- Basic user interface for managing documents.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Storage:** AWS S3
- **Database:** (Optional) DynamoDB or PostgreSQL for metadata
- **Hosting:** AWS EC2 (or any hosting service)

---

## Prerequisites

Before running the project, make sure you have the following:

1. **AWS Account**: Set up an AWS account with S3 bucket access and necessary IAM permissions.
2. **AWS CLI**: Installed and configured with your AWS credentials.
3. **Node.js**: Ensure you have Node.js installed (v14 or later).
4. **React.js**: Basic knowledge for frontend setup.
5. **AWS SDK**: Install AWS SDK for Node.js to interact with AWS S3.

---

## Project Setup

### 1. Clone the Repositories
```bash
git clone https://github.com/your-username/cloud-doc-mgmt-s3.git
cd cloud-doc-mgmt-s3
```
First Copy SampleEnvFrontend And Replace With Original Value
#### Frontend (Client-Side):
```bash
cd cloud-doc-mgmt-client
npm install 
npm run dev
```

First Copy SampleEnvBackend And Replace With Original Value
#### 2. Backend Setup

Navigate to the backend directory:
```bash
cd cloud-doc-mgmt-s3-server
npm install
nodemon app.js 
```

Install the dependencies:

```bash
npm install
```

Create a .env file in the root of the backend folder and add the following environment variables:

env
```bash
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
```

Start the backend server:

```bash
npm start
```

By default, the backend will run on http://localhost:5000.

#### 3. Frontend Setup 

Navigate to the frontend directory:

```bash
cd cloud-doc-mgmt-client
```

Install the dependencies:

```bash
npm install
```

Set up the environment file (.env) in the frontend directory and configure it with the backend URL:

env
```bash
REACT_APP_BACKEND_URL=http://localhost:5000
```

Start the frontend app:

```bash
npm start
```
The app will run on http://localhost:3000.

## Usage

Once both frontend and backend servers are running:

1. Open `http://localhost:3000` in your browser.
2. Use the UI to upload documents to AWS S3.
3. View, download, and delete documents directly from the frontend.

## AWS S3 Setup

### Create an S3 Bucket:
1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/home) and create a new bucket.
2. Set the bucket permissions to allow access for uploading and downloading files as required.

### IAM User:
1. Create an IAM user with `AmazonS3FullAccess` permission (or restrict permissions to the specific bucket).
2. Obtain the **Access Key ID** and **Secret Access Key** for use in the `.env` file.

## API Endpoints

### Upload File
- **URL:** `/api/upload`
- **Method:** `POST`
- **Description:** Uploads a file to the S3 bucket.

### List Files
- **URL:** `/api/files`
- **Method:** `GET`
- **Description:** Retrieves a list of all files in the S3 bucket.

### Download File
- **URL:** `/api/files/:filename`
- **Method:** `GET`
- **Description:** Downloads a specific file from the S3 bucket.

### Delete File
- **URL:** `/api/files/:filename`
- **Method:** `DELETE`
- **Description:** Deletes a specific file from the S3 bucket.

## Additional Notes

- **Security:** Ensure your AWS credentials and bucket policies are properly set to secure access.
- **Error Handling:** Implement error handling for operations like failed uploads or invalid file formats.
- **Scaling:** This project can be scaled by adding user authentication, using AWS IAM roles, and integrating more AWS services like DynamoDB for metadata storage.
