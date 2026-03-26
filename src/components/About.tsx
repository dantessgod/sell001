import { useTournament } from '../context/TournamentContext';

export default function About() {
  const { data } = useTournament();

  return (
    <section id="about" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #000510 0%, #020818 100%)' }}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase text-blue-400 mb-4"
            style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
            {data.aboutSectionLabel}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Rajdhani' }}>
            <span className="text-blue-400">{data.aboutTitle}</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">{data.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {data.aboutStats.map(stat => (
                <div key={stat.id} className="p-4 rounded-lg card-blue transition-all duration-300">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-blue-400 font-bold text-lg" style={{ fontFamily: 'Rajdhani' }}>{stat.value}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {data.aboutFeatures.map(f => (
              <div key={f.id} className="flex gap-4 p-4 rounded-lg card-blue transition-all duration-300 group cursor-default">
                <div className="text-2xl flex-shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <div className="text-white font-semibold group-hover:text-blue-400 transition-colors">{f.title}</div>
                  <div className="text-gray-500 text-sm mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
