import { useState, useCallback, memo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Teams from './components/Teams';
import Bracket from './components/Bracket';
import Schedule from './components/Schedule';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import Registration from './components/Registration';
import Footer from './components/Footer';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

export type AppPage = 'site' | 'login' | 'admin';

// memo чтобы MainSite не ре-рендерился при смене page
const MainSite = memo(function MainSite({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <div style={{ background: '#000' }}>
      <Navbar onAdminClick={onAdminClick} />
      <Hero />
      <About />
      <Teams />
      <Bracket />
      <Schedule />
      <Prizes />
      <Sponsors />
      <Registration />
      <Footer onAdminClick={onAdminClick} />
    </div>
  );
});

export default function App() {
  const [page, setPage] = useState<AppPage>('site');

  const goToLogin = useCallback(() => setPage('login'), []);
  const goToAdmin = useCallback(() => setPage('admin'), []);
  const goToSite = useCallback(() => setPage('site'), []);

  return (
    <>
      <div style={{ display: page === 'site' ? 'block' : 'none' }}>
        <MainSite onAdminClick={goToLogin} />
      </div>
      {page === 'login' && <Login onSuccess={goToAdmin} onBack={goToSite} />}
      {page === 'admin' && <AdminPanel onLogout={goToLogin} onViewSite={goToSite} />}
    </>
  );
}
