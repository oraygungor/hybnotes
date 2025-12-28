(function() {
    const { useState, useEffect } = React;

    const SvgIcon = ({ children, className = "" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {children}
        </svg>
    );

    const LocalIcons = {
        Activity: (p) => <SvgIcon {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></SvgIcon>,
        Dumbbell: (p) => <SvgIcon {...p}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1a2.121 2.121 0 0 0-3 3l1 1"/><path d="m21 21-1-1a2.121 2.121 0 0 0-3 3l1 1"/><path d="M15 6.5 17.5 4"/><path d="M4 6.5 6.5 4"/><path d="m3 3 1 1a2.121 2.121 0 0 0 3 3l1-1"/><path d="m3 3 1 1a2.121 2.121 0 0 0 3 3l1-1"/><path d="M14 17.5 16.5 20"/><path d="M4 17.5 6.5 20"/></SvgIcon>,
        Heart: (p) => <SvgIcon {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></SvgIcon>,
        Flag: (p) => <SvgIcon {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></SvgIcon>,
        Footprints: (p) => <SvgIcon {...p}><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 11 3.8 11 8c0 1.25-.5 2-1.25 2H4.18C4.07 10 4 10.05 4 10.1V16Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 13 7.8 13 12c0 1.25.5 2 1.25 2h5.57c.11 0 .18.05.18.1V20Z"/></SvgIcon>,
        Stethoscope: (p) => <SvgIcon {...p}><path d="M4.8 2.3A.3.3 0 0 1 5 2h14a.3.3 0 0 1 .2.3v3.3a.3.3 0 0 1-.3.3H18a.3.3 0 0 1-.3-.3V4.2a.3.3 0 0 0-.3-.3h-4a.3.3 0 0 0-.3.3v10a3 3 0 0 1-3 3 2.5 2.5 0 0 1-2.5-2.5V5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v3.6a.3.3 0 0 1-.3.3H3.3a.3.3 0 0 1-.3-.3V2.3Z"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></SvgIcon>,
        Zap: (p) => <SvgIcon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></SvgIcon>,
        ChevronRight: (p) => <SvgIcon {...p}><polyline points="9 18 15 12 9 6"/></SvgIcon>,
        Info: (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></SvgIcon>,
        Shuffle: (p) => <SvgIcon {...p}><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l14.2-12.6c.8-1.1 2-1.7 3.3-1.7H22"/><path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l14.2 12.6c.8 1.1 2 1.7 3.3 1.7H22"/></SvgIcon>
    };

    const KosuDili101Page = ({ lang }) => {
        // DOĞRUDAN window.KosuDiliData KULLANILIYOR
        const [allTerms] = useState(window.KosuDiliData || []); 
        const [displayedIndices, setDisplayedIndices] = useState([]);
        const [flippedCards, setFlippedCards] = useState({});

        useEffect(() => {
            if (allTerms.length > 0) {
                shuffleAll();
            }
        }, [allTerms]);

        const getRandomIndex = (excludeIndices) => {
            if (allTerms.length === 0) return 0;
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * allTerms.length);
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
                        newArr[slotIndex] = getRandomIndex(prev);
                        return newArr;
                    });
                }, 300);
            }
        };

        const getIcon = (catId) => {
            switch (catId) {
                case 'metrics': return <LocalIcons.Activity className="w-10 h-10 text-primary" />; // Ana tema rengi
                case 'training': return <LocalIcons.Dumbbell className="w-10 h-10 text-orange-400" />;
                case 'physiology': return <LocalIcons.Heart className="w-10 h-10 text-red-400" />;
                case 'race': return <LocalIcons.Flag className="w-10 h-10 text-yellow-400" />;
                case 'biomechanics': return <LocalIcons.Footprints className="w-10 h-10 text-sky-400" />;
                case 'health': return <LocalIcons.Stethoscope className="w-10 h-10 text-pink-400" />;
                default: return <LocalIcons.Zap className="w-10 h-10 text-purple-400" />;
            }
        };

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
        }[lang];

        if (!allTerms || allTerms.length === 0) return <div className="text-center p-10 text-slate-500">Veri Yüklenemedi</div>;

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
                    {/* Arka plan blob'ları artık primary renginde */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-[80px] opacity-10 -ml-10 -mb-10"></div>
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            {lang === 'tr' ? 'Koşu Dili' : 'Running Lingo'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-200">101</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-light">{t.subtitle}</p>
                    </div>
                </header>

                {/* --- GRID --- */}
                <div className="flex justify-end mb-2">
                    {/* Buton rengi temaya bağlandı */}
                    <button onClick={shuffleAll} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-primary px-5 py-2 rounded-xl transition-all font-bold border border-slate-700 hover:border-primary/50 shadow-lg active:scale-95 text-sm">
                        <LocalIcons.Shuffle size={18} /> {t.shuffleBtn}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedIndices.map((termIndex, slotIndex) => {
                        const item = allTerms[termIndex];
                        if (!item) return null;
                        const content = item[lang];
                        const isFlipped = flippedCards[slotIndex];

                        return (
                            <div key={slotIndex} className="card-container h-80 w-full cursor-pointer group" onClick={() => handleCardInteraction(slotIndex)}>
                                <div className={`card-inner w-full h-full relative ${isFlipped ? 'flipped' : ''}`}>
                                    {/* FRONT */}
                                    {/* Hover durumunda border rengi temaya göre değişir */}
                                    <div className="card-front bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-between shadow-xl group-hover:border-primary/50 transition-colors">
                                        <div className="w-full flex justify-between items-start">
                                            <span className="bg-slate-950 text-slate-400 text-[10px] font-bold tracking-wider px-2 py-1 rounded truncate max-w-[120px]">
                                                {lang === 'tr' ? content.category.toLocaleUpperCase('tr-TR') : content.category.toUpperCase()}
                                            </span>
                                            {/* Sağ üstteki nokta rengi temaya bağlandı */}
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
                                    {/* Kartın arka yüzü tamamen tema renginde */}
                                    <div className="card-back bg-primary rounded-2xl p-6 flex flex-col justify-center shadow-xl text-slate-900 relative overflow-hidden">
                                         <div className="absolute top-0 right-0 p-4 opacity-10"><LocalIcons.Info size={64}/></div>
                                         <div className="relative z-10 overflow-y-auto pr-1 custom-scrollbar max-h-full">
                                            <div className="flex items-center gap-2 mb-3 opacity-70">
                                                <LocalIcons.Info size={16} />
                                                <span className="font-bold text-xs uppercase">{t.whatIs}</span>
                                            </div>
                                            <p className="text-lg font-bold leading-snug">{content.def}</p>
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
