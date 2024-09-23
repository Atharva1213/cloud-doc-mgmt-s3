const {PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { AWS_REGION } = require('../constants/constants');
const clientParams = { region: AWS_REGION };
const s3Client = new S3Client(clientParams);
const path = require('path');


async function uploadToS3(bucket, key, fileBuffer, contentTypeReceived) {
    try {
        let contentType;
        if (contentTypeReceived) {
            contentType = contentTypeReceived;
        } else {
            contentType = determineContentTypeFromKey(key);
        }
        const params = {
            Bucket: bucket,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
        };
        if (params.ContentType) {
            params.ContentType = String(params.ContentType);
        }
        const command = new PutObjectCommand(params);
        const uploadResult = await s3Client.send(command);
        return { uploadResult };
    } catch (error) {
        throw error;
    }
}

function determineContentTypeFromKey(key) {
    const ext = path.extname(key);
    const contentTypeMap = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.pdf': 'application/pdf'
    };
    const contentType = contentTypeMap[ext.toLowerCase()] || 'application/octet-stream';
    return contentType;
}

module.exports = {uploadToS3 };
