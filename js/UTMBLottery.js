const UTMBLotteryPage = ({ lang }) => {
    const { useState, useMemo, useEffect, useRef, useCallback } = React;
    
    // --- STATE ---
    const [race, setRace] = useState('UTMB');
    const [method, setMethod] = useState('cagr');
    const [stones, setStones] = useState(1);
    
    const [model, setModel] = useState('heuristic'); 
    const [biasK, setBiasK] = useState(1.30);
    const [mcSettings, setMcSettings] = useState({ sims: 500, seed: 12345 });
    const [mcResult, setMcResult] = useState(null);
    const [isMcRunning, setIsMcRunning] = useState(false);

    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const formulaRef = useRef(null); 

    // --- UTILS: SEEDED RNG (Mulberry32) ---
    // Seed parametresini gerçekten kullanarak deterministik sayı üretir.
    const mulberry32 = (a) => {
        return () => {
            let t = a += 0x6D2B79F5;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    };

    // --- DATA ---
    const data = useMemo(() => ({ 
        UTMB: { capacity: 2300, demand: { 2023: 6578, 2024: 7200, 2025: 8900 }, meanStones: { 2024: 5.4, 2025: 6.4 } }, 
        CCC: { capacity: 1900, demand: { 2023: 5249, 2024: 5400, 2025: 6000 }, meanStones: { 2024: 4.0, 2025: 4.4 } }, 
        OCC: { capacity: 1200, demand: { 2023: 5171, 2024: 6500, 2025: 10000 }, meanStones: { 2024: 2.8, 2025: 3.2 } } 
    }), []);

    // --- TRANSLATIONS (DÜZELTİLDİ: Eksik key'ler eklendi) ---
    const tr = {
        EN: {
            title: "UTMB 2026 Lottery Analytics",
            subtitle: "Advanced probability modeling with Heuristic, Bias Correction & Monte Carlo simulations.",
            raceLabel: "Race",
            methodLabel: "Projection Method",
            modelLabel: "Calculation Model",
            modelHeuristic: "Heuristic (Standard)",
            modelBias: "Heuristic + Bias",
            modelMC: "Monte Carlo Sim.",
            modelEnsemble: "All Models (Range)",
            biasLabel: "Bias Factor (k)",
            biasExplainer: (k) => `Winners remove ${k}x more stones than average. Total pool size remains fixed, but drains faster.`,
            mcSimsLabel: "Sims",
            mcSeedLabel: "Seed",
            mcRunBtn: "Run Simulation",
            mcRunning: "Running...",
            stonesLabelPrefix: "Running Stones: ",
            probLabel: "Probability",
            rangeLabel: "Est. Range",
            demandLabel: "2026 Demand",
            avgStonesLabel: "Avg. Stones",
            dataTitle: "Data & Projection",
            tableYear: "Year",
            tableDemand: "Demand",
            tableAvgStones: "Avg. Stones",
            tableProjection: "2026 (Proj.)",
            modelTitle: "Mathematical Model",
            formulaTitle: "Model Formula:",
            mcWarn: "Run simulation to see MC data.",
            defP: "Prob. of winning",
            defW: "Your Stones",
            defB: "Capacity",
            defN: "Total Applicants", // EKLENDİ
            defT: "Total Pool Stones (Fixed)",
            defMu: "Removal Rate (µ_eff)",
            defValT: "Pool Size: ", // EKLENDİ
            chartY: "Probability (%)",
            tooltipSuffix: " Stones",
            noteTitle: "Model Note:",
            noteHeuristic: "Assumes winners remove exactly the average number of stones.",
            noteBias: "Assumes winners have more stones (k*µ), draining the fixed pool faster.",
            noteMC: "Simulates the actual weighted lottery draw N times.",
            locale: "en-US"
        },
        TR: {
            title: "UTMB 2026 Kura Analizi",
            subtitle: "Heuristic, Bias Düzeltme ve Monte Carlo simülasyonları ile gelişmiş olasılık modellemesi.",
            raceLabel: "Yarış",
            methodLabel: "Talep Tahmini",
            modelLabel: "Hesaplama Modeli",
            modelHeuristic: "Heuristic (Standart)",
            modelBias: "Heuristic + Bias",
            modelMC: "Monte Carlo Sim.",
            modelEnsemble: "Tüm Modeller (Aralık)",
            biasLabel: "Bias Çarpanı (k)",
            biasExplainer: (k) => `Kazananlar ortalamanın ${k} katı taş götürür. Toplam havuz SABİTTİR, ancak daha hızlı boşalır (Şansınızı artırır).`,
            mcSimsLabel: "Sims",
            mcSeedLabel: "Seed",
            mcRunBtn: "Simülasyonu Başlat",
            mcRunning: "Hesaplanıyor...",
            stonesLabelPrefix: "Taş Sayısı: ",
            probLabel: "Olasılık",
            rangeLabel: "Tahmini Aralık",
            demandLabel: "2026 Talep",
            avgStonesLabel: "Ort. Taş",
            dataTitle: "Veri ve Projeksiyon",
            tableYear: "Yıl",
            tableDemand: "Talep",
            tableAvgStones: "Ort. Taş",
            tableProjection: "2026 (Tahmin)",
            modelTitle: "Matematiksel Model ve Tanımlar",
            formulaTitle: "Model Formülü:",
            mcWarn: "MC verisi için simülasyonu çalıştırın.",
            defP: "Kazanma Olasılığı",
            defW: "Sizin Taşınız",
            defB: "Kontenjan",
            defN: "Toplam Başvuru", // EKLENDİ
            defT: "Toplam Havuz (Sabit)",
            defMu: "Eksilme Hızı (µ_eff)",
            defValT: "Havuz: ", // EKLENDİ
            chartY: "Olasılık (%)",
            tooltipSuffix: " Taş",
            noteTitle: "Model Notu:",
            noteHeuristic: "Kazananların tam olarak ortalama taş (µ) eksilttiğini varsayar.",
            noteBias: "Kazananların çok taşı olduğunu (k*µ) ve sabit havuzun hızlı boşaldığını varsayar.",
            noteMC: "Ağırlıklı kurayı birebir N kez simüle eder.",
            locale: "tr-TR"
        }
    };
    const t = lang === 'tr' ? tr.TR : tr.EN;

    const cagr = (v1, v2, f = 1) => Math.round(v2 * (1 + (Math.pow(v2 / v1, 1 / 2) - 1) * f));

    // --- PROBABILITY FUNCTIONS ---
    const getProb = (B, N, poolMean, removalMean, w) => { 
        if (w <= 0) return 0; 
        const T = (N - 1) * poolMean + w; 
        let logNoHit = 0; 
        const L = Math.min(B, N); 
        for (let i = 0; i < L; i++) {
            const stonesRemoved = i * removalMean;
            const currentPool = Math.max(1e-9, T - stonesRemoved);
            if (currentPool <= w) return 1;
            logNoHit += Math.log(currentPool - w) - Math.log(currentPool);
        }
        return 1 - Math.exp(logNoHit); 
    };

    // DÜZELTİLDİ: RNG parametresi alıyor, Seeded çalışıyor
    const generateRandomStones = (mean, rng) => {
        if (mean <= 1.01) return 1;
        const lambda = 1 / (mean - 1);
        const u = rng(); // Seeded random
        const val = 1 + Math.floor(-Math.log(1 - u) / lambda);
        return Math.max(1, Math.min(100, val));
    };

    const vals = useMemo(() => {
        const d = data[race].demand;
        const N = method === 'linear' 
            ? Math.round(d[2025] + (d[2025] - d[2023]) / 2) 
            : method === 'conservative' ? cagr(d[2023], d[2025], 0.7) : method === 'optimistic' ? cagr(d[2023], d[2025], 1.3) : cagr(d[2023], d[2025], 1);
        
        const mS = data[race].meanStones;
        const meanRaw = method === 'linear' 
            ? mS[2025] + (mS[2025] - mS[2024]) 
            : mS[2025] * (1 + (mS[2025] / mS[2024] - 1) * (method === 'conservative' ? 0.7 : method === 'optimistic' ? 1.3 : 1));
        
        const mean = Math.max(1.1, meanRaw);
        const B = data[race].capacity;

        const pHeuristic = getProb(B, N, mean, mean, stones);
        const removalMean = mean * biasK;
        const pBias = getProb(B, N, mean, removalMean, stones);
        
        const totalPool = (N - 1) * mean + stones; 
        const effectiveRemoval = model === 'bias' ? removalMean : mean;

        return { N, mean, B, pHeuristic, pBias, totalPool, effectiveRemoval };
    }, [race, method, stones, biasK, data, model]);

    // --- MC RUNNER (DÜZELTİLDİ: Seeded RNG Kullanımı) ---
    const runSimulation = useCallback(() => {
        setIsMcRunning(true);
        setTimeout(() => {
            const { N, B, mean } = vals;
            const { sims, seed } = mcSettings;
            
            // Seeded RNG oluştur
            const rng = mulberry32(seed >>> 0); // integer cast

            let wins = 0;
            for (let s = 0; s < sims; s++) {
                // User Key Generation (Seeded)
                const rUser = rng();
                const kUser = Math.pow(rUser, 1 / stones);
                
                let rank = 0;
                // Competitor Loop
                for (let i = 0; i < N - 1; i++) {
                    const wComp = generateRandomStones(mean, rng); // Seeded distribution
                    const kComp = Math.pow(rng(), 1 / wComp);
                    if (kComp > kUser) rank++;
                    if (rank >= B) break; 
                }
                if (rank < B) wins++;
            }
            // Wilson Interval
            const z = 1.96;
            const n = sims;
            const p = wins/n;
            const center = (p + z*z/(2*n)) / (1 + z*z/n);
            const width = z * Math.sqrt(p*(1-p)/n + z*z/(4*n*n)) / (1 + z*z/n);
            
            setMcResult({ pHat: wins / sims, ciLow: Math.max(0, center-width), ciHigh: Math.min(1, center+width), wins, sims, seed });
            setIsMcRunning(false);
        }, 50);
    }, [vals, stones, mcSettings]);

    useEffect(() => { setMcResult(null); }, [race, method, stones]);

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        const labels = Array.from({length: 50}, (_, i) => i + 1);
        const { B, N, mean } = vals;
        
        const getH = (w) => getProb(B, N, mean, mean, w) * 100;
        const getB = (w) => getProb(B, N, mean, mean * biasK, w) * 100;

        const datasets = [];
        const c1 = '99, 102, 241'; 
        const c2 = '236, 72, 153'; 
        const c3 = '16, 185, 129'; 

        if (['heuristic', 'ensemble', 'bias'].includes(model)) {
            datasets.push({ label: 'Heuristic', data: labels.map(w => getH(w)), borderColor: `rgba(${c1}, 0.8)`, backgroundColor: `rgba(${c1}, 0.1)`, pointRadius: 0, borderWidth: 2, fill: model === 'heuristic', tension: 0.4 });
        }
        if (['bias', 'ensemble'].includes(model)) {
            datasets.push({ label: `Bias (k=${biasK})`, data: labels.map(w => getB(w)), borderColor: `rgba(${c2}, 0.8)`, backgroundColor: `rgba(${c2}, 0.05)`, borderDash: [5, 5], pointRadius: 0, borderWidth: 2, tension: 0.4 });
        }
        if (['mc', 'ensemble'].includes(model) && mcResult) {
            // DÜZELTİLDİ: Null safety in tooltip logic handled below, data point is fine
            datasets.push({ label: 'Monte Carlo', data: labels.map(w => w === stones ? mcResult.pHat * 100 : null), borderColor: `rgba(${c3}, 1)`, backgroundColor: `rgba(${c3}, 1)`, pointRadius: 6, pointStyle: 'rectRot', showLine: false });
        }

        chartInstance.current = new Chart(ctx, { 
            type: 'line', 
            data: { labels, datasets }, 
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { display: model === 'ensemble' }, 
                    tooltip: { 
                        callbacks: { 
                            title: i=>`${i[0].label} ${t.tooltipSuffix}`, 
                            label: (i) => {
                                // DÜZELTİLDİ: Null/NaN değerleri tooltip'te gösterme
                                if (i.raw === null || i.raw === undefined) return null;
                                return `${i.dataset.label}: ${parseFloat(i.formattedValue).toFixed(2)}%`;
                            }
                        } 
                    } 
                }, 
                scales: { y: { beginAtZero: true, max: 100, grid: { color: 'rgba(148, 163, 184, 0.1)' }, ticks: { color: '#94a3b8' }, title: { display: true, text: t.chartY, color: '#94a3b8' } }, x: { grid: { display: false }, ticks: { color: '#94a3b8' } } } 
            } 
        });
        return () => chartInstance.current?.destroy();
    }, [vals, stones, model, mcResult, biasK, t]);

    useEffect(() => {
        if (window.renderMathInElement && formulaRef.current) {
            window.renderMathInElement(formulaRef.current, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
        }
    }, [lang, race, method, stones, model, mcResult, biasK]);

    const getFormulaContent = () => {
        const { pHeuristic, pBias } = vals;
        
        // DÜZELTİLDİ: Akademik gösterim (L ve T tanımları eklendi)
        const hTex = `
            $$ T=(N-1)\\mu + w, \\quad L=\\min(B,N) $$
            $$ p \\approx 1 - \\prod_{i=0}^{L-1} \\frac{T - w - (i \\cdot \\mu)}{T - (i \\cdot \\mu)} $$`;
        
        const bTex = `
            $$ T=(N-1)\\mu + w, \\quad \\mu_{eff} = \\mu \\cdot ${biasK} $$
            $$ p \\approx 1 - \\prod_{i=0}^{L-1} \\frac{T - w - (i \\cdot \\mu_{eff})}{T - (i \\cdot \\mu_{eff})} $$`;
        
        const mcTex = `
            $$ k_i = u_i^{1/w_i}, \\quad \\text{Winners} = \\text{top-}B\\ \\{k_i\\} $$
            $$ \\hat{p} = \\frac{\\text{wins}}{\\text{sims}} \\quad (\\text{Weighted w/o Repl.}) $$`;

        if (model === 'heuristic') return `<div class="mb-2 text-xs uppercase font-bold text-indigo-400">Heuristic Model</div>${hTex}<div class="text-center mt-2 text-indigo-300">p = ${(pHeuristic * 100).toFixed(2)}%</div>`;
        if (model === 'bias') return `<div class="mb-2 text-xs uppercase font-bold text-pink-400">Bias Corrected Model</div>${bTex}<div class="text-center mt-2 text-pink-300">p = ${(pBias * 100).toFixed(2)}%</div>`;
        if (model === 'mc') return `<div class="mb-2 text-xs uppercase font-bold text-emerald-400">Monte Carlo Simulation</div>${mcTex}<div class="text-center mt-2 text-emerald-300">${mcResult ? `$\\hat{p} = ${(mcResult.pHat * 100).toFixed(2)}\\%$` : t.mcWarn}</div>`;
        return `<div class="grid grid-cols-1 gap-2 text-xs"><div><span class="text-indigo-400 font-bold">H:</span> $p \\approx ${(pHeuristic*100).toFixed(2)}\\%$</div><div><span class="text-pink-400 font-bold">B:</span> $p \\approx ${(pBias*100).toFixed(2)}\\%$</div><div><span class="text-emerald-400 font-bold">MC:</span> ${mcResult ? `$${(mcResult.pHat*100).toFixed(2)}\\%$` : 'N/A'}</div></div>`;
    };

    return (
        <div className="bg-slate-800 text-slate-200 rounded-3xl p-6 max-w-[1100px] mx-auto border border-slate-700 shadow-2xl animate-fade-in font-sans">
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-black mb-2">{t.title}</h1>
                <div className="text-slate-400 text-sm md:text-base">{t.subtitle}</div>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-5 mb-5">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 flex flex-col gap-4 shadow-lg">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">{t.raceLabel}</label>
                            <select value={race} onChange={e=>setRace(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white text-xs p-2 rounded-lg focus:outline-none focus:border-indigo-500">
                                <option value="UTMB">UTMB</option><option value="CCC">CCC</option><option value="OCC">OCC</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">{t.methodLabel}</label>
                            <select value={method} onChange={e=>setMethod(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white text-xs p-2 rounded-lg focus:outline-none focus:border-indigo-500">
                                <option value="cagr">CAGR</option><option value="linear">Linear</option><option value="conservative">Consv.</option><option value="optimistic">Optim.</option>
                            </select>
                        </div>
                    </div>
                    <hr className="border-slate-800" />
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-indigo-400 uppercase">{t.modelLabel}</label>
                        <select value={model} onChange={e=>setModel(e.target.value)} className="w-full bg-slate-800 border border-indigo-900/50 text-indigo-100 p-2 rounded-lg focus:outline-none focus:border-indigo-500 font-bold text-sm">
                            <option value="heuristic">{t.modelHeuristic}</option><option value="bias">{t.modelBias}</option><option value="mc">{t.modelMC}</option><option value="ensemble">{t.modelEnsemble}</option>
                        </select>
                    </div>

                    {model === 'bias' && (
                        <div className="bg-pink-900/20 p-3 rounded-xl border border-pink-900/30">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-pink-400 mb-1"><span>{t.biasLabel}</span><span>{biasK}</span></div>
                            <input type="range" min="1.0" max="2.0" step="0.05" value={biasK} onChange={e=>setBiasK(parseFloat(e.target.value))} className="w-full h-1 bg-pink-900 rounded-lg appearance-none cursor-pointer accent-pink-500"/>
                            <div className="mt-2 text-[10px] text-pink-200/70 leading-tight">{t.biasExplainer(biasK)}</div>
                        </div>
                    )}

                    {(model === 'mc' || model === 'ensemble') && (
                        <div className="bg-emerald-900/20 p-3 rounded-xl border border-emerald-900/30 flex flex-col gap-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[9px] uppercase font-bold text-emerald-400 block mb-0.5">{t.mcSimsLabel}</label>
                                    <select value={mcSettings.sims} onChange={e=>setMcSettings({...mcSettings, sims: parseInt(e.target.value)})} className="w-full bg-emerald-900/40 text-emerald-100 text-[10px] border border-emerald-800 rounded px-1 py-1">
                                        <option value="200">200</option><option value="500">500</option><option value="1000">1000</option><option value="2000">2000</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[9px] uppercase font-bold text-emerald-400 block mb-0.5">{t.mcSeedLabel}</label>
                                    <input type="number" value={mcSettings.seed} onChange={e=>setMcSettings({...mcSettings, seed: parseInt(e.target.value)})} className="w-full bg-emerald-900/40 text-emerald-100 text-[10px] border border-emerald-800 rounded px-1 py-1" />
                                </div>
                            </div>
                            <button onClick={runSimulation} disabled={isMcRunning} className={`w-full py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${isMcRunning ? 'bg-slate-700 text-slate-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'}`}>{isMcRunning ? t.mcRunning : t.mcRunBtn}</button>
                            {mcResult && <div className="text-[10px] text-emerald-200/70 text-center">Sims: {mcResult.sims} | Wins: {mcResult.wins}</div>}
                        </div>
                    )}

                    <Slider label={t.stonesLabelPrefix} val={stones} min={1} max={50} step={1} unit="" onChange={setStones} />

                    <div className="mt-2">
                        {model === 'ensemble' ? (
                            <div className="grid grid-cols-3 gap-1 text-center bg-slate-800 rounded-xl p-2 border border-slate-700">
                                <div className="flex flex-col"><span className="text-[9px] uppercase text-indigo-400 font-bold">Heur.</span><span className="text-sm font-bold text-white">{(vals.pHeuristic*100).toFixed(1)}%</span></div>
                                <div className="flex flex-col border-l border-slate-700"><span className="text-[9px] uppercase text-pink-400 font-bold">Bias</span><span className="text-sm font-bold text-white">{(vals.pBias*100).toFixed(1)}%</span></div>
                                <div className="flex flex-col border-l border-slate-700"><span className="text-[9px] uppercase text-emerald-400 font-bold">MC</span><span className={`text-sm font-bold ${mcResult ? 'text-white' : 'text-slate-500'}`}>{mcResult ? (mcResult.pHat*100).toFixed(1) + '%' : '-'}</span></div>
                                <div className="col-span-3 mt-1 pt-1 border-t border-slate-700 flex justify-between items-center px-2">
                                    <span className="text-[9px] text-slate-400">{t.rangeLabel}</span>
                                    <span className="text-xs font-mono font-bold text-amber-400">{mcResult ? `${Math.min(vals.pHeuristic, vals.pBias, mcResult.pHat).toLocaleString(undefined, {style:'percent', minimumFractionDigits:1})} - ${Math.max(vals.pHeuristic, vals.pBias, mcResult.pHat).toLocaleString(undefined, {style:'percent', minimumFractionDigits:1})}` : `${Math.min(vals.pHeuristic, vals.pBias).toLocaleString(undefined, {style:'percent', minimumFractionDigits:1})} - ${Math.max(vals.pHeuristic, vals.pBias).toLocaleString(undefined, {style:'percent', minimumFractionDigits:1})}`}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-center">
                                <h3 className="m-0 mb-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.probLabel}</h3>
                                <div className="text-[36px] font-black leading-none text-white tracking-tight">{model === 'mc' ? (mcResult ? (mcResult.pHat * 100).toFixed(2) : '---') : (model === 'bias' ? (vals.pBias * 100).toFixed(2) : (vals.pHeuristic * 100).toFixed(2))}%</div>
                                {model === 'mc' && mcResult && <div className="text-[10px] text-emerald-400 mt-1 font-mono">± {((mcResult.ciHigh - mcResult.pHat)*100).toFixed(2)}% (95% CI)</div>}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-4 h-[400px] md:h-auto flex flex-col relative shadow-lg w-full overflow-hidden">
                    <div className="flex-grow relative w-full h-full min-h-[300px]">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-lg">
                    <h3 className="text-white font-bold mb-4">{t.dataTitle}</h3>
                    <table className="w-full border-separate border-spacing-y-1 text-sm">
                        <thead><tr><th className="text-slate-500 text-[10px] uppercase font-bold p-2 text-left">{t.tableYear}</th><th className="text-slate-500 text-[10px] uppercase font-bold p-2 text-right">{t.tableDemand}</th><th className="text-slate-500 text-[10px] uppercase font-bold p-2 text-right">{t.tableAvgStones}</th></tr></thead>
                        <tbody className="text-slate-300">
                            {[2023, 2024, 2025].map(y => (
                                <tr key={y} className="bg-slate-800/50"><td className="p-2 rounded-l-lg">{y}</td><td className="p-2 text-right font-mono">{data[race].demand[y].toLocaleString(t.locale)}</td><td className="p-2 text-right font-mono rounded-r-lg">{data[race].meanStones[y] ? data[race].meanStones[y].toFixed(2) : '-'}</td></tr>
                            ))}
                            <tr className="bg-indigo-500/10"><td className="p-2 rounded-l-lg font-bold text-indigo-400">{t.tableProjection}</td><td className="p-2 text-right font-bold text-white font-mono">{vals.N.toLocaleString(t.locale)}</td><td className="p-2 text-right font-bold text-white font-mono rounded-r-lg">{vals.mean.toFixed(2)}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-lg flex flex-col">
                    <h3 className="text-white font-bold mb-4">{t.modelTitle}</h3>
                    <div className="bg-slate-800 rounded-xl p-4 font-mono text-slate-300 text-sm leading-relaxed mb-4 border border-slate-700 flex-grow">
                        <div className="mb-2 text-slate-500 text-xs font-bold uppercase font-sans">{t.formulaTitle}</div>
                        <div ref={formulaRef} dangerouslySetInnerHTML={{__html: getFormulaContent()}} />
                    </div>

                    <dl className="grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1.5 text-xs mb-4 px-2">
                        <dt className="font-mono text-slate-400 font-bold">p</dt><dd className="text-slate-500 m-0">{t.defP}</dd>
                        <dt className="font-mono text-slate-400 font-bold">w</dt><dd className="text-slate-500 m-0">{t.defW} <span className="text-indigo-400 font-bold ml-1">({stones})</span></dd>
                        <dt className="font-mono text-slate-400 font-bold">B</dt><dd className="text-slate-500 m-0">{t.defB} <span className="text-indigo-400 font-bold ml-1">({vals.B})</span></dd>
                        {model !== 'mc' && (
                            <>
                                <dt className="font-mono text-slate-400 font-bold">T</dt>
                                <dd className="text-slate-500 m-0">{t.defT} <span className="text-indigo-400 font-bold ml-1">({t.defValT} {Math.round(vals.totalPool).toLocaleString(t.locale)})</span></dd>
                                
                                <dt className="font-mono text-slate-400 font-bold">µ{model === 'bias' ? 'eff' : ''}</dt>
                                <dd className="text-slate-500 m-0">{t.defMu} <span className="text-indigo-400 font-bold ml-1">({vals.effectiveRemoval.toFixed(2)})</span></dd>
                            </>
                        )}
                        {model === 'mc' && (
                            <>
                                <dt className="font-mono text-slate-400 font-bold">N</dt>
                                <dd className="text-slate-500 m-0">{t.defN} <span className="text-indigo-400 font-bold ml-1">({vals.N.toLocaleString(t.locale)})</span></dd>
                            </>
                        )}
                    </dl>

                    <div className="mt-auto text-[10px] text-slate-500 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                        <b className="text-slate-400 block mb-1">{t.noteTitle}</b>
                        {model === 'heuristic' && t.noteHeuristic}
                        {model === 'bias' && t.noteBias}
                        {model === 'mc' && t.noteMC}
                        {model === 'ensemble' && `${t.noteHeuristic} ${t.noteBias}`}
                    </div>
                </div>
            </div>
        </div>
    );
};

window.UTMBLotteryPage = UTMBLotteryPage;
