import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('lzr_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Demo: any credentials work. Email containing "admin" → admin role
    const name = email.split('@')[0];
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    const userData = { email, name, role };
    localStorage.setItem('lzr_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = (name, username, password) => {
    const userData = { name, username, role: 'user' };
    localStorage.setItem('lzr_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('lzr_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
