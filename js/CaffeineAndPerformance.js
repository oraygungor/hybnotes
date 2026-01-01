const { useState, useEffect, useRef } = React;
// ReactDOM kontrolü
const ReactDOM = window.ReactDOM || null;

// --- ICONS ---
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

const CaffeineIcons = {
    Activity: (p) => <IconWrapper {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></IconWrapper>,
    Battery: (p) => <IconWrapper {...p}><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/></IconWrapper>,
    Zap: (p) => <IconWrapper {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></IconWrapper>,
    Timer: (p) => <IconWrapper {...p}><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></IconWrapper>,
    Flame: (p) => <IconWrapper {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3.3-1.2 1-2.4 2-3.2"/></IconWrapper>,
    Brain: (p) => <IconWrapper {...p}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.97-3.284"/><path d="M17.97 14.716A4 4 0 0 1 16 18"/></IconWrapper>,
    AlertCircle: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></IconWrapper>,
    TrendingUp: (p) => <IconWrapper {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></IconWrapper>,
    Info: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></IconWrapper>,
    ChevronRight: (p) => <IconWrapper {...p}><path d="m9 18 6-6-6-6"/></IconWrapper>,
    Scale: (p) => <IconWrapper {...p}><path d="m16 16 3-8 3 8c-.87.65-1.926 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.926 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></IconWrapper>,
    Globe: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></IconWrapper>,
    HelpCircle: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></IconWrapper>,
    X: (p) => <IconWrapper {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>,
    Languages: (p) => <IconWrapper {...p}><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></IconWrapper>,
    Grid: (p) => <IconWrapper {...p}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></IconWrapper>
};

// --- HELPER COMPONENT: Reference ---
const Ref = ({ ids }) => {
    const sorted = [...ids].sort((a, b) => a - b);
    return (
        <span className="text-xs text-primary/90 font-semibold ml-1 select-none">
            [{sorted.join(', ')}]
        </span>
    );
};

// --- TOOLTIP COMPONENT (HYBRID: MOBILE MODAL / DESKTOP POPOVER) ---
const TermTooltip = ({ term, definition }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);

    // Body Scroll Lock (Sadece Mobilde gerekli ama genel tutabiliriz, masaüstünde şeffaf overlay olacağı için sorun değil)
    useEffect(() => {
        if (!isOpen) return;
        if (typeof document === 'undefined') return;

        // Sadece mobilde scroll lock yapalım (md: breakpoint öncesi)
        // Masaüstünde de popup açıkken scroll edilmesini istemeyebiliriz veya isteyebiliriz.
        // Kullanıcı "tüm ekranı kaplıyor" dediği için masaüstünde scroll açık kalsın daha iyi.
        
        const isMobile = window.innerWidth < 768;
        if (!isMobile) return;

        const scrollY = window.scrollY || 0;
        const prevStyle = {
            position: document.body.style.position,
            top: document.body.style.top,
            width: document.body.style.width,
            overflow: document.body.style.overflow
        };

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.position = prevStyle.position;
            document.body.style.top = prevStyle.top;
            document.body.style.width = prevStyle.width;
            document.body.style.overflow = prevStyle.overflow;
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    const handleOpen = (e) => {
        e.stopPropagation();
        
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Masaüstü için basit hizalama (Butonun altı, ortası)
            setPopoverPos({
                top: rect.bottom + 8, // Butonun biraz altı
                left: rect.left + (rect.width / 2) // Butonun merkezi
            });
        }
        setIsOpen(true);
    };

    const canPortal = 
        !!ReactDOM && 
        typeof ReactDOM.createPortal === 'function' && 
        typeof document !== 'undefined' && 
        !!document.body;

    const tooltipContent = (
        <div 
            className={`
                fixed inset-0 z-[10000] animate-in fade-in
                md:bg-transparent md:pointer-events-auto
                bg-black/60 backdrop-blur-sm flex items-center justify-center p-4
            `}
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
        >
            {/* KUTU YAPISI:
               Mobil: Flex item, ortalanmış, max-w-sm, max-h-[85vh]
               Masaüstü: Absolute pozisyonlanmış, transform ile ortalanmış
            */}
            <div 
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-slate-800 rounded-xl border border-primary/30 shadow-2xl animate-zoom-in
                    caff-scrollbar p-5
                    
                    /* MOBILE STYLES (Default) */
                    w-full max-w-sm max-h-[85vh] overflow-y-auto overflow-x-hidden
                    
                    /* DESKTOP STYLES (md:) */
                    md:absolute md:w-72 md:max-w-none md:max-h-none md:overflow-visible
                    md:top-auto md:left-auto
                `}
                style={{
                    // Masaüstünde hesaplanan pozisyonları kullan
                    ...(window.innerWidth >= 768 ? {
                        top: popoverPos.top,
                        left: popoverPos.left,
                        transform: 'translateX(-50%)' // Kutuyu kendi merkezinden ortala
                    } : {
                        maxWidth: "calc(100vw - 2rem)" // Mobil güvenlik payı
                    })
                }}
            >
                {/* Header (Sadece mobilde kapat butonu olsun, masaüstünde dışa tıklamak yeterli) */}
                <div className="flex justify-between items-start mb-3">
                    <h4 className="text-primary font-bold text-base break-words pr-2 min-w-0">{term}</h4>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors shrink-0 md:hidden"
                        aria-label="Kapat"
                        type="button"
                    >
                        <CaffeineIcons.X size={20} />
                    </button>
                </div>
                
                <p className="text-sm text-slate-300 leading-relaxed text-left break-words">
                    {definition}
                </p>
                
                {/* Footer (Sadece Mobil) */}
                <div className="mt-4 text-center md:hidden">
                   <button onClick={() => setIsOpen(false)} className="text-xs text-slate-500 underline py-2 px-4" type="button">Kapat</button>
                </div>
                
                {/* Desktop Arrow (Süsleme) */}
                <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-8 border-transparent border-b-slate-800 border-b-primary/30"></div>
            </div>
        </div>
    );

    return (
        <span className="relative inline-block">
            <button 
                ref={buttonRef}
                onClick={handleOpen}
                type="button"
                className="group inline-flex items-center gap-1 border-b border-dashed border-slate-500 hover:border-primary transition-colors focus:outline-none align-baseline cursor-pointer"
                aria-label={`${term} hakkında bilgi`}
            >
                <span className="font-semibold text-slate-200 group-hover:text-primary">{term}</span>
                <CaffeineIcons.HelpCircle size={12} className="text-slate-500 group-hover:text-primary mb-0.5" />
            </button>
            
            {isOpen && (canPortal ? ReactDOM.createPortal(tooltipContent, document.body) : tooltipContent)}
        </span>
    );
};

// --- MAIN PAGE COMPONENT ---
const CaffeinePerformancePage = ({ lang: propLang }) => {
    const activeLang = propLang || 'tr';
    
    const [activeTab, setActiveTab] = useState('summary');
    const [isGridOpen, setIsGridOpen] = useState(false);
    const [weight, setWeight] = useState(70);
    const [showReferences, setShowReferences] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleWeightChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            setWeight('');
            return;
        }
        const numVal = Number(val);
        if (Number.isFinite(numVal) && numVal >= 0) {
            setWeight(numVal);
        }
    };

    const definitions = {
        tr: {
            TTE: "Time to Exhaustion (Tükenme Süresi). Sporcunun belirli bir tempoda (sabit hız/güç) tükenene kadar ne kadar süre dayanabildiğini ölçen test. Dayanıklılık kapasitesinin en net göstergelerinden biridir.",
            TT: "Time-Trial (Zamana Karşı). Belirli bir mesafeyi (örneğin 5km koşu veya 20km bisiklet) en kısa sürede bitirmeye dayalı performans testi. Gerçek yarış koşullarını en iyi simüle eden testtir.",
            VO2max: "Maksimal Oksijen Tüketimi. Vücudun egzersiz sırasında kullanabildiği maksimum oksijen miktarıdır. Aerobik (dayanıklılık) kapasitenin altın standardı olarak kabul edilir.",
            Heat: "Sıcaklık Performansı. 30°C ve üzeri sıcaklıklarda yapılan egzersizlerdeki performans değişimi. Kafein burada da etkilidir."
        },
        en: {
            TTE: "Time to Exhaustion. A test measuring how long an athlete can sustain a specific intensity until failure. A key indicator of endurance capacity.",
            TT: "Time-Trial. A performance test based on completing a set distance (e.g., 5km run or 20km cycle) in the shortest possible time. It best simulates real race conditions.",
            VO2max: "Maximal Oxygen Uptake. The maximum amount of oxygen the body can utilize during exercise. It is considered the gold standard of aerobic (endurance) capacity.",
            Heat: "Performance in Heat. Performance changes during exercise in temperatures above 30°C. Caffeine is effective here as well."
        }
    };

    const content = {
        tr: {
        heroTitle: <>Kafein: <br/>Performansın <span className="text-primary">Biyolojik Hilesi</span></>,
        heroDesc: <>Yıllardır "yorgunluk alıcı" olarak bildiğimiz kafein, performans çıktısını ve efor algısını (RPE) iyileştirir <Ref ids={[8]}/>. Ayrıca bazı elit sporcularda VO2max ölçümünde küçük artışlar (~%1) ve kas gücünde (özellikle bacaklarda) artış sağlayabildiği raporlanmıştır <Ref ids={[8,3,6]}/>.</>,
        provenEffectsTitle: "Kanıtlanmış Etkiler",
        provenEffects: [
            { label: "Aerobik Güç", val: "Çok Yüksek" },
            { label: "Kas Kuvveti", val: "Orta/Yüksek" },
            { label: "Reaksiyon", val: "Yüksek" }
        ],
        tabs: { summary: 'Genel Bakış', newScience: 'Yeni Bulgular & Veriler', calculator: 'Dozaj Hesapla', sports: 'Sporuna Özel' },
        summaryTitle: <>Bildiğimiz Doğrular ve <span className="text-primary">Yeni Keşifler</span></>,
        summaryDesc: "Literatür yıllardır dayanıklılık üzerindeki etkiyi kabul ediyordu. Ancak 2021-2025 arası yapılan çalışmalar (ISSN, Wang, Wu) resmi güncelledi.",
        graphItems: [
            { desc: "Dayanıklılık kapasitesinde artış." },
            { desc: "Sıcak koşullarda daha iyi çıktı." },
            { desc: "Daha hızlı bitirme süreleri." },
            { desc: "Aerobik kapasitede küçük artış." }
        ],
        classicKnowledge: {
            title: "Klasik Bilgi (Temeller)",
            items: [
            <>Dayanıklılık performansını artırır. <Ref ids={[8,1]}/></>,
            <>Yorgunluk algısını (RPE) düşürür. <Ref ids={[8]}/></>,
            <>Bazı koşullarda substrat kullanımını (yağ/karbonhidrat) etkileyebilir. <Ref ids={[8]}/></>,
            <>Standart doz 3-6 mg/kg'dır. <Ref ids={[8]}/></>
            ]
        },
        newFindings: {
            title: "2021+ Güncellenmiş Çerçeve",
            items: [
            { title: "Fizyolojik Kapasite:", desc: <>Bazı elit dayanıklılık sporcularında VO2max ölçümünde küçük artışlar (~%1) raporlanmıştır. <Ref ids={[3]}/></> },
            { title: "Kuvvet Seçiciliği:", desc: <>Alt vücut kaslarında (Leg Press vb.) etki üst vücuda göre daha belirgin olabilir. <Ref ids={[6,9]}/></> },
            { title: "Cinsiyet Eşitliği:", desc: <>Bazı kontrollü çalışmalarda benzer yanıt görülmüştür; ancak literatürde bulgular tam homojen değildir (mixed evidence). <Ref ids={[6,9]}/></> },
            { title: "Sıcakta Güvenlik:", desc: <>Sıcak koşullarda ortalama performans artışı görülürken, çekirdek sıcaklık artışı genelde düşüktür; yine de bireysel tolerans önemlidir. <Ref ids={[2,8]}/></> }
            ]
        },
        graphsTitle: "Performans Kazanım Grafikleri",
        graphNoteTitle: "Veri Yorumu:",
        graphNoteDesc: "Zamana Karşı (TT) testlerinde %0.71'lik bir iyileşme (süre azalması) küçük görünebilir ancak elit sporda bu fark kürsü ile 4.lük arasındaki farktır. Tükenme süresindeki (TTE) %16.97'lik artış ise antrenman hacmini artırmak için muazzam bir fırsattır.",
        calcTitle: "Kişisel Dozaj Planlayıcı",
        calcDesc: <>Kilonuzu girin, ISSN standartlarına göre aralığınızı görün. <Ref ids={[8]}/></>,
        weightLabel: "VÜCUT AĞIRLIĞI (KG)",
        minDose: "Alt Sınır",
        maxDose: "Üst Sınır",
        espresso: "fincan espresso (değişken)",
        maxPerf: "Maksimum Performans",
        techFocus: { title: "Teknik & Odaklanma", desc: <>2-3 mg/kg genelde daha iyi tolere edilir; titreme/anksiyete riski daha düşüktür (kişiden kişiye değişir). <Ref ids={[8]}/></> },
        riskZone: { title: "Riskli Bölge", desc: <>Çoğu kişide 9 mg/kg civarı ve üzeri dozlarda ek fayda sınırlı olabilir; yan etki riski artar. <Ref ids={[4,8]}/></> },
        sportsCards: {
            hyrox: { 
                title: "Hyrox & Koşu", 
                desc: "Hem koşu hem de istasyon dayanıklılığı gerektiren hibrit yapı için ideal.", 
                why: <><TermTooltip term="TT" definition={definitions.tr.TT}/> ve <TermTooltip term="TTE" definition={definitions.tr.TTE}/> sürelerini iyileştirir <Ref ids={[1]}/>, bacak kuvvet devamlılığını artırır <Ref ids={[6]}/>.</>, 
                strat: <>Başlangıçtan 45-60 dk önce 3-6 mg/kg <Ref ids={[8]}/>. Uzun etkinliklerde (60-90 dk+) performans düşüşünü yönetmek için bazı sporcular yarış içinde ek kafein tercih eder (toleransa bağlı) <Ref ids={[8]}/>.</> 
            },
            crossfit: { 
                title: "CrossFit / HIIT", 
                desc: "Yüksek yoğunluklu, kompleks hareketler ve anlık karar verme süreçleri.", 
                why: <>Reaksiyon süresini hızlandırır, WOD çıktısını artırır <Ref ids={[4]}/>.</>, 
                warn: <>6 mg/kg sık kullanılan 'yüksek ama yönetilebilir' bir doz; daha yüksek dozlar çoğu kişide yan etki riskini artırabilir <Ref ids={[4,8]}/>.</> 
            },
            power: { 
                title: "Kuvvet & Powerlifting", 
                desc: "Maksimal güç üretimi ve set arası toparlanma.", 
                why: <>1RM değerini ve "Bar Hızını" (Velocity) artırır <Ref ids={[6]}/>.</>, 
                note: <>Alt vücut (Squat/Deadlift) hareketlerinde etki, Bench Press'e göre daha belirgindir <Ref ids={[6,9]}/>.</> 
            }
        },
        footerRefsShow: "Bilimsel Referansları Göster",
        footerRefsHide: "Referansları Gizle",
        disclaimer: "Bu bilgiler medikal tavsiye değildir, tamamen makalelerden derlenmiş bilgilerdir, tavsiye içermemektedir.",
        whyLabel: "Neden?",
        stratLabel: "Strateji:",
        warnLabel: "Doz Uyarısı:",
        impLabel: "Önemli:",
        definitions: definitions.tr
        },
        en: {
        heroTitle: <>Caffeine: <br/>The <span className="text-primary">Biological Cheat Code</span></>,
        heroDesc: <>Known for years as a 'fatigue fighter', caffeine improves performance output and perceived effort (RPE) <Ref ids={[8]}/>. Reports also suggest small increases in VO2max (~1%) and muscle power (especially in legs) in some elite athletes <Ref ids={[8,3,6]}/>.</>,
        provenEffectsTitle: "Proven Effects",
        provenEffects: [
            { label: "Aerobic Power", val: "Very High" },
            { label: "Muscle Strength", val: "Med/High" },
            { label: "Reaction Time", val: "High" }
        ],
        tabs: { summary: 'Overview', newScience: 'New Findings & Data', calculator: 'Dosage Calc', sports: 'Sport Specific' },
        summaryTitle: <>Known Truths & <span className="text-primary">New Discoveries</span></>,
        summaryDesc: "Literature has accepted the effect on endurance for years. However, studies between 2021-2025 (ISSN, Wang, Wu) have updated the framework.",
        graphItems: [
            { desc: "Increase in endurance capacity." },
            { desc: "Improved output in hot conditions." },
            { desc: "Faster completion times." },
            { desc: "Slight increase in aerobic capacity." }
        ],
        classicKnowledge: {
            title: "Classic Knowledge (Basics)",
            items: [
            <>Increases endurance performance. <Ref ids={[8,1]}/></>,
            <>Lowers Rating of Perceived Exertion (RPE). <Ref ids={[8]}/></>,
            <>May affect substrate use (fat/carb) in some conditions. <Ref ids={[8]}/></>,
            <>Standard dose is 3-6 mg/kg. <Ref ids={[8]}/></>
            ]
        },
        newFindings: {
            title: "2021+ Updated Framework",
            items: [
            { title: "Physiological Capacity:", desc: <>Small increases in VO2max (~1%) have been reported in some elite endurance settings. <Ref ids={[3]}/></> },
            { title: "Strength Selectivity:", desc: <>Effect on lower body muscles (Leg Press etc.) may be more pronounced than upper body. <Ref ids={[6,9]}/></> },
            { title: "Gender Equality:", desc: <>Some controlled trials show similar responses, though literature findings are not fully homogeneous (mixed evidence). <Ref ids={[6,9]}/></> },
            { title: "Safety in Heat:", desc: <>Average performance increases in heat, while core temp rise is generally small; individual tolerance remains important. <Ref ids={[2,8]}/></> }
            ]
        },
        graphsTitle: "Performance Gain Charts",
        graphNoteTitle: "Data Interpretation:",
        graphNoteDesc: "A 0.71% improvement in Time-Trial (TT) tests may seem small, but in elite sports, this is the difference between the podium and 4th place. A 16.97% increase in Time to Exhaustion (TTE) is a massive opportunity to increase training volume.",
        calcTitle: "Personal Dosage Planner",
        calcDesc: <>Enter your weight, see your range according to ISSN standards. <Ref ids={[8]}/></>,
        weightLabel: "BODY WEIGHT (KG)",
        minDose: "Lower Limit",
        maxDose: "Upper Limit",
        espresso: "cups of espresso (variable)",
        maxPerf: "Maximum Performance",
        techFocus: { title: "Technique & Focus", desc: <>2-3 mg/kg is generally better tolerated; risk of tremors/anxiety is lower (varies by individual). <Ref ids={[8]}/></> },
        riskZone: { title: "Risk Zone", desc: <>For most, doses above 9 mg/kg offer limited extra benefit and increase risk of side effects. <Ref ids={[4,8]}/></> },
        sportsCards: {
            hyrox: { 
                title: "Hyrox & Running", 
                desc: "Ideal for hybrid structures requiring both running and station endurance.", 
                why: <>Improves <TermTooltip term="TT" definition={definitions.en.TT}/> and <TermTooltip term="TTE" definition={definitions.en.TTE}/> times <Ref ids={[1]}/>, increases leg strength endurance <Ref ids={[6]}/>.</>, 
                strat: <>3-6 mg/kg 45-60 mins before start <Ref ids={[8]}/>. In long events (60-90 min+), some athletes opt for intra-race caffeine to manage fatigue (tolerance dependent) <Ref ids={[8]}/>.</> 
            },
            crossfit: { 
                title: "CrossFit / HIIT", 
                desc: "High intensity, complex movements and instant decision making processes.", 
                why: <>Speeds up reaction time, increases WOD output <Ref ids={[4]}/>.</>, 
                warn: <>6 mg/kg is a common 'high but manageable' dose; higher amounts may increase side effect risk for many <Ref ids={[4,8]}/>.</> 
            },
            power: { 
                title: "Strength & Powerlifting", 
                desc: "Maximal power production and recovery between sets.", 
                why: <>Increases 1RM value and 'Bar Velocity' <Ref ids={[6]}/>.</>, 
                note: <>Effect is more pronounced in lower body (Squat/Deadlift) movements compared to Bench Press <Ref ids={[6,9]}/>.</> 
            }
        },
        footerRefsShow: "Show Scientific References",
        footerRefsHide: "Hide References",
        disclaimer: "This information is not medical advice, it is compiled entirely from articles and does not contain recommendations.",
        whyLabel: "Why?",
        stratLabel: "Strategy:",
        warnLabel: "Dose Warning:",
        impLabel: "Important:",
        definitions: definitions.en
        }
    };

    const t = content[activeLang];

    // Grid Menü için İkon ve Etiket Eşleştirmesi
    const TAB_CONFIG = {
        summary: { icon: CaffeineIcons.Scale, label: t.tabs.summary },
        newScience: { icon: CaffeineIcons.Zap, label: t.tabs.newScience },
        calculator: { icon: CaffeineIcons.Battery, label: t.tabs.calculator },
        sports: { icon: CaffeineIcons.Timer, label: t.tabs.sports }
    };

    const activeTabConfig = TAB_CONFIG[activeTab];

    const performanceData = [
        { 
        term: 'TTE', 
        label: activeLang === 'tr' ? 'Tükenme Süresi' : 'Time to Exhaustion', 
        value: 16.97, 
        color: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]', 
        desc: t.graphItems?.[0]?.desc || "Increase in endurance capacity.",
        defKey: 'TTE'
        },
        { 
        term: 'Heat', 
        label: activeLang === 'tr' ? 'Sıcakta Performans' : 'Performance in Heat', 
        value: 2.0, 
        color: 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]', 
        desc: t.graphItems?.[1]?.desc || "Improved output in hot conditions.",
        defKey: 'Heat'
        },
        { 
        term: 'TT', 
        label: activeLang === 'tr' ? 'Zamana Karşı' : 'Time-Trial', 
        value: 0.71, 
        color: 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]', 
        desc: t.graphItems?.[2]?.desc || "Faster completion times.",
        defKey: 'TT'
        },
        { 
        term: 'VO2max', 
        label: 'VO2max', 
        value: 1.2, 
        color: 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]', 
        desc: t.graphItems?.[3]?.desc || "Slight increase in aerobic capacity.",
        defKey: 'VO2max'
        },
    ];

    const calculateDosage = (kg) => {
        if (kg === '' || kg === 0) {
        return { min: '---', max: '---', extreme: '---', micro: '---', espressoMinCups: '---', espressoMaxCups: '---' };
        }
        const safeKg = Number(kg);
        return {
        min: Math.round(safeKg * 3),
        max: Math.round(safeKg * 6),
        extreme: Math.round(safeKg * 9),
        micro: Math.round(safeKg * 2),
        espressoMinCups: Math.round((safeKg * 3) / 80 * 10) / 10, 
        espressoMaxCups: Math.round((safeKg * 3) / 40 * 10) / 10 
        };
    };

    const dosage = calculateDosage(weight);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-primary/30 pb-12 overflow-x-hidden">
        
        {/* CUSTOM STYLES FOR ANIMATIONS */}
        <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            
            .animate-in { animation: fadeIn 0.5s ease-out forwards; }
            .animate-slide-in { animation: slideUp 0.7s ease-out forwards; }
            .animate-zoom-in { animation: zoomIn 0.3s ease-out forwards; }
            
            /* Custom Scrollbar for this module */
            .caff-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
            .caff-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
            .caff-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
            .caff-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
        `}</style>

        {/* HERO SECTION */}
        <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-purple-600"></div>
            
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                <div className="md:w-2/3 animate-in animate-slide-in">
                <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    {t.heroTitle}
                </h1>
                <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
                    {t.heroDesc}
                </p>
                </div>
                {/* Quick Stat Visual */}
                <div className="md:w-1/3 w-full bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 shadow-2xl relative animate-zoom-in">
                <div className="absolute -top-4 -right-4 bg-primary text-slate-900 font-bold p-3 md:p-4 rounded-xl shadow-lg rotate-12 transform hover:scale-110 transition-transform">
                    +16.9%
                    <div className="text-xs font-normal opacity-80">{activeLang === 'tr' ? 'Dayanıklılık' : 'Endurance'}</div>
                </div>
                <h3 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
                    <CaffeineIcons.Activity size={18} className="text-primary"/>
                    {t.provenEffectsTitle}
                </h3>
                <ul className="space-y-3">
                    {t.provenEffects.map((effect, idx) => (
                    <li key={idx} className="flex items-center justify-between text-sm group">
                        <span className="text-slate-400 group-hover:text-slate-200 transition-colors">{effect.label}</span>
                        <span className="text-primary font-mono font-medium bg-primary/10 px-2 py-0.5 rounded">{effect.val}</span>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            </div>
        </header>

        {/* NAVIGATION: DESKTOP TABS & MOBILE GRID TRIGGER */}
        <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* DESKTOP VIEW: Klasik Yatay Scroll (Hidden on Mobile) */}
                <div className="hidden md:flex overflow-x-auto gap-2 md:gap-6 py-3 scrollbar-hide">
                    {Object.keys(t.tabs).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`whitespace-nowrap px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-medium transition-all ${
                        activeTab === key 
                            ? 'bg-slate-800 text-primary ring-1 ring-primary/50 shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                    >
                        {t.tabs[key]}
                    </button>
                    ))}
                </div>

                {/* MOBILE VIEW: Grid Menu Trigger (Visible on Mobile) */}
                <div className="md:hidden py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3 pl-1">
                        <span className="text-primary bg-primary/10 p-1.5 rounded-lg border border-primary/20">
                            <activeTabConfig.icon size={18} />
                        </span>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-0.5">Aktif Bölüm</span>
                            <span className="text-white font-bold text-sm leading-none">
                                {activeTabConfig.label}
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsGridOpen(true)}
                        className="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-2"
                    >
                        <CaffeineIcons.Grid size={16} />
                        <span>Menü</span>
                    </button>
                </div>

            </div>
        </div>

        {/* MOBILE GRID MENU OVERLAY (Portal-like, Full Screen) */}
        {isGridOpen && (
            <div className="fixed inset-0 z-[10000] bg-slate-900/98 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-white tracking-tight">Menü</h3>
                        <p className="text-slate-400 text-sm font-medium">Görüntülemek istediğiniz bölümü seçin</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {Object.keys(TAB_CONFIG).map((key) => {
                            const tab = TAB_CONFIG[key];
                            const isActive = activeTab === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => { setActiveTab(key); setIsGridOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                                    className={`
                                        p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all duration-200 aspect-square group
                                        ${isActive 
                                            ? 'bg-primary text-slate-900 border-primary shadow-[0_0_25px_rgba(var(--primary-rgb),0.4)] scale-105 ring-2 ring-primary/50' 
                                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500 hover:bg-slate-750 active:scale-95'}
                                    `}
                                >
                                    <div className={`p-3 rounded-full ${isActive ? 'bg-black/10' : 'bg-slate-900/50 group-hover:bg-slate-900'} transition-colors`}>
                                        <tab.icon size={32} />
                                    </div>
                                    <span className="text-sm font-bold text-center leading-tight">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <button 
                        onClick={() => setIsGridOpen(false)}
                        className="w-full py-4 text-slate-500 font-bold hover:text-white transition-colors text-sm uppercase tracking-widest"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        )}

        <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-12 md:space-y-24">

            {/* SECTION 1: SUMMARY */}
            <section id="summary" className={`space-y-8 md:space-y-12 ${activeTab !== 'summary' ? 'hidden' : 'animate-in'}`}>
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{t.summaryTitle}</h2>
                <p className="text-slate-400 text-sm md:text-base">
                {t.summaryDesc}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 text-slate-300">
                    <CaffeineIcons.Scale size={20} className="md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-4 text-white">{t.classicKnowledge.title}</h3>
                <ul className="space-y-4">
                    {t.classicKnowledge.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 text-sm md:text-base">
                        <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                        <span className="text-slate-300 block">{item}</span>
                    </li>
                    ))}
                </ul>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-800/30 p-6 md:p-8 rounded-2xl border border-primary/20 shadow-lg shadow-primary/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 md:p-3 bg-primary/10 rounded-bl-2xl border-b border-l border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider">
                    2021-2025
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                    <CaffeineIcons.Zap size={20} className="md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-4 text-white">{t.newFindings.title}</h3>
                <ul className="space-y-4">
                    {t.newFindings.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 text-sm md:text-base">
                        <div className="mt-1.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shrink-0"></div>
                        <span>
                        <strong className="text-white block md:inline md:mr-1">{item.title}</strong> {item.desc}
                        </span>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            </section>

            {/* SECTION 2: GRAPHS */}
            <section id="newScience" className={`space-y-8 ${activeTab !== 'newScience' ? 'hidden' : 'animate-in'}`}>
            <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                <CaffeineIcons.TrendingUp className="text-primary" />
                {t.graphsTitle}
                </h3>
                
                <div className="space-y-8 md:space-y-10">
                {performanceData.map((item, index) => (
                    <div key={index} className="space-y-3">
                    <div className="flex flex-wrap justify-between items-end gap-2 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <TermTooltip term={item.label} definition={t.definitions[item.defKey]} />
                        </div>
                        {/* Graphs keep their specific colors (green for TTE, etc.) but we could use primary here if needed */}
                        <span className="text-primary font-mono text-base md:text-lg">
                        {item.value === 0.71 ? '~0.71%' : `+${item.value}%`}
                        </span>
                    </div>
                    
                    <div className="h-5 md:h-6 bg-slate-900/50 rounded-full overflow-hidden p-1 border border-slate-700/50">
                        <div 
                        className={`h-full ${item.color} rounded-full relative group transition-all duration-[1500ms] ease-out flex items-center justify-end pr-2`} 
                        style={{ 
                            width: mounted ? `${Math.min(item.value * 4 + 5, 100)}%` : '0%' 
                        }}
                        >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                        <div className="w-1 h-full bg-white/40 blur-[1px] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 pl-1 border-l-2 border-slate-700">{item.desc}</p>
                    </div>
                ))}
                </div>

                <div className="mt-12 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 flex gap-4 items-start">
                <CaffeineIcons.Info className="text-blue-400 shrink-0 mt-1" size={20} />
                <div className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    <strong className="block text-blue-400 mb-1 text-sm md:text-base">{t.graphNoteTitle}</strong>
                    <p>{t.graphNoteDesc}</p>
                </div>
                </div>
            </div>
            </section>

            {/* SECTION 3: CALCULATOR */}
            <section id="calculator" className={`space-y-8 ${activeTab !== 'calculator' ? 'hidden' : 'animate-in'}`}>
            <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl">
                <div className="text-center mb-8">
                    <CaffeineIcons.Battery size={48} className="text-primary mx-auto mb-4 animate-bounce duration-[2000ms]" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">{t.calcTitle}</h3>
                    <p className="text-slate-400 mt-2 text-sm md:text-base">{t.calcDesc}</p>
                </div>

                <div className="flex flex-col items-center mb-8">
                    <label className="text-slate-300 text-xs md:text-sm font-bold mb-2 uppercase tracking-wide">{t.weightLabel}</label>
                    <div className="flex items-center gap-4">
                    <button onClick={() => setWeight(w => (typeof w === 'number' && w > 40 ? w - 1 : w))} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-xl font-bold active:scale-95 transition-transform">-</button>
                    <input 
                        type="number"
                        min="40"
                        max="200" 
                        value={weight}
                        onChange={handleWeightChange}
                        placeholder="---"
                        className="w-28 md:w-36 bg-slate-900 border-2 border-primary/30 focus:border-primary rounded-2xl py-3 text-center text-2xl md:text-4xl font-bold text-white outline-none transition-all shadow-inner"
                    />
                    <button onClick={() => setWeight(w => (typeof w === 'number' ? w + 1 : 70))} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-xl font-bold active:scale-95 transition-transform">+</button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-700/30 p-4 rounded-2xl border border-slate-600 text-center hover:bg-slate-700/50 transition-colors">
                    <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mb-1">{t.minDose} (3mg/kg)</div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{dosage.min} mg</div>
                    <div className="text-[10px] md:text-xs text-slate-500 mt-1">~{dosage.espressoMinCups}-{dosage.espressoMaxCups} {t.espresso}</div>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-2xl border border-slate-600 text-center hover:bg-slate-700/50 transition-colors">
                    <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mb-1">{t.maxDose} (6mg/kg)</div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{dosage.max} mg</div>
                    <div className="text-[10px] md:text-xs text-slate-500 mt-1">{t.maxPerf}</div>
                    </div>
                </div>

                {/* Threshold Warnings */}
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
                    <CaffeineIcons.Brain size={20} className="text-blue-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-blue-400 text-sm">{t.techFocus.title} ({dosage.micro} mg)</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.techFocus.desc}</p>
                    </div>
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3">
                    <CaffeineIcons.AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-red-400 text-sm">{t.riskZone.title} ({typeof dosage.extreme === 'number' ? `> ${dosage.extreme}` : '---'} mg)</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.riskZone.desc}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* SECTION 4: SPORTS SPECIFIC */}
            <section id="sports" className={`space-y-8 ${activeTab !== 'sports' ? 'hidden' : 'animate-in'}`}>
            <div className="grid md:grid-cols-3 gap-6">
                
                {/* HYROX / ENDURANCE */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col h-full hover:border-orange-500/50 transition-colors shadow-lg">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 text-orange-400">
                    <CaffeineIcons.Timer size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.sportsCards.hyrox.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow leading-relaxed">
                    {t.sportsCards.hyrox.desc}
                </p>
                <div className="space-y-3 mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-start gap-2">
                    <CaffeineIcons.ChevronRight size={16} className="text-orange-400 mt-1 shrink-0" />
                    <p className="text-sm text-slate-300"><strong>{t.whyLabel}</strong> {t.sportsCards.hyrox.why}</p>
                    </div>
                    <div className="flex items-start gap-2">
                    <CaffeineIcons.ChevronRight size={16} className="text-orange-400 mt-1 shrink-0" />
                    <p className="text-sm text-slate-300"><strong>{t.stratLabel}</strong> {t.sportsCards.hyrox.strat}</p>
                    </div>
                </div>
                </div>

                {/* CROSSFIT */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col h-full hover:border-purple-500/50 transition-colors shadow-lg">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400">
                    <CaffeineIcons.Activity size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.sportsCards.crossfit.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow leading-relaxed">
                    {t.sportsCards.crossfit.desc}
                </p>
                <div className="space-y-3 mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-start gap-2">
                    <CaffeineIcons.ChevronRight size={16} className="text-purple-400 mt-1 shrink-0" />
                    <p className="text-sm text-slate-300"><strong>{t.whyLabel}</strong> {t.sportsCards.crossfit.why}</p>
                    </div>
                    <div className="flex items-start gap-2">
                    <CaffeineIcons.ChevronRight size={16} className="text-purple-400 mt-1 shrink-0" />
                    <p className="text-sm text-slate-300"><strong>{t.warnLabel}</strong> {t.sportsCards.crossfit.warn}</p>
                    </div>
                </div>
                </div>

                {/* POWER / LIFTING */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col h-full hover:border-blue-500/50 transition-colors shadow-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                    <CaffeineIcons.Flame size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.sportsCards.power.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow leading-relaxed">
                    {t.sportsCards.power.desc}
                </p>
                <div className="space-y-3 mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-start gap-2">
                    <CaffeineIcons.ChevronRight size={16} className="text-blue-400 mt-1 shrink-0" />
                    <p className="text-sm text-slate-300"><strong>{t.whyLabel}</strong> {t.sportsCards.power.why}</p>
                    </div>
                    <div className="flex items-start gap-2">
                    <CaffeineIcons.ChevronRight size={16} className="text-blue-400 mt-1 shrink-0" />
                    <p className="text-sm text-slate-300"><strong>{t.impLabel}</strong> {t.sportsCards.power.note}</p>
                    </div>
                </div>
                </div>

            </div>
            </section>

        </main>

        {/* FOOTER & REFS */}
        <footer className="container mx-auto px-4 py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <button 
            onClick={() => setShowReferences(!showReferences)}
            className="text-slate-400 hover:text-primary transition-colors mb-4 underline"
            >
            {showReferences ? t.footerRefsHide : t.footerRefsShow}
            </button>
            
            {showReferences && (
            <div className="text-left max-w-4xl mx-auto bg-slate-900 p-6 rounded-xl border border-slate-800 text-xs space-y-2 mt-4 text-slate-400 font-mono leading-relaxed shadow-inner animate-in">
                <p>[1] Wang, Z., Qiu, B., Gao, J., & Del Coso, J. (2023). Effects of Caffeine Intake on Endurance Running Performance and Time to Exhaustion: A Systematic Review and Meta-Analysis. Nutrients, 15(1), 148.</p>
                <p>[2] Naulleau, C., et al. (2021). Effect of Pre-Exercise Caffeine Intake on Endurance Performance and Core Temperature Regulation During Exercise in the Heat: A Systematic Review with Meta-Analysis. Frontiers in Sports and Active Living.</p>
                <p>[3] Stadheim, H. K., et al. (2021). Caffeine increases exercise performance, maximal oxygen uptake and oxygen deficit in elite male endurance athletes. Medicine & Science in Sports & Exercise.</p>
                <p>[4] Główka, N., et al. (2024). The dose-dependent effect of caffeine supplementation on performance, reaction time and postural stability in CrossFit – a randomized placebo-controlled crossover trial. Journal of the International Society of Sports Nutrition.</p>
                <p>[5] Filip-Stachnik, A., et al. (2021). The effects of different doses of caffeine on maximal strength and strength-endurance in women habituated to caffeine. Journal of the International Society of Sports Nutrition, 18(1), 25.</p>
                <p>[6] Wu, W., et al. (2024). Effects of Acute Ingestion of Caffeine Capsules on Muscle Strength and Muscle Endurance: A Systematic Review and Meta-Analysis. Nutrients, 16(8), 1146.</p>
                <p>[7] Grgic, J., Venier, S., & Mikulic, P. (2022). Examining the Effects of Caffeine on Isokinetic Strength, Power, and Endurance. Journal of Functional Morphology and Kinesiology, 7(4), 71.</p>
                <p>[8] Guest, N. S., et al. (2021). International Society of Sports Nutrition position stand: caffeine and exercise performance. Journal of the International Society of Sports Nutrition.</p>
                <p>[9] Montalvo-Alonso, J. J., et al. (2024). Sex Differences in the Ergogenic Response of Acute Caffeine Intake on Muscular Strength, Power and Endurance Performance in Resistance-Trained Individuals: A Randomized Controlled Trial. Nutrients, 16(11), 1760.</p>
            </div>
            )}
            <p className="mt-6 text-slate-600">{t.disclaimer}</p>
        </footer>
        </div>
    );
};

// Make it available to the global scope for App.js to find
window.CaffeinePerformancePage = CaffeinePerformancePage;
