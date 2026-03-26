import { useState, useCallback, memo } from 'react';
import { useTournament, Sponsor } from '../../context/TournamentContext';

const inp = "w-full px-3.5 py-2.5 rounded-xl text-white text-sm outline-none transition-all bg-black/40 border border-blue-900/30 focus:border-blue-500/60 placeholder-gray-700";

const TIERS: { value: Sponsor['tier']; label: string; desc: string; color: string }[] = [
  { value: 'main', label: 'Генеральный', desc: 'Главное место', color: '#f59e0b' },
  { value: 'partner', label: 'Партнёр', desc: 'Средний блок', color: '#3b82f6' },
  { value: 'info', label: 'Информационный', desc: 'Маленький блок', color: '#64748b' },
];

const SponsorForm = memo(function SponsorForm({
  sponsor, isNew, onSave, onCancel
}: {
  sponsor: Sponsor; isNew: boolean;
  onSave: (s: Sponsor) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(sponsor.name);
  const [logo, setLogo] = useState(sponsor.logo);
  const [url, setUrl] = useState(sponsor.url);
  const [tier, setTier] = useState<Sponsor['tier']>(sponsor.tier);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ ...sponsor, name, logo, url, tier });
  };

  const tierInfo = TIERS.find(t => t.value === tier);

  return (
    <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(29,78,216,0.07)', border: '1px solid rgba(59,130,246,0.3)' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">
          {isNew ? '+ Новый спонсор' : `✏️ ${sponsor.name}`}
        </h3>
        <button onClick={onCancel} className="text-gray-600 hover:text-gray-400 transition-colors text-xl leading-none">×</button>
      </div>

      {/* Tier picker */}
      <div>
        <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Уровень спонсорства</label>
        <div className="grid grid-cols-3 gap-2">
          {TIERS.map(t => (
            <button key={t.value} onClick={() => setTier(t.value)}
              className="p-3 rounded-xl text-center transition-all"
              style={{
                background: tier === t.value ? `${t.color}18` : 'rgba(0,0,0,0.3)',
                border: tier === t.value ? `2px solid ${t.color}60` : '1px solid rgba(59,130,246,0.15)',
              }}>
              <div className="text-xs font-black mb-0.5" style={{ color: t.color }}>{t.label}</div>
              <div className="text-gray-600 text-xs">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Название *</label>
          <input className={inp} value={name} onChange={e => setName(e.target.value)} placeholder="FACEIT" autoFocus />
        </div>
        <div>
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Сайт (URL)</label>
          <input className={inp} value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-blue-400/70 font-bold uppercase tracking-widest mb-2">Логотип (URL изображения)</label>
          <input className={inp} value={logo} onChange={e => setLogo(e.target.value)} placeholder="https://..." />
        </div>
      </div>

      {/* Preview */}
      {(logo || name) && (
        <div className="flex items-center gap-4 p-4 rounded-xl"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${tierInfo?.color}25` }}>
          {logo && (
            <img src={logo} alt={name} className="h-12 w-24 object-contain rounded-lg"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
          <div>
            <p className="text-white font-black">{name}</p>
            <p className="text-xs font-bold" style={{ color: tierInfo?.color }}>{tierInfo?.label}</p>
          </div>
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

export default memo(function SponsorsEditor() {
  const { data, addSponsor, updateSponsor, removeSponsor } = useTournament();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const emptySponsor = (): Sponsor => ({ id: '', name: '', logo: '', url: '', tier: 'partner' });

  const handleSaveNew = useCallback((s: Sponsor) => {
    addSponsor({ ...s, id: Date.now().toString() });
    setShowNew(false);
  }, [addSponsor]);

  const handleSaveEdit = useCallback((s: Sponsor) => {
    updateSponsor(s);
    setEditingId(null);
  }, [updateSponsor]);

  const handleDelete = useCallback((id: string) => {
    if (confirmDelete === id) {
      removeSponsor(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  }, [confirmDelete, removeSponsor]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider" style={{ fontFamily: 'Rajdhani' }}>СПОНСОРЫ</h2>
          <p className="text-gray-600 text-sm mt-0.5">{data.sponsors.length} спонсоров</p>
        </div>
        {!showNew && (
          <button onClick={() => { setShowNew(true); setEditingId(null); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 0 15px rgba(37,99,235,0.3)' }}>
            + Добавить спонсора
          </button>
        )}
      </div>

      {/* Tier overview */}
      <div className="grid grid-cols-3 gap-3">
        {TIERS.map(t => (
          <div key={t.value} className="p-4 rounded-xl text-center"
            style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>
            <div className="text-2xl font-black mb-1" style={{ fontFamily: 'Rajdhani', color: t.color }}>
              {data.sponsors.filter(s => s.tier === t.value).length}
            </div>
            <div className="text-xs font-bold" style={{ color: t.color }}>{t.label}</div>
            <div className="text-gray-700 text-xs mt-0.5">{t.desc}</div>
          </div>
        ))}
      </div>

      {/* New form */}
      {showNew && (
        <SponsorForm sponsor={emptySponsor()} isNew={true} onSave={handleSaveNew} onCancel={() => setShowNew(false)} />
      )}

      {/* Sponsors grouped by tier */}
      {TIERS.map(tier => {
        const tierSponsors = data.sponsors.filter(s => s.tier === tier.value);
        if (tierSponsors.length === 0) return null;

        return (
          <div key={tier.value}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: tier.color }} />
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: tier.color }}>{tier.label}</span>
              <div className="flex-1 h-px" style={{ background: `${tier.color}20` }} />
            </div>

            <div className="space-y-3">
              {tierSponsors.map(sponsor => (
                <div key={sponsor.id}>
                  {editingId === sponsor.id ? (
                    <SponsorForm sponsor={sponsor} isNew={false} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} />
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl"
                      style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}>
                      {/* Logo */}
                      <div className="w-20 h-12 flex items-center justify-center rounded-lg flex-shrink-0 overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        {sponsor.logo ? (
                          <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <span className="text-gray-700 text-xs">нет лого</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold">{sponsor.name}</p>
                        {sponsor.url && <p className="text-gray-600 text-xs truncate">{sponsor.url}</p>}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => { setEditingId(sponsor.id); setShowNew(false); }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-400 hover:text-white hover:bg-blue-600/20 transition-all border border-blue-900/30">
                          ✏️ Изменить
                        </button>
                        <button onClick={() => handleDelete(sponsor.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                          style={{
                            color: confirmDelete === sponsor.id ? '#ef4444' : '#6b7280',
                            borderColor: confirmDelete === sponsor.id ? 'rgba(239,68,68,0.4)' : 'rgba(75,85,99,0.2)',
                            background: confirmDelete === sponsor.id ? 'rgba(239,68,68,0.1)' : 'transparent'
                          }}>
                          {confirmDelete === sponsor.id ? '⚠️ Удалить?' : '🗑️'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {data.sponsors.length === 0 && !showNew && (
        <div className="text-center py-16 text-gray-700">
          <div className="text-5xl mb-3">🤝</div>
          <p className="font-bold">Спонсоры не добавлены</p>
        </div>
      )}
    </div>
  );
});
