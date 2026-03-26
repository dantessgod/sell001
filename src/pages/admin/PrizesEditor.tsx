import { useState, useCallback, memo } from 'react';
import { useTournament, Prize } from '../../context/TournamentContext';

const inp = "w-full px-3.5 py-2.5 rounded-xl text-white text-sm outline-none transition-all bg-black/40 border border-blue-900/30 focus:border-blue-500/60 placeholder-gray-700";
const ICONS = ['🥇', '🥈', '🥉', '🏆', '⭐', '🎯', '💎', '🎖️', '🏅', '👑', '🔥', '⚡'];

const PrizeForm = memo(function PrizeForm({
  prize, isNew, onSave, onCancel
}: {
  prize: Prize; isNew: boolean;
  onSave: (p: Prize) => void;
  onCancel: () => void;
}) {
  const [place, setPlace] = useState(prize.place);
  const [amount, setAmount] = useState(prize.amount);
  const [description, setDescription] = useState(prize.description);
  const [icon, setIcon] = useState(prize.icon);

  const handleSave = () => {
    if (!place.trim()) return;
    onSave({ place, amount, description, icon });
  };

  return (
    <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(29,78,216,0.07)', border: '1px solid rgba(59,130,246,0.3)' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">
          {isNew ? '+ Новая позиция' : `✏️ ${prize.place}`}
        </h3>
        <button onClick={onCancel} className="text-gray-600 hover:text-gray-400 transition-colors text-xl leading-none">×</button>
      </div>

      {/* Icon picker */}
      <div>
        <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Иконка</label>
        <div className="flex gap-2 flex-wrap">
          {ICONS.map(ic => (
            <button key={ic} onClick={() => setIcon(ic)}
              className="w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all"
              style={{
                background: icon === ic ? 'rgba(37,99,235,0.3)' : 'rgba(0,0,0,0.3)',
                border: icon === ic ? '2px solid #3b82f6' : '1px solid rgba(59,130,246,0.2)',
                transform: icon === ic ? 'scale(1.1)' : 'scale(1)',
              }}>
              {ic}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Место *</label>
          <input className={inp} value={place} onChange={e => setPlace(e.target.value)} placeholder="1 место" autoFocus />
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Сумма</label>
          <input className={inp} value={amount} onChange={e => setAmount(e.target.value)} placeholder="$25,000" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Описание</label>
          <input className={inp} value={description} onChange={e => setDescription(e.target.value)} placeholder="Чемпион турнира" />
        </div>
      </div>

      {/* Preview */}
      <div className="flex items-center gap-4 p-4 rounded-xl"
        style={{ background: 'linear-gradient(135deg, rgba(29,78,216,0.15), rgba(37,99,235,0.05))', border: '1px solid rgba(59,130,246,0.2)' }}>
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-white font-black text-lg">{place || 'Место'}</p>
          <p className="text-blue-400 font-bold">{amount || '$0'}</p>
          <p className="text-gray-500 text-xs">{description}</p>
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

export default memo(function PrizesEditor() {
  const { data, addPrize, updatePrize, removePrize } = useTournament();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const handleSaveNew = useCallback((p: Prize) => {
    addPrize(p);
    setShowNew(false);
  }, [addPrize]);

  const handleSaveEdit = useCallback((p: Prize, idx: number) => {
    updatePrize(idx, p);
    setEditingIndex(null);
  }, [updatePrize]);

  const handleDelete = useCallback((i: number) => {
    if (confirmDelete === i) {
      removePrize(i);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(i);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  }, [confirmDelete, removePrize]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider" style={{ fontFamily: 'Rajdhani' }}>ПРИЗОВОЙ ФОНД</h2>
          <p className="text-gray-600 text-sm mt-0.5">{data.prizes.length} призовых позиций</p>
        </div>
        {!showNew && (
          <button onClick={() => { setShowNew(true); setEditingIndex(null); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 0 15px rgba(37,99,235,0.3)' }}>
            + Добавить приз
          </button>
        )}
      </div>

      {/* Total */}
      {data.prizes.length > 0 && (
        <div className="rounded-2xl p-5 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, rgba(29,78,216,0.12), rgba(37,99,235,0.05))', border: '1px solid rgba(59,130,246,0.2)' }}>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Общий призовой фонд</p>
            <p className="text-3xl font-black text-white mt-1" style={{ fontFamily: 'Rajdhani' }}>{data.prizePool}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Позиций</p>
            <p className="text-2xl font-black text-blue-400" style={{ fontFamily: 'Rajdhani' }}>{data.prizes.length}</p>
          </div>
        </div>
      )}

      {/* New form */}
      {showNew && (
        <PrizeForm
          prize={{ place: '', amount: '', description: '', icon: '🏆' }}
          isNew={true}
          onSave={handleSaveNew}
          onCancel={() => setShowNew(false)}
        />
      )}

      {/* Prizes list */}
      <div className="space-y-3">
        {data.prizes.length === 0 && !showNew && (
          <div className="text-center py-16 text-gray-700">
            <div className="text-5xl mb-3">🏆</div>
            <p className="font-bold">Призы не добавлены</p>
          </div>
        )}

        {data.prizes.map((prize, i) => (
          <div key={i}>
            {editingIndex === i ? (
              <PrizeForm prize={prize} isNew={false} onSave={p => handleSaveEdit(p, i)} onCancel={() => setEditingIndex(null)} />
            ) : (
              <div className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>
                <span className="text-3xl flex-shrink-0">{prize.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-black">{prize.place}</span>
                    {prize.amount && <span className="text-blue-400 font-bold text-sm">{prize.amount}</span>}
                  </div>
                  {prize.description && <p className="text-gray-500 text-xs mt-0.5">{prize.description}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => { setEditingIndex(i); setShowNew(false); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-400 hover:text-white hover:bg-blue-600/20 transition-all border border-blue-900/30">
                    ✏️ Изменить
                  </button>
                  <button onClick={() => handleDelete(i)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                    style={{
                      color: confirmDelete === i ? '#ef4444' : '#6b7280',
                      borderColor: confirmDelete === i ? 'rgba(239,68,68,0.4)' : 'rgba(75,85,99,0.2)',
                      background: confirmDelete === i ? 'rgba(239,68,68,0.1)' : 'transparent'
                    }}>
                    {confirmDelete === i ? '⚠️ Удалить?' : '🗑️'}
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
