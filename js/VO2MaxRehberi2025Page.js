const { useState, useEffect, useRef } = React;

const VO2MaxRehberi2025Page = ({ lang = 'tr' }) => {
    const [activeTab, setActiveTab] = useState('rst');
    
    // Grafik referansları
    const effChartRef = useRef(null);
    const hiitChartRef = useRef(null);
    const sitChartRef = useRef(null);
    
    // Grafik instance'larını tutmak için (cleanup için)
    const chartInstances = useRef({
        eff: null,
        hiit: null,
        sit: null
    });

    // Çeviri Verisi
    const t = {
        tr: {
            hero: {
                titleSuffix: 'Rehberi',
                subtitle: '"HIIT mi, Sprint mi, yoksa Tekrarlı Sprint mi?" sorusuna 1.261 atlet ve 51 çalışma ile verilen en kapsamlı bilimsel yanıt.'
            },
            definitions: {
                title: 'Hangi antrenman türlerinden bahsediyoruz?',
                rst: { badge: 'En Yüksek Olasılık', desc: 'Maksimum eforlu çok kısa sprintler (3-10 sn). Dinlenmeler kısa (<60 sn). Nabız neredeyse hiç düşmez.', example: 'Örnek: 10 x 40m Sprint / 30sn ara' },
                hiit: { badge: 'Altın Standart', desc: 'VO₂max hızına veya %90-95 nabza yakın uzun intervaller. Çalışma süresi genelde birkaç dakikadır.', example: 'Örnek: 4dk Koşu / 3dk Jog' },
                sit: { badge: 'Dikkatli Uygulanmalı', desc: '"All-out" (tükenene kadar) sprintler (20-30 sn). Genelde uzun dinlenme verilir ama bu makale aksini söylüyor!', example: 'Örnek: 30sn Airbike Max / 90sn ara' }
            },
            analysis: {
                title: 'Makale Bulguları: Sayılar Ne Diyor?',
                chart1: { title: 'VO₂max Artış Etkisi (Hedges\' g)', subtitle: 'Konvansiyonel antrenmana (CON) kıyasla ne kadar etkili? (Yüksek daha iyi)' },
                legend: { title: '📊 Değerler Ne Anlama Geliyor?', small: 'Küçük Etki', medium: 'Orta Etki', large: 'Büyük Etki', note: 'Burada RST (1.04) ve HIIT (1.01) "Çok Büyük Etki" sınıfına girerken, CT (0.29) "Küçük Etki"de kalıyor.' },
                chart2: { title: 'En İyi Olma Olasılığı (P-Score)', subtitle: 'İstatistiksel olarak "En İyi Yöntem" olma ihtimalleri.', note: '<strong>*Not:</strong> İstatistiksel olarak RST, HIIT ve SIT arasında anlamlı bir fark bulunmamıştır (p>0.05). RST sadece "olasılık" olarak ilk sıradadır.' }
            },
            common: {
                sprint: '(Tekrarlı Sprint)',
                hi: '(Yüksek Yoğunluk)',
                si: '(Sprint İnterval)',
                ct: '(Sürekli Koşu)',
                schematic: '*Şematik Gösterim: Makaledeki ilişkiyi temsil eder, ham veri değildir.',
                reps: 'Örnek Tekrar',
                rest: 'DINLENME',
                run: 'KOŞU'
            },
            opt: {
                title: 'Kritik Bulgular: "Tatlı Nokta" Neresi?',
                hiit: { title: 'HIIT: 140 Saniye Kuralı', desc: 'Makale, HIIT süresi ve VO₂max artışı arasında "Ters U Eğrisi" buldu. Çok kısa veya çok uzun intervaller verimsiz.', formula_title: '🏆 Altın Formül (Bulgu):', formula_desc: '140 sn Yüklenme / 165 sn Dinlenme (Oran: 0.85)' },
                sit: { title: 'SIT: 97 Saniye Sınırı', desc: 'Şaşırtıcı Bulgu: SIT yaparken dinlenmeyi çok uzatırsan aerobik sistem devre dışı kalıyor ve VO₂max gelişmiyor.', warning_title: '⚠️ Kritik Uyarı:', warning_desc: 'Dinlenme süresi > 97 sn olursa VO₂max etkisi anlamsızlaşıyor.' }
            },
            protocols: {
                title: 'Örnek Antrenman Protokolleri',
                subtitle: 'Makalenin bulgularına (süre, sıklık, mod) dayanarak hazırlanmış <strong>örnek</strong> reçetelerdir.',
                example_header: 'Aşağıdaki Yaygın Bir Örnektir:',
                rst: { 
                    title: 'RST: "2 Week Boost"', 
                    desc: '<strong>Makale Bulgusu:</strong> Haftada 3 seans yapıldığında, 2 haftada sonuç verir. Protokol detayları makalede kritik fark yaratmamıştır.',
                    step1: 'Uzun ve iyi bir ısınma yap.',
                    step2_bold: '6 sn', step2_text: 'Maksimum Sprint (All-out).',
                    step3_bold: '24 sn', step3_text: 'Pasif Dinlenme (Dur).',
                    step4_pre: 'Bunu', step4_bold: '10 tekrar', step4_post: 'yap (Pratik Öneri).'
                },
                hiit: {
                    title: 'HIIT: "Makale Optimumu"',
                    desc: '<strong>Makale Bulgusu:</strong> En iyi verim 140sn iş ve ~165sn dinlenme ile alınmıştır. Haftada 3 gün, 3-6 hafta uygulanmalı.',
                    step1: 'Isınma süresi uzun tutulmalı (Lineer pozitif ilişki).',
                    step2: 'Yüksek Tempo (%90-95 VO₂max).',
                    step3: 'Aktif Dinlenme (Hafif Jog).',
                    step4: 'Genelde',
                    mode_title: 'Mod Önerisi:', mode_desc: 'Koşu (Running) modu genellikle olumlu sonuç vermektedir ancak diğer modlarla veri sınırlıdır.'
                },
                sit: {
                    title: 'SIT: "Yoğunluk Odaklı"',
                    desc: '<strong>Makale Bulgusu:</strong> Dinlenme süresi 97 saniyeyi aşmamalıdır. Koşu modu, bisikletten daha etkilidir.',
                    step1: 'Çok sağlam ısınma (Sakatlık riski yüksek).',
                    step2: 'Maksimum Efor (All-Out).',
                    step3: 'Hafif Aktif Dinlenme.',
                    step4: '(Örnek).',
                    mode_title: 'Mod ve Dinlenme Notu:', mode_desc: 'Koşu bandı veya pist tercih edilmeli. *90sn dinlenme, "<97sn" kuralına uyan pratik bir uygulamadır.'
                }
            },
            editor: {
                title: 'Editörün Yorumu: Hibrit Yaklaşım',
                text: '"Bu derleme HIIT, SIT ve RST’yi ayrı ayrı karşılaştırsa da, yöntemlerin pratik uygulanabilirliği açısından hibrit bir yaklaşım makul bir çerçeve sunabilir. Örneğin haftada 1 HIIT’i 2 RST seansı ile tamamlamak, VO₂max uyaranını korurken antrenman süresi ve toparlanma maliyetini yönetilebilir tutmaya yardımcı olabilir; böylece koşu ekonomisi, eşik ve fizyolojik direnç gibi diğer performans bileşenlerine de alan açılır."'
            },
            footer: {
                warning: 'Uyarı: Herhangi bir yüksek yoğunluklu antrenman programına başlamadan önce sağlık durumunuzu kontrol ettiriniz.'
            }
        },
        en: {
            hero: {
                titleSuffix: 'Guide',
                subtitle: 'The most comprehensive scientific answer to "HIIT, SIT, or Repeated Sprint?" based on 1,261 athletes and 51 studies.'
            },
            definitions: {
                title: 'Which training types are we talking about?',
                rst: { badge: 'Highest Probability', desc: 'Max effort short sprints (3-10s). Short rests (<60s). Heart rate barely drops.', example: 'Example: 10 x 40m Sprint / 30s rest' },
                hiit: { badge: 'Gold Standard', desc: 'Long intervals near VO2max velocity or 90-95% HRmax. Work duration usually several minutes.', example: 'Example: 4min Run / 3min Jog' },
                sit: { badge: 'Use with Caution', desc: '"All-out" sprints (20-30s). Usually paired with long rest, but this paper suggests otherwise!', example: 'Example: 30s Airbike Max / 90s rest' }
            },
            analysis: {
                title: 'Study Findings: What Do the Numbers Say?',
                chart1: { title: 'Effect on VO₂max (Hedges\' g)', subtitle: 'How effective compared to Conventional Training (CON)? (Higher is better)' },
                legend: { title: '📊 What Do Values Mean?', small: 'Small Effect', medium: 'Medium Effect', large: 'Large Effect', note: 'Here RST (1.04) and HIIT (1.01) are "Very Large Effect", while CT (0.29) remains "Small Effect".' },
                chart2: { title: 'Probability of Being Best (P-Score)', subtitle: 'Statistical probability of being the "Best Method".', note: '<strong>*Note:</strong> Statistically, there was no significant difference between RST, HIIT, and SIT (p>0.05). RST ranks first only in "probability".' }
            },
            common: {
                sprint: '(Repeated Sprint)',
                hi: '(High Intensity)',
                si: '(Sprint Interval)',
                ct: '(Continuous Training)',
                schematic: '*Schematic: Represents the relationship in the paper, not raw data.',
                reps: 'Example Reps',
                rest: 'REST',
                run: 'RUN'
            },
            opt: {
                title: 'Critical Findings: Where is the "Sweet Spot"?',
                hiit: { title: 'HIIT: 140 Second Rule', desc: 'The paper found an "Inverted-U Curve" between HIIT duration and VO₂max gain. Too short or too long is inefficient.', formula_title: '🏆 Golden Formula (Finding):', formula_desc: '140s Work / 165s Rest (Ratio: 0.85)' },
                sit: { title: 'SIT: 97 Second Limit', desc: 'Surprising Finding: If you extend rest too much in SIT, the aerobic system disengages and VO₂max does not improve.', warning_title: '⚠️ Critical Warning:', warning_desc: 'If rest duration > 97s, the VO₂max effect becomes insignificant.' }
            },
            protocols: {
                title: 'Sample Training Protocols',
                subtitle: 'These are <strong>sample</strong> prescriptions based on the paper\'s findings (duration, frequency, mode).',
                example_header: 'Common Example Below:',
                rst: { 
                    title: 'RST: "2 Week Boost"', 
                    desc: '<strong>Paper Finding:</strong> Yields results in 2 weeks when done 3 times/week. Protocol details were less critical in the analysis.',
                    step1: 'Perform a long and good warm-up.',
                    step2_bold: '6 s', step2_text: 'Max Sprint (All-out).',
                    step3_bold: '24 s', step3_text: 'Passive Rest (Stop).',
                    step4_pre: 'Do this for', step4_bold: '10 reps', step4_post: '(Practical Suggestion).'
                },
                hiit: {
                    title: 'HIIT: "Paper Optimum"',
                    desc: '<strong>Paper Finding:</strong> Best efficiency found with 140s work and ~165s rest. Apply 3 days/week for 3-6 weeks.',
                    step1: 'Warm-up duration should be long (Linear positive relationship).',
                    step2: 'High Pace (90-95% VO₂max).',
                    step3: 'Active Rest (Light Jog).',
                    step4: 'Usually',
                    mode_title: 'Mode Suggestion:', mode_desc: 'Running mode generally gives positive results, but data is limited for other modes.'
                },
                sit: {
                    title: 'SIT: "Intensity Focused"',
                    desc: '<strong>Paper Finding:</strong> Rest duration must not exceed 97 seconds. Running mode is more effective than cycling.',
                    step1: 'Very solid warm-up (High injury risk).',
                    step2: 'Max Effort (All-Out).',
                    step3: 'Light Active Rest.',
                    step4: '(Example).',
                    mode_title: 'Mode and Rest Note:', mode_desc: 'Treadmill or track preferred. *90s rest is a practical application fitting the "<97s" rule.'
                }
            },
            editor: {
                title: 'Editor\'s Note: Hybrid Approach',
                text: '"Although this review compares HIIT, SIT, and RST separately, a hybrid approach may offer a reasonable framework for practical applicability. For instance, complementing 1 HIIT session with 2 RST sessions per week could help maintain the VO₂max stimulus while keeping training duration and recovery costs manageable; thus opening space for other performance components like running economy, threshold, and physiological resilience."'
            },
            footer: {
                warning: 'Warning: Please consult your physician before starting any high-intensity training program.'
            }
        }
    };

    const currentT = t[lang];

    // Chart Yaratma ve Güncelleme Effect'i
    useEffect(() => {
        // Cleanup önceki chartlar
        if (chartInstances.current.eff) chartInstances.current.eff.destroy();
        if (chartInstances.current.hiit) chartInstances.current.hiit.destroy();
        if (chartInstances.current.sit) chartInstances.current.sit.destroy();

        // Chart.js global nesnesi kontrolü
        if (typeof Chart === 'undefined') {
            console.error("Chart.js not found!");
            return;
        }

        // --- Chart 1: Effectiveness ---
        if (effChartRef.current) {
            chartInstances.current.eff = new Chart(effChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['RST', 'HIIT', 'SIT', 'CT'],
                    datasets: [{
                        label: currentT.analysis.chart1.title,
                        data: [1.04, 1.01, 0.69, 0.29],
                        backgroundColor: ['rgba(56, 189, 248, 0.8)', 'rgba(99, 102, 241, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(148, 163, 184, 0.3)'],
                        borderColor: ['rgba(56, 189, 248, 1)', 'rgba(99, 102, 241, 1)', 'rgba(168, 85, 247, 1)', 'rgba(148, 163, 184, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#94a3b8' } },
                        x: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { weight: 'bold' } } }
                    }
                }
            });
        }

        // --- Chart 2: HIIT Curve ---
        if (hiitChartRef.current) {
            chartInstances.current.hiit = new Chart(hiitChartRef.current, {
                type: 'line',
                data: {
                    labels: ['30s', '60s', '100s', `140s (${lang === 'tr' ? 'Zirve' : 'Peak'})`, '180s', '240s'],
                    datasets: [{
                        label: lang === 'tr' ? 'VO₂max Gelişim Potansiyeli' : 'VO₂max Potential',
                        data: [40, 60, 85, 100, 80, 50],
                        borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.1)', fill: true, tension: 0.4,
                        pointBackgroundColor: ['#6366f1', '#6366f1', '#6366f1', '#ffffff', '#6366f1', '#6366f1'],
                        pointRadius: [3, 3, 3, 6, 3, 3]
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                    scales: { y: { display: false }, x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } } }
                }
            });
        }

        // --- Chart 3: SIT Curve ---
        if (sitChartRef.current) {
            chartInstances.current.sit = new Chart(sitChartRef.current, {
                type: 'line',
                data: {
                    labels: ['30s', '60s', '90s', `97s (${lang === 'tr' ? 'Sınır' : 'Limit'})`, '120s', '180s'],
                    datasets: [{
                        label: lang === 'tr' ? 'VO₂max Etkinliği' : 'VO₂max Efficiency',
                        data: [95, 98, 95, 85, 30, 10],
                        borderColor: '#a855f7',
                        segment: { 
                            borderColor: ctx => ctx.p0.parsed.x >= 3 ? '#ef4444' : '#a855f7', 
                            borderDash: ctx => ctx.p0.parsed.x >= 3 ? [6, 6] : undefined 
                        },
                        tension: 0.2, pointBackgroundColor: '#a855f7', pointRadius: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                    scales: { y: { display: false }, x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } } }
                }
            });
        }

        return () => {
             if (chartInstances.current.eff) chartInstances.current.eff.destroy();
             if (chartInstances.current.hiit) chartInstances.current.hiit.destroy();
             if (chartInstances.current.sit) chartInstances.current.sit.destroy();
        };
    }, [lang]); // Dil değişince grafikleri yeniden oluştur

    // Diğer stiller (Card, Stamp vs.)
    const cardStyle = {
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        transition: 'transform 0.2s'
    };

    const goldStampStyle = {
        background: 'rgba(245, 158, 11, 0.15)',
        color: '#fbbf24',
        border: '1px solid rgba(251, 191, 36, 0.5)',
        boxShadow: '0 0 10px rgba(245, 158, 11, 0.2)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: '700'
    };

    return (
        <div className="font-[Inter] text-slate-200 antialiased selection:bg-sky-500 selection:text-white">
            {/* Hero Section */}
            <header className="relative overflow-hidden py-20 sm:py-28">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 inline-block pb-[0.2em] leading-[1.3]">
                            VO<sub className="text-primary" style={{ WebkitTextFillColor: 'currentColor' }}>2</sub>max
                        </span> {currentT.hero.titleSuffix}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                        {currentT.hero.subtitle}
                    </p>
                </div>
                {/* Background decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-[100px]"></div>
                </div>
            </header>

            {/* Definitions Section */}
            <section className="container mx-auto px-4 mb-16">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-sky-500 pl-4">
                    {currentT.definitions.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* RST Card */}
                    <div className="p-6 rounded-xl hover:-translate-y-1 hover:border-sky-400/30 transition-transform duration-200" style={cardStyle}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-sky-400">RST</h3>
                            <span className="bg-sky-900 text-sky-200 text-xs px-2 py-1 rounded">
                                {currentT.definitions.rst.badge}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2 font-semibold">Repeated Sprint Training</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{currentT.definitions.rst.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                            <span className="text-xs text-slate-500">{currentT.definitions.rst.example}</span>
                        </div>
                    </div>

                    {/* HIIT Card */}
                    <div className="p-6 rounded-xl relative overflow-hidden hover:-translate-y-1 hover:border-sky-400/30 transition-transform duration-200" style={cardStyle}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-indigo-400">HIIT</h3>
                            <span className="text-[10px] sm:text-xs px-2 py-1 rounded" style={goldStampStyle}>
                                {currentT.definitions.hiit.badge}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2 font-semibold">High-Intensity Interval Training</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{currentT.definitions.hiit.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                            <span className="text-xs text-slate-500">{currentT.definitions.hiit.example}</span>
                        </div>
                    </div>

                    {/* SIT Card */}
                    <div className="p-6 rounded-xl hover:-translate-y-1 hover:border-sky-400/30 transition-transform duration-200" style={cardStyle}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-purple-400">SIT</h3>
                            <span className="bg-purple-900 text-purple-200 text-xs px-2 py-1 rounded">
                                {currentT.definitions.sit.badge}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2 font-semibold">Sprint Interval Training</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{currentT.definitions.sit.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                            <span className="text-xs text-slate-500">{currentT.definitions.sit.example}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Analysis & Charts Section */}
            <section className="container mx-auto px-4 mb-16">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-indigo-500 pl-4">
                    {currentT.analysis.title}
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Chart 1: Effectiveness */}
                    <div className="p-6 rounded-xl" style={cardStyle}>
                        <h3 className="text-lg font-semibold mb-2">{currentT.analysis.chart1.title}</h3>
                        <p className="text-xs text-slate-400 mb-4">{currentT.analysis.chart1.subtitle}</p>
                        <div className="relative h-[300px] w-full">
                            <canvas ref={effChartRef}></canvas>
                        </div>
                        <div className="mt-4 p-3 bg-slate-800/50 rounded border border-slate-700">
                            <p className="text-xs text-slate-300 font-semibold mb-1">{currentT.analysis.legend.title}</p>
                            <div className="flex justify-between text-xs text-slate-400">
                                <span><span className="text-slate-500">0.2:</span> {currentT.analysis.legend.small}</span>
                                <span><span className="text-slate-500">0.5:</span> {currentT.analysis.legend.medium}</span>
                                <span><span className="text-slate-500">0.8+:</span> {currentT.analysis.legend.large}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 italic border-t border-slate-700/50 pt-2">
                                {currentT.analysis.legend.note}
                            </p>
                        </div>
                    </div>

                    {/* Chart 2: Ranking Probability */}
                    <div className="p-6 rounded-xl flex flex-col justify-center" style={cardStyle}>
                        <h3 className="text-lg font-semibold mb-2">{currentT.analysis.chart2.title}</h3>
                        <p className="text-xs text-slate-400 mb-6">{currentT.analysis.chart2.subtitle}</p>
                        
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-sky-400">RST {currentT.common.sprint}*</span>
                                    <span className="text-sm font-medium text-white">88%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-indigo-400">HIIT {currentT.common.hi}</span>
                                    <span className="text-sm font-medium text-white">85%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-purple-400">SIT {currentT.common.si}</span>
                                    <span className="text-sm font-medium text-white">51%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '51%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-slate-400">CT {currentT.common.ct}</span>
                                    <span className="text-sm font-medium text-white">23%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div className="bg-slate-500 h-2.5 rounded-full" style={{ width: '23%' }}></div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-slate-800 rounded text-xs text-slate-400 border-l-2 border-yellow-500" dangerouslySetInnerHTML={{ __html: currentT.analysis.chart2.note }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Optimization Section */}
            <section className="container mx-auto px-4 mb-16">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-green-500 pl-4">
                    {currentT.opt.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* HIIT Sweet Spot */}
                    <div className="p-6 rounded-xl" style={cardStyle}>
                        <h3 className="text-lg font-semibold text-indigo-400 mb-2">{currentT.opt.hiit.title}</h3>
                        <p className="text-sm text-slate-400 mb-4">{currentT.opt.hiit.desc}</p>
                        <div className="relative h-[250px] w-full">
                            <canvas ref={hiitChartRef}></canvas>
                        </div>
                        <div className="mt-2 text-center">
                            <span className="text-[0.7rem] text-slate-400 italic">{currentT.common.schematic}</span>
                        </div>
                        <div className="mt-4 bg-indigo-900/30 p-3 rounded border border-indigo-500/30">
                            <p className="text-sm font-bold text-indigo-200">{currentT.opt.hiit.formula_title}</p>
                            <p className="text-xs text-slate-300">{currentT.opt.hiit.formula_desc}</p>
                        </div>
                    </div>

                    {/* SIT Warning */}
                    <div className="p-6 rounded-xl" style={cardStyle}>
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">{currentT.opt.sit.title}</h3>
                        <p className="text-sm text-slate-400 mb-4">{currentT.opt.sit.desc}</p>
                        <div className="relative h-[250px] w-full">
                            <canvas ref={sitChartRef}></canvas>
                        </div>
                        <div className="mt-2 text-center">
                            <span className="text-[0.7rem] text-slate-400 italic">{currentT.common.schematic}</span>
                        </div>
                        <div className="mt-4 bg-purple-900/30 p-3 rounded border border-purple-500/30">
                            <p className="text-sm font-bold text-purple-200">{currentT.opt.sit.warning_title}</p>
                            <p className="text-xs text-slate-300">{currentT.opt.sit.warning_desc}</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Interactive Protocol Generator */}
            <section className="container mx-auto px-4 mb-16">
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-pink-500 pl-4">
                    {currentT.protocols.title}
                </h2>
                <p className="text-slate-400 mb-8" dangerouslySetInnerHTML={{ __html: currentT.protocols.subtitle }}></p>

                {/* Tabs */}
                <div className="flex border-b border-slate-700 mb-8 overflow-x-auto">
                    {['rst', 'hiit', 'sit'].map((tab) => (
                         <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)} 
                            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-sky-400 text-sky-400' : 'text-slate-400 hover:text-slate-300'}`}
                         >
                            {tab === 'rst' ? '1. RST' : tab === 'hiit' ? '2. HIIT' : '3. SIT'}
                         </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-slate-800/50 rounded-2xl p-1 border border-slate-700 min-h-[400px]">
                    
                    {/* RST Protocol */}
                    {activeTab === 'rst' && (
                        <div className="p-4 sm:p-8 animate-fadeIn">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-sky-400 mb-2">{currentT.protocols.rst.title}</h3>
                                    <p className="text-slate-300 mb-4 text-sm" dangerouslySetInnerHTML={{ __html: currentT.protocols.rst.desc }}></p>
                                    <p className="text-sky-300 text-xs font-bold uppercase mb-4">{currentT.protocols.example_header}</p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-sky-400 font-bold">1</span>{currentT.protocols.rst.step1}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-sky-400 font-bold">2</span><span className="text-white font-bold mx-1">{currentT.protocols.rst.step2_bold}</span> {currentT.protocols.rst.step2_text}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-sky-400 font-bold">3</span><span className="text-white font-bold mx-1">{currentT.protocols.rst.step3_bold}</span> {currentT.protocols.rst.step3_text}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-sky-400 font-bold">4</span>{currentT.protocols.rst.step4_pre} <span className="text-white font-bold mx-1">{currentT.protocols.rst.step4_bold}</span> {currentT.protocols.rst.step4_post}</li>
                                    </ul>
                                </div>
                                {/* Visual */}
                                <div className="w-full sm:w-1/3 bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-700">
                                    <div className="text-4xl font-black text-white mb-1">10x</div>
                                    <div className="text-sm text-slate-500 uppercase tracking-widest mb-6">{currentT.common.reps}</div>
                                    <div className="w-full flex justify-between items-center mb-2">
                                        <span className="text-xs text-sky-400 font-bold">SPRINT</span>
                                        <span className="text-xs text-slate-500">{currentT.common.rest}</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-sky-500 w-[20%]"></div>
                                        <div className="h-full bg-slate-700 w-[80%]"></div>
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-1">
                                        <span className="text-xs text-white">6 s</span>
                                        <span className="text-xs text-slate-400">24 s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* HIIT Protocol */}
                    {activeTab === 'hiit' && (
                        <div className="p-4 sm:p-8 animate-fadeIn">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-indigo-400 mb-2">{currentT.protocols.hiit.title}</h3>
                                    <p className="text-slate-300 mb-4 text-sm" dangerouslySetInnerHTML={{ __html: currentT.protocols.hiit.desc }}></p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-indigo-400 font-bold">1</span>{currentT.protocols.hiit.step1}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-indigo-400 font-bold">2</span><span className="text-white font-bold mx-1">2m 20s (140s)</span> {currentT.protocols.hiit.step2}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-indigo-400 font-bold">3</span><span className="text-white font-bold mx-1">2m 45s (165s)</span> {currentT.protocols.hiit.step3}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-indigo-400 font-bold">4</span>{currentT.protocols.hiit.step4} <span className="text-white font-bold mx-1">4-6x</span></li>
                                    </ul>
                                    <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/20">
                                        <p className="text-indigo-300 text-sm font-semibold">{currentT.protocols.hiit.mode_title}</p>
                                        <p className="text-xs text-slate-400">{currentT.protocols.hiit.mode_desc}</p>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/3 bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-700">
                                    <div className="text-4xl font-black text-white mb-1">4-6x</div>
                                    <div className="text-sm text-slate-500 uppercase tracking-widest mb-6">{currentT.common.reps}</div>
                                    <div className="w-full flex justify-between items-center mb-2">
                                        <span className="text-xs text-indigo-400 font-bold">{currentT.common.run}</span>
                                        <span className="text-xs text-slate-500">JOG</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-indigo-500 w-[46%]"></div>
                                        <div className="h-full bg-slate-600 w-[54%]"></div>
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-1">
                                        <span className="text-xs text-white">140 s</span>
                                        <span className="text-xs text-slate-400">165 s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SIT Protocol */}
                    {activeTab === 'sit' && (
                        <div className="p-4 sm:p-8 animate-fadeIn">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-purple-400 mb-2">{currentT.protocols.sit.title}</h3>
                                    <p className="text-slate-300 mb-4 text-sm" dangerouslySetInnerHTML={{ __html: currentT.protocols.sit.desc }}></p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-purple-400 font-bold">1</span>{currentT.protocols.sit.step1}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-purple-400 font-bold">2</span><span className="text-white font-bold mx-1">30 s</span> {currentT.protocols.sit.step2}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-purple-400 font-bold">3</span><span className="text-white font-bold mx-1">90 s*</span> {currentT.protocols.sit.step3}</li>
                                        <li className="flex items-center text-sm text-slate-300"><span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-purple-400 font-bold">4</span><span className="text-white font-bold mx-1">4-6x</span> {currentT.protocols.sit.step4}</li>
                                    </ul>
                                    <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                                        <p className="text-purple-300 text-sm font-semibold">{currentT.protocols.sit.mode_title}</p>
                                        <p className="text-xs text-slate-400">{currentT.protocols.sit.mode_desc}</p>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/3 bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-700">
                                    <div className="text-4xl font-black text-white mb-1">4-6x</div>
                                    <div className="text-sm text-slate-500 uppercase tracking-widest mb-6">{currentT.common.reps}</div>
                                    <div className="w-full flex justify-between items-center mb-2">
                                        <span className="text-xs text-purple-400 font-bold">MAX</span>
                                        <span className="text-xs text-slate-500">{currentT.common.rest}</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-purple-500 w-[25%]"></div>
                                        <div className="h-full bg-slate-700 w-[75%]"></div>
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-1">
                                        <span className="text-xs text-white">30 s</span>
                                        <span className="text-xs text-slate-400">90 s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {/* Editor's Note */}
            <section className="container mx-auto px-4 mb-24">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-amber-500 rounded-r-xl p-6 sm:p-8 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold text-amber-500 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {currentT.editor.title}
                    </h3>
                    <p className="text-slate-300 italic leading-relaxed text-sm sm:text-base">
                        {currentT.editor.text}
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 text-center text-xs border-t border-slate-800">
                <p className="text-slate-500 mb-4">
                    Yang Q, Wang J, Guan D. Comparison of different interval training methods on athletes’ oxygen uptake: a systematic review with pairwise and network meta-analysis. BMC Sports Science, Medicine and Rehabilitation. 2025;17:156. doi:10.1186/s13102-025-01191-6
                </p>
                <p className="text-red-400 font-semibold bg-red-900/10 p-2 rounded inline-block">
                    {currentT.footer.warning}
                </p>
            </footer>
        </div>
    );
};

// Window Assignment
window.VO2MaxRehberi2025Page = VO2MaxRehberi2025Page;
