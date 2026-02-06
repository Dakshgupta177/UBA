import express from 'express';
import { createPost, getAllPosts, deletePost } from "../controllers/gallery.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post('/gallery', upload.single('image'), createPost);
router.get('/gallery', getAllPosts);
router.delete('/gallery/:id', deletePost);

export default router;