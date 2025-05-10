import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const serviceAccountFilePath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON;

if (!serviceAccountFilePath) {
  console.error('Firebase service account key file path not found in environment variables.');
  process.exit(1);
}

let serviceAccount;
try {
  const serviceAccountContent = fs.readFileSync(serviceAccountFilePath, 'utf8');
  serviceAccount = JSON.parse(serviceAccountContent);
} catch (error) {
  console.error('Failed to read or parse Firebase service account key file:', error);
  process.exit(1);
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Firebase Admin SDK initialization failed:', error);
  process.exit(1);
}

export default admin;
