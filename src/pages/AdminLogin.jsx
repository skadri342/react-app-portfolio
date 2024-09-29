import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending password:', password); // Log the password being sent
      const response = await axios.post('http://localhost:3000/api/auth/login', { username, password, twoFactorToken });
      localStorage.setItem('token', response.data.token);
      navigate('/admin-panel');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'An error occurred. Check console for details.');
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="2FA Token"
          value={twoFactorToken}
          onChange={(e) => setTwoFactorToken(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
}

export default AdminLogin;