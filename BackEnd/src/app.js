import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import defaultRoutes from './routes/index.js'; // Đảm bảo đường dẫn chính xác
import connectDB from './config/databse.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const server = createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));
app.use(cookieParser()); // Để đọc cookies

app.use(
  cors({
    origin: 'http://localhost:5173', // Chỉ cho phép frontend truy cập
    credentials: true, // Cho phép gửi cookie
  })
);

connectDB();

// Routes
app.use('/', defaultRoutes);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
