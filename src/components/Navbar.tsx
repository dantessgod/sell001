import { useState } from 'react';
import { useTournament } from '../context/TournamentContext';

export default function Navbar({ onAdminClick }: { onAdminClick: () => void }) {
  const { data } = useTournament();
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'О турнире', href: '#about' },
    { label: 'Команды', href: '#teams' },
    { label: 'Сетка', href: '#bracket' },
    { label: 'Расписание', href: '#schedule' },
    { label: 'Призы', href: '#prizes' },
    { label: 'Спонсоры', href: '#sponsors' },
    { label: 'Регистрация', href: '#registration' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(0,0,10,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(59,130,246,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img
            src={data.orgLogo}
            alt="Logo"
            className="h-9 w-9 rounded object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="font-bold text-lg tracking-widest text-white" style={{ fontFamily: 'Rajdhani' }}>
            <span className="text-blue-400">COUNTER</span> CUP
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200 tracking-wide">
              {l.label}
            </a>
          ))}
        </div>

        {/* TG Button + Admin */}
        <div className="hidden md:flex items-center gap-3">
          <a href={data.tgChannel} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold text-white btn-primary">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Канал
          </a>
          {/* Admin button */}
          <button onClick={onAdminClick} title="Войти в админ панель"
            className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200 hover:scale-110 group"
            style={{ background: 'rgba(29,78,216,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden text-gray-300 hover:text-blue-400" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ background: 'rgba(0,0,15,0.98)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm text-gray-300 hover:text-blue-400 py-2 border-b border-blue-900/30">
              {l.label}
            </a>
          ))}
          <a href={data.tgChannel} target="_blank" rel="noopener noreferrer"
            className="text-center px-4 py-2 rounded text-sm font-semibold text-white btn-primary mt-2">
            Telegram канал
          </a>
          <button onClick={() => { setOpen(false); onAdminClick(); }}
            className="text-center px-4 py-2 rounded text-sm font-semibold text-gray-500 hover:text-blue-400 mt-1 border border-blue-900/30">
            ⚙ Админ панель
          </button>
        </div>
      )}
    </nav>
  );
}
