import { useTournament } from '../context/TournamentContext';

export default function Teams() {
  const { data } = useTournament();

  return (
    <section id="teams" className="py-24 relative" style={{ background: '#000' }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase text-blue-400 mb-4"
            style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
            УЧАСТНИКИ
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Rajdhani' }}>
            КОМАНДЫ <span className="text-blue-400">ТУРНИРА</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
        </div>

        {data.teams.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <div className="text-4xl mb-4">👥</div>
            <p>Команды ещё не добавлены</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.teams.map((team, i) => (
              <div key={team.id} className="group p-6 rounded-lg card-blue transition-all duration-300 text-center cursor-default">
                <div className="text-4xl mb-3">{team.logo}</div>
                <div className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Rajdhani' }}>
                  {team.name}
                </div>
                {team.country && (
                  <div className="text-xs text-blue-400 tracking-wider mt-1 uppercase">{team.country}</div>
                )}
                {team.players && (
                  <div className="text-gray-600 text-xs mt-2 leading-relaxed">
                    {team.players.split(',').slice(0, 5).map(p => p.trim()).join(' · ')}
                  </div>
                )}
                <div className="mt-3 text-xs text-gray-600">#{i + 1} слот</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
