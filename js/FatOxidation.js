const { useState, useEffect, useRef, useMemo } = React;

// --- ICONS (App.js ile çakışmaması için isimleri özelleştirildi) ---
const FatOxIcons = {
  BookOpen: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Calculator: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
  Activity: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Zap: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Brain: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
  TrendingUp: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Calendar: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  ChevronDown: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Globe: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
};

// --- STYLES (FatOx'a özel görsel efektler) ---
const FatOxStyles = ({ primaryColor }) => (
  <style>{`
    .fatox-glass { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .fatox-gradient-text { background: linear-gradient(135deg, ${primaryColor} 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .no-scrollbar-fatox::-webkit-scrollbar { display: none; }
    .no-scrollbar-fatox { -ms-overflow-style: none; scrollbar-width: none; }
    input[type=range].range-fatox { -webkit-appearance: none; width: 100%; background: transparent; height: 32px; }
    input[type=range].range-fatox::-webkit-slider-thumb { -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: ${primaryColor}; cursor: pointer; margin-top: -10px; box-shadow: 0 0 12px rgba(16,185,129,0.4); }
    input[type=range].range-fatox::-webkit-slider-runnable-track { width: 100%; height: 6px; cursor: pointer; background: #334155; border-radius: 3px; }
    .animate-enter-fatox { animation: enterFatOx 0.4s ease-out forwards; opacity: 0; transform: translateY(8px); }
    @keyframes enterFatOx { to { opacity: 1; transform: translateY(0); } }
  `}</style>
);

