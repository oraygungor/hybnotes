// Global React objesinden hook'ları alıyoruz
const { useState, useMemo } = React;

// --- VERİ VE SABİTLER ---
const STATION_DATA = {
    run1: { defaultTime: 270, p10: 210, p90: 380, min: 180, max: 480 },
    run2: { defaultTime: 280, p10: 215, p90: 390, min: 180, max: 480 },
    run3: { defaultTime: 290, p10: 220, p90: 400, min: 180, max: 500 },
    run4: { defaultTime: 300, p10: 225, p90: 410, min: 180, max: 500 },
    run5: { defaultTime: 300, p10: 230, p90: 420, min: 180, max: 500 },
    run6: { defaultTime: 310, p10: 235, p90: 430, min: 180, max: 520 },
    run7: { defaultTime: 310, p10: 240, p90: 440, min: 180, max: 520 },
    run8: { defaultTime: 330, p10: 260, p90: 480, min: 180, max: 600 },
    ws1: { defaultTime: 265, p10: 230, p90: 290, min: 180, max: 360 }, // Ski
    ws2: { defaultTime: 170, p10: 120, p90: 280, min: 60, max: 420 },  // Push
    ws3: { defaultTime: 280, p10: 200, p90: 460, min: 100, max: 600 }, // Pull
    ws4: { defaultTime: 320, p10: 230, p90: 550, min: 120, max: 720 }, // Burpees
    ws5: { defaultTime: 285, p10: 250, p90: 320, min: 200, max: 380 }, // Row
    ws6: { defaultTime: 120, p10: 90,  p90: 180, min: 60, max: 240 },  // Farmers
    ws7: { defaultTime: 290, p10: 200, p90: 520, min: 120, max: 720 }, // Lunges
    ws8: { defaultTime: 380, p10: 270, p90: 620, min: 180, max: 900 }, // Wallballs
    roxzone: { defaultTime: 360, p10: 270, p90: 660, min: 120, max: 1200 },
};

const BENCHMARKS = {
    totalRun: { p10: 1800, p90: 3300 },
    totalWork: { p10: 1800, p90: 3000 },
    totalRox: { p10: 270,  p90: 660 },
    totalAll: { p10: 4200, p90: 6800 }
};

const TRANSLATIONS = {
    tr: {
        header: "HYROX Süre Hesaplama",
        running_header: "Koşular (1km x 8)",
        sync_placeholder: "04:30",
        sync_button: "EŞİTLE",
        workouts_header: "İstasyonlar",
        roxzone_header: "Roxzone (Geçişler)",
        results_header: "Tahmini Sonuç",
        total_time_label: "Toplam Süre",
        total_run_label: "Toplam Koşu",
        total_workout_label: "Toplam İstasyon",
        total_roxzone_label: "Toplam Roxzone",
        pct_prefix_overall: "Genel: İlk %",
        pct_prefix_station: "İlk %",
        stations: {
            run1: "1. Koşu", run2: "2. Koşu", run3: "3. Koşu", run4: "4. Koşu",
            run5: "5. Koşu", run6: "6. Koşu", run7: "7. Koşu", run8: "8. Koşu",
            ws1: "SkiErg", ws2: "Sled Push", ws3: "Sled Pull", ws4: "Burpees",
            ws5: "Row", ws6: "Farmers", ws7: "Lunges", ws8: "Wall Balls",
            roxzone: "Toplam Roxzone"
        }
    },
    en: {
        header: "HYROX Time Calculator",
        running_header: "Runs (1km x 8)",
        sync_placeholder: "04:30",
        sync_button: "SYNC",
        workouts_header: "Workouts",
        roxzone_header: "Roxzone (Transitions)",
        results_header: "Estimated Result",
        total_time_label: "Total Time",
        total_run_label: "Total Running",
        total_workout_label: "Total Workouts",
        total_roxzone_label: "Total Roxzone",
        pct_prefix_overall: "Overall: Top %",
        pct_prefix_station: "Top %",
        stations: {
            run1: "Run 1", run2: "Run 2", run3: "Run 3", run4: "Run 4",
            run5: "Run 5", run6: "Run 6", run7: "Run 7", run8: "Run 8",
            ws1: "SkiErg", ws2: "Sled Push", ws3: "Sled Pull", ws4: "Burpees",
            ws5: "Row", ws6: "Farmers", ws7: "Lunges", ws8: "Wall Balls",
            roxzone: "Total Roxzone"
        }
    }
};

// --- HELPER FUNCTIONS ---
const formatMMSS = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const formatHHMMSS = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const parseTime = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [m, s] = timeStr.split(':').map(x => parseInt(x, 10));
    return (m * 60) + (s || 0);
};

const calculatePercentile = (time, p10, p90) => {
    const pct = 10 + ((time - p10) / (p90 - p10)) * 80;
    return Math.min(Math.max(pct, 0.1), 99.9);
};

