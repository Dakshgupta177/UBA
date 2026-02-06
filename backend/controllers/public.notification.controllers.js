//Local
import { Notification } from '../models/notification.model.js';
import { asyncHandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiError.js';
import { isDBConnected } from '../db/db.js';

const getPublicNotifications = asyncHandler(async (req, res) => {
  if (!isDBConnected()) {
    throw new ApiError(500, 'Database connection failed');
  }
  const now = new Date();

  const notifications = await Notification.find({
    type: 'external',
    $or: [{ expiresAt: { $exists: false } }, { expiresAt: { $gt: now } }],
  })
    .sort({ createdAt: -1 })
    .select('title message createdAt');

  res.status(200).json({
    success: true,
    notifications,
  });
});

export { getPublicNotifications };
