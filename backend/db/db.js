import mongoose from 'mongoose';

//use isDBConnected later
let dbConnected = false;

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    dbConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    dbConnected = false;
    console.log('MongoDB connection failed', error);
  }
};

export const isDBConnected = () => dbConnected;
