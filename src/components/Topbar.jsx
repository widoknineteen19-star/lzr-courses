import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user?.name || user?.username || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const dateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-date">{dateStr}</span>
      </div>
      <div className="topbar-right">
        <div className="user-info">
          <div className="user-avatar">{initial}</div>
          <span>{displayName}</span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
