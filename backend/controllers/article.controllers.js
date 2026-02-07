import  {asyncHandler}  from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Article } from "../models/article.model.js";

const createArticle = asyncHandler(async (req, res) => {
  const {title, body, authorId} = req.body;

  if(!title || !body) {
    throw new ApiError(400, "All information is required")
  }

  const article = await Article.create({
    title,
    body,
    authorId: req.user._id
  });
  
  return res.status(201).json({
    success: true,
    data: article,
    message: "Article published"
  });
});

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find().populate("authorId", "name email");

  return res.status(200).json({
    success: true,
    data: articles,
    message: "All articles fetched"
  });
});

const getArticleById = asyncHandler(async (req, res) => {
  const {id} = req.params;

  const article = await Article.findById(id).populate("authorId", "name email");

  if(!article) {
    throw new ApiError(404, "Article not found");
  }

  return res.status(200).json({
    success: true,
    data: article,
    message: "Article fetched"
  });
});

const updateArticle = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const {title, body} = req.body;

  const article = await Article.findByIdAndUpdate(
    id,
    {
      $set: {title, body}
    },
    {new: true}
  );

  if(!article) {
    throw new ApiError(404, "Article not found");
  }

  return res.status(200).json({
    success: true,
    data: article,
    message: "Article updated"
  });
});

const deleteArticle = asyncHandler(async (req, res) => {
  const {id} = req.params;

  const article = await Article.findByIdAndDelete(id);

  if(!article) {
    throw new ApiError(404, "Article not found");
  }

  return res.status(200).json({
    success: true,
    message: "Article deleted"
  });
});

export {createArticle,getAllArticles,getArticleById,updateArticle,deleteArticle};