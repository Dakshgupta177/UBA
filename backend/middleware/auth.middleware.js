import jwt from 'jsonwebtoken';
import 'dotenv/config';

//Local
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asynchandler.js';
import { User } from '../models/user.model.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, 'Not authenticated');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw new ApiError(401, 'User no longer exists');
  }

  req.user = user;

  next();
});
