import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    api
      .get('/api/auth/me') // backend route that returns logged-in user
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
