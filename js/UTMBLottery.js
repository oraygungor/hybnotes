const UTMBLotteryPage = ({ lang }) => {
    const { useState, useMemo, useEffect, useRef } = React;
    const [race, setRace] = useState('UTMB');
    const [method, setMethod] = useState('cagr');
    const [stones, setStones] = useState(1);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const data = useMemo(() => ({ 
        UTMB: { capacity: 2300, demand: { 2023: 6578, 2024: 7200, 2025: 8900 }, meanStones: { 2024: 5.4, 2025: 6.4 } }, 
        CCC: { capacity: 1900, demand: { 2023: 5249, 2024: 5400, 2025: 6000 }, meanStones: { 2024: 4.0, 2025: 4.4 } }, 
        OCC: { capacity: 1200, demand: { 2023: 5171, 2024: 6500, 2025: 10000 }, meanStones: { 2024: 2.8, 2025: 3.2 } } 
    }), []);

    const tr = {
        EN: {
            title: "UTMB 2026 Lottery Chance Calculator",
            subtitle: "Interactively displays estimated 2026 lottery probabilities based on 2023→2025 data.",
            raceLabel: "Race",
            utmbOption: "UTMB (2300 Runners)",
            cccOption: "CCC (1900 Runners)",
            occOption: "OCC (1200 Runners)",
            methodLabel: "Projection Method",
            cagrOption: "CAGR (Recommended)",
            linearOption: "Linear",
            conservativeOption: "Conservative (CAGR x0.7)",
            optimisticOption: "Optimistic (CAGR x1.3)",
            stonesLabelPrefix: "Running Stones: ",
            probLabel: "Estimated Probability",
            demandLabel: "2026 Demand",
            avgStonesLabel: "Avg. Stones",
            dataTitle: "Historical Data & Projection",
            tableYear: "Year",
            tableDemand: "Demand",
            tableAvgStones: "Avg. Stones",
            tableProjection: "2026 (Projection)",
            modelTitle: "Calculation Model & Methodology",
            formulaTitle: "Exact Calculation Formula:",
            defP: "Probability of winning",
            defW: "Your number of stones",
            defB: "Race capacity (Bib number)",
            defT: "Estimated total stones (Demand × Avg. Stones + Your Stones)",
            defValW: "Value: ",
            defValB: "Value: ",
            defValT: "Approx. Value: ",
            defI: "An iterator for the calculation (from 0 to B-1)",
            methodTitle: "Method Descriptions",
            defCAGR: "Applies the 2023→2025 compound annual growth rate (CAGR) to 2026.",
            defLinear: "Extrapolates the linear trend from 2023→2025.",
            defConservative: "Applies 70% of the CAGR growth (lower demand).",
            defOptimistic: "Applies 130% of the CAGR growth (higher demand).",
            noteTitle: "A Clarification on the Model:",
            noteText: "If the lottery is weighted and without replacement, we use the hypergeometric distribution.",
            tooltipTitleSuffix: " Stones",
            tooltipLabelPrefix: "Probability: ",
            xAxisLabel: "Number of Running Stones",
            yAxisLabel: "Probability (%)",
            locale: "en-US"
        },
        TR: {
            title: "UTMB 2026 Kura Şansı Hesaplayıcı",
            subtitle: "2023→2025 verilerine dayanarak 2026 için tahmini kura olasılıklarını interaktif olarak gösterir.",
            raceLabel: "Yarış",
            utmbOption: "UTMB (2300 Kişi)",
            cccOption: "CCC (1900 Kişi)",
            occOption: "OCC (1200 Kişi)",
            methodLabel: "Tahmin Metodu",
            cagrOption: "CAGR (Önerilen)",
            linearOption: "Doğrusal",
            conservativeOption: "Temkinli (CAGR x0.7)",
            optimisticOption: "İyimser (CAGR x1.3)",
            stonesLabelPrefix: "Taş Sayısı: ",
            probLabel: "Tahmini Olasılık",
            demandLabel: "2026 Talep",
            avgStonesLabel: "Ort. Taş",
            dataTitle: "Geçmiş Veriler ve Projeksiyon",
            tableYear: "Yıl",
            tableDemand: "Talep",
            tableAvgStones: "Ort. Taş",
            tableProjection: "2026 (Tahmin)",
            modelTitle: "Hesaplama Modeli ve Metodolojisi",
            formulaTitle: "Kesin Hesaplama Formülü:",
            defP: "Kazanma olasılığı",
            defW: "Sizin taş sayınız",
            defB: "Yarış kapasitesi (Bib sayısı)",
            defT: "Tahmini toplam taş sayısı (Talep × Ort. Taş + Sizin Taşınız)",
            defValW: "Değer: ",
            defValB: "Değer: ",
            defValT: "Yaklaşık Değer: ",
            defI: "Hesaplama için bir sayaç (0'dan B-1'e kadar)",
            methodTitle: "Metod Açıklamaları",
            defCAGR: "2023→2025 arası bileşik büyüme oranını (CAGR) 2026’ya uygular.",
            defLinear: "2023→2025 arasındaki doğrusal eğilimi sürdürür.",
            defConservative: "CAGR büyümesinin %70’ini uygular (düşük talep).",
            defOptimistic: "CAGR büyümesinin %130’unu uygular (yüksek talep).",
            noteTitle: "Model Üzerine Bir Netleştirme:",
            noteText: "Kura ağırlıklı ve yenilemesiz ise, hipergeometrik dağılım kullanılır.",
            tooltipTitleSuffix: " Taş",
            tooltipLabelPrefix: "Olasılık: ",
            xAxisLabel: "Taş Sayısı",
            yAxisLabel: "Olasılık (%)",
            locale: "tr-TR"
        }
    };

    const t = lang === 'tr' ? tr.TR : tr.EN;

    // Maths
    const cagr = (v1, v2, f = 1) => Math.round(v2 * (1 + (Math.pow(v2 / v1, 1 / 2) - 1) * f));
    const getProb = (B, N, mean, w) => { 
        if (w <= 0) return 0; 
        const T = N * mean + w; 
        let logNoHit = 0; 
        const loops = Math.min(B, T - w); 
        for (let i = 0; i < loops; i++) {
            logNoHit += Math.log(T - w - i) - Math.log(T - i);
            if (T - i <= 0 || T - w - i <= 0) break;
        }
        return 1 - Math.exp(logNoHit); 
    };

    const vals = useMemo(() => {
        const d = data[race].demand;
        const N = method === 'linear' ? Math.round(d[2025] + (d[2025] - d[2023]) / 2) : method === 'conservative' ? cagr(d[2023], d[2025], 0.7) : method === 'optimistic' ? cagr(d[2023], d[2025], 1.3) : cagr(d[2023], d[2025], 1);
        const mS = data[race].meanStones;
        const mean = method === 'linear' ? mS[2025] + (mS[2025] - mS[2024]) : mS[2025] * (1 + (mS[2025] / mS[2024] - 1) * (method === 'conservative' ? 0.7 : method === 'optimistic' ? 1.3 : 1));
        const B = data[race].capacity;
        const p = getProb(B, N, mean, stones);
        const T = N * mean + stones;
        return { N, mean, B, p, T };
    }, [race, method, stones, data]);

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        
        const labels = Array.from({length: 50}, (_, i) => i + 1);
        const dataPoints = labels.map(w => getProb(vals.B, vals.N, vals.mean, w) * 100);
        
        const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-rgb').trim().split(' ').join(',');
        const pointColors = labels.map(w => w === stones ? `rgb(${color})` : `rgba(${color}, 0.5)`);
        const pointRadii = labels.map(w => w === stones ? 6 : 2);

        chartInstance.current = new Chart(ctx, { 
            type: 'line', 
            data: { 
                labels, 
                datasets: [{ 
                    label: 'Probability (%)', 
                    data: dataPoints, 
                    borderColor: `rgb(${color})`, 
                    backgroundColor: `rgba(${color}, 0.1)`, 
                    pointBackgroundColor: pointColors, 
                    pointRadius: pointRadii, 
                    fill: true,
                    tension: 0.3
                }] 
            }, 
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: (items) => `${items[0].label} ${t.tooltipTitleSuffix}`,
                            label: (item) => `${t.tooltipLabelPrefix}${item.formattedValue}%`
                        }
                    }
                }, 
                scales: { 
                    y: { 
                        beginAtZero: true, 
                        max: 100, 
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }, 
                        ticks: { color: '#94a3b8' },
                        title: { display: true, text: t.yAxisLabel, color: '#94a3b8' }
                    }, 
                    x: { 
                        grid: { display: false },
                        ticks: { color: '#94a3b8' },
                        title: { display: true, text: t.xAxisLabel, color: '#94a3b8' }
                    } 
                } 
            } 
        });
        return () => chartInstance.current?.destroy();
    }, [vals, stones, t]);

    return (
        <div className="bg-slate-800 text-slate-200 rounded-3xl p-6 max-w-[1100px] mx-auto border border-slate-700 shadow-2xl animate-fade-in font-sans">
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-black mb-2">{t.title}</h1>
                <div className="text-slate-400 text-sm md:text-base">{t.subtitle}</div>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-5 mb-5">
                {/* Controls */}
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 flex flex-col gap-4 shadow-lg">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase">{t.raceLabel}</label>
                        <select value={race} onChange={e=>setRace(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-xl focus:outline-none focus:border-primary">
                            <option value="UTMB">{t.utmbOption}</option>
                            <option value="CCC">{t.cccOption}</option>
                            <option value="OCC">{t.occOption}</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase">{t.methodLabel}</label>
                        <select value={method} onChange={e=>setMethod(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-xl focus:outline-none focus:border-primary">
                            <option value="cagr">{t.cagrOption}</option>
                            <option value="linear">{t.linearOption}</option>
                            <option value="conservative">{t.conservativeOption}</option>
                            <option value="optimistic">{t.optimisticOption}</option>
                        </select>
                    </div>
                    <Slider label={t.stonesLabelPrefix} val={stones} min={1} max={50} step={1} unit="" onChange={setStones} />

                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="col-span-2 bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                            <h3 className="m-0 mb-2 text-[10px] text-primary font-bold uppercase tracking-wider">{t.probLabel}</h3>
                            <div className="text-[32px] md:text-[38px] font-black leading-none text-white">% {(vals.p * 100).toFixed(2)}</div>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                            <h3 className="m-0 mb-2 text-[10px] text-slate-500 font-bold uppercase">{t.demandLabel}</h3>
                            <div className="text-xl md:text-2xl font-bold leading-none text-white">{vals.N.toLocaleString(t.locale)}</div>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                            <h3 className="m-0 mb-2 text-[10px] text-slate-500 font-bold uppercase">{t.avgStonesLabel}</h3>
                            <div className="text-xl md:text-2xl font-bold leading-none text-white">{vals.mean.toFixed(2)}</div>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-4 h-[400px] md:h-auto flex flex-col relative shadow-lg w-full overflow-hidden">
                    <div className="flex-grow relative w-full h-full min-h-[300px]">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {/* Data Table */}
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-lg">
                    <h3 className="text-white font-bold mb-4">{t.dataTitle}</h3>
                    <table className="w-full border-separate border-spacing-y-1 text-sm">
                        <thead>
                            <tr>
                                <th className="text-slate-500 text-[10px] uppercase font-bold p-2 text-left">{t.tableYear}</th>
                                <th className="text-slate-500 text-[10px] uppercase font-bold p-2 text-right">{t.tableDemand}</th>
                                <th className="text-slate-500 text-[10px] uppercase font-bold p-2 text-right">{t.tableAvgStones}</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            {[2023, 2024, 2025].map(y => (
                                <tr key={y} className="bg-slate-800/50">
                                    <td className="p-2 rounded-l-lg">{y}</td>
                                    <td className="p-2 text-right font-mono">{data[race].demand[y].toLocaleString(t.locale)}</td>
                                    <td className="p-2 text-right font-mono rounded-r-lg">{data[race].meanStones[y] ? data[race].meanStones[y].toFixed(2) : '-'}</td>
                                </tr>
                            ))}
                            <tr className="bg-primary/10">
                                <td className="p-2 rounded-l-lg font-bold text-primary">{t.tableProjection}</td>
                                <td className="p-2 text-right font-bold text-white font-mono">{vals.N.toLocaleString(t.locale)}</td>
                                <td className="p-2 text-right font-bold text-white font-mono rounded-r-lg">{vals.mean.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Formula */}
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-lg">
                    <h3 className="text-white font-bold mb-4">{t.modelTitle}</h3>
                    <div className="bg-slate-800 rounded-xl p-4 font-mono text-slate-300 text-sm leading-relaxed mb-4 border border-slate-700">
                        <div className="mb-2 text-slate-500 text-xs font-bold uppercase font-sans">{t.formulaTitle}</div>
                        <div className="latex-formula">
                            <span>p</span> <span className="op">=</span> <span>1</span> <span className="op">−</span>
                            <div className="product-notation">
                                <span className="prod-limit-upper">B-1</span>
                                <span className="prod-symbol">Π</span>
                                <span className="prod-limit-lower">i=0</span>
                            </div>
                            <div className="fraction">
                                <span className="numerator">(T − w − i)</span>
                                <span className="denominator">(T − i)</span>
                            </div>
                        </div>
                        <div className="text-[1.2em] font-bold text-primary mt-2 text-center">p = % {(vals.p * 100).toFixed(2)}</div>
                    </div>

                    <dl className="grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1.5 text-xs">
                        <dt className="font-mono text-slate-400 font-bold">p</dt><dd className="text-slate-500 m-0">{t.defP}</dd>
                        <dt className="font-mono text-slate-400 font-bold">w</dt><dd className="text-slate-500 m-0">{t.defW} <span className="text-primary font-bold ml-1">({t.defValW} {stones})</span></dd>
                        <dt className="font-mono text-slate-400 font-bold">B</dt><dd className="text-slate-500 m-0">{t.defB} <span className="text-primary font-bold ml-1">({t.defValB} {vals.B})</span></dd>
                        <dt className="font-mono text-slate-400 font-bold">T</dt><dd className="text-slate-500 m-0">{t.defT} <span className="text-primary font-bold ml-1">({t.defValT} {Math.round(vals.T).toLocaleString(t.locale)})</span></dd>
                    </dl>

                    <div className="mt-4 text-[10px] text-slate-500 bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                        <b className="text-slate-400 block mb-1">{t.noteTitle}</b>
                        <span dangerouslySetInnerHTML={{__html: t.noteText}}></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.UTMBLotteryPage = UTMBLotteryPage;
