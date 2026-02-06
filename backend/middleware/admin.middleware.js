//Local
import { ApiError } from '../utils/ApiError.js';

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin access only');
  }
  next();
};
