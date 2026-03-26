import { useState, useCallback, memo } from 'react';
import { useTournament, Team } from '../../context/TournamentContext';

const inp = "w-full px-3.5 py-2.5 rounded-xl text-white text-sm outline-none transition-all bg-black/40 border border-blue-900/30 focus:border-blue-500/60 placeholder-gray-700";

const FLAGS: Record<string, string> = {
  RU: '🇷🇺', UA: '🇺🇦', KZ: '🇰🇿', BY: '🇧🇾', GE: '🇬🇪', AM: '🇦🇲', AZ: '🇦🇿', MD: '🇲🇩', UZ: '🇺🇿', INT: '🌍'
};

// Форма редактирования команды — отдельный мемоизированный компонент
const TeamForm = memo(function TeamForm({
  team, isNew, onSave, onCancel
}: {
  team: Team; isNew: boolean;
  onSave: (t: Team) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(team.name);
  const [logo, setLogo] = useState(team.logo);
  const [players, setPlayers] = useState(team.players);
  const [country, setCountry] = useState(team.country);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ ...team, name, logo, players, country });
  };

  return (
    <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(29,78,216,0.07)', border: '1px solid rgba(59,130,246,0.3)' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">
          {isNew ? '+ Новая команда' : `✏️ ${team.name}`}
        </h3>
        <button onClick={onCancel} className="text-gray-600 hover:text-gray-400 transition-colors text-xl leading-none">×</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Название команды *</label>
          <input className={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Team Alpha" autoFocus />
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Логотип (эмодзи или URL)</label>
          <input className={inp} value={logo} onChange={e => setLogo(e.target.value)} placeholder="🎮 или https://..." />
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Страна</label>
          <select className={inp} value={country} onChange={e => setCountry(e.target.value)}
            style={{ background: '#0a1628' }}>
            {Object.entries(FLAGS).map(([code, flag]) => (
              <option key={code} value={code}>{flag} {code}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Состав (через запятую)</label>
          <input className={inp} value={players} onChange={e => setPlayers(e.target.value)} placeholder="Player1, Player2, Player3..." />
        </div>
      </div>

      {/* Preview */}
      <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl overflow-hidden flex-shrink-0"
          style={{ background: 'rgba(29,78,216,0.2)', border: '1px solid rgba(59,130,246,0.3)' }}>
          {logo && logo.startsWith('http') ? (
            <img src={logo} alt="" className="w-full h-full object-contain" />
          ) : (
            <span>{logo || '🎮'}</span>
          )}
        </div>
        <div>
          <p className="text-white font-bold text-sm">{name || 'Название команды'}</p>
          <p className="text-gray-500 text-xs">{FLAGS[country] || '🌍'} {country}</p>
        </div>
      </div>

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

export default memo(function TeamsEditor() {
  const { data, addTeam, updateTeam, removeTeam } = useTournament();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSaveNew = useCallback((t: Team) => {
    addTeam({ ...t, id: Date.now().toString() });
    setShowNew(false);
  }, [addTeam]);

  const handleSaveEdit = useCallback((t: Team) => {
    updateTeam(t);
    setEditingId(null);
  }, [updateTeam]);

  const handleDelete = useCallback((id: string) => {
    if (confirmDelete === id) {
      removeTeam(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  }, [confirmDelete, removeTeam]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider" style={{ fontFamily: 'Rajdhani' }}>КОМАНДЫ</h2>
          <p className="text-gray-600 text-sm mt-0.5">{data.teams.length} из 16 слотов заполнено</p>
        </div>
        {!showNew && (
          <button onClick={() => { setShowNew(true); setEditingId(null); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 0 15px rgba(37,99,235,0.3)' }}>
            + Добавить команду
          </button>
        )}
      </div>

      {/* Slots bar */}
      <div className="rounded-xl p-4" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-semibold">Заполненность сетки</span>
          <span className="text-xs text-blue-400 font-bold">{data.teams.length}/16</span>
        </div>
        <div className="grid gap-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)' }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-2 rounded-sm transition-all"
              style={{ background: i < data.teams.length ? '#2563eb' : 'rgba(59,130,246,0.1)' }} />
          ))}
        </div>
      </div>

      {/* New team form */}
      {showNew && (
        <TeamForm
          team={{ id: '', name: '', logo: '🎮', players: '', country: 'RU' }}
          isNew={true}
          onSave={handleSaveNew}
          onCancel={() => setShowNew(false)}
        />
      )}

      {/* Teams list */}
      <div className="space-y-3">
        {data.teams.length === 0 && !showNew && (
          <div className="text-center py-16 text-gray-700">
            <div className="text-5xl mb-3">👥</div>
            <p className="font-bold">Команды не добавлены</p>
            <p className="text-sm mt-1">Нажмите «Добавить команду»</p>
          </div>
        )}

        {data.teams.map((team) => (
          <div key={team.id}>
            {editingId === team.id ? (
              <TeamForm team={team} isNew={false} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center gap-4 p-4 rounded-xl group transition-all"
                style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>

                {/* Logo */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl overflow-hidden flex-shrink-0"
                  style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  {team.logo && team.logo.startsWith('http') ? (
                    <img src={team.logo} alt="" className="w-full h-full object-contain" />
                  ) : (
                    <span>{team.logo || '🎮'}</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-bold">{team.name}</span>
                    <span className="text-sm">{FLAGS[team.country] || '🌍'}</span>
                  </div>
                  {team.players && (
                    <p className="text-gray-600 text-xs mt-0.5 truncate">{team.players}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => { setEditingId(team.id); setShowNew(false); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-400 hover:text-white hover:bg-blue-600/20 transition-all border border-blue-900/30">
                    ✏️ Изменить
                  </button>
                  <button onClick={() => handleDelete(team.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                    style={{
                      color: confirmDelete === team.id ? '#ef4444' : '#6b7280',
                      borderColor: confirmDelete === team.id ? 'rgba(239,68,68,0.4)' : 'rgba(75,85,99,0.2)',
                      background: confirmDelete === team.id ? 'rgba(239,68,68,0.1)' : 'transparent'
                    }}>
                    {confirmDelete === team.id ? '⚠️ Удалить?' : '🗑️'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
