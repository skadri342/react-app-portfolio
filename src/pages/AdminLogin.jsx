import { Link, useNavigate } from 'react-router-dom';
import '../css/AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we'll just navigate to the admin panel without authentication
    navigate('/admin-panel');
  };

  return (
    <div className="admin-login">
      <section className="login-section">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <Link to="/" className="back-button">Back to Home</Link>
      </section>
    </div>
  );
}

export default AdminLogin;