import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

//Local
import { connectDB, isDBConnected } from './db/db.js';
import { notificationRouter } from './routes/notification.routes.js';
import articleRouter from './routes/article.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', notificationRouter);
app.use('/api/articles', articleRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT || 8000, () => {
      console.log(`Server is running in port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('DB connection failed', error);
  });
