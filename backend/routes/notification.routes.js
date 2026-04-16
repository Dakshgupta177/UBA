import express from 'express';
import {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.controllers.js';

import { getPublicNotifications } from '../controllers/public.notification.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/public', getPublicNotifications);
router.get('/', authMiddleware, adminOnly, getNotifications);
router.post('/', authMiddleware, adminOnly, createNotification);
router.put('/:id', authMiddleware, adminOnly, updateNotification);
router.delete('/:id', authMiddleware, adminOnly, deleteNotification);

export default router;
