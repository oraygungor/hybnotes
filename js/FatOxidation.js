const { useState, useEffect, useMemo } = React; 

// --- ICONS (Dahili kullanım için) ---
const FatOxIcons = {
  BookOpen: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Calculator: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
  Zap: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  TrendingUp: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Calendar: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  ChevronDown: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Brain: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
};

const FatOxPage = ({ lang, activeTheme }) => {
  const [activeSubTab, setActiveSubTab] = useState('education');
  const [showRefs, setShowRefs] = useState(false);
  const primaryColor = activeTheme ? activeTheme.hex : '#10b981';

  // --- İÇERİK DATA (TR/EN) ---
  const CONTENT = {
    tr: {
      title: "Ultra FatOx",
      tabs: { education: "Eğitim", faq: "Soru-Cevap", calculator: "Hesaplayıcı", methods: "Metotlar", plan: "Plan (4H)" },
      edu: {
        title: "Yağ Oksidasyonu Temelleri",
        intro: "Antrenman sırasında enerji üretmek için vücudun depolanmış yağları parçalama yeteneğidir.",
        glycogen: "Glikojen (Kısıtlı)",
        glycogenDesc: "~1.600 - 2.500 kcal arası depolar. Yüksek şiddette ana yakıttır.",
        fat: "Yağ (Geniş)",
        fatDesc: "~50.000 - 100.000+ kcal. Sürdürülebilir enerji sağlar.",
        stats: [
          { l: "TASARRUF", v: "Glikojen Koruma", s: "Karbonhidratları yarışın son bölümleri için saklar." },
          { l: "KONFOR", v: "Mide Rahatlığı", s: "Daha az dış kaynaklı (jel/spor içeceği) besin gereksinimi." },
          { l: "STABİLİTE", v: "Sabit Enerji", s: "Kan şekeri dalgalanmalarını ve 'duvara çarpma' riskini azaltır." }
        ]
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        items: [
          { q: "Performansı artırdığı kesin mi?", a: "Doğrudan 'hızlanma' yerine, glikojen depolarını koruyarak tükenmeyi geciktirdiği kanıtlanmıştır. Marquet [2], 'sleep-low' protokolünün 10km performansını kontrol grubuna göre anlamlı derecede iyileştirdiğini (73s vs 10s iyileşme) raporlamıştır." },
          { q: "En etkili yöntem hangisidir?", a: "Sakamoto [1] ve Marquet [2], 'Sleep Low' yönteminin yağ metabolizmasını iyileştirdiğini ve VO2peak gibi performans metriklerinde artış sağladığını göstermektedir. Keto diyeti [5] yağ yakımını maksimize etse de egzersiz ekonomisini bozabilir [6]." },
          { q: "Geç beslenme (Delayed Feeding) ne sağlar?", a: "Podlogar [3], antrenman sırasında karbonhidrat alımını geciktirmenin, kas adaptasyonlarını bozmadan yüksek yağ oksidasyonunu (ortalama 0.56-0.60 g/dk) sürdürdüğünü bulmuştur." },
          { q: "Kadın sporcular için veriler ne diyor?", a: "Molloy ve ark. [4], 12 haftalık 'Sleep-Low' protokolünün kadın sporcularda hem fizyolojik metrikleri hem de zamana karşı (time-trial) performansını iyileştirdiğini kanıtlamıştır." }
        ]
      },
      calc: {
        title: "Potansiyel Tahmini",
        subtitle: "Yağ adaptasyonunun size kazandırabileceği teorik enerjiyi hesaplayın.",
        strategy: "PROTOKOL",
        weight: "Ağırlık (kg)",
        duration: "Süre (Saat)",
        result: "Kazandığınız teorik enerji:",
        gelEquiv: "Yaklaşık Jel Karşılığı:",
        disclaimer: "*Bu bir matematiksel modeldir; Sakamoto [1], Marquet [2] ve Volek [5] verilerinden türetilmiştir. Kişiye göre %30-40 sapma gösterebilir. Laboratuvar testi değildir."
      },
      methods: {
        title: "Nasıl Artırılır?",
        cards: [
          { t: "1. Sleep Low (Gece Kısıtlaması)", d: "Sakamoto [1] ve Marquet [2]'ye göre; akşam antrenmanından sonra karbonhidrat almayıp sabah düşük glikojenle antrenman yapmak performansı iyileştirir.", b: ["Altın Standart", "Performans"] },
          { t: "2. Ketojenik Diyet (LCHF)", d: "Volek [5]'e göre yağ oksidasyonunu zirveye çıkarır. Ancak Burke [6]'nın gösterdiği gibi, egzersiz ekonomisini bozabilir.", b: ["Maksimum Yakım", "Ekonomi Riski"] },
          { t: "3. Gecikmeli Beslenme", d: "Sabah antrenmanında karbonhidrat alımını geciktirerek (Podlogar [3]), performansı korurken yüksek yağ oksidasyonunu sürdürmek.", b: ["Stratejik", "Orta Şiddet"] },
          { t: "4. Aç Karnına Antrenman", d: "Temel yöntem. Gece boyu açlıktan sonra sabah yapılan egzersiz yağ kullanımını artırır.", b: ["Başlangıç", "Kolay"] }
        ]
      },
      plan: {
        title: "4 Haftalık Uygulama Planı",
        w13: { t: "Hafta 1-3: İnşa Dönemi", wd: "Hafta İçi (Sal/Per)", wda: "Sleep Low (Aç Koşu)", we: "Hafta Sonu", wea: "Train High (Karbonhidratlı)", n: "*Hafta sonu midenizi jölelere/jellere alıştırmalısınız." },
        w4: { t: "Hafta 4: Yarış Haftası (Taper)", wd: "Pzt - Cuma", wda: "Normal Beslenme", we: "Son 48 Saat", wea: "Karbonhidrat Yüklemesi", n: "*Hedef: Son 36-48 saatte 10-12g/kg karbonhidrat." }
      }
    },
    en: {
      title: "Ultra FatOx",
      tabs: { education: "Education", faq: "Q&A", calculator: "Calculator", methods: "Methods", plan: "Plan (4W)" },
      edu: {
        title: "Fat Oxidation Basics",
        intro: "The body's ability to break down stored fats for energy during exercise.",
        glycogen: "Glycogen (Limited)",
        glycogenDesc: "~1,600 - 2,500 kcal storage. Key for high intensity.",
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
          { q: "Does it guarantee performance?", a: "Rather than direct speed gain, it is proven to delay fatigue by sparing glycogen. Marquet [2] reported significant improvement in 10k performance." },
          { q: "What is the best method?", a: "Sakamoto [1] and Marquet [2] show 'Sleep Low' improves fat metabolism and performance metrics like VO2peak." },
          { q: "What does delayed feeding offer?", a: "Podlogar [3] found that delaying carb intake during exercise maintains high fat oxidation rates without compromising adaptation." }
        ]
      },
      calc: {
        title: "Potential Estimator",
        subtitle: "Calculate theoretical energy gains from fat adaptation.",
        strategy: "PROTOCOL",
        weight: "Weight (kg)",
        duration: "Duration (Hours)",
        result: "Theoretical energy gained:",
        gelEquiv: "Approx. Gel Equivalent:",
        disclaimer: "*Mathematical model derived from Sakamoto [1], Marquet [2], and Volek [5]. Individual results vary by 30-40%."
      },
      methods: {
        title: "How to Increase?",
        cards: [
          { t: "1. Sleep Low (Night Restriction)", d: "Restricting carbs after PM training and performing a low-glycogen session in the AM improves performance [1, 2].", b: ["Gold Standard", "Performance"] },
          { t: "2. Keto Diet (LCHF)", d: "Maximizes fat oxidation [5] but may impair exercise economy [6].", b: ["Max Fat Burn", "Economy Risk"] },
          { t: "3. Delayed Feeding", d: "Delaying carb intake during training maintains high fat oxidation without compromising performance [3].", b: ["Strategic", "Medium"] },
          { t: "4. Fasted Training", d: "Training after an overnight fast increases fat utilization.", b: ["Beginner", "Easy"] }
        ]
      },
      plan: {
        title: "4-Week Action Plan",
        w13: { t: "Week 1-3: Build Phase", wd: "Weekdays (Tue/Thu)", wda: "Sleep Low (Fasted Run)", we: "Weekend", wea: "Train High (Carbs)", n: "*Train your gut with gels on weekend sessions." },
        w4: { t: "Week 4: Race Week", wd: "Mon - Fri", wda: "Normal Diet", we: "Last 48 Hours", wea: "Carb Loading", n: "*Target 10-12g/kg carbs in the last 36-48h." }
      }
    }
  };

  const t = CONTENT[lang] || CONTENT.tr;

  // --- HESAPLAMA MANTIĞI ---
  const [weight, setWeight] = useState(70);
  const [duration, setDuration] = useState(4);
  const [strategy, setStrategy] = useState('sleepLow');
  const [calcResults, setCalcResults] = useState({ diff: 0, gels: 0 });

  useEffect(() => {
    const mins = duration * 60;
    const wFactor = weight / 70;
    const normalAvg = 0.45 * wFactor * mins;
    const adaptedAvg = (strategy === 'keto' ? 1.15 : 0.75) * wFactor * mins;
    const diffKcal = Math.round((adaptedAvg - normalAvg) * 9.1);
    setCalcResults({ diff: diffKcal, gels: (diffKcal / 100).toFixed(1) });
  }, [weight, duration, strategy]);

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      {/* Başlık ve Tablar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white">{t.title}</h2>
          <p className="text-slate-500 text-sm mt-1">{lang === 'tr' ? 'Performans ve Yağ Metabolizması Analizi' : 'Performance and Fat Metabolism Analysis'}</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 overflow-x-auto no-scrollbar max-w-full">
          {Object.entries(t.tabs).map(([key, label]) => (
            <button 
              key={key} 
              onClick={() => setActiveSubTab(key)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeSubTab === key ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* --- EĞİTİM --- */}
      {activeSubTab === 'education' && (
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3" style={{ color: primaryColor }}>
              <FatOxIcons.BookOpen className="w-5 h-5" /> {t.edu.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{t.edu.intro}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-rose-500/20">
                <div className="flex justify-between mb-2"><span className="text-rose-400 font-bold text-xs">{t.edu.glycogen}</span></div>
                <div className="h-2 bg-slate-800 rounded-full mb-3"><div className="h-full bg-rose-500 w-1/12 rounded-full"></div></div>
                <p className="text-[11px] text-slate-500">{t.edu.glycogenDesc}</p>
              </div>
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-emerald-500/20">
                <div className="flex justify-between mb-2"><span className="text-emerald-400 font-bold text-xs">{t.edu.fat}</span></div>
                <div className="h-2 bg-slate-800 rounded-full mb-3"><div className="h-full bg-emerald-500 w-full rounded-full animate-pulse"></div></div>
                <p className="text-[11px] text-slate-500">{t.edu.fatDesc}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.edu.stats.map((s, i) => (
              <div key={i} className="bg-slate-800 p-5 rounded-2xl border-l-4 shadow-lg" style={{ borderLeftColor: primaryColor }}>
                <div className="text-[10px] font-black text-slate-500 mb-1 uppercase tracking-wider">{s.l}</div>
                <div className="text-lg font-bold text-white mb-1">{s.v}</div>
                <div className="text-xs text-slate-400 leading-tight">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SORU CEVAP --- */}
      {activeSubTab === 'faq' && (
        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.items.map((item, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-md">
              <div className="text-primary font-bold mb-2 flex items-center gap-2" style={{ color: primaryColor }}><FatOxIcons.Brain className="w-4 h-4" /> {item.q}</div>
              <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      )}

      {/* --- HESAPLAYICI --- */}
      {activeSubTab === 'calculator' && (
        <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl" style={{ color: primaryColor }}><FatOxIcons.Calculator className="w-8 h-8" /></div>
            <div><h3 className="text-xl font-bold text-white">{t.calc.title}</h3><p className="text-xs text-slate-500">{t.calc.subtitle}</p></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-3 uppercase tracking-widest">{t.calc.strategy}</label>
                <div className="flex gap-2 p-1 bg-slate-900/50 rounded-xl">
                  <button onClick={() => setStrategy('sleepLow')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${strategy === 'sleepLow' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-white'}`}>Sleep Low</button>
                  <button onClick={() => setStrategy('keto')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${strategy === 'keto' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-white'}`}>Keto</button>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-300">{t.calc.weight}</label><span className="text-primary font-bold" style={{ color: primaryColor }}>{weight}kg</span></div>
                  <input type="range" min="45" max="120" value={weight} onChange={(e)=>setWeight(e.target.value)} className="w-full accent-primary" />
                </div>
                <div>
                  <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-300">{t.calc.duration}</label><span className="text-primary font-bold" style={{ color: primaryColor }}>{duration}h</span></div>
                  <input type="range" min="1" max="15" step="0.5" value={duration} onChange={(e)=>setDuration(e.target.value)} className="w-full accent-primary" />
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-700/50 flex flex-col justify-center items-center text-center">
               <FatOxIcons.Zap className="w-12 h-12 mb-4 animate-pulse" style={{ color: primaryColor }} />
               <p className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-widest">{t.calc.result}</p>
               <div className="text-5xl font-black text-white mb-4">~{calcResults.diff} <span className="text-xl">kcal</span></div>
               <div className="text-sm font-black px-5 py-2 rounded-full bg-primary/10 border border-primary/20" style={{ color: primaryColor }}>{t.calc.gelEquiv} {calcResults.gels} Jels</div>
            </div>
          </div>
          <p className="text-[10px] text-slate-600 mt-10 text-center leading-tight italic">{t.calc.disclaimer}</p>
        </div>
      )}

      {/* --- METOTLAR --- */}
      {activeSubTab === 'methods' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.methods.cards.map((c, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-white group-hover:text-primary transition-colors">{c.t}</h4>
                <FatOxIcons.TrendingUp className="w-4 h-4 text-slate-600" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{c.d}</p>
              <div className="flex gap-2">{c.b.map((tag, j) => (<span key={j} className="text-[9px] font-bold bg-slate-900 text-slate-500 px-2 py-1 rounded border border-slate-700">{tag}</span>))}</div>
            </div>
          ))}
        </div>
      )}

      {/* --- PLAN --- */}
      {activeSubTab === 'plan' && (
        <div className="bg-slate-800 p-6 md:p-10 rounded-3xl border border-slate-700 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3"><FatOxIcons.Calendar className="w-5 h-5 text-emerald-400" /> {t.plan.title}</h3>
          <div className="space-y-10 relative border-l-2 border-slate-700 ml-4 pl-8">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-900 border-2 border-primary rounded-full" style={{ borderColor: primaryColor }}></div>
              <h4 className="font-bold text-white text-lg mb-4">{t.plan.w13.t}</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700"><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">Hafta İçi</div><div className="text-sm font-medium">{t.plan.w13.wd}: {t.plan.w13.wda}</div></div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700"><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">Hafta Sonu</div><div className="text-sm font-medium">{t.plan.w13.we}: {t.plan.w13.wea}</div></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic">{t.plan.w13.n}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-900 border-2 border-blue-500 rounded-full"></div>
              <h4 className="font-bold text-white text-lg mb-4">{t.plan.w4.t}</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700"><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">Pzt-Cum</div><div className="text-sm font-medium">{t.plan.w4.wd}: {t.plan.w4.wda}</div></div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700"><div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">Son Dönem</div><div className="text-sm font-medium text-primary" style={{ color: primaryColor }}>{t.plan.w4.we}: {t.plan.w4.wea}</div></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic">{t.plan.w4.n}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- GLOBAL ATAMA (CRITICAL) ---
window.FatOxPage = FatOxPage;
