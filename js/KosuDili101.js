(function() {
    const { useState, useEffect } = React;

    const SvgIcon = ({ children, className = "", size = 24, ...rest }) => (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
            {...rest}
        >
            {children}
        </svg>
    );

    const LocalIcons = {
        Activity: (p) => <SvgIcon {...p}><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7 15l3-4 3 3 4-6" /><path d="M17 8h3" /></SvgIcon>,
        Dumbbell: (p) => <SvgIcon {...p}><path d="M7 8v8" /><path d="M5 9v6" /><path d="M19 8v8" /><path d="M21 9v6" /><path d="M7 12h12" /></SvgIcon>,
        Heart: (p) => <SvgIcon {...p}><path d="M20.5 8.9c0 6-8.5 10.6-8.5 10.6S3.5 14.9 3.5 8.9A4.6 4.6 0 0 1 8 4.4c1.6 0 3 .7 4 2 1-1.3 2.4-2 4-2a4.6 4.6 0 0 1 4.5 4.5Z" /><path d="M7 12h2l1-2 2 5 1-3h4" /></SvgIcon>,
        Flag: (p) => <SvgIcon {...p}><path d="M5 21V3" /><path d="M5 4c3-1.5 5 1.5 8 0s5 1.5 8 0v9c-3 1.5-5-1.5-8 0s-5-1.5-8 0" /></SvgIcon>,
        Footprints: (p) => <SvgIcon {...p}><path d="M7.5 14.5c1.8 0 3.3-1.9 3.3-4.3S9.7 6 7.9 6 4.6 7.9 4.6 10.2s1.2 4.3 2.9 4.3Z" /><path d="M9 18.5c0 1.2-1.3 2.2-2.8 2.2S3.5 19.7 3.5 18.5 4.8 16.3 6.2 16.3 9 17.3 9 18.5Z" /><path d="M16.5 12.8c1.7 0 3.1-1.7 3.1-3.9s-1.2-4-2.9-4-3.1 1.7-3.1 3.9 1.2 4 2.9 4Z" /><path d="M20.5 17.5c0 1.2-1.3 2.2-2.8 2.2S15 18.7 15 17.5s1.3-2.2 2.7-2.2 2.8 1 2.8 2.2Z" /></SvgIcon>,
        Stethoscope: (p) => <SvgIcon {...p}><path d="M6 3v6a6 6 0 0 0 12 0V3" /><path d="M9 3v5" /><path d="M15 3v5" /><path d="M12 15v2a5 5 0 0 0 5 5" /><circle cx="20" cy="19" r="2" /></SvgIcon>,
        Zap: (p) => <SvgIcon {...p}><path d="M13 2 4 14h7l-1 8 10-12h-7l0-8Z" /></SvgIcon>,
        ChevronRight: (p) => <SvgIcon {...p}><path d="M10 6l6 6-6 6" /></SvgIcon>,
        Info: (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7h.01" /></SvgIcon>,
        Shuffle: (p) => <SvgIcon {...p}><path d="M3 8h5c1 0 2 .4 2.7 1.1L21 19" /><path d="M3 16h5c1 0 2-.4 2.7-1.1L14 11" /><path d="M19 6h2v2" /><path d="M21 6l-4 4" /><path d="M19 18h2v-2" /><path d="M21 18l-4-4" /></SvgIcon>,
    };

    const KosuDili101Page = ({ lang }) => {
        const [allTerms, setAllTerms] = useState([]); 
        const [displayedIndices, setDisplayedIndices] = useState([]);
        const [flippedCards, setFlippedCards] = useState({});

        // --- GÜNCELLEME 1: Veriyi Polling İle Güvenli Yükleme ---
        useEffect(() => {
            // Eğer veri zaten window'da varsa hemen al
            if (window.KosuDiliData && window.KosuDiliData.length > 0) {
                setAllTerms(window.KosuDiliData);
                return;
            }

            // Yoksa, script yüklenene kadar bekle (Polling)
            const interval = setInterval(() => {
                if (window.KosuDiliData && window.KosuDiliData.length > 0) {
                    setAllTerms(window.KosuDiliData);
                    clearInterval(interval);
                }
            }, 100); // 100ms'de bir kontrol et

            // 5 saniye sonra hala gelmediyse pes et (Timeout)
            const timeout = setTimeout(() => {
                clearInterval(interval);
            }, 5000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }, []);

        useEffect(() => {
            if (allTerms.length > 0) {
                shuffleAll();
            }
        }, [allTerms]);

        const getRandomIndex = (excludeIndices) => {
            const n = allTerms.length;
            if (n === 0) return 0;

            if (!excludeIndices || excludeIndices.length >= n) {
                return Math.floor(Math.random() * n);
            }

            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * n);
            } while (excludeIndices.includes(newIndex));
            return newIndex;
        };

        const shuffleAll = () => {
            setFlippedCards({});
            const newIndices = [];
            if (allTerms.length <= 4) {
                 setDisplayedIndices(allTerms.map((_, i) => i));
                 return;
            }
            while (newIndices.length < 4) {
                const r = Math.floor(Math.random() * allTerms.length);
                if (newIndices.indexOf(r) === -1) newIndices.push(r);
            }
            setDisplayedIndices(newIndices);
        };

        const handleCardInteraction = (slotIndex) => {
            if (!flippedCards[slotIndex]) {
                setFlippedCards(prev => ({ ...prev, [slotIndex]: true }));
            } else {
                setFlippedCards(prev => ({ ...prev, [slotIndex]: false }));
                
                setTimeout(() => {
                    setDisplayedIndices(prev => {
                        const newArr = [...prev];
                        if (allTerms.length > 4) {
                            newArr[slotIndex] = getRandomIndex(prev);
                        }
                        return newArr;
                    });
                }, 600);
            }
        };

        const getIcon = (catId) => {
            switch (catId) {
                case 'metrics': return <LocalIcons.Activity className="w-10 h-10 text-primary" />; 
                case 'training': return <LocalIcons.Dumbbell className="w-10 h-10 text-orange-400" />;
                case 'physiology': return <LocalIcons.Heart className="w-10 h-10 text-red-400" />;
                case 'race': return <LocalIcons.Flag className="w-10 h-10 text-yellow-400" />;
                case 'biomechanics': return <LocalIcons.Footprints className="w-10 h-10 text-sky-400" />;
                case 'health': return <LocalIcons.Stethoscope className="w-10 h-10 text-pink-400" />;
                default: return <LocalIcons.Zap className="w-10 h-10 text-purple-400" />;
            }
        };

        // --- GÜNCELLEME 2: Dil Seçimi Fallback ---
        // lang prop'u 'tr' veya 'en' değilse varsayılan 'tr' kullan.
        const safeLang = (lang === 'tr' || lang === 'en') ? lang : 'tr';

        const t = {
            tr: {
                subtitle: "Koşucuların gizli dilini keşfetmeye hazır mısın?",
                shuffleBtn: "Masayı Karıştır",
                seeDef: "Tanımı Gör",
                whatIs: "NEDİR?"
            },
            en: {
                subtitle: "Ready to decode the secret language of runners?",
                shuffleBtn: "Shuffle Deck",
                seeDef: "See Definition",
                whatIs: "WHAT IS IT?"
            }
        }[safeLang];

        if (!allTerms || allTerms.length === 0) return <div className="text-center p-10 text-slate-500">Yükleniyor...</div>;

        return (
            <div className="space-y-8 animate-fade-in pb-12">
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 4px; }
                    .card-container { perspective: 1000px; }
                    .card-inner { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
                    .card-front, .card-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; position: absolute; inset: 0; }
                    .card-back { transform: rotateY(180deg); }
                    .flipped { transform: rotateY(180deg); }
                `}</style>

                {/* --- HERO SECTION --- */}
                <header className="bg-slate-800 text-white pt-12 pb-12 px-6 rounded-[2rem] shadow-xl relative overflow-hidden transition-all duration-500 border border-slate-700">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-[80px] opacity-10 -ml-10 -mb-10"></div>
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            {safeLang === 'tr' ? 'Koşu Dili' : 'Running Lingo'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-200">101</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-light">{t.subtitle}</p>
                    </div>
                </header>

                {/* --- GRID --- */}
                <div className="flex justify-end mb-2">
                    <button onClick={shuffleAll} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-primary px-5 py-2 rounded-xl transition-all font-bold border border-slate-700 hover:border-primary/50 shadow-lg active:scale-95 text-sm">
                        <LocalIcons.Shuffle size={18} /> {t.shuffleBtn}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedIndices.map((termIndex, slotIndex) => {
                        const item = allTerms[termIndex];
                        if (!item) return null;
                        
                        // Fallback logic: safeLang ile al, yoksa tr'yi al, o da yoksa ilk key'i al
                        const content = item[safeLang] || item['tr'] || item['en']; 
                        
                        const isFlipped = flippedCards[slotIndex];

                        // Kategori ismini güvenli bir şekilde büyük harfe çevir
                        const categoryName = content.category ? (safeLang === 'tr' ? content.category.toLocaleUpperCase('tr-TR') : content.category.toUpperCase()) : '';

                        return (
                            <div key={slotIndex} className="card-container h-80 w-full cursor-pointer group" onClick={() => handleCardInteraction(slotIndex)}>
                                <div className={`card-inner w-full h-full relative ${isFlipped ? 'flipped' : ''}`}>
                                    {/* FRONT */}
                                    <div className="card-front bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-between shadow-xl group-hover:border-primary/50 transition-colors">
                                        <div className="w-full flex justify-between items-start">
                                            <span className="bg-slate-950 text-slate-400 text-[10px] font-bold tracking-wider px-2 py-1 rounded truncate max-w-[120px]">
                                                {categoryName}
                                            </span>
                                            <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-primary transition-colors"></div>
                                        </div>
                                        <div className="text-center space-y-4 w-full">
                                            <div className="inline-block p-4 rounded-full bg-slate-900 border border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                {getIcon(item.catId)}
                                            </div>
                                            <h3 className="text-xl font-bold text-white leading-tight break-words">{content.term}</h3>
                                        </div>
                                        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            {t.seeDef} <LocalIcons.ChevronRight size={12} />
                                        </div>
                                    </div>
                                    
                                    {/* BACK */}
                                    <div className="card-back bg-primary/80 backdrop-blur-sm rounded-2xl p-5 flex flex-col shadow-xl text-white relative overflow-hidden">
                                         <div className="absolute top-0 right-0 p-4 opacity-10"><LocalIcons.Info size={64}/></div>
                                         
                                         {/* Başlık */}
                                         <div className="relative z-10 flex-none border-b border-black/10 pb-2 mb-2">
                                            <div className="flex items-center gap-2 opacity-80 mb-1">
                                                <LocalIcons.Info size={14} />
                                                <span className="font-bold text-[10px] uppercase tracking-wider">{t.whatIs}</span>
                                            </div>
                                            <h4 className="font-black text-lg leading-tight drop-shadow-sm">{content.term}</h4>
                                         </div>

                                         {/* Tanım */}
                                         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar pr-1">
                                            <div className="min-h-full flex items-center">
                                                <p className="text-base md:text-sm font-semibold leading-relaxed drop-shadow-sm text-white">
                                                    {content.def}
                                                </p>
                                            </div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    window.KosuDili101Page = KosuDili101Page;
})();
