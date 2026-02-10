import { Link, NavLink, useNavigate } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <aside className="sidebar">
      <h2 className="logo">Admin</h2>

      <nav>
        <NavLink to="/notifications">Notifications</NavLink>
        <NavLink to="/articles">Articles</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
