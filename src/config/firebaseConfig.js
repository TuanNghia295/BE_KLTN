import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

// Ưu tiên sử dụng biến môi trường nếu có (cho môi trường production)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log('✅ Loaded Firebase config from environment variables');
  } catch (error) {
    console.error('❌ Failed to parse Firebase config from environment variables:', error);
    process.exit(1);
  }
}
// Fallback dùng file JSON (cho môi trường development)
else {
  try {
    const serviceAccountPath = path.resolve(
      __dirname,
      'khoaluantotnghiep-f279c-firebase-adminsdk-fbsvc-fe402338be.json'
    );
    const rawData = fs.readFileSync(serviceAccountPath, 'utf8');
    serviceAccount = JSON.parse(rawData);
    console.log('✅ Loaded Firebase config from JSON file');
  } catch (error) {
    console.error('❌ Failed to load Firebase config from JSON file:', error);
    process.exit(1);
  }
}

// Xử lý private key (cho cả 2 trường hợp)
try {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });
  console.log('🔥 Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);

  // Debug thêm
  if (error.code === 'app/duplicate-app') {
    console.warn('⚠️ Firebase app already exists. Using existing app.');
    admin.app(); // Lấy instance đã tồn tại
  } else {
    console.error('- Private key starts with:', serviceAccount.private_key.substring(0, 30));
    console.error('- Private key ends with:', serviceAccount.private_key.slice(-30));
    console.error('- Contains newlines:', serviceAccount.private_key.includes('\n'));
    process.exit(1);
  }
}

export default admin;
