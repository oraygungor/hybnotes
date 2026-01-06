const { useState } = React;

const VO2MaxRehberi2025Page = ({ lang = 'tr' }) => {
    const [activeTab, setActiveTab] = useState('rst');

    // --- Renk Sabitleri (Sadece Grafikler İçin - HTML'den) ---
    const colors = {
        rst: { main: '#0ea5e9', bg: 'bg-sky-500', text: 'text-sky-400', badgeBg: 'bg-sky-900', badgeText: 'text-sky-200', border: 'border-sky-500' }, 
        hiit: { main: '#6366f1', bg: 'bg-indigo-500', text: 'text-indigo-400', badgeBg: 'bg-indigo-900', badgeText: 'text-indigo-200', border: 'border-indigo-500' }, 
        sit: { main: '#a855f7', bg: 'bg-purple-500', text: 'text-purple-400', badgeBg: 'bg-purple-900', badgeText: 'text-purple-200', border: 'border-purple-500' }, 
    };

    // --- İçerik ve Çeviriler ---
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
            rst: {
                title: 'RST',
                badge: lang === 'tr' ? 'En Yüksek Olasılık' : 'Highest Probability',
                desc: lang === 'tr' ? 'Maksimum eforlu kısa sprintler (3-10 sn). Dinlenmeler kısa (<60 sn).' : 'Max effort short sprints (3-10s). Short recovery (<60s).',
                ex: lang === 'tr' ? 'Örnek: 10 x 40m Sprint / 30sn ara' : 'Ex: 10 x 40m Sprint / 30s rest'
            },
            hiit: {
                title: 'HIIT',
                badge: lang === 'tr' ? 'Altın Standart' : 'Gold Standard',
                desc: lang === 'tr' ? 'VO₂max hızına yakın uzun intervaller. Çalışma süresi genelde birkaç dakikadır.' : 'Long intervals near VO₂max speed. Work duration usually several minutes.',
                ex: lang === 'tr' ? 'Örnek: 4dk Koşu / 3dk Jog' : 'Ex: 4min Run / 3min Jog'
            },
            sit: {
                title: 'SIT',
                badge: lang === 'tr' ? 'Dikkatli Uygulanmalı' : 'Apply with Caution',
                desc: lang === 'tr' ? '"All-out" sprintler (20-30 sn). Genelde uzun dinlenme verilir.' : '"All-out" sprints (20-30s). Usually long recovery.',
                ex: lang === 'tr' ? 'Örnek: 30sn Max / 90sn ara' : 'Ex: 30s Max / 90s rest'
            }
        },
        charts: {
            effTitle: lang === 'tr' ? 'VO₂max Artış Etkisi (Hedges\' g)' : 'VO₂max Improvement Effect (Hedges\' g)',
            effSub: lang === 'tr' ? 'Konvansiyonel antrenmana kıyasla etki büyüklüğü' : 'Effect size vs conventional training',
            probTitle: lang === 'tr' ? 'En İyi Olma Olasılığı' : 'Probability of Being Best',
            sweetSpot: lang === 'tr' ? 'Kritik Bulgular: "Tatlı Nokta"' : 'Critical Findings: "Sweet Spot"',
            hiitCurve: lang === 'tr' ? 'HIIT: 140 Saniye Kuralı' : 'HIIT: 140 Second Rule',
            hiitDesc: lang === 'tr' ? 'Ters U Eğrisi: 140sn iş ve 0.85 oran en verimlisi.' : 'Inverted U-Curve: 140s work and 0.85 ratio is optimal.',
            sitCurve: lang === 'tr' ? 'SIT: 97 Saniye Sınırı' : 'SIT: 97 Second Threshold',
            sitDesc: lang === 'tr' ? 'Dinlenme > 97sn olursa etki kayboluyor.' : 'Effect diminishes if recovery > 97s.',
            disclaimer: lang === 'tr' ? '*Şematik gösterimdir.' : '*Schematic representation.'
        },
        tabs: {
            rst: { 
                label: 'RST', 
                title: lang === 'tr' ? 'RST: "2 Haftalık Boost"' : 'RST: "2-Week Boost"',
                finding: lang === 'tr' ? 'Bulgu: Haftada 3 seans, 2 haftada sonuç verir.' : 'Finding: 3 sessions/week yields results in 2 weeks.',
                steps: [
                    lang === 'tr' ? 'İyi bir ısınma yap.' : 'Perform a solid warm-up.',
                    lang === 'tr' ? '6 sn Maksimum Sprint (All-out).' : '6 sec Max Sprint (All-out).',
                    lang === 'tr' ? '24 sn Pasif Dinlenme (Dur).' : '24 sec Passive Rest (Stop).',
                    lang === 'tr' ? '10 tekrar yap (Örnek).' : 'Perform 10 reps (Example).'
                ]
            },
            hiit: { 
                label: lang === 'tr' ? 'HIIT (Optimize)' : 'HIIT (Optimized)', 
                title: lang === 'tr' ? 'HIIT: "Makale Optimumu"' : 'HIIT: "Study Optimum"',
                finding: lang === 'tr' ? 'Bulgu: 140sn iş / 165sn dinlenme en iyisi.' : 'Finding: 140s work / 165s rest is best.',
                steps: [
                    lang === 'tr' ? 'Uzun ısınma (Pozitif etki).' : 'Long warm-up (Positive effect).',
                    lang === 'tr' ? '2 dk 20 sn (140s) Yüksek Tempo.' : '2 min 20 s (140s) High Intensity.',
                    lang === 'tr' ? '2 dk 45 sn (165s) Aktif Dinlenme.' : '2 min 45 s (165s) Active Rest.',
                    lang === 'tr' ? '4-6 tekrar (Örnek).' : '4-6 reps (Example).'
                ]
            },
            sit: { 
                label: lang === 'tr' ? 'SIT (Pratik)' : 'SIT (Practical)', 
                title: lang === 'tr' ? 'SIT: "Yoğunluk Odaklı"' : 'SIT: "Intensity Focused"',
                finding: lang === 'tr' ? 'Bulgu: Dinlenme < 97sn olmalı. Koşu daha iyi.' : 'Finding: Recovery must be < 97s. Running is better.',
                steps: [
                    lang === 'tr' ? 'Çok sağlam ısınma.' : 'Very thorough warm-up.',
                    lang === 'tr' ? '30 sn Maksimum Efor.' : '30 sec Max Effort.',
                    lang === 'tr' ? '90 sn Hafif Aktif Dinlenme (<97s).' : '90 sec Light Active Rest (<97s).',
                    lang === 'tr' ? '4-6 tekrar (Örnek).' : '4-6 reps (Example).'
                ]
            }
        },
        editorNote: lang === 'tr' 
            ? 'Bu derleme HIIT, SIT ve RST’yi ayrı ayrı karşılaştırsa da, yöntemlerin pratik uygulanabilirliği açısından hibrit bir yaklaşım makul bir çerçeve sunabilir. Örneğin haftada 1 HIIT’i 2 RST seansı ile tamamlamak, VO₂max uyaranını korurken antrenman süresi ve toparlanma maliyetini yönetilebilir tutmaya yardımcı olabilir; böylece koşu ekonomisi, eşik ve fizyolojik direnç gibi diğer performans bileşenlerine de alan açılır. Bu öneri doğrudan “kombinasyon çalışması”na değil, mevcut bulguların antrenman planlamasına uyarlanmasına dayanır; bireysel toparlanma ve sakatlık riskine göre kişiselleştirilmelidir.'
            : 'Although this review compares HIIT, SIT, and RST separately, a hybrid approach may offer a reasonable framework for practical applicability. For example, complementing 1 HIIT session per week with 2 RST sessions can help maintain the VO₂max stimulus while keeping training time and recovery costs manageable, thereby opening up space for other performance components such as running economy, threshold, and physiological resilience. This suggestion relies on adapting current findings to training planning rather than direct "combination studies"; it should be personalized based on individual recovery and injury risk.',
        citation: 'Yang Q, Wang J, Guan D. Comparison of different interval training methods on athletes’ oxygen uptake: a systematic review with pairwise and network meta-analysis. BMC Sports Science, Medicine and Rehabilitation. 2025;17:156.',
        warning: lang === 'tr' ? 'Uyarı: Yüksek yoğunluklu antrenmana başlamadan önce sağlık kontrolü yaptırınız.' : 'Warning: Consult a doctor before starting high-intensity training.'
    };

    // --- Helper Components for Charts (SVG) ---
    // BarChart: Renkler sabit (HTML stili), ancak yazı tipi ve container App.js'ten
    const BarChart = () => (
        <div className="flex flex-col gap-3 w-full font-mono text-xs">
            {[
                { label: 'RST', val: 1.04, color: 'bg-sky-500', width: '100%' },
                { label: 'HIIT', val: 1.01, color: 'bg-indigo-500', width: '97%' },
                { label: 'SIT', val: 0.69, color: 'bg-purple-500', width: '66%' },
                { label: 'CT', val: 0.29, color: 'bg-slate-500', width: '28%' }
            ].map((d) => (
                <div key={d.label} className="w-full">
                    <div className="flex justify-between mb-1 text-slate-300">
                        <span>{d.label}</span>
                        <span>{d.val}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.color} transition-all duration-1000 ease-out`} style={{ width: d.width }}></div>
                    </div>
                </div>
            ))}
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 border-t border-slate-700 pt-1">
                <span>0.2: {lang==='tr'?'Küçük':'Small'}</span>
                <span>0.5: {lang==='tr'?'Orta':'Medium'}</span>
                <span>0.8+: {lang==='tr'?'Büyük Etki':'Large Effect'}</span>
            </div>
        </div>
    );

    // RankingChart: Renkler sabit (HTML stili)
    const RankingChart = () => (
        <div className="flex flex-col gap-3 w-full font-mono text-xs">
            {[
                { label: 'RST', val: '88%', width: '88%', color: 'bg-sky-500', text: 'text-sky-400' },
                { label: 'HIIT', val: '85%', width: '85%', color: 'bg-indigo-500', text: 'text-indigo-400' },
                { label: 'SIT', val: '51%', width: '51%', color: 'bg-purple-500', text: 'text-purple-400' },
                { label: 'CT', val: '23%', width: '23%', color: 'bg-slate-500', text: 'text-slate-400' }
            ].map((d) => (
                <div key={d.label} className="w-full">
                    <div className="flex justify-between mb-1 text-slate-300">
                        <span className={`font-bold ${d.text}`}>{d.label}</span>
                        <span className="text-white">{d.val}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.color} transition-all duration-1000 ease-out`} style={{ width: d.width }}></div>
                    </div>
                </div>
            ))}
        </div>
    );

    // CurveChart: Renkler sabit (HTML stili)
    const CurveChart = ({ type }) => {
        const hiitPoints = "0,100 20,80 50,20 70,0 90,40 100,80"; 
        const sitPoints = "0,5 30,5 48,5 50,5 52,90 100,95"; 
        const points = type === 'hiit' ? hiitPoints : sitPoints;
        const color = type === 'hiit' ? colors.hiit.main : colors.sit.main;
        
        return (
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <line x1="0" y1="100" x2="100" y2="100" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="100" stroke="#334155" strokeWidth="1" />
                <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" className="drop-shadow-lg" />
                {type === 'hiit' ? (
                    <g>
                        <circle cx="70" cy="0" r="3" className="fill-white" />
                        <text x="70" y="-10" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">140s</text>
                        <line x1="70" y1="0" x2="70" y2="100" stroke="white" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
                    </g>
                ) : (
                    <g>
                        <circle cx="50" cy="5" r="3" className="fill-red-500" />
                        <text x="50" y="-5" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">97s</text>
                        <line x1="50" y1="5" x2="50" y2="100" stroke="red" strokeWidth="1" strokeDasharray="2" opacity="0.8" />
                    </g>
                )}
            </svg>
        );
    };

    return (
        <div className="animate-fade-in space-y-12 pb-10">
            {/* Header: App Teması (Primary Color) */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                    <span className="text-primary">VO<sub>2</sub>max</span> {t.title.replace('VO₂max', '')}
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {t.subtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-xs font-mono text-slate-500">
                    <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Yang et al. (2025)</span>
                    <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Meta-Analysis</span>
                    <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">N=1,261 Athletes</span>
                </div>
            </div>

            {/* Definitions Cards: GRAFİK (Sabit Renkler) */}
            <section>
                {/* Başlık App Temasından */}
                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">{t.sections.definitions}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* RST Card - Sky Blue (Sabit) */}
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-sky-500/50 transition-all hover:-translate-y-1 duration-300">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className={`text-xl font-black ${colors.rst.text}`}>{t.cards.rst.title}</h3>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${colors.rst.badgeBg} ${colors.rst.badgeText}`}>
                                {t.cards.rst.badge}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{t.cards.rst.desc}</p>
                        <div className="pt-4 border-t border-slate-700/50 text-xs text-slate-500 font-mono">
                            {t.cards.rst.ex}
                        </div>
                    </div>

                    {/* HIIT Card - Indigo (Sabit) */}
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-indigo-500/50 transition-all hover:-translate-y-1 duration-300">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className={`text-xl font-black ${colors.hiit.text}`}>{t.cards.hiit.title}</h3>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${colors.hiit.badgeBg} ${colors.hiit.badgeText}`}>
                                {t.cards.hiit.badge}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{t.cards.hiit.desc}</p>
                        <div className="pt-4 border-t border-slate-700/50 text-xs text-slate-500 font-mono">
                            {t.cards.hiit.ex}
                        </div>
                    </div>

                    {/* SIT Card - Purple (Sabit) */}
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-2xl hover:border-purple-500/50 transition-all hover:-translate-y-1 duration-300">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className={`text-xl font-black ${colors.sit.text}`}>{t.cards.sit.title}</h3>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${colors.sit.badgeBg} ${colors.sit.badgeText}`}>
                                {t.cards.sit.badge}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{t.cards.sit.desc}</p>
                        <div className="pt-4 border-t border-slate-700/50 text-xs text-slate-500 font-mono">
                            {t.cards.sit.ex}
                        </div>
                    </div>
                </div>
            </section>

            {/* Charts Section: GRAFİK (Sabit Renkler) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Effectiveness */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-1">{t.charts.effTitle}</h3>
                    <p className="text-xs text-slate-500 mb-6">{t.charts.effSub}</p>
                    <BarChart />
                </div>
                {/* Probability */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white mb-6">{t.charts.probTitle}</h3>
                    <RankingChart />
                </div>
            </section>

            {/* Sweet Spots Section: GRAFİK (Sabit Renkler) */}
            <section>
                {/* Başlık App Temasından */}
                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">{t.charts.sweetSpot}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* HIIT Curve - Indigo (Sabit) */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold text-indigo-400 mb-2">{t.charts.hiitCurve}</h3>
                        <p className="text-sm text-slate-400 mb-6 h-10">{t.charts.hiitDesc}</p>
                        <div className="h-40 w-full px-4">
                            <CurveChart type="hiit" />
                        </div>
                        <div className="text-center mt-2 text-[10px] text-slate-600 italic">{t.charts.disclaimer}</div>
                    </div>
                    {/* SIT Curve - Purple (Sabit) */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold text-purple-400 mb-2">{t.charts.sitCurve}</h3>
                        <p className="text-sm text-slate-400 mb-6 h-10">{t.charts.sitDesc}</p>
                        <div className="h-40 w-full px-4 text-purple-400">
                            <CurveChart type="sit" />
                        </div>
                        <div className="text-center mt-2 text-[10px] text-slate-600 italic">{t.charts.disclaimer}</div>
                    </div>
                </div>
            </section>

            {/* Protocols Tabs: Arayüz App Temasından, İçerik Grafikten */}
            <section>
                {/* Başlık App Temasından */}
                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">{t.sections.protocols}</h2>
                
                {/* Sekmeler App Temasından (Primary) */}
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
                    {/* Kenarlık Çizgisi App Temasından */}
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
                                        <span className="text-slate-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step.replace(/\((.*?)\)/g, '<span class="text-slate-500 text-xs ml-1">($1)</span>') }}></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Protocol Visualizer: GRAFİK (Sabit Renkler) */}
                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-center items-center h-full min-h-[200px]">
                            <div className="text-center w-full">
                                <div className="text-5xl font-black text-white/10 mb-4 select-none">
                                    {activeTab === 'rst' ? '10x' : activeTab === 'hiit' ? '4x' : '6x'}
                                </div>
                                <div className="flex items-center justify-center gap-1 h-16 w-full max-w-xs mx-auto">
                                    {/* Work Bar - Sabit Renkler */}
                                    <div 
                                        className={`h-full rounded-l-lg flex items-center justify-center text-white font-bold text-xs relative group ${
                                            activeTab === 'rst' ? 'bg-sky-500' : activeTab === 'hiit' ? 'bg-indigo-500' : 'bg-purple-500'
                                        }`}
                                        style={{ width: activeTab === 'hiit' ? '45%' : '25%' }}
                                    >
                                        <span className={`absolute -top-6 text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                                            activeTab === 'rst' ? 'text-sky-400' : activeTab === 'hiit' ? 'text-indigo-400' : 'text-purple-400'
                                        }`}>Work</span>
                                        {activeTab === 'rst' ? '6s' : activeTab === 'hiit' ? '140s' : '30s'}
                                    </div>
                                    {/* Rest Bar */}
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

            {/* Editor's Note: App Teması (Primary) */}
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
                <p className="text-slate-500 text-xs mb-4 px-4 font-mono leading-relaxed">
                    {t.citation}
                </p>
                <div className="inline-block bg-red-500/10 text-red-400 text-xs px-4 py-2 rounded-full font-bold border border-red-500/20">
                    {t.warning}
                </div>
            </div>
        </div>
    );
};

window.VO2MaxRehberi2025Page = VO2MaxRehberi2025Page;