const getPctColor = (pct) => {
    if (pct <= 10) return 'text-cyan-400';
    if (pct <= 25) return 'text-green-400';
    if (pct <= 50) return 'text-amber-400';
    if (pct <= 75) return 'text-orange-400';
    return 'text-rose-400';
};

// Slider Style
const sliderStyle = {
    WebkitAppearance: 'none',
    width: '100%',
    height: '6px',
    background: '#334155', // slate-700
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    display: 'block',
    margin: '10px 0'
};

// --- Eşitleme Paneli Bileşeni (DIŞARI ALINDI - Focus sorunu çözümü) ---
// Bu bileşen artık render sırasında tekrar yaratılmayacak
const SyncControl = ({ syncInput, setSyncInput, handleSync, t }) => (
    <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-lg border border-slate-700/50 backdrop-blur-sm shadow-lg w-auto">
        <input 
            type="text" 
            placeholder={t.sync_placeholder} 
            value={syncInput}
            onChange={(e) => setSyncInput(e.target.value)}
            className="w-20 bg-transparent text-center text-sm text-white focus:outline-none font-mono font-bold"
        />
        <button 
            onClick={handleSync}
            className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded text-xs font-bold transition-colors shadow-lg active:scale-95 transform whitespace-nowrap"
        >
            {t.sync_button}
        </button>
    </div>
);

