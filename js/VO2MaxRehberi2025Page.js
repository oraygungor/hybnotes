const { useState } = React;

const VO2MaxRehberi2025Page = ({ lang = 'tr' }) => {
    const [activeTab, setActiveTab] = useState('rst');

    // --- Sabit Renkler (Sadece Grafikler İçin) ---
    const chartColors = {
        rst: { bg: 'bg-sky-500', text: 'text-sky-500', border: 'border-sky-500', hex: '#0ea5e9' },
        hiit: { bg: 'bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-500', hex: '#6366f1' },
        sit: { bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500', hex: '#a855f7' },
        ct: { bg: 'bg-slate-500', text: 'text-slate-500', border: 'border-slate-500', hex: '#64748b' }
    };

    // --- İçerik ---
    const t = {
        title: lang === 'tr' ? 'VO₂max Rehberi' : 'VO₂max Guide',
        subtitle: lang === 'tr' 
            ? '"HIIT mi, Sprint mi, yoksa Tekrarlı Sprint mi?" sorusuna 1.261 atlet ve 51 çalışma ile verilen bilimsel yanıt.' 
            : 'The scientific answer to "HIIT, Sprint, or Repeated Sprint?" based on 1,261 athletes and 51 studies.',
        sections: {
            definitions: lang === 'tr' ? 'Antrenman Türleri' : 'Training Types',
            findings: lang === 'tr' ? 'Makale Bulguları' : 'Key Findings',
            protocols: lang === 'tr' ? 'Örnek Protokoller' : 'Sample Protocols',
            editor: lang === 'tr' ? 'Editörün Yorumu' : "Editor's Note"
        },
        cards: {
            rst: { title: 'RST', desc: lang === 'tr' ? 'Max eforlu kısa sprintler (3-10sn). Kısa dinlenme (<60sn).' : 'Max effort short sprints (3-10s). Short rest (<60s).' },
            hiit: { title: 'HIIT', desc: lang === 'tr' ? 'VO₂max hızında uzun intervaller (2-4dk).' : 'Long intervals at VO₂max speed (2-4min).' },
            sit: { title: 'SIT', desc: lang === 'tr' ? '"All-out" sprintler (20-30sn). Uzun dinlenme.' : '"All-out" sprints (20-30s). Long rest.' }
        },
        charts: {
            effTitle: lang === 'tr' ? 'VO₂max Artış Etkisi (Hedges\' g)' : 'Effect Size (Hedges\' g)',
            effSub: lang === 'tr' ? 'Konvansiyonel antrenmana kıyasla' : 'Vs. conventional training',
            probTitle: lang === 'tr' ? 'En İyi Olma Olasılığı' : 'Probability of Being Best',
            sweetSpot: lang === 'tr' ? 'Kritik Bulgular: "Tatlı Nokta"' : 'Critical Findings: "Sweet Spot"',
            hiitCurve: lang === 'tr' ? 'HIIT: 140 Saniye Kuralı' : 'HIIT: 140 Second Rule',
            hiitDesc: lang === 'tr' ? 'Ters U Eğrisi: 140sn iş en verimlisi.' : 'Inverted U: 140s work is optimal.',
            sitCurve: lang === 'tr' ? 'SIT: 97 Saniye Sınırı' : 'SIT: 97 Second Threshold',
            sitDesc: lang === 'tr' ? 'Dinlenme > 97sn olursa etki düşer.' : 'Effect drops if rest > 97s.'
        },
        tabs: {
            rst: { 
                label: 'RST', title: 'RST', 
                finding: lang === 'tr' ? 'Haftada 3 seans, 2 haftada sonuç.' : '3 sessions/week, results in 2 weeks.',
                steps: ['6 sn Sprint (Max)', '24 sn Dinlenme (Pasif)', '10 Tekrar'] 
            },
            hiit: { 
                label: 'HIIT', title: 'HIIT', 
                finding: lang === 'tr' ? '140sn iş / 165sn dinlenme (Optimal).' : '140s work / 165s rest (Optimal).',
                steps: ['140 sn Koşu (Yüksek Tempo)', '165 sn Jog (Aktif Dinlenme)', '4-6 Tekrar'] 
            },
            sit: { 
                label: 'SIT', title: 'SIT', 
                finding: lang === 'tr' ? 'Dinlenme < 97sn olmalı.' : 'Rest must be < 97s.',
                steps: ['30 sn Sprint (All-out)', '90 sn Dinlenme', '4-6 Tekrar'] 
            }
        },
        editorNote: lang === 'tr' 
            ? 'Bu derleme yöntemleri ayrı ayrı karşılaştırsa da, hibrit bir yaklaşım pratik olabilir. Örneğin haftada 1 HIIT’i 2 RST seansı ile tamamlamak, VO₂max uyaranını korurken toparlanma maliyetini yönetilebilir tutabilir.'
            : 'Although reviewed separately, a hybrid approach may be practical. Complementing 1 HIIT with 2 RST sessions can maintain VO₂max stimulus while managing recovery costs.',
        citation: 'Yang Q, et al. BMC Sports Sci Med Rehabil. 2025;17:156.',
        warning: lang === 'tr' ? 'Uyarı: Yüksek yoğunluklu antrenman öncesi doktorunuza danışın.' : 'Warning: Consult a doctor before high-intensity training.'
    };

    // --- GRAFİKLER (HTML Dosyasındaki Renkler ve Stil) ---
    
    // 1. Dikey Bar Chart (Effectiveness) - HTML stiline sadık
    const VerticalBarChart = () => (
        <div className="h-64 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 font-mono text-xs text-slate-400 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                {[1.2, 0.9, 0.6, 0.3, 0].map(v => (
                    <div key={v} className="w-full border-t border-slate-400 h-0 relative">
                        <span className="absolute -left-6 -top-2 text-[9px]">{v}</span>
                    </div>
                ))}
            </div>
            
            {[
                { label: 'RST', val: 1.04, color: chartColors.rst.bg },
                { label: 'HIIT', val: 1.01, color: chartColors.hiit.bg },
                { label: 'SIT', val: 0.69, color: chartColors.sit.bg },
                { label: 'CT', val: 0.29, color: chartColors.ct.bg }
            ].map((d) => (
                <div key={d.label} className="flex flex-col items-center justify-end h-full w-full relative group z-10">
                    <span className="mb-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">{d.val}</span>
                    <div 
                        className={`w-full max-w-[40px] rounded-t-md ${d.color} transition-all duration-1000 ease-out hover:opacity-90`} 
                        style={{ height: `${(d.val / 1.2) * 100}%` }}
                    ></div>
                    <span className="mt-2 font-bold">{d.label}</span>
                </div>
            ))}
        </div>
    );

    // 2. Yatay Bar Chart (Probability) - HTML stiline sadık
    const ProbabilityChart = () => (
        <div className="flex flex-col gap-4 w-full font-mono text-xs">
            {[
                { label: 'RST', val: '88%', width: '88%', color: chartColors.rst.bg, text: chartColors.rst.text },
                { label: 'HIIT', val: '85%', width: '85%', color: chartColors.hiit.bg, text: chartColors.hiit.text },
                { label: 'SIT', val: '51%', width: '51%', color: chartColors.sit.bg, text: chartColors.sit.text },
                { label: 'CT', val: '23%', width: '23%', color: chartColors.ct.bg, text: chartColors.ct.text }
            ].map((d) => (
                <div key={d.label} className="w-full">
                    <div className="flex justify-between mb-1 text-slate-300">
                        <span className={`font-bold ${d.text}`}>{d.label}</span>
                        <span className="text-white">{d.val}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.color}`} style={{ width: d.width }}></div>
                    </div>
                </div>
            ))}
        </div>
    );

    // 3. Line Charts (Sweet Spots) - SVG Implementation
    const LineChart = ({ type }) => {
        const isHiit = type === 'hiit';
        const color = isHiit ? chartColors.hiit.hex : chartColors.sit.hex;
        // SVG Paths (Normalized 0-100)
        const pathData = isHiit 
            ? "M0,90 Q20,80 50,20 Q70,0 90,40 Q100,80 100,80" // Inverted U shape
            : "M0,10 L30,10 L45,10 L50,10 L55,80 L100,90"; // Threshold drop shape

        return (
            <div className="w-full h-40 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Grid */}
                    <line x1="0" y1="100" x2="100" y2="100" stroke="#334155" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke="#334155" strokeWidth="0.5" />
                    
                    {/* Curve */}
                    <path 
                        d={pathData} 
                        fill="none" 
                        stroke={color} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="drop-shadow-lg"
                    />
                    
                    {/* Markers */}
                    {isHiit ? (
                        <g>
                            <circle cx="70" cy="5" r="3" fill="#fff" />
                            <text x="70" y="-5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">140s</text>
                            <line x1="70" y1="5" x2="70" y2="100" stroke="#fff" strokeWidth="0.5" strokeDasharray="2" opacity="0.5" />
                        </g>
                    ) : (
                        <g>
                            <circle cx="50" cy="10" r="3" fill="#ef4444" />
                            <text x="50" y="0" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">97s</text>
                            <line x1="50" y1="10" x2="50" y2="100" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2" opacity="0.8" />
                        </g>
                    )}
                </svg>
            </div>
        );
    };

    return (
        <div className="animate-fade-in space-y-12 pb-10">
            {/* Header - App Theme */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                    <span className="text-primary">VO<sub>2</sub>max</span> {t.title.replace('VO₂max', '')}
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
            </div>

            {/* Definitions Cards - App Theme */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">{t.sections.definitions}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.keys(t.cards).map((key, i) => (
                        <div key={key} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-primary/50 transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-black text-primary">{t.cards[key].title}</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">{t.cards[key].desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Charts Section - HTML Colors (Fixed) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Effectiveness */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-1">{t.charts.effTitle}</h3>
                    <p className="text-xs text-slate-500 mb-6">{t.charts.effSub}</p>
                    <VerticalBarChart />
                </div>
                {/* Probability */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white mb-6">{t.charts.probTitle}</h3>
                    <ProbabilityChart />
                </div>
            </section>

            {/* Sweet Spots Section - HTML Colors (Fixed) */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">{t.charts.sweetSpot}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* HIIT Curve - Fixed Indigo */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold text-indigo-400 mb-2">{t.charts.hiitCurve}</h3>
                        <p className="text-sm text-slate-400 mb-6">{t.charts.hiitDesc}</p>
                        <LineChart type="hiit" />
                        <div className="text-center mt-2 text-[10px] text-slate-600 italic">{t.charts.disclaimer}</div>
                    </div>
                    {/* SIT Curve - Fixed Purple */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold text-purple-400 mb-2">{t.charts.sitCurve}</h3>
                        <p className="text-sm text-slate-400 mb-6">{t.charts.sitDesc}</p>
                        <LineChart type="sit" />
                        <div className="text-center mt-2 text-[10px] text-slate-600 italic">{t.charts.disclaimer}</div>
                    </div>
                </div>
            </section>

            {/* Protocols Tabs - App Theme */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">{t.sections.protocols}</h2>
                
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {Object.keys(t.tabs).map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                                activeTab === key 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            {t.tabs[key].label}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-8 animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-black text-white mb-3">{t.tabs[activeTab].title}</h3>
                            <p className="text-primary text-sm font-bold mb-6 bg-primary/10 inline-block px-3 py-1 rounded-lg border border-primary/20">
                                {t.tabs[activeTab].finding}
                            </p>
                            <ul className="space-y-4">
                                {t.tabs[activeTab].steps.map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 text-primary flex items-center justify-center text-xs font-bold border border-slate-600">
                                            {idx + 1}
                                        </span>
                                        <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Protocol Visualizer - App Theme (Primary) */}
                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-center items-center h-full min-h-[200px]">
                            <div className="text-center w-full">
                                <div className="text-5xl font-black text-white/10 mb-4 select-none">
                                    {activeTab === 'rst' ? '10x' : activeTab === 'hiit' ? '4x' : '6x'}
                                </div>
                                <div className="flex items-center justify-center gap-1 h-16 w-full max-w-xs mx-auto">
                                    <div className="h-full bg-primary rounded-l-lg flex items-center justify-center text-white font-bold text-xs relative group" style={{ width: activeTab === 'hiit' ? '45%' : '25%' }}>
                                        <span className="absolute -top-6 text-primary text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Work</span>
                                        {activeTab === 'rst' ? '6s' : activeTab === 'hiit' ? '140s' : '30s'}
                                    </div>
                                    <div className="h-full bg-slate-700 rounded-r-lg flex items-center justify-center text-slate-400 font-bold text-xs relative group" style={{ width: activeTab === 'hiit' ? '55%' : '75%' }}>
                                        <span className="absolute -top-6 text-slate-500 text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Rest</span>
                                        {activeTab === 'rst' ? '24s' : activeTab === 'hiit' ? '165s' : '90s'}
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-slate-500 font-mono uppercase tracking-widest">
                                    1 Interval Cycle
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editor's Note - App Theme */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-primary rounded-r-xl p-6 shadow-lg">
                <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    {t.sections.editor}
                </h3>
                <p className="text-slate-300 text-sm italic leading-relaxed opacity-90">
                    "{t.editorNote}"
                </p>
            </div>

            {/* Footer */}
            <div className="text-center border-t border-slate-800 pt-8">
                <p className="text-slate-500 text-xs mb-4 px-4 font-mono leading-relaxed">{t.citation}</p>
                <div className="inline-block bg-red-500/10 text-red-400 text-xs px-4 py-2 rounded-full font-bold border border-red-500/20">{t.warning}</div>
            </div>
        </div>
    );
};

window.VO2MaxRehberi2025Page = VO2MaxRehberi2025Page;
