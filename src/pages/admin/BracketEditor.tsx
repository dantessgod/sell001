import { useState, useCallback, memo } from 'react';
import { useTournament, Match } from '../../context/TournamentContext';

const inp = "w-full px-3.5 py-2.5 rounded-xl text-white text-sm outline-none transition-all bg-black/40 border border-blue-900/30 focus:border-blue-500/60 placeholder-gray-700";

const ROUNDS = ['1/8 финала', '1/4 финала', 'Полуфинал', 'Финал'];
const DAYS = ['День 1', 'День 2', 'День 3', 'День 4', 'День 5'];
const PLATFORMS = ['Twitch', 'VK Video', 'YouTube', 'Offline'];

const ROUND_COLORS: Record<string, string> = {
  'Финал': '#f59e0b',
  'Полуфинал': '#3b82f6',
  '1/4 финала': '#6366f1',
  '1/8 финала': '#64748b',
};

// Форма матча — отдельный мемоизированный компонент
const MatchForm = memo(function MatchForm({
  match, isNew, teams, onSave, onCancel
}: {
  match: Match; isNew: boolean;
  teams: string[];
  onSave: (m: Match) => void;
  onCancel: () => void;
}) {
  const [team1, setTeam1] = useState(match.team1);
  const [team2, setTeam2] = useState(match.team2);
  const [score1, setScore1] = useState(match.score1 !== null ? String(match.score1) : '');
  const [score2, setScore2] = useState(match.score2 !== null ? String(match.score2) : '');
  const [time, setTime] = useState(match.time);
  const [round, setRound] = useState(match.round);
  const [day, setDay] = useState(match.day);
  const [platform, setPlatform] = useState(match.platform);

  const s1 = score1 !== '' ? Number(score1) : null;
  const s2 = score2 !== '' ? Number(score2) : null;
  const winner = s1 !== null && s2 !== null ? (s1 > s2 ? team1 : s2 > s1 ? team2 : null) : null;

  const handleSave = () => {
    onSave({ ...match, team1, team2, score1: s1, score2: s2, time, round, day, platform });
  };

  const selectStyle = { background: '#0a1628' };

  return (
    <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(29,78,216,0.07)', border: '1px solid rgba(59,130,246,0.3)' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">
          {isNew ? '+ Новый матч' : `✏️ ${match.team1} vs ${match.team2}`}
        </h3>
        <button onClick={onCancel} className="text-gray-600 hover:text-gray-400 transition-colors text-xl leading-none">×</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Round & Day */}
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Раунд</label>
          <select className={inp} value={round} onChange={e => setRound(e.target.value)} style={selectStyle}>
            {ROUNDS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">День</label>
          <select className={inp} value={day} onChange={e => setDay(e.target.value)} style={selectStyle}>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Teams */}
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Команда 1</label>
          {teams.length > 0 ? (
            <select className={inp} value={team1} onChange={e => setTeam1(e.target.value)} style={selectStyle}>
              <option value="">— выбрать —</option>
              <option value="TBD">TBD</option>
              {teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          ) : (
            <input className={inp} value={team1} onChange={e => setTeam1(e.target.value)} placeholder="Команда 1" autoFocus />
          )}
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Команда 2</label>
          {teams.length > 0 ? (
            <select className={inp} value={team2} onChange={e => setTeam2(e.target.value)} style={selectStyle}>
              <option value="">— выбрать —</option>
              <option value="TBD">TBD</option>
              {teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          ) : (
            <input className={inp} value={team2} onChange={e => setTeam2(e.target.value)} placeholder="Команда 2" />
          )}
        </div>

        {/* Scores */}
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">
            Счёт команды 1 <span className="text-gray-600">(пусто = не сыгран)</span>
          </label>
          <input className={inp} type="number" min={0} max={32} value={score1}
            onChange={e => setScore1(e.target.value)} placeholder="—" />
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">
            Счёт команды 2
          </label>
          <input className={inp} type="number" min={0} max={32} value={score2}
            onChange={e => setScore2(e.target.value)} placeholder="—" />
        </div>

        {/* Time & Platform */}
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Время</label>
          <input className={inp} type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Платформа</label>
          <select className={inp} value={platform} onChange={e => setPlatform(e.target.value)} style={selectStyle}>
            {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Winner preview */}
      {winner && (
        <div className="flex items-center gap-2 p-3 rounded-xl"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <span className="text-green-400 text-sm font-bold">🏆 Победитель: {winner}</span>
          <span className="text-gray-600 text-xs">({score1} : {score2})</span>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={handleSave}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 0 15px rgba(37,99,235,0.3)' }}>
          {isNew ? '+ Добавить' : '💾 Сохранить'}
        </button>
        <button onClick={onCancel}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          Отмена
        </button>
      </div>
    </div>
  );
});

export default memo(function BracketEditor() {
  const { data, addMatch, updateMatch, removeMatch } = useTournament();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [filterRound, setFilterRound] = useState<string>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const teamNames = data.teams.map(t => t.name);

  const emptyMatch = (): Match => ({
    id: Date.now().toString(),
    team1: '', team2: '',
    score1: null, score2: null,
    time: '14:00', round: '1/4 финала',
    day: 'День 1', platform: 'Twitch',
  });

  const handleSaveNew = useCallback((m: Match) => {
    addMatch({ ...m, id: Date.now().toString() });
    setShowNew(false);
  }, [addMatch]);

  const handleSaveEdit = useCallback((m: Match) => {
    updateMatch(m);
    setEditingId(null);
  }, [updateMatch]);

  const handleDelete = useCallback((id: string) => {
    if (confirmDelete === id) {
      removeMatch(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  }, [confirmDelete, removeMatch]);

  const ROUND_ORDER = ['1/8 финала', '1/4 финала', 'Полуфинал', 'Финал'];
  const sorted = [...data.matches].sort((a, b) => ROUND_ORDER.indexOf(a.round) - ROUND_ORDER.indexOf(b.round));
  const filtered = filterRound === 'all' ? sorted : sorted.filter(m => m.round === filterRound);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider" style={{ fontFamily: 'Rajdhani' }}>ТУРНИРНАЯ СЕТКА</h2>
          <p className="text-gray-600 text-sm mt-0.5">
            {data.matches.length} матчей · {data.matches.filter(m => m.score1 !== null).length} сыграно
          </p>
        </div>
        {!showNew && (
          <button onClick={() => { setShowNew(true); setEditingId(null); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 0 15px rgba(37,99,235,0.3)' }}>
            + Добавить матч
          </button>
        )}
      </div>

      {/* Round stats */}
      <div className="grid grid-cols-4 gap-3">
        {ROUNDS.map(r => (
          <button key={r} onClick={() => setFilterRound(filterRound === r ? 'all' : r)}
            className="p-3 rounded-xl text-center transition-all cursor-pointer"
            style={{
              background: filterRound === r ? `${ROUND_COLORS[r]}18` : 'rgba(5,12,35,0.8)',
              border: filterRound === r ? `1px solid ${ROUND_COLORS[r]}50` : '1px solid rgba(59,130,246,0.1)',
            }}>
            <div className="text-xl font-black mb-0.5" style={{ fontFamily: 'Rajdhani', color: ROUND_COLORS[r] }}>
              {data.matches.filter(m => m.round === r).length}
            </div>
            <div className="text-xs font-bold text-gray-500">{r}</div>
          </button>
        ))}
      </div>

      {/* New match form */}
      {showNew && (
        <MatchForm
          match={emptyMatch()} isNew={true}
          teams={teamNames}
          onSave={handleSaveNew}
          onCancel={() => setShowNew(false)}
        />
      )}

      {/* Matches list */}
      <div className="space-y-3">
        {filtered.length === 0 && !showNew && (
          <div className="text-center py-16 text-gray-700">
            <div className="text-5xl mb-3">🏆</div>
            <p className="font-bold">Матчи не добавлены</p>
          </div>
        )}

        {filtered.map(match => {
          const played = match.score1 !== null && match.score2 !== null;
          const winner = played
            ? (match.score1! > match.score2! ? match.team1 : match.score2! > match.score1! ? match.team2 : null)
            : null;

          return (
            <div key={match.id}>
              {editingId === match.id ? (
                <MatchForm match={match} isNew={false} teams={teamNames} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} />
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-xl transition-all"
                  style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>

                  {/* Round badge */}
                  <div className="text-xs font-black px-2 py-1 rounded-lg flex-shrink-0 hidden sm:block"
                    style={{ background: `${ROUND_COLORS[match.round]}18`, color: ROUND_COLORS[match.round], border: `1px solid ${ROUND_COLORS[match.round]}30` }}>
                    {match.round}
                  </div>

                  {/* Teams & Score */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold text-sm ${winner === match.team1 ? 'text-green-400' : 'text-white'}`}>{match.team1 || 'TBD'}</span>
                      {played && <span className="text-xs font-black text-blue-400">{match.score1} : {match.score2}</span>}
                      {!played && <span className="text-gray-700 text-xs">vs</span>}
                      <span className={`font-bold text-sm ${winner === match.team2 ? 'text-green-400' : 'text-white'}`}>{match.team2 || 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-gray-600 text-xs">{match.day} · {match.time}</span>
                      <span className="text-gray-700 text-xs">{match.platform}</span>
                      {!played && <span className="text-yellow-600 text-xs font-bold">⏳ Не сыгран</span>}
                      {played && <span className="text-green-600 text-xs font-bold">✅ Сыгран</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => { setEditingId(match.id); setShowNew(false); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-400 hover:text-white hover:bg-blue-600/20 transition-all border border-blue-900/30">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(match.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                      style={{
                        color: confirmDelete === match.id ? '#ef4444' : '#6b7280',
                        borderColor: confirmDelete === match.id ? 'rgba(239,68,68,0.4)' : 'rgba(75,85,99,0.2)',
                        background: confirmDelete === match.id ? 'rgba(239,68,68,0.1)' : 'transparent'
                      }}>
                      {confirmDelete === match.id ? '⚠️' : '🗑️'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
