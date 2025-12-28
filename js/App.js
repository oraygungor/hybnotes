const { useState, useEffect, useMemo, useRef } = React;

// --- HELPERS: SEO & DOM ---
const upsertMeta = (name, content) => {
    if (!content) return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
};

const upsertCanonical = (href) => {
    if (!href) return;
    let el = document.querySelector(`link[rel="canonical"]`);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
};

// --- COMPONENT: HybLink (SEO Friendly Link) ---
// Hem Google'ın göreceği href'i üretir hem de SPA hızını korur.
const HybLink = ({ href, onNavigate, className = "", children, ...rest }) => (
    <a
        href={href}
        className={className}
        onClick={(e) => {
            e.preventDefault(); // Sayfa yenilenmesini engelle
            if (onNavigate) onNavigate(); // SPA router'ı tetikle
        }}
        {...rest}
    >
        {children}
    </a>
);

// --- ICON SYSTEM ---
const IconWrapper = ({ children, size = 24, className = "", ...props }) => {
    const { width, height, ...rest } = props; 
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
            {children}
        </svg>
    );
};

const Icons = {
    Activity: (p) => <IconWrapper {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></IconWrapper>,
    BookOpen: (p) => <IconWrapper {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></IconWrapper>,
    Clock: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconWrapper>,
    Zap: (p) => <IconWrapper {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></IconWrapper>,
    Ticket: (p) => <IconWrapper {...p}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></IconWrapper>,
    Calculator: (p) => <IconWrapper {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="16" y1="18" x2="16" y2="18"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/></IconWrapper>,
    Calendar: (p) => <IconWrapper {...p}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></IconWrapper>,
    ChevronRight: (p) => <IconWrapper {...p}><polyline points="9 18 15 12 9 6"/></IconWrapper>,
    ChevronDown: (p) => <IconWrapper {...p}><polyline points="6 9 12 15 18 9"/></IconWrapper>,
    Search: (p) => <IconWrapper {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></IconWrapper>,
    Menu: (p) => <IconWrapper {...p}><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></IconWrapper>,
    X: (p) => <IconWrapper {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconWrapper>,
    Palette: (p) => <IconWrapper {...p}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></IconWrapper>,
    FileText: (p) => <IconWrapper {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></IconWrapper>,
    SortDesc: (p) => <IconWrapper {...p}><path d="M11 5h10"/><path d="M11 9h7"/><path d="M11 13h4"/><path d="M3 17l3 3 3-3"/><path d="M6 18V4"/></IconWrapper>,
    ArrowLeft: (p) => <IconWrapper {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></IconWrapper>,
    Info: (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></IconWrapper>,
};

const PulseBarLogo = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

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

const VALID_PAGES = ['home', 'research', 'hyrox_calc', 'running_perf', 'caffeine', 'utmb_lottery'];
const PARENT_REDIRECTS = {
    'hyrox': 'hyrox_calc',
    'running': 'running_perf',
    'nutrition': 'caffeine',
    'tools': 'utmb_lottery'
};

const App = () => {
    // --- DATA ---
    const [posts, setPosts] = useState(window.HybNotesData?.posts || []);
    const [facts, setFacts] = useState(window.HybNotesData?.facts || []);
    const [currentFact, setCurrentFact] = useState(null);
    
    // --- STATE ---
    const [activeTab, setActiveTab] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [readingArticle, setReadingArticle] = useState(null);
    const [user, setUser] = useState(null);
    
    // --- INIT ---
    const [lang, setLang] = useState(() => localStorage.getItem('hybnotes_lang') || 'tr');
    const [activeTheme, setActiveTheme] = useState(() => {
        const saved = localStorage.getItem('hybnotes_theme');
        return THEMES.find(t => t.id === saved) || THEMES[0];
    });

    // --- SEO: DYNAMIC META & TITLE (Crawler Optimization) ---
    useEffect(() => {
        const baseTitle = "HybNotes";

        if (readingArticle) {
            // Makale Okuma Modu
            const safeLang = readingArticle.title?.[lang] ? lang : "tr";
            document.title = `${readingArticle.title[safeLang]} | ${baseTitle}`;
            upsertMeta("description", readingArticle.summary?.[safeLang] || "");
            // Makale için temiz canonical
            upsertCanonical(`${window.location.origin}/?article=${readingArticle.id}`);
            
            // JSON-LD
            const schemaData = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": readingArticle.title[safeLang],
                "datePublished": readingArticle.date,
                "description": readingArticle.summary[safeLang],
                "articleBody": readingArticle.content[safeLang].replace(/<[^>]*>?/gm, ''),
                "author": { "@type": "Person", "name": "HybNotes" },
                "url": `${window.location.origin}/?article=${readingArticle.id}` 
            };
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(schemaData);
            document.head.appendChild(script);
            return () => { try { document.head.removeChild(script); } catch(e) {} };
        } else {
            // Normal Sayfalar
            const pageMap = {
                home: baseTitle,
                research: `HybLib - Research | ${baseTitle}`,
                hyrox_calc: `HYROX Calculator | ${baseTitle}`,
                running_perf: `Running Performance | ${baseTitle}`,
                caffeine: `Caffeine Strategy | ${baseTitle}`,
                utmb_lottery: `UTMB Lottery | ${baseTitle}`,
            };

            document.title = pageMap[activeTab] || baseTitle;
            upsertMeta(
                "description",
                lang === "tr"
                    ? "Sporcular için bilimsel analizler, tecrübeler ve makaleler."
                    : "Scientific analysis, experiences, and articles for athletes."
            );
            
            const url = new URL(window.location.href);
            upsertCanonical(`${url.origin}${url.pathname}${url.search}`);
        }
    }, [activeTab, readingArticle, lang]);

    // --- ROUTING ---
    useEffect(() => {
        const handleUrlChange = () => {
            const params = new URLSearchParams(window.location.search);
            const articleId = params.get('article');
            const pageId = params.get('page');

            if (articleId) {
                const foundArticle = posts.find(p => p.id === parseInt(articleId));
                if (foundArticle) {
                    setReadingArticle(foundArticle);
                    setActiveTab('research');
                } else {
                    setReadingArticle(null);
                    setActiveTab('research');
                }
            } else if (pageId) {
                const targetPage = PARENT_REDIRECTS[pageId] || pageId;
                if (VALID_PAGES.includes(targetPage)) {
                    setActiveTab(targetPage);
                } else {
                    setActiveTab('home'); 
                }
                setReadingArticle(null);
            } else {
                setActiveTab('home');
                setReadingArticle(null);
            }
            window.scrollTo(0, 0);
        };

        handleUrlChange();
        window.addEventListener('popstate', handleUrlChange);
        return () => window.removeEventListener('popstate', handleUrlChange);
    }, [posts]);

    // --- NAVIGATE (Internal Logic) ---
    const navigateTo = (destination, param = null) => {
        setIsMenuOpen(false);
        const url = new URL(window.location);
        let safeDestination = PARENT_REDIRECTS[destination] || destination;

        if (safeDestination !== 'article' && safeDestination !== 'home' && !VALID_PAGES.includes(safeDestination)) {
            safeDestination = 'home';
        }

        if (safeDestination === 'article' && param) {
            url.searchParams.set('article', param.id);
            url.searchParams.delete('page');
            setReadingArticle(param);
            setActiveTab('research');
        } else {
            if (safeDestination === 'home') {
                url.searchParams.delete('page');
                url.searchParams.delete('article');
            } else {
                url.searchParams.set('page', safeDestination);
                url.searchParams.delete('article');
            }
            setReadingArticle(null);
            setActiveTab(safeDestination);
        }
        window.history.pushState({}, '', url);
        window.scrollTo(0, 0);
    };

    // --- SIDE EFFECTS (Auth, Facts, Theme) ---
    useEffect(() => {
        if (facts.length > 0 && !currentFact) {
            setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
        }
    }, [facts]);

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

    // --- SUB-COMPONENTS ---
    
    const ArticleDetail = ({ article, lang }) => {
        const [copied, setCopied] = useState(false);
        const contentRef = useRef(null);

        const handleShare = async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) { console.error(err); }
        };

        useEffect(() => {
            if (window.renderMathInElement && contentRef.current) {
                window.renderMathInElement(contentRef.current, {
                    delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}],
                    throwOnError: false
                });
            }
        }, [article, lang]);

        return (
            <div className="animate-fade-in pb-20">
                <div className="flex justify-between items-center mb-6">
                    <HybLink 
                        href="?page=research"
                        onNavigate={() => navigateTo('research')} 
                        className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold group text-sm md:text-base"
                    >
                        <Icons.ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {lang === 'tr' ? "HybLib'e Dön" : 'Back to HybLib'}
                    </HybLink>
                    
                    <button onClick={handleShare} className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-primary/20 transition-all font-bold text-xs md:text-sm border border-primary/20">
                        {copied ? (<><span className="text-emerald-400">✓</span> {lang === 'tr' ? 'Kopyalandı' : 'Copied'}</>) : (<><Icons.Zap size={14} /> {lang === 'tr' ? 'Paylaş' : 'Share'}</>)}
                    </button>
                </div>
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
                        <div ref={contentRef} className="rich-text-content text-base md:text-lg max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content[lang] }} />
                    </div>
                    {article.references && article.references.length > 0 && (
                        <div className="p-6 md:p-12 border-t border-slate-700 bg-slate-900/30">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Icons.BookOpen size={18} className="text-primary" />
                                {lang === 'tr' ? 'Referanslar & Kaynakça' : 'References & Bibliography'}
                            </h3>
                            <ul className="space-y-3">
                                {article.references.map((ref, index) => (
                                    <li key={index} className="flex gap-3 text-sm text-slate-400 font-mono leading-relaxed">
                                        <span className="text-slate-600 select-none">[{index + 1}]</span>
                                        <span className="hover:text-slate-200 transition-colors">{ref}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </article>
            </div>
        );
    };

    const ResearchPage = ({ posts, lang }) => {
        const [searchTerm, setSearchTerm] = useState("");
        const ALL_CATEGORY = "ALL_CATEGORY"; 
        const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
        const [sortOption, setSortOption] = useState("newest");

        const t = {
            title: 'HybLib',
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
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                if (sortOption === "newest") return dateB - dateA;
                if (sortOption === "oldest") return dateA - dateB;
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
                            <HybLink 
                                key={post.id} 
                                href={`?article=${post.id}`}
                                onNavigate={() => navigateTo('article', post)} 
                                className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all cursor-pointer group hover-lift shadow-lg overflow-hidden flex flex-col h-full"
                            >
                                <div className="p-6 flex-1"><div className="flex justify-between items-start mb-4"><span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">{post.category[lang]}</span><span className="text-xs text-slate-500 font-mono flex items-center gap-1"><Icons.Calendar size={12}/> {post.date}</span></div><h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">{post.title[lang]}</h3><p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{post.summary[lang]}</p></div><div className="px-6 py-4 bg-slate-900/30 border-t border-slate-700/50 flex justify-between items-center mt-auto"><span className="text-xs text-slate-500 font-medium flex items-center gap-1"><Icons.Clock size={14} /> {post.readTime[lang]}</span><span className="text-xs font-bold text-slate-300 group-hover:text-white flex items-center gap-1 transition-colors">{t.readMore} <Icons.ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/></span></div>
                            </HybLink>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700/50 border-dashed"><Icons.Search size={48} className="mx-auto text-slate-600 mb-4" /><p className="text-slate-400 text-lg">{t.noResults}</p><button onClick={() => {setSearchTerm(""); setSelectedCategory(ALL_CATEGORY);}} className="mt-4 text-primary hover:underline text-sm font-bold">Filtreleri Temizle</button></div>
                )}
            </div>
        );
    };

    const LatestPostsWidget = ({ posts, lang }) => {
        const latest = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
        const t = { title: lang === 'tr' ? 'Son Eklenenler' : 'Latest Posts', new: lang === 'tr' ? 'Yeni' : 'New', viewAll: lang === 'tr' ? 'Tümünü Gör' : 'View All' };
        return (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col h-full hover-lift">
                <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50"><h3 className="font-bold text-white flex items-center gap-2"><Icons.FileText size={18} className="text-primary"/> {t.title}</h3><span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-md">{t.new}</span></div>
                <div className="divide-y divide-slate-700/50">
                    {latest.map(post => (
                        <HybLink key={post.id} href={`?article=${post.id}`} onNavigate={() => navigateTo('article', post)} className="block p-4 hover:bg-slate-700/50 cursor-pointer transition-colors group">
                            <div className="text-[10px] text-slate-500 mb-1 font-mono">{post.date}</div>
                            <div className="text-sm font-medium text-slate-200 group-hover:text-primary transition-colors line-clamp-2">{post.title[lang]}</div>
                        </HybLink>
                    ))}
                </div>
                <HybLink href="?page=research" onNavigate={() => navigateTo('research')} className="block p-3 text-center text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition-colors mt-auto border-t border-slate-700">{t.viewAll}</HybLink>
            </div>
        );
    };

    const HomePage = ({ posts, lang, currentFact }) => {
        const latestPost = useMemo(() => {
            if (!posts || posts.length === 0) return null;
            return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        }, [posts]);

        return (
            <div className="space-y-8 animate-fade-in">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 animate-shimmer-text">HybNotes</h1>
                    <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
                    <p className="text-slate-400 text-base md:text-xl max-w-xl mb-8 relative z-10">{lang === 'tr' ? 'Sporcular için bilimsel analizlerin, tecrübelerin ve makalelerin yer aldığı kişisel bir not defteri.' : 'A personal notebook containing scientific analysis, experiences, and articles for athletes.'}</p>
                    
                    <HybLink 
                        href="?page=research"
                        onNavigate={() => navigateTo('research')} 
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 relative z-10 inline-block"
                    >
                        {lang === 'tr' ? "HybLib'e Git" : 'Go to HybLib'}
                    </HybLink>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {latestPost ? (
                            <HybLink 
                                href={`?article=${latestPost.id}`}
                                onNavigate={() => navigateTo('article', latestPost)} 
                                className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between cursor-pointer hover:border-primary transition-colors group hover-lift shadow-xl"
                            >
                                <div><div className="flex items-center gap-2 text-primary mb-2"><Icons.Zap size={20} /><span className="text-xs font-bold uppercase tracking-wider">{lang === 'tr' ? 'Son Eklenen' : 'Latest Added'}</span></div><h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">{latestPost.title[lang]}</h3><p className="text-sm text-slate-400 line-clamp-2">{latestPost.summary[lang]}</p></div>
                                <div className="mt-4 flex items-center text-xs font-bold text-slate-500 group-hover:text-white transition-colors">{lang === 'tr' ? 'Okumaya Başla' : 'Start Reading'} <Icons.ChevronRight size={14} className="ml-1" /></div>
                            </HybLink>
                        ) : (
                            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-center text-slate-500">Loading...</div>
                        )}
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
                    <div className="md:col-span-1 h-full min-h-[250px] hover-lift"><LatestPostsWidget posts={posts} lang={lang} /></div>
                </div>
            </div>
        );
    };

    const NavBar = ({ activeTab, isMenuOpen, setIsMenuOpen, activeTheme, setActiveTheme, lang, setLang }) => {
        const [showPalette, setShowPalette] = useState(false);
        const paletteRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (paletteRef.current && !paletteRef.current.contains(event.target)) {
                    setShowPalette(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);
        
        const MENU_ITEMS = [
            { id: 'home', title: lang === 'tr' ? 'Ana Sayfa' : 'Home', icon: Icons.Activity },
            { id: 'research', title: 'HybLib', icon: Icons.BookOpen },
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
                        <HybLink href="/" onNavigate={() => navigateTo('home')} className="flex items-center gap-2 cursor-pointer">
                            <PulseBarLogo size={32} /><span className="text-2xl font-black text-white tracking-tighter hidden md:block">HybNotes</span>
                        </HybLink>
                        <div className="hidden md:flex items-center gap-1">
                            {MENU_ITEMS.map((item) => (
                                <div key={item.id} className="relative group">
                                    {!item.children ? (
                                        <HybLink 
                                            href={item.id === "home" ? "/" : `?page=${PARENT_REDIRECTS[item.id] || item.id}`}
                                            onNavigate={() => navigateTo(item.id)}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === item.id || (PARENT_REDIRECTS[item.id] === activeTab) ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            <item.icon size={18} /> {item.title}
                                        </HybLink>
                                    ) : (
                                        <button className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === item.id || (PARENT_REDIRECTS[item.id] === activeTab) ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-white'}`}>
                                            <item.icon size={18} /> {item.title} <Icons.ChevronDown size={14}/>
                                        </button>
                                    )}
                                    {item.children && (
                                        <div className="absolute top-full left-0 w-56 pt-2 hidden group-hover:block">
                                            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                                                {item.children.map((subItem) => (
                                                    <HybLink 
                                                        key={subItem.id} 
                                                        href={`?page=${subItem.id}`}
                                                        onNavigate={() => navigateTo(subItem.id)} 
                                                        className="w-full text-left px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 block"
                                                    >
                                                        <subItem.icon size={16} /> {subItem.title}
                                                    </HybLink>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative" ref={paletteRef}>
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
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full h-[calc(100vh-80px)] overflow-y-auto p-4 space-y-2 z-50">
                        {MENU_ITEMS.map((item) => (
                            <div key={item.id}>
                                {item.children ? (
                                    <div className="bg-slate-800/50 rounded-xl p-2">
                                        <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><item.icon size={14}/> {item.title}</div>
                                        {item.children.map(sub => (
                                            <HybLink 
                                                key={sub.id} 
                                                href={`?page=${sub.id}`}
                                                onNavigate={() => navigateTo(sub.id)} 
                                                className={`w-full text-left px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-700 block ${activeTab === sub.id ? 'text-primary bg-primary/10' : ''}`}
                                            >
                                                {sub.title}
                                            </HybLink>
                                        ))}
                                    </div>
                                ) : (
                                    <HybLink 
                                        href={item.id === "home" ? "/" : `?page=${PARENT_REDIRECTS[item.id] || item.id}`}
                                        onNavigate={() => navigateTo(item.id)} 
                                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-bold block ${activeTab === item.id ? 'bg-primary text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
                                    >
                                        <item.icon size={24} /> {item.title}
                                    </HybLink>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        );
    };

    // --- MAIN RENDER ---
    const renderContent = () => {
        switch (activeTab) {
            case 'home': return <HomePage posts={posts} lang={lang} currentFact={currentFact} />;
            case 'research': return readingArticle ? <ArticleDetail article={readingArticle} lang={lang} /> : <ResearchPage posts={posts} lang={lang} />;
            case 'utmb_lottery': return window.UTMBLotteryPage ? <window.UTMBLotteryPage lang={lang} /> : <div className="text-center p-10 text-slate-500">Loading module...</div>;
            case 'caffeine': return window.CaffeinePage ? <window.CaffeinePage lang={lang} activeTheme={activeTheme} /> : <div className="text-center p-10 text-slate-500">Loading module...</div>;
            case 'running_perf': return window.RunningPerformancePage ? <window.RunningPerformancePage lang={lang} /> : <div className="text-center p-10 text-slate-500">Loading module...</div>;
            case 'hyrox_calc': return window.HyroxCalculatorPage ? <window.HyroxCalculatorPage lang={lang} activeTheme={activeTheme} /> : <div className="text-center p-10 text-slate-500">Loading module...</div>;
            default: return <HomePage posts={posts} lang={lang} currentFact={currentFact} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-primary/30">
            <NavBar activeTab={activeTab} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} activeTheme={activeTheme} setActiveTheme={setActiveTheme} lang={lang} setLang={setLang} />
            <main className="pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto min-h-screen">{renderContent()}</main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
