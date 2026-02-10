import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // axios instance

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/api/auth/login', { email, password });

      if (res.data.success) {
        // Login succeeded, navigate to notifications
        navigate('/notifications');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
