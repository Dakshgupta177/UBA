import api from '../api/axios.js';

const API_URL = '/notifications';

export const getNotifications = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

export const createNotification = async (NotificationData) => {
  const response = await api.post(API_URL, NotificationData);
  return response.data;
};

export const updateNotification = async (id, NotificationData) => {
  const response = await api.put(`${API_URL}/${id}`, NotificationData);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getPublicNotifications = async () => {
  const response = await api.get('/notifications/public');
  return response.data;
};
