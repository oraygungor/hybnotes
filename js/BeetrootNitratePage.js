const { useState, useEffect } = React;

// --- ICONS ---
// Sayfa içinde kullanılan özel ikonlar
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
    Check: (p) => <IconWrapper {...p}><polyline points="20 6 9 17 4 12"/></IconWrapper>
};

const BeetrootNitratePage = ({ lang = 'tr', activeTheme }) => {
    // Varsayılan tema (App.js'den gelmezse patlamasın diye)
    const safeTheme = activeTheme || { id: 'rose', hex: '#e11d48', name: 'Rose' };
    
    // Aktif Sekme State'i (Caffeine sayfasındaki gibi)
    const [activeSection, setActiveSection] = useState('mechanism');

    // İçerik Verisi
    const content = {
        tr: {
            title: "Pancar Suyu & Nitrat",
            subtitle: "Damar Genişlemesinden Hücresel Yakıt Tasarrufuna",
            desc: "Pancar suyu (Nitrat), 2025 şemsiye analizlerine göre sadece kan akışını değil, kasın kasılma gücünü ve oksijen verimliliğini de artıran kanıtlanmış bir ergojenik destektir.",
            tabs: [
                { id: 'mechanism', label: 'Nasıl Çalışır?', icon: NitrateIcons.Mitochondria },
                { id: 'performance', label: 'Performans', icon: NitrateIcons.Muscle },
                { id: 'protocol', label: 'Protokol', icon: NitrateIcons.Clock },
                { id: 'summary', label: 'Özet Tablo', icon: NitrateIcons.Chart }
            ],
            sections: {
                mechanism: {
                    title: "İki Yönlü Mekanizma",
                    cards: [
                        {
                            title: "1. Klasik Yol: Damar Açma",
                            desc: "Nitrat (NO3) → Nitrit (NO2) → Nitrik Oksit (NO) döngüsü. Damarları genişleterek kaslara giden kan akışını artırır. Bu, yıllardır bilinen etkidir.",
                            tag: "Hemodinamik"
                        },
                        {
                            title: "2. Yeni Keşif: Hücresel Yakıt",
                            desc: "Mitokondrideki 'proton sızıntısını' azaltarak aynı işi %3-5 daha az oksijenle yapmanızı sağlar. Ayrıca kas içindeki Kalsiyum (Ca+) yönetimini iyileştirerek patlayıcı gücü destekler.",
                            tag: "Metabolik & Kas"
                        }
                    ]
                },
                performance: {
                    title: "Branşa Göre Faydalar",
                    cards: [
                        {
                            title: "Hyrox & CrossFit",
                            desc: "Patlayıcı başlangıçlar (Sled Push) ve kas dayanıklılığı (Wall Ball) için kritiktir. Zirve güce ulaşma süresini kısaltır.",
                            icon: NitrateIcons.Muscle
                        },
                        {
                            title: "Koşu (5K - 21K)",
                            desc: "Running Economy (Koşu Ekonomisi) artışı sağlar. Yarış temposunda nabzı ve oksijen maliyetini %3-5 düşürür.",
                            icon: NitrateIcons.Run
                        },
                        {
                            title: "Ultra & Doğa",
                            desc: "Yokuş yukarı yürüyüşlerde %12'ye varan enerji tasarrufu sağlar. Ancak çok yüksek irtifada (4500m+) etkisi azalabilir.",
                            icon: NitrateIcons.Beet
                        },
                        {
                            title: "Takım Sporları",
                            desc: "Yo-Yo testlerinde %14'e varan mesafe artışı sağlar. Dur-kalk eforlarında toparlanmayı hızlandırır.",
                            icon: NitrateIcons.Chart
                        }
                    ]
                },
                protocol: {
                    title: "Kullanım Rehberi",
                    items: [
                        { title: "Dozaj", val: "400-500mg (6-9 mmol)", desc: "Ürün etiketine bakın. Çift doz ekstra fayda sağlamaz (Plato etkisi)." },
                        { title: "Zamanlama", val: "2.5 - 3 Saat Önce", desc: "Plazma nitrit seviyesi bu sürede zirve yapar. Antrenmandan hemen önce içmeyin." },
                        { title: "Yükleme", val: "3-7 Gün", desc: "Yarış haftası her gün 1 doz + Yarış sabahı 1 doz en iyi sonucu verir." }
                    ],
                    warning: {
                        title: "Kritik Hata: Gargara Yapma!",
                        desc: "Nitratın nitrite dönüşmesi için ağız bakterilerine ihtiyaç vardır. Listerine gibi güçlü gargaralar bakterileri öldürür ve takviyeyi etkisiz kılar."
                    }
                },
                summary: {
                    title: "Özet & Beklentiler",
                    rows: [
                        { label: "Kas Dayanıklılığı", val: "⭐⭐⭐⭐⭐", desc: "Çok Güçlü Kanıt" },
                        { label: "Tükenme Süresi (TTE)", val: "⭐⭐⭐⭐", desc: "Güçlü Kanıt (>3 gün kullanımda)" },
                        { label: "Koşu Ekonomisi", val: "⭐⭐⭐⭐", desc: "Güçlü Kanıt (%3-5 Tasarruf)" },
                        { label: "Patlayıcı Güç", val: "⭐⭐⭐", desc: "Orta/İyi Kanıt (Hızlanma)" },
                        { label: "Antrenman Adaptasyonu", val: "⭐", desc: "Zayıf Kanıt (Sadece yarış günü içindir)" }
                    ]
                }
            },
            references: "Referanslar: Jones AM (2014), Poon ETC (2025 Umbrella Review), Lansley KE (2011), Bailey SJ (2009)."
        },
        en: {
            title: "Beetroot Juice & Nitrate",
            subtitle: "From Vasodilation to Cellular Fuel Optimization",
            desc: "According to 2025 umbrella reviews, Nitrate is a proven ergogenic aid that enhances not only blood flow but also muscle contractile power and oxygen efficiency.",
            tabs: [
                { id: 'mechanism', label: 'Mechanism', icon: NitrateIcons.Mitochondria },
                { id: 'performance', label: 'Performance', icon: NitrateIcons.Muscle },
                { id: 'protocol', label: 'Protocol', icon: NitrateIcons.Clock },
                { id: 'summary', label: 'Summary', icon: NitrateIcons.Chart }
            ],
            sections: {
                mechanism: {
                    title: "Dual Mechanism",
                    cards: [
                        {
                            title: "1. Classic: Vasodilation",
                            desc: "Nitrate → Nitrite → Nitric Oxide cycle. Dilates blood vessels increasing blood flow to muscles. This is the well-known effect.",
                            tag: "Hemodynamic"
                        },
                        {
                            title: "2. New: Cellular Fuel",
                            desc: "Reduces 'proton leak' in mitochondria, allowing the same work with 3-5% less oxygen. Also improves Calcium (Ca+) handling for explosive power.",
                            tag: "Metabolic & Muscle"
                        }
                    ]
                },
                performance: {
                    title: "Benefits by Sport",
                    cards: [
                        {
                            title: "Hyrox & CrossFit",
                            desc: "Critical for explosive starts (Sled Push) and muscle endurance (Wall Ball). Reduces time to reach peak power.",
                            icon: NitrateIcons.Muscle
                        },
                        {
                            title: "Running (5K - 21K)",
                            desc: "Increases Running Economy. Reduces heart rate and oxygen cost by 3-5% at race pace.",
                            icon: NitrateIcons.Run
                        },
                        {
                            title: "Ultra & Trail",
                            desc: "Up to 12% energy savings in uphill walking. However, effect may diminish at very high altitudes (4500m+).",
                            icon: NitrateIcons.Beet
                        },
                        {
                            title: "Team Sports",
                            desc: "Up to 14% distance increase in Yo-Yo tests. Accelerates recovery during intermittent efforts.",
                            icon: NitrateIcons.Chart
                        }
                    ]
                },
                protocol: {
                    title: "Usage Guide",
                    items: [
                        { title: "Dosage", val: "400-500mg (6-9 mmol)", desc: "Check the label. Double dose does not provide extra benefit (Plateau effect)." },
                        { title: "Timing", val: "2.5 - 3 Hours Before", desc: "Plasma nitrite peaks at this time. Do not drink immediately before exercise." },
                        { title: "Loading", val: "3-7 Days", desc: "1 dose daily during race week + 1 dose on race morning gives best results." }
                    ],
                    warning: {
                        title: "Critical Error: No Mouthwash!",
                        desc: "Oral bacteria are needed to convert nitrate to nitrite. Strong mouthwashes kill these bacteria and render the supplement useless."
                    }
                },
                summary: {
                    title: "Summary & Expectations",
                    rows: [
                        { label: "Muscle Endurance", val: "⭐⭐⭐⭐⭐", desc: "Very Strong Evidence" },
                        { label: "Time to Exhaustion", val: "⭐⭐⭐⭐", desc: "Strong Evidence (>3 days use)" },
                        { label: "Running Economy", val: "⭐⭐⭐⭐", desc: "Strong Evidence (3-5% Saving)" },
                        { label: "Explosive Power", val: "⭐⭐⭐", desc: "Moderate/Good Evidence" },
                        { label: "Training Adaptation", val: "⭐", desc: "Weak Evidence (Race day fuel)" }
                    ]
                }
            },
            references: "References: Jones AM (2014), Poon ETC (2025 Umbrella Review), Lansley KE (2011), Bailey SJ (2009)."
        }
    };

    const t = content[lang] || content.tr;

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
            
            {/* HEADER - Caffeine sayfasıyla aynı stil */}
            <header className="bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden shadow-2xl text-center">
                <div 
                    className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    style={{ backgroundColor: safeTheme.hex }}
                ></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="p-4 rounded-full bg-slate-700/50 mb-6 ring-1 ring-white/10 shadow-xl" style={{ color: safeTheme.hex }}>
                        <NitrateIcons.Beet size={48} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        {t.title}
                    </h1>
                    <p className="text-xl font-medium mb-6" style={{ color: safeTheme.hex }}>
                        {t.subtitle}
                    </p>
                    <p className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed">
                        {t.desc}
                    </p>
                </div>
            </header>

            {/* GRID MENU - Kullanıcının özellikle istediği kısım */}
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 group relative overflow-hidden ${
                            activeSection === tab.id 
                            ? 'bg-slate-800 border-t-4 shadow-lg' 
                            : 'bg-slate-800/50 border-slate-700 hover:bg-slate-700'
                        }`}
                        style={{ 
                            borderColor: activeSection === tab.id ? safeTheme.hex : '',
                            borderTopColor: activeSection === tab.id ? safeTheme.hex : 'transparent' 
                        }}
                    >
                        <div className={`transition-transform duration-300 ${activeSection === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} style={{ color: activeSection === tab.id ? safeTheme.hex : '#94a3b8' }}>
                            <tab.icon size={28} />
                        </div>
                        <span className={`font-bold text-sm md:text-base ${activeSection === tab.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                            {tab.label}
                        </span>
                    </button>
                ))}
            </nav>

            {/* DYNAMIC CONTENT AREA */}
            <div className="min-h-[400px]">
                
                {/* 1. MEKANİZMA */}
                {activeSection === 'mechanism' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="grid md:grid-cols-2 gap-6">
                            {t.sections.mechanism.cards.map((card, idx) => (
                                <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-slate-500 transition-colors shadow-lg relative group">
                                    <div className="absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold bg-slate-900 border border-slate-700 text-slate-400">
                                        {card.tag}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                        <NitrateIcons.Mitochondria size={20} style={{ color: safeTheme.hex }} />
                                        {card.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        {card.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {/* Görselleştirme: Zamanlama Grafiği */}
                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
                                <NitrateIcons.Clock size={16} /> Nitrit Plazma Seviyesi (Akut Alım)
                            </h4>
                            <div className="relative h-32 flex items-end justify-between px-2 gap-2">
                                {[10, 30, 60, 100, 90, 60, 30].map((h, i) => (
                                    <div key={i} className="w-full flex flex-col items-center gap-2 group">
                                        <div 
                                            className="w-full rounded-t-md transition-all duration-500 hover:opacity-80 relative"
                                            style={{ height: `${h}%`, backgroundColor: h === 100 ? safeTheme.hex : '#334155' }}
                                        >
                                            {h === 100 && (
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                                    PİK (2.5-3sa)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
                                <span>0dk</span>
                                <span>30dk</span>
                                <span>1s</span>
                                <span style={{ color: safeTheme.hex, fontWeight: 'bold' }}>2.5s</span>
                                <span>3s</span>
                                <span>4s</span>
                                <span>6s</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. PERFORMANS */}
                {activeSection === 'performance' && (
                    <div className="grid md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        {t.sections.performance.cards.map((card, idx) => (
                            <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-slate-900 group-hover:bg-slate-700 transition-colors" style={{ color: safeTheme.hex }}>
                                        <card.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. PROTOKOL */}
                {activeSection === 'protocol' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="grid md:grid-cols-3 gap-4">
                            {t.sections.protocol.items.map((item, idx) => (
                                <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: safeTheme.hex }}></div>
                                    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{item.title}</h4>
                                    <div className="text-xl font-black text-white mb-2">{item.val}</div>
                                    <p className="text-xs text-slate-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        {/* Uyarı Kutusu */}
                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-start gap-4">
                            <div className="text-red-500 shrink-0 mt-1">
                                <NitrateIcons.Warning size={32} />
                            </div>
                            <div>
                                <h3 className="text-red-400 font-bold text-lg mb-1">{t.sections.protocol.warning.title}</h3>
                                <p className="text-red-300/80 text-sm leading-relaxed">{t.sections.protocol.warning.desc}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. ÖZET */}
                {activeSection === 'summary' && (
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="p-4 bg-slate-900/50 border-b border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold text-white">{t.sections.summary.title}</h3>
                            <NitrateIcons.Chart size={20} className="text-slate-500" />
                        </div>
                        <div className="divide-y divide-slate-700">
                            {t.sections.summary.rows.map((row, idx) => (
                                <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-700/30 transition-colors">
                                    <span className="text-slate-300 font-medium text-sm">{row.label}</span>
                                    <div className="text-right">
                                        <div className="text-xs tracking-widest text-yellow-500 mb-1">{row.val}</div>
                                        <div className="text-xs text-slate-500 font-mono">{row.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* FOOTER */}
            <div className="mt-12 pt-6 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-600 font-mono">
                    {t.references}
                </p>
            </div>
        </div>
    );
};

// Global scope
window.BeetrootNitratePage = BeetrootNitratePage;
