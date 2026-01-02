const { useState, useEffect } = React;

// --- ICONS ---
const IconWrapper = ({ children, size = 24, className = "", style = {} }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        {children}
    </svg>
);

const NitrateIcons = {
    // Custom Beetroot SVG from request
    BeetFull: ({ size = 56, style }) => (
        <svg width={size} height={size} viewBox="0 0 512 512" fill="currentColor" style={style} xmlns="http://www.w3.org/2000/svg">
            <g><path d="M342.355,156.256c-19.234-8.681-38.352-13.602-53.684-16.399L321.788,9.525l-30.381-7.72l-19.733,77.66V0h-31.347v79.247L220.617,1.68L190.236,9.4l33.041,130.033c-15.317,2.608-34.368,7.308-53.534,15.803c-40.706,18.04-89.23,56.673-89.23,138.273c0,85.621,64.183,133.466,111.047,168.401c25.081,18.695,48.769,36.354,48.769,50.089h31.347c0-13.735,23.688-31.394,48.767-50.089c46.865-34.935,111.047-82.781,111.047-168.401C431.488,230.034,400.667,182.573,342.355,156.256z M301.706,436.779c-17.812,13.279-34.309,25.576-45.706,38.732c-11.396-13.156-27.894-25.454-45.706-38.732c-46.14-34.395-98.436-73.379-98.436-143.269c0-51.67,23.476-88.429,69.775-109.253c35.305-15.88,71.594-16.685,74.24-16.722c2.675,0.08,39.011,1.467,74.381,17.656c46.373,21.224,69.886,57.668,69.886,108.32C400.141,363.4,347.845,402.384,301.706,436.779z"/><path d="M183.005,249.785l-0.091,0.083l-21.011-23.262c-1.605,1.449-39.138,36.139-25.637,92.599l30.488-7.291C157.677,273.953,181.967,250.754,183.005,249.785z"/></g>
        </svg>
    ),
    Mitochondria: (p) => <IconWrapper {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></IconWrapper>,
    Muscle: (p) => <IconWrapper {...p}><path d="M6.5 6.5l5 5" /><path d="M17.5 17.5l-5-5" /><path d="M21 21l-3-3" /><path d="M3 3l3 3" /><circle cx="12" cy="12" r="3" /></IconWrapper>,
    Clock: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></IconWrapper>,
    Warning: (p) => <IconWrapper {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></IconWrapper>,
    Run: (p) => <IconWrapper {...p}><path d="M4 16l4-1 2-6-3-2" /><path d="M13 8l3 3-3 3" /><path d="M16 5h4" /><circle cx="14" cy="4" r="2" /></IconWrapper>,
    Chart: (p) => <IconWrapper {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></IconWrapper>,
    Check: (p) => <IconWrapper {...p}><polyline points="20 6 9 17 4 12"/></IconWrapper>,
    Flask: (p) => <IconWrapper {...p}><path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/></IconWrapper>,
    Book: (p) => <IconWrapper {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></IconWrapper>,
    ChevronDown: (p) => <IconWrapper {...p}><polyline points="6 9 12 15 18 9" /></IconWrapper>,
    ArrowUp: (p) => <IconWrapper {...p}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></IconWrapper>
};

const BeetrootNitratePage = ({ lang = 'tr', activeTheme }) => {
    // Default fallback theme if not provided
    const theme = activeTheme || { id: 'rose', hex: '#e11d48', name: 'Rose' };
    const [activeTab, setActiveTab] = useState('mechanism');
    const [showReferences, setShowReferences] = useState(false);

    // --- CONTENT DATA ---
    const content = {
        tr: {
            header: {
                title: "Pancar Suyu ve Nitrat",
                subtitle: "Damar Genişlemesinden Hücresel Yakıt Tasarrufuna",
                desc: "Nitrat, sadece \"damar açıcı\" değil, aynı zamanda mitokondriyal verimlilik ve kas gücü üzerinde de etkili bir performans yakıtıdır. Son şemsiye analizler (2025), etkinin özellikle dayanma süresi ve patlayıcı güçte yoğunlaştığını gösteriyor.",
                refs: ["[1]", "[14]"]
            },
            tabs: [
                { id: 'mechanism', label: 'Nasıl Çalışır?', icon: NitrateIcons.Mitochondria },
                { id: 'performance', label: 'Branş Etkisi', icon: NitrateIcons.Chart },
                { id: 'protocol', label: 'Protokol & Doz', icon: NitrateIcons.Flask },
                { id: 'summary', label: 'Özet Tablo', icon: NitrateIcons.Check }
            ],
            mechanism: {
                card1: {
                    badge: "Klasik Yol",
                    title: "Damar Açma & Kan Akışı",
                    desc: "Ağız bakterileri, alınan Nitratı (NO3-) Nitrite (NO2-) çevirir. Mide asidi ve egzersiz hipoksisinde bu, Nitrik Oksite (NO) dönüşerek damarları genişletir (vazodilatasyon).",
                    ref: "[1]"
                },
                card2: {
                    badge: "Yeni Keşif",
                    title: "Verimlilik & Kas Ateşleme",
                    desc: "Nitrat sadece yolu açmaz, motoru da etkileyebilir. Mitokondriyal \"proton sızıntısını\" azaltmaya katkıda bulunarak oksijen tasarrufu sağlayabilir. Ayrıca kas kontraktil özelliklerini etkileyebilir; olası mekanizmalardan biri Ca2+ yönetimidir.",
                    ref: "[1][2][3][9][14]"
                },
                graph: {
                    title: "Running Economy (Koşu Ekonomisi)",
                    subtitle: "Aynı hızda koşarken vücudun harcadığı oksijen miktarı. Nitrat, \"aynı işi daha az yakıtla\" yapmanıza yardımcı olabilir.",
                    val: "%3 - 5",
                    label: "Oksijen Tasarrufu",
                    ref: "[2][3]",
                    bar1: "Normal (Placebo)",
                    bar1Sub: "Standart Oksijen Tüketimi",
                    bar2: "Nitrat Sonrası",
                    bar2Sub: "Daha Verimli Yakıt Kullanımı",
                    example: "(Temsili Örnek)"
                }
            },
            performance: [
                {
                    title: "Dayanma Süresi (TTE)",
                    desc: "\"Tükenene kadar git\" testleri (Open-loop) en tutarlı alanlardan biridir. Yükleme yapıldığında tükenme süresi ve toplam mesafe artışı daha belirgindir (SMD ~0.33).",
                    icon: NitrateIcons.Clock,
                    ref: "[14]"
                },
                {
                    title: "Dur-Kalk (Intermittent)",
                    desc: "Takım sporları ve HIIT için ortalama güç ve zirve güce ulaşma süresinde bazı çalışmalarda küçük ama anlamlı iyileşmeler raporlanmıştır.",
                    icon: NitrateIcons.Run,
                    ref: "[10]"
                },
                {
                    title: "Patlayıcı Güç (<6sn)",
                    desc: "Sprint ve ani güç üretiminde Peak Power Output (PPO) artışı görülebilir. Bu etkinin Tip II (hızlı kasılan) kas lifleri üzerinde daha belirgin olması olasıdır.",
                    icon: NitrateIcons.Muscle,
                    ref: "[9]"
                },
                {
                    title: "Zamana Karşı (TT)",
                    desc: "Time-Trial sonuçları TTE kadar tutarlı değildir; test formatı, sporcunun seviyesi ve dozlama stratejileri nedeniyle sonuçlar değişkendir.",
                    icon: NitrateIcons.Chart,
                    ref: "[14]"
                }
            ],
            protocol: {
                dose: {
                    title: "Dozaj",
                    val: "6-9 mmol",
                    subVal: "(~370-560mg)",
                    desc: "Ürün içerikleri değişkendir, standart (etiketli) nitrat tercih edilmelidir. Dozu iki katına çıkarmak plato etkisi yaratabilir.",
                    ref: "[4]"
                },
                time: {
                    title: "Zamanlama",
                    val: "2.5 - 3 Saat Önce",
                    desc: "Akut alımda plazma nitrit seviyesi bu aralıkta pik yapar. Antiseptik ürün kullanımından kaçınılmalıdır.",
                    ref: "[1][4]"
                },
                load: {
                    title: "Kritik Eşik",
                    val: "TTE İçin Yükleme",
                    desc: "Dayanıklılık (TTE) hedefleniyorsa ≥6 mmol/gün dozunda ve >3 gün yükleme yapmak daha tutarlı sonuç verir.",
                    ref: "[14]"
                },
                warnings: {
                    hygiene: {
                        title: "Ağız Hijyeni Uyarısı",
                        desc: "Nitratın nitrite dönüşümü için ağız bakterileri şarttır. Sadece gargara değil, güçlü antibakteriyel diş macunları veya sakızlar da bu döngüyü bozarak takviyeyi etkisiz kılabilir.",
                        ref: "[1]"
                    },
                    elite: {
                        title: "Kimler Daha Az Yanıt Verir?",
                        desc: "Çok yüksek kondisyonlu (Elit/VO2max yüksek) sporcularda bazal NO seviyesi zaten optimize olduğu için etki daha az görülebilir.",
                        note: "*Not: İdrar/dışkı renginin kırmızıya dönmesi (beeturia) zararsız ve yaygın bir durumdur. Nadiren mide hassasiyeti yapabilir.",
                        ref: "[14]"
                    }
                }
            },
            summary: {
                title: "Saha Özeti & Kanıt Gücü",
                subtitle: "Umbrella Review 2025",
                ref: "[14]",
                cards: [
                    {
                        title: "Tükenme Testleri (TTE)",
                        desc: "\"Tükenene kadar git\" (Open-loop) testlerinde süre uzaması ve mesafe artışı en net görülen etkidir.",
                        tag: "En Tutarlı Alan",
                        strategy: "Strateji: 3-7 Gün Yükleme",
                        stars: 5,
                        icon: NitrateIcons.Clock
                    },
                    {
                        title: "Ekonomi (Oksijen Maliyeti)",
                        desc: "Aynı tempoda koşarken/pedallarken daha az oksijen tüketimi sağlar.",
                        tag: "Güçlü (%3-5)",
                        strategy: "Strateji: Akut veya Yükleme",
                        stars: 4,
                        icon: NitrateIcons.Mitochondria
                    },
                    {
                        title: "Patlayıcı Güç & Sprint",
                        desc: "Zirve güce (PPO) ulaşma süresinde ve tekrarlı sprint performansında artış.",
                        tag: "Güçlü Kanıt",
                        strategy: "Strateji: Akut Kullanım",
                        stars: 4,
                        icon: NitrateIcons.Muscle
                    },
                    {
                        title: "Antrenman Adaptasyonu",
                        desc: "Uzun vadeli kullanımın kas gelişimine ekstra katkısı zayıftır. Performans günü yakıtıdır.",
                        tag: "Zayıf/Etkisiz",
                        strategy: "Strateji: Kronik (Etkisiz)",
                        stars: 1,
                        icon: NitrateIcons.Warning
                    }
                ]
            },
            refsTitle: "Kaynakça",
            showList: "Listeyi Göster",
            hideList: "Listeyi Gizle"
        },
        en: {
            header: {
                title: "Beetroot Juice & Nitrate",
                subtitle: "From Vasodilation to Cellular Fuel Optimization",
                desc: "Nitrate is not just a \"vasodilator\" but also a performance fuel affecting mitochondrial efficiency and muscle power. Recent umbrella reviews (2025) show the effect is concentrated especially on time to exhaustion and explosive power.",
                refs: ["[1]", "[14]"]
            },
            tabs: [
                { id: 'mechanism', label: 'Mechanism', icon: NitrateIcons.Mitochondria },
                { id: 'performance', label: 'Sport Impact', icon: NitrateIcons.Chart },
                { id: 'protocol', label: 'Protocol & Dose', icon: NitrateIcons.Flask },
                { id: 'summary', label: 'Summary Table', icon: NitrateIcons.Check }
            ],
            mechanism: {
                card1: {
                    badge: "Classic Pathway",
                    title: "Vasodilation & Blood Flow",
                    desc: "Oral bacteria convert ingested Nitrate (NO3-) to Nitrite (NO2-). In stomach acid and exercise hypoxia, this converts to Nitric Oxide (NO), dilating blood vessels.",
                    ref: "[1]"
                },
                card2: {
                    badge: "New Discovery",
                    title: "Efficiency & Muscle Firing",
                    desc: "Nitrate affects not just the road but the engine. It may help reduce mitochondrial \"proton leak,\" saving oxygen. It may also affect muscle contractile properties; Ca2+ handling is a proposed mechanism.",
                    ref: "[1][2][3][9][14]"
                },
                graph: {
                    title: "Running Economy",
                    subtitle: "Oxygen cost at a fixed speed. Nitrate may help you do \"the same work with less fuel.\"",
                    val: "3 - 5%",
                    label: "Oxygen Saving",
                    ref: "[2][3]",
                    bar1: "Normal (Placebo)",
                    bar1Sub: "Standard Oxygen Cost",
                    bar2: "After Nitrate",
                    bar2Sub: "More Efficient Fuel Use",
                    example: "(Representative Example)"
                }
            },
            performance: [
                {
                    title: "Time to Exhaustion (TTE)",
                    desc: "\"Run until failure\" tests (Open-loop) are among the most consistent areas. Time to exhaustion and total distance increase is more pronounced with loading (SMD ~0.33).",
                    icon: NitrateIcons.Clock,
                    ref: "[14]"
                },
                {
                    title: "Intermittent",
                    desc: "Small but significant improvements in mean power and time to peak power have been reported in some studies for team sports and HIIT.",
                    icon: NitrateIcons.Run,
                    ref: "[10]"
                },
                {
                    title: "Explosive Power (<6s)",
                    desc: "Peak Power Output (PPO) increase may be seen in sprints. This effect is likely more pronounced on Type II (fast-twitch) muscle fibers.",
                    icon: NitrateIcons.Muscle,
                    ref: "[9]"
                },
                {
                    title: "Time Trial (TT)",
                    desc: "Time-Trial results are less consistent than TTE; outcomes vary due to test format, athlete level, and dosing strategies.",
                    icon: NitrateIcons.Chart,
                    ref: "[14]"
                }
            ],
            protocol: {
                dose: {
                    title: "Dosage",
                    val: "6-9 mmol",
                    subVal: "(~370-560mg)",
                    desc: "Product contents vary, standard (labeled) nitrate is preferred. Doubling the dose may cause a plateau effect.",
                    ref: "[4]"
                },
                time: {
                    title: "Timing",
                    val: "2.5 - 3 Hours Before",
                    desc: "Plasma nitrite peaks in this window for acute intake. Antiseptic products should be avoided.",
                    ref: "[1][4]"
                },
                load: {
                    title: "Critical Threshold",
                    val: "Loading for TTE",
                    desc: "If targeting endurance (TTE), loading at ≥6 mmol/day for >3 days yields more consistent results.",
                    ref: "[14]"
                },
                warnings: {
                    hygiene: {
                        title: "Oral Hygiene Warning",
                        desc: "Oral bacteria are essential for nitrate conversion. Strong antibacterial mouthwashes, toothpaste, or gum can disrupt this cycle and nullify the supplement.",
                        ref: "[1]"
                    },
                    elite: {
                        title: "Who Responds Less?",
                        desc: "Highly trained (Elite/High VO2max) athletes may see less effect as their basal NO levels are already optimized.",
                        note: "*Note: Red urine/stool (beeturia) is harmless and common. Mild GI discomfort may occur rarely.",
                        ref: "[14]"
                    }
                }
            },
            summary: {
                title: "Field Summary & Evidence Strength",
                subtitle: "Umbrella Review 2025",
                ref: "[14]",
                cards: [
                    {
                        title: "Time to Exhaustion (TTE)",
                        desc: "Extended duration and distance in open-loop tests is the clearest effect.",
                        tag: "Most Consistent",
                        strategy: "Strategy: 3-7 Day Loading",
                        stars: 5,
                        icon: NitrateIcons.Clock
                    },
                    {
                        title: "Economy (Oxygen Cost)",
                        desc: "Consumes less oxygen at the same running/cycling pace.",
                        tag: "Strong (3-5%)",
                        strategy: "Strategy: Acute or Loading",
                        stars: 4,
                        icon: NitrateIcons.Mitochondria
                    },
                    {
                        title: "Explosive Power & Sprint",
                        desc: "Increase in time to reach Peak Power Output (PPO) and repeated sprint performance.",
                        tag: "Strong Evidence",
                        strategy: "Strategy: Acute Use",
                        stars: 4,
                        icon: NitrateIcons.Muscle
                    },
                    {
                        title: "Training Adaptation",
                        desc: "Chronic use has weak evidence for extra muscle adaptation. It is a 'performance day' fuel.",
                        tag: "Weak/Ineffective",
                        strategy: "Strategy: Chronic (Ineffective)",
                        stars: 1,
                        icon: NitrateIcons.Warning
                    }
                ]
            },
            refsTitle: "References",
            showList: "Show List",
            hideList: "Hide List"
        }
    };

    const references = [
        "Jones AM. Dietary nitrate supplementation and exercise performance. Sports Med. 2014;44(Suppl 1):S35–S45.",
        "Bailey SJ, et al. Dietary nitrate supplementation reduces the O2 cost of low-intensity exercise. J Appl Physiol (1985). 2009;107:1144–1155.",
        "Lansley KE, et al. Dietary nitrate supplementation reduces the O2 cost of walking and running. J Appl Physiol (1985). 2011;110:591–600.",
        "Wylie LJ, et al. Beetroot juice and exercise: pharmacodynamic and dose-response relationships. J Appl Physiol (1985). 2013;115(3):325–336.",
        "Larsen FJ, et al. Effects of dietary nitrate on oxygen cost during exercise. Acta Physiol (Oxf). 2007;191:59–66.",
        "Hennis PJ, et al. Dietary nitrate supplementation does not alter exercise efficiency at high altitude. Front Physiol. 2022;13:827235.",
        "Esen O, Domínguez R, Karayigit R. Acute beetroot juice supplementation enhances intermittent running performance. Nutrients. 2022;14:2839.",
        "Tan R, et al. The effects of dietary nitrate supplementation on explosive exercise performance: a systematic review. Int J Environ Res Public Health. 2022;19:762.",
        "Esen O, Dobbin N, Callaghan MJ. The effect of dietary nitrate on the contractile properties of human skeletal muscle. J Am Nutr Assoc. 2023;42(4):327–338.",
        "Alsharif NS, et al. Effects of dietary nitrate supplementation on performance during single and repeated bouts of short-duration high-intensity exercise. Antioxidants. 2023;12:1194.",
        "Hogwood AC, et al. Limited effects of inorganic nitrate supplementation on exercise training responses. Sports Med Open. 2023;9:84.",
        "Jędrejko M, et al. Exploring the impact of alternative sources of dietary nitrate supplementation on exercise performance. Int J Mol Sci. 2024;25:3650.",
        "Kavcı Z, et al. Investigation of the effect of nitrate and L-arginine intake on aerobic, anaerobic performance, balance, agility, and recovery in elite taekwondo athletes. J Int Soc Sports Nutr. 2025;22(1):2445609.",
        "Poon ETC, et al. Dietary nitrate supplementation and exercise performance: an umbrella review of 20 published systematic reviews with meta-analyses. Sports Med. 2025;55:1213–1231."
    ];

    const t = content[lang] || content.tr;

    // Helper for chemical subscript
    const ChemicalText = ({ text }) => {
        if (!text) return null;
        // Simple replace for common chemicals mentioned
        const parts = text.split(/(NO3-|NO2-|Ca2+|NO)/g);
        return (
            <>
                {parts.map((part, i) => {
                    if (part === 'NO3-') return <span key={i}>NO<sub>3</sub><sup>-</sup></span>;
                    if (part === 'NO2-') return <span key={i}>NO<sub>2</sub><sup>-</sup></span>;
                    if (part === 'Ca2+') return <span key={i}>Ca<sup>2+</sup></span>;
                    return <span key={i}>{part}</span>;
                })}
            </>
        );
    };

    // Helper for References
    const RefText = ({ text }) => {
        if (!text) return null;
        const regex = /(\[\d+(?:,\d+)*\])/g;
        const parts = text.split(regex);
        return (
            <>
                {parts.map((part, i) => {
                    if (regex.test(part)) {
                        return <sup key={i} className="text-[0.7em] ml-[1px] opacity-70 hover:opacity-100 transition-opacity cursor-help" style={{ color: theme.hex }}>{part}</sup>;
                    }
                    return <span key={i}>{part}</span>;
                })}
            </>
        );
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-500">
            
            {/* 1. HEADER AREA */}
            <header className="relative bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 overflow-hidden shadow-2xl mb-8 text-center">
                {/* Background Glow */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: theme.hex }}
                ></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="p-4 rounded-2xl bg-slate-900/80 mb-6 ring-1 ring-white/10 shadow-lg hover:scale-110 transition-transform duration-300" style={{ color: theme.hex }}>
                        <NitrateIcons.BeetFull size={56} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                        {t.header.title}
                    </h1>
                    <p className="text-lg md:text-xl font-medium mb-6" style={{ color: theme.hex }}>
                        {t.header.subtitle}
                    </p>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
                        <RefText text={t.header.desc + " " + t.header.refs.join('')} />
                    </p>
                </div>
            </header>

            {/* 2. NAVIGATION TABS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {t.tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const TabIcon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 relative overflow-hidden group ${
                                isActive ? 'bg-slate-800 shadow-lg' : 'bg-slate-800/40 border-slate-700 hover:bg-slate-700/60'
                            }`}
                            style={{ 
                                borderColor: isActive ? theme.hex : ''
                            }}
                        >
                            {isActive && (
                                <div className="absolute top-0 left-0 w-full h-1 transition-opacity duration-300" style={{ backgroundColor: theme.hex }} />
                            )}
                            <div 
                                className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                                style={{ color: isActive ? theme.hex : '#94a3b8' }}
                            >
                                <TabIcon size={26} />
                            </div>
                            <span className={`font-bold text-sm transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* 3. CONTENT AREA */}
            <div className="min-h-[400px]">

                {/* --- MECHANISM TAB --- */}
                {activeTab === 'mechanism' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="grid md:grid-cols-2 gap-6">
                            {[t.mechanism.card1, t.mechanism.card2].map((card, idx) => (
                                <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative hover:border-slate-500 transition-colors group">
                                    <span 
                                        className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-700 uppercase tracking-wider transition-colors group-hover:text-white"
                                        style={{ color: '#94a3b8' }}
                                    >
                                        {card.badge}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-3 mt-2 transition-colors" style={{ color: null /* Reset first */ }}>
                                        <span className="group-hover:text-[color:var(--hover-color)]" style={{ '--hover-color': theme.hex }}>{card.title}</span>
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        <ChemicalText text={card.desc} /> <RefText text={card.ref} />
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* GRAPH: Oxygen Cost */}
                        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                <div>
                                    <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                        <NitrateIcons.Mitochondria size={20} style={{ color: theme.hex }} />
                                        {t.mechanism.graph.title}
                                    </h4>
                                    <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                                        {t.mechanism.graph.subtitle}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-black text-white block mb-1">{t.mechanism.graph.val}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.hex }}>
                                        {t.mechanism.graph.label} <RefText text={t.mechanism.graph.ref} />
                                    </span>
                                </div>
                            </div>
                            
                            {/* Bars */}
                            <div className="relative h-40 flex items-center gap-4">
                                {/* Placebo */}
                                <div className="h-full flex-1 flex flex-col justify-center gap-3">
                                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                                        <span>{t.mechanism.graph.bar1}</span>
                                        <span>100</span>
                                    </div>
                                    <div className="w-full h-12 bg-slate-700 rounded-lg relative overflow-hidden">
                                        {/* Pattern for Placebo */}
                                        <div className="absolute inset-0 bg-slate-600/30" style={{ backgroundImage: 'linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.1) 50%,rgba(0,0,0,.1) 75%,transparent 75%,transparent)', backgroundSize: '10px 10px' }}></div>
                                    </div>
                                    <p className="text-[10px] text-slate-500">{t.mechanism.graph.bar1Sub}</p>
                                </div>

                                {/* Arrow */}
                                <div className="flex flex-col items-center justify-center animate-pulse text-emerald-500">
                                    <NitrateIcons.ArrowUp size={24} className="rotate-180" />
                                </div>

                                {/* Nitrate */}
                                <div className="h-full flex-1 flex flex-col justify-center gap-3">
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1" style={{ color: theme.hex }}>
                                        <span>{t.mechanism.graph.bar2}</span>
                                        <span>~96 <span className="opacity-50 font-normal normal-case">{t.mechanism.graph.example}</span></span>
                                    </div>
                                    <div className="w-full h-12 bg-slate-800 rounded-lg relative overflow-hidden border" style={{ borderColor: `${theme.hex}4D` }}>
                                        <div 
                                            className="absolute top-0 left-0 h-full animate-[grow-bar_1s_ease-out_forwards]" 
                                            style={{ width: '96%', backgroundColor: theme.hex }}
                                        ></div>
                                    </div>
                                    <p className="text-[10px] font-medium" style={{ color: theme.hex }}>{t.mechanism.graph.bar2Sub}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PERFORMANCE TAB --- */}
                {activeTab === 'performance' && (
                    <div className="grid md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        {t.performance.map((card, idx) => {
                            const CardIcon = card.icon;
                            return (
                                <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-all group hover:border-slate-500">
                                    <div className="flex items-start gap-4">
                                        <div 
                                            className="p-3 rounded-xl bg-slate-900 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                                            style={{ color: theme.hex }}
                                        >
                                            {/* We handle hover bg color via style prop on parent or specific logic, here just text color */}
                                            <CardIcon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-2 transition-colors group-hover:text-[color:var(--hover-color)]" style={{ '--hover-color': theme.hex }}>
                                                {card.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                <ChemicalText text={card.desc} /> <RefText text={card.ref} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* --- PROTOCOL TAB --- */}
                {activeTab === 'protocol' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="grid md:grid-cols-3 gap-4">
                            {[t.protocol.dose, t.protocol.time, t.protocol.load].map((item, idx) => (
                                <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden group hover:bg-slate-750 transition-colors">
                                    <div className="absolute top-0 left-0 w-full h-1 transition-all duration-500 group-hover:h-1.5" style={{ backgroundColor: theme.hex }}></div>
                                    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">{item.title}</h4>
                                    <div className="text-lg md:text-xl font-black text-white mb-3 transition-colors group-hover:text-[color:var(--hover-color)]" style={{ '--hover-color': theme.hex }}>
                                        {item.val} {item.subVal && <br />}
                                        {item.subVal && <span className="text-sm font-medium text-slate-400">{item.subVal}</span>}
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        <span dangerouslySetInnerHTML={{ __html: item.desc.replace(/standart \(etiketli\) nitrat/, `<strong>standart (etiketli) nitrat</strong>`).replace(/>3 gün/, `<strong>>3 gün</strong>`).replace(/≥6 mmol\/gün/, `<strong>≥6 mmol/gün</strong>`) }} /> 
                                        <RefText text={item.ref} />
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Hygiene Warning */}
                            <div className="border border-red-500/30 bg-red-500/5 p-6 rounded-2xl flex items-start gap-4 hover:bg-red-500/10 transition-colors">
                                <div className="text-red-500 shrink-0 mt-1">
                                    <NitrateIcons.Warning size={24} />
                                </div>
                                <div>
                                    <h4 className="text-red-400 font-bold mb-1">{t.protocol.warnings.hygiene.title}</h4>
                                    <p className="text-red-300/70 text-xs leading-relaxed">
                                        {t.protocol.warnings.hygiene.desc} <RefText text={t.protocol.warnings.hygiene.ref} />
                                    </p>
                                </div>
                            </div>

                            {/* Elite Warning */}
                            <div className="border border-slate-600 bg-slate-800/50 p-6 rounded-2xl flex items-start gap-4 hover:bg-slate-800 transition-colors">
                                <div className="text-slate-400 shrink-0 mt-1">
                                    <NitrateIcons.Book size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">{t.protocol.warnings.elite.title}</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed mb-2">
                                        {t.protocol.warnings.elite.desc} <RefText text={t.protocol.warnings.elite.ref} />
                                    </p>
                                    <p className="text-slate-500 text-[10px] italic">
                                        {t.protocol.warnings.elite.note}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SUMMARY TAB --- */}
                {activeTab === 'summary' && (
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg p-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-white text-lg">{t.summary.title}</h3>
                            <span className="text-xs text-slate-500 font-mono">{t.summary.subtitle} <RefText text={t.summary.ref} /></span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {t.summary.cards.map((card, idx) => {
                                const CardIcon = card.icon;
                                // Determine color based on stars/type logic or default
                                let borderColorClass = "border-slate-700 hover:border-slate-500";
                                let iconBg = "bg-slate-700/50"; 
                                let iconColor = "text-slate-400";
                                let tagColor = "text-slate-500";
                                let starsColor = "text-yellow-500";

                                if (card.stars === 5) {
                                    borderColorClass = "border-slate-700 hover:border-emerald-500/50";
                                    iconBg = "bg-emerald-500/10";
                                    iconColor = "text-emerald-400";
                                    tagColor = "text-emerald-400";
                                } else if (card.stars === 4) {
                                    // Use theme color for strong but not 'perfect' or yellow?
                                    // HTML used yellow for explosive, emerald for economy. Let's adapt based on idx for variety or stick to logic.
                                    if (idx === 2) { // Explosive
                                        borderColorClass = "border-slate-700 hover:border-yellow-500/50";
                                        iconBg = "bg-yellow-500/10";
                                        iconColor = "text-yellow-400";
                                        tagColor = "text-yellow-400";
                                    } else { // Economy
                                        borderColorClass = "border-slate-700 hover:border-emerald-500/50";
                                        iconBg = "bg-emerald-500/10";
                                        iconColor = "text-emerald-400";
                                        tagColor = "text-emerald-400";
                                    }
                                }

                                return (
                                    <div key={idx} className={`bg-slate-900/50 p-5 rounded-xl border ${borderColorClass} transition-all group relative overflow-hidden`}>
                                        <div className={`absolute top-0 left-0 w-1 h-full transition-all group-hover:w-1.5 ${card.stars >= 4 ? (idx === 2 ? 'bg-yellow-500' : 'bg-emerald-500') : 'bg-slate-600'}`}></div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
                                                <CardIcon size={24} />
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${tagColor}`}>{card.tag}</div>
                                                <div className={`flex text-xs justify-end ${starsColor}`}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={i < card.stars ? "opacity-100" : "opacity-30"}>★</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="text-white font-bold mb-2">{card.title}</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[48px]">
                                            {card.desc}
                                        </p>
                                        <span className={`inline-block text-[10px] font-bold uppercase bg-slate-800 px-2 py-1 rounded border border-opacity-20 ${card.stars >= 4 ? (idx === 2 ? 'text-yellow-400/80 border-yellow-500' : 'text-emerald-400/80 border-emerald-500') : 'text-slate-500 border-slate-600'}`}>
                                            {card.strategy}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>

            {/* 4. REFERENCES FOOTER */}
            <div className="mt-16 pt-8 border-t border-slate-800">
                <div 
                    className="flex items-center justify-between mb-6 cursor-pointer group"
                    onClick={() => setShowReferences(!showReferences)}
                >
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 transition-colors group-hover:text-[color:var(--hover-color)]" style={{ '--hover-color': theme.hex }}>
                        <NitrateIcons.Flask size={14} /> {t.refsTitle}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1 transition-colors group-hover:text-[color:var(--hover-color)]" style={{ '--hover-color': theme.hex }}>
                        <span>{showReferences ? t.hideList : t.showList}</span>
                        <NitrateIcons.ChevronDown size={16} className={`transition-transform duration-300 ${showReferences ? 'rotate-180' : ''}`} />
                    </div>
                </div>
                
                {showReferences && (
                    <div className="grid gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
                        {references.map((ref, idx) => (
                            <div key={idx} className="flex gap-3 text-[11px] text-slate-500 font-mono leading-relaxed group hover:text-slate-400">
                                <span className="select-none shrink-0 transition-colors group-hover:text-[color:var(--hover-color)]" style={{ '--hover-color': theme.hex }}>[{idx + 1}]</span>
                                <p>{ref}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

// Global export for App.js
window.BeetrootNitratePage = BeetrootNitratePage;
