import { ApiError } from "../utils/ApiError.js";

export const editorOnly = (req, res, next) => {
  if(!req.user || (req.user.role !== 'editor' && req.user.role !== 'admin')) {
    throw new ApiError(403, 'Access Denied');
  }
  next();
};