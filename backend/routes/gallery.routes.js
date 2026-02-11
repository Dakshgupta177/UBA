import express from 'express';
import { createPost, getAllPosts, deletePost } from "../controllers/gallery.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post('/', upload.single('image'), createPost);
router.get('/', getAllPosts);
router.delete('/:id', deletePost);

export default router;