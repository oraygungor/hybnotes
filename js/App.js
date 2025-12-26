const { useState, useEffect, useMemo, useRef } = React;

const THEMES = [
    { id: 'cyan', name: 'Turkuaz', rgb: '6 182 212', hex: '#06b6d4' },
    { id: 'red', name: 'Kırmızı', rgb: '239 68 68', hex: '#ef4444' },
    { id: 'lime', name: 'Yeşil', rgb: '132 204 22', hex: '#84cc16' },
    { id: 'blue', name: 'Mavi', rgb: '59 130 246', hex: '#3b82f6' },
    { id: 'purple', name: 'Mor', rgb: '168 85 247', hex: '#a855f7' },
    { id: 'orange', name: 'Turuncu', rgb: '249 115 22', hex: '#f97316' },
    { id: 'yellow', name: 'Altın Sarısı', rgb: '234 179 8', hex: '#eab308' },
    { id: 'pink', name: 'Pembe', rgb: '236 72 153', hex: '#ec4899' },
    { id: 'indigo', name: 'İndigo', rgb: '99 102 241', hex: '#6366f1' },
    { id: 'emerald', name: 'Zümrüt', rgb: '16 185 129', hex: '#10b981' },
];

// --- ÖZEL HYROX LOGOSU (GÜNCELLENDİ: Daha kalın ve gerçekçi X) ---
const HyroxLogo = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 398 262" fill="currentColor" className={className}>
        <polygon points="72,37 249,37 243,53 66,53" />
        <polygon points="55,67 232,67 226,82 49,82" />
        <polygon points="38,96 215,96 209,112 32,112" />
        <polygon points="21,126 375,126 370,141 15,141" />
        <polygon points="182,155 359,155 353,171 175,171" />
        <polygon points="164,185 342,185 336,200 159,200" />
        <polygon points="147,215 325,215 319,230 142,230" />
    </svg>
);


const App = () => {
    // --- VERİLERİ HARİCİ DOSYADAN (Data.js) AL ---
    const [posts, setPosts] = useState(window.HybNotesData?.posts || []);
    const [facts, setFacts] = useState(window.HybNotesData?.facts || []);
    const [currentFact, setCurrentFact] = useState(null);
    
    const [activeTab, setActiveTab] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [readingArticle, setReadingArticle] = useState(null);
    const [user, setUser] = useState(null);
    
    // --- STATE INITIALIZATION WITH LOCALSTORAGE ---
    const [lang, setLang] = useState(() => localStorage.getItem('hybnotes_lang') || 'tr');
    
    const [activeTheme, setActiveTheme] = useState(() => {
        const saved = localStorage.getItem('hybnotes_theme');
        return THEMES.find(t => t.id === saved) || THEMES[0];
    });

    // Rastgele bir bilgi seç
    useEffect(() => {
        if (facts.length > 0 && !currentFact) {
            setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
        }
    }, [facts]);

    // --- AUTH ---
    useEffect(() => {
        if (typeof firebase === 'undefined' || !firebase.apps.length) return;
        const initAuth = async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await firebase.auth().signInWithCustomToken(__initial_auth_token);
                } else {
                    await firebase.auth().signInAnonymously();
                }
            } catch (e) { console.warn("Auth failure", e); }
        };
        initAuth();
        const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    // --- SAVE SETTINGS (LocalStorage Priority) ---
    useEffect(() => {
        document.documentElement.style.setProperty('--primary-rgb', activeTheme.rgb);
        document.documentElement.lang = lang; 
        
        localStorage.setItem('hybnotes_lang', lang);
        localStorage.setItem('hybnotes_theme', activeTheme.id);

        if (user && typeof firebase !== 'undefined') {
            const db = firebase.firestore();
            db.collection('artifacts').doc('hybnotes-app').collection('users').doc(user.uid).collection('user_prefs').doc('settings').set({ themeId: activeTheme.id, lang: lang }).catch(()=>{});
        }
    }, [activeTheme, lang, user]);

    // --- COMPONENTS ---
    const ArticleDetail = ({ article, goBack, lang }) => (
        <div className="animate-fade-in pb-20">
            <button onClick={goBack} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold group text-sm md:text-base">
                <Icons.ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {lang === 'tr' ? 'Kütüphaneye Dön' : 'Back to Library'}
            </button>
            <article className="bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
                <div className="p-6 md:p-12 border-b border-slate-700 bg-slate-800/50">
                    <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-400 mb-4 md:mb-6 font-mono">
                        <span className="flex items-center gap-1"><Icons.Calendar size={12}/> {article.date}</span>
                        <span className="flex items-center gap-1"><Icons.Clock size={12}/> {article.readTime[lang]}</span>
                        <span className="bg-primary/10 text-primary px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-primary/20 font-bold">{article.category[lang]}</span>
                    </div>
                    <h1 className="text-2xl md:text-5xl font-black text-white mb-2 md:mb-4 leading-tight">{article.title[lang]}</h1>
                </div>
                <div className="p-6 md:p-12">
                    <div className="prose prose-invert prose-sm md:prose-lg max-w-none text-slate-300 leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: article.content[lang].replace(/class='math-box'/g, `class="my-6 p-4 md:p-6 bg-slate-900 border-l-4 border-primary rounded-r-xl font-mono text-primary text-opacity-90 text-sm md:text-lg text-center shadow-inner italic"`) }} />
                </div>
            </article>
        </div>
    );

    const ResearchPage = ({ posts, onSelect, lang }) => {
        const [searchTerm, setSearchTerm] = useState("");
        const ALL_CATEGORY = "ALL_CATEGORY"; 
        const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
        const [sortOption, setSortOption] = useState("newest");

        const t = {
            title: lang === 'tr' ? 'Kütüphane' : 'Library',
            searchPlaceholder: lang === 'tr' ? 'Makale, konu veya içerik ara...' : 'Search articles, topics or content...',
            allCategories: lang === 'tr' ? 'Tümü' : 'All',
            sortBy: lang === 'tr' ? 'Sırala' : 'Sort by',
            sortNewest: lang === 'tr' ? 'En Yeni' : 'Newest',
            sortOldest: lang === 'tr' ? 'En Eski' : 'Oldest',
            noResults: lang === 'tr' ? 'Sonuç bulunamadı.' : 'No results found.',
            readMore: lang === 'tr' ? 'Oku' : 'Read',
        };

        const categories = [ALL_CATEGORY, ...new Set(posts.map(post => post.category[lang]))];

        const filteredAndSortedPosts = useMemo(() => {
            let result = posts.filter(post => {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch = 
                    post.title[lang].toLowerCase().includes(searchLower) || 
                    post.summary[lang].toLowerCase().includes(searchLower) ||
                    post.category[lang].toLowerCase().includes(searchLower);
                const matchesCategory = selectedCategory === ALL_CATEGORY || post.category[lang] === selectedCategory;
                return matchesSearch && matchesCategory;
            });
            return result.sort((a, b) => {
                if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
                if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
                return 0;
            });
        }, [posts, searchTerm, selectedCategory, sortOption, lang]);

        return (
            <div className="space-y-8 animate-fade-in min-h-[600px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-white">{t.title}</h2>
                    <div className="relative w-full md:w-96 group">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                        <input type="text" placeholder={t.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-lg" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-800/50 p-2 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}>{cat === ALL_CATEGORY ? t.allCategories : cat}</button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 border-l border-slate-700 pl-0 md:pl-4 w-full md:w-auto">
                        <span className="text-xs text-slate-500 font-bold uppercase hidden md:inline-block"><Icons.SortDesc size={14} /></span>
                        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-transparent text-sm font-medium text-slate-300 focus:text-primary cursor-pointer w-full md:w-auto"><option value="newest">{t.sortNewest}</option><option value="oldest">{t.sortOldest}</option></select>
                    </div>
                </div>
                {filteredAndSortedPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredAndSortedPosts.map(post => (
                            <div key={post.id} onClick={() => onSelect(post)} className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all cursor-pointer group hover-lift shadow-lg overflow-hidden flex flex-col h-full">
                                <div className="p-6 flex-1"><div className="flex justify-between items-start mb-4"><span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">{post.category[lang]}</span><span className="text-xs text-slate-500 font-mono flex items-center gap-1"><Icons.Calendar size={12}/> {post.date}</span></div><h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">{post.title[lang]}</h3><p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{post.summary[lang]}</p></div><div className="px-6 py-4 bg-slate-900/30 border-t border-slate-700/50 flex justify-between items-center mt-auto"><span className="text-xs text-slate-500 font-medium flex items-center gap-1"><Icons.Clock size={14} /> {post.readTime[lang]}</span><span className="text-xs font-bold text-slate-300 group-hover:text-white flex items-center gap-1 transition-colors">{t.readMore} <Icons.ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/></span></div></div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700/50 border-dashed"><Icons.Search size={48} className="mx-auto text-slate-600 mb-4" /><p className="text-slate-400 text-lg">{t.noResults}</p><button onClick={() => {setSearchTerm(""); setSelectedCategory(ALL_CATEGORY);}} className="mt-4 text-primary hover:underline text-sm font-bold">Filtreleri Temizle</button></div>
                )}
            </div>
        );
    };

    const LatestPostsWidget = ({ posts, onSelect, lang }) => {
        const latest = [...posts].sort((a, b) => b.id - a.id).slice(0, 3);
        const t = { title: lang === 'tr' ? 'Son Eklenenler' : 'Latest Posts', new: lang === 'tr' ? 'Yeni' : 'New', viewAll: lang === 'tr' ? 'Tümünü Gör' : 'View All' };
        return (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col h-full hover-lift">
                <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50"><h3 className="font-bold text-white flex items-center gap-2"><Icons.FileText size={18} className="text-primary"/> {t.title}</h3><span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-md">{t.new}</span></div>
                <div className="divide-y divide-slate-700/50">{latest.map(post => (<div key={post.id} onClick={() => onSelect(post)} className="p-4 hover:bg-slate-700/50 cursor-pointer transition-colors group"><div className="text-[10px] text-slate-500 mb-1 font-mono">{post.date}</div><div className="text-sm font-medium text-slate-200 group-hover:text-primary transition-colors line-clamp-2">{post.title[lang]}</div></div>))}</div>
                <div onClick={() => onSelect(null, 'research')} className="p-3 text-center text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition-colors mt-auto border-t border-slate-700">{t.viewAll}</div>
            </div>
        );
    };

    const HomePage = ({ changePage, posts, onRead, lang, currentFact }) => {
        const latestPost = posts.length > 0 ? posts[0] : null;
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 animate-shimmer-text">HybNotes</h1>
                    <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
                    <p className="text-slate-400 text-base md:text-xl max-w-xl mb-8 relative z-10">{lang === 'tr' ? 'Sporcular için bilimsel analizlerin, tecrübelerin ve makalelerin yer aldığı kişisel bir not defteri.' : 'A personal notebook containing scientific analysis, experiences, and articles for athletes.'}</p>
                    <button onClick={() => changePage('research')} className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 relative z-10">{lang === 'tr' ? 'Kütüphaneye Git' : 'Go to Library'}</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div onClick={() => latestPost && onRead(latestPost)} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between cursor-pointer hover:border-primary transition-colors group hover-lift shadow-xl">
                            <div><div className="flex items-center gap-2 text-primary mb-2"><Icons.Zap size={20} /><span className="text-xs font-bold uppercase tracking-wider">{lang === 'tr' ? 'Son Eklenen' : 'Latest Added'}</span></div><h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">{latestPost ? latestPost.title[lang] : '...'}</h3><p className="text-sm text-slate-400 line-clamp-2">{latestPost ? latestPost.summary[lang] : ''}</p></div>
                            <div className="mt-4 flex items-center text-xs font-bold text-slate-500 group-hover:text-white transition-colors">{lang === 'tr' ? 'Okumaya Başla' : 'Start Reading'} <Icons.ChevronRight size={14} className="ml-1" /></div>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between hover-lift shadow-xl">
                            <div><div className="flex items-center gap-2 text-blue-400 mb-2"><Icons.Info size={20} /><span className="text-xs font-bold uppercase tracking-wider">{lang === 'tr' ? 'Biliyor Muydunuz?' : 'Did You Know?'}</span></div>
                                <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">{currentFact ? currentFact.tag : '#Antrenman'}</div>
                                <p className="text-slate-200 text-sm leading-relaxed italic">
                                    {currentFact ? `"${currentFact.text[lang]}"` : '...'}
                                </p>
                            </div>
                            <div className="mt-4 text-[10px] text-slate-600 font-mono tracking-widest uppercase">HybNotes Intelligence</div>
                        </div>
                    </div>
                    <div className="md:col-span-1 h-full min-h-[250px] hover-lift"><LatestPostsWidget posts={posts} onSelect={onRead} lang={lang} /></div>
                </div>
            </div>
        );
    };

    const NavBar = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen, activeTheme, setActiveTheme, lang, setLang }) => {
        const [showPalette, setShowPalette] = useState(false);
        const MENU_ITEMS = [
            { id: 'home', title: lang === 'tr' ? 'Ana Sayfa' : 'Home', icon: Icons.Activity },
            { id: 'research', title: lang === 'tr' ? 'Kütüphane' : 'Library', icon: Icons.BookOpen },
            { 
                id: 'hyrox',
                title: 'HYROX',
                icon: HyroxLogo,
                type: 'dropdown',
                children: [
                    { id: 'hyrox_calc', title: lang === 'tr' ? 'Süre Hesaplama' : 'Time Calculator', icon: Icons.Clock },
                ]
            },
            { 
                id: 'running', 
                title: lang === 'tr' ? 'Koşu' : 'Running', 
                icon: Icons.Activity,
                type: 'dropdown',
                children: [
                    { id: 'running_perf', title: lang === 'tr' ? 'Performansın Temeli' : 'Performance Fundamentals', icon: Icons.Activity },
                ]
            },
            { 
                id: 'nutrition', 
                title: lang === 'tr' ? 'Beslenme' : 'Nutrition', 
                icon: Icons.Zap,
                type: 'dropdown',
                children: [
                    { id: 'caffeine', title: lang === 'tr' ? 'Kafein Stratejisi' : 'Caffeine Strategy', icon: Icons.Zap },
                ]
            },
            { 
                id: 'tools', 
                title: lang === 'tr' ? 'Araçlar' : 'Tools', 
                icon: Icons.Calculator,
                type: 'dropdown',
                children: [
                    { id: 'utmb_lottery', title: lang === 'tr' ? 'UTMB Kura' : 'UTMB Lottery', icon: Icons.Ticket },
                ]
            },
        ];

        return (
            <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('home'); setReadingArticle(null); }}><PulseBarLogo size={32} /><span className="text-2xl font-black text-white tracking-tighter hidden md:block">HybNotes</span></div>
                        <div className="hidden md:flex items-center gap-1">
                            {MENU_ITEMS.map((item) => (
                                <div key={item.id} className="relative group">
                                    <button onClick={() => !item.children && setActiveTab(item.id)} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === item.id ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-white'}`}><item.icon size={18} /> {item.title} {item.children && <Icons.ChevronDown size={14}/>}</button>
                                    {item.children && (<div className="absolute top-full left-0 w-56 pt-2 hidden group-hover:block"><div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden animate-fade-in">{item.children.map((subItem) => (<button key={subItem.id} onClick={() => { setActiveTab(subItem.id); setReadingArticle(null); }} className="w-full text-left px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3"><subItem.icon size={16} /> {subItem.title}</button>))}</div></div>)}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <button onClick={() => setShowPalette(!showPalette)} className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"><Icons.Palette size={20} /></button>
                                {showPalette && (<div className="absolute top-full right-0 mt-2 p-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl grid grid-cols-4 gap-2 w-48 z-50">{THEMES.map(t => (<button key={t.id} onClick={() => { setActiveTheme(t); setShowPalette(false); }} className={`w-6 h-6 rounded-full border-2 ${activeTheme.id === t.id ? 'border-white scale-110' : 'border-transparent hover:scale-110'} transition-transform`} style={{ backgroundColor: t.hex }} title={t.name}></button>))}</div>)}
                            </div>
                            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                                <button onClick={() => setLang('tr')} className={`px-2 py-1 text-xs font-bold rounded transition-colors ${lang === 'tr' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}>TR</button>
                                <button onClick={() => setLang('en')} className={`px-2 py-1 text-xs font-bold rounded transition-colors ${lang === 'en' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}>EN</button>
                            </div>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-300 hover:text-primary">{isMenuOpen ? <Icons.X size={28} /> : <Icons.Menu size={28} />}</button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (<div className="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full h-[calc(100vh-80px)] overflow-y-auto p-4 space-y-2 z-50">{MENU_ITEMS.map((item) => (<div key={item.id}>{item.children ? (<div className="bg-slate-800/50 rounded-xl p-2"><div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><item.icon size={14}/> {item.title}</div>{item.children.map(sub => (<button key={sub.id} onClick={() => {setActiveTab(sub.id); setIsMenuOpen(false);}} className={`w-full text-left px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-700 ${activeTab === sub.id ? 'text-primary bg-primary/10' : ''}`}>{sub.title}</button>))}</div>) : (<button onClick={() => {setActiveTab(item.id); setIsMenuOpen(false);}} className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-bold ${activeTab === item.id ? 'bg-primary text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}><item.icon size={24} /> {item.title}</button>)}</div>))}</div>)}
            </nav>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'home': return <HomePage changePage={setActiveTab} posts={posts} onRead={(post) => { setReadingArticle(post); setActiveTab('research'); }} lang={lang} currentFact={currentFact} />;
            case 'research': return readingArticle ? <ArticleDetail article={readingArticle} goBack={() => setReadingArticle(null)} lang={lang} /> : <ResearchPage posts={posts} onSelect={(article) => { setReadingArticle(article); setActiveTab('research'); }} lang={lang} />;
            case 'utmb_lottery': return window.UTMBLotteryPage ? <window.UTMBLotteryPage lang={lang} /> : <div className="text-center p-10 text-slate-500">Loading module...</div>;
            case 'caffeine': return window.CaffeinePage ? <window.CaffeinePage lang={lang} activeTheme={activeTheme} /> : <div className="text-center p-10 text-slate-500">Loading module...</div>;
            case 'running_perf': return window.RunningPerformancePage ? <window.RunningPerformancePage lang={lang} /> : <div className="text-center p-10 text-slate-500">Loading module...</div>;
            case 'hyrox_calc': return window.HyroxCalculatorPage ? <window.HyroxCalculatorPage lang={lang} activeTheme={activeTheme} /> : <div className="text-center p-10 text-slate-500">Loading module...</div>;
            default: return <HomePage changePage={setActiveTab} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-primary/30">
            <NavBar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setReadingArticle(null); }} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} activeTheme={activeTheme} setActiveTheme={setActiveTheme} lang={lang} setLang={setLang} />
            <main className="pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto min-h-screen">{renderContent()}</main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
