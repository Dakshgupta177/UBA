import express from 'express'
import { createArticle, updateArticle, deleteArticle, getAllArticles, getArticleById } from "../controllers/article.controllers.js";
import {authMiddleware} from '../middleware/auth.middleware.js';
import {editorOnly} from '../middleware/editor.middleware.js';


const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);

router.post('/', authMiddleware, editorOnly, createArticle);
router.put('/:id', authMiddleware, editorOnly, updateArticle);
router.delete('/:id', authMiddleware, editorOnly, deleteArticle);

export default router;