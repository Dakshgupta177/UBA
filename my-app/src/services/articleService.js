import API from '../api/axios';

const API_URL = '/api/articles';

export const getArticles = async () => {
  const response = await API.get(API_URL);
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await API.get(`${API_URL}/${id}`);
  return response.data;
};

export const createArticle = async (articleData) => {
  const response = await API.post(API_URL, articleData);
  return response.data;
};

export const updateArticle = async (id, articleData) => {
  const response = await API.put(`${API_URL}/${id}`, articleData);
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await API.delete(`${API_URL}/${id}`);
  return response.data;
};
