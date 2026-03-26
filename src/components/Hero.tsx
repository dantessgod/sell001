import { useTournament } from '../context/TournamentContext';

export default function Hero() {
  const { data } = useTournament();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000005 0%, #020818 50%, #000510 100%)' }}>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Blue glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
        style={{ background: 'radial-gradient(circle, #1d4ed8, transparent)', filter: 'blur(60px)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', filter: 'blur(100px)' }} />

      {/* Diagonal lines decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-24 pb-16">
        {/* Org logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full opacity-40"
              style={{ background: 'radial-gradient(circle, #2563eb, transparent)', filter: 'blur(20px)', transform: 'scale(1.5)' }} />
            <img
              src={data.orgLogo}
              alt="Counter Cup"
              className="relative w-24 h-24 rounded-full object-cover animate-float"
              style={{ border: '2px solid rgba(59,130,246,0.6)', boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
              onError={e => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231e3a8a"/><text y=".9em" font-size="60" x="50%" text-anchor="middle" fill="%2393c5fd">⚡</text></svg>';
              }}
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ background: 'rgba(29,78,216,0.2)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' }}>
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          CS2 TOURNAMENT 2025
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4 text-glow whitespace-pre-line"
          style={{ fontFamily: 'Rajdhani', lineHeight: 0.9 }}>
          {data.name}
        </h1>

        <p className="text-blue-300 text-lg md:text-xl tracking-widest uppercase mb-4">{data.subtitle}</p>

        {/* Prize pool highlight */}
        <div className="inline-block mb-8">
          <div className="px-6 py-3 rounded"
            style={{ background: 'linear-gradient(135deg, rgba(29,78,216,0.3), rgba(37,99,235,0.2))', border: '1px solid rgba(59,130,246,0.4)' }}>
            <span className="text-gray-400 text-sm tracking-widest uppercase">Призовой фонд</span>
            <div className="text-3xl md:text-4xl font-black text-white text-glow" style={{ fontFamily: 'Rajdhani' }}>
              {data.prizePool}
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg card-blue">
            <span className="text-blue-400 text-xl">📅</span>
            <div className="text-left">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Даты</div>
              <div className="text-white font-semibold text-sm">{data.dates}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg card-blue">
            <span className="text-blue-400 text-xl">🎮</span>
            <div className="text-left">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Формат</div>
              <div className="text-white font-semibold text-sm">{data.format}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg card-blue">
            <span className="text-blue-400 text-xl">👥</span>
            <div className="text-left">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Команды</div>
              <div className="text-white font-semibold text-sm">{data.teams.length} команд</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#registration"
            className="px-8 py-3 rounded font-bold text-white uppercase tracking-widest text-sm btn-primary">
            Зарегистрироваться
          </a>
          <a href={data.rulesUrl} target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 rounded font-bold uppercase tracking-widest text-sm btn-outline">
            Правила турнира
          </a>
          <a href={data.twitchUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded font-bold uppercase tracking-widest text-sm text-white"
            style={{ background: 'rgba(145,70,255,0.2)', border: '1px solid rgba(145,70,255,0.4)' }}>
            <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
            </svg>
            Смотреть
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-8 bg-gradient-to-b from-blue-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
