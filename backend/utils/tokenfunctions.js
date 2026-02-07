import jwt from 'jsonwebtoken';
import 'dotenv/config';

//Local
import { ApiError } from './ApiError.js';
import asyncHandler from './asynchandler.js';

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
const getIdfromToken = async (token) => {
  if (!token) {
    throw new ApiError(404, 'UnAuthorized');
  }

  try {
    const userid = jwt.decode(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(400, "Couldn't get an id");
  }
};

export { generateToken, getIdfromToken };
