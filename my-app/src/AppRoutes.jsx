import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Articles from './pages/admin/articles.jsx';
import Notifications from './pages/admin/notification.jsx';
import Contacts from './pages/admin/contact.jsx';
import Login from './pages/auth/login.jsx';
import ProtectedRoute from './routes/protectedRoute.jsx';

export default function AppRoutes() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login';

  return (
    <>
      {!hideSidebar && <Sidebar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <Articles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/notifications" replace />} />
      </Routes>
    </>
  );
}
