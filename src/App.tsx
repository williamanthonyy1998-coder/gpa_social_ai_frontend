import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { api } from './lib/api';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import AccountsPage from './pages/AccountsPage';
import ContentStudioPage from './pages/ContentStudioPage';
export type CurrentUser = { id: string; name: string; email: string; organizationId: string; roles: string[]; permissions: string[] };
export default function App() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [checking, setChecking] = useState(true);
  useEffect(() => { api<CurrentUser>('/auth/me').then(setUser).catch(() => setUser(null)).finally(() => setChecking(false)); }, []);
  if (checking) return <div className="loading-screen">Loading GPA Social AI…</div>;
  return <Routes>
    <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage onLogin={setUser} />} />
    <Route path="/users" element={user ? <UsersPage user={user} /> : <Navigate to="/login" replace />} />
    <Route path="/accounts" element={user ? <AccountsPage user={user} /> : <Navigate to="/login" replace />} />
    <Route path="/content" element={user ? <ContentStudioPage user={user} /> : <Navigate to="/login" replace />} />
    <Route path="/*" element={user ? <DashboardPage user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" replace />} />
  </Routes>;
}
