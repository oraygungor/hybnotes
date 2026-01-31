const { useState, useEffect, useRef, useMemo } = React;

// --- ICONS (Özgün Tasarımdaki İkonlar) ---
const Icons = {
  BookOpen: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Calculator: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
  Activity: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Zap: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Brain: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
  TrendingUp: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Calendar: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  ChevronDown: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
};

// --- STYLES (FatOx'a özel görsel efektler) ---
const FatOxStyles = () => (
  <style>{`
    .fatox-glass { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .fatox-gradient-text { background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    input[type=range].fatox-range { -webkit-appearance: none; width: 100%; background: transparent; height: 32px; }
    input[type=range].fatox-range::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; background: var(--primary-color); cursor: pointer; margin-top: -8px; box-shadow: 0 0 10px rgba(16,185,129,0.5); }
    input[type=range].fatox-range::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: #334155; border-radius: 2px; }
  `}</style>
);

const FatOxPage = ({ lang, activeTheme }) => {
  const [activeTab, setActiveTab] = useState('education');
  const [showRefs, setShowRefs] = useState(false);
  const primaryColor = activeTheme ? activeTheme.hex : '#10b981';

  // --- İÇERİK SİSTEMİ ---
  const TEXT = {
    tr: {
      heroDesc: "Vücudunuzu bir yağ yakma makinesine dönüştürün. Bilimsel protokollerle metabolik esnekliğinizi optimize edin.",
      tabs: { education: "Eğitim (101)", faq: "Soru/Cevap", calculator: "Hesaplayıcı", methods: "Metotlar", plan: "4 Haftalık Plan" },
      edu: {
        whatIsTitle: "Yağ Oksidasyonu Nedir?",
        whatIsDesc: "Egzersiz sırasında vücudun enerji üretmek için depolanmış yağları (trigliseridleri) parçalamasıdır. Glikojen depoları sınırlı (~1.600-2.500 kcal) iken, yağ depoları en zayıf sporcuda bile 50.000 kcal üzerindedir.",
        analogyTitle: "PİL ANALOJİSİ",
        glycogen: "Glikojen (Kısıtlı)",
        fat: "Yağ (Sınırsız Kaynak)",
        mfoTitle: "MFO (Max Fat Oxidation)",
        mfoDesc: "Vücudunuzun en fazla yağ yaktığı gram/dakika zirvesidir. 'FatMax' ise bu zirveye ulaşılan nabız aralığıdır.",
        stats: [
          { l: "TASARRUF", v: "Bonk Yok", s: "Glikojeni yarışın son kritik anlarına saklarsınız." },
          { l: "KONFOR", v: "Az Jel", s: "Saatte 90g yerine 40-50g karbonhidrat yeterli olabilir." },
          { l: "STABİLİTE", v: "Sabit Güç", s: "Mental enerji sabit kalır, kan şekeri dalgalanmaz." }
        ]
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        items: [
          { q: "Performansı artırdığı kesin mi?", a: "Marquet [2], 'sleep-low' protokolünün 10km performansını kontrol grubuna göre anlamlı derecede iyileştirdiğini raporlamıştır." },
          { q: "En etkili yöntem hangisidir?", a: "Sakamoto [1] ve Marquet [2], 'Sleep Low' yönteminin yağ metabolizmasını ve VO2peak değerlerini iyileştirdiğini göstermektedir. Keto [5] daha çok yağ yakar ama ekonomi bozabilir [6]." },
          { q: "Kadın sporcular için etkili mi?", a: "Evet. Molloy ve ark. [4], 12 haftalık protokolün kadınlarda hem fizyolojik hem de zamana karşı performansı artırdığını kanıtlamıştır." }
        ]
      },
      calc: {
        title: "Potansiyel Hesaplayıcı",
        subtitle: "Yağ adaptasyonunun size ne kadar enerji kazandıracağını görün.",
        strategy: "STRATEJİ",
        strategies: { sleepLow: "Sleep Low (Dengeli)", keto: "Keto (Maksimum)" },
        intensity: "KOŞU ŞİDDETİ",
        intensities: { z2: "Düşük (Z2)", z3: "Yarış (Z3/Tempo)" },
        weight: "Ağırlık (kg)",
        duration: "Süre (Saat)",
        normalRunner: "NORMAL KOŞUCU",
        youFatOx: "SİZ (FATOX)",
        estBurn: "Tahmini Yağ Yakımı",
        resultGain: "Adapte olarak",
        resultGain2: "ekstra enerji ürettiniz.",
        resultGel: "Teorik Enerji Eşdeğeri:",
        disclaimer: "*Bu bir matematiksel modeldir. Sakamoto [1], Marquet [2] ve Volek [5] verilerinden türetilmiştir. Laboratuvar testi değildir."
      },
      methods: {
        title: "Nasıl Artırılır?",
        cards: [
          { t: "1. Sleep Low", d: "Akşam antrenmanından sonra karbonhidrat kısıtlayıp sabah düşük glikojenle koşmak VO2peak artırır [1, 2].", b: ["Altın Standart"] },
          { t: "2. Ketojenik Diyet", d: "Yağ oksidasyonunu zirveye çıkarır [5] ama yarış ekonomisini bozabilir [6].", b: ["Max Yağ Yakımı"] },
          { t: "3. Gecikmeli Beslenme", d: "Sabah antrenmanında KH alımını geciktirmek yağ yakımını adaptasyonunu sürdürür [3].", b: ["Stratejik"] },
          { t: "4. Aç Karnına Antrenman", d: "Temel yöntem. Gece boyu açlıktan sonra sabah yapılan egzersiz yağ kullanımını artırır.", b: ["Başlangıç"] }
        ]
      },
      plan: {
        title: "4 Haftalık Uygulama Planı",
        w13: { t: "Hafta 1-3: İnşa Dönemi", d: "Metabolik motoru kurma aşaması.", wd: "Hafta İçi (Sal/Per)", wda: "Sleep Low (Aç Koşu)", we: "Hafta Sonu", wea: "Train High (Karbonhidratlı)", n: "*Hafta sonu mideni jele alıştırmalısın." },
        w4: { t: "Hafta 4: Yarış Haftası (Taper)", d: "Stresi azalt, depoları doldur.", wd: "Pzt - Cuma", wda: "Normal Beslenme", we: "Son 48 Saat", wea: "Karbonhidrat Yüklemesi", n: "*Hedef: 10-12g/kg karbonhidrat." }
      },
      footer: { hide: "Referansları Gizle", show: "Bilimsel Referansları Göster" }
    },
    en: {
      heroDesc: "Turn your body into a fat-burning machine. Optimize your metabolic flexibility with scientific protocols.",
      tabs: { education: "Education (101)", faq: "Q&A", calculator: "Calculator", methods: "Methods", plan: "4-Week Plan" },
      edu: {
        whatIsTitle: "What is Fat Oxidation?",
        whatIsDesc: "The process of the body breaking down stored fats (triglycerides) for energy. While glycogen is limited (~1,600-2,500 kcal), fat stores exceed 50,000 kcal even in lean athletes.",
        analogyTitle: "BATTERY ANALOGY",
        glycogen: "Glycogen (Limited)",
        fat: "Fat (Unlimited Source)",
        mfoTitle: "MFO (Max Fat Oxidation)",
        mfoDesc: "The peak grams/minute of fat you can burn. 'FatMax' is the heart rate zone where this peak occurs.",
        stats: [
          { l: "SPARING", v: "No Bonking", s: "Save your glycogen for the critical final moments." },
          { l: "COMFORT", v: "Less Gel", s: "40-50g carbs/hr might be enough instead of 90g." },
          { l: "STABILITY", v: "Steady Power", s: "Mental energy remains constant, no sugar spikes." }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Is it guaranteed to improve performance?", a: "Marquet [2] reported that the 'sleep-low' protocol significantly improved 10k performance compared to controls." },
          { q: "What is the most effective method?", a: "Sakamoto [1] and Marquet [2] show 'Sleep Low' improves fat metabolism and VO2peak. Keto [5] burns more fat but may impair economy [6]." },
          { q: "Is it effective for women?", a: "Yes. Molloy et al. [4] confirmed that a 12-week protocol improves both physiological and time-trial performance in women." }
        ]
      },
      calc: {
        title: "Potential Calculator",
        subtitle: "See how much extra energy fat adaptation gives you.",
        strategy: "STRATEGY",
        strategies: { sleepLow: "Sleep Low (Balanced)", keto: "Keto (Maximum)" },
        intensity: "INTENSITY",
        intensities: { z2: "Low (Z2)", z3: "Race (Z3/Tempo)" },
        weight: "Weight (kg)",
        duration: "Duration (Hours)",
        normalRunner: "NORMAL RUNNER",
        youFatOx: "YOU (FATOX)",
        estBurn: "Est. Fat Burn",
        resultGain: "By adapting,",
        resultGain2: "extra energy generated.",
        resultGel: "Theoretical Energy Equivalent:",
        disclaimer: "*This is a mathematical model derived from Sakamoto [1], Marquet [2], and Volek [5]. Not a lab test."
      },
      methods: {
        title: "How to Increase?",
        cards: [
          { t: "1. Sleep Low", d: "Restricting carbs after PM training and running low-glycogen in the AM improves VO2peak [1, 2].", b: ["Gold Standard"] },
          { t: "2. Keto Diet", d: "Maximizes fat oxidation [5] but may impair exercise economy [6].", b: ["Max Fat Burn"] },
          { t: "3. Delayed Feeding", d: "Delaying carb intake during AM sessions maintains fat oxidation adaptation [3].", b: ["Strategic"] },
          { t: "4. Fasted Training", d: "Basic method. Morning exercise after an overnight fast increases fat use.", b: ["Beginner"] }
        ]
      },
      plan: {
        title: "4-Week Action Plan",
        w13: { t: "Week 1-3: Build Phase", d: "Building the metabolic engine.", wd: "Weekdays (Tue/Thu)", wda: "Sleep Low (Fasted Run)", we: "Weekend", wea: "Train High (Carbs)", n: "*Train your gut with gels on weekend sessions." },
        w4: { t: "Week 4: Race Week (Taper)", d: "Reduce stress, fill stores.", wd: "Mon - Fri", wda: "Normal Nutrition", we: "Last 48 Hours", wea: "Carb Loading", n: "*Target: 10-12g/kg carbs in the last 36-48h." }
      },
      footer: { hide: "Hide References", show: "Show Scientific References" }
    }
  };

  const t = TEXT[lang] || TEXT.tr;

  // --- HESAPLAMA MANTIĞI (Volek & Romijn Bazlı) ---
  const [weight, setWeight] = useState(70);
  const [duration, setDuration] = useState(4);
  const [strategy, setStrategy] = useState('sleepLow');
  const [intensity, setIntensity] = useState('z2');
  const [results, setResults] = useState({ normalRange: [0, 0], adaptedRange: [0, 0], diffKcal: 0, gelsSaved: 0 });

  useEffect(() => {
    const COEFFS = {
      z2: { normal: [0.35, 0.55], sleepLow: [0.65, 0.85], keto: [0.95, 1.35] },
      z3: { normal: [0.15, 0.25], sleepLow: [0.35, 0.55], keto: [0.65, 0.95] }
    };
    const c = COEFFS[intensity];
    const wFactor = parseFloat(weight) / 70;
    const mins = parseFloat(duration) * 60;
    const calc = (range) => [Math.round(range[0] * wFactor * mins), Math.round(range[1] * wFactor * mins)];
    
    const nr = calc(c.normal);
    const ar = calc(strategy === 'keto' ? c.keto : c.sleepLow);
    const diff = Math.max(0, ((ar[0]+ar[1])/2) - ((nr[0]+nr[1])/2));
    const kcal = Math.round(diff * 9.1);

    setResults({ normalRange: nr, adaptedRange: ar, diffKcal: kcal, gelsSaved: (kcal / 100).toFixed(1) });
  }, [weight, duration, strategy, intensity]);

  // --- YARDIMCI BİLEŞENLER ---
  const handleRefClick = (id) => {
    setShowRefs(true);
    setTimeout(() => {
      const el = document.getElementById(`fatox-ref-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const Citation = ({ id }) => (
    <button onClick={() => handleRefClick(id)} className="inline-flex items-center justify-center w-4 h-4 ml-1 text-[10px] bg-slate-800 text-primary border border-primary/30 rounded-sm hover:bg-primary hover:text-slate-900 transition-colors">
      {id}
    </button>
  );

  return (
    <div className="animate-fade-in space-y-8 pb-20" style={{'--primary-color': primaryColor}}>
      <FatOxStyles />
      
      {/* BAŞLIK */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Ultra <span className="fatox-gradient-text">FatOx</span></h2>
          <p className="text-slate-500 text-sm mt-2 max-w-lg">{t.heroDesc}</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-full border border-slate-700 overflow-x-auto no-scrollbar shadow-2xl">
          {Object.entries(t.tabs).map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeTab === key ? 'bg-slate-700 text-primary shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* --- EĞİTİM --- */}
      {activeTab === 'education' && (
        <div className="space-y-8 animate-enter">
          <div className="fatox-glass p-6 md:p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Icons.Brain className="w-48 h-48 text-white" /></div>
            <h3 className="text-2xl font-bold text-white mb-6">{t.edu.whatIsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <p className="text-slate-400 text-base leading-relaxed">{t.edu.whatIsDesc}</p>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-500 mb-6 text-center tracking-widest">{t.edu.analogyTitle}</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] mb-2"><span className="text-rose-400 font-bold uppercase">{t.edu.glycogen}</span><span className="text-rose-400">~2.000 kcal</span></div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50"><div className="h-full bg-rose-500 w-[12%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-2"><span className="text-emerald-400 font-bold uppercase">{t.edu.fat}</span><span className="text-emerald-400">100.000+ kcal</span></div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50"><div className="h-full bg-emerald-500 w-full animate-pulse"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {t.edu.stats.map((s, i) => (
              <div key={i} className="fatox-glass p-6 rounded-2xl border-l-4" style={{borderLeftColor: primaryColor}}>
                <div className="text-[10px] font-black text-slate-500 mb-1 tracking-widest uppercase">{s.l}</div>
                <div className="text-xl font-bold text-white mb-1">{s.v}</div>
                <div className="text-xs text-slate-400 leading-tight">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- HESAPLAYICI --- */}
      {activeTab === 'calculator' && (
        <div className="animate-enter space-y-6">
          <div className="fatox-glass p-6 md:p-8 rounded-3xl border-t-4" style={{borderTopColor: primaryColor}}>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl" style={{color: primaryColor}}><Icons.Calculator className="w-8 h-8" /></div>
              <div><h3 className="text-xl font-bold text-white">{t.calc.title}</h3><p className="text-xs text-slate-500">{t.calc.subtitle}</p></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-3 tracking-widest">{t.calc.strategy}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(t.calc.strategies).map(([k, v]) => (
                      <button key={k} onClick={() => setStrategy(k)} className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all ${strategy === k ? 'bg-primary text-white border-primary' : 'border-slate-700 text-slate-400'}`}>{v}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-3 tracking-widest">{t.calc.intensity}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(t.calc.intensities).map(([k, v]) => (
                      <button key={k} onClick={() => setIntensity(k)} className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all ${intensity === k ? 'bg-slate-700 border-primary text-primary' : 'border-slate-700 text-slate-400'}`}>{v}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-300">{t.calc.weight}</label><span className="text-primary font-bold" style={{color: primaryColor}}>{weight}kg</span></div>
                  <input type="range" min="45" max="110" value={weight} onChange={(e)=>setWeight(e.target.value)} className="fatox-range" />
                </div>
                <div>
                  <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-300">{t.calc.duration}</label><span className="text-primary font-bold" style={{color: primaryColor}}>{duration}h</span></div>
                  <input type="range" min="1" max="12" step="0.5" value={duration} onChange={(e)=>setDuration(e.target.value)} className="fatox-range" />
                </div>
              </div>
            </div>
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-2 gap-6 text-center mb-6">
                <div><div className="text-[10px] font-bold text-slate-500 mb-1">{t.calc.normalRunner}</div><div className="text-xl font-bold text-white">{results.normalRange[0]}-{results.normalRange[1]}g</div></div>
                <div className="border-l border-slate-800"><div className="text-[10px] font-bold text-primary mb-1" style={{color: primaryColor}}>{t.calc.youFatOx}</div><div className="text-xl font-black text-white">{results.adaptedRange[0]}-{results.adaptedRange[1]}g</div></div>
              </div>
              <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 flex items-center gap-4">
                <Icons.Zap className="w-6 h-6 text-primary" style={{color: primaryColor}} />
                <div><p className="text-xs md:text-sm text-slate-300">{t.calc.resultGain} <span className="text-white font-bold">~{results.diffKcal} kcal</span> {t.calc.resultGain2}</p>
                <p className="text-[10px] font-bold mt-1" style={{color: primaryColor}}>{t.calc.resultGel} {results.gelsSaved} Gels</p></div>
              </div>
            </div>
            <p className="text-[9px] text-slate-600 mt-6 italic text-center">{t.calc.disclaimer}</p>
          </div>
        </div>
      )}

      {/* --- FAQ --- */}
      {activeTab === 'faq' && (
        <div className="max-w-3xl mx-auto space-y-4 animate-enter">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{t.faq.title}</h3>
          {t.faq.items.map((item, i) => (
            <div key={i} className="fatox-glass p-6 rounded-2xl border border-slate-700 group">
              <div className="font-bold text-white mb-3 flex items-center gap-3"><div className="p-1.5 bg-primary/10 rounded-lg" style={{color: primaryColor}}><Icons.Brain className="w-4 h-4" /></div> {item.q}</div>
              <p className="text-sm text-slate-400 leading-relaxed pl-10">
                {item.a.split(/(\[\d\])/g).map((part, j) => {
                  const m = part.match(/\[(\d)\]/);
                  return m ? <Citation key={j} id={m[1]} /> : part;
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* --- METOTLAR --- */}
      {activeTab === 'methods' && (
        <div className="grid md:grid-cols-2 gap-4 animate-enter">
          {t.methods.cards.map((c, i) => (
            <div key={i} className="fatox-glass p-6 rounded-2xl border border-slate-800 flex flex-col h-full hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-3"><h4 className="font-bold text-white text-base">{c.t}</h4><Icons.TrendingUp className="w-4 h-4 text-primary" style={{color: primaryColor}} /></div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">{c.d}</p>
              <div className="flex gap-2">{c.b.map((tag, j) => (<span key={j} className="text-[9px] font-bold bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{tag}</span>))}</div>
            </div>
          ))}
        </div>
      )}

      {/* --- PLAN --- */}
      {activeTab === 'plan' && (
        <div className="fatox-glass p-6 md:p-10 rounded-3xl animate-enter shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-2"><Icons.Calendar className="w-5 h-5 text-primary" style={{color: primaryColor}} /> {t.plan.title}</h3>
          <div className="relative border-l-2 border-slate-800 ml-4 pl-8 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-900 border-2 border-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" style={{borderColor: primaryColor}}></div>
              <h4 className="text-lg font-bold text-primary mb-2" style={{color: primaryColor}}>{t.plan.w13.t}</h4>
              <p className="text-xs text-slate-500 mb-4">{t.plan.w13.d}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800"><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">{t.plan.w13.wd}</div><div className="text-sm font-medium">{t.plan.w13.wda}</div></div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800"><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">{t.plan.w13.we}</div><div className="text-sm font-medium">{t.plan.w13.wea}</div></div>
              </div>
              <p className="text-[10px] text-slate-500 italic mt-3">{t.plan.w13.n}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-900 border-2 border-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]"></div>
              <h4 className="text-lg font-bold text-blue-400 mb-2">{t.plan.w4.t}</h4>
              <p className="text-xs text-slate-500 mb-4">{t.plan.w4.d}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800"><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">{t.plan.w4.wd}</div><div className="text-sm font-medium uppercase font-bold">{t.plan.w4.wda}</div></div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800"><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">{t.plan.w4.we}</div><div className="text-sm font-black text-primary uppercase" style={{color: primaryColor}}>{t.plan.w4.wea}</div></div>
              </div>
              <p className="text-[10px] text-slate-500 italic mt-3">{t.plan.w4.n}</p>
            </div>
          </div>
        </div>
      )}

      {/* REFERANSLAR */}
      <div className="pt-10 border-t border-slate-800">
        <button onClick={() => setShowRefs(!showRefs)} className="w-full py-4 text-[10px] font-bold text-slate-600 hover:text-primary transition-colors tracking-widest uppercase">
          {showRefs ? t.footer.hide : t.footer.show}
        </button>
        {showRefs && (
          <div className="space-y-4 pt-4 animate-enter max-w-4xl mx-auto">
            <div id="fatox-ref-1" className="text-[10px] text-slate-500 leading-relaxed p-3 rounded-lg hover:bg-slate-800/50"><span className="text-primary font-bold mr-2">[1]</span>Sakamoto T, et al. Effects of Short-Term Nighttime Carbohydrate Restriction Method on Exercise Performance and Fat Metabolism. <em>Nutrients</em>. 2024;16:2138.</div>
            <div id="fatox-ref-2" className="text-[10px] text-slate-500 leading-relaxed p-3 rounded-lg hover:bg-slate-800/50"><span className="text-primary font-bold mr-2">[2]</span>Marquet LA, et al. Enhanced Endurance Performance by Periodization of Carbohydrate Intake: “Sleep Low” Strategy. <em>Med Sci Sports Exerc</em>. 2016;48(4):663–672.</div>
            <div id="fatox-ref-3" className="text-[10px] text-slate-500 leading-relaxed p-3 rounded-lg hover:bg-slate-800/50"><span className="text-primary font-bold mr-2">[3]</span>Podlogar T, et al. Delayed carbohydrate feeding during a subacute “sleep-low” intervention maintains high muscle oxidative capacity. <em>Eur J Sport Sci</em>. 2020.</div>
            <div id="fatox-ref-4" className="text-[10px] text-slate-500 leading-relaxed p-3 rounded-lg hover:bg-slate-800/50"><span className="text-primary font-bold mr-2">[4]</span>Molloy E, Murphy-Griffin M, Harrison M. A ‘Sleep-Low, Train-Low’ Intervention Improves Physiological and Performance Metrics in Recreationally Endurance-Trained Women. <em>Applied Physiology, Nutrition, and Metabolism</em>. 2024.</div>
            <div id="fatox-ref-5" className="text-[10px] text-slate-500 leading-relaxed p-3 rounded-lg hover:bg-slate-800/50"><span className="text-primary font-bold mr-2">[5]</span>Volek JS, et al. Metabolic characteristics of keto-adapted ultra-endurance runners. <em>Metabolism</em>. 2016;65(3):100–110.</div>
            <div id="fatox-ref-6" className="text-[10px] text-slate-500 leading-relaxed p-3 rounded-lg hover:bg-slate-800/50"><span className="text-primary font-bold mr-2">[6]</span>Burke LM, et al. Adaptation to a low carbohydrate high fat diet impairs endurance exercise metabolism and performance. <em>J Physiol</em>. 2021;599:771–790.</div>
          </div>
        )}
      </div>
    </div>
  );
};

window.FatOxPage = FatOxPage;
