//Local
import { Notification } from '../models/notification.model.js';
import asyncHandler from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiError.js';
import { isDBConnected } from '../db/db.js';
import { User } from '../models/user.model.js';

const createNotification = asyncHandler(async (req, res, next) => {
  if (!isDBConnected()) {
    throw new ApiError(500, 'Database connection failed');
  }

  const { title, message, type } = req.body;

  const missingField = ['title', 'message', 'type'].find(
    (key) => !req.body[key] || req.body[key].trim() === '',
  );

  if (missingField) throw new ApiError(400, `${missingField} is required`);

  const notification = await Notification.create({
    title,
    message,
    type,
    createdBy: req.user._id,
  });

  return res.status(201).json({
    success: true,
    data: notification,
    message: 'Notification posted',
  });
});

const getNotifications = asyncHandler(async (req, res, next) => {
  if (!isDBConnected()) {
    throw new ApiError(500, 'Database connection failed');
  }
  //filtering by type
  const filter = {};
  if (req.query.type) {
    const validTypes = ['internal', 'external'];
    if (!validTypes.includes(req.query.type)) {
      throw new ApiError(400, 'Invalid type value');
    }
    filter.type = req.query.type;
  }

  const notifications = await Notification.find(filter)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: notifications,
    message: 'All Notification Listed',
  });
});

const updateNotification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const allowedFields = ['title', 'message', 'type', 'expiresAt'];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, 'No valid fields to update');
  }

  const notification = await Notification.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  res.status(200).json({
    success: true,
    message: 'Message Updated',
    notification,
  });
});

const deleteNotification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const notification = await Notification.findByIdAndDelete(id);

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  res.status(200).json({
    success: true,
    message: 'Notification deleted',
  });
});

export {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
};
