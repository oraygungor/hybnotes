const RunningEconomyPage = ({ lang, activeTheme }) => {
    const [activeModel, setActiveModel] = React.useState('zanini');

    // --- TEXT CONTENT (Bilingual) ---
    const t = {
        title: lang === 'tr' ? 'Koşu Ekonomisi' : 'Running Economy',
        subtitle: lang === 'tr' ? 'Küçümsenen Performans Çarpanı' : 'The Underrated Performance Multiplier',
        heroDesc: lang === 'tr' 
            ? 'Antrenman programlarında genellikle göz ardı edilen, ancak doğru işlendiğinde yarış performansında devasa kazanımlar sağlayan "gizli değişken" üzerine kapsamlı bir rehber.'
            : 'A comprehensive guide on the "hidden variable" often overlooked in training programs but providing massive gains in race performance when properly addressed.',
        
        // Navigation
        nav: {
            what: lang === 'tr' ? 'Nedir?' : 'What is it?',
            how: lang === 'tr' ? 'Nasıl Gelişir?' : 'How to Improve?',
            durability: lang === 'tr' ? 'Yeni Bulgu: Direnç' : 'New Finding: Durability',
            training: lang === 'tr' ? 'Antrenman' : 'Training',
            refs: lang === 'tr' ? 'Kaynaklar' : 'References'
        },

        // Section 1: Definition
        sec1_title: lang === 'tr' ? 'Running Economy (RE) Nedir?' : 'What is Running Economy (RE)?',
        sec1_desc: lang === 'tr'
            ? 'Koşu ekonomisi, belirli bir submaksimal hızda koşarken vücudun ihtiyaç duyduğu enerji (oksijen) miktarıdır. Basitçe, vücudun "yakıt tasarrufu" verimliliğidir.'
            : 'Running economy is the energy (oxygen) demand for a given submaximal running velocity. Simply put, it is the body\'s "fuel efficiency".',
        analogy_title: lang === 'tr' ? 'Araba Analojisi' : 'Car Analogy',
        analogy_text: lang === 'tr'
            ? 'İki araç aynı hızda (100 km/s) gidiyor. Biri 5 litre benzin yakıyor, diğeri 8 litre. 5 litre yakan (düşük RE) daha ekonomiktir ve deposu (glikojen) daha geç biter.'
            : 'Two cars traveling at the same speed (100 km/h). One burns 5 liters of gas, the other 8 liters. The one burning 5 liters (low RE) is more economical, and its tank (glycogen) lasts longer.',
        why_title: lang === 'tr' ? 'Neden Önemlidir?' : 'Why is it Important?',
        why_text: lang === 'tr'
            ? 'Benzer VO2max\'a sahip sporcularda yarışı kazananı RE belirler. Elit seviyedeki farklar çok küçüktür.'
            : 'Among athletes with similar VO2max, RE determines the winner. Differences at the elite level are marginal but decisive.',
        breaking2_label: lang === 'tr' ? 'Breaking 2 Projesi Verisi:' : 'Breaking 2 Project Data:',
        breaking2_sub: lang === 'tr' ? 'Ortalama Oksijen Maliyeti (Jones et al., 2020)' : 'Average Oxygen Cost (Jones et al., 2020)',

        // Section 2: Mechanisms
        sec2_title: lang === 'tr' ? 'Nasıl Geliştirilir?' : 'How is it Improved?',
        sec2_desc: lang === 'tr'
            ? 'Literatür (Barnes & Kilding, Støren, Moore), sadece "daha çok koşmanın" RE\'yi geliştirmek için yeterli olmadığını gösteriyor. Üç ana saç ayağı vardır:'
            : 'Literature (Barnes & Kilding, Støren, Moore) shows that simply "running more" is not enough to improve RE. There are three main pillars:',
        mech1_title: lang === 'tr' ? 'Motor Gücü (Nöral)' : 'Motor Power (Neural)',
        mech1_text: lang === 'tr'
            ? 'RFD (Rate of Force Development): Kasın kuvvet üretme hızı artırılır. Bu, kas kütlesi büyümeden (hipertrofi olmadan), sinir sistemini ağır kilolarla eğiterek sağlanır.'
            : 'RFD (Rate of Force Development): Increasing the speed of force production. This is achieved by training the nervous system with heavy loads without increasing muscle mass (hypertrophy).',
        mech2_title: lang === 'tr' ? 'Yay Sistemi (Stiffness)' : 'Spring System (Stiffness)',
        mech2_text: lang === 'tr'
            ? 'Bacaklar yumuşak bir amortisör değil, sert bir yay gibi davranmalıdır. Pliyometrik çalışmalar tendon sertliğini artırır, böylece yere iniş enerjisi bedavaya geri kazanılır.'
            : 'Legs should act like a stiff spring, not a soft shock absorber. Plyometrics increase tendon stiffness, allowing landing energy to be recycled for free.',
        mech3_title: lang === 'tr' ? 'Biyomekanik' : 'Biomechanics',
        mech3_text: lang === 'tr'
            ? '"Self-optimization" esastır. Radikal teknik değişimleri (zorla parmak ucuna basmak) önerilmez. Sadece "aşırı zıplama" (dikey salınım) ve "frenleme" minimize edilmelidir.'
            : '"Self-optimization" is key. Radical technical changes (forced forefoot strike) are not recommended. Only "excessive bouncing" (vertical oscillation) and "braking" should be minimized.',

        // Section 3: Durability
        sec3_title: lang === 'tr' ? 'Son Bulgular: "Durability" (Fizyolojik Direnç)' : 'Latest Findings: "Durability" (Physiological Resistance)',
        heat_title: lang === 'tr' ? 'Motor Isınması Problemi' : 'Engine Overheating Problem',
        heat_text: lang === 'tr'
            ? 'Çoğu koşucu yarışın başında ekonomiktir, ancak süre uzadıkça yorgunlukla beraber "Fizyolojik Drift" başlar ve ekonomi bozulur. Gerçek performans, yarışın sonunda bu verimi ne kadar koruyabildiğinizdir.'
            : 'Most runners are economical at the start. However, as time passes, "Physiological Drift" begins with fatigue, and economy worsens. Real performance is about how well you maintain this efficiency at the end.',
        zanini_title: lang === 'tr' ? 'Zanini (2025) Çalışması: Ana Bulgular' : 'Zanini (2025) Study: Key Findings',
        zanini_desc: lang === 'tr' ? '90 dakikalık yorucu bir koşu ve ardından yapılan tükenme testinde, kuvvet antrenmanı yapan grubun sonuçları:' : 'Results of the strength training group after a strenuous 90-minute run followed by a time-to-exhaustion test:',
        
        z_point1_title: lang === 'tr' ? 'Ekonomi Korundu:' : 'Economy Maintained:',
        z_point1_text: lang === 'tr' ? 'Sadece koşan grubun verimliliği düşerken, kuvvet grubu uzun süreli koşuda ekonomisini korumayı ve hatta iyileştirmeyi başardı.' : 'While the running-only group saw efficiency drop, the strength group maintained and even improved economy during the long run.',
        z_point2_title: lang === 'tr' ? 'Fizyolojik Direnç:' : 'Physiological Resistance:',
        z_point2_text: lang === 'tr' ? 'Yorgun bacaklarla yapılan performans testinde (Time to Exhaustion), kuvvet grubu %35 daha uzun süre dayanabildi.' : 'In the performance test with fatigued legs (Time to Exhaustion), the strength group lasted 35% longer.',
        z_point3_title: lang === 'tr' ? 'Sonuç:' : 'Conclusion:',
        z_point3_text: lang === 'tr' ? 'Kuvvet antrenmanı sadece hızı artırmaz; yorgunluk anında motorun "teklememesini" (Fizyolojik Direnç) sağlar.' : 'Strength training doesn\'t just increase speed; it prevents the engine from "sputtering" under fatigue (Physiological Resistance).',

        // Section 4: Training
        sec4_title: lang === 'tr' ? 'Pratik Antrenman Modelleri' : 'Practical Training Models',
        sec4_desc: lang === 'tr'
            ? 'Aşağıdaki protokoller, belirtilen makalelerdeki orijinal programlara dayanmaktadır. Haftada 2 gün, zor koşu günlerinin akşamına yerleştirilmesi önerilir.'
            : 'The protocols below are based on the original programs in the cited papers. Recommended frequency is 2 days/week, placed in the evening of hard running days.',
        
        tab_zanini: lang === 'tr' ? 'Model A: Karma (Zanini 2025)' : 'Model A: Hybrid (Zanini 2025)',
        tab_storen: lang === 'tr' ? 'Model B: Saf Kuvvet (Støren 2008)' : 'Model B: Pure Strength (Støren 2008)',
        
        zanini_goal: lang === 'tr' ? 'Hedef: Hem kuvvet hem "yaylanma" (stiffness). Durability (Fizyolojik Direnç) için en etkili model.' : 'Goal: Both strength and "stiffness". Most effective model for Durability.',
        storen_goal: lang === 'tr' ? 'Hedef: Saf Maksimal Kuvvet (Nöral Adaptasyon). %5 RE iyileşmesi sağlayan klasik protokol.' : 'Goal: Pure Maximal Strength (Neural Adaptation). Classic protocol yielding 5% RE improvement.',
        storen_note: lang === 'tr' ? '*Støren çalışması sadece squat üzerine kuruludur, ancak pratikte buna core ve hamstring desteği eklenmesi önerilir.' : '*The Støren study is based solely on squats, but adding core and hamstring support is recommended in practice.',

        // Table headers
        th_section: lang === 'tr' ? 'Bölüm' : 'Section',
        th_ex: lang === 'tr' ? 'Egzersiz' : 'Exercise',
        th_set: lang === 'tr' ? 'Set x Tekrar' : 'Set x Reps',
        th_note: lang === 'tr' ? 'Kritik Not' : 'Critical Note',
        th_load: lang === 'tr' ? 'Yük (Şiddet)' : 'Load (Intensity)',
        th_rest: lang === 'tr' ? 'Dinlenme' : 'Rest',

        // Exercises Translation
        ex_plyo: lang === 'tr' ? '1. Pliyometrik' : '1. Plyometric',
        ex_strength: lang === 'tr' ? '2. Kuvvet' : '2. Strength',
        
        pogo_note: lang === 'tr' ? 'Dizler kilitli, bilekten sek.' : 'Knees locked, bounce from ankles.',
        drop_note: lang === 'tr' ? 'Yere temas < 200ms (Ateş!)' : 'Ground contact < 200ms (Fire!)',
        squat_note: lang === 'tr' ? 'Ağır yük (%85), patlayıcı kalkış.' : 'Heavy load (%85), explosive lift.',
        press_note: lang === 'tr' ? 'Her bacak için ayrı.' : 'Each leg separately.',
        calf_note: lang === 'tr' ? 'Aşil tendonu sertliği için.' : 'For Achilles tendon stiffness.',
        
        storen_load: lang === 'tr' ? '~4RM (5. tekrar çıkmayacak)' : '~4RM (5th rep impossible)',
        
        // References
        sec_ref: lang === 'tr' ? 'Referanslar' : 'References'
    };

    // --- ICONS (Local) ---
    const BoltIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
    const CarIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>;
    const BatteryIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>;
    const DumbbellIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>;
    const CompressIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><polyline points="4 17 4 20 20 20 20 17"/><line x1="9" y1="4" x2="15" y2="4"/><path d="M4 14.5S14 19 20 14.5"/><path d="M4 10.5S14 6 20 10.5"/></svg>;
    const RunIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18.5 6c1.4 0 2.5-1.1 2.5-2.5S19.9 1 18.5 1 16 2.1 16 3.5 17.1 6 18.5 6Z"/><path d="M9.5 3.9 7.5 5.2c-.4.2-.5.6-.5 1 0 .8.9 1.3 1.5.8l1.9-1.2c.3-.2.8-.2 1.1 0l1.5 1.1-3.7 3.7c-.2.2-.4.4-.6.6l-1.8 2.5c-.3.4-.8.5-1.2.4l-2.6-1c-.4-.2-.9 0-1.1.3-.3.5-.2 1.1.3 1.4l2.5 1.3c1.2.7 2.8.4 3.7-.7l1.9-2.1 1.8 2.5c.4.6.5 1.4.2 2.1l-1.7 3.5c-.3.7.2 1.5.9 1.5.5 0 .9-.1 1.2-.6l2-3.9c.5-.9.4-2.1-.2-2.9l-1.6-2.6 3-3 1.4.9c1.2.8 2.6.7 3.9.3.5-.2.7-.6.7-1.1 0-.6-.6-1.1-1.2-1-.7.1-1.7.5-2.2-.2l-2.8-3.7c-.9-.5-2.1-.5-3-.1z"/></svg>;
    const CheckIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>;


    return (
        <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-12">
            
            {/* HERO SECTION */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden shadow-2xl text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 leading-tight">
                    {t.title}: <br/>
                    <span className="text-primary">{t.subtitle}</span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto relative z-10 leading-relaxed">
                    {t.heroDesc}
                </p>
            </div>

            {/* SECTION 1: WHAT IS IT? */}
            <div id="what" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4">{t.sec1_title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">{t.sec1_desc}</p>
                    
                    <div className="bg-slate-800 p-6 rounded-2xl border-l-4 border-primary shadow-lg mt-6">
                        <div className="flex items-center gap-3 mb-3 text-primary">
                            <CarIcon className="w-8 h-8" />
                            <h3 className="font-bold text-lg">{t.analogy_title}</h3>
                        </div>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed">{t.analogy_text}</p>
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
                        <div className="text-slate-600 text-xs mt-1">@ 21.1 km/h - {t.breaking2_sub}</div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: MECHANISMS */}
            <div id="how">
                <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4 mb-6">{t.sec2_title}</h2>
                <p className="text-slate-400 text-lg mb-8">{t.sec2_desc}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-colors shadow-lg">
                        <div className="text-primary mb-4"><DumbbellIcon className="w-10 h-10" /></div>
                        <h3 className="text-lg font-bold text-white mb-2">{t.mech1_title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.mech1_text}</p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-colors shadow-lg">
                        <div className="text-primary mb-4"><CompressIcon className="w-10 h-10" /></div>
                        <h3 className="text-lg font-bold text-white mb-2">{t.mech2_title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.mech2_text}</p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-colors shadow-lg">
                        <div className="text-primary mb-4"><RunIcon className="w-10 h-10" /></div>
                        <h3 className="text-lg font-bold text-white mb-2">{t.mech3_title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.mech3_text}</p>
                    </div>
                </div>
            </div>

            {/* SECTION 3: DURABILITY */}
            <div id="durability">
                {/* Changed fixed emerald border to dynamic primary */}
                <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4 mb-6">{t.sec3_title}</h2>
                
                <div className="bg-slate-800 border-l-4 border-primary p-6 rounded-r-2xl mb-8 shadow-lg">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                        {/* Icon also follows primary theme */}
                        <BatteryIcon className="w-6 h-6 text-primary" /> {t.heat_title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{t.heat_text}</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6">{t.zanini_title}</h3>
                    <p className="text-slate-400 mb-6 italic">{t.zanini_desc}</p>
                    
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="shrink-0 mt-1"><CheckIcon className="w-6 h-6 text-primary" /></div>
                            <div>
                                <strong className="text-white block">{t.z_point1_title}</strong>
                                <span className="text-slate-400 text-sm">{t.z_point1_text}</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="shrink-0 mt-1"><CheckIcon className="w-6 h-6 text-primary" /></div>
                            <div>
                                <strong className="text-white block">{t.z_point2_title}</strong>
                                <span className="text-slate-400 text-sm">{t.z_point2_text}</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="shrink-0 mt-1"><CheckIcon className="w-6 h-6 text-primary" /></div>
                            <div>
                                <strong className="text-white block">{t.z_point3_title}</strong>
                                <span className="text-slate-400 text-sm">{t.z_point3_text}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* SECTION 4: TRAINING MODELS */}
            <div id="training">
                <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4 mb-6">{t.sec4_title}</h2>
                <p className="text-slate-400 mb-8">{t.sec4_desc}</p>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                    <button 
                        onClick={() => setActiveModel('zanini')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                            activeModel === 'zanini' 
                            ? 'bg-primary text-white scale-105' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                    >
                        {t.tab_zanini}
                    </button>
                    <button 
                        onClick={() => setActiveModel('storen')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                            activeModel === 'storen' 
                            ? 'bg-primary text-white scale-105' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                    >
                        {t.tab_storen}
                    </button>
                </div>

                {/* Content */}
                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl animate-fade-in">
                    {activeModel === 'zanini' && (
                        <div className="p-6 md:p-8">
                            <div className="bg-slate-900/50 border-l-4 border-primary p-4 rounded-r-lg mb-6 text-slate-300 text-sm">
                                <strong>{t.zanini_goal}</strong>
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
                                        <tr>
                                            <td className="p-4 font-bold text-white">{t.ex_plyo}</td>
                                            <td className="p-4">Pogo Jumps</td>
                                            <td className="p-4">3 x 15</td>
                                            <td className="p-4 text-slate-400">{t.pogo_note}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4"></td>
                                            <td className="p-4">Drop Jumps (20-30cm)</td>
                                            <td className="p-4">3 x 6</td>
                                            <td className="p-4 text-slate-400">{t.drop_note}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-white">{t.ex_strength}</td>
                                            <td className="p-4">Back Squat</td>
                                            <td className="p-4">3 x 4-6</td>
                                            <td className="p-4 text-slate-400">{t.squat_note}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4"></td>
                                            <td className="p-4">Single-Leg Press</td>
                                            <td className="p-4">3 x 4-6</td>
                                            <td className="p-4 text-slate-400">{t.press_note}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4"></td>
                                            <td className="p-4">Isometric Calf Raise</td>
                                            <td className="p-4">4 x 10s</td>
                                            <td className="p-4 text-slate-400">{t.calf_note}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeModel === 'storen' && (
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
                                            <td className="p-4">4 x 4</td>
                                            <td className="p-4 text-slate-400">{t.storen_load}</td>
                                            <td className="p-4 text-slate-400">3-4 min</td>
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
                <h3 className="text-lg font-bold text-white mb-4">{t.nav.refs}</h3>
                <ul className="space-y-2 text-xs text-slate-500 font-mono">
                    <li>1. Zanini, M., Folland, J. P., Wu, H., & Blagrove, R. C. (2025). Strength Training Improves Running Economy Durability... MSSE.</li>
                    <li>2. Støren, Ø., Helgerud, J., Støa, E. M., & Hoff, J. (2008). Maximal strength training improves running economy... MSSE.</li>
                    <li>3. Moore, I. S. (2016). Is There an Economical Running Technique? Sports Medicine.</li>
                    <li>4. Barnes, K. R., & Kilding, A. E. (2015). Running economy: measurement, norms... Sports Medicine - Open.</li>
                    <li>5. Jones, A. M. et al. (2020). Physiological demands of running at 2-hour marathon race pace. J Appl Physiol.</li>
                </ul>
            </div>
        </div>
    );
};

window.RunningEconomyPage = RunningEconomyPage;
