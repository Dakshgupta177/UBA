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

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId && editingId !== 'new') {
        await updateNotification(editingId, formData);
      } else {
        await createNotification(formData);
      }

      setEditingId(null);
      setFormData({ title: '', message: '', type: 'internal' });
      fetchNotifications();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (notification) => {
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
    });
    setEditingId(notification._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      fetchNotifications();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* LEFT — Notifications List */}
      <div
        className={`p-6 overflow-y-auto transition-all duration-300 ${
          editingId ? 'w-3/5' : 'w-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Notifications</h2>

          <button
            onClick={() => setEditingId('new')}
            className="bg-black text-white px-4 py-2"
          >
            Create Notification
          </button>
        </div>

        {notifications.map((n) => (
          <div key={n._id} className="border border-black p-3 mb-3">
            <h3 className="font-medium">{n.title}</h3>
            <p className="text-sm">{n.message}</p>
            <p className="text-xs mt-1">Type: {n.type}</p>

            <div className="flex gap-3 mt-3 text-sm">
              <button onClick={() => handleEdit(n)} className="underline">
                Edit
              </button>

              <button onClick={() => handleDelete(n._id)} className="underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      {editingId && <div className="w-px bg-black" />}

      {/* RIGHT — Create / Edit */}
      {editingId && (
        <div className="w-2/5 p-6 transition-all duration-300">
          <form
            onSubmit={handleSubmit}
            className="max-w-md border border-black p-6 flex flex-col gap-4"
          >
            <h2 className="text-lg">
              {editingId === 'new'
                ? 'Create Notification'
                : 'Edit Notification'}
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border border-black p-2 outline-none"
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="border border-black p-2 outline-none resize-none"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-black p-2 bg-white"
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>

            <div className="flex gap-3">
              <button type="submit" className="bg-black text-white px-4 py-2">
                {editingId === 'new' ? 'Create' : 'Update'}
              </button>

              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="border border-black px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageNotifications;
