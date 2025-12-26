const CaffeinePage = ({ lang, activeTheme }) => {
    const { useState, useEffect, useRef } = React;
    const [params, setParams] = useState({ bodyWeight: 70, halfLife: 5, raceStart: '08:00', raceDuration: 8, initialDose: 200, initialDoseTime: -0.5, doseAmount: 75, strategy: 'stay_low' });
    const canvasRef = useRef(null);
    const [schedule, setSchedule] = useState([]);
    const [summary, setSummary] = useState('');

    const tr = {
        tr: {
            strategy_params_title: 'Strateji Parametreleri',
            body_weight_label: 'Vücut Ağırlığı (kg)',
            race_start_label: 'Yarış Başlangıç Saati',
            race_duration_label: 'Yarış Tahmini Süresi (saat)',
            half_life_label: 'Yarılanma Süresi (saat)',
            initial_dose_label: 'Başlangıç Dozu (mg)',
            initial_dose_time_label: 'İlk Doz Zamanı (yarışa göre saat)',
            booster_dose_label: 'Takviye Dozu (mg)',
            strategy_label: 'Strateji Tercihi',
            strategy_low: 'Daha Seyrek Alım',
            strategy_high: 'Daha Sık Alım',
            calculate_btn: 'Stratejiyi Oluştur',
            simulation_title: 'Kişiselleştirilmiş Kafein Simülasyonu',
            schedule_title: 'Önerilen Alım Takvimi',
            table_header_time: 'Saat',
            table_header_amount: 'Miktar',
            summary_base: '* Bu plana göre, yarış sırasında yaklaşık olarak her {0} saatte bir takviye kafein almanız önerilmektedir.',
            summary_no_booster: '* Yarış sırasında ek takviye doza ihtiyaç duyulmuyor.',
            disclaimer: 'Kafein yarılanma süresi çok değişken olabilir. Eğer yarılanma sürenizi bilmiyorsanız, varsayılan değeri baz alabilirsiniz fakat bu bir medikal öneri değildir. Bu araç, aşağıda yer alan makalelere göre hazırlanmıştır.',
            axis_label_time: 'Günün Saati',
            target_zone_label: 'Hedef Bölge',
            references: 'Referanslar'
        },
        en: {
            strategy_params_title: 'Strategy Parameters',
            body_weight_label: 'Body Weight (kg)',
            race_start_label: 'Race Start Time',
            race_duration_label: 'Est. Race Duration (hours)',
            half_life_label: 'Half-Life (hours)',
            initial_dose_label: 'Initial Dose (mg)',
            initial_dose_time_label: 'Initial Dose Time (vs race start)',
            booster_dose_label: 'Booster Dose (mg)',
            strategy_label: 'Strategy Preference',
            strategy_low: 'Less Frequent Intake',
            strategy_high: 'More Frequent Intake',
            calculate_btn: 'Create Strategy',
            simulation_title: 'Personalized Caffeine Simulation',
            schedule_title: 'Recommended Intake Schedule',
            table_header_time: 'Time',
            table_header_amount: 'Amount',
            summary_base: '* According to this plan, it is recommended to take a booster dose of caffeine approximately every {0} hours during the race.',
            summary_no_booster: '* No booster dose is needed during the race.',
            disclaimer: 'Caffeine half-life can be highly variable. If you do not know your half-life, you can use the default value, but this is not medical advice. This tool has been prepared according to the articles listed below.',
            axis_label_time: 'Time of Day',
            target_zone_label: 'Target Zone',
            references: 'References'
        }
    };
    const t = lang === 'tr' ? tr.tr : tr.en;

    const formatTime = (baseTime, hoursOffset) => {
        const newTime = new Date(baseTime.getTime() + hoursOffset * 60 * 60 * 1000);
        return newTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    };
    
    const formatRelTime = (val) => { const h = Math.floor(Math.abs(val)), m = Math.round((Math.abs(val) - h) * 60); let txt = (h > 0 ? h + (lang==='tr'?' sa ':' hr ') : '') + (m > 0 ? m + (lang==='tr'?' dk':' min') : ''); return val < 0 ? (txt || (lang==='tr'?'Anında':'Now')) + (lang==='tr'?' önce':' before') : (txt || (lang==='tr'?'Anında':'Now')) + (lang==='tr'?' sonra':' after'); };

    const runSimulation = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-rgb').trim().split(' ').join(',');
        
        const [sh, sm] = params.raceStart.split(':');
        const raceDate = new Date();
        raceDate.setHours(sh, sm, 0, 0);

        const targetFloor = params.bodyWeight * 3;
        const targetPeak = params.bodyWeight * 6;
        const absorptionTime = 20 / 60; // 20 mins
        const timeStep = 0.05;
        const k = Math.log(2) / params.halfLife;
        const decayFactor = Math.exp(-k * timeStep);
        const triggerLevel = (params.strategy === 'stay_high') ? Math.max(targetFloor, targetPeak - params.doseAmount) : targetFloor;

        let currentCaffeine = 0;
        const labels = [], dataPoints = [], doseEvents = [];
        let isBoosterPending = false;
        let nextBoosterDoseTime = -1;

        if (params.initialDose > 0) {
            doseEvents.push({ time: params.initialDoseTime, amount: params.initialDose.toFixed(0) });
        }

        const simStart = Math.min(-2, params.initialDoseTime);
        const simEnd = params.raceDuration;
        const initialDoseFullyAbsorbedTime = params.initialDoseTime + absorptionTime;

        for (let t = simStart; t <= simEnd; t += timeStep) {
            let absorbed = 0;
            if (params.initialDose > 0 && t >= params.initialDoseTime && t < params.initialDoseTime + absorptionTime) {
                absorbed = (params.initialDose / absorptionTime) * timeStep;
            }

            let booster = 0;
            if (isBoosterPending && t >= nextBoosterDoseTime) {
                booster = params.doseAmount;
                doseEvents.push({ time: nextBoosterDoseTime, amount: params.doseAmount.toFixed(0) });
                isBoosterPending = false;
            }

            currentCaffeine *= decayFactor;
            currentCaffeine += absorbed + booster;

            labels.push(parseFloat(t.toFixed(2)));
            dataPoints.push(currentCaffeine);

            if (t >= initialDoseFullyAbsorbedTime && !isBoosterPending && currentCaffeine < triggerLevel) {
                isBoosterPending = true;
                nextBoosterDoseTime = Math.max(t, Math.ceil(t * 2) / 2);
            }
        }

        // Drawing
        const cvs = canvasRef.current;
        cvs.width = cvs.clientWidth;
        cvs.height = cvs.clientHeight;
        const padding = { top: 20, right: 20, bottom: 40, left: 50 };
        const chartW = cvs.width - padding.left - padding.right;
        const chartH = cvs.height - padding.top - padding.bottom;

        const xMin = labels[0], xMax = labels[labels.length-1];
        const yMax = Math.max(targetPeak * 1.2, Math.max(...dataPoints), 100);

        const getX = (val) => padding.left + ((val - xMin) / (xMax - xMin)) * chartW;
        const getY = (val) => padding.top + chartH - (val / yMax) * chartH;

        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';

        // Y Axis
        for (let i = 0; i <= yMax; i += 50) {
            if (i % 100 === 0) {
                const y = getY(i);
                ctx.fillStyle = '#94a3b8';
                ctx.fillText(i + 'mg', padding.left - 10, y);
                ctx.strokeStyle = '#334155';
                ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(padding.left + chartW, y); ctx.stroke();
            }
        }

        // X Axis
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        const xStep = Math.max(1, Math.round((xMax - xMin) / 6));
        for (let i = Math.ceil(xMin); i <= xMax; i += xStep) {
            const x = getX(i);
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(formatTime(raceDate, i), x, padding.top + chartH + 10);
            ctx.strokeStyle = '#334155';
            ctx.beginPath(); ctx.moveTo(x, padding.top); ctx.lineTo(x, padding.top + chartH); ctx.stroke();
        }

        // Target Zone
        const yTargetMin = getY(targetPeak), yTargetMax = getY(targetFloor);
        ctx.fillStyle = `rgba(${color}, 0.1)`;
        ctx.fillRect(padding.left, yTargetMin, chartW, yTargetMax - yTargetMin);
        ctx.fillStyle = `rgb(${color})`; ctx.textAlign = 'left';
        ctx.fillText(t.target_zone_label, padding.left + 10, yTargetMin + 5);

        // Line
        if (labels.length > 0) {
            ctx.beginPath();
            ctx.moveTo(getX(labels[0]), getY(dataPoints[0]));
            for (let i=1; i<labels.length; i++) ctx.lineTo(getX(labels[i]), getY(dataPoints[i]));
            ctx.strokeStyle = `rgb(${color})`; ctx.lineWidth = 3; ctx.stroke();
            
            ctx.lineTo(getX(labels[labels.length-1]), getY(0));
            ctx.lineTo(getX(labels[0]), getY(0));
            const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top+chartH); grad.addColorStop(0, `rgba(${color},0.4)`); grad.addColorStop(1, `rgba(${color},0)`);
            ctx.fillStyle = grad; ctx.fill();
        }

        setSchedule(doseEvents.sort((a,b)=>a.time-b.time).map(e => ({...e, timeStr: formatTime(raceDate, e.time)})));
        
        const boosters = doseEvents.filter(e => parseFloat(e.amount) === params.doseAmount && e.time >= 0);
        if (boosters.length > 1) {
            let totalInt = 0;
            for(let i=1; i<boosters.length; i++) totalInt += boosters[i].time - boosters[i-1].time;
            const avg = totalInt / (boosters.length - 1);
            setSummary(t.summary_base.replace('{0}', (Math.round(avg*2)/2).toFixed(1)));
        } else if (boosters.length === 1) {
            setSummary(t.summary_base.replace('{0}', params.raceDuration));
        } else {
            setSummary(t.summary_no_booster);
        }
    };

    // Trigger calculation on load or param change
    useEffect(() => {
        const timer = setTimeout(runSimulation, 100);
        return () => clearTimeout(timer);
    }, [params, lang, activeTheme]);

    return (
        <div className="bg-slate-800 text-slate-200 p-6 rounded-3xl max-w-[1400px] mx-auto shadow-2xl border border-slate-700 animate-fade-in">
            <div className="text-center mb-10 pt-2"><h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">Caffeine Strategy</h1></div>
            <div className="grid lg:grid-cols-[350px_1fr] gap-8">
                {/* LEFT PANEL */}
                <div className="flex flex-col gap-6">
                    <div className="border-b border-slate-700 pb-4">
                        <h2 className="text-xl font-bold text-white mb-2">{t.strategy_params_title}</h2>
                    </div>
                    <div className="grid gap-4">
                        <Slider label={t.body_weight_label} val={params.bodyWeight} min={40} max={120} step={1} unit="kg" onChange={v => setParams(p=>({...p, bodyWeight: parseFloat(v)}))} />
                        <div className="flex flex-col"><label className="text-xs font-bold text-slate-400 uppercase mb-2 block">{t.race_start_label}</label><input type="time" value={params.raceStart} onChange={e=>setParams(p=>({...p, raceStart: e.target.value}))} className="bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-primary w-full"/></div>
                        <Slider label={t.race_duration_label} val={params.raceDuration} min={1} max={30} step={0.5} unit="sa" onChange={v => setParams(p=>({...p, raceDuration: parseFloat(v)}))} />
                        <Slider label={t.half_life_label} val={params.halfLife} min={2} max={10} step={0.5} unit="sa" onChange={v => setParams(p=>({...p, halfLife: parseFloat(v)}))} />
                        <div className="h-px bg-slate-700 my-2"></div>
                        <Slider label={t.initial_dose_label} val={params.initialDose} min={0} max={500} step={10} unit="mg" onChange={v => setParams(p=>({...p, initialDose: parseFloat(v)}))} />
                        <div className="mb-4"><div className="flex justify-between mb-1 items-end"><span className="text-xs font-bold text-slate-400 uppercase">{t.initial_dose_time_label}</span><span className="text-primary font-bold text-sm">{formatRelTime(params.initialDoseTime)}</span></div><input type="range" min={-2} max={2} step={0.25} value={params.initialDoseTime} onChange={(e)=>setParams(p=>({...p, initialDoseTime:parseFloat(e.target.value)}))} /></div>
                        <Slider label={t.booster_dose_label} val={params.doseAmount} min={20} max={200} step={5} unit="mg" onChange={v => setParams(p=>({...p, doseAmount: parseFloat(v)}))} />
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">{t.strategy_label}</label>
                            <select value={params.strategy} onChange={e=>setParams(p=>({...p, strategy: e.target.value}))} className="bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-primary">
                                <option value="stay_low">{t.strategy_low}</option>
                                <option value="stay_high">{t.strategy_high}</option>
                            </select>
                        </div>
                        <button onClick={runSimulation} className="bg-primary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-opacity mt-2 shadow-lg shadow-primary/20">{t.calculate_btn}</button>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="flex flex-col gap-6">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-4 h-[400px] shadow-lg w-full overflow-hidden">
                        <h3 className="text-center font-bold text-white mb-2">{t.simulation_title}</h3>
                        <div className="flex-grow relative w-full h-full">
                            <canvas ref={canvasRef} className="w-full h-full"></canvas>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-lg">
                        <h3 className="text-white font-bold mb-4">{t.schedule_title}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-slate-700 text-slate-500 uppercase text-xs">
                                        <th className="p-3">{t.table_header_time}</th>
                                        <th className="p-3">{t.table_header_amount}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    {schedule.map((row, i) => (
                                        <tr key={i} className="border-b border-slate-700 last:border-0 hover:bg-slate-800/50">
                                            <td className="p-3 font-mono text-primary">{row.timeStr}</td>
                                            <td className="p-3 font-bold">{row.amount} mg</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-slate-400 italic text-sm" dangerouslySetInnerHTML={{__html: summary}}></p>
                    </div>

                    <footer className="pt-6 border-t border-slate-700 text-xs text-slate-500">
                        <p className="italic text-slate-400 mb-4">{t.disclaimer}</p>
                        <p className="font-bold mb-2 text-white">{t.references}:</p>
                        <ul className="list-none space-y-2">
                            <li>1. Grgic, J., Mikulic, P., & Schoenfeld, B. J. (2024). Effects of Acute Ingestion of Caffeine Capsules on Muscle Strength and Muscle Endurance. <em>Nutrients</em>.</li>
                            <li>2. Lin YS, Weibel J, Landolt HP, et al. (2022). Time to Recover From Daily Caffeine Intake. <em>Frontiers in Nutrition</em>.</li>
                            <li>3. Institute of Medicine (US) Committee on Military Nutrition Research. (2001). Pharmacology of Caffeine.</li>
                            <li>4. Tiller, N. B., et al. (2019). ISSN Position Stand: Nutritional considerations for single-stage ultra-marathon training.</li>
                        </ul>
                    </footer>
                </div>
            </div>
        </div>
    );
};

window.CaffeinePage = CaffeinePage;
