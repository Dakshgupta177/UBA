import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//Local
import { connectDB, isDBConnected } from './db/db.js';
import { notificationRouter } from './routes/notification.routes.js';
import articleRouter from './routes/article.routes.js';
import authRouter from './routes/auth.routes.js';
import contactUsRouter from './routes/contactUs.routes.js';
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  }),
);

app.use('/api', notificationRouter, contactUsRouter);
app.use('/api/articles', articleRouter);
app.use('/api/auth', authRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running in port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('DB connection failed', error);
  });
