const { useState } = React;

const VO2MaxRehberi2025Page = ({ lang = 'tr' }) => {
    const [activeTab, setActiveTab] = useState('rst');

    // --- İÇERİK VERİSİ (HTML Dosyasından Birebir Aktarılmıştır) ---
    const t = {
        header: {
            title: 'Rehberi',
            subtitle: '"HIIT mi, Sprint mi, yoksa Tekrarlı Sprint mi?" sorusuna 1.261 atlet ve 51 çalışma ile verilen en kapsamlı bilimsel yanıt.'
        },
        sections: {
            definitions: 'Hangi antrenman türlerinden bahsediyoruz?',
            findings: 'Makale Bulguları: Sayılar Ne Diyor?',
            sweetSpot: 'Kritik Bulgular: "Tatlı Nokta" Neresi?',
            protocols: 'Örnek Antrenman Protokolleri',
            editor: 'Editörün Yorumu: Hibrit Yaklaşım'
        },
        cards: {
            rst: {
                title: 'RST',
                badge: 'En Yüksek Olasılık',
                sub: 'Repeated Sprint Training',
                desc: 'Maksimum eforlu çok kısa sprintler (3-10 sn). Dinlenmeler kısa (<60 sn). Nabız neredeyse hiç düşmez.',
                ex: 'Örnek: 10 x 40m Sprint / 30sn ara'
            },
            hiit: {
                title: 'HIIT',
                badge: 'Altın Standart',
                sub: 'High-Intensity Interval Training',
                desc: 'VO₂max hızına veya %90-95 nabza yakın uzun intervaller. Çalışma süresi genelde birkaç dakikadır.',
                ex: 'Örnek: 4dk Koşu / 3dk Jog'
            },
            sit: {
                title: 'SIT',
                badge: 'Dikkatli Uygulanmalı',
                sub: 'Sprint Interval Training',
                desc: '"All-out" (tükenene kadar) sprintler (20-30 sn). Genelde uzun dinlenme verilir ama bu makale aksini söylüyor!',
                ex: 'Örnek: 30sn Airbike Max / 90sn ara'
            }
        },
        charts: {
            effTitle: 'VO₂max Artış Etkisi (Hedges\' g)',
            effSub: 'Konvansiyonel antrenmana (CON) kıyasla ne kadar etkili? (Yüksek daha iyi)',
            effNoteTitle: '📊 Değerler Ne Anlama Geliyor?',
            effLevels: [
                { val: '0.2:', desc: 'Küçük Etki' },
                { val: '0.5:', desc: 'Orta Etki' },
                { val: '0.8+:', desc: 'Büyük Etki' }
            ],
            effConclusion: 'Burada RST (1.04) ve HIIT (1.01) "Çok Büyük Etki" sınıfına girerken, CT (0.29) "Küçük Etki"de kalıyor.',
            
            probTitle: 'En İyi Olma Olasılığı (P-Score)',
            probSub: 'İstatistiksel olarak "En İyi Yöntem" olma ihtimalleri.',
            probData: [
                { label: 'RST (Tekrarlı Sprint)*', val: 88, color: 'bg-sky-500', text: 'text-sky-400' },
                { label: 'HIIT (Yüksek Yoğunluk)', val: 85, color: 'bg-indigo-500', text: 'text-indigo-400' },
                { label: 'SIT (Sprint İnterval)', val: 51, color: 'bg-purple-500', text: 'text-purple-400' },
                { label: 'CT (Sürekli Koşu)', val: 23, color: 'bg-slate-500', text: 'text-slate-400' }
            ],
            probNote: '*Not: İstatistiksel olarak RST, HIIT ve SIT arasında anlamlı bir fark bulunmamıştır (p>0.05). RST sadece "olasılık" olarak ilk sıradadır.',
            
            hiitTitle: 'HIIT: 140 Saniye Kuralı',
            hiitDesc: 'Makale, HIIT süresi ve VO₂max artışı arasında "Ters U Eğrisi" buldu. Çok kısa veya çok uzun intervaller verimsiz.',
            hiitBoxTitle: '🏆 Altın Formül (Bulgu):',
            hiitBoxDesc: '140 sn Yüklenme / 165 sn Dinlenme (Oran: 0.85)',
            
            sitTitle: 'SIT: 97 Saniye Sınırı',
            sitDesc: 'Şaşırtıcı Bulgu: SIT yaparken dinlenmeyi çok uzatırsan aerobik sistem devre dışı kalıyor ve VO₂max gelişmiyor.',
            sitBoxTitle: '⚠️ Kritik Uyarı:',
            sitBoxDesc: 'Dinlenme süresi > 97 sn olursa VO₂max etkisi anlamsızlaşıyor.',
            
            disclaimer: '*Şematik Gösterim: Makaledeki ilişkiyi temsil eder, ham veri değildir.'
        },
        tabs: {
            desc: 'Makalenin bulgularına (süre, sıklık, mod) dayanarak hazırlanmış örnek reçetelerdir.',
            rst: { 
                label: '1. RST (Örnek Seans)', 
                title: 'RST: "2 Haftalık Boost"',
                desc: 'Makale Bulgusu: Haftada 3 seans yapıldığında, 2 haftada sonuç verir. Protokol detayları (süre/dinlenme) makalede kritik fark yaratmamıştır.',
                sub: 'Aşağıdaki Yaygın Bir Örnektir:',
                steps: [
                    'Uzun ve iyi bir ısınma yap.',
                    <span><span className="text-white font-bold mx-1">6 saniye</span> Maksimum Sprint (All-out).</span>,
                    <span><span className="text-white font-bold mx-1">24 saniye</span> Pasif Dinlenme (Dur).</span>,
                    <span>Bunu <span className="text-white font-bold mx-1">10 tekrar</span> yap (Pratik Öneri).</span>
                ],
                visual: { count: '10x', label: 'Örnek Tekrar', work: '6 sn', rest: '24 sn' }
            },
            hiit: { 
                label: '2. HIIT (Optimize)', 
                title: 'HIIT: "Makale Optimumu"',
                desc: 'Makale Bulgusu: En iyi verim 140sn iş ve ~165sn dinlenme ile alınmıştır. Haftada 3 gün, 3-6 hafta uygulanmalı.',
                sub: '',
                steps: [
                    'Isınma süresi uzun tutulmalı (Lineer pozitif ilişki).',
                    <span><span className="text-white font-bold mx-1">2 dk 20 sn (140s)</span> Yüksek Tempo (%90-95 VO₂max).</span>,
                    <span><span className="text-white font-bold mx-1">2 dk 45 sn (165s)</span> Aktif Dinlenme (Hafif Jog).</span>,
                    <span>Genelde <span className="text-white font-bold mx-1">4-6 tekrar</span> (Kondisyona göre ayarlanır).</span>
                ],
                visual: { count: '4-6x', label: 'Tekrar', work: '140 sn', rest: '165 sn' },
                noteTitle: 'Mod Önerisi:',
                noteDesc: 'Koşu (Running) modu genellikle olumlu sonuç vermektedir ancak diğer modlarla veri sınırlıdır.'
            },
            sit: { 
                label: '3. SIT (Pratik Uygulama)', 
                title: 'SIT: "Yoğunluk Odaklı"',
                desc: 'Makale Bulgusu: Dinlenme süresi 97 saniyeyi aşmamalıdır. Koşu modu, bisikletten daha etkilidir.',
                sub: '',
                steps: [
                    'Çok sağlam ısınma (Sakatlık riski yüksek).',
                    <span><span className="text-white font-bold mx-1">30 saniye</span> Maksimum Efor (All-Out).</span>,
                    <span><span className="text-white font-bold mx-1">90 saniye*</span> Hafif Aktif Dinlenme.</span>,
                    <span><span className="text-white font-bold mx-1">4-6 tekrar</span> (Örnek).</span>
                ],
                visual: { count: '4-6x', label: 'Örnek Tekrar', work: '30 sn', rest: '90 sn' },
                noteTitle: 'Mod ve Dinlenme Notu:',
                noteDesc: 'Koşu bandı veya pist tercih edilmeli. *90sn dinlenme, "<97sn" kuralına uyan pratik bir uygulamadır.'
            }
        },
        editorText: 'Bu derleme HIIT, SIT ve RST’yi ayrı ayrı karşılaştırsa da, yöntemlerin pratik uygulanabilirliği açısından hibrit bir yaklaşım makul bir çerçeve sunabilir. Örneğin haftada 1 HIIT’i 2 RST seansı ile tamamlamak, VO₂max uyaranını korurken antrenman süresi ve toparlanma maliyetini yönetilebilir tutmaya yardımcı olabilir; böylece koşu ekonomisi, eşik ve fizyolojik direnç gibi diğer performans bileşenlerine de alan açılır. Bu öneri doğrudan “kombinasyon çalışması”na değil, mevcut bulguların antrenman planlamasına uyarlanmasına dayanır; bireysel toparlanma ve sakatlık riskine göre kişiselleştirilmelidir.',
        citation: 'Yang Q, Wang J, Guan D. Comparison of different interval training methods on athletes’ oxygen uptake: a systematic review with pairwise and network meta-analysis. BMC Sports Science, Medicine and Rehabilitation. 2025;17:156. doi:10.1186/s13102-025-01191-6',
        warning: 'Uyarı: Herhangi bir yüksek yoğunluklu antrenman programına başlamadan önce sağlık durumunuzu kontrol ettiriniz.'
    };

    // --- GRAFİK BİLEŞENLERİ (HTML'deki Chart.js verilerine birebir uygun SVG'ler) ---

    // 1. Bar Chart (Data: RST=1.04, HIIT=1.01, SIT=0.69, CT=0.29)
    const EffectivenessChart = () => (
        <div className="w-full h-[300px] relative font-sans text-xs text-slate-400">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pl-6 pb-6">
                {[1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0.0].map((val, i) => (
                    <div key={i} className="w-full border-t border-slate-700/30 h-0 relative">
                        <span className="absolute -left-6 -top-2 text-slate-500">{val.toFixed(1)}</span>
                    </div>
                ))}
            </div>
            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-around pl-6 pb-6 z-10 gap-2 sm:gap-4">
                {[
                    { label: 'RST', val: 1.04, color: 'rgba(56, 189, 248, 0.8)', border: '#38bdf8' },
                    { label: 'HIIT', val: 1.01, color: 'rgba(99, 102, 241, 0.8)', border: '#6366f1' },
                    { label: 'SIT', val: 0.69, color: 'rgba(168, 85, 247, 0.8)', border: '#a855f7' },
                    { label: 'CT', val: 0.29, color: 'rgba(148, 163, 184, 0.3)', border: '#94a3b8' }
                ].map((d) => (
                    <div key={d.label} className="w-full h-full flex flex-col justify-end group">
                        <div 
                            className="w-full transition-all duration-1000 ease-out border relative hover:opacity-90"
                            style={{ 
                                height: `${(d.val / 1.2) * 100}%`, 
                                backgroundColor: d.color, 
                                borderColor: d.border,
                                borderWidth: '1px'
                            }}
                        >
                            {/* Value Label (Hover/Always) */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                {d.val}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* X Axis Labels */}
            <div className="absolute bottom-0 left-6 right-0 flex justify-around text-slate-200 font-bold border-t border-slate-700/50 pt-2">
                <span>RST</span>
                <span>HIIT</span>
                <span>SIT</span>
                <span className="text-slate-400">CT</span>
            </div>
        </div>
    );

    // 2. Sweet Spot Chart (HIIT Inverted U)
    // Data points from HTML JS: [40, 60, 85, 100, 80, 50]
    // Labels: 30s, 60s, 100s, 140s, 180s, 240s
    const HiitCurveChart = () => (
        <div className="w-full h-[250px] relative font-sans text-xs text-slate-400">
             {/* Chart Background Grid */}
             <div className="absolute inset-0 border-l border-b border-slate-700/30 z-0">
                {[0, 25, 50, 75, 100].map(p => (
                    <div key={p} className="absolute w-full border-t border-slate-700/10" style={{ bottom: `${p}%` }}></div>
                ))}
            </div>

            <svg viewBox="0 0 400 200" className="w-full h-full absolute inset-0 z-10 overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="hiitGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                    </linearGradient>
                </defs>
                
                {/* Points: 
                    0 (30s) -> y=120 (40%)
                    60 (60s) -> y=80 (60%)
                    140 (100s) -> y=30 (85%)
                    220 (140s/Peak) -> y=0 (100%)
                    300 (180s) -> y=40 (80%)
                    400 (240s) -> y=100 (50%)
                */}
                <path 
                    d="M0,120 L60,80 L140,30 L220,0 L300,40 L400,100 L400,200 L0,200 Z" 
                    fill="url(#hiitGradient)" 
                    className="transition-all duration-1000"
                />
                <path 
                    d="M0,120 Q60,80 140,30 T220,0 T300,40 T400,100" 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                />
                
                {/* Peak Point */}
                <circle cx="220" cy="0" r="6" fill="#fff" stroke="#6366f1" strokeWidth="2" />
            </svg>

            {/* X Axis Labels */}
            <div className="absolute -bottom-6 w-full flex justify-between text-[10px] text-slate-400 px-1">
                <span>30sn</span>
                <span>60sn</span>
                <span>100sn</span>
                <span className="text-white font-bold transform -translate-y-1">140sn (Zirve)</span>
                <span>180sn</span>
                <span>240sn</span>
            </div>
        </div>
    );

    // 3. Threshold Chart (SIT Dropoff)
    // Data points from HTML JS: [95, 98, 95, 85, 30, 10]
    // Labels: 30s, 60s, 90s, 97s(Limit), 120s, 180s
    const SitCurveChart = () => (
        <div className="w-full h-[250px] relative font-sans text-xs text-slate-400">
             <div className="absolute inset-0 border-l border-b border-slate-700/30 z-0">
                {[0, 25, 50, 75, 100].map(p => (
                    <div key={p} className="absolute w-full border-t border-slate-700/10" style={{ bottom: `${p}%` }}></div>
                ))}
            </div>

            <svg viewBox="0 0 400 200" className="w-full h-full absolute inset-0 z-10 overflow-visible" preserveAspectRatio="none">
                {/* X Mapping (approx): 30s=0, 60s=70, 90s=140, 97s=165, 120s=220, 180s=400
                   Y Mapping (200 max): 95%->10, 98%->4, 95%->10, 85%->30, 30%->140, 10%->180
                */}
                
                {/* Solid Purple Line (Before Threshold) */}
                <path 
                    d="M0,10 L70,4 L140,10 L165,30" 
                    fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" 
                />
                
                {/* Dashed Red Line (After Threshold - Drop) */}
                <path 
                    d="M165,30 L220,140 L400,180" 
                    fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,6" 
                />
                
                {/* Threshold Point */}
                <circle cx="165" cy="30" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
            </svg>

            {/* X Axis Labels */}
            <div className="absolute -bottom-6 w-full flex justify-between text-[10px] text-slate-400 px-1">
                <span>30sn</span>
                <span>60sn</span>
                <span>90sn</span>
                <span className="text-red-400 font-bold transform -translate-y-1">97sn (Sınır)</span>
                <span>120sn</span>
                <span>180sn</span>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in space-y-16 pb-10 bg-[#0f172a] text-[#e2e8f0] font-sans selection:bg-sky-500 selection:text-white rounded-3xl p-4 md:p-0 overflow-hidden">
            
            {/* Hero Section */}
            <header className="relative overflow-hidden py-16 sm:py-24 text-center">
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight">
                        <span 
                            className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent inline-block pb-1 leading-tight"
                        >
                            VO<sub className="text-sky-400">2</sub>max
                        </span> {t.header.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                        {t.header.subtitle}
                    </p>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-[100px]"></div>
                </div>
            </header>

            {/* Definitions Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-sky-500 pl-4">{t.sections.definitions}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* RST */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl hover:-translate-y-1 transition-all duration-200 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-sky-400">{t.cards.rst.title}</h3>
                            <span className="bg-sky-900 text-sky-200 text-xs px-2 py-1 rounded">{t.cards.rst.badge}</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2 font-semibold">{t.cards.rst.sub}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.cards.rst.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">{t.cards.rst.ex}</div>
                    </div>
                    {/* HIIT - Gold Stamp Style */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl hover:-translate-y-1 transition-all duration-200 shadow-lg relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-indigo-400">{t.cards.hiit.title}</h3>
                            {/* Gold Stamp Effect matching HTML */}
                            <span className="bg-amber-500/15 text-amber-400 border border-amber-500/50 text-[10px] sm:text-xs px-2 py-1 rounded uppercase font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)] tracking-wider">
                                {t.cards.hiit.badge}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2 font-semibold">{t.cards.hiit.sub}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.cards.hiit.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">{t.cards.hiit.ex}</div>
                    </div>
                    {/* SIT */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl hover:-translate-y-1 transition-all duration-200 shadow-lg">
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
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-indigo-500 pl-4">{t.sections.findings}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Effectiveness Chart */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">{t.charts.effTitle}</h3>
                        <p className="text-xs text-slate-400 mb-4">{t.charts.effSub}</p>
                        <EffectivenessChart />
                        <div className="mt-4 p-3 bg-slate-800/50 rounded border border-slate-700">
                            <p className="text-xs text-slate-300 font-semibold mb-1">{t.charts.effNoteTitle}</p>
                            <div className="flex justify-between text-xs text-slate-400">
                                {t.charts.effLevels.map((lvl, i) => (
                                    <span key={i}><span className="text-slate-500">{lvl.val}</span> {lvl.desc}</span>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 mt-2 italic border-t border-slate-700/50 pt-2">{t.charts.effConclusion}</p>
                        </div>
                    </div>

                    {/* Ranking Chart */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl shadow-lg flex flex-col justify-center">
                        <h3 className="text-lg font-semibold mb-2">{t.charts.probTitle}</h3>
                        <p className="text-xs text-slate-400 mb-6">{t.charts.probSub}</p>
                        <div className="space-y-6">
                            {t.charts.probData.map((item) => (
                                <div key={item.label}>
                                    <div className="flex justify-between mb-1">
                                        <span className={`text-sm font-medium ${item.text}`}>{item.label}</span>
                                        <span className="text-sm font-medium text-white">{item.val}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                                        <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.val}%` }}></div>
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
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-green-500 pl-4">{t.sections.sweetSpot}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* HIIT Curve */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold text-indigo-400 mb-2">{t.charts.hiitTitle}</h3>
                        <p className="text-sm text-slate-400 mb-4">{t.charts.hiitDesc}</p>
                        <div className="h-[250px] w-full mb-6">
                            <HiitCurveChart />
                        </div>
                        <div className="text-center mb-4">
                            <span className="text-[0.7rem] text-slate-500 italic">{t.charts.disclaimer}</span>
                        </div>
                        <div className="bg-indigo-900/30 p-3 rounded border border-indigo-500/30">
                            <p className="text-sm font-bold text-indigo-200">{t.charts.hiitBoxTitle}</p>
                            <p className="text-xs text-slate-300">{t.charts.hiitBoxDesc}</p>
                        </div>
                    </div>

                    {/* SIT Curve */}
                    <div className="bg-slate-800/70 backdrop-blur border border-slate-700/50 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">{t.charts.sitTitle}</h3>
                        <p className="text-sm text-slate-400 mb-4">{t.charts.sitDesc}</p>
                        <div className="h-[250px] w-full mb-6">
                            <SitCurveChart />
                        </div>
                        <div className="text-center mb-4">
                            <span className="text-[0.7rem] text-slate-500 italic">{t.charts.disclaimer}</span>
                        </div>
                        <div className="bg-purple-900/30 p-3 rounded border border-purple-500/30">
                            <p className="text-sm font-bold text-purple-200">{t.charts.sitBoxTitle}</p>
                            <p className="text-xs text-slate-300">{t.charts.sitBoxDesc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Protocol Generator */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-pink-500 pl-4">{t.sections.protocols}</h2>
                <p className="text-slate-400 mb-8 font-light">{t.tabs.desc}</p>

                {/* Tabs */}
                <div className="flex border-b border-slate-700 mb-8 overflow-x-auto no-scrollbar">
                    {Object.keys(t.tabs).filter(k => k !== 'desc').map(key => (
                        <button 
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap border-b-2 ${activeTab === key ? 'border-sky-500 text-sky-500' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                        >
                            {t.tabs[key].label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-slate-800/50 rounded-2xl p-1 border border-slate-700 shadow-xl">
                    {Object.keys(t.tabs).filter(k => k !== 'desc').map(key => (
                        <div key={key} className={`${activeTab === key ? 'block' : 'hidden'} p-4 sm:p-8 animate-fade-in`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
                                <div className="flex-1">
                                    <h3 className={`text-2xl font-bold mb-2 ${key === 'rst' ? 'text-sky-400' : key === 'hiit' ? 'text-indigo-400' : 'text-purple-400'}`}>
                                        {t.tabs[key].title}
                                    </h3>
                                    <p className="text-slate-300 mb-4 text-sm leading-relaxed">{t.tabs[key].desc}</p>
                                    {t.tabs[key].sub && <p className="text-sky-300 text-xs font-bold uppercase mb-4">{t.tabs[key].sub}</p>}
                                    
                                    <ul className="space-y-4 mb-6">
                                        {t.tabs[key].steps.map((step, i) => (
                                            <li key={i} className="flex items-start text-sm text-slate-300">
                                                <span className={`w-6 h-6 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center mr-3 font-bold text-xs ${key === 'rst' ? 'text-sky-400' : key === 'hiit' ? 'text-indigo-400' : 'text-purple-400'}`}>{i+1}</span>
                                                <span className="pt-0.5">{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {t.tabs[key].noteTitle && (
                                        <div className={`${key === 'hiit' ? 'bg-indigo-900/20 border-indigo-500/20' : 'bg-purple-900/20 border-purple-500/20'} p-4 rounded-lg border`}>
                                            <p className={`${key === 'hiit' ? 'text-indigo-300' : 'text-purple-300'} text-sm font-semibold mb-1`}>{t.tabs[key].noteTitle}</p>
                                            <p className="text-xs text-slate-400">{t.tabs[key].noteDesc}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full sm:w-1/3 bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-700 shadow-inner">
                                    <div className="text-4xl font-black text-white mb-1">{t.tabs[key].visual.count}</div>
                                    <div className="text-sm text-slate-500 uppercase tracking-widest mb-6">{t.tabs[key].visual.label}</div>
                                    <div className="w-full flex justify-between items-center mb-2 font-bold text-[10px] tracking-wider">
                                        <span className={`${key === 'rst' ? 'text-sky-400' : key === 'hiit' ? 'text-indigo-400' : 'text-purple-400'}`}>
                                            {key === 'rst' ? 'SPRINT' : key === 'hiit' ? 'KOŞU' : 'MAX EFOR'}
                                        </span>
                                        <span className="text-slate-500">{key === 'hiit' ? 'JOG' : 'DINLENME'}</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className={`h-full ${key === 'rst' ? 'bg-sky-500 w-[20%]' : key === 'hiit' ? 'bg-indigo-500 w-[46%]' : 'bg-purple-500 w-[25%]'}`}></div>
                                        <div className={`h-full ${key === 'rst' ? 'bg-slate-700 w-[80%]' : key === 'hiit' ? 'bg-slate-600 w-[54%]' : 'bg-slate-700 w-[75%]'}`}></div>
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-2 font-mono text-xs">
                                        <span className="text-white">{t.tabs[key].visual.work}</span>
                                        <span className="text-slate-400">{t.tabs[key].visual.rest}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Editor Note */}
            <section className="container mx-auto px-4 mt-16 mb-24">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-amber-500 rounded-r-xl p-6 sm:p-8 shadow-lg relative">
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
            <footer className="container mx-auto px-4 text-center text-slate-500 text-xs border-t border-slate-800 pt-8 pb-8">
                <p className="mb-4">{t.citation}</p>
                <p className="text-red-400 font-semibold bg-red-900/10 p-2 rounded inline-block">
                    {t.warning}
                </p>
            </footer>
        </div>
    );
};

window.VO2MaxRehberi2025Page = VO2MaxRehberi2025Page;
