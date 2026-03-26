import { useState } from 'react';
import { useTournament } from '../context/TournamentContext';

export default function Registration() {
  const { data } = useTournament();
  const [form, setForm] = useState({ team: '', captain: '', contact: '', members: '', comment: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const getConfiguredChatId = () => {
    const configured = data.registrationChatId?.trim();
    if (configured) {
      // Поддержка форматов: @channel, -100..., https://t.me/channel
      if (/^https?:\/\/t\.me\//i.test(configured)) {
        const m = configured.match(/t\.me\/([A-Za-z0-9_]+)/i);
        if (m?.[1]) return `@${m[1]}`;
      }
      return configured;
    }
    const channel = data.tgChannel.match(/t\.me\/([A-Za-z0-9_]+)/);
    return channel ? `@${channel[1]}` : '';
  };

  const resolveChatId = async (token: string) => {
    const configured = getConfiguredChatId();
    if (!configured) return '';

    // Numeric id always works for private chat/group/channel.
    if (/^-?\d+$/.test(configured)) return configured;

    // For @username we try to resolve private user id from recent updates.
    if (configured.startsWith('@')) {
      const username = configured.slice(1).toLowerCase();

      try {
        const updatesResponse = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
        const updatesResult = await updatesResponse.json();
        if (updatesResult?.ok && Array.isArray(updatesResult.result)) {
          for (let i = updatesResult.result.length - 1; i >= 0; i -= 1) {
            const update = updatesResult.result[i];
            const message = update?.message ?? update?.edited_message ?? update?.channel_post ?? update?.callback_query?.message;
            const chat = message?.chat;
            const from = update?.message?.from ?? update?.callback_query?.from;

            if (chat?.type === 'private') {
              const chatUsername = String(chat?.username || '').toLowerCase();
              const fromUsername = String(from?.username || '').toLowerCase();
              if (chatUsername === username || fromUsername === username) {
                return String(chat.id);
              }
            }
          }
        }
      } catch {
        // Keep original value if resolve failed.
      }
    }

    return configured;
  };

  const buildMessage = () => {
    return [
      'Новая заявка Counter Cup',
      `Команда: ${form.team}`,
      `Капитан: ${form.captain}`,
      `Telegram: ${form.contact}`,
      `Состав: ${form.members || '-'}`,
      `Комментарий: ${form.comment || '-'}`,
      `Время: ${new Date().toLocaleString('ru-RU')}`,
    ].join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const token = data.registrationBotToken?.trim();
    const chatId = await resolveChatId(token);

    if (!token || !chatId) {
      setError('Не настроен Telegram бот или chat id в админ панели.');
      return;
    }

    setSending(true);

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildMessage(),
          disable_web_page_preview: true,
        }),
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        throw new Error('Не удалось прочитать ответ Telegram API.');
      }

      if (!response.ok || !result.ok) {
        const apiDescription = result?.description ? String(result.description) : 'Неизвестная ошибка Telegram API';
        throw new Error(apiDescription);
      }

      setSent(true);
      setForm({ team: '', captain: '', contact: '', members: '', comment: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка отправки';
      setError(`Ошибка отправки: ${message}. Для лички нажмите /start у бота и укажите числовой chat id.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="registration" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #000 0%, #020818 100%)' }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }} />

      <div className="relative max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase text-blue-400 mb-4"
            style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
            РЕГИСТРАЦИЯ
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Rajdhani' }}>
            ЗАЯВКА НА <span className="text-blue-400">УЧАСТИЕ</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
        </div>

        <div className="rounded-xl overflow-hidden"
          style={{ background: 'rgba(5,10,30,0.95)', border: '1px solid rgba(59,130,246,0.2)' }}>
          <div className="h-1" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, #3b82f6, transparent)' }} />

          {sent ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(29,78,216,0.2)', border: '2px solid rgba(59,130,246,0.5)' }}>
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Rajdhani' }}>ЗАЯВКА ОТПРАВЛЕНА!</h3>
              <p className="text-gray-400 mb-2">Мы свяжемся с вами в ближайшее время.</p>
              <p className="text-blue-400 text-sm">Следите за обновлениями в нашем Telegram канале</p>
              <a href={data.tgChannel} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded font-bold text-white text-sm btn-primary">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Перейти в канал
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
                    Название команды *
                  </label>
                  <input
                    required
                    value={form.team}
                    onChange={e => setForm(p => ({ ...p, team: e.target.value }))}
                    placeholder="Team Name"
                    className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 text-sm outline-none transition-all"
                    style={{ background: 'rgba(0,0,20,0.8)', border: '1px solid rgba(59,130,246,0.2)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.2)'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
                    Капитан команды *
                  </label>
                  <input
                    required
                    value={form.captain}
                    onChange={e => setForm(p => ({ ...p, captain: e.target.value }))}
                    placeholder="Nickname"
                    className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 text-sm outline-none transition-all"
                    style={{ background: 'rgba(0,0,20,0.8)', border: '1px solid rgba(59,130,246,0.2)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.2)'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
                  Telegram для связи *
                </label>
                <input
                  required
                  value={form.contact}
                  onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                  placeholder="@username"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 text-sm outline-none transition-all"
                  style={{ background: 'rgba(0,0,20,0.8)', border: '1px solid rgba(59,130,246,0.2)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.2)'}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
                  Состав команды (5 игроков)
                </label>
                <textarea
                  value={form.members}
                  onChange={e => setForm(p => ({ ...p, members: e.target.value }))}
                  placeholder="Игрок1, Игрок2, Игрок3, Игрок4, Игрок5"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 text-sm outline-none transition-all resize-none"
                  style={{ background: 'rgba(0,0,20,0.8)', border: '1px solid rgba(59,130,246,0.2)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.2)'}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
                  Комментарий
                </label>
                <textarea
                  value={form.comment}
                  onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
                  placeholder="Дополнительная информация..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 text-sm outline-none transition-all resize-none"
                  style={{ background: 'rgba(0,0,20,0.8)', border: '1px solid rgba(59,130,246,0.2)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.2)'}
                />
              </div>

              {/* Requirements */}
              <div className="p-4 rounded-lg" style={{ background: 'rgba(29,78,216,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-3">Требования к участию</div>
                <ul className="space-y-1.5 text-gray-400 text-xs">
                  {['Команда из 5 игроков + 1 запасной', 'Аккаунт CS2 не менее 100 часов', 'Наличие аккаунта на FACEIT', 'Возраст от 16 лет'].map(r => (
                    <li key={r} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {error && (
                <div className="text-sm text-red-300 bg-red-950/30 border border-red-500/30 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <button type="submit" disabled={sending}
                className="w-full py-4 rounded-lg font-black text-white uppercase tracking-widest text-sm btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                {sending ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
