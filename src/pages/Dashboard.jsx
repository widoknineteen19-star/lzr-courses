import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const displayName = user?.name || user?.username || 'User';

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>60</h3>
            <p>Courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{isAdmin ? '72' : '12'}</h3>
            <p>Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{isAdmin ? '486' : '28'}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h2>Selamat Datang, {displayName}!</h2>
        <p>
          {isAdmin
            ? 'Selamat datang di panel Admin. Kelola courses, lihat statistik, dan pantau aktivitas siswa di sini.'
            : 'Lanjutkan perjalanan belajarmu. Pilih course yang ingin kamu ikuti di menu Courses. Tingkatkan skill coding-mu bersama LMS Courses.'}
        </p>
      </div>
    </>
  );
}
