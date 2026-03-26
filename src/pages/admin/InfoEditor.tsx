import { useState, useCallback, memo } from 'react';
import { useTournament, type AboutFeature, type AboutStat } from '../../context/TournamentContext';

const inp = "w-full px-3.5 py-2.5 rounded-xl text-white text-sm outline-none transition-all bg-black/40 border border-blue-900/30 focus:border-blue-500/60 placeholder-gray-700";

const Field = memo(function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-blue-400/80 font-bold uppercase tracking-widest mb-2">{label}</label>
      {children}
    </div>
  );
});

export default memo(function InfoEditor() {
  const { data, updateData } = useTournament();

  // Локальный state — изменения отправляются в контекст только по кнопке "Сохранить".
  const [name, setName] = useState(data.name);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [dates, setDates] = useState(data.dates);
  const [format, setFormat] = useState(data.format);
  const [prizePool, setPrizePool] = useState(data.prizePool);
  const [aboutSectionLabel, setAboutSectionLabel] = useState(data.aboutSectionLabel);
  const [aboutTitle, setAboutTitle] = useState(data.aboutTitle);
  const [description, setDescription] = useState(data.description);
  const [aboutStats, setAboutStats] = useState<AboutStat[]>(data.aboutStats);
  const [aboutFeatures, setAboutFeatures] = useState<AboutFeature[]>(data.aboutFeatures);
  const [rulesUrl, setRulesUrl] = useState(data.rulesUrl);
  const [tgChannel, setTgChannel] = useState(data.tgChannel);
  const [twitchUrl, setTwitchUrl] = useState(data.twitchUrl);
  const [tgContact, setTgContact] = useState(data.tgContact);
  const [orgLogo, setOrgLogo] = useState(data.orgLogo);
  const [registrationBotToken, setRegistrationBotToken] = useState(data.registrationBotToken);
  const [registrationChatId, setRegistrationChatId] = useState(data.registrationChatId);
  const [saved, setSaved] = useState(false);

  const updateStat = useCallback((id: string, patch: Partial<AboutStat>) => {
    setAboutStats(prev => prev.map(item => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const removeStat = useCallback((id: string) => {
    setAboutStats(prev => prev.filter(item => item.id !== id));
  }, []);

  const addStat = useCallback(() => {
    setAboutStats(prev => [
      ...prev,
      {
        id: `stat_${Date.now()}`,
        icon: '📌',
        label: 'Новый пункт',
        value: 'Значение',
      },
    ]);
  }, []);

  const updateFeature = useCallback((id: string, patch: Partial<AboutFeature>) => {
    setAboutFeatures(prev => prev.map(item => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const removeFeature = useCallback((id: string) => {
    setAboutFeatures(prev => prev.filter(item => item.id !== id));
  }, []);

  const addFeature = useCallback(() => {
    setAboutFeatures(prev => [
      ...prev,
      {
        id: `feature_${Date.now()}`,
        icon: '⭐',
        title: 'Новая особенность',
        desc: 'Описание особенности',
      },
    ]);
  }, []);

  const handleSave = useCallback(() => {
    updateData({
      name,
      subtitle,
      dates,
      format,
      prizePool,
      aboutSectionLabel,
      aboutTitle,
      description,
      aboutStats,
      aboutFeatures,
      rulesUrl,
      tgChannel,
      twitchUrl,
      tgContact,
      orgLogo,
      registrationBotToken,
      registrationChatId,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [
    name,
    subtitle,
    dates,
    format,
    prizePool,
    aboutSectionLabel,
    aboutTitle,
    description,
    aboutStats,
    aboutFeatures,
    rulesUrl,
    tgChannel,
    twitchUrl,
    tgContact,
    orgLogo,
    registrationBotToken,
    registrationChatId,
    updateData,
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider" style={{ fontFamily: 'Rajdhani' }}>
            ИНФОРМАЦИЯ О ТУРНИРЕ
          </h2>
          <p className="text-gray-600 text-sm mt-0.5">Основные настройки турнира и ссылки</p>
        </div>
        <button onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: saved ? 'rgba(34,197,94,0.15)' : 'linear-gradient(135deg,#1d4ed8,#2563eb)',
            border: saved ? '1px solid rgba(34,197,94,0.4)' : 'none',
            color: saved ? '#4ade80' : '#fff',
            boxShadow: saved ? 'none' : '0 0 20px rgba(37,99,235,0.3)'
          }}>
          {saved ? '✓ Сохранено!' : '💾 Сохранить'}
        </button>
      </div>

      {/* Section: Main */}
      <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.12)' }}>
        <div className="text-xs text-blue-500 font-bold uppercase tracking-widest flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-600" /> Основное
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Название турнира">
            <input className={inp} value={name} onChange={e => setName(e.target.value)} placeholder="COUNTER CUP" />
          </Field>
          <Field label="Подзаголовок">
            <input className={inp} value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Главный CS2 турнир года" />
          </Field>
          <Field label="Даты проведения">
            <input className={inp} value={dates} onChange={e => setDates(e.target.value)} placeholder="15–20 Февраля 2025" />
          </Field>
          <Field label="Формат">
            <input className={inp} value={format} onChange={e => setFormat(e.target.value)} placeholder="Single Elimination" />
          </Field>
          <Field label="Призовой фонд">
            <input className={inp} value={prizePool} onChange={e => setPrizePool(e.target.value)} placeholder="$50,000" />
          </Field>
          <Field label="Подпись секции О турнире">
            <input className={inp} value={aboutSectionLabel} onChange={e => setAboutSectionLabel(e.target.value)} placeholder="О ТУРНИРЕ" />
          </Field>
          <Field label="Заголовок блока О турнире">
            <input className={inp} value={aboutTitle} onChange={e => setAboutTitle(e.target.value)} placeholder="Что такое Counter Cup?" />
          </Field>
          <Field label="Логотип организации (URL)">
            <input className={inp} value={orgLogo} onChange={e => setOrgLogo(e.target.value)} placeholder="https://..." />
          </Field>
        </div>
        <Field label="Описание турнира">
          <textarea className={inp} rows={4} value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Описание турнира..." style={{ resize: 'vertical' }} />
        </Field>
      </div>

      <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.12)' }}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="text-xs text-blue-500 font-bold uppercase tracking-widest flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-600" /> Блок статистики в секции "О турнире"
          </div>
          <button onClick={addStat} className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-200 bg-blue-900/40 border border-blue-700/40 hover:bg-blue-800/40 transition-colors">
            + Добавить пункт
          </button>
        </div>

        <div className="space-y-4">
          {aboutStats.map((stat, index) => (
            <div key={stat.id} className="rounded-xl p-4 bg-black/30 border border-blue-900/30">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Пункт {index + 1}</p>
                <button onClick={() => removeStat(stat.id)} className="text-xs text-red-300 hover:text-red-200">
                  Удалить
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <input className={inp} value={stat.icon} onChange={e => updateStat(stat.id, { icon: e.target.value })} placeholder="Иконка" />
                <input className={inp} value={stat.label} onChange={e => updateStat(stat.id, { label: e.target.value })} placeholder="Подпись" />
                <input className={inp} value={stat.value} onChange={e => updateStat(stat.id, { value: e.target.value })} placeholder="Значение" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.12)' }}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="text-xs text-blue-500 font-bold uppercase tracking-widest flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-600" /> Особенности в секции "О турнире"
          </div>
          <button onClick={addFeature} className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-200 bg-blue-900/40 border border-blue-700/40 hover:bg-blue-800/40 transition-colors">
            + Добавить особенность
          </button>
        </div>

        <div className="space-y-4">
          {aboutFeatures.map((feature, index) => (
            <div key={feature.id} className="rounded-xl p-4 bg-black/30 border border-blue-900/30">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Особенность {index + 1}</p>
                <button onClick={() => removeFeature(feature.id)} className="text-xs text-red-300 hover:text-red-200">
                  Удалить
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3 mb-3">
                <input className={inp} value={feature.icon} onChange={e => updateFeature(feature.id, { icon: e.target.value })} placeholder="Иконка" />
                <input className={inp} value={feature.title} onChange={e => updateFeature(feature.id, { title: e.target.value })} placeholder="Заголовок" />
              </div>
              <textarea className={inp} rows={3} value={feature.desc} onChange={e => updateFeature(feature.id, { desc: e.target.value })} placeholder="Описание" style={{ resize: 'vertical' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Section: Links */}
      <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.12)' }}>
        <div className="text-xs text-blue-500 font-bold uppercase tracking-widest flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-600" /> Ссылки и контакты
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Telegram канал">
            <input className={inp} value={tgChannel} onChange={e => setTgChannel(e.target.value)} placeholder="https://t.me/..." />
          </Field>
          <Field label="Twitch канал">
            <input className={inp} value={twitchUrl} onChange={e => setTwitchUrl(e.target.value)} placeholder="https://twitch.tv/..." />
          </Field>
          <Field label="Ссылка на правила (URL)">
            <input className={inp} value={rulesUrl} onChange={e => setRulesUrl(e.target.value)} placeholder="https://t.me/..." />
          </Field>
          <Field label="Telegram контакт (admin)">
            <input className={inp} value={tgContact} onChange={e => setTgContact(e.target.value)} placeholder="@username" />
          </Field>
          <Field label="Токен Telegram бота (заявки)">
            <input className={inp} value={registrationBotToken} onChange={e => setRegistrationBotToken(e.target.value)} placeholder="123456:ABC..." />
          </Field>
          <Field label="Chat ID для заявок (личка: id, канал: @name или -100...)">
            <input className={inp} value={registrationChatId} onChange={e => setRegistrationChatId(e.target.value)} placeholder="пример: 123456789" />
          </Field>
        </div>
      </div>

      {/* Preview */}
      {orgLogo && (
        <div className="rounded-2xl p-6" style={{ background: 'rgba(5,12,35,0.8)', border: '1px solid rgba(59,130,246,0.12)' }}>
          <div className="text-xs text-blue-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
            <div className="w-4 h-0.5 bg-blue-600" /> Предпросмотр логотипа
          </div>
          <div className="flex items-center gap-4">
            <img src={orgLogo} alt="org logo" className="h-16 w-16 object-contain rounded-xl"
              style={{ border: '1px solid rgba(59,130,246,0.2)' }} />
            <div>
              <p className="text-white font-black text-lg">{name || 'COUNTER CUP'}</p>
              <p className="text-gray-500 text-sm">{subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
