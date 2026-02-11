import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import { connectDB } from './db/db.js';
import { notificationRouter } from './routes/notification.routes.js';
import articleRouter from './routes/article.routes.js';
import galleryRouter from './routes/gallery.routes.js';

import authRouter from './routes/auth.routes.js';
import contactUsRouter from './routes/contactUs.routes.js';
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use('/api/notifications', notificationRouter);
app.use('/api/contact', contactUsRouter);
app.use('/api/articles', articleRouter);
app.use('/api/auth', authRouter);
app.use('/api/gallery', galleryRouter);

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Express Error:", error);
    });

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed !!! ", err);
  });
