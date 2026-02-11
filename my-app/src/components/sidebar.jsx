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
    <div className="w-50bg-white border-r border-black p-5 min-h-screen flex flex-col">
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
      <button
        onClick={handleLogout}
        className="mt-auto w-full bg-black text-white py-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
