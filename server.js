import express from 'express';
import 'dotenv/config';

//Local
import { connectDB, isDBConnected } from './db/db.js';

const app = express();
app.use(express.json());

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
