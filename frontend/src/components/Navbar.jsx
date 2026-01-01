import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout as logoutService } from '../services/authService';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutService();
      logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to={isAdmin ? '/admin/dashboard' : '/profile'} className="navbar-brand">
            User Management
          </Link>

          <div className="navbar-user">
            <div className="nav-links">
              {isAdmin && (
                <Link to="/admin/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </div>

            <div className="user-info">
              <span className="user-name">{user?.fullName}</span>
              <span className={`user-role role-${user?.role}`}>
                {user?.role}
              </span>
            </div>

            <button onClick={handleLogout} className="btn btn-secondary btn-small">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
