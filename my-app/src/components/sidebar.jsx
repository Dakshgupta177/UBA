import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext.jsx';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div style={{ width: '200px', background: '#eee', padding: '20px' }}>
      <h3>Admin Panel</h3>
      <ul>
        <li>
          <Link to="/admin/notifications">Manage Notifications</Link>
        </li>
        <li>
          <Link to="/admin/articles">Manage Articles</Link>
        </li>
        <li>
          <Link to="/admin/contacts">Manage Contacts</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
