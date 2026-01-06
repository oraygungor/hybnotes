const { useState } = React;

const VO2MaxRehberi2025Page = ({ lang = 'tr' }) => {
    const [activeTab, setActiveTab] = useState('rst');

    // --- İÇERİK VERİSİ (HTML Dosyasından Birebir) ---
    const t = {
        header: {
            title: lang === 'tr' ? 'Rehberi' : 'Guide',
            subtitle: lang === 'tr' 
                ? '"HIIT mi, Sprint mi, yoksa Tekrarlı Sprint mi?" sorusuna 1.261 atlet ve 51 çalışma ile verilen en kapsamlı bilimsel yanıt.'
                : 'The comprehensive scientific answer to "HIIT, Sprint, or Repeated Sprint?" based on 1,261 athletes and 51 studies.',
            tags: [
                'Yang et al. (2025)',
                'Meta-Analiz',
                lang === 'tr' ? 'Hibrit Atlet Odaklı' : 'Hybrid Athlete Focused'
            ]
        },
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
                desc: lang === 'tr' 
                    ? 'Maksimum eforlu çok kısa sprintler (3-10 sn). Dinlenmeler kısa (<60 sn). Nabız neredeyse hiç düşmez.'
                    : 'Maximal effort very short sprints (3-10 sec). Short rest periods (<60 sec). Heart rate almost never drops.',
                ex: lang === 'tr' ? 'Örnek: 10 x 40m Sprint / 30sn ara' : 'Example: 10 x 40m Sprint / 30s rest'
            },
            hiit: {
                title: 'HIIT',
                badge: lang === 'tr' ? 'Altın Standart' : 'Gold Standard',
                sub: 'High-Intensity Interval Training',
                desc: lang === 'tr'
                    ? 'VO₂max hızına veya %90-95 nabza yakın uzun intervaller. Çalışma süresi genelde birkaç dakikadır.'
                    : 'Long intervals near VO₂max speed or 90-95% heart rate. Work duration is usually several minutes.',
                ex: lang === 'tr' ? 'Örnek: 4dk Koşu / 3dk Jog' : 'Example: 4min Run / 3min Jog'
            },
            sit: {
                title: 'SIT',
                badge: lang === 'tr' ? 'Dikkatli Uygulanmalı' : 'Apply with Caution',
                sub: 'Sprint Interval Training',
                desc: lang === 'tr'
                    ? '"All-out" (tükenene kadar) sprintler (20-30 sn). Genelde uzun dinlenme verilir ama bu makale aksini söylüyor!'
                    : '"All-out" sprints (20-30 sec). Usually long rest is given but this study suggests otherwise!',
                ex: lang === 'tr' ? 'Örnek: 30sn Airbike Max / 90sn ara' : 'Example: 30s Airbike Max / 90s rest'
            }
        },
        charts: {
            effTitle: lang === 'tr' ? 'VO₂max Artış Etkisi (Hedges\' g)' : 'VO₂max Improvement Effect (Hedges\' g)',
            effSub: lang === 'tr' ? 'Konvansiyonel antrenmana (CON) kıyasla ne kadar etkili? (Yüksek daha iyi)' : 'How effective compared to conventional training (CON)? (Higher is better)',
            effNote: lang === 'tr' ? '*CT (Sürekli Koşu) anlamlı bir artış sağlamadı (g=0.29). RST ve HIIT açık ara önde.' : '*CT (Continuous Training) did not provide significant increase (g=0.29). RST and HIIT are far ahead.',
            probTitle: lang === 'tr' ? 'En İyi Olma Olasılığı (P-Score)' : 'Probability of Being Best (P-Score)',
            probSub: lang === 'tr' ? 'İstatistiksel olarak "En İyi Yöntem" olma ihtimalleri.' : 'Statistical probability of being the "Best Method".',
            probNote: lang === 'tr' ? '*Not: İstatistiksel olarak RST, HIIT ve SIT arasında anlamlı bir fark bulunmamıştır (p>0.05). RST sadece "olasılık" olarak ilk sıradadır.' : '*Note: No statistically significant difference was found between RST, HIIT and SIT (p>0.05). RST is first only in "probability".',
            hiitTitle: lang === 'tr' ? 'HIIT: 140 Saniye Kuralı' : 'HIIT: 140 Second Rule',
            hiitDesc: lang === 'tr' ? 'Makale, HIIT süresi ve VO₂max artışı arasında "Ters U Eğrisi" buldu. Çok kısa veya çok uzun intervaller verimsiz.' : 'The study found an "Inverted U Curve" between HIIT duration and VO₂max increase. Too short or too long intervals are inefficient.',
            hiitBoxTitle: lang === 'tr' ? '🏆 Altın Formül (Bulgu):' : '🏆 Golden Formula (Finding):',
            hiitBoxDesc: lang === 'tr' ? '140 sn Yüklenme / 165 sn Dinlenme (Oran: 0.85)' : '140s Work / 165s Rest (Ratio: 0.85)',
            sitTitle: lang === 'tr' ? 'SIT: 97 Saniye Sınırı' : 'SIT: 97 Second Threshold',
            sitDesc: lang === 'tr' ? 'Şaşırtıcı Bulgu: SIT yaparken dinlenmeyi çok uzatırsan aerobik sistem devre dışı kalıyor ve VO₂max gelişmiyor.' : 'Surprising Finding: If you prolong rest too much during SIT, the aerobic system disengages and VO₂max does not improve.',
            sitBoxTitle: lang === 'tr' ? '⚠️ Kritik Uyarı:' : '⚠️ Critical Warning:',
            sitBoxDesc: lang === 'tr' ? 'Dinlenme süresi > 97 sn olursa VO₂max etkisi anlamsızlaşıyor.' : 'If rest duration > 97s, VO₂max effect becomes insignificant.',
            disclaimer: lang === 'tr' ? '*Şematik Gösterim: Makaledeki ilişkiyi temsil eder, ham veri değildir.' : '*Schematic Representation: Represents the relationship in the study, not raw data.'
        },
        tabs: {
            desc: lang === 'tr' 
                ? 'Makalenin bulgularına (süre, sıklık, mod) dayanarak hazırlanmış örnek reçetelerdir.'
                : 'Sample prescriptions prepared based on the study findings (duration, frequency, mode).',
            rst: { 
                label: 'RST (Örnek Seans)', 
                title: 'RST: "2 Haftalık Boost"',
                desc: lang === 'tr' 
                    ? 'Makale Bulgusu: Haftada 3 seans yapıldığında, 2 haftada sonuç verir. Protokol detayları (süre/dinlenme) makalede kritik fark yaratmamıştır.'
                    : 'Study Finding: When performed 3 sessions per week, yields results in 2 weeks. Protocol details (duration/rest) did not create critical difference in the study.',
                sub: lang === 'tr' ? 'Aşağıdaki Yaygın Bir Örnektir:' : 'Below is a Common Example:',
                steps: [
                    lang === 'tr' ? 'Uzun ve iyi bir ısınma yap.' : 'Perform a long and good warm-up.',
                    lang === 'tr' ? '6 saniye Maksimum Sprint (All-out).' : '6 seconds Maximum Sprint (All-out).',
                    lang === 'tr' ? '24 saniye Pasif Dinlenme (Dur).' : '24 seconds Passive Rest (Stop).',
                    lang === 'tr' ? 'Bunu 10 tekrar yap (Pratik Öneri).' : 'Do this for 10 reps (Practical Recommendation).'
                ],
                visual: { count: '10x', label: lang === 'tr' ? 'Örnek Tekrar' : 'Example Rep', work: '6 sn', rest: '24 sn' }
            },
            hiit: { 
                label: lang === 'tr' ? 'HIIT (Optimize)' : 'HIIT (Optimized)', 
                title: lang === 'tr' ? 'HIIT: "Makale Optimumu"' : 'HIIT: "Study Optimum"',
                desc: lang === 'tr' 
                    ? 'Makale Bulgusu: En iyi verim 140sn iş ve ~165sn dinlenme ile alınmıştır. Haftada 3 gün, 3-6 hafta uygulanmalı.'
                    : 'Study Finding: Best efficiency was obtained with 140s work and ~165s rest. Should be applied 3 days a week, for 3-6 weeks.',
                sub: '',
                steps: [
                    lang === 'tr' ? 'Isınma süresi uzun tutulmalı (Lineer pozitif ilişki).' : 'Warm-up duration should be kept long (Linear positive relationship).',
                    lang === 'tr' ? '2 dk 20 sn (140s) Yüksek Tempo (%90-95 VO₂max).' : '2 min 20 sec (140s) High Tempo (90-95% VO₂max).',
                    lang === 'tr' ? '2 dk 45 sn (165s) Aktif Dinlenme (Hafif Jog).' : '2 min 45 sec (165s) Active Rest (Light Jog).',
                    lang === 'tr' ? 'Genelde 4-6 tekrar (Kondisyona göre ayarlanır).' : 'Usually 4-6 reps (Adjusted by condition).'
                ],
                visual: { count: '4-6x', label: lang === 'tr' ? 'Tekrar' : 'Rep', work: '140 sn', rest: '165 sn' },
                noteTitle: lang === 'tr' ? 'Mod Önerisi:' : 'Mode Recommendation:',
                noteDesc: lang === 'tr' ? 'Koşu (Running) modu genellikle olumlu sonuç vermektedir ancak diğer modlarla veri sınırlıdır.' : 'Running mode generally yields positive results but data is limited with other modes.'
            },
            sit: { 
                label: lang === 'tr' ? 'SIT (Pratik Uygulama)' : 'SIT (Practical App)', 
                title: lang === 'tr' ? 'SIT: "Yoğunluk Odaklı"' : 'SIT: "Intensity Focused"',
                desc: lang === 'tr' 
                    ? 'Makale Bulgusu: Dinlenme süresi 97 saniyeyi aşmamalıdır. Koşu modu, bisikletten daha etkilidir.'
                    : 'Study Finding: Rest duration must not exceed 97 seconds. Running mode is more effective than cycling.',
                sub: '',
                steps: [
                    lang === 'tr' ? 'Çok sağlam ısınma (Sakatlık riski yüksek).' : 'Very solid warm-up (High injury risk).',
                    lang === 'tr' ? '30 saniye Maksimum Efor (All-Out).' : '30 seconds Maximum Effort (All-Out).',
                    lang === 'tr' ? '90 saniye* Hafif Aktif Dinlenme.' : '90 seconds* Light Active Rest.',
                    lang === 'tr' ? '4-6 tekrar (Örnek).' : '4-6 reps (Example).'
                ],
                visual: { count: '4-6x', label: lang === 'tr' ? 'Örnek Tekrar' : 'Example Rep', work: '30 sn', rest: '90 sn' },
                noteTitle: lang === 'tr' ? 'Mod ve Dinlenme Notu:' : 'Mode and Rest Note:',
                noteDesc: lang === 'tr' ? 'Koşu bandı veya pist tercih edilmeli. *90sn dinlenme, "<97sn" kuralına uyan pratik bir uygulamadır.' : 'Treadmill or track should be preferred. *90s rest is a practical application complying with "<97s" rule.'
            }
        },
        editorText: lang === 'tr' 
            ? 'Bu derleme HIIT, SIT ve RST’yi ayrı ayrı karşılaştırsa da, yöntemlerin pratik uygulanabilirliği açısından hibrit bir yaklaşım makul bir çerçeve sunabilir. Örneğin haftada 1 HIIT’i 2 RST seansı ile tamamlamak, VO₂max uyaranını korurken antrenman süresi ve toparlanma maliyetini yönetilebilir tutmaya yardımcı olabilir; böylece koşu ekonomisi, eşik ve fizyolojik direnç gibi diğer performans bileşenlerine de alan açılır. Bu öneri doğrudan “kombinasyon çalışması”na değil, mevcut bulguların antrenman planlamasına uyarlanmasına dayanır; bireysel toparlanma ve sakatlık riskine göre kişiselleştirilmelidir.'
            : 'Although this review compares HIIT, SIT, and RST separately, a hybrid approach may offer a reasonable framework for practical applicability. For example, complementing 1 HIIT session per week with 2 RST sessions can help maintain the VO₂max stimulus while keeping training time and recovery costs manageable, thereby opening up space for other performance components such as running economy, threshold, and physiological resilience. This suggestion relies on adapting current findings to training planning rather than direct "combination studies"; it should be personalized based on individual recovery and injury risk.',
        citation: 'Yang Q, Wang J, Guan D. Comparison of different interval training methods on athletes’ oxygen uptake: a systematic review with pairwise and network meta-analysis. BMC Sports Science, Medicine and Rehabilitation. 2025;17:156. doi:10.1186/s13102-025-01191-6',
        warning: lang === 'tr' ? 'Uyarı: Herhangi bir yüksek yoğunluklu antrenman programına başlamadan önce sağlık durumunuzu kontrol ettiriniz.' : 'Warning: Check your health status before starting any high-intensity training program.'
    };

    // --- GRAFİK BİLEŞENLERİ (HTML ve Chart.js Görünümünü Taklit Eden SVG'ler) ---

    // 1. Bar Chart (Chart.js Görünümü)
    const EffectivenessChart = () => (
        <div className="w-full h-[300px] relative font-sans text-xs text-slate-400">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pl-6 pb-6">
                {[1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0.0].map((val, i) => (
                    <div key={i} className="w-full border-t border-slate-700/50 h-0 relative">
                        <span className="absolute -left-6 -top-2">{val.toFixed(1)}</span>
                    </div>
                ))}
            </div>
            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-around pl-6 pb-6 z-10 gap-2">
                {[
                    { label: 'RST', val: 1.04, color: 'rgba(56, 189, 248, 0.8)', border: 'rgba(56, 189, 248, 1)' },
                    { label: 'HIIT', val: 1.01, color: 'rgba(99, 102, 241, 0.8)', border: 'rgba(99, 102, 241, 1)' },
                    { label: 'SIT', val: 0.69, color: 'rgba(168, 85, 247, 0.8)', border: 'rgba(168, 85, 247, 1)' },
                    { label: 'CT', val: 0.29, color: 'rgba(148, 163, 184, 0.3)', border: 'rgba(148, 163, 184, 1)' }
                ].map((d) => (
                    <div key={d.label} className="w-full h-full flex flex-col justify-end group">
                        <div 
                            className="w-full transition-all duration-1000 ease-out border hover:opacity-90 relative"
                            style={{ 
                                height: `${(d.val / 1.2) * 100}%`, 
                                backgroundColor: d.color, 
                                borderColor: d.border,
                                borderWidth: '1px'
                            }}
                        >
                            {/* Tooltip on Hover */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {d.label}: {d.val}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* X Axis Labels */}
            <div className="absolute bottom-0 left-6 right-0 flex justify-around text-slate-200 font-bold">
                <span>RST</span>
                <span>HIIT</span>
                <span>SIT</span>
                <span className="text-slate-400">CT (Sürekli Koşu)</span>
            </div>
        </div>
    );

    // 2. Sweet Spot Chart (Chart.js Line Chart Görünümü - HIIT)
    const HiitCurveChart = () => (
        <div className="w-full h-[250px] relative font-sans text-xs text-slate-400">
             {/* Chart.js Style Grid */}
             <div className="absolute inset-0 border-l border-b border-slate-700/50 z-0">
                {/* Horizontal Grids */}
                {[0, 25, 50, 75, 100].map(p => (
                    <div key={p} className="absolute w-full border-t border-slate-700/30" style={{ bottom: `${p}%` }}></div>
                ))}
                {/* Vertical Grids */}
                {[0, 20, 40, 60, 80, 100].map(p => (
                    <div key={p} className="absolute h-full border-l border-slate-700/30" style={{ left: `${p}%` }}></div>
                ))}
            </div>

            <svg viewBox="0 0 400 200" className="w-full h-full absolute inset-0 z-10 overflow-visible" preserveAspectRatio="none">
                {/* HIIT Curve: Inverted U 
                   Points mapping (Approx based on HTML canvas):
                   Labels: 30s, 60s, 100s, 140s, 180s, 240s
                   Range approx 30s to 240s.
                   Peak at 140s.
                */}
                <defs>
                    <linearGradient id="hiitGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                    </linearGradient>
                </defs>
                
                {/* Area Fill */}
                <path 
                    d="M0,150 Q100,100 200,20 Q280,60 400,150 L400,200 L0,200 Z" 
                    fill="url(#hiitGradient)" 
                />
                {/* Line */}
                <path 
                    d="M0,150 Q100,100 200,20 Q280,60 400,150" 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                />
                
                {/* Points */}
                {[
                    {x: 0, y: 150}, {x: 50, y: 120}, {x: 120, y: 70}, 
                    {x: 200, y: 20}, {x: 280, y: 60}, {x: 400, y: 150}
                ].map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={i===3 ? 6 : 3} fill={i===3 ? "#fff" : "#6366f1"} stroke="#6366f1" strokeWidth="2" />
                ))}
            </svg>

            {/* X Axis Labels */}
            <div className="absolute -bottom-5 w-full flex justify-between text-[10px] text-slate-400 px-1">
                <span>30sn</span><span>60sn</span><span>100sn</span><span className="text-white font-bold">140sn (Zirve)</span><span>180sn</span><span>240sn</span>
            </div>
        </div>
    );

    // 3. Threshold Chart (Chart.js Line Chart Görünümü - SIT)
    const SitCurveChart = () => (
        <div className="w-full h-[250px] relative font-sans text-xs text-slate-400">
             {/* Chart.js Style Grid */}
             <div className="absolute inset-0 border-l border-b border-slate-700/50 z-0">
                {[0, 25, 50, 75, 100].map(p => (
                    <div key={p} className="absolute w-full border-t border-slate-700/30" style={{ bottom: `${p}%` }}></div>
                ))}
                {[0, 20, 40, 60, 80, 100].map(p => (
                    <div key={p} className="absolute h-full border-l border-slate-700/30" style={{ left: `${p}%` }}></div>
                ))}
            </div>

            <svg viewBox="0 0 400 200" className="w-full h-full absolute inset-0 z-10 overflow-visible" preserveAspectRatio="none">
                {/* SIT Curve: High plateau then drop after 97s
                   Labels: 30s, 60s, 90s, 97s, 120s, 180s
                   Threshold at index 3 (97s)
                */}
                
                {/* Line Segment 1 (High) */}
                <path d="M0,20 L220,20" fill="none" stroke="#a855f7" strokeWidth="3" />
                {/* Line Segment 2 (Drop) - Red dashed in HTML chart logic */}
                <path d="M220,20 L300,160 L400,180" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,6" />
                
                {/* Points */}
                {[
                    {x: 0, y: 20}, {x: 70, y: 15}, {x: 140, y: 20}, 
                    {x: 220, y: 40, special: true}, {x: 300, y: 160}, {x: 400, y: 180}
                ].map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={p.special ? 6 : 4} fill={p.special ? "#ef4444" : "#a855f7"} />
                ))}
            </svg>

            {/* X Axis Labels */}
            <div className="absolute -bottom-5 w-full flex justify-between text-[10px] text-slate-400 px-1">
                <span>30sn</span><span>60sn</span><span>90sn</span><span className="text-red-400 font-bold">97sn (Sınır)</span><span>120sn</span><span>180sn</span>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in space-y-12 pb-10 bg-[#0f172a] text-[#e2e8f0] font-sans rounded-3xl p-4 md:p-8">
            
            {/* Hero Section */}
            <header className="relative overflow-hidden py-16 sm:py-24 text-center">
                <div className="relative z-10">
                    <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight">
                        <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display:'inline-block' }}>
                            VO<sub style={{ WebkitTextFillColor: '#38bdf8' }}>2</sub>max
                        </span> {t.header.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                        {t.header.subtitle}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-400">
                        {t.header.tags.map((tag, i) => (
                            <div key={i} className="flex items-center">
                                <span className={`w-2 h-2 rounded-full mr-2 ${i===0?'bg-green-500':i===1?'bg-blue-500':'bg-purple-500'}`}></span>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-[100px]"></div>
                </div>
            </header>

            {/* Definitions Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-sky-500 pl-4">{t.sections.definitions}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* RST */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl hover:-translate-y-1 hover:border-sky-500/30 transition-all duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-sky-400">{t.cards.rst.title}</h3>
                            <span className="bg-sky-900 text-sky-200 text-xs px-2 py-1 rounded">{t.cards.rst.badge}</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2 font-semibold">{t.cards.rst.sub}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.cards.rst.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">{t.cards.rst.ex}</div>
                    </div>
                    {/* HIIT */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl hover:-translate-y-1 hover:border-indigo-500/30 transition-all duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-indigo-400">{t.cards.hiit.title}</h3>
                            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/50 text-[10px] sm:text-xs px-2 py-1 rounded uppercase font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                {t.cards.hiit.badge}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2 font-semibold">{t.cards.hiit.sub}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.cards.hiit.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">{t.cards.hiit.ex}</div>
                    </div>
                    {/* SIT */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl hover:-translate-y-1 hover:border-purple-500/30 transition-all duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-purple-400">{t.cards.sit.title}</h3>
                            <span className="bg-purple-900 text-purple-200 text-xs px-2 py-1 rounded">{t.cards.sit.badge}</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2 font-semibold">{t.cards.sit.sub}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.cards.sit.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">{t.cards.sit.ex}</div>
                    </div>
                </div>
            </section>

            {/* Analysis & Charts Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-indigo-500 pl-4">{t.sections.findings}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Effectiveness Chart */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-2">{t.charts.effTitle}</h3>
                        <p className="text-xs text-slate-400 mb-4">{t.charts.effSub}</p>
                        <EffectivenessChart />
                        <div className="mt-4 p-3 bg-slate-800/50 rounded border border-slate-700">
                            <p className="text-xs text-slate-300 font-semibold mb-1">📊 {lang === 'tr' ? 'Değerler Ne Anlama Geliyor?' : 'What do values mean?'}</p>
                            <div className="flex justify-between text-xs text-slate-400">
                                <span><span className="text-slate-500">0.2:</span> {lang === 'tr' ? 'Küçük' : 'Small'}</span>
                                <span><span className="text-slate-500">0.5:</span> {lang === 'tr' ? 'Orta' : 'Medium'}</span>
                                <span><span className="text-slate-500">0.8+:</span> {lang === 'tr' ? 'Büyük Etki' : 'Large Effect'}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 italic border-t border-slate-700/50 pt-2">{t.charts.effNote}</p>
                        </div>
                    </div>

                    {/* Ranking Chart */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl flex flex-col justify-center">
                        <h3 className="text-lg font-semibold mb-2">{t.charts.probTitle}</h3>
                        <p className="text-xs text-slate-400 mb-6">{t.charts.probSub}</p>
                        <div className="space-y-6">
                            {[
                                { l: 'RST', p: '88%', c: 'bg-sky-500', t: 'text-sky-400' },
                                { l: 'HIIT', p: '85%', c: 'bg-indigo-500', t: 'text-indigo-400' },
                                { l: 'SIT', p: '51%', c: 'bg-purple-500', t: 'text-purple-400' },
                                { l: 'CT', p: '23%', c: 'bg-slate-500', t: 'text-slate-400' }
                            ].map((item) => (
                                <div key={item.l}>
                                    <div className="flex justify-between mb-1">
                                        <span className={`text-sm font-medium ${item.t}`}>{item.l}</span>
                                        <span className="text-sm font-medium text-white">{item.p}</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                                        <div className={`${item.c} h-2.5 rounded-full`} style={{ width: item.p }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-slate-800 rounded text-xs text-slate-400 border-l-2 border-yellow-500">
                            {t.charts.probNote}
                        </div>
                    </div>
                </div>
            </section>

            {/* Optimization Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-green-500 pl-4">{t.sections.sweetSpot}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* HIIT Curve */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-indigo-400 mb-2">{t.charts.hiitTitle}</h3>
                        <p className="text-sm text-slate-400 mb-4">{t.charts.hiitDesc}</p>
                        <div className="h-[250px] w-full">
                            <HiitCurveChart />
                        </div>
                        <div className="mt-2 text-center">
                            <span className="text-[0.7rem] text-slate-500 italic">{t.charts.disclaimer}</span>
                        </div>
                        <div className="mt-4 bg-indigo-900/30 p-3 rounded border border-indigo-500/30">
                            <p className="text-sm font-bold text-indigo-200">{t.charts.hiitBoxTitle}</p>
                            <p className="text-xs text-slate-300">{t.charts.hiitBoxDesc}</p>
                        </div>
                    </div>

                    {/* SIT Curve */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">{t.charts.sitTitle}</h3>
                        <p className="text-sm text-slate-400 mb-4">{t.charts.sitDesc}</p>
                        <div className="h-[250px] w-full">
                            <SitCurveChart />
                        </div>
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

            {/* Protocol Generator */}
            <section className="" x-data="{ activeTab: 'rst' }">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-pink-500 pl-4">{t.sections.protocols}</h2>
                <p className="text-slate-400 mb-8">{t.tabs.desc}</p>

                {/* Tabs */}
                <div className="flex border-b border-slate-700 mb-8 overflow-x-auto">
                    {Object.keys(t.tabs).filter(k => k !== 'desc').map(key => (
                        <button 
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === key ? 'border-b-2 border-sky-500 text-sky-500' : 'text-slate-400'}`}
                        >
                            {t.tabs[key].label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-slate-800/50 rounded-2xl p-1 border border-slate-700">
                    {Object.keys(t.tabs).filter(k => k !== 'desc').map(key => (
                        <div key={key} className={`${activeTab === key ? 'block' : 'hidden'} p-4 sm:p-8 animate-fade-in`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                <div className="flex-1">
                                    <h3 className={`text-2xl font-bold mb-2 ${key === 'rst' ? 'text-sky-400' : key === 'hiit' ? 'text-indigo-400' : 'text-purple-400'}`}>
                                        {t.tabs[key].title}
                                    </h3>
                                    <p className="text-slate-300 mb-4 text-sm">{t.tabs[key].desc}</p>
                                    {t.tabs[key].sub && <p className="text-sky-300 text-xs font-bold uppercase mb-4">{t.tabs[key].sub}</p>}
                                    
                                    <ul className="space-y-3 mb-6">
                                        {t.tabs[key].steps.map((step, i) => (
                                            <li key={i} className="flex items-center text-sm text-slate-300">
                                                <span className={`w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 font-bold ${key === 'rst' ? 'text-sky-400' : key === 'hiit' ? 'text-indigo-400' : 'text-purple-400'}`}>{i+1}</span>
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                    {t.tabs[key].noteTitle && (
                                        <div className={`${key === 'hiit' ? 'bg-indigo-900/20 border-indigo-500/20' : 'bg-purple-900/20 border-purple-500/20'} p-4 rounded-lg border`}>
                                            <p className={`${key === 'hiit' ? 'text-indigo-300' : 'text-purple-300'} text-sm font-semibold`}>{t.tabs[key].noteTitle}</p>
                                            <p className="text-xs text-slate-400">{t.tabs[key].noteDesc}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full sm:w-1/3 bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-700">
                                    <div className="text-4xl font-black text-white mb-1">{t.tabs[key].visual.count}</div>
                                    <div className="text-sm text-slate-500 uppercase tracking-widest mb-6">{t.tabs[key].visual.label}</div>
                                    <div className="w-full flex justify-between items-center mb-2">
                                        <span className={`text-xs font-bold ${key === 'rst' ? 'text-sky-400' : key === 'hiit' ? 'text-indigo-400' : 'text-purple-400'}`}>
                                            {key === 'rst' ? 'SPRINT' : key === 'hiit' ? 'KOŞU' : 'MAX EFOR'}
                                        </span>
                                        <span className="text-xs text-slate-500">{key === 'hiit' ? 'JOG' : 'DINLENME'}</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className={`h-full ${key === 'rst' ? 'bg-sky-500 w-[20%]' : key === 'hiit' ? 'bg-indigo-500 w-[46%]' : 'bg-purple-500 w-[25%]'}`}></div>
                                        <div className={`h-full ${key === 'rst' ? 'bg-slate-700 w-[80%]' : key === 'hiit' ? 'bg-slate-600 w-[54%]' : 'bg-slate-700 w-[75%]'}`}></div>
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-1">
                                        <span className="text-xs text-white">{t.tabs[key].visual.work}</span>
                                        <span className="text-xs text-slate-400">{t.tabs[key].visual.rest}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Editor Note */}
            <section className="mt-16 mb-24">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-amber-500 rounded-r-xl p-6 sm:p-8 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold text-amber-500 mb-3 flex items-center">
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

            {/* Footer */}
            <footer className="text-center text-slate-500 text-xs border-t border-slate-800 pt-8">
                <p className="mb-4">{t.citation}</p>
                <p className="text-red-400 font-semibold bg-red-900/10 p-2 rounded inline-block">
                    {t.warning}
                </p>
            </footer>
        </div>
    );
};

window.VO2MaxRehberi2025Page = VO2MaxRehberi2025Page;
