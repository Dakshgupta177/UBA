import express from 'express'
import { createArticle, updateArticle, deleteArticle, getAllArticles, getArticleById } from "../controllers/article.controllers";

const router = express.Router();

router.post('/', createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;