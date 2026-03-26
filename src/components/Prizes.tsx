import { useTournament } from '../context/TournamentContext';

export default function Prizes() {
  const { data } = useTournament();

  return (
    <section id="prizes" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #020818 0%, #000 100%)' }}>
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1d4ed8, transparent)', filter: 'blur(80px)' }} />

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase text-blue-400 mb-4"
            style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
            НАГРАДЫ
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Rajdhani' }}>
            ПРИЗОВОЙ <span className="text-blue-400">ФОНД</span>
          </h2>
          <p className="text-gray-500">Общий призовой фонд</p>
          <div className="text-5xl font-black text-glow mt-2" style={{ fontFamily: 'Rajdhani', color: '#60a5fa' }}>
            {data.prizePool}
          </div>
          <div className="w-24 h-1 mx-auto rounded mt-4" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
        </div>

        {data.prizes.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <div className="text-4xl mb-4">🏆</div>
            <p>Призы ещё не добавлены</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.prizes.map((prize, i) => {
              const isFirst = i === 0;
              return (
                <div key={i} className={`relative rounded-xl p-6 text-center transition-all duration-300 ${isFirst ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  style={{
                    background: isFirst
                      ? 'linear-gradient(135deg, rgba(29,78,216,0.3), rgba(37,99,235,0.15))'
                      : 'rgba(5,10,30,0.8)',
                    border: isFirst
                      ? '1px solid rgba(59,130,246,0.5)'
                      : '1px solid rgba(59,130,246,0.15)',
                    boxShadow: isFirst ? '0 0 30px rgba(59,130,246,0.15)' : 'none',
                  }}>
                  {isFirst && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                      style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                  )}
                  <div className="text-4xl mb-3">{prize.icon}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-widest mb-2">{prize.place}</div>
                  <div className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Rajdhani', color: isFirst ? '#60a5fa' : '#fff' }}>
                    {prize.amount}
                  </div>
                  <div className="text-gray-500 text-sm">{prize.description}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
