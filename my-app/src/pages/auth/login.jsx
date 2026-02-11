import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { AuthContext } from '../../context/authContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/login', { email, password });

      const res = await API.get('/auth/me');
      setUser(res.data.user);

      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        alert('Not an admin');
      }
    } catch (err) {
      console.log('LOGIN ERROR:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="w-75 border border-black p-8 flex flex-col gap-4"
      >
        <h2 className="text-center text-lg font-medium">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black p-2 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black p-2 outline-none"
        />

        <button
          type="submit"
          className="bg-black text-white py-2 hover:opacity-80"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
