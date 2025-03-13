import express from 'express';
import { uploadImg } from '../controllers/uploadController.js';

const uploadRouter = express.Router();

uploadRouter.post('/', uploadImg);

export default uploadRouter;
