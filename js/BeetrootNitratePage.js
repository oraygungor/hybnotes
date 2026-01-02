const { useState, useEffect, useRef } = React;
// Recharts kütüphanesini window nesnesinden al (index.html'de yüklü olmalı, yoksa basit SVG çizeriz)
// Not: Recharts index.html'de yoksa diye aşağıda manuel SVG grafik kullandım, garanti olsun.

// --- ICONS (Lucide/Feather stili - Konuya özel ikonlar) ---
const IconWrapper = ({ children, size = 24, className = "", ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className} 
        {...props}
    >
        {children}
    </svg>
);

const NitrateIcons = {
    Beet: (p) => <IconWrapper {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><path d="M12 22c0-4 2-7 2-7" /></IconWrapper>, // Yaprak/Kök benzeri
    Mitochondria: (p) => <IconWrapper {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></IconWrapper>, // Enerji/Zap
    Muscle: (p) => <IconWrapper {...p}><path d="M6.5 6.5l5 5" /><path d="M17.5 17.5l-5-5" /><path d="M21 21l-3-3" /><path d="M3 3l3 3" /><circle cx="12" cy="12" r="3" /></IconWrapper>, // Aktivite
    Clock: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></IconWrapper>,
    Warning: (p) => <IconWrapper {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></IconWrapper>,
    Run: (p) => <IconWrapper {...p}><path d="M4 16l4-1 2-6-3-2" /><path d="M13 8l3 3-3 3" /><path d="M16 5h4" /><circle cx="14" cy="4" r="2" /></IconWrapper>
};

// --- DATA: Nitrat Zamanlama Grafiği Verisi ---
const timingData = [
    { time: '0dk', level: 0, label: 'Başlangıç' },
    { time: '30dk', level: 20, label: 'Emilim' },
    { time: '1s', level: 50, label: 'Yükseliş' },
    { time: '2.5s', level: 100, label: 'ZİRVE (PİK)' },
    { time: '3s', level: 95, label: 'Plato' },
    { time: '4s', level: 70, label: 'Düşüş' },
    { time: '6s', level: 40, label: 'Eliminasyon' },
];

const BeetrootNitratePage = ({ lang = 'tr', activeTheme = 'rose' }) => {
    // İçerik dili (Şimdilik sadece TR odaklı, EN desteği için yapı hazır)
    const content = {
        tr: {
            title: "Pancar Suyu Devrimi: Nitrat Bilimi",
            subtitle: "Damar Açmaktan Hücresel Yakıt Optimizasyonuna",
            intro: "Pancar suyu ve içindeki nitrat, spor dünyasında uzun süredir konuşuluyor. Ancak 2023-2025 yılları arasında yapılan yeni araştırmalar, etkinin sadece kan akışı ile sınırlı olmadığını kanıtladı. Mitokondriyal verimlilik ve kasın ateşleme gücü üzerindeki etkileriyle nitrat, modern sporcunun en güçlü silahlarından biri.",
            sections: {
                mechanism: {
                    title: "Nasıl Çalışır? (Eski vs Yeni)",
                    classic: {
                        title: "A) Klasik Yol: Damar Açma",
                        desc: "Nitrat (NO3) → Nitrit (NO2) → Nitrik Oksit (NO) döngüsü. Damarları genişleterek kaslara daha fazla kan gitmesini sağlar. Bu bilinen kısımdır."
                    },
                    modern: {
                        title: "B) Yeni Keşif: Hücresel Yakıt",
                        desc1: "Oksijen Tasarrufu: Mitokondrideki proton sızıntısını azaltarak aynı işi %3-5 daha az oksijenle yapmanızı sağlar.",
                        desc2: "Kas Gücü: Kalsiyum (Ca+) yönetimini iyileştirerek kasın daha sert ve hızlı kasılmasına (özellikle patlayıcı hareketlerde) yardımcı olur."
                    }
                },
                benefits: {
                    title: "Hangi Sporda Ne Beklemeli?",
                    hyrox: {
                        title: "Hyrox & CrossFit",
                        desc: "Patlayıcı başlangıçlar (Sled Push) ve kas dayanıklılığı (Wall Ball) için kritik. Zirve güce ulaşma süresi kısalır."
                    },
                    run: {
                        title: "Koşu (5K-21K)",
                        desc: "Running Economy artışı (%3-5). Yarış temposunda nabzı ve oksijen maliyetini düşürür."
                    },
                    ultra: {
                        title: "Ultra & Doğa",
                        desc: "Yokuş yukarı yürüyüşlerde %12'ye varan enerji tasarrufu sağlar. Ancak çok yüksek irtifada (4500m+) etkisi azalabilir."
                    },
                    team: {
                        title: "Takım Sporları",
                        desc: "Yo-Yo testlerinde %14'e varan mesafe artışı. Dur-kalk eforlarında toparlanmayı hızlandırır."
                    }
                },
                protocol: {
                    title: "Pratik Kullanım Protokolü",
                    dose: { title: "Dozaj", desc: "En az 400-500mg (6-9 mmol) Nitrat. Ürün etiketine mutlaka bakın. Çift doz ekstra fayda sağlamaz (Plato etkisi)." },
                    time: { title: "Zamanlama", desc: "Egzersizden 2.5 - 3 saat önce için. Plazma nitrit seviyesi bu sürede zirve yapar." },
                    warn: { title: "Kritik Hata", desc: "Asla güçlü antibakteriyel gargara (Listerine vb.) kullanmayın! Ağız bakterilerini öldürürseniz nitrat işe yaramaz." },
                    loading: { title: "Yükleme?", desc: "Yarış için: Önceki 3-7 gün her gün 1 doz + Yarış sabahı 1 doz." }
                }
            },
            references: "Referanslar"
        },
        en: {
            // English placeholders structure (matches TR)
            title: "Beetroot Revolution: Nitrate Science",
            subtitle: "From Vasodilation to Cellular Fuel Optimization",
            intro: "Beetroot juice and nitrate have long been discussed. However, new research (2023-2025) proves the effect goes beyond blood flow. With effects on mitochondrial efficiency and muscle firing power, nitrate is a potent tool.",
            sections: {
                mechanism: {
                    title: "How It Works",
                    classic: { title: "Classic: Vasodilation", desc: "Nitrate → Nitrite → Nitric Oxide. Dilates blood vessels." },
                    modern: { title: "New: Cellular Fuel", desc1: "Oxygen Sparing: Reduces O2 cost by 3-5%.", desc2: "Muscle Power: Improves Calcium handling for explosive power." }
                },
                benefits: {
                    title: "Sports Specific Benefits",
                    hyrox: { title: "Hyrox & CrossFit", desc: "Critical for explosive starts and muscle endurance." },
                    run: { title: "Running", desc: "Improves Running Economy by 3-5%." },
                    ultra: { title: "Ultra", desc: "Up to 12% energy saving in uphill walking." },
                    team: { title: "Team Sports", desc: "Improved recovery in intermittent sprints." }
                },
                protocol: {
                    title: "Protocol",
                    dose: { title: "Dosage", desc: "400-500mg (6-9 mmol). Check labels." },
                    time: { title: "Timing", desc: "2.5 - 3 hours before exercise." },
                    warn: { title: "Warning", desc: "No antibacterial mouthwash! It kills the necessary bacteria." },
                    loading: { title: "Loading", desc: "3-7 days before race + Race day." }
                }
            },
            references: "References"
        }
    };

    const t = content[lang] || content.tr;
    // Tematik renk ayarı (Varsayılan pancar kırmızısı/rose, ama activeTheme propsu gelirse ona uyar)
    const themeColor = activeTheme === 'blue' ? 'text-blue-400' : 'text-rose-500';
    const borderColor = activeTheme === 'blue' ? 'border-blue-500/30' : 'border-rose-500/30';
    const bgHover = activeTheme === 'blue' ? 'hover:bg-blue-500/10' : 'hover:bg-rose-500/10';

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
            
            {/* --- HERO SECTION --- */}
            <header className="space-y-6 text-center py-10">
                <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-slate-800 ring-1 ring-white/10 ${themeColor}`}>
                        <NitrateIcons.Beet size={48} />
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    {t.title}
                </h1>
                <p className={`text-xl md:text-2xl font-light ${themeColor}`}>
                    {t.subtitle}
                </p>
                <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    {t.intro}
                </p>
            </header>

            {/* --- MECHANISM SECTION (GRID) --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <NitrateIcons.Mitochondria className={themeColor} />
                    <h2 className="text-2xl font-bold text-slate-100">{t.sections.mechanism.title}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Classic Path */}
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">2009-2015</span>
                            <h3 className="font-bold text-lg text-slate-200">{t.sections.mechanism.classic.title}</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {t.sections.mechanism.classic.desc}
                        </p>
                        <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-slate-500/50"></div>
                        </div>
                    </div>

                    {/* Modern Path */}
                    <div className={`bg-slate-800/80 p-6 rounded-2xl border ${borderColor} space-y-4 relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 p-2 opacity-10 ${themeColor}`}>
                            <NitrateIcons.Mitochondria size={100} />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-mono ${themeColor} border border-current px-2 py-1 rounded bg-slate-900/50`}>2023-2025</span>
                            <h3 className="font-bold text-lg text-white">{t.sections.mechanism.modern.title}</h3>
                        </div>
                        <ul className="space-y-3 text-slate-300 text-sm z-10 relative">
                            <li className="flex gap-2">
                                <span className={themeColor}>•</span>
                                <span>{t.sections.mechanism.modern.desc1}</span>
                            </li>
                            <li className="flex gap-2">
                                <span className={themeColor}>•</span>
                                <span>{t.sections.mechanism.modern.desc2}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- TIMING CHART --- */}
            <section className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-200">Zamanlama Eğrisi</h3>
                        <p className="text-sm text-slate-500">Plazma Nitrit Seviyesi (Akut Alım)</p>
                    </div>
                    <NitrateIcons.Clock className="text-slate-600" />
                </div>
                
                {/* Custom CSS Chart Visualization */}
                <div className="relative h-48 w-full flex items-end justify-between gap-1 px-2">
                    {timingData.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 w-full group">
                            <div 
                                className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 group-hover:brightness-125 ${d.level === 100 ? `bg-gradient-to-t from-slate-800 to-${activeTheme === 'blue' ? 'blue' : 'rose'}-500` : 'bg-slate-700/50'}`}
                                style={{ height: `${d.level}%` }}
                            >
                                {d.level === 100 && (
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded shadow-lg">
                                        PİK NOKTASI
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-slate-500 font-mono text-center">{d.time}</div>
                        </div>
                    ))}
                    
                    {/* Axis Line */}
                    <div className="absolute bottom-6 left-0 right-0 h-px bg-slate-700"></div>
                </div>
                <p className="text-center text-xs text-slate-500 mt-4 font-mono bg-slate-800/50 py-2 rounded">
                    ÖNERİLEN İÇME ZAMANI: ANTRENMANDAN 2.5 - 3 SAAT ÖNCE
                </p>
            </section>

            {/* --- SPORTS SPECIFIC BENEFITS --- */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <NitrateIcons.Muscle className={themeColor} />
                    <h2 className="text-2xl font-bold text-slate-100">{t.sections.benefits.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { icon: NitrateIcons.Muscle, data: t.sections.benefits.hyrox },
                        { icon: NitrateIcons.Run, data: t.sections.benefits.run },
                        { icon: NitrateIcons.Beet, data: t.sections.benefits.ultra }, // Doğa ikonu yerine Beet kullandık
                        { icon: NitrateIcons.Mitochondria, data: t.sections.benefits.team }
                    ].map((item, idx) => (
                        <div key={idx} className={`p-5 rounded-xl border border-white/5 bg-slate-800/30 ${bgHover} transition-colors group`}>
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg bg-slate-800 text-slate-400 group-hover:text-white transition-colors`}>
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-200 mb-1">{item.data.title}</h4>
                                    <p className="text-sm text-slate-400 leading-snug">{item.data.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- PROTOCOL SECTION --- */}
            <section className={`rounded-3xl p-1 bg-gradient-to-br from-slate-800 to-slate-900 border ${borderColor}`}>
                <div className="bg-slate-900/90 rounded-[22px] p-6 md:p-8 space-y-8 backdrop-blur-sm">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">{t.sections.protocol.title}</h2>
                        <div className={`h-1 w-20 mx-auto rounded-full bg-${activeTheme === 'blue' ? 'blue' : 'rose'}-500`}></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Dose */}
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-green-400 ring-1 ring-white/10">
                                <span className="font-bold text-lg">Mg</span>
                            </div>
                            <h4 className="font-bold text-slate-200">{t.sections.protocol.dose.title}</h4>
                            <p className="text-sm text-slate-400">{t.sections.protocol.dose.desc}</p>
                        </div>

                        {/* Timing */}
                        <div className="text-center space-y-3">
                            <div className={`mx-auto w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center ${themeColor} ring-1 ring-white/10`}>
                                <NitrateIcons.Clock size={20} />
                            </div>
                            <h4 className="font-bold text-slate-200">{t.sections.protocol.time.title}</h4>
                            <p className="text-sm text-slate-400">{t.sections.protocol.time.desc}</p>
                        </div>

                        {/* Warning */}
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 ring-1 ring-white/10">
                                <NitrateIcons.Warning size={20} />
                            </div>
                            <h4 className="font-bold text-slate-200">{t.sections.protocol.warn.title}</h4>
                            <p className="text-sm text-slate-400">{t.sections.protocol.warn.desc}</p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                        <span className="font-bold text-slate-300 block mb-1">{t.sections.protocol.loading.title}</span>
                        <span className="text-sm text-slate-400">{t.sections.protocol.loading.desc}</span>
                    </div>
                </div>
            </section>

            {/* --- REFERENCES --- */}
            <footer className="pt-10 border-t border-slate-800">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">{t.references}</h3>
                <div className="text-xs text-slate-600 space-y-2 font-mono leading-relaxed">
                    <p>[1] Jones AM. (2014). Dietary nitrate supplementation and exercise performance. Sports Med.</p>
                    <p>[2] Bailey SJ, et al. (2009). Dietary nitrate supplementation reduces the O2 cost... J Appl Physiol.</p>
                    <p>[3] Lansley KE, et al. (2011). Dietary nitrate supplementation reduces the O2 cost of walking... J Appl Physiol.</p>
                    <p>[4] Wylie LJ, et al. (2013). Beetroot juice and exercise: pharmacodynamic and dose-response... J Appl Physiol.</p>
                    <p>[5] Larsen FJ, et al. (2007). Effects of dietary nitrate on oxygen cost during exercise. Acta Physiol.</p>
                    <p>[6] Hennis PJ, et al. (2022). Dietary nitrate supplementation does not alter exercise efficiency at high altitude. Front Physiol.</p>
                    <p>[7] Esen O, et al. (2022). Acute beetroot juice supplementation enhances intermittent running... Nutrients.</p>
                    <p>[8] Tan R, et al. (2022). The effects of dietary nitrate supplementation on explosive exercise performance. IJERPH.</p>
                    <p>[9] Esen O, et al. (2023). The effect of dietary nitrate on the contractile properties... J Am Nutr Assoc.</p>
                    <p>[10] Alsharif NS, et al. (2023). Effects of dietary nitrate supplementation on performance... Antioxidants.</p>
                    <p>[11] Hogwood AC, et al. (2023). Limited effects of inorganic nitrate supplementation on exercise training... Sports Med Open.</p>
                    <p>[13] Kavcı Z, et al. (2025). Investigation of the effect of nitrate and L-arginine... J Int Soc Sports Nutr.</p>
                    <p>[14] Poon ETC, et al. (2025). Dietary Nitrate Supplementation and Exercise Performance: An Umbrella Review... Sports Med.</p>
                </div>
            </footer>
        </div>
    );
};

// Global scope'a ekle (App.js'in bulabilmesi için)
window.BeetrootNitratePage = BeetrootNitratePage;
