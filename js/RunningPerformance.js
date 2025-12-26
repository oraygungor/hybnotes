const RunningPerformancePage = ({ lang }) => {
    // useState'i tekrar import ediyoruz
    const { useEffect, useState } = React;
    
    // Hangi tooltip'in açık olduğunu tutan state (null = hepsi kapalı)
    const [activeTooltip, setActiveTooltip] = useState(null);

    // Dışarı tıklayınca tooltip'i kapatma
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Eğer tıklanan yer bir tooltip tetikleyicisi (karta ait) değilse kapat
            if (!event.target.closest('.tooltip-trigger')) {
                setActiveTooltip(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Tooltip aç/kapa fonksiyonu
    const toggleTooltip = (id, e) => {
        e.stopPropagation(); // Tıklamanın document'a gidip hemen kapatmasını engelle
        setActiveTooltip(activeTooltip === id ? null : id);
    };

    const tr = {
        title: "Koşu Performansını Etkileyen Faktörler",
        subtitle: "Klasik fizyolojik model (3 faktör) ve modern 4. boyut (durability).",
        validity: "Geçerlilik: 3000m - Maraton (Aerobik Baskın)",
        
        // 4 Sütun
        vo2_title: "VO₂max",
        vo2_sub: "OKSİJEN KULLANMA TAVANI",
        vo2_desc: "Aerobik kapasitenin üst limiti. Potansiyeli belirler ancak tek başına kazananı belirlemez.",
        vo2_tooltip: "Bir arabanın motor hacmi (cc) gibidir. 5000cc motoru olan bir araba, 1600cc olandan daha hızlı gitme potansiyeline sahiptir. Ancak lastikleri kötüyse (ekonomi) veya motor hararet yapıyorsa (sürdürülebilirlik) o gücü kullanamaz.",
        
        threshold_title: "Sürdürülebilirlik",
        threshold_sub: "%VO₂max KULLANIMI",
        threshold_desc: "Genelde LT/VT/MLSS/CS civarında sürdürülebilen %VO₂max. Mevcut kapasitenin yüzde kaçını 'patlamadan' sürdürebiliyorsun?",
        threshold_tooltip: (
            <>
                <div className="mb-3">Arabanın devir saati gibidir. Motorun kırmızı çizgiye girmeden (asit birikmeden) çalışabileceği en yüksek devirdir.</div>
                <div className="text-[10px] font-sans border-t border-slate-700 pt-2 space-y-1.5 opacity-90">
                    <div><span className="text-rose-400 font-bold">LT (Lactate Threshold):</span> Laktatın kanda birikmeye başladığı ilk eşik.</div>
                    <div><span className="text-rose-400 font-bold">VT (Ventilatory Threshold):</span> Solunumun derinleştiği solunum eşiği.</div>
                    <div><span className="text-rose-400 font-bold">MLSS:</span> Maksimum Laktat Kararlı Durumu (üretim = atılım).</div>
                    <div><span className="text-rose-400 font-bold">CS (Critical Speed):</span> Yorgunluk oluşmadan sürdürülebilen teorik hız sınırı.</div>
                </div>
            </>
        ),
        
        economy_title: "Ekonomi (Cr)",
        economy_sub: "VERİMLİLİK",
        economy_desc: "Belirli bir hızda koşarken ne kadar oksijen/enerji harcıyorsun?",
        economy_tooltip: "Arabanın yakıt tüketimi veya aerodinamiği gibidir. Aynı hızda giden iki arabadan az yakan (ekonomik olan), daha az eforla daha uzağa gider. İyi teknik ve uygun ayakkabı bunu geliştirir.",
        
        resilience_title: "Durability",
        resilience_sub: "YORGUNLUK DİRENCİ",
        resilience_desc: "Yarış uzadıkça fizyolojik parametrelerin bozulmaya (drift) karşı direnci.",
        resilience_tooltip: "Arabanın dayanıklılığı gibidir. Start çizgisinde herkes taze olabilir, ama 30. km'den sonra süspansiyon dağılıyor mu, motor su kaynatıyor mu? Performansın zamanla ne kadar az düştüğünü gösterir.",

        // Formül Alanı
        eq_title: "PERFORMANS DENKLEMİ (ZAMANA BAĞLI)",
        eq_desc: "Hız (v), o anki sürdürülebilir aerobik gücün, koşu maliyetine (Cr) bölümüdür.",
        eq_note: "Not: VO₂max (ml/kg/dk) ve Cr (ml/kg/km) ile hız km/dk çıkar (m/dk için ×1000).",
        eq_fractional_note: "*Fractional Utilization: VO₂max'ın ne kadarının eşik seviyesinde kullanılabildiğini gösteren oran.",

        resilience_factor_title: "Durability (Yorgunluk Direnci) Faktörü:",
        resilience_factor_text_1: "Bu formüle",
        resilience_factor_highlight_time: "(t) zaman değişkeni",
        resilience_factor_text_2: "eklendiğinde gerçek hayat senaryosu ortaya çıkar. Maratonun sonlarına doğru yorgunlukla birlikte",
        resilience_factor_highlight_1: "Cr (Maliyet) artar",
        resilience_factor_text_3: "ve",
        resilience_factor_highlight_2: "Sürdürülebilirlik düşer",
        resilience_factor_text_4: ". Durability, bu düşüşü minimize etme yeteneğidir.",

        // Fark Notu
        diff_title: "💡 Önemli Fark: Endurance vs. Durability",
        diff_desc: "Bu iki kavram sıklıkla karıştırılır:",
        diff_endurance: "Endurance (Dayanıklılık):",
        diff_endurance_ex: "\"3 saat koşabilirim.\" (Süre odaklı)",
        diff_durability: "Durability (Yorgunluk Direnci):",
        diff_durability_ex: "\"3. saatte de 1. saatteki kadar verimli ve hızlı koşabilirim.\" (Kalite ve bozulmama odaklı)",

        // Referanslar
        ref_title: "REFERANSLAR (LİTERATÜR)",
        ref_1: "Joyner & Coyle (2008): Endurance performance determinants.",
        ref_2: "Bassett & Howley (2000): Limiting factors for VO2max.",
        ref_3: "Saunders et al. (2004): Running economy optimization.",
        ref_4: "Jones (2006): The physiology of the world record holder (Women's Marathon).",
        ref_5: "Jones (2024): The 4th Dimension: Resilience & Durability.",
        ref_6: "Barnes & Kilding (2015): Strategies to improve economy."
    };

    const en = {
        title: "Factors Affecting Running Performance",
        subtitle: "The classic physiological model (3 factors) plus the modern 4th dimension (durability).",
        validity: "Validity: 3000m - Marathon (Aerobic Dominant)",
        
        // 4 Pillars
        vo2_title: "VO₂max",
        vo2_sub: "OXYGEN UPTAKE CEILING",
        vo2_desc: "The upper limit of aerobic capacity. Determines potential but not the winner alone.",
        vo2_tooltip: "It's like the engine displacement (cc) of a car. A 5000cc engine has the potential to go faster than a 1600cc one. But if the tires are bad (economy) or the engine overheats (sustainability), it cannot use that power.",
        
        threshold_title: "Sustainability",
        threshold_sub: "%VO₂max UTILIZATION",
        threshold_desc: "Gen. %VO₂max sustained at LT/VT/MLSS/CS. What percentage of your capacity can you sustain with metabolic stability?",
        threshold_tooltip: (
            <>
                <div className="mb-3">It's like the RPM redline of a car. It's the highest intensity you can maintain without 'overheating' (metabolic instability).</div>
                <div className="text-[10px] font-sans border-t border-slate-700 pt-2 space-y-1.5 opacity-90">
                    <div><span className="text-rose-400 font-bold">LT (Lactate Threshold):</span> Point where lactate rises above baseline.</div>
                    <div><span className="text-rose-400 font-bold">VT (Ventilatory Threshold):</span> Breathing rate inflection point.</div>
                    <div><span className="text-rose-400 font-bold">MLSS:</span> Max Lactate Steady State (production = clearance).</div>
                    <div><span className="text-rose-400 font-bold">CS (Critical Speed):</span> Theoretical max sustainable speed without fatigue.</div>
                </div>
            </>
        ),
        
        economy_title: "Economy (Cr)",
        economy_sub: "EFFICIENCY",
        economy_desc: "How much oxygen/energy do you consume at a given speed?",
        economy_tooltip: "It's like fuel efficiency or aerodynamics. Between two cars going at the same speed, the one burning less fuel (more economical) goes further with less effort. Good form and shoes improve this.",
        
        resilience_title: "Durability",
        resilience_sub: "FATIGUE RESISTANCE",
        resilience_desc: "The ability to resist deterioration (drift) in physiological parameters as the race progresses.",
        resilience_tooltip: "It's like the durability of the car parts. Everyone is fresh at the start line, but does the suspension break down after 30km? It shows how little your performance drops over time.",

        // Formula Area
        eq_title: "PERFORMANCE EQUATION (TIME DEPENDENT)",
        eq_desc: "Velocity (v) is your current sustainable aerobic power divided by the cost of running (Cr).",
        eq_note: "Note: Using VO₂max (ml/kg/min) and Cr (ml/kg/km) results in speed in km/min (×1000 for m/min).",
        eq_fractional_note: "*Fractional Utilization: The fraction of VO₂max that can be sustained at threshold.",

        resilience_factor_title: "Durability Factor:",
        resilience_factor_text_1: "Adding the",
        resilience_factor_highlight_time: "time variable (t)",
        resilience_factor_text_2: "reveals the real-world scenario. Late in a marathon, due to fatigue,",
        resilience_factor_highlight_1: "Cr (Cost) increases",
        resilience_factor_text_3: "and",
        resilience_factor_highlight_2: "Sustainability drops",
        resilience_factor_text_4: ". Durability is the ability to minimize this drift.",

        // Difference Note
        diff_title: "💡 Important Distinction: Endurance vs. Durability",
        diff_desc: "These two concepts are often confused:",
        diff_endurance: "Endurance:",
        diff_endurance_ex: "\"I can run for 3 hours.\" (Duration focused)",
        diff_durability: "Durability (Fatigue Resistance):",
        diff_durability_ex: "\"I can run as efficiently and fast in hour 3 as I did in hour 1.\" (Quality and non-decay focused)",

        // References
        ref_title: "REFERENCES (LITERATURE)",
        ref_1: "Joyner & Coyle (2008): Endurance performance determinants.",
        ref_2: "Bassett & Howley (2000): Limiting factors for VO2max.",
        ref_3: "Saunders et al. (2004): Running economy optimization.",
        ref_4: "Jones (2006): The physiology of the world record holder (Women's Marathon).",
        ref_5: "Jones (2024): The 4th Dimension: Resilience & Durability.",
        ref_6: "Barnes & Kilding (2015): Strategies to improve economy."
    };

    const t = lang === 'tr' ? tr : en;

    // Özel İkonlar
    const IconLungs = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-cyan-400"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 19.2c-1 .9-1.2 2.5-.5 3.5.7.9 2.1 1.2 3.5.5Z"/><path d="m8 13 4 2"/></svg>;
    const IconFire = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-rose-400"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.27.57 1.75 2.01 2.32 3 2.77Z"/></svg>;
    const IconGear = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-emerald-400"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
    const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    const IconValid = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    const IconInfo = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;

    // MathJax Tetikleyici
    useEffect(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise();
        }
    }, [lang]);

    return (
        <div className="bg-slate-800 text-slate-200 rounded-3xl p-6 md:p-10 max-w-[1200px] mx-auto border border-slate-700 shadow-2xl font-sans">
            
            {/* Header */}
            <div className="text-center mb-10 w-full">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                    {t.title}
                </h1>
                <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto mb-4">
                    {t.subtitle}
                </p>
                <div className="flex justify-center">
                    <div className="bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs px-3 py-1.5 rounded-lg flex items-center">
                        <IconValid />
                        <span><strong>{t.validity}</strong></span>
                    </div>
                </div>
            </div>

            {/* 4 Temel Sütun */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-10">
                
                {/* 1. VO2max - Tooltip ile (Interaktif Toggle) */}
                <div 
                    onClick={(e) => toggleTooltip('vo2', e)}
                    className={`tooltip-trigger group relative bg-slate-900/50 border rounded-xl p-5 flex flex-row md:flex-col items-center md:items-start gap-4 transition-all cursor-pointer ${activeTooltip === 'vo2' ? 'border-sky-500 bg-slate-800 ring-2 ring-sky-500/20' : 'border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'}`}
                >
                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl text-xs text-slate-300 transition-all z-20 pointer-events-none ${activeTooltip === 'vo2' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        {t.vo2_tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </div>

                    <div className="p-2 bg-slate-800 rounded-lg shrink-0 border border-slate-700 relative">
                        <IconLungs />
                        <div className={`absolute -top-1 -right-1 rounded-full p-0.5 transition-colors ${activeTooltip === 'vo2' ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-400'}`}><IconInfo /></div>
                    </div>
                    <div>
                        <h3 className={`text-lg font-bold transition-colors ${activeTooltip === 'vo2' ? 'text-sky-400' : 'text-white'}`}>{t.vo2_title}</h3>
                        <div className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t.vo2_sub}</div>
                        <p className="text-slate-400 text-xs leading-relaxed">{t.vo2_desc}</p>
                    </div>
                </div>

                {/* 2. Threshold - Sürdürülebilirlik - Tooltip ile (Interaktif Toggle) */}
                <div 
                    onClick={(e) => toggleTooltip('threshold', e)}
                    className={`tooltip-trigger group relative bg-slate-900/50 border rounded-xl p-5 flex flex-row md:flex-col items-center md:items-start gap-4 transition-all cursor-pointer ${activeTooltip === 'threshold' ? 'border-rose-500 bg-slate-800 ring-2 ring-rose-500/20' : 'border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'}`}
                >
                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl text-xs text-slate-300 transition-all z-20 pointer-events-none ${activeTooltip === 'threshold' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        {t.threshold_tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </div>

                    <div className="p-2 bg-slate-800 rounded-lg shrink-0 border border-slate-700 relative">
                        <IconFire />
                        <div className={`absolute -top-1 -right-1 rounded-full p-0.5 transition-colors ${activeTooltip === 'threshold' ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-400'}`}><IconInfo /></div>
                    </div>
                    <div>
                        <h3 className={`text-lg font-bold transition-colors ${activeTooltip === 'threshold' ? 'text-rose-400' : 'text-white'}`}>{t.threshold_title}</h3>
                        <div className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t.threshold_sub}</div>
                        <p className="text-slate-400 text-xs leading-relaxed">{t.threshold_desc}</p>
                    </div>
                </div>

                {/* 3. Economy - Tooltip ile (Interaktif Toggle) */}
                <div 
                    onClick={(e) => toggleTooltip('economy', e)}
                    className={`tooltip-trigger group relative bg-slate-900/50 border rounded-xl p-5 flex flex-row md:flex-col items-center md:items-start gap-4 transition-all cursor-pointer ${activeTooltip === 'economy' ? 'border-emerald-500 bg-slate-800 ring-2 ring-emerald-500/20' : 'border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'}`}
                >
                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl text-xs text-slate-300 transition-all z-20 pointer-events-none ${activeTooltip === 'economy' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        {t.economy_tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </div>

                    <div className="p-2 bg-slate-800 rounded-lg shrink-0 border border-slate-700 relative">
                        <IconGear />
                        <div className={`absolute -top-1 -right-1 rounded-full p-0.5 transition-colors ${activeTooltip === 'economy' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}><IconInfo /></div>
                    </div>
                    <div>
                        <h3 className={`text-lg font-bold transition-colors ${activeTooltip === 'economy' ? 'text-emerald-400' : 'text-white'}`}>{t.economy_title}</h3>
                        <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t.economy_sub}</div>
                        <p className="text-slate-400 text-xs leading-relaxed">{t.economy_desc}</p>
                    </div>
                </div>

                {/* 4. Durability - Tooltip ile (Interaktif Toggle) */}
                <div 
                    onClick={(e) => toggleTooltip('durability', e)}
                    className={`tooltip-trigger group relative bg-slate-900/50 border rounded-xl p-5 flex flex-row md:flex-col items-center md:items-start gap-4 transition-all cursor-pointer ${activeTooltip === 'durability' ? 'border-amber-500 bg-slate-800 ring-2 ring-amber-500/20' : 'border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'}`}
                >
                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl text-xs text-slate-300 transition-all z-20 pointer-events-none ${activeTooltip === 'durability' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        {t.resilience_tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </div>

                    <div className="p-2 bg-slate-800 rounded-lg shrink-0 border border-slate-700 relative">
                        <IconShield />
                        <div className={`absolute -top-1 -right-1 rounded-full p-0.5 transition-colors ${activeTooltip === 'durability' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-400'}`}><IconInfo /></div>
                    </div>
                    <div>
                        <h3 className={`text-lg font-bold transition-colors ${activeTooltip === 'durability' ? 'text-amber-400' : 'text-white'}`}>{t.resilience_title}</h3>
                        <div className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t.resilience_sub}</div>
                        <p className="text-slate-400 text-xs leading-relaxed">{t.resilience_desc}</p>
                    </div>
                </div>

            </div>

            {/* Denklem Bölümü */}
            <div className="w-full bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 mb-10 relative overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.eq_title}</h3>
                        <p className="text-slate-500 text-xs mb-4 max-w-prose">
                            {t.eq_desc}
                        </p>
                        <p className="text-slate-600 text-[10px] italic mb-1">
                            {t.eq_note}
                        </p>
                        <p className="text-slate-500 text-[10px] italic">
                            {t.eq_fractional_note}
                        </p>
                    </div>

                    {/* LaTeX Formülü (Zamana Bağlı) */}
                    <div className="bg-black/30 px-6 py-4 rounded-xl border border-white/5 text-lg md:text-xl text-emerald-300 overflow-x-auto min-w-[200px] text-center shadow-lg">
                        {`$$ v(t) = \\frac{VO_{2max} \\times f_{util}(t)}{Cr(t)} $$`}
                    </div>
                </div>

                {/* Resilience Açıklaması (Safe JSX) */}
                <div className="mt-6 pt-6 border-t border-slate-800 flex items-start gap-3">
                    <div className="mt-1 text-amber-400 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-amber-400 block mb-1">{t.resilience_factor_title}</strong>
                        {t.resilience_factor_text_1} <span className="text-emerald-300 font-mono">{t.resilience_factor_highlight_time}</span> {t.resilience_factor_text_2}{" "}
                        <span className="text-rose-400 font-bold">{t.resilience_factor_highlight_1}</span> {t.resilience_factor_text_3}{" "}
                        <span className="text-rose-400 font-bold">{t.resilience_factor_highlight_2}</span>
                        {t.resilience_factor_text_4}
                    </p>
                </div>
            </div>

            {/* Fark Notu */}
            <div className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-5 mb-10 text-xs">
                <h4 className="font-bold text-slate-300 mb-3">{t.diff_title}</h4>
                <p className="text-slate-500 mb-4">{t.diff_desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <div className="text-cyan-400 font-bold mb-1">{t.diff_endurance}</div>
                        <div className="text-slate-400 italic">{t.diff_endurance_ex}</div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <div className="text-amber-400 font-bold mb-1">{t.diff_durability}</div>
                        <div className="text-slate-400 italic">{t.diff_durability_ex}</div>
                    </div>
                </div>
            </div>

            {/* Referanslar */}
            <div className="w-full border-t border-slate-700/50 pt-8">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{t.ref_title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {[t.ref_1, t.ref_2, t.ref_3, t.ref_4, t.ref_5, t.ref_6].map((ref, idx) => {
                        const colors = ["bg-cyan-500", "bg-rose-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-blue-500"];
                        return (
                            <div key={idx} className="text-[11px] text-slate-500 flex items-center">
                                <span className={`w-1.5 h-1.5 ${colors[idx % colors.length]} rounded-full mr-2 opacity-70`}></span>
                                <span>{ref}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
};

// Global'e aktar
window.RunningPerformancePage = RunningPerformancePage;
