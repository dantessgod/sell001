import { useTournament } from '../context/TournamentContext';

export default function Sponsors() {
  const { data } = useTournament();

  if (data.sponsors.length === 0) return null;

  const mainSponsors = data.sponsors.filter(s => s.tier === 'main');
  const partnerSponsors = data.sponsors.filter(s => s.tier === 'partner');
  const infoSponsors = data.sponsors.filter(s => s.tier === 'info');

  return (
    <section id="sponsors" className="py-20 relative" style={{ background: '#000' }}>
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="relative max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase text-blue-400 mb-4"
            style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
            ПОДДЕРЖКА
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Rajdhani' }}>
            НАШИ <span className="text-blue-400">СПОНСОРЫ</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
        </div>

        {/* Main sponsors */}
        {mainSponsors.length > 0 && (
          <div className="mb-10">
            <div className="text-center text-xs text-blue-500 tracking-widest uppercase mb-6">Генеральный спонсор</div>
            <div className="flex flex-wrap justify-center gap-6">
              {mainSponsors.map(s => (
                <a key={s.id} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300"
                  style={{ background: 'rgba(5,10,30,0.9)', border: '1px solid rgba(59,130,246,0.3)', minWidth: '180px' }}>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)', filter: 'blur(10px)' }} />
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="h-16 w-auto object-contain rounded"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <span className="text-white font-bold tracking-wider text-sm group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Rajdhani' }}>
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Partner sponsors */}
        {partnerSponsors.length > 0 && (
          <div className="mb-8">
            <div className="text-center text-xs text-blue-500 tracking-widest uppercase mb-6">Партнёры</div>
            <div className="flex flex-wrap justify-center gap-4">
              {partnerSponsors.map(s => (
                <a key={s.id} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300"
                  style={{ background: 'rgba(5,10,30,0.8)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="h-8 w-auto object-contain rounded"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="text-gray-300 font-semibold text-sm group-hover:text-blue-400 transition-colors">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Info sponsors */}
        {infoSponsors.length > 0 && (
          <div>
            <div className="text-center text-xs text-blue-500 tracking-widest uppercase mb-6">Информационные партнёры</div>
            <div className="flex flex-wrap justify-center gap-3">
              {infoSponsors.map(s => (
                <a key={s.id} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded transition-all duration-300"
                  style={{ background: 'rgba(5,10,30,0.6)', border: '1px solid rgba(59,130,246,0.15)' }}>
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="h-5 w-auto object-contain rounded"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="text-gray-500 text-xs group-hover:text-blue-400 transition-colors">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
