import { memo } from 'react';
import { useTournament } from '../../context/TournamentContext';

// Расписание формируется автоматически из матчей — здесь только просмотр и подсказка
export default memo(function ScheduleEditor() {
  const { data } = useTournament();

  const DAYS = ['День 1', 'День 2', 'День 3', 'День 4', 'День 5'];
  const ROUND_COLORS: Record<string, string> = {
    'Финал': '#f59e0b', 'Полуфинал': '#3b82f6', '1/4 финала': '#6366f1', '1/8 финала': '#64748b',
  };

  const byDay = DAYS.map(day => ({
    day,
    matches: data.matches.filter(m => m.day === day).sort((a, b) => a.time.localeCompare(b.time)),
  })).filter(d => d.matches.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white tracking-wider" style={{ fontFamily: 'Rajdhani' }}>РАСПИСАНИЕ</h2>
        <p className="text-gray-600 text-sm mt-0.5">Расписание формируется автоматически из турнирной сетки</p>
      </div>

      {/* Hint */}
      <div className="rounded-xl p-4 flex items-start gap-3"
        style={{ background: 'rgba(29,78,216,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <span className="text-blue-400 text-lg flex-shrink-0">ℹ️</span>
        <div>
          <p className="text-blue-300 text-sm font-bold">Как редактировать расписание?</p>
          <p className="text-gray-500 text-sm mt-1">
            Перейдите в раздел <strong className="text-blue-400">«Сетка»</strong> и измените день и время для каждого матча.
            Расписание обновится автоматически.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>
          <div className="text-2xl font-black text-blue-400" style={{ fontFamily: 'Rajdhani' }}>{data.matches.length}</div>
          <div className="text-xs text-gray-500 font-semibold mt-0.5">Всего матчей</div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>
          <div className="text-2xl font-black text-green-400" style={{ fontFamily: 'Rajdhani' }}>
            {data.matches.filter(m => m.score1 !== null).length}
          </div>
          <div className="text-xs text-gray-500 font-semibold mt-0.5">Сыграно</div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>
          <div className="text-2xl font-black text-yellow-400" style={{ fontFamily: 'Rajdhani' }}>
            {data.matches.filter(m => m.score1 === null).length}
          </div>
          <div className="text-xs text-gray-500 font-semibold mt-0.5">Предстоит</div>
        </div>
      </div>

      {/* Schedule preview */}
      {byDay.length === 0 ? (
        <div className="text-center py-16 text-gray-700">
          <div className="text-5xl mb-3">📅</div>
          <p className="font-bold">Матчи не добавлены</p>
          <p className="text-sm mt-1">Добавьте матчи в разделе «Сетка»</p>
        </div>
      ) : (
        <div className="space-y-4">
          {byDay.map(({ day, matches }) => (
            <div key={day} className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>
              <div className="px-5 py-3 flex items-center justify-between"
                style={{ background: 'rgba(29,78,216,0.1)', borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
                <span className="text-white font-black text-sm tracking-wider">{day}</span>
                <span className="text-blue-400 text-xs font-bold">{matches.length} матчей</span>
              </div>
              <div className="divide-y" style={{ borderColor: 'rgba(59,130,246,0.06)' }}>
                {matches.map(match => {
                  const played = match.score1 !== null;
                  const winner = played && match.score1! > match.score2! ? match.team1
                    : played && match.score2! > match.score1! ? match.team2 : null;

                  return (
                    <div key={match.id} className="px-5 py-3 flex items-center gap-4">
                      <span className="text-blue-400 font-mono text-sm font-bold w-12 flex-shrink-0">{match.time}</span>
                      <div className="flex-1 flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-bold ${winner === match.team1 ? 'text-green-400' : 'text-white'}`}>
                          {match.team1 || 'TBD'}
                        </span>
                        {played ? (
                          <span className="text-xs font-black text-blue-400">{match.score1} : {match.score2}</span>
                        ) : (
                          <span className="text-gray-600 text-xs">vs</span>
                        )}
                        <span className={`text-sm font-bold ${winner === match.team2 ? 'text-green-400' : 'text-white'}`}>
                          {match.team2 || 'TBD'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{ background: `${ROUND_COLORS[match.round] || '#64748b'}18`, color: ROUND_COLORS[match.round] || '#94a3b8' }}>
                          {match.round}
                        </span>
                        <span className="text-gray-600 text-xs hidden sm:block">{match.platform}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
