const { useState, useEffect } = React;

// --- ICONS (Dahili Tanımlama - App.js bağımsız) ---
const IconWrapper = ({ children, size = 24, className = "", ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        {children}
    </svg>
);

const NitrateIcons = {
    Beet: (p) => <IconWrapper {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><path d="M12 22c0-4 2-7 2-7" /></IconWrapper>,
    Mitochondria: (p) => <IconWrapper {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></IconWrapper>,
    Muscle: (p) => <IconWrapper {...p}><path d="M6.5 6.5l5 5" /><path d="M17.5 17.5l-5-5" /><path d="M21 21l-3-3" /><path d="M3 3l3 3" /><circle cx="12" cy="12" r="3" /></IconWrapper>,
    Clock: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></IconWrapper>,
    Warning: (p) => <IconWrapper {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></IconWrapper>,
    Run: (p) => <IconWrapper {...p}><path d="M4 16l4-1 2-6-3-2" /><path d="M13 8l3 3-3 3" /><path d="M16 5h4" /><circle cx="14" cy="4" r="2" /></IconWrapper>,
    Chart: (p) => <IconWrapper {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></IconWrapper>,
    Check: (p) => <IconWrapper {...p}><polyline points="20 6 9 17 4 12"/></IconWrapper>,
    Flask: (p) => <IconWrapper {...p}><path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/></IconWrapper>
};

// --- DATA: Plazma Nitrit Eğrisi ---
const timingData = [
    { label: '0dk', val: 5 },
    { label: '30dk', val: 30 },
    { label: '1sa', val: 60 },
    { label: '1.5sa', val: 85 },
    { label: '2.5sa', val: 100, peak: true }, // Zirve
    { label: '3.5sa', val: 80 },
    { label: '5sa', val: 50 },
    { label: '24sa', val: 10 }
];

const BeetrootNitratePage = ({ lang = 'tr', activeTheme }) => {
    // App.js'den tema gelmezse varsayılan Rose kullan
    const safeTheme = activeTheme || { id: 'rose', hex: '#e11d48', name: 'Rose' };
    const [activeTab, setActiveTab] = useState('mechanism');

    // REFERANS LISTESI (User Provided)
    const referencesList = [
        "Jones AM. Dietary nitrate supplementation and exercise performance. Sports Med. 2014;44(Suppl 1):S35–S45. doi:10.1007/s40279-014-0149-y.",
        "Bailey SJ, et al. Dietary nitrate supplementation reduces the O2 cost of low-intensity exercise and enhances tolerance to high-intensity exercise in humans. J Appl Physiol (1985). 2009;107:1144–1155.",
        "Lansley KE, et al. Dietary nitrate supplementation reduces the O2 cost of walking and running: a placebo-controlled study. J Appl Physiol (1985). 2011;110:591–600.",
        "Wylie LJ, et al. Beetroot juice and exercise: pharmacodynamic and dose-response relationships. J Appl Physiol (1985). 2013;115(3):325–336.",
        "Larsen FJ, et al. Effects of dietary nitrate on oxygen cost during exercise. Acta Physiol (Oxf). 2007;191:59–66.",
        "Hennis PJ, et al. Dietary nitrate supplementation does not alter exercise efficiency at high altitude—further results from the Xtreme Alps study. Front Physiol. 2022;13:827235.",
        "Esen O, Domínguez R, Karayigit R. Acute beetroot juice supplementation enhances intermittent running performance but does not reduce oxygen cost of exercise among recreational adults. Nutrients. 2022;14:2839.",
        "Tan R, et al. The effects of dietary nitrate supplementation on explosive exercise performance: a systematic review. Int J Environ Res Public Health. 2022;19:762.",
        "Esen O, Dobbin N, Callaghan MJ. The effect of dietary nitrate on the contractile properties of human skeletal muscle: a systematic review and meta-analysis. J Am Nutr Assoc. 2023;42(4):327–338.",
        "Alsharif NS, et al. Effects of dietary nitrate supplementation on performance during single and repeated bouts of short-duration high-intensity exercise: a systematic review and meta-analysis. Antioxidants. 2023;12:1194.",
        "Hogwood AC, et al. Limited effects of inorganic nitrate supplementation on exercise training responses: a systematic review and meta-analysis. Sports Med Open. 2023;9:84.",
        "Jędrejko M, et al. Exploring the impact of alternative sources of dietary nitrate supplementation on exercise performance. Int J Mol Sci. 2024;25:3650.",
        "Kavcı Z, et al. Investigation of the effect of nitrate and L-arginine intake on aerobic, anaerobic performance, balance, agility, and recovery in elite taekwondo athletes. J Int Soc Sports Nutr. 2025;22(1):2445609.",
        "Poon ETC, et al. Dietary nitrate supplementation and exercise performance: an umbrella review of 20 published systematic reviews with meta-analyses. Sports Med. 2025;55:1213–1231. doi:10.1007/s40279-025-02194-6."
    ];

    const content = {
        tr: {
            header: {
                title: "Pancar Suyu & Nitrat",
                subtitle: "Damar Genişlemesinden Hücresel Yakıt Tasarrufuna",
                desc: "Pancar suyu (Nitrat), 2007-2025 literatürüne göre sadece kan akışını değil, kasın kasılma gücünü ve oksijen verimliliğini de artıran kanıtlanmış bir ergojenik destektir [1, 14]."
            },
            tabs: [
                { id: 'mechanism', label: 'Nasıl Çalışır?', icon: NitrateIcons.Mitochondria },
                { id: 'performance', label: 'Performans Etkisi', icon: NitrateIcons.Chart },
                { id: 'protocol', label: 'Protokol & Doz', icon: NitrateIcons.Flask },
                { id: 'summary', label: 'Özet', icon: NitrateIcons.Check }
            ],
            mechanism: {
                title: "İki Yönlü Etki Mekanizması",
                card1: {
                    title: "A) Klasik Yol: Damar Açma",
                    desc: "Diyetle alınan Nitrat (NO3), ağız bakterileri tarafından Nitrite (NO2) çevrilir. Mide asidi ve egzersiz sırasında Nitrik Oksite (NO) dönüşerek damarları genişletir ve kan akışını artırır [1].",
                    badge: "Hemodinamik"
                },
                card2: {
                    title: "B) Yeni Keşif: Hücresel Yakıt",
                    desc: "Nitrat, mitokondrideki 'proton sızıntısını' azaltarak aynı işi %3-5 daha az oksijenle yapmanızı sağlar [2, 3]. Ayrıca kas içindeki Kalsiyum (Ca2+) yönetimini iyileştirerek patlayıcı gücü destekler [9, 14].",
                    badge: "Metabolik & Kas"
                }
            },
            performance: {
                title: "Branşa Özgü Beklentiler",
                cards: [
                    {
                        title: "Hyrox & CrossFit",
                        desc: "Zirve güce ulaşma süresi (Time to Peak Power) kısalır [14]. Tekrarlı sprint ve yoğun eforlarda (Yo-Yo testleri) mesafe artışı sağlar [7, 10].",
                        icon: NitrateIcons.Muscle
                    },
                    {
                        title: "Koşu & Bisiklet",
                        desc: "Koşu ekonomisini (Running Economy) iyileştirir; submaksimal hızlarda oksijen maliyeti %3-5 düşer [2, 3, 5]. TTE (Tükenme Süresi) artar [14].",
                        icon: NitrateIcons.Run
                    },
                    {
                        title: "Ultra & İrtifa",
                        desc: "Yokuş yukarı yürüyüşlerde enerji tasarrufu sağlayabilir [3]. Ancak çok yüksek irtifada (4500m+) ve uzun süreli kalışlarda etkisi azalabilir veya kaybolabilir [6].",
                        icon: NitrateIcons.Beet
                    },
                    {
                        title: "Patlayıcı Güç",
                        desc: "Kısa süreli (<6 sn) patlayıcı egzersizlerde (sprint, halter) güç üretimini ve hızı artırma potansiyeli vardır [8, 9].",
                        icon: NitrateIcons.Chart
                    }
                ]
            },
            protocol: {
                title: "Kanıta Dayalı Kullanım",
                dose: { title: "Dozaj", val: "6-9 mmol (~400-500mg)", desc: "En az 6 mmol alımı önerilir. Dozu iki katına çıkarmak (16 mmol) performansta ek bir artış sağlamaz (plato etkisi) [4, 14]." },
                time: { title: "Zamanlama", val: "2.5 - 3 Saat Önce", desc: "Plazma nitrit seviyesi kanda bu sürede zirve yapar [1, 4]. Antrenmandan hemen önce içmek geç kalmaktır." },
                load: { title: "Yükleme", val: "3 - 7 Gün", desc: "Sadece yarış günü içmek işe yarar, ancak >3 gün yükleme yapmak (özellikle TTE testlerinde) daha tutarlı sonuç verir [14]." },
                warn: { title: "Kritik Uyarı", desc: "Ağız bakterileri nitratı nitrite çevirmek zorundadır. Güçlü antiseptik gargaralar (Listerine vb.) bu bakterileri öldürür ve takviyeyi çöp eder [1]." }
            },
            summary: {
                title: "Kanıt Gücü (Umbrella Review 2025)",
                rows: [
                    { label: "Kas Dayanıklılığı", stars: 5, desc: "Çok Güçlü [14]" },
                    { label: "TTE (Dayanma Süresi)", stars: 4, desc: "Güçlü (>3 gün kullanım) [14]" },
                    { label: "Oksijen Maliyeti", stars: 4, desc: "Güçlü (%3-5 düşüş) [2, 3]" },
                    { label: "Antrenman Adaptasyonu", stars: 1, desc: "Zayıf/Etkisiz [11]" }
                ]
            }
        },
        en: {
            header: {
                title: "Beetroot Juice & Nitrate",
                subtitle: "From Vasodilation to Cellular Fuel Optimization",
                desc: "Beetroot juice (Nitrate) is a proven ergogenic aid that enhances not only blood flow but also muscle contractile power and oxygen efficiency, according to 2007-2025 literature [1, 14]."
            },
            tabs: [
                { id: 'mechanism', label: 'Mechanism', icon: NitrateIcons.Mitochondria },
                { id: 'performance', label: 'Performance', icon: NitrateIcons.Chart },
                { id: 'protocol', label: 'Protocol', icon: NitrateIcons.Flask },
                { id: 'summary', label: 'Summary', icon: NitrateIcons.Check }
            ],
            mechanism: {
                title: "Dual Mechanism of Action",
                card1: {
                    title: "A) Classic: Vasodilation",
                    desc: "Dietary Nitrate (NO3) is converted to Nitrite (NO2) by oral bacteria. It converts to Nitric Oxide (NO) in the stomach/exercise, dilating vessels [1].",
                    badge: "Hemodynamic"
                },
                card2: {
                    title: "B) New: Cellular Fuel",
                    desc: "Nitrate reduces 'proton leak' in mitochondria, enabling same work with 3-5% less oxygen [2, 3]. It also improves Calcium (Ca2+) handling for power [9, 14].",
                    badge: "Metabolic & Muscle"
                }
            },
            performance: {
                title: "Sport-Specific Benefits",
                cards: [
                    {
                        title: "Hyrox & CrossFit",
                        desc: "Reduces Time to Peak Power [14]. Increases distance in intermittent sprint tests (Yo-Yo IR1) [7, 10].",
                        icon: NitrateIcons.Muscle
                    },
                    {
                        title: "Run & Bike",
                        desc: "Improves Running Economy; reduces oxygen cost by 3-5% at submaximal speeds [2, 3, 5]. Increases TTE [14].",
                        icon: NitrateIcons.Run
                    },
                    {
                        title: "Ultra & Altitude",
                        desc: "May save energy in uphill walking [3]. However, effect may diminish or vanish at very high altitude (4500m+) with chronic exposure [6].",
                        icon: NitrateIcons.Beet
                    },
                    {
                        title: "Explosive Power",
                        desc: "Potential to enhance power output and velocity in short-duration (<6s) explosive exercises [8, 9].",
                        icon: NitrateIcons.Chart
                    }
                ]
            },
            protocol: {
                title: "Evidence-Based Protocol",
                dose: { title: "Dosage", val: "6-9 mmol (~400-500mg)", desc: "Minimum 6 mmol recommended. Doubling dose (16 mmol) does not further enhance performance (plateau) [4, 14]." },
                time: { title: "Timing", val: "2.5 - 3 Hours Before", desc: "Plasma nitrite peaks in this window [1, 4]. Drinking immediately before training is too late." },
                load: { title: "Loading", val: "3 - 7 Days", desc: "Acute use works, but loading >3 days (especially for TTE) yields more consistent results [14]." },
                warn: { title: "Critical Warning", desc: "Oral bacteria must convert nitrate. Strong mouthwashes kill these bacteria and nullify the supplement [1]." }
            },
            summary: {
                title: "Strength of Evidence (Umbrella Review 2025)",
                rows: [
                    { label: "Muscle Endurance", stars: 5, desc: "Very Strong [14]" },
                    { label: "TTE (Time to Exhaustion)", stars: 4, desc: "Strong (>3 days use) [14]" },
                    { label: "Oxygen Cost", stars: 4, desc: "Strong (3-5% reduction) [2, 3]" },
                    { label: "Training Adaptation", stars: 1, desc: "Weak/Ineffective [11]" }
                ]
            }
        }
    };

    const t = content[lang] || content.tr;

    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-500">
            
            {/* 1. HEADER AREA */}
            <header className="relative bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 overflow-hidden shadow-2xl mb-8 text-center">
                {/* Dinamik Arkaplan Işıltısı */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: safeTheme.hex }}
                ></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="p-4 rounded-2xl bg-slate-900/80 mb-6 ring-1 ring-white/10 shadow-lg" style={{ color: safeTheme.hex }}>
                        <NitrateIcons.Beet size={56} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                        {t.header.title}
                    </h1>
                    <p className="text-lg md:text-xl font-medium mb-6" style={{ color: safeTheme.hex }}>
                        {t.header.subtitle}
                    </p>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
                        {t.header.desc}
                    </p>
                </div>
            </header>

            {/* 2. GRID MENU (TABS) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {t.tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 relative group overflow-hidden ${
                                isActive ? 'bg-slate-800 shadow-lg' : 'bg-slate-800/40 border-slate-700 hover:bg-slate-700/60'
                            }`}
                            style={{ 
                                borderColor: isActive ? safeTheme.hex : '',
                            }}
                        >
                            {isActive && (
                                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: safeTheme.hex }} />
                            )}
                            <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} style={{ color: isActive ? safeTheme.hex : '#94a3b8' }}>
                                <tab.icon size={26} />
                            </div>
                            <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* 3. DYNAMIC CONTENT CONTENT */}
            <div className="min-h-[400px]">
                
                {/* --- MECHANISM TAB --- */}
                {activeTab === 'mechanism' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="grid md:grid-cols-2 gap-6">
                            {[t.mechanism.card1, t.mechanism.card2].map((card, idx) => (
                                <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative hover:border-slate-500 transition-colors">
                                    <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-700 uppercase tracking-wider">
                                        {card.badge}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-3 mt-2">{card.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                        {/* Interactive Graph */}
                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                            <h4 className="text-sm font-bold text-slate-400 uppercase mb-6 flex items-center gap-2">
                                <NitrateIcons.Clock size={16} /> Nitrit Plazma Kinetiği [4]
                            </h4>
                            <div className="relative h-40 flex items-end justify-between gap-2 px-2">
                                {timingData.map((d, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                        <div 
                                            className="w-full rounded-t-sm transition-all duration-500 relative hover:opacity-90"
                                            style={{ 
                                                height: `${d.val}%`, 
                                                backgroundColor: d.peak ? safeTheme.hex : '#334155',
                                                opacity: d.peak ? 1 : 0.5
                                            }}
                                        >
                                            {d.peak && (
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-3 py-1 rounded shadow-xl whitespace-nowrap z-10">
                                                    PİK NOKTASI
                                                </div>
                                            )}
                                        </div>
                                        <span className={`text-[10px] font-mono ${d.peak ? 'text-white font-bold' : 'text-slate-600'}`}>{d.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PERFORMANCE TAB --- */}
                {activeTab === 'performance' && (
                    <div className="grid md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        {t.performance.cards.map((card, idx) => (
                            <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-slate-900 group-hover:scale-110 transition-transform duration-300" style={{ color: safeTheme.hex }}>
                                        <card.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- PROTOCOL TAB --- */}
                {activeTab === 'protocol' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="grid md:grid-cols-3 gap-4">
                            {[t.protocol.dose, t.protocol.time, t.protocol.load].map((item, idx) => (
                                <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 transition-all duration-500 group-hover:h-1.5" style={{ backgroundColor: safeTheme.hex }}></div>
                                    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">{item.title}</h4>
                                    <div className="text-lg md:text-xl font-black text-white mb-3">{item.val}</div>
                                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border border-red-500/30 bg-red-500/5 p-6 rounded-2xl flex items-start gap-4">
                            <div className="text-red-500 shrink-0 mt-1"><NitrateIcons.Warning size={24} /></div>
                            <div>
                                <h4 className="text-red-400 font-bold mb-1">{t.protocol.warn.title}</h4>
                                <p className="text-red-300/70 text-sm">{t.protocol.warn.desc}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SUMMARY TAB --- */}
                {activeTab === 'summary' && (
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="p-4 bg-slate-900/50 border-b border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold text-white">{t.summary.title}</h3>
                            <NitrateIcons.Check size={20} className="text-emerald-500" />
                        </div>
                        <div className="divide-y divide-slate-700">
                            {t.summary.rows.map((row, idx) => (
                                <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-700/30 transition-colors">
                                    <span className="text-slate-200 font-bold text-sm">{row.label}</span>
                                    <div className="flex items-center gap-4">
                                        <div className="flex text-yellow-500 text-xs">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < row.stars ? "opacity-100" : "opacity-20"}>★</span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-500 font-mono text-right min-w-[120px]">{row.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 4. REFERENCES FOOTER (User Provided List) */}
            <div className="mt-16 pt-8 border-t border-slate-800">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                    <NitrateIcons.Flask size={14} /> {lang === 'tr' ? 'Kaynakça' : 'References'}
                </h3>
                <div className="grid gap-3">
                    {referencesList.map((ref, idx) => {
                        // Extract [X] number for visual index
                        const num = idx + 1;
                        return (
                            <div key={idx} className="flex gap-3 text-[11px] text-slate-500 font-mono leading-relaxed group">
                                <span className="text-slate-700 select-none shrink-0 group-hover:text-primary transition-colors">[{num}]</span>
                                <p className="group-hover:text-slate-400 transition-colors">{ref}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

// Global Scope Export
window.BeetrootNitratePage = BeetrootNitratePage;
