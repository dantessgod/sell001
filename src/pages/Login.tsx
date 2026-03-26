import { useState } from 'react';

const ADMIN_PASSWORD = 'sitesell001';

export default function Login({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (pass === ADMIN_PASSWORD) {
        sessionStorage.setItem('cc_admin', '1');
        onSuccess();
      } else {
        setError(true);
        setPass('');
        setLoading(false);
        setTimeout(() => setError(false), 3000);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#000510' }}>
      {/* Background grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1d4ed8, transparent)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)', filter: 'blur(80px)' }} />

      <div className="relative w-full max-w-sm">
        {/* Back button */}
        <button onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors mb-6 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Вернуться на сайт
        </button>

        {/* Card */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(2,8,30,0.95)', border: '1px solid rgba(59,130,246,0.3)', boxShadow: '0 0 60px rgba(59,130,246,0.1)' }}>
          {/* Top accent line */}
          <div className="h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #1d4ed8, #60a5fa, #1d4ed8, transparent)' }} />

          <div className="p-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}>
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-white tracking-widest mb-1" style={{ fontFamily: 'Rajdhani' }}>
                <span className="text-blue-400">ADMIN</span> PANEL
              </h1>
              <p className="text-gray-600 text-sm">Counter Cup · Панель управления</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Пароль</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    placeholder="Введите пароль"
                    className="w-full px-4 py-3 pr-11 rounded-xl text-white text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(10,20,60,0.8)',
                      border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(59,130,246,0.2)'}`,
                      color: '#fff'
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.6)'; e.target.style.boxShadow = '0 0 20px rgba(59,130,246,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(59,130,246,0.2)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {show
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                      }
                    </svg>
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Неверный пароль
                  </p>
                )}
              </div>

              <button type="submit" disabled={!pass || loading}
                className="w-full py-3 rounded-xl text-white font-bold text-sm tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: loading ? 'rgba(29,78,216,0.5)' : 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: pass && !loading ? '0 0 30px rgba(37,99,235,0.3)' : 'none' }}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Проверка...
                  </span>
                ) : 'Войти'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
