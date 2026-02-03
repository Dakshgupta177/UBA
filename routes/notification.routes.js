//Core
import express from 'express';

//Local
import {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.controllers.js';

const notificationRouter = express.Router();

notificationRouter.post('/admin/notification', createNotification);
notificationRouter.get('/admin/notification', getNotifications);
notificationRouter.put('/admin/notification/:id', updateNotification);
notificationRouter.delete('/admin/notification/:id', deleteNotification);

export { notificationRouter };
