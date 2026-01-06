const { useState, useEffect, useRef } = React;

const VO2MaxRehberi2025Page = ({ lang = 'tr' }) => {
    
    // --- Renkler (Sadece Kritik Bulgular Grafikleri İçin Sabit) ---
    const fixedCurveColors = {
        hiit: { hex: '#6366f1' }, // Indigo
        sit: { hex: '#a855f7' }   // Purple
    };

    // --- İçerik Verisi ---
    const t = {
        title: lang === 'tr' ? 'VO₂max Rehberi' : 'VO₂max Guide',
        subtitle: lang === 'tr' 
            ? '"HIIT mi, Sprint mi, yoksa Tekrarlı Sprint mi?" sorusuna 1.261 atlet ve 51 çalışma ile verilen en kapsamlı bilimsel yanıt.'
            : 'The comprehensive scientific answer to "HIIT, Sprint, or Repeated Sprint?" based on 1,261 athletes and 51 studies.',
        sections: {
            definitions: lang === 'tr' ? 'Hangi antrenman türlerinden bahsediyoruz?' : 'Which training types are we talking about?',
            findings: lang === 'tr' ? 'Makale Bulguları: Sayılar Ne Diyor?' : 'Study Findings: What Do The Numbers Say?',
            sweetSpot: lang === 'tr' ? 'Kritik Bulgular: "Tatlı Nokta" Neresi?' : 'Critical Findings: Where is the "Sweet Spot"?',
            protocols: lang === 'tr' ? 'Örnek Antrenman Protokolleri' : 'Sample Training Protocols',
            editor: lang === 'tr' ? 'Editörün Yorumu: Hibrit Yaklaşım' : "Editor's Note: Hybrid Approach"
        },
        cards: {
            rst: {
                title: 'RST',
                badge: lang === 'tr' ? 'En Yüksek Olasılık*' : 'Highest Probability*',
                sub: 'Repeated Sprint Training',
                desc: lang === 'tr' ? 'Maksimum eforlu çok kısa sprintler (3-10 sn). Dinlenmeler kısa (<60 sn). Nabız neredeyse hiç düşmez.' : 'Maximal effort very short sprints (3-10 sec). Short rest periods (<60 sec). Heart rate almost never drops.',
                ex: lang === 'tr' ? 'Örnek: 10 x 40m Sprint / 30sn ara' : 'Example: 10 x 40m Sprint / 30s rest'
            },
            hiit: {
                title: 'HIIT',
                badge: lang === 'tr' ? 'Altın Standart' : 'Gold Standard',
                sub: 'High-Intensity Interval Training',
                desc: lang === 'tr' ? 'VO₂max hızına veya %90-95 nabza yakın uzun intervaller. Çalışma süresi genelde birkaç dakikadır.' : 'Long intervals near VO₂max speed. Work duration is usually several minutes.',
                ex: lang === 'tr' ? 'Örnek: 4dk Koşu / 3dk Jog' : 'Example: 4min Run / 3min Jog'
            },
            sit: {
                title: 'SIT',
                badge: lang === 'tr' ? 'Dikkatli Uygulanmalı' : 'Apply with Caution',
                sub: 'Sprint Interval Training',
                desc: lang === 'tr' ? '"All-out" (tükenene kadar) sprintler (20-30 sn). Genelde uzun dinlenme verilir ama bu makale aksini söylüyor!' : '"All-out" sprints (20-30 sec). Usually long rest is given but this study suggests otherwise!',
                ex: lang === 'tr' ? 'Örnek: 30sn Airbike Max / 90sn ara' : 'Example: 30s Airbike Max / 90s rest'
            }
        },
        charts: {
            effTitle: lang === 'tr' ? 'VO₂max Artış Etkisi (Hedges\' g)' : 'VO₂max Improvement Effect (Hedges\' g)',
            effSub: lang === 'tr' ? 'Konvansiyonel antrenmana (CON) kıyasla ne kadar etkili? (Yüksek daha iyi)' : 'Effectiveness vs conventional training (Higher is better)',
            effNote: lang === 'tr' ? '*CT (Sürekli Koşu) anlamlı bir artış sağlamadı (g=0.29). RST ve HIIT açık ara önde.' : '*CT (Continuous Training) showed no significant increase (g=0.29). RST and HIIT are leading.',
            probTitle: lang === 'tr' ? 'En İyi Olma Olasılığı (P-Score)' : 'Probability of Being Best (P-Score)',
            probSub: lang === 'tr' ? 'İstatistiksel olarak "En İyi Yöntem" olma ihtimalleri.' : 'Statistical probability of being the "Best Method".',
            probNote: lang === 'tr' ? '*Not: İstatistiksel olarak RST, HIIT ve SIT arasında anlamlı bir fark bulunmamıştır (p>0.05). RST sadece "olasılık" olarak ilk sıradadır.' : '*Note: No statistical difference between RST, HIIT, SIT (p>0.05). RST is first by "probability" only.',
            hiitTitle: lang === 'tr' ? 'HIIT: 140 Saniye Kuralı' : 'HIIT: 140 Second Rule',
            hiitDesc: lang === 'tr' ? 'Makale, HIIT süresi ve VO₂max artışı arasında "Ters U Eğrisi" buldu. Çok kısa veya çok uzun intervaller verimsiz.' : 'Study found an "Inverted U Curve" for HIIT duration. Too short or too long is inefficient.',
            hiitBoxTitle: lang === 'tr' ? '🏆 Altın Formül (Bulgu):' : '🏆 Golden Formula (Finding):',
            hiitBoxDesc: lang === 'tr' ? '140 sn Yüklenme / 165 sn Dinlenme (Oran: 0.85)' : '140s Work / 165s Rest (Ratio: 0.85)',
            sitTitle: lang === 'tr' ? 'SIT: 97 Saniye Sınırı' : 'SIT: 97 Second Threshold',
            sitDesc: lang === 'tr' ? 'Şaşırtıcı Bulgu: SIT yaparken dinlenmeyi çok uzatırsan aerobik sistem devre dışı kalıyor ve VO₂max gelişmiyor.' : 'Surprising: If rest > 97s in SIT, aerobic system disengages and VO₂max does not improve.',
            sitBoxTitle: lang === 'tr' ? '⚠️ Kritik Uyarı:' : '⚠️ Critical Warning:',
            sitBoxDesc: lang === 'tr' ? 'Dinlenme süresi > 97 sn olursa VO₂max etkisi anlamsızlaşıyor.' : 'If rest > 97s, VO₂max effect becomes insignificant.',
            disclaimer: lang === 'tr' ? '*Şematik Gösterim: Makaledeki ilişkiyi temsil eder, ham veri değildir.' : '*Schematic Representation: Represents relationship, not raw data.'
        },
        tabs: {
            desc: lang === 'tr' ? 'Makalenin bulgularına (süre, sıklık, mod) dayanarak hazırlanmış örnek reçetelerdir.' : 'Sample prescriptions based on study findings.',
            rst: { 
                label: 'RST (Örnek Seans)', 
                title: 'RST: "2 Haftalık Boost"',
                desc: lang === 'tr' ? 'Makale Bulgusu: Haftada 3 seans yapıldığında, 2 haftada sonuç verir. Protokol detayları (süre/dinlenme) makalede kritik fark yaratmamıştır.' : 'Finding: 3 sessions/week gives results in 2 weeks.',
                sub: lang === 'tr' ? 'Aşağıdaki Yaygın Bir Örnektir:' : 'Common Example:',
                steps: [
                    lang === 'tr' ? 'Uzun ve iyi bir ısınma yap.' : 'Solid warm-up.',
                    lang === 'tr' ? '6 saniye Maksimum Sprint (All-out).' : '6s Max Sprint.',
                    lang === 'tr' ? '24 saniye Pasif Dinlenme (Dur).' : '24s Passive Rest.',
                    lang === 'tr' ? 'Bunu 10 tekrar yap (Pratik Öneri).' : '10 reps (Recommendation).'
                ],
                visual: { count: '10x', work: '6 sn', rest: '24 sn' }
            },
            hiit: { 
                label: lang === 'tr' ? 'HIIT (Optimize)' : 'HIIT (Optimized)', 
                title: lang === 'tr' ? 'HIIT: "Makale Optimumu"' : 'HIIT: "Study Optimum"',
                desc: lang === 'tr' ? 'Makale Bulgusu: En iyi verim 140sn iş ve ~165sn dinlenme ile alınmıştır. Haftada 3 gün, 3-6 hafta uygulanmalı.' : 'Finding: Best with 140s work / 165s rest. 3 days/week, 3-6 weeks.',
                sub: '',
                steps: [
                    lang === 'tr' ? 'Isınma süresi uzun tutulmalı (Lineer pozitif ilişki).' : 'Long warm-up (Positive correlation).',
                    lang === 'tr' ? '2 dk 20 sn (140s) Yüksek Tempo (%90-95 VO₂max).' : '140s High Intensity.',
                    lang === 'tr' ? '2 dk 45 sn (165s) Aktif Dinlenme (Hafif Jog).' : '165s Active Rest.',
                    lang === 'tr' ? 'Genelde 4-6 tekrar (Kondisyona göre ayarlanır).' : '4-6 reps.'
                ],
                visual: { count: '4-6x', work: '140 sn', rest: '165 sn' },
                noteTitle: lang === 'tr' ? 'Mod Önerisi:' : 'Mode:',
                noteDesc: lang === 'tr' ? 'Koşu (Running) modu genellikle olumlu sonuç vermektedir ancak diğer modlarla veri sınırlıdır.' : 'Running mode is generally positive.'
            },
            sit: { 
                label: lang === 'tr' ? 'SIT (Pratik Uygulama)' : 'SIT (Practical)', 
                title: lang === 'tr' ? 'SIT: "Yoğunluk Odaklı"' : 'SIT: "Intensity Focused"',
                desc: lang === 'tr' ? 'Makale Bulgusu: Dinlenme süresi 97 saniyeyi aşmamalıdır. Koşu modu, bisikletten daha etkilidir.' : 'Finding: Rest must be < 97s. Running > Cycling.',
                sub: '',
                steps: [
                    lang === 'tr' ? 'Çok sağlam ısınma (Sakatlık riski yüksek).' : 'Solid warm-up (Injury risk).',
                    lang === 'tr' ? '30 saniye Maksimum Efor (All-Out).' : '30s Max Effort.',
                    lang === 'tr' ? '90 saniye* Hafif Aktif Dinlenme.' : '90s* Light Active Rest.',
                    lang === 'tr' ? '4-6 tekrar (Örnek).' : '4-6 reps.'
                ],
                visual: { count: '4-6x', work: '30 sn', rest: '90 sn' },
                noteTitle: lang === 'tr' ? 'Mod ve Dinlenme Notu:' : 'Mode & Rest Note:',
                noteDesc: lang === 'tr' ? 'Koşu bandı veya pist tercih edilmeli. *90sn dinlenme, "<97sn" kuralına uyan pratik bir uygulamadır.' : 'Treadmill or track. 90s fits the <97s rule.'
            }
        },
        editorText: lang === 'tr' 
            ? 'Bu derleme HIIT, SIT ve RST’yi ayrı ayrı karşılaştırsa da, yöntemlerin pratik uygulanabilirliği açısından hibrit bir yaklaşım makul bir çerçeve sunabilir. Örneğin haftada 1 HIIT’i 2 RST seansı ile tamamlamak, VO₂max uyaranını korurken antrenman süresi ve toparlanma maliyetini yönetilebilir tutmaya yardımcı olabilir; böylece koşu ekonomisi, eşik ve fizyolojik direnç gibi diğer performans bileşenlerine de alan açılır. Bu öneri doğrudan “kombinasyon çalışması”na değil, mevcut bulguların antrenman planlamasına uyarlanmasına dayanır; bireysel toparlanma ve sakatlık riskine göre kişiselleştirilmelidir.'
            : 'Although reviewed separately, a hybrid approach may be practical. Complementing 1 HIIT with 2 RST sessions can maintain VO₂max stimulus while managing recovery costs, opening space for other components. This is a practical adaptation of findings, not a direct combination study result; personalize based on recovery.',
        citation: 'Yang Q, Wang J, Guan D. Comparison of different interval training methods on athletes’ oxygen uptake: a systematic review with pairwise and network meta-analysis. BMC Sports Science, Medicine and Rehabilitation. 2025;17:156. doi:10.1186/s13102-025-01191-6',
        warning: lang === 'tr' ? 'Uyarı: Herhangi bir yüksek yoğunluklu antrenman programına başlamadan önce sağlık durumunuzu kontrol ettiriniz.' : 'Warning: Check health status before high-intensity training.'
    };

    // --- ALT BİLEŞENLER ---

    const HeroSection = () => (
        <header className="relative overflow-hidden py-20 sm:py-28 text-center">
            <div className="relative z-10">
                <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight">
                    <span className="text-primary">VO<sub>2</sub>max</span> {t.title.replace('VO₂max', '')}
                </h1>
                <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                    {t.subtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-400">
                    {t.meta.map((tag, i) => (
                        <div key={i} className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${i===0?'bg-green-500':i===1?'bg-blue-500':'bg-purple-500'}`}></span>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );

    const DefinitionsSection = () => (
        <section className="container mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-primary pl-4">{t.sections.definitions}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* RST Card */}
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-primary/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{t.cards.rst.title}</h3>
                        <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">{t.cards.rst.badge}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-2 font-semibold">{t.cards.rst.sub}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{t.cards.rst.desc}</p>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">{t.cards.rst.ex}</div>
                </div>

                {/* HIIT Card */}
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-primary/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{t.cards.hiit.title}</h3>
                        <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">{t.cards.hiit.badge}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-2 font-semibold">{t.cards.hiit.sub}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{t.cards.hiit.desc}</p>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">{t.cards.hiit.ex}</div>
                </div>

                {/* SIT Card */}
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-primary/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{t.cards.sit.title}</h3>
                        <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">{t.cards.sit.badge}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-2 font-semibold">{t.cards.sit.sub}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{t.cards.sit.desc}</p>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">{t.cards.sit.ex}</div>
                </div>
            </div>
        </section>
    );

    const AnalysisSection = () => {
        // Vertical Bar Chart (Effectiveness)
        const EffectivenessChart = () => (
            <div className="h-64 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 font-mono text-xs text-slate-400 relative mt-8">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 z-0">
                    {[1.2, 0.9, 0.6, 0.3, 0].map((v, i) => (
                        <div key={i} className="w-full border-t border-slate-400 h-0 relative">
                            <span className="absolute -left-6 -top-2 text-[9px]">{v}</span>
                        </div>
                    ))}
                </div>
                
                {[
                    { label: 'RST', val: 1.04, opacity: 'opacity-100' },
                    { label: 'HIIT', val: 1.01, opacity: 'opacity-80' },
                    { label: 'SIT', val: 0.69, opacity: 'opacity-60' },
                    { label: 'CT', val: 0.29, opacity: 'opacity-30' }
                ].map((d) => (
                    <div key={d.label} className="flex flex-col items-center justify-end h-full w-full relative group z-10">
                        <span className="mb-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 px-1 rounded border border-slate-700">{d.val}</span>
                        <div 
                            className={`w-full max-w-[40px] rounded-t-md bg-primary ${d.opacity} transition-all duration-1000 ease-out hover:opacity-100 shadow-lg`} 
                            style={{ height: `${(d.val / 1.2) * 100}%` }}
                        ></div>
                        <span className={`mt-2 font-bold ${d.label === 'CT' ? 'text-slate-500' : 'text-primary'}`}>{d.label}</span>
                    </div>
                ))}
            </div>
        );

        // Horizontal Bar Chart (Probability)
        const ProbabilityChart = () => (
            <div className="flex flex-col gap-4 w-full font-mono text-xs">
                {[
                    { label: 'RST', val: '88%', width: '88%', opacity: 'opacity-100' },
                    { label: 'HIIT', val: '85%', width: '85%', opacity: 'opacity-80' },
                    { label: 'SIT', val: '51%', width: '51%', opacity: 'opacity-50' },
                    { label: 'CT', val: '23%', width: '23%', opacity: 'opacity-20' }
                ].map((d) => (
                    <div key={d.label} className="w-full">
                        <div className="flex justify-between mb-1 text-slate-300">
                            <span className={`font-bold ${d.label === 'CT' ? 'text-slate-500' : 'text-primary'}`}>{d.label}</span>
                            <span className="text-white">{d.val}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full bg-primary ${d.opacity}`} style={{ width: d.width }}></div>
                        </div>
                    </div>
                ))}
            </div>
        );

        return (
            <section className="container mx-auto px-4 mb-16">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-primary pl-4">{t.sections.findings}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Chart 1: Effectiveness */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-semibold mb-1 text-white">{t.charts.effTitle}</h3>
                        <p className="text-xs text-slate-400 mb-4">{t.charts.effSub}</p>
                        <EffectivenessChart />
                        <div className="mt-4 p-3 bg-slate-800/50 rounded border border-slate-700">
                            <p className="text-xs text-slate-500 mt-2 italic border-t border-slate-700/50 pt-2">
                                {t.charts.effNote}
                            </p>
                        </div>
                    </div>

                    {/* Chart 2: Ranking Probability */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold mb-2 text-white">{t.charts.probTitle}</h3>
                        <p className="text-xs text-slate-400 mb-6">{t.charts.probSub}</p>
                        <ProbabilityChart />
                        <div className="mt-4 p-3 bg-slate-800 rounded text-xs text-slate-400 border-l-2 border-primary">
                            {t.charts.probNote}
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const OptimizationSection = () => {
        // Curve Chart Logic (SVG)
        const CurveChart = ({ type }) => {
            const isHiit = type === 'hiit';
            const color = isHiit ? fixedCurveColors.hiit.hex : fixedCurveColors.sit.hex;
            
            // --- Corrected Scales (0-300px ViewBox) ---
            // HIIT: Peak at 140s. X range 0-300s. 140s = 140px.
            const pathDataHiit = "M30,130 Q85,130 140,20 Q195,130 240,130"; 
            // SIT: Drop at 97s. X range 0-180s. 97s = (97/180)*300 ≈ 162px.
            const pathDataSit = "M0,20 L162,20 L172,130 L300,130";

            const pathData = isHiit ? pathDataHiit : pathDataSit;
            const markerX = isHiit ? 140 : 162; 
            const markerY = 20;
            const markerLabel = isHiit ? "140s" : "97s";
            const xEndLabel = isHiit ? "300s" : "180s";

            return (
                <div className="w-full h-48 relative bg-slate-800/50 rounded-xl border border-slate-700/50 p-2">
                    <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        {/* Grid */}
                        <line x1="0" y1="150" x2="300" y2="150" stroke="#334155" strokeWidth="1" />
                        <line x1="0" y1="0" x2="0" y2="150" stroke="#334155" strokeWidth="1" />
                        
                        {/* Curve */}
                        <path 
                            d={pathData} 
                            fill="none" 
                            stroke={color} 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="drop-shadow-xl"
                        />
                        
                        {/* Marker Area */}
                        <line x1={markerX} y1={markerY} x2={markerX} y2="150" stroke={color} strokeWidth="1" strokeDasharray="4" opacity="0.6" />
                        <circle cx={markerX} cy={markerY} r="5" fill="#fff" stroke={color} strokeWidth="2" />
                        
                        {/* Label */}
                        <text x={markerX} y="10" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" className="drop-shadow-md">
                            {markerLabel}
                        </text>
                    </svg>
                    {/* X-Axis Labels */}
                    <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-slate-500 px-2 pointer-events-none">
                        <span>0s</span>
                        <span>{xEndLabel}</span>
                    </div>
                </div>
            );
        };

        return (
            <section className="container mx-auto px-4 mb-16">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-green-500 pl-4">{t.sections.sweetSpot}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* HIIT Sweet Spot */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-semibold text-indigo-400 mb-2">{t.charts.hiitTitle}</h3>
                        <p className="text-sm text-slate-400 mb-4">{t.charts.hiitDesc}</p>
                        <CurveChart type="hiit" />
                        <div className="mt-2 text-center">
                            <span className="text-[0.7rem] text-slate-500 italic">{t.charts.disclaimer}</span>
                        </div>
                        <div className="mt-4 bg-indigo-900/30 p-3 rounded border border-indigo-500/30">
                            <p className="text-sm font-bold text-indigo-200">{t.charts.hiitBoxTitle}</p>
                            <p className="text-xs text-slate-300">{t.charts.hiitBoxDesc}</p>
                        </div>
                    </div>

                    {/* SIT Warning */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">{t.charts.sitTitle}</h3>
                        <p className="text-sm text-slate-400 mb-4">{t.charts.sitDesc}</p>
                        <CurveChart type="sit" />
                        <div className="mt-2 text-center">
                            <span className="text-[0.7rem] text-slate-500 italic">{t.charts.disclaimer}</span>
                        </div>
                        <div className="mt-4 bg-purple-900/30 p-3 rounded border border-purple-500/30">
                            <p className="text-sm font-bold text-purple-200">{t.charts.sitBoxTitle}</p>
                            <p className="text-xs text-slate-300">{t.charts.sitBoxDesc}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const ProtocolSection = () => {
        return (
            <section className="container mx-auto px-4 mb-16">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-pink-500 pl-4">{t.sections.protocols}</h2>
                <p className="text-slate-400 mb-8">{t.tabs.desc}</p>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {Object.keys(t.tabs).filter(k => k !== 'desc').map(key => (
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

                {/* Content */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-8 animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                    {Object.keys(t.tabs).filter(k => k !== 'desc').map(key => (
                        activeTab === key && (
                            <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-3">{t.tabs[key].title}</h3>
                                    <p className="text-primary text-sm font-bold mb-6 bg-primary/10 inline-block px-3 py-1 rounded-lg border border-primary/20">
                                        {t.tabs[key].finding}
                                    </p>
                                    <ul className="space-y-4">
                                        {t.tabs[key].steps.map((step, idx) => (
                                            <li key={idx} className="flex items-start gap-4">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 text-primary flex items-center justify-center text-xs font-bold border border-slate-600">
                                                    {idx + 1}
                                                </span>
                                                <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-center items-center h-full min-h-[200px]">
                                    <div className="text-center w-full">
                                        <div className="text-5xl font-black text-white/10 mb-4 select-none">
                                            {t.tabs[key].visual.count}
                                        </div>
                                        <div className="flex items-center justify-center gap-1 h-16 w-full max-w-xs mx-auto">
                                            {/* Work Bar */}
                                            <div className="h-full bg-primary rounded-l-lg flex items-center justify-center text-white font-bold text-xs relative group" style={{ width: key === 'hiit' ? '45%' : '25%' }}>
                                                <span className="absolute -top-6 text-primary text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Work</span>
                                                {t.tabs[key].visual.work}
                                            </div>
                                            {/* Rest Bar */}
                                            <div className="h-full bg-slate-700 rounded-r-lg flex items-center justify-center text-slate-400 font-bold text-xs relative group" style={{ width: key === 'hiit' ? '55%' : '75%' }}>
                                                <span className="absolute -top-6 text-slate-500 text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Rest</span>
                                                {t.tabs[key].visual.rest}
                                            </div>
                                        </div>
                                        <div className="mt-4 text-xs text-slate-500 font-mono uppercase tracking-widest">
                                            1 Interval Cycle
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </section>
        );
    };

    const EditorsNote = () => (
        <section className="container mx-auto px-4 mb-24">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-primary rounded-r-xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-primary font-bold mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {t.sections.editor}
                </h3>
                <p className="text-slate-300 italic leading-relaxed text-sm sm:text-base">
                    "{t.editorText}"
                </p>
            </div>
        </section>
    );

    const Footer = () => (
        <footer className="container mx-auto px-4 py-8 text-center text-xs border-t border-slate-800">
            <p className="text-slate-500 mb-4">{t.citation}</p>
            <p className="text-red-400 font-semibold bg-red-900/10 p-2 rounded inline-block">
                {t.warning}
            </p>
        </footer>
    );

    // --- Ana Render ---
    return (
        <div className="w-full min-h-screen animate-fade-in">
            <HeroSection />
            <DefinitionsSection />
            <AnalysisSection />
            <OptimizationSection />
            <ProtocolSection />
            <EditorsNote />
            <Footer />
        </div>
    );
};

window.VO2MaxRehberi2025Page = VO2MaxRehberi2025Page;
