import express from 'express';
import 'dotenv/config';
import cookieParser from "cookie-parser";

//Local
import { connectDB, isDBConnected } from './db/db.js';
import { notificationRouter } from './routes/notification.routes.js';
import  articleRouter  from './routes/article.routes.js';
import authRouter from './routes/auth.routes.js'

const app = express();

connectDB()
  .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running in port : ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        throw new ApiError(401, "Couldnt Connect with DB!!")
    });

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use('/api', notificationRouter);
app.use('/api/articles', articleRouter);
app.use('/api/auth', authRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