// --- SUB-COMPONENT: SliderGroup ---
const SliderGroup = ({ keys, title, colorClass, icon, values, onChange, t, extraHeaderContent }) => (
    <section className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl relative overflow-hidden isolate">
        <div className={`absolute -top-10 -right-10 w-48 h-48 ${colorClass} rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none -z-10`}></div>
        
        {/* Header Alanı: Mobilde düzgün akış, Masaüstünde yan yana */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 relative z-10">
            <h2 className={`text-2xl font-black flex items-center gap-2 ${colorClass.replace('bg-', 'text-')}`}>
                {icon} {title}
            </h2>
            {/* Ekstra içerik (Sync butonu) artık ortalanmıyor, doğal akışında */}
            {extraHeaderContent && (
                <div className="flex-shrink-0 self-start sm:self-auto">
                    {extraHeaderContent}
                </div>
            )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
            {keys.map(key => {
                const data = STATION_DATA[key];
                const val = values[key];
                const pct = calculatePercentile(val, data.p10, data.p90);
                
                const accentColor = colorClass.includes('rose') ? 'accent-rose-500' 
                                  : colorClass.includes('indigo') ? 'accent-indigo-500' 
                                  : 'accent-cyan-400';

                return (
                    <div key={key} className="space-y-2">
                        <div className="flex justify-between items-end">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {t.stations[key]}
                            </label>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold ${getPctColor(pct)}`}>
                                    {t.pct_prefix_station}{pct.toFixed(1)}
                                </span>
                                <span className="font-mono text-sm font-bold text-white bg-slate-900 px-3 py-1 rounded border border-slate-700 w-20 text-center shadow-inner">
                                    {formatMMSS(val)}
                                </span>
                            </div>
                        </div>
                        
                        <input 
                            type="range" 
                            min={data.min} 
                            max={data.max} 
                            value={val} 
                            onChange={(e) => onChange(key, e.target.value)}
                            style={sliderStyle}
                            className={`w-full ${accentColor}`}
                        />
                    </div>
                );
            })}
        </div>
    </section>
);

// --- MAIN COMPONENT ---
const HyroxCalculatorPage = ({ lang = 'tr', activeTheme }) => {
    
    const [values, setValues] = useState(() => {
        const initial = {};
        Object.keys(STATION_DATA).forEach(key => {
            initial[key] = STATION_DATA[key].defaultTime;
        });
        return initial;
    });
    
    const [syncInput, setSyncInput] = useState("");
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

    const stats = useMemo(() => {
        let runSum = 0, workSum = 0, roxSum = 0;
        
        Object.entries(values).forEach(([key, val]) => {
            if (key.startsWith('run')) runSum += val;
            else if (key.startsWith('ws')) workSum += val;
            else if (key === 'roxzone') roxSum += val;
        });

        const total = runSum + workSum + roxSum;
        
        return {
            total,
            runSum,
            workSum,
            roxSum,
            totalPct: calculatePercentile(total, BENCHMARKS.totalAll.p10, BENCHMARKS.totalAll.p90),
            runPct: calculatePercentile(runSum, BENCHMARKS.totalRun.p10, BENCHMARKS.totalRun.p90),
            workPct: calculatePercentile(workSum, BENCHMARKS.totalWork.p10, BENCHMARKS.totalWork.p90),
            roxPct: calculatePercentile(roxSum, BENCHMARKS.totalRox.p10, BENCHMARKS.totalRox.p90)
        };
    }, [values]);

    const handleSliderChange = (key, val) => {
        setValues(prev => ({ ...prev, [key]: parseInt(val, 10) }));
    };

    const handleSync = () => {
        const seconds = parseTime(syncInput);
        if (seconds <= 0) return;

        setValues(prev => {
            const next = { ...prev };
            for (let i = 1; i <= 8; i++) {
                let adjusted = seconds;
                if (i === 8) adjusted = seconds * 1.1; 
                
                const key = `run${i}`;
                const limit = STATION_DATA[key];
                next[key] = Math.min(Math.max(adjusted, limit.min), limit.max);
            }
            return next;
        });
    };

    return (
        <div className="animate-fade-in space-y-8 pb-20">
            {/* Header */}
            <div className="text-center mb-10 space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
                    <span className="text-amber-400">HYROX</span> {t.header.replace('HYROX ', '')}
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    {/* Koşular */}
                    <div>
                        <SliderGroup 
                            keys={['run1','run2','run3','run4','run5','run6','run7','run8']} 
                            title={t.running_header} 
                            colorClass="bg-rose-500"
                            icon={<span>🏃</span>}
                            values={values}
                            onChange={handleSliderChange}
                            t={t}
                            extraHeaderContent={
                                <SyncControl 
                                    syncInput={syncInput}
                                    setSyncInput={setSyncInput}
                                    handleSync={handleSync}
                                    t={t}
                                />
                            }
                        />
                    </div>

                    {/* İstasyonlar */}
                    <SliderGroup 
                        keys={['ws1','ws2','ws3','ws4','ws5','ws6','ws7','ws8']} 
                        title={t.workouts_header} 
                        colorClass="bg-indigo-500"
                        icon={<span>🏋️</span>}
                        values={values}
                        onChange={handleSliderChange}
                        t={t}
                    />

                    {/* Roxzone */}
                    <section className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl relative overflow-hidden isolate">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none -z-10"></div>
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-cyan-400 relative z-10">
                            <span>⏱️</span> {t.roxzone_header}
                        </h2>
                        <div className="space-y-3 max-w-xl relative z-10">
                            <div className="flex justify-between items-end">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.stations.roxzone}</label>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold ${getPctColor(stats.roxPct)}`}>
                                        {t.pct_prefix_station}{stats.roxPct.toFixed(1)}
                                    </span>
                                    <span className="font-mono text-sm font-bold text-white bg-slate-900 px-3 py-1 rounded border border-slate-700 w-20 text-center shadow-inner">
                                        {formatMMSS(values.roxzone)}
                                    </span>
                                </div>
                            </div>
                            <input 
                                type="range" 
                                min={STATION_DATA.roxzone.min} 
                                max={STATION_DATA.roxzone.max} 
                                value={values.roxzone} 
                                onChange={(e) => handleSliderChange('roxzone', e.target.value)}
                                style={sliderStyle}
                                className="w-full accent-cyan-400"
                            />
                        </div>
                    </section>
                </div>

                {/* Sağ Taraf: Sonuç Paneli */}
                <div className="lg:col-span-4">
                    <div className="bg-slate-800 rounded-2xl border-t-4 border-t-amber-500 border-x border-b border-slate-700 p-8 shadow-2xl lg:sticky lg:top-24">
                        <h2 className="text-lg font-bold text-center mb-8 uppercase tracking-[0.2em] text-slate-400">
                            {t.results_header}
                        </h2>
                        
                        <div className="text-center mb-10">
                            <div className="text-xs font-bold text-slate-500 mb-2 uppercase">{t.total_time_label}</div>
                            <div className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter tabular-nums">
                                {formatHHMMSS(stats.total)}
                            </div>
                            <div className={`mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-slate-900 border ${getPctColor(stats.totalPct).replace('text-','border-')} ${getPctColor(stats.totalPct)}`}>
                                {t.pct_prefix_overall}{stats.totalPct.toFixed(1)}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 flex justify-between items-center group hover:bg-slate-900 transition-colors">
                                <div>
                                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">{t.total_run_label}</span>
                                    <div className="text-xl font-bold font-mono text-white">{formatMMSS(stats.runSum)}</div>
                                </div>
                                <div className={`text-xs font-bold ${getPctColor(stats.runPct)}`}>%{stats.runPct.toFixed(1)}</div>
                            </div>
                            
                            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 flex justify-between items-center group hover:bg-slate-900 transition-colors">
                                <div>
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">{t.total_workout_label}</span>
                                    <div className="text-xl font-bold font-mono text-white">{formatMMSS(stats.workSum)}</div>
                                </div>
                                <div className={`text-xs font-bold ${getPctColor(stats.workPct)}`}>%{stats.workPct.toFixed(1)}</div>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 flex justify-between items-center group hover:bg-slate-900 transition-colors">
                                <div>
                                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">{t.total_roxzone_label}</span>
                                    <div className="text-xl font-bold font-mono text-white">{formatMMSS(stats.roxSum)}</div>
                                </div>
                                <div className={`text-xs font-bold ${getPctColor(stats.roxPct)}`}>%{stats.roxPct.toFixed(1)}</div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                            <p className="text-[10px] text-slate-500 leading-relaxed italic">
                                * Percentiles based on HYResult database statistics.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Global erişim için window'a ata
window.HyroxCalculatorPage = HyroxCalculatorPage;
