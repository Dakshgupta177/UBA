import Sidebar from '../../components/sidebar.jsx';
import { Routes, Route } from 'react-router-dom';
import ManageNotifications from './manageNotifications.jsx';
import ManageArticles from './manageArticles.jsx';
import ManageContacts from './manageContacts.jsx';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '20px', flex: 1 }}>
        <Routes>
          <Route path="/" element={<h2>Welcome Admin</h2>} />
          <Route path="notifications" element={<ManageNotifications />} />
          <Route path="articles" element={<ManageArticles />} />
          <Route path="contacts" element={<ManageContacts />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
