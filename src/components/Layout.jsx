import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-page">
        <div style={{ color: 'var(--yellow)' }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="page-content">
          <Outlet />
        </main>
        <footer className="page-footer">copyright © 2025 LMS Courses</footer>
      </div>
    </div>
  );
}
