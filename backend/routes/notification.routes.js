//Core
import express from 'express';

//Local
import {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.controllers.js';
import { getPublicNotifications } from '../controllers/public.notification.controllers.js';
import {authMiddleware} from '../middleware/auth.middleware.js';
import {adminOnly} from '../middleware/admin.middleware.js';

const notificationRouter = express.Router();

notificationRouter.post('/admin/notification',authMiddleware,adminOnly, createNotification);
notificationRouter.get('/admin/notification',authMiddleware,adminOnly, getNotifications);
notificationRouter.put('/admin/notification/:id',authMiddleware,adminOnly, updateNotification);
notificationRouter.delete('/admin/notification/:id',authMiddleware,adminOnly, deleteNotification);

notificationRouter.get('/notification' , getPublicNotifications);

export { notificationRouter };
