import { useState, memo, useCallback } from 'react';
import { useTournament } from '../context/TournamentContext';
import InfoEditor from './admin/InfoEditor';
import TeamsEditor from './admin/TeamsEditor';
import BracketEditor from './admin/BracketEditor';
import ScheduleEditor from './admin/ScheduleEditor';
import PrizesEditor from './admin/PrizesEditor';
import SponsorsEditor from './admin/SponsorsEditor';

const TABS = [
  {
    id: 'info', label: 'Информация', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'teams', label: 'Команды', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    id: 'bracket', label: 'Сетка', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: 'schedule', label: 'Расписание', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'prizes', label: 'Призы', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'sponsors', label: 'Спонсоры', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
];

// Sidebar — отдельный мемоизированный компонент, не зависит от данных турнира
const Sidebar = memo(function Sidebar({
  tab, setTab, sidebarOpen, stats
}: {
  tab: string;
  setTab: (t: string) => void;
  sidebarOpen: boolean;
  stats: { label: string; value: number; color: string }[];
}) {
  return (
    <aside className={`flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-0'} overflow-hidden`}
      style={{ background: 'rgba(1,5,20,0.9)', borderRight: '1px solid rgba(59,130,246,0.1)' }}>
      <div className="w-56 h-full flex flex-col py-4">
        <nav className="flex-1 px-2 space-y-0.5">
          <p className="text-xs text-gray-700 font-bold uppercase tracking-widest px-3 mb-3">Управление</p>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all duration-150 group ${tab === t.id
                ? 'text-white bg-blue-900/40 border border-blue-700/30'
                : 'text-gray-500 hover:text-gray-200 hover:bg-blue-900/10 border border-transparent'
                }`}>
              <span className={`flex-shrink-0 ${tab === t.id ? 'text-blue-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                {t.icon}
              </span>
              <span>{t.label}</span>
              {tab === t.id && <span className="ml-auto w-1 h-4 rounded-full bg-blue-500" />}
            </button>
          ))}
        </nav>

        <div className="px-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(59,130,246,0.08)' }}>
          <p className="text-xs text-gray-700 font-bold uppercase tracking-widest mb-3">Статистика</p>
          <div className="space-y-2">
            {stats.map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-gray-600 text-xs">{s.label}</span>
                <span className={`text-xs font-black ${s.color}`} style={{ fontFamily: 'Rajdhani' }}>{s.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-500/70 text-xs">Авто-сохранение</span>
          </div>
        </div>
      </div>
    </aside>
  );
});

export default function AdminPanel({ onLogout, onViewSite }: { onLogout: () => void; onViewSite: () => void }) {
  const [tab, setTab] = useState('info');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data } = useTournament();

  const currentTab = TABS.find(t => t.id === tab);

  const stats = [
    { label: 'Команды', value: data.teams.length, color: 'text-blue-400' },
    { label: 'Матчи', value: data.matches.length, color: 'text-cyan-400' },
    { label: 'Призы', value: data.prizes.length, color: 'text-indigo-400' },
    { label: 'Спонсоры', value: data.sponsors.length, color: 'text-sky-400' },
  ];

  const handleToggleSidebar = useCallback(() => setSidebarOpen(o => !o), []);
  const handleSetTab = useCallback((t: string) => setTab(t), []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#020818' }}>
      {/* ── Topbar ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 h-14 flex-shrink-0"
        style={{ background: 'rgba(2,8,24,0.98)', borderBottom: '1px solid rgba(59,130,246,0.15)', backdropFilter: 'blur(12px)' }}>

        <div className="flex items-center gap-3">
          <button onClick={handleToggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-black text-white text-sm tracking-widest uppercase" style={{ fontFamily: 'Rajdhani' }}>
              <span className="text-blue-400">Counter Cup</span>
              <span className="text-gray-600 mx-2">·</span>
              <span className="text-gray-300">Admin</span>
            </span>
          </div>

          {currentTab && (
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-400">{currentTab.label}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onViewSite}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 border border-blue-800/40 hover:bg-blue-900/20 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Просмотр сайта
          </button>
          <button onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 border border-red-900/30 hover:bg-red-900/20 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <Sidebar tab={tab} setTab={handleSetTab} sidebarOpen={sidebarOpen} stats={stats} />

        {/* ── Main content ── */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-8">
            {tab === 'info' && <InfoEditor />}
            {tab === 'teams' && <TeamsEditor />}
            {tab === 'bracket' && <BracketEditor />}
            {tab === 'schedule' && <ScheduleEditor />}
            {tab === 'prizes' && <PrizesEditor />}
            {tab === 'sponsors' && <SponsorsEditor />}
          </div>
        </main>
      </div>
    </div>
  );
}
