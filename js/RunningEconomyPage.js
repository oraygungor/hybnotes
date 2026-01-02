

const RunningEconomyPage = ({ lang, activeTheme }) => {
  const [activeModel, setActiveModel] = React.useState("zanini");
  const [zaniniPhase, setZaniniPhase] = React.useState("w1_3"); // w1_3 | w4_7 | w8_10

  // -----------------------------
  // TEXT CONTENT (Bilingual)
  // -----------------------------
  const t = {
    title: lang === "tr" ? "Koşu Ekonomisi" : "Running Economy",
    subtitle:
      lang === "tr"
        ? "Küçümsenen Performans Çarpanı"
        : "The Underrated Performance Multiplier",
    heroDesc:
      lang === "tr"
        ? 'Antrenman programlarında genellikle göz ardı edilen, ancak doğru işlendiğinde yarış performansında devasa kazanımlar sağlayan "gizli değişken" üzerine kapsamlı bir rehber.'
        : 'A comprehensive guide on the "hidden variable" often overlooked in training programs but providing massive gains in race performance when properly addressed.',

    // Navigation
    nav: {
      what: lang === "tr" ? "Nedir?" : "What is it?",
      how: lang === "tr" ? "Nasıl Gelişir?" : "How to Improve?",
      durability: lang === "tr" ? "Yeni Bulgu: Direnç" : "New Finding: Durability",
      training: lang === "tr" ? "Antrenman" : "Training",
      refs: lang === "tr" ? "Kaynaklar" : "References",
    },

    // Section 1: Definition
    sec1_title: lang === "tr" ? "Running Economy (RE) Nedir?" : "What is Running Economy (RE)?",
    sec1_desc:
      lang === "tr"
        ? 'Koşu ekonomisi, belirli bir submaksimal hızda koşarken vücudun ihtiyaç duyduğu enerji (oksijen) miktarıdır. Basitçe, vücudun "yakıt tasarrufu" verimliliğidir.'
        : 'Running economy is the energy (oxygen) demand for a given submaximal running velocity. Simply put, it is the body\'s "fuel efficiency".',
    re_note_title: lang === "tr" ? "Kafa Karışmasın:" : "Quick Note:",
    re_note_text:
      lang === "tr"
        ? "Bu sayfada RE’yi pratikte en sık kullanılan şekilde ‘oksijen maliyeti’ gibi düşün: aynı hızda daha AZ oksijen = daha iyi ekonomi."
        : "Here we treat RE as ‘oxygen/energy cost’: at the same pace, LESS oxygen = better economy.",

    analogy_title: lang === "tr" ? "Araba Analojisi" : "Car Analogy",
    analogy_text:
      lang === "tr"
        ? "İki araç aynı hızda (100 km/h) gidiyor. Biri 5 litre benzin yakıyor, diğeri 8 litre. 5 litre yakan (daha düşük maliyet) daha ekonomiktir ve deposu (glikojen) daha geç biter."
        : "Two cars traveling at the same speed (100 km/h). One burns 5 liters of gas, the other 8 liters. The one burning 5 liters (lower cost) is more economical, and its tank (glycogen) lasts longer.",
    why_title: lang === "tr" ? "Neden Önemlidir?" : "Why is it Important?",
    why_text:
      lang === "tr"
        ? "Benzer VO2max’a sahip sporcularda yarışı kazananı çoğu zaman RE belirler. Elit seviyede farklar küçük görünür ama belirleyicidir."
        : "Among athletes with similar VO2max, RE often determines the winner. Differences at the elite level are small but decisive.",

    // Jones 2020 phrasing: keep the useful number, soften “Breaking2” branding
    breaking2_label:
      lang === "tr"
        ? "2-Saat Maraton Temposu Verisi:"
        : "2-Hour Marathon-Pace Data:",
    breaking2_sub:
      lang === "tr"
        ? "Ortalama Oksijen Maliyeti (Jones et al., 2020)"
        : "Average Oxygen Cost (Jones et al., 2020)",

    track_title: lang === "tr" ? "RE’yi Nasıl Takip Edersin?" : "How to Track RE?",
    track_text:
      lang === "tr"
        ? "En pratik yol: aynı ayakkabı + benzer hava/zemin + aynı parkurda, sabit bir kolay tempo seç (örn. 20 dk). Zamanla aynı tempoda nabız/algı ve ‘rahatlık’ artıyorsa ekonomi genelde iyileşir."
        : "Practical approach: same shoes + similar conditions + same route, pick a fixed easy pace (e.g., 20 min). If over time the same pace feels easier / HR drifts less, economy is usually improving.",

    // Section 2: Mechanisms
    sec2_title: lang === "tr" ? "Nasıl Geliştirilir?" : "How is it Improved?",
    sec2_desc:
      lang === "tr"
        ? 'Literatür (Barnes & Kilding, Støren, Moore) sadece "daha çok koşmanın" tek başına yeterli olmadığını gösteriyor. Üç ana saç ayağı vardır:'
        : 'Literature (Barnes & Kilding, Støren, Moore) shows that simply "running more" is not enough on its own. There are three main pillars:',
    mech1_title: lang === "tr" ? "Motor Gücü (Nöral)" : "Motor Power (Neural)",
    mech1_text:
      lang === "tr"
        ? "RFD (Rate of Force Development): Kasın kuvvet üretme hızını artırmak. Genelde ağır yük + az tekrar ile sinir sistemini daha verimli çalıştırma hedeflenir."
        : "RFD (Rate of Force Development): increasing the speed of force production. Typically trained via heavy loads + low reps to improve neural efficiency.",
    mech2_title: lang === "tr" ? "Yay Sistemi (Stiffness)" : "Spring System (Stiffness)",
    mech2_text:
      lang === "tr"
        ? "Bacaklar yumuşak bir amortisör değil, kontrollü bir yay gibi davranmalıdır. Pliyometrikler tendon/alt bacak sertliğini artırarak yere iniş enerjisinin daha verimli geri kullanılmasına yardım eder."
        : "Legs should act like a controlled spring, not a soft shock absorber. Plyometrics can improve lower-limb stiffness and help recycle landing energy more efficiently.",
    mech3_title: lang === "tr" ? "Biyomekanik" : "Biomechanics",
    mech3_text:
      lang === "tr"
        ? '"Self-optimization" esastır: çoğu koşucu kendisi için ekonomik bir stile yakındır. Radikal teknik değişimleri (zorla parmak ucuna basmak gibi) genelde önerilmez. Aşırı zıplama (dikey salınım) ve frenleme (braking) azaltılabilir.'
        : '"Self-optimization" matters: most runners naturally sit near their economical style. Radical changes (forced forefoot strike) are usually not recommended. Reducing excessive bounce (vertical oscillation) and braking can help.',

    // Section 3: Durability
    sec3_title:
      lang === "tr"
        ? 'Son Bulgular: "Durability" (Yorgunluk Altında Verimi Korumak)'
        : 'Latest Findings: "Durability" (Maintaining Efficiency Under Fatigue)',
    heat_title: lang === "tr" ? "Motor Isınması Problemi" : "Engine Overheating Problem",
    heat_text:
      lang === "tr"
        ? 'Çoğu koşucu yarışın başında ekonomiktir; ancak süre uzadıkça yorgunlukla beraber "fizyolojik drift" oluşabilir ve oksijen maliyeti artar. Gerçek performans, yarışın sonunda bu verimi ne kadar koruyabildiğinizdir.'
        : 'Most runners are economical at the start; as time passes, fatigue can trigger "physiological drift" and oxygen cost rises. Real performance is how well you maintain efficiency late in the race.',
    zanini_title:
      lang === "tr"
        ? "Zanini (2025): Ana Bulgular"
        : "Zanini (2025): Key Findings",
    zanini_desc:
      lang === "tr"
        ? "90 dakikalık yorucu bir koşu ve ardından yapılan tükenme testinde (Time to Exhaustion), kuvvet+pliometrik ekleyen grubun öne çıkan sonuçları:"
        : "After a demanding 90-minute run followed by a time-to-exhaustion test, the strength+plyometric group showed:",

    z_point1_title: lang === "tr" ? "Ekonomi Daha İyi Korundu:" : "Economy Better Maintained:",
    z_point1_text:
      lang === "tr"
        ? "Sadece koşan grupta verim zamanla daha fazla bozulurken, kuvvet+pliometrik ekleyen grup uzun koşuda ekonomiyi daha iyi korudu."
        : "While the running-only group saw greater deterioration, the strength+plyometric group maintained economy better during the long run.",
    z_point2_title: lang === "tr" ? "Yorgunken Performans Arttı:" : "Fatigued Performance Improved:",
    z_point2_text:
      lang === "tr"
        ? "Yorgun bacaklarla yapılan tükeniş testinde kuvvet grubu yaklaşık %35 daha uzun süre dayanabildi."
        : "In the time-to-exhaustion test with fatigued legs, the strength group lasted ~35% longer.",
    z_point3_title: lang === "tr" ? "Sonuç:" : "Conclusion:",
    z_point3_text:
      lang === "tr"
        ? 'Kuvvet antrenmanı sadece "taze iken hızlı" olmak değildir; yarışın sonunda motorun "teklememesine" (durability) yardım eder.'
        : 'Strength training isn’t only about being fast when fresh; it helps prevent the engine from "sputtering" late (durability).',

    shoe_note_title: lang === "tr" ? "Küçük ama önemli not" : "Small but important note",
    shoe_note_text:
      lang === "tr"
        ? "Zanini çalışmasında testler sırasında karbon-plakalı ayakkabılar yasaktı (RE’yi etkileyebileceği için). Yani gelişim, ‘antrenman etkisi’ olarak daha net."
        : "In Zanini, carbon-plated shoes were not allowed during testing (to avoid confounding RE). That makes the improvements more clearly training-driven.",

    // Section 4: Training
    sec4_title: lang === "tr" ? "Pratik Antrenman Modelleri" : "Practical Training Models",
    sec4_desc:
      lang === "tr"
        ? "Aşağıdaki modeller, makalelerdeki protokollerin mantığına dayalıdır. Özellikle Zanini modelinde 10 haftalık progresyon vardır (1–3 / 4–7 / 8–10)."
        : "The models below follow the logic of the cited protocols. The Zanini model includes a 10-week progression (Weeks 1–3 / 4–7 / 8–10).",

    tab_zanini: lang === "tr" ? "Model A: Karma (Zanini 2025)" : "Model A: Hybrid (Zanini 2025)",
    tab_storen: lang === "tr" ? "Model B: Saf Kuvvet (Støren 2008)" : "Model B: Pure Strength (Støren 2008)",

    zanini_goal:
      lang === "tr"
        ? 'Hedef: Hem kuvvet hem "yaylanma" (stiffness). Durability için en güçlü modellerden.'
        : 'Goal: Both strength and "stiffness". One of the strongest models for durability.',
    storen_goal:
      lang === "tr"
        ? "Hedef: Saf maksimal kuvvet (nöral adaptasyon). Klasik protokol; çalışmada 8 haftada ~%5 RE iyileşmesi raporlanmıştır."
        : "Goal: Pure maximal strength (neural adaptation). Classic protocol; ~5% RE improvement reported after 8 weeks.",
    storen_note:
      lang === "tr"
        ? "*Støren protokolü çalışmada 3 gün/hafta half-squat (4×4RM) üzerine kuruludur. Pratikte ek destek hareketleri eklenebilir ama bu ‘uyarlama’ olur."
        : "*In Støren, the intervention was 3 days/week of half-squat (4×4RM). Adding accessories is a practical adaptation (not the original protocol).",

    // Table headers
    th_section: lang === "tr" ? "Bölüm" : "Section",
    th_ex: lang === "tr" ? "Egzersiz" : "Exercise",
    th_set: lang === "tr" ? "Set x Tekrar" : "Set x Reps",
    th_note: lang === "tr" ? "Kritik Not" : "Critical Note",
    th_load: lang === "tr" ? "Yük (Şiddet)" : "Load (Intensity)",
    th_rest: lang === "tr" ? "Dinlenme" : "Rest",

    // Phase labels
    phase_1: lang === "tr" ? "Hafta 1–3" : "Weeks 1–3",
    phase_2: lang === "tr" ? "Hafta 4–7" : "Weeks 4–7",
    phase_3: lang === "tr" ? "Hafta 8–10" : "Weeks 8–10",

    // Sections in table
    ex_plyo: lang === "tr" ? "1) Pliyometrik" : "1) Plyometric",
    ex_strength: lang === "tr" ? "2) Kuvvet" : "2) Strength",

    // Generic notes
    pogo_note: lang === "tr" ? "Kısa temas, bilekten sek." : "Short contact, bounce from ankles.",
    drop_note: lang === "tr" ? "Temas <200ms (ateşe basmış gibi)." : "Contact <200ms (hot coals).",
    hopstick_note:
      lang === "tr"
        ? "Kontrollü iniş (stick), kalite > miktar."
        : "Controlled landing (stick), quality > quantity.",
    stiffbounds_note:
      lang === "tr"
        ? "Yatay güç; tam dinlenme ile."
        : "Horizontal power; take full recovery.",
    lengthbounds_note:
      lang === "tr"
        ? "Mesafe odaklı bounds; form bozulmasın."
        : "Distance-focused bounds; keep form crisp.",

    squat_note: lang === "tr" ? "Ağır ama temiz; patlayıcı niyet." : "Heavy but clean; explosive intent.",
    press_note: lang === "tr" ? "Her bacak ayrı." : "Each leg separately.",
    calf_note: lang === "tr" ? "Aşil/soleus için kritik." : "Key for Achilles/soleus.",

    storen_load: lang === "tr" ? "~4RM (5. tekrar çıkmayacak)" : "~4RM (5th rep impossible)",

    refs_title: lang === "tr" ? "Referanslar" : "References",
  };

  // -----------------------------
  // Zanini (2025) protocol rows (phased progression)
  // -----------------------------
  const zaniniRowsByPhase = {
    w1_3: [
      {
        section: t.ex_plyo,
        exercise: "Pogo Jumps",
        setsReps: "3 × 10–12",
        note: `${t.pogo_note} • Rest: ~90s`,
      },
      {
        section: "",
        exercise: "Hop and Stick (horizontal)",
        setsReps: "3 × 6",
        note: `${t.hopstick_note} • Rest: ~90s`,
      },
      {
        section: t.ex_strength,
        exercise: "Back Squat",
        setsReps: "3 × 6–8",
        note: `${t.squat_note} • ~65–80% 1RM • Rest: ~120s`,
      },
      {
        section: "",
        exercise: "Single-Leg Press",
        setsReps: "3 × 6–8",
        note: `${t.press_note} • ~65–80% 1RM • Rest: ~120s`,
      },
      {
        section: "",
        exercise: "Seated Isometric Calf Raise",
        setsReps: "4 × 6–8",
        note: `${t.calf_note} • ~80–100% MVF • Rest: ~60s`,
      },
    ],
    w4_7: [
      {
        section: t.ex_plyo,
        exercise: "Drop Jumps",
        setsReps: "3 × 6",
        note: `${t.drop_note} • Rest: ~120s`,
      },
      {
        section: "",
        exercise: "Stiff-Leg Bounds (horizontal)",
        setsReps: "3 × 10",
        note: `${t.stiffbounds_note} • Rest: ~90s`,
      },
      {
        section: t.ex_strength,
        exercise: "Back Squat",
        setsReps: "3 × 5–6",
        note: `${t.squat_note} • ~80–85% 1RM • Rest: ~120–150s`,
      },
      {
        section: "",
        exercise: "Single-Leg Press",
        setsReps: "3 × 5–6",
        note: `${t.press_note} • ~80–85% 1RM • Rest: ~120–150s`,
      },
      {
        section: "",
        exercise: "Seated Isometric Calf Raise",
        setsReps: "5 × 4–6",
        note: `${t.calf_note} • ~100% MVF • Rest: ~90s`,
      },
    ],
    w8_10: [
      {
        section: t.ex_plyo,
        exercise: "Drop Jumps",
        setsReps: "3 × 6",
        note: `${t.drop_note} • Rest: ~120s`,
      },
      {
        section: "",
        exercise: "Bounds for Length (horizontal)",
        setsReps: "3 × 8–12",
        note: `${t.lengthbounds_note} • Rest: ~90s`,
      },
      {
        section: t.ex_strength,
        exercise: "Back Squat",
        setsReps: "3 × 4–5",
        note: `${t.squat_note} • ~85–90% 1RM • Rest: ~150s`,
      },
      {
        section: "",
        exercise: "Single-Leg Press",
        setsReps: "3 × 4–5",
        note: `${t.press_note} • ~85–90% 1RM • Rest: ~150s`,
      },
      {
        section: "",
        exercise: "Seated Isometric Calf Raise",
        setsReps: "5 × 4–6",
        note: `${t.calf_note} • ~100% MVF • Rest: ~90s`,
      },
    ],
  };

  const zaniniRows = zaniniRowsByPhase[zaniniPhase];

  // -----------------------------
  // ICONS (Local)
  // -----------------------------
  const BoltIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );

  const CarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );

  const BatteryIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
      <line x1="22" y1="11" x2="22" y2="13"></line>
    </svg>
  );

  const DumbbellIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1" />
      <path d="m3 3 1 1" />
      <path d="m18 22 4-4" />
      <path d="m2 6 4-4" />
      <path d="m3 10 7-7" />
      <path d="m14 21 7-7" />
    </svg>
  );

  const CompressIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <polyline points="4 17 4 20 20 20 20 17" />
      <line x1="9" y1="4" x2="15" y2="4" />
      <path d="M4 14.5S14 19 20 14.5" />
      <path d="M4 10.5S14 6 20 10.5" />
    </svg>
  );

  const RunIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18.5 6c1.4 0 2.5-1.1 2.5-2.5S19.9 1 18.5 1 16 2.1 16 3.5 17.1 6 18.5 6Z" />
      <path d="M9.5 3.9 7.5 5.2c-.4.2-.5.6-.5 1 0 .8.9 1.3 1.5.8l1.9-1.2c.3-.2.8-.2 1.1 0l1.5 1.1-3.7 3.7c-.2.2-.4.4-.6.6l-1.8 2.5c-.3.4-.8.5-1.2.4l-2.6-1c-.4-.2-.9 0-1.1.3-.3.5-.2 1.1.3 1.4l2.5 1.3c1.2.7 2.8.4 3.7-.7l1.9-2.1 1.8 2.5c.4.6.5 1.4.2 2.1l-1.7 3.5c-.3.7.2 1.5.9 1.5.5 0 .9-.1 1.2-.6l2-3.9c.5-.9.4-2.1-.2-2.9l-1.6-2.6 3-3 1.4.9c1.2.8 2.6.7 3.9.3.5-.2.7-.6.7-1.1 0-.6-.6-1.1-1.2-1-.7.1-1.7.5-2.2-.2l-2.8-3.7c-.9-.5-2.1-.5-3-.1z" />
    </svg>
  );

  const CheckIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  // -----------------------------
  // UI helpers
  // -----------------------------
  const PhaseButton = ({ id, label }) => (
    <button
      onClick={() => setZaniniPhase(id)}
      className={`px-4 py-2 rounded-xl font-bold transition-all shadow-md text-sm ${
        zaniniPhase === id ? "bg-primary text-white scale-[1.02]" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden shadow-2xl text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 leading-tight">
          {t.title}: <br />
          <span className="text-primary">{t.subtitle}</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto relative z-10 leading-relaxed">{t.heroDesc}</p>
      </div>

      {/* SECTION 1: WHAT IS IT? */}
      <div id="what" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4">{t.sec1_title}</h2>
          <p className="text-slate-400 text-lg leading-relaxed">{t.sec1_desc}</p>

          {/* Quick note: lower cost = better */}
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
            <div className="text-primary font-bold text-sm mb-1">{t.re_note_title}</div>
            <div className="text-slate-300 text-sm leading-relaxed">{t.re_note_text}</div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border-l-4 border-primary shadow-lg mt-2">
            <div className="flex items-center gap-3 mb-3 text-primary">
              <CarIcon className="w-8 h-8" />
              <h3 className="font-bold text-lg">{t.analogy_title}</h3>
            </div>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{t.analogy_text}</p>
          </div>

          {/* Simple measurement/tracking */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-3 mb-2 text-primary">
              <BoltIcon className="w-6 h-6" />
              <h3 className="font-bold text-lg">{t.track_title}</h3>
            </div>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{t.track_text}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-xl flex flex-col justify-center border-t-4 border-t-primary">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BoltIcon className="w-6 h-6 text-primary" /> {t.why_title}
          </h3>
          <p className="text-slate-400 mb-6">{t.why_text}</p>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{t.breaking2_label}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-primary">191</span>
              <span className="text-slate-400 font-bold">± 19 ml/kg/km</span>
            </div>
            <div className="text-slate-600 text-xs mt-1">@ 21.1 km/h — {t.breaking2_sub}</div>
          </div>
        </div>
      </div>

      {/* SECTION 2: MECHANISMS */}
      <div id="how">
        <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4 mb-6">{t.sec2_title}</h2>
        <p className="text-slate-400 text-lg mb-8">{t.sec2_desc}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-colors shadow-lg">
            <div className="text-primary mb-4">
              <DumbbellIcon className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t.mech1_title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.mech1_text}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-colors shadow-lg">
            <div className="text-primary mb-4">
              <CompressIcon className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t.mech2_title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.mech2_text}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-colors shadow-lg">
            <div className="text-primary mb-4">
              <RunIcon className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t.mech3_title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.mech3_text}</p>
          </div>
        </div>
      </div>

      {/* SECTION 3: DURABILITY */}
      <div id="durability">
        <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4 mb-6">{t.sec3_title}</h2>

        <div className="bg-slate-800 border-l-4 border-primary p-6 rounded-r-2xl mb-6 shadow-lg">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
            <BatteryIcon className="w-6 h-6 text-primary" /> {t.heat_title}
          </h3>
          <p className="text-slate-300 leading-relaxed">{t.heat_text}</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">{t.zanini_title}</h3>
          <p className="text-slate-400 mb-6 italic">{t.zanini_desc}</p>

          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="shrink-0 mt-1">
                <CheckIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <strong className="text-white block">{t.z_point1_title}</strong>
                <span className="text-slate-400 text-sm">{t.z_point1_text}</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="shrink-0 mt-1">
                <CheckIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <strong className="text-white block">{t.z_point2_title}</strong>
                <span className="text-slate-400 text-sm">{t.z_point2_text}</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="shrink-0 mt-1">
                <CheckIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <strong className="text-white block">{t.z_point3_title}</strong>
                <span className="text-slate-400 text-sm">{t.z_point3_text}</span>
              </div>
            </li>
          </ul>

          <div className="mt-6 bg-slate-900/60 border border-slate-700 rounded-xl p-4">
            <div className="text-primary font-bold text-sm mb-1">{t.shoe_note_title}</div>
            <div className="text-slate-300 text-sm">{t.shoe_note_text}</div>
          </div>
        </div>
      </div>

      {/* SECTION 4: TRAINING MODELS */}
      <div id="training">
        <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4 mb-6">{t.sec4_title}</h2>
        <p className="text-slate-400 mb-8">{t.sec4_desc}</p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
          <button
            onClick={() => setActiveModel("zanini")}
            className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
              activeModel === "zanini" ? "bg-primary text-white scale-105" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {t.tab_zanini}
          </button>
          <button
            onClick={() => setActiveModel("storen")}
            className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
              activeModel === "storen" ? "bg-primary text-white scale-105" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {t.tab_storen}
          </button>
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl animate-fade-in">
          {activeModel === "zanini" && (
            <div className="p-6 md:p-8">
              <div className="bg-slate-900/50 border-l-4 border-primary p-4 rounded-r-lg mb-4 text-slate-300 text-sm">
                <strong>{t.zanini_goal}</strong>
              </div>

              {/* Phase selector */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                <PhaseButton id="w1_3" label={t.phase_1} />
                <PhaseButton id="w4_7" label={t.phase_2} />
                <PhaseButton id="w8_10" label={t.phase_3} />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-primary text-sm uppercase tracking-wider">
                      <th className="p-4 rounded-tl-lg">{t.th_section}</th>
                      <th className="p-4">{t.th_ex}</th>
                      <th className="p-4">{t.th_set}</th>
                      <th className="p-4 rounded-tr-lg">{t.th_note}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-slate-300 text-sm">
                    {zaniniRows.map((r, idx) => (
                      <tr key={idx}>
                        <td className={`p-4 ${r.section ? "font-bold text-white" : ""}`}>{r.section}</td>
                        <td className="p-4">{r.exercise}</td>
                        <td className="p-4">{r.setsReps}</td>
                        <td className="p-4 text-slate-400">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-slate-500 italic">
                {lang === "tr"
                  ? "Not: Buradaki set/tekrar/yük/rest aralıkları, Zanini (2025) protokolünün faz progresyonunu yansıtacak şekilde özetlenmiştir."
                  : "Note: Set/rep/load/rest ranges summarize the phased progression from the Zanini (2025) protocol."}
              </p>
            </div>
          )}

          {activeModel === "storen" && (
            <div className="p-6 md:p-8">
              <div className="bg-slate-900/50 border-l-4 border-primary p-4 rounded-r-lg mb-6 text-slate-300 text-sm">
                <strong>{t.storen_goal}</strong>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-primary text-sm uppercase tracking-wider">
                      <th className="p-4 rounded-tl-lg">{t.th_ex}</th>
                      <th className="p-4">{t.th_set}</th>
                      <th className="p-4">{t.th_load}</th>
                      <th className="p-4 rounded-tr-lg">{t.th_rest}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-slate-300 text-sm">
                    <tr>
                      <td className="p-4 font-bold text-white">Half-Squat</td>
                      <td className="p-4">4 × 4</td>
                      <td className="p-4 text-slate-400">{t.storen_load}</td>
                      <td className="p-4 text-slate-400">3 min</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-slate-500 italic">{t.storen_note}</p>
            </div>
          )}
        </div>
      </div>

      {/* REFERENCES */}
      <div className="border-t border-slate-800 pt-8 mt-12">
        <h3 className="text-lg font-bold text-white mb-4">{t.refs_title}</h3>
        <ul className="space-y-2 text-xs text-slate-500 font-mono">
          <li>
            1. Zanini, M., Folland, J. P., Wu, H., & Blagrove, R. C. (2025). Strength Training Improves Running Economy Durability and Fatigued High-Intensity Performance in Well-Trained Male Runners: A Randomized Control Trial. <span className="italic">Medicine & Science in Sports & Exercise</span>.
          </li>
          <li>
            2. Støren, Ø., Helgerud, J., Støa, E. M., & Hoff, J. (2008). Maximal strength training improves running economy in distance runners. <span className="italic">Medicine & Science in Sports & Exercise</span>.
          </li>
          <li>
            3. Moore, I. S. (2016). Is There an Economical Running Technique? A Review of Modifiable Biomechanical Factors Affecting Running Economy. <span className="italic">Sports Medicine</span>.
          </li>
          <li>
            4. Barnes, K. R., & Kilding, A. E. (2014). Strategies to improve running economy. <span className="italic">Sports Medicine</span>.
          </li>
          <li>
            5. Barnes, K. R., & Kilding, A. E. (2015). Running economy: measurement, norms, and determining factors. <span className="italic">Sports Medicine - Open</span>.
          </li>
          <li>
            6. Jones, A. M., et al. (2020). Physiological demands of running at 2-hour marathon race pace. <span className="italic">Journal of Applied Physiology</span>.
          </li>
        </ul>
      </div>
    </div>
  );
};

window.RunningEconomyPage = RunningEconomyPage;
