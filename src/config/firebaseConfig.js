import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccountJsonString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON;

if (!serviceAccountJsonString) {
  console.error('Firebase service account key JSON not found in environment variables.');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountJsonString);
} catch (error) {
  console.error('Failed to parse Firebase service account key JSON:', error);
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
