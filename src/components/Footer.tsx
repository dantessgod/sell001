import { useTournament } from '../context/TournamentContext';

export default function Footer({ onAdminClick }: { onAdminClick: () => void }) {
  const { data } = useTournament();

  const navLinks = [
    { label: 'О турнире', href: '#about' },
    { label: 'Команды', href: '#teams' },
    { label: 'Сетка', href: '#bracket' },
    { label: 'Расписание', href: '#schedule' },
    { label: 'Призы', href: '#prizes' },
    { label: 'Спонсоры', href: '#sponsors' },
    { label: 'Регистрация', href: '#registration' },
  ];

  return (
    <footer className="relative pt-16 pb-8" style={{ background: '#000005', borderTop: '1px solid rgba(59,130,246,0.15)' }}>
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={data.orgLogo}
                alt="Counter Cup"
                className="w-10 h-10 rounded object-cover"
                style={{ border: '1px solid rgba(59,130,246,0.4)' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: 'Rajdhani' }}>
                <span className="text-blue-400">COUNTER</span> CUP
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{data.subtitle}</p>

            {/* Social */}
            <div className="flex gap-3">
              {/* Telegram */}
              <a href={data.tgChannel} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(29,78,216,0.2)', border: '1px solid rgba(59,130,246,0.3)' }}
                title="Telegram канал">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              {/* Twitch */}
              <a href={data.twitchUrl} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(145,70,255,0.15)', border: '1px solid rgba(145,70,255,0.3)' }}
                title="Twitch">
                <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5" style={{ fontFamily: 'Rajdhani' }}>
              Навигация
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-800" />
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={data.rulesUrl} target="_blank" rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-800" />
                  Правила турнира
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5" style={{ fontFamily: 'Rajdhani' }}>
              Контакт
            </h4>
            <div className="space-y-3">
              <a href={`https://t.me/${data.tgContact.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider">Telegram</div>
                  <div className="text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-colors">{data.tgContact}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6" style={{ borderTop: '1px solid rgba(59,130,246,0.1)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-700 text-xs">
              © 2025 Counter Cup. Все права защищены.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs text-gray-700">Регистрация открыта</span>
              </div>
              <button onClick={onAdminClick}
                className="flex items-center justify-center w-6 h-6 text-gray-700 hover:text-blue-400 transition-colors duration-200 group"
                title="Панель администратора"
                aria-label="Панель администратора">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