const FatOxPage = ({ lang, activeTheme }) => {
  const [activeTab, setActiveTab] = useState('education');
  const [showRefs, setShowRefs] = useState(false);
  const primaryColor = activeTheme ? activeTheme.hex : '#10b981';

  // --- İÇERİK SİSTEMİ ---
  const CONTENT = {
    tr: {
      hero: { tag: "Sınırsız Enerji", desc: "Metabolik esnekliğinizi artırarak vücudunuzu bir yağ yakma makinesine dönüştürün. Bilimsel protokollerle performansınızı optimize edin." },
      tabs: { education: "Eğitim (101)", faq: "Soru/Cevap", calculator: "Hesaplayıcı", methods: "Metotlar", plan: "Plan (4H)" },
      edu: {
        title: "Yağ Oksidasyonu Temelleri",
        intro: "Antrenman sırasında enerji üretmek için vücudun depolanmış yağları parçalama yeteneğidir.",
        glycogen: "Glikojen (Kısıtlı)",
        glycogenDesc: "~1.600 - 2.500 kcal arası depolar. Yüksek şiddette ana yakıttır.",
        fat: "Yağ (Geniş)",
        fatDesc: "~50.000 - 100.000+ kcal. Düşük/orta şiddette sürdürülebilir enerji sağlar.",
        stats: [
          { l: "TASARRUF", v: "Glikojen Koruma", s: "Karbonhidratları yarışın son bölümleri için saklar." },
          { l: "KONFOR", v: "Mide Rahatlığı", s: "Daha az dış kaynaklı (jel/spor içeceği) besin gereksinimi." },
          { l: "STABİLİTE", v: "Sabit Enerji", s: "Kan şekeri dalgalanmalarını ve 'duvara çarpma' riskini azaltır." }
        ]
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        items: [
          { q: "Performansı artırdığı kesin mi?", a: "Doğrudan 'hızlanma' yerine, glikojen depolarını koruyarak tükenmeyi geciktirdiği kanıtlanmıştır. Marquet [2], 'sleep-low' protokolünün 10km performansını kontrol grubuna göre anlamlı derecede iyileştirdiğini raporlamıştır." },
          { q: "En etkili yöntem hangisidir?", a: "Sakamoto [1] ve Marquet [2], 'Sleep Low' yönteminin yağ metabolizmasını ve VO2peak gibi performans metriklerinde iyileşme sağladığını göstermektedir. Keto diyeti [5] yağ yakımını maksimize etse de, egzersiz ekonomisini bozabilir [6]." },
          { q: "Geç beslenme (Delayed Feeding) ne sağlar?", a: "Podlogar [3], antrenman sırasında karbonhidrat alımını geciktirmenin, kas adaptasyonlarını bozmadan yüksek yağ oksidasyonunu koruduğunu (anlamlı fark olmaksızın sürdürdüğünü) bulmuştur." },
          { q: "Kadın sporcular için veriler ne diyor?", a: "Molloy ve ark. [4], 12 haftalık 'Sleep-Low' protokolünün kadın sporcularda hem fizyolojik metrikleri hem de zamana karşı (time-trial) performansını iyileştirdiğini kanıtlamıştır." },
          { q: "Keto/LCHF diyeti neden riskli?", a: "Burke [6] çalışması, ketojenik diyetin egzersiz ekonomisini bozduğunu ve yüksek şiddetli performansı düşürdüğünü raporlamıştır." }
        ]
      },
      calc: {
        title: "Potansiyel Tahmini",
        subtitle: "Yağ adaptasyonunun size kazandırabileceği teorik enerjiyi hesaplayın.",
        strategy: "PROTOKOL",
        stratTypes: { sleepLow: "Sleep Low (Dengeli)", keto: "Keto (Maksimum)" },
        intensity: "KOŞU ŞİDDETİ",
        intTypes: { z2: "Düşük (Z2)", z3: "Tempo (Z3)" },
        weight: "Ağırlık (kg)",
        duration: "Süre (Saat)",
        normal: "STANDART",
        adapted: "ADAPTE (TAHMİNİ)",
        result: "Kazandığınız teorik enerji:",
        gelEquiv: "Yaklaşık Jel Karşılığı:",
        disclaimer: "*Bu hesaplama Sakamoto [1], Marquet [2] ve Volek [5] verilerinden türetilen bir 'Matematiksel Model'dir. Laboratuvar testi değildir."
      },
      methods: {
        title: "Nasıl Artırılır?",
        cards: [
          { t: "1. Sleep Low", d: "Akşam antrenmanından sonra karbonhidrat almayıp sabah düşük glikojenle antrenman yapmak performansı iyileştirir [1, 2].", b: ["Altın Standart"] },
          { t: "2. Ketojenik Diyet", d: "Yağ oksidasyonunu zirveye çıkarır [5]. Ancak Burke [6]'nın gösterdiği gibi, ekonomiyi bozabilir.", b: ["Max Yağ Yakımı"] },
          { t: "3. Gecikmeli Beslenme", d: "Podlogar [3]'a göre; antrenman sırasında karbonhidrat alımını geciktirmek adaptasyonu sürdürür.", b: ["Stratejik"] },
          { t: "4. Aç Karnına Antrenman", d: "Temel yöntem. Gece boyu açlıktan sonra sabah yapılan egzersiz yağ kullanımını artırır.", b: ["Başlangıç"] }
        ]
      },
      plan: {
        title: "4 Haftalık Uygulama Planı",
        w13: { t: "Hafta 1-3: İnşa Dönemi", d: "Metabolik motoru kurma aşaması.", wd: "Hafta İçi", wda: "Sleep Low (Aç Koşu)", we: "Hafta Sonu", wea: "Train High (Karbonhidratlı)", n: "*Hafta sonu midenizi jölelere alıştırmalısınız." },
        w4: { t: "Hafta 4: Yarış Haftası (Taper)", d: "Stresi azalt, depoları doldur.", wd: "Pzt - Cuma", wda: "Normal Beslenme", we: "Son 48 Saat", wea: "Karbonhidrat Yüklemesi", n: "*Hedef: 10-12g/kg karbonhidrat." }
      }
    },
    en: {
      hero: { tag: "Unlimited Energy", desc: "Transform your body into a fat-burning machine. Optimize performance with scientifically backed metabolic flexibility protocols." },
      tabs: { education: "Education (101)", faq: "Q&A", calculator: "Calculator", methods: "Methods", plan: "4W Plan" },
      edu: {
        title: "Fat Oxidation Basics",
        intro: "The body's ability to break down stored triglycerides for energy production during exercise.",
        glycogen: "Glycogen (Limited)",
        glycogenDesc: "~1,600 - 2,500 kcal storage. Primary fuel for high intensity.",
        fat: "Fat (Vast)",
        fatDesc: "~50,000 - 100,000+ kcal. Sustainable energy source.",
        stats: [
          { l: "SPARING", v: "Glycogen Sparing", s: "Saves carbs for critical final race moments." },
          { l: "COMFORT", v: "Gut Comfort", s: "Reduces dependence on external fuel (gels)." },
          { l: "STABILITY", v: "Steady Energy", s: "Minimizes blood sugar spikes and bonking risk." }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Is performance improvement guaranteed?", a: "Marquet [2] reported that the 'sleep-low' protocol significantly improved 10km performance." },
          { q: "What is the most effective method?", a: "Sakamoto [1] and Marquet [2] show 'Sleep Low' improves fat metabolism and VO2peak." },
          { q: "What does delayed feeding offer?", a: "Podlogar [3] found that delaying carb intake during exercise maintains high fat oxidation rates." },
          { q: "Effective for women?", a: "Yes. Molloy et al. [4] confirmed improvement in female athletes." },
          { q: "Why is Keto risky?", a: "Burke [6] reported that LCHF diets may impair exercise economy." }
        ]
      },
      calc: {
        title: "Potential Estimator",
        subtitle: "Calculate theoretical energy gains from fat adaptation.",
        strategy: "PROTOCOL",
        stratTypes: { sleepLow: "Sleep Low (Balanced)", keto: "Keto (Maximum)" },
        intensity: "INTENSITY",
        intTypes: { z2: "Low (Z2)", z3: "Tempo (Z3)" },
        weight: "Weight (kg)",
        duration: "Duration (Hours)",
        normal: "STANDARD",
        adapted: "ADAPTED (EST.)",
        result: "Theoretical energy gained:",
        gelEquiv: "Approx. Gel Equivalent:",
        disclaimer: "*Derived from Sakamoto [1], Marquet [2], and Volek [5]. Not a lab test."
      },
      methods: {
        title: "How to Increase?",
        cards: [
          { t: "1. Sleep Low", d: "Restricting carbs after PM training and running low-glycogen in the AM improves performance [1, 2].", b: ["Gold Standard"] },
          { t: "2. Keto Diet", d: "Maximizes fat oxidation [5] but may impair exercise economy [6].", b: ["Max Fat Burn"] },
          { t: "3. Delayed Feeding", d: "Delaying carb intake during training maintains high fat oxidation [3].", b: ["Strategic"] },
          { t: "4. Fasted Training", d: "A basic method. Morning exercise after an overnight fast increases fat use.", b: ["Beginner"] }
        ]
      },
      plan: {
        title: "4-Week Action Plan",
        w13: { t: "Week 1-3: Build Phase", wd: "Weekdays", wda: "Sleep Low (Fasted Run)", we: "Weekend", wea: "Train High (Carbs)", n: "*Train your gut with gels on weekend sessions." },
        w4: { t: "Week 4: Race Week (Taper)", wd: "Mon - Fri", wda: "Normal Nutrition", we: "Last 48 Hours", wea: "Carb Loading", n: "*Target 10-12g/kg carbs in the last 36-48h." }
      }
    }
  };

  const t = CONTENT[lang] || CONTENT.tr;

  // --- HESAPLAMA MANTIĞI ---
  const [weight, setWeight] = useState(70);
  const [duration, setDuration] = useState(4);
  const [strategy, setStrategy] = useState('sleepLow');
  const [intensity, setIntensity] = useState('z2');
  const [calcResults, setCalcResults] = useState({ diff: 0, gels: 0, range: [0, 0] });

  useEffect(() => {
    const COEFFS = {
      z2: { normal: [0.35, 0.55], sleepLow: [0.65, 0.85], keto: [0.95, 1.35] },
      z3: { normal: [0.15, 0.25], sleepLow: [0.35, 0.55], keto: [0.65, 0.95] }
    };
    const c = COEFFS[intensity];
    const wFactor = parseFloat(weight) / 70;
    const mins = parseFloat(duration) * 60;
    const nr = [Math.round(c.normal[0] * wFactor * mins), Math.round(c.normal[1] * wFactor * mins)];
    const ar = [Math.round((strategy === 'keto' ? c.keto : c.sleepLow)[0] * wFactor * mins), Math.round((strategy === 'keto' ? c.keto : c.sleepLow)[1] * wFactor * mins)];
    const diffKcal = Math.round(((ar[0]+ar[1])/2 - (nr[0]+nr[1])/2) * 9.1);

    setCalcResults({ diff: diffKcal, gels: (diffKcal / 100).toFixed(1), normalRange: nr, adaptedRange: ar });
  }, [weight, duration, strategy, intensity]);

  // --- COMPONENTS ---
  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="fatox-glass rounded-2xl overflow-hidden mb-3 border border-slate-700/50">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-5 text-left min-h-[56px]">
          <span className="font-bold text-slate-200 text-sm md:text-base pr-4">{question}</span>
          <FatOxIcons.ChevronDown className={`w-5 h-5 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} style={{ color: primaryColor }} />
        </button>
        {isOpen && (
          <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-700/50 pt-3">
            {answer.split(/(\[\d\])/g).map((part, i) => {
              const m = part.match(/\[(\d)\]/);
              if (m) return <button key={i} onClick={() => {setShowRefs(true); setTimeout(() => {document.getElementById(`ref-fatox-${m[1]}`).scrollIntoView({behavior:'smooth',block:'center'});},100);}} className="inline-flex items-center justify-center w-4 h-4 mx-0.5 text-[10px] bg-slate-800 text-primary border border-primary/30 rounded-sm" style={{color:primaryColor}}>{m[1]}</button>;
              return part;
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="animate-enter-fatox space-y-8 pb-10">
      <FatOxStyles primaryColor={primaryColor} />
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">Ultra <span className="fatox-gradient-text">FatOx</span></h1>
          <p className="text-slate-500 text-sm mt-2 max-w-md">{t.hero.desc}</p>
        </div>
      </div>

      {/* NAV TABS */}
      <div className="sticky top-20 z-40 py-2 bg-slate-900/40 backdrop-blur-md border-b border-slate-800/50 overflow-x-auto no-scrollbar-fatox">
        <nav className="flex gap-2 pb-1">
          {Object.entries(t.tabs).map(([key, label]) => (
            <button key={key} onClick={() => {setActiveTab(key); window.scrollTo({top:0, behavior:'smooth'});}} className={`flex items-center gap-2 px-4 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap min-h-[44px] ${activeTab === key ? 'bg-slate-800 text-white border border-slate-700 shadow-lg' : 'text-slate-400 hover:text-white'}`} style={activeTab === key ? { color: primaryColor, borderColor: `${primaryColor}4D` } : {}}>
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[500px]">
        {/* EDUCATION */}
        {activeTab === 'education' && (
          <div className="animate-enter-fatox space-y-6">
            <div className="fatox-glass p-6 md:p-8 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3"><FatOxIcons.BookOpen className="w-5 h-5" style={{ color: primaryColor }} /> {t.edu.title}</h2>
              <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">{t.edu.intro}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 p-5 rounded-2xl border border-rose-500/20">
                  <div className="flex justify-between mb-2"><span className="text-rose-400 font-bold text-xs uppercase">{t.edu.glycogen}</span><span className="text-rose-400 text-[10px] font-bold">~2.000 kcal</span></div>
                  <div className="h-3 bg-slate-800 rounded-full mb-3"><div className="h-full bg-rose-500 w-[12%] rounded-full"></div></div>
                  <p className="text-xs text-slate-500 leading-relaxed">{t.edu.glycogenDesc}</p>
                </div>
                <div className="bg-slate-900/50 p-5 rounded-2xl border border-emerald-500/20">
                  <div className="flex justify-between mb-2"><span className="text-emerald-400 font-bold text-xs uppercase">{t.edu.fat}</span><span className="text-emerald-400 text-[10px] font-bold">100.000+ kcal</span></div>
                  <div className="h-3 bg-slate-800 rounded-full mb-3"><div className="h-full bg-emerald-500 w-full rounded-full animate-pulse"></div></div>
                  <p className="text-xs text-slate-500 leading-relaxed">{t.edu.fatDesc}</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">{t.edu.stats.map((s, i) => (<div key={i} className="fatox-glass p-5 rounded-2xl border-l-4 shadow-xl" style={{ borderLeftColor: primaryColor }}><div className="text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">{s.l}</div><div className="text-lg font-bold text-white mb-1">{s.v}</div><div className="text-xs text-slate-400 leading-tight">{s.s}</div></div>))}</div>
          </div>
        )}

        {/* FAQ (SORU CEVAP) */}
        {activeTab === 'faq' && (
          <div className="animate-enter-fatox max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">{t.faq.title}</h2>
            {t.faq.items.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        )}

        {/* CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="animate-enter-fatox space-y-6">
            <div className="fatox-glass p-6 md:p-8 rounded-3xl border-t-4 shadow-2xl" style={{ borderTopColor: primaryColor }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl" style={{ color: primaryColor }}><FatOxIcons.Calculator className="w-8 h-8" /></div>
                <div><h2 className="text-xl font-bold text-white">{t.calc.title}</h2><p className="text-xs text-slate-500">{t.calc.subtitle}</p></div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-3 tracking-widest uppercase">{t.calc.strategy}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(t.calc.stratTypes).map(([k, v]) => (<button key={k} onClick={() => setStrategy(k)} className={`py-2 px-1 text-[10px] md:text-xs font-bold rounded-lg border transition-all ${strategy === k ? 'text-white shadow-lg' : 'border-slate-700 text-slate-400'}`} style={strategy === k ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}>{v}</button>))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-3 tracking-widest uppercase">{t.calc.intensity}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(t.calc.intTypes).map(([k, v]) => (<button key={k} onClick={() => setIntensity(k)} className={`py-2 px-1 text-[10px] md:text-xs font-bold rounded-lg border transition-all ${intensity === k ? 'bg-slate-700 text-white' : 'border-slate-700 text-slate-400'}`} style={intensity === k ? { color: primaryColor, borderColor: primaryColor } : {}}>{v}</button>))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div><div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-300">{t.calc.weight}</label><span className="font-bold no-zoom-fatox" style={{ color: primaryColor }}>{weight}kg</span></div><input type="range" min="45" max="120" value={weight} onChange={(e)=>setWeight(e.target.value)} className="range-fatox" /></div>
                  <div><div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-300">{t.calc.duration}</label><span className="font-bold text-sm" style={{ color: primaryColor }}>{duration}h</span></div><input type="range" min="1" max="15" step="0.5" value={duration} onChange={(e)=>setDuration(e.target.value)} className="range-fatox" /></div>
                </div>
              </div>
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
                <div className="grid grid-cols-2 gap-6 text-center mb-6">
                  <div><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">{t.calc.normal}</div><div className="text-xl font-bold text-white">{calcResults.normalRange[0]}-{calcResults.normalRange[1]}g</div></div>
                  <div className="border-l border-slate-800"><div className="text-[10px] font-bold mb-1 uppercase" style={{ color: primaryColor }}>{t.calc.adapted}</div><div className="text-xl font-black text-white">{calcResults.adaptedRange[0]}-{calcResults.adaptedRange[1]}g</div></div>
                </div>
                <div className="p-4 rounded-xl border flex items-center gap-4 shadow-inner" style={{ backgroundColor: `${primaryColor}1A`, borderColor: `${primaryColor}33` }}>
                  <FatOxIcons.Zap className="w-6 h-6 flex-shrink-0" style={{ color: primaryColor }} />
                  <div><p className="text-xs md:text-sm text-slate-300">{t.calc.result} <span className="text-white font-bold">~{calcResults.diff} kcal</span></p><p className="text-[10px] font-bold mt-1" style={{ color: primaryColor }}>{t.calc.gelEquiv} {calcResults.gels} Jels</p></div>
                </div>
              </div>
              <p className="text-[10px] text-slate-600 mt-6 leading-tight italic text-center">{t.calc.disclaimer}</p>
            </div>
          </div>
        )}

        {/* METHODS */}
        {activeTab === 'methods' && (
          <div className="animate-enter-fatox space-y-6">
            <h2 className="text-2xl font-bold text-white text-center mb-8">{t.methods.title}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {t.methods.cards.map((card, idx) => (
                <div key={idx} className="fatox-glass p-6 rounded-2xl border border-slate-800 flex flex-col h-full hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start mb-3"><h3 className="font-bold text-white text-base">{card.t}</h3><FatOxIcons.TrendingUp className="w-4 h-4" style={{ color: primaryColor }} /></div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">{card.d}</p>
                  <div className="flex gap-2 flex-wrap">{card.b.map((tag, i) => (<span key={i} className="text-[9px] font-bold bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 uppercase tracking-tighter">{tag}</span>))}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLAN */}
        {activeTab === 'plan' && (
          <div className="animate-enter-fatox space-y-6">
            <div className="fatox-glass p-6 md:p-10 rounded-3xl shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-10 flex items-center gap-2"><FatOxIcons.Calendar style={{ color: primaryColor }} /> {t.plan.title}</h2>
              <div className="relative border-l-2 border-slate-800 ml-4 pl-8 space-y-12">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-950 border-2 rounded-full shadow-lg" style={{ borderColor: primaryColor }}></div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>{t.plan.w13.t}</h3>
                  <p className="text-xs text-slate-500 mb-6">{t.plan.w13.d}</p>
                  <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-inner">
                    <div className="flex justify-between items-center text-sm"><span className="text-slate-400 font-bold uppercase text-xs">{t.plan.w13.wd}</span><span className="font-bold text-white uppercase text-xs">{t.plan.w13.wda}</span></div>
                    <div className="flex justify-between items-center text-sm"><span className="text-slate-400 font-bold uppercase text-xs">{lang==='tr'?'Hafta Sonu':'Weekend'}</span><span className="font-bold text-white uppercase text-xs">{t.plan.w13.wea}</span></div>
                    <p className="text-[10px] italic pt-2 border-t border-slate-800" style={{ color: primaryColor }}>{t.plan.w13.n}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-950 border-2 border-blue-500 rounded-full shadow-lg"></div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">{t.plan.w4.t}</h3>
                  <p className="text-xs text-slate-500 mb-6">{t.plan.w4.d}</p>
                  <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-inner">
                    <div className="flex justify-between items-center text-sm"><span className="text-slate-400 font-bold uppercase text-xs">{t.plan.w4.wd}</span><span className="font-bold text-white uppercase text-xs">{t.plan.w4.wda}</span></div>
                    <div className="flex justify-between items-center text-sm"><span className="text-slate-400 font-bold uppercase text-xs">{lang==='tr'?'Son 48 Saat':'Last 48 Hours'}</span><span className="font-bold uppercase text-xs" style={{ color: primaryColor }}>{t.plan.w4.wea}</span></div>
                    <p className="text-[10px] text-blue-400/80 italic pt-2 border-t border-slate-800">{t.plan.w4.n}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER REFS */}
      <footer className="mt-12 border-t border-slate-800">
        <button onClick={() => setShowRefs(!showRefs)} className="w-full py-8 text-xs font-bold text-slate-600 hover:text-white transition-colors tracking-widest uppercase">
          {showRefs ? (lang === 'tr' ? "REFERANSLARI GİZLE" : "HIDE REFERENCES") : (lang === 'tr' ? "BİLİMSEL REFERANSLARI GÖSTER" : "SHOW SCIENTIFIC REFERENCES")}
        </button>
        {showRefs && (
          <div className="space-y-4 pb-12 animate-enter-fatox">
            {[
              "[1] Sakamoto T, Ueda S-y, Nakahara H. Effects of Short-Term Nighttime Carbohydrate Restriction Method on Exercise Performance and Fat Metabolism. Nutrients. 2024;16:2138.",
              "[2] Marquet LA, Brisswalter J, Louis J, et al. Enhanced Endurance Performance by Periodization of Carbohydrate Intake: “Sleep Low” Strategy. Med Sci Sports Exerc. 2016;48(4):663–672.",
              "[3] Podlogar T, et al. Delayed carbohydrate feeding during a subacute “sleep-low” intervention maintains high muscle oxidative capacity. Eur J Sport Sci. 2020.",
              "[4] Molloy E, Murphy-Griffin M, Harrison M. A ‘Sleep-Low, Train-Low’ Intervention Improves Physiological and Performance Metrics in Recreationally Endurance-Trained Women. Applied Physiology, Nutrition, and Metabolism. 2024.",
              "[5] Volek JS, et al. Metabolic characteristics of keto-adapted ultra-endurance runners. Metabolism. 2016;65(3):100–110.",
              "[6] Burke LM, et al. Adaptation to a low carbohydrate high fat diet impairs endurance exercise metabolism and performance despite enhanced glycogen availability. J Physiol. 2021;599:771–790."
            ].map((ref, i) => (
              <div key={i} id={`ref-fatox-${i+1}`} className="text-[10px] text-slate-500 leading-relaxed p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                <span className="font-bold mr-2" style={{ color: primaryColor }}>{ref.substring(0,3)}</span> {ref.substring(4)}
              </div>
            ))}
          </div>
        )}
      </footer>
    </div>
  );
};

// Global scope expose
window.FatOxPage = FatOxPage;
