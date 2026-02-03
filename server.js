import express from 'express';
import 'dotenv/config';

//Local
import { connectDB, isDBConnected } from './db/db.js';
import { notificationRouter } from './routes/notification.routes.js';

const app = express();

connectDB();

app.use(express.json());
app.use('/api', notificationRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
