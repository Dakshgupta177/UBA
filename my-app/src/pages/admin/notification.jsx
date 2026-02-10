import { useEffect, useState } from 'react';
import {
  getNotifications,
  deleteNotification,
} from '../../services/notificationService';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      alert('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this notification?')) return;

    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>Manage Notifications</h2>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map((n) => (
        <div key={n._id} className="card">
          <h4>{n.title}</h4>
          <p>{n.message}</p>
          <button onClick={() => handleDelete(n._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
