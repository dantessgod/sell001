import { useTournament } from '../context/TournamentContext';
import { Match } from '../context/TournamentContext';

function MatchCard({ match }: { match: Match }) {
  const score1 = match.score1;
  const score2 = match.score2;
  const played = score1 !== null && score2 !== null;
  const win1 = played && score1! > score2!;
  const win2 = played && score2! > score1!;

  return (
    <div className="rounded-lg overflow-hidden w-48"
      style={{ background: 'rgba(5,10,30,0.9)', border: '1px solid rgba(59,130,246,0.2)' }}>
      {/* Team 1 */}
      <div className={`flex items-center justify-between px-3 py-2 border-b ${win1 ? 'border-blue-500/40' : 'border-blue-900/20'}`}
        style={{ background: win1 ? 'rgba(29,78,216,0.2)' : 'transparent' }}>
        <span className={`text-sm font-semibold truncate max-w-[110px] ${win1 ? 'text-white' : 'text-gray-400'}`}>
          {match.team1 || 'TBD'}
        </span>
        {played && (
          <span className={`text-sm font-bold ml-2 ${win1 ? 'text-blue-400' : 'text-gray-600'}`}>{score1}</span>
        )}
      </div>
      {/* Team 2 */}
      <div className={`flex items-center justify-between px-3 py-2 ${win2 ? '' : ''}`}
        style={{ background: win2 ? 'rgba(29,78,216,0.2)' : 'transparent' }}>
        <span className={`text-sm font-semibold truncate max-w-[110px] ${win2 ? 'text-white' : 'text-gray-400'}`}>
          {match.team2 || 'TBD'}
        </span>
        {played && (
          <span className={`text-sm font-bold ml-2 ${win2 ? 'text-blue-400' : 'text-gray-600'}`}>{score2}</span>
        )}
      </div>
      {/* Round label */}
      <div className="px-3 py-1 text-center"
        style={{ background: 'rgba(0,0,20,0.5)', borderTop: '1px solid rgba(59,130,246,0.1)' }}>
        <span className="text-xs text-blue-500 tracking-wider">{match.round}</span>
      </div>
    </div>
  );
}

export default function Bracket() {
  const { data } = useTournament();

  const rounds: { [key: string]: Match[] } = {};
  const roundOrder = ['1/8 финала', '1/4 финала', 'Полуфинал', 'Финал'];

  data.matches.forEach(m => {
    if (!rounds[m.round]) rounds[m.round] = [];
    rounds[m.round].push(m);
  });

  const sortedRounds = Object.keys(rounds).sort((a, b) => {
    const ai = roundOrder.indexOf(a);
    const bi = roundOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <section id="bracket" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #000 0%, #020818 100%)' }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase text-blue-400 mb-4"
            style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
            СЕТКА
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Rajdhani' }}>
            ТУРНИРНАЯ <span className="text-blue-400">СЕТКА</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
        </div>

        {sortedRounds.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <div className="text-4xl mb-4">🏆</div>
            <p>Сетка ещё не заполнена</p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-8 items-start min-w-max mx-auto justify-center">
              {sortedRounds.map((round) => (
                <div key={round} className="flex flex-col items-center gap-6">
                  {/* Round header */}
                  <div className="px-4 py-2 rounded text-center"
                    style={{ background: 'rgba(29,78,216,0.2)', border: '1px solid rgba(59,130,246,0.3)', minWidth: '180px' }}>
                    <span className="text-blue-400 font-bold text-sm tracking-widest uppercase" style={{ fontFamily: 'Rajdhani' }}>
                      {round}
                    </span>
                  </div>
                  {/* Matches */}
                  <div className="flex flex-col gap-4">
                    {rounds[round].map(match => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
