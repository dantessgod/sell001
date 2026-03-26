import { useTournament } from '../context/TournamentContext';

export default function Schedule() {
  const { data } = useTournament();

  const days: { [key: string]: typeof data.matches } = {};
  data.matches.forEach(m => {
    if (!days[m.day]) days[m.day] = [];
    days[m.day].push(m);
  });

  const sortedDays = Object.keys(days).sort();

  const platformIcon = (p: string) => {
    if (p?.toLowerCase().includes('twitch')) return (
      <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
    );
    return <span className="text-xs">📡</span>;
  };

  return (
    <section id="schedule" className="py-24 relative" style={{ background: '#000' }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase text-blue-400 mb-4"
            style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
            РАСПИСАНИЕ
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Rajdhani' }}>
            МАТЧИ <span className="text-blue-400">ТУРНИРА</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
        </div>

        {sortedDays.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <div className="text-4xl mb-4">📅</div>
            <p>Расписание ещё не добавлено</p>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedDays.map(day => (
              <div key={day}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-4 py-2 rounded font-bold tracking-widest uppercase text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', fontFamily: 'Rajdhani' }}>
                    {day}
                  </div>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.4), transparent)' }} />
                </div>

                <div className="space-y-3">
                  {days[day].map(match => {
                    const played = match.score1 !== null && match.score2 !== null;
                    return (
                      <div key={match.id} className="rounded-lg card-blue transition-all duration-300 overflow-hidden">
                        <div className="flex items-center gap-4 p-4">
                          {/* Time */}
                          <div className="text-center flex-shrink-0 w-14">
                            <div className="text-blue-400 font-bold text-lg" style={{ fontFamily: 'Rajdhani' }}>{match.time}</div>
                          </div>

                          {/* Divider */}
                          <div className="w-px h-10 bg-blue-900/50" />

                          {/* Match */}
                          <div className="flex-1 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1">
                              <span className={`font-semibold text-right flex-1 ${played && match.score1! > match.score2! ? 'text-white' : 'text-gray-400'}`}>
                                {match.team1 || 'TBD'}
                              </span>
                              <div className="flex-shrink-0">
                                {played ? (
                                  <span className="text-sm font-black text-blue-400 px-3 py-1 rounded"
                                    style={{ background: 'rgba(29,78,216,0.2)', fontFamily: 'Rajdhani' }}>
                                    {match.score1} : {match.score2}
                                  </span>
                                ) : (
                                  <span className="text-gray-600 text-sm px-3">VS</span>
                                )}
                              </div>
                              <span className={`font-semibold flex-1 ${played && match.score2! > match.score1! ? 'text-white' : 'text-gray-400'}`}>
                                {match.team2 || 'TBD'}
                              </span>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="w-px h-10 bg-blue-900/50" />

                          {/* Round + Platform */}
                          <div className="flex-shrink-0 text-right">
                            <div className="text-xs text-blue-500 uppercase tracking-wider">{match.round}</div>
                            {match.platform && (
                              <div className="flex items-center gap-1 justify-end mt-1">
                                {platformIcon(match.platform)}
                                <span className="text-xs text-gray-600">{match.platform}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status bar */}
                        <div className="h-0.5" style={{
                          background: played
                            ? 'linear-gradient(90deg, #1d4ed8, #3b82f6, transparent)'
                            : 'linear-gradient(90deg, rgba(59,130,246,0.1), transparent)'
                        }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
