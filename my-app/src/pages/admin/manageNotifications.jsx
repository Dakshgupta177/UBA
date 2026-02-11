import { useEffect, useState } from 'react';
import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../../services/notificationService.js';

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'internal',
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch all notifications
  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.data); // because backend returns { success, data }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateNotification(editingId, formData);
        setEditingId(null);
      } else {
        await createNotification(formData);
      }

      setFormData({ title: '', message: '', type: 'internal' });
      fetchNotifications();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  // Edit
  const handleEdit = (notification) => {
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
    });
    setEditingId(notification._id);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      fetchNotifications();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div>
      <h2>Manage Notifications</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </select>

        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <hr />

      {/* List */}
      {notifications.map((n) => (
        <div
          key={n._id}
          style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}
        >
          <h4>{n.title}</h4>
          <p>{n.message}</p>
          <small>Type: {n.type}</small>
          <br />
          <button onClick={() => handleEdit(n)}>Edit</button>
          <button onClick={() => handleDelete(n._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageNotifications;
