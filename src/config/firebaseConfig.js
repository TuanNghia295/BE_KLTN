import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn chính xác đến tệp JSON
const serviceAccountPath = path.resolve(__dirname, 'khoaluantotnghiep-f279c-firebase-adminsdk-fbsvc-fe402338be.json');

// Đọc và parse file JSON
let serviceAccount;
try {
  const rawData = fs.readFileSync(serviceAccountPath, 'utf8');
  serviceAccount = JSON.parse(rawData);

  // Xử lý private key
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
} catch (error) {
  console.error('❌ Lỗi khi đọc hoặc parse tệp JSON:', error.message);
  process.exit(1);
}

// Khởi tạo Firebase Admin SDK
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });
  console.log('✅ Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('❌ Lỗi khi khởi tạo Firebase Admin SDK:', error.message);
  process.exit(1);
}

export default admin;
