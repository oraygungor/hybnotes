// Bu dosya, uygulamanın veri kaynağıdır.
// Bilimsel veriler, formüller ve akademik referanslar içerir.

window.HybNotesData = {
    posts: [
        { 
            "id": 101, 
            "date": "2024-11-15", 
            "readTime": { "tr": "15 dk", "en": "15 min" }, 
            "category": { "tr": "Fizyoloji", "en": "Physiology" }, 
            "title": { "tr": "VO2max: Fick Denklemi ve Dayanıklılık Tavanı", "en": "VO2max: The Fick Equation and Endurance Ceiling" }, 
            "summary": { 
                "tr": "Maksimum oksijen tüketim kapasitesi sadece akciğerlerle ilgili değildir. Fick denklemi üzerinden kalbin atım hacmi ve kasların oksijen ekstraksiyon kapasitesinin analizi.", 
                "en": "Maximal oxygen uptake is not just about the lungs. Analysis of stroke volume and muscle oxygen extraction capacity via the Fick equation." 
            }, 
            "content": { 
                "tr": `
                    <p>Dayanıklılık sporlarında performansın "altın standardı" olarak kabul edilen <strong>VO<sub>2max</sub></strong>, bir sporcunun deniz seviyesinde, maksimum efor sırasında kullanabildiği en yüksek oksijen hacmini ifade eder. Ancak yaygın inanışın aksine, bu değer sadece akciğer kapasitesiyle sınırlı değildir; asıl sınırlayıcı faktör genellikle kalbin pompalama kapasitesi ve kasların bu oksijeni kandan çekebilme yeteneğidir.</p>
                    
                    <h3>Fick Prensibi ve Matematiksel Model</h3>
                    <p>Adolf Fick tarafından 1870'de geliştirilen prensip, VO<sub>2max</sub>'ı belirleyen fizyolojik bileşenleri şu temel denklemle açıklar:</p>
                    
                    <div class="latex-formula" style="background: rgba(79, 209, 197, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <span>VO</span><sub>2max</sub> <span class="op">=</span> <span>Q</span> <span class="op">×</span> <span>(a-v)O</span><sub>2</sub>
                    </div>

                    <p>Bu denklemde:</p>
                    <ul style="list-style-type: disc; padding-left: 20px; color: #a9b3d9;">
                        <li><strong>Q (Kardiyak Çıktı):</strong> Kalbin bir dakikada pompaladığı kan miktarıdır. <br><em>Formül: Atım Hacmi (SV) × Kalp Atım Hızı (HR)</em>. Elit sporcularda 35-40 L/dk'ya kadar çıkabilir.</li>
                        <li><strong>(a-v)O<sub>2</sub> Farkı:</strong> Arteriyel (temiz) ve venöz (kirli) kan arasındaki oksijen farkıdır. Bu, kasların gelen kandan ne kadar oksijen çekebildiğini (ekstraksiyon kapasitesi) gösterir.</li>
                    </ul>

                    <blockquote>
                        "VO2max motorun hacmini belirler, ancak o motorla ne kadar hızlı gidebileceğinizi Koşu Ekonomisi ve Laktat Eşiği belirler." — Dr. Stephen Seiler
                    </blockquote>

                    <h3>Genetik ve Antrenman Uyarlamaları</h3>
                    <p>Bouchard ve arkadaşlarının (1999) yaptığı ünlü <em>HERITAGE Aile Çalışması</em>, VO<sub>2max</sub>'ın antrenmana yanıtının (trainability) %47 oranında kalıtsal olduğunu göstermiştir. Yani başlangıç seviyeniz düşük olsa bile, "yüksek yanıt veren" (high responder) bir genetiğe sahipseniz, düzenli antrenmanla bu değeri %40-50 artırabilirsiniz.</p>
                    
                    <p>Antrenmanla gelişimin fizyolojik mekanizmaları şunlardır:</p>
                    <ol style="list-style-type: decimal; padding-left: 20px; color: #e7ecff;">
                        <li><strong>Atım Hacmi Artışı:</strong> Sol ventrikülün büyümesi (eksantrik hipertrofi) sayesinde kalp her atışta daha fazla kan pompalar.</li>
                        <li><strong>Kapillarizasyon:</strong> Tip I kas lifleri etrafındaki kılcal damar ağı artar, bu da (a-v)O<sub>2</sub> farkını iyileştirir.</li>
                        <li><strong>Mitokondriyal Yoğunluk:</strong> Oksijeni işleyen organellerin sayısı artar.</li>
                    </ol>
                `,
                "en": `
                    <p>Considered the "gold standard" of performance in endurance sports, <strong>VO<sub>2max</sub></strong> refers to the maximum volume of oxygen an athlete can utilize during maximal effort at sea level. Contrary to popular belief, this value is not limited merely by lung capacity; the primary limiting factors are often the heart's pumping capacity and the muscles' ability to extract this oxygen from the blood.</p>
                    
                    <h3>The Fick Principle and Mathematical Model</h3>
                    <p>Developed by Adolf Fick in 1870, the principle describes the physiological components determining VO<sub>2max</sub> with the following fundamental equation:</p>
                    
                    <div class="latex-formula" style="background: rgba(79, 209, 197, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <span>VO</span><sub>2max</sub> <span class="op">=</span> <span>Q</span> <span class="op">×</span> <span>(a-v)O</span><sub>2</sub>
                    </div>

                    <p>In this equation:</p>
                    <ul style="list-style-type: disc; padding-left: 20px; color: #a9b3d9;">
                        <li><strong>Q (Cardiac Output):</strong> The amount of blood the heart pumps in one minute. <br><em>Formula: Stroke Volume (SV) × Heart Rate (HR)</em>. Can reach up to 35-40 L/min in elite athletes.</li>
                        <li><strong>(a-v)O<sub>2</sub> Difference:</strong> The difference in oxygen content between arterial and venous blood. This indicates the extraction capacity of the muscles.</li>
                    </ul>

                    <blockquote>
                        "VO2max defines the size of the engine, but Running Economy and Lactate Threshold determine how fast you can go with that engine." — Dr. Stephen Seiler
                    </blockquote>

                    <h3>Genetics and Training Adaptations</h3>
                    <p>The famous <em>HERITAGE Family Study</em> by Bouchard et al. (1999) demonstrated that the training response (trainability) of VO<sub>2max</sub> is approximately 47% heritable. This means even if your baseline is low, if you have "high responder" genetics, you could increase this value by 40-50% with regular training.</p>
                `
            }, 
            "references": [
                "Bassett, D. R., & Howley, E. T. (2000). Limiting factors for maximum oxygen uptake and determinants of endurance performance. Medicine and Science in Sports and Exercise.",
                "Lundby, C., Montero, D., & Joyner, M. J. (2017). Biology of cardiovascular endurance capacity. Physiological Reviews.",
                "Bouchard, C., et al. (1999). Familial aggregation of VO2max response to exercise training: results from the HERITAGE Family Study."
            ] 
        },
        { 
            "id": 102, 
            "date": "2024-11-10", 
            "readTime": { "tr": "12 dk", "en": "12 min" }, 
            "category": { "tr": "Beslenme", "en": "Nutrition" }, 
            "title": { "tr": "Kafein ve Nöromüsküler Performans: Moleküler Bakış", "en": "Caffeine & Neuromuscular Performance: A Molecular View" }, 
            "summary": { 
                "tr": "Adenozin reseptör blokajı, kalsiyum salınımı ve CYP1A2 polimorfizmleri. Kafein sadece 'uyanık tutmak'la kalmaz, kas kasılma gücünü nasıl değiştirir?", 
                "en": "Adenosine receptor blockade, calcium release, and CYP1A2 polymorphisms. How does caffeine alter muscle contraction power beyond just 'keeping you awake'?" 
            }, 
            "content": { 
                "tr": `
                    <p>Kafein (1,3,7-trimetilksantin), dünyada en yaygın kullanılan psikoaktif maddedir ve dayanıklılık sporlarında performansı %2-4 oranında artırdığı kanıtlanmıştır. Ancak etkisi, sadece "uyarıcı" olmasından çok daha karmaşık biyokimyasal süreçlere dayanır.</p>
                    
                    <h3>Etki Mekanizmaları</h3>
                    <p>Kafeinin ergojenik etkisi üç ana mekanizma üzerinden gerçekleşir:</p>
                    <ol style="list-style-type: decimal; padding-left: 20px; color: #e7ecff;">
                        <li><strong>Adenozin Antagonizmi:</strong> Kafein molekülü, yapısal olarak <em>adenozin</em>e benzer. Beyindeki A1 ve A2a reseptörlerine bağlanarak adenozini bloke eder. Normalde adenozin biriktiğinde yorgunluk ve uyku hali yaratır; kafein bunu engelleyerek dopamin ve nörotransmitter salınımını artırır, Algılanan Zorluk Derecesini (RPE) düşürür.</li>
                        <li><strong>Kalsiyum (Ca<sup>2+</sup>) Mobilizasyonu:</strong> Kafein, sarkoplazmik retikulumdan kalsiyum salınımını artırır. Bu, aktin-miyozin çapraz köprü döngüsünü güçlendirerek kas kasılma kuvvetini artırabilir (özellikle yorgunluk durumunda).</li>
                        <li><strong>Na<sup>+</sup>/K<sup>+</sup> Pompası Aktivitesi:</strong> Hücre dışı potasyum birikimini azaltarak kas yorgunluğunu geciktirir.</li>
                    </ol>

                    <h3>Dozaj ve "U-Şekilli" Etki Eğrisi</h3>
                    <p>Araştırmalar, kafein dozajı ile performans arasında doğrusal olmayan bir ilişki olduğunu göstermektedir. Optimal bölge <strong>3 - 6 mg/kg</strong> aralığıdır.</p>
                    <ul>
                        <li><strong>Düşük Doz (< 3 mg/kg):</strong> Bilişsel fayda sağlar ancak fizyolojik etki sınırlıdır.</li>
                        <li><strong>Optimal Doz (3-6 mg/kg):</strong> Maksimum performans artışı, minimum yan etki.</li>
                        <li><strong>Yüksek Doz (> 9 mg/kg):</strong> Performans artışı durur; titreme, anksiyete ve taşikardi gibi yan etkiler performansı <em>düşürür</em>.</li>
                    </ul>

                    <h3>Genetik Faktör: CYP1A2 Enzimi</h3>
                    <p>Kafeinin karaciğerde parçalanma hızı, CYP1A2 genindeki bir polimorfizme (rs762551) bağlıdır. Sporcular genetik olarak üç gruba ayrılır:</p>
                    <div style="background: #1e293b; padding: 15px; border-left: 4px solid var(--primary-rgb); margin: 15px 0;">
                        <strong>AA Genotipi (Hızlı Metabolizörler):</strong> Kafeini hızla paraksantine dönüştürürler. En yüksek performans artışını bu grup sağlar.<br><br>
                        <strong>AC/CC Genotipi (Yavaş Metabolizörler):</strong> Kafein kanlarında uzun süre kalır. Bu grupta kafein, damar daralmasına (vazokonstriksiyon) yol açarak performansı <em>negatif</em> etkileyebilir.
                    </div>
                `,
                "en": `
                    <p>Caffeine (1,3,7-trimethylxanthine) is the most widely consumed psychoactive substance globally and is proven to enhance endurance performance by 2-4%. However, its effect relies on biochemical processes far more complex than simply being a "stimulant."</p>
                    
                    <h3>Mechanisms of Action</h3>
                    <p>The ergogenic effect of caffeine occurs through three main mechanisms:</p>
                    <ol style="list-style-type: decimal; padding-left: 20px; color: #e7ecff;">
                        <li><strong>Adenosine Antagonism:</strong> The caffeine molecule is structurally similar to <em>adenosine</em>. It binds to A1 and A2a receptors in the brain, blocking adenosine. Normally, adenosine accumulation causes fatigue; caffeine prevents this, increasing dopamine release and lowering the Rate of Perceived Exertion (RPE).</li>
                        <li><strong>Calcium (Ca<sup>2+</sup>) Mobilization:</strong> Caffeine enhances calcium release from the sarcoplasmic reticulum. This can potentiate actin-myosin cross-bridge cycling, increasing muscle contraction force.</li>
                    </ol>
                ` 
            }, 
            "references": [
                "Guest, N., et al. (2018). Caffeine, CYP1A2 Genotype, and Endurance Performance in Athletes: A Systematic Review and Meta-Analysis.",
                "Pickering, C., & Kiely, J. (2018). Are the Current Guidelines on Caffeine Use in Sport Optimal for Everyone? Inter-individual Variation in Caffeine Ergogenicity."
            ] 
        },
        { 
            "id": 103, 
            "date": "2024-11-05", 
            "readTime": { "tr": "18 dk", "en": "18 min" }, 
            "category": { "tr": "Antrenman Bilimi", "en": "Training Science" }, 
            "title": { "tr": "Laktat Eşiği Fizyolojisi: Metabolik Esneklik", "en": "Lactate Threshold Physiology: Metabolic Flexibility" }, 
            "summary": { 
                "tr": "Laktat bir düşman mı yoksa yakıt mı? LT1 ve LT2 eşiklerini yukarı taşımak için mitokondriyal biyogenez ve monokarboksilat taşıyıcıların (MCT) rolü.", 
                "en": "Is lactate an enemy or a fuel? The role of mitochondrial biogenesis and monocarboxylate transporters (MCT) in raising LT1 and LT2." 
            }, 
            "content": { 
                "tr": `
                    <p>Geçmişte "yorgunluk asidi" olarak bilinen laktat, günümüzde modern spor fizyolojisinin en önemli biyo-belirteçlerinden biri ve hayati bir enerji kaynağı olarak kabul edilmektedir. George Brooks'un "Laktat Mekik Teorisi" (Lactate Shuttle Theory), laktatın tip II (hızlı kasılan) liflerde üretilip, tip I (yavaş kasılan) liflere veya kalbe taşınarak okside edildiğini kanıtlamıştır.</p>
                    
                    <h3>İki Eşik Modeli: LT1 ve LT2</h3>
                    <p>Dayanıklılık performansını belirleyen asıl faktör, laktat üretiminden ziyade, laktatın temizlenme (clearance) hızıdır. Antrenman yoğunluğuna göre iki fizyolojik kırılma noktası vardır:</p>
                    
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <strong style="color:rgb(var(--primary-rgb)); font-size: 1.1em;">LT1 (Aerobik Eşik):</strong><br>
                            Kan laktatının dinlenik seviyenin (yaklaşık 1.0 - 1.5 mmol/L) üzerine çıkmaya başladığı ilk noktadır. Genellikle maraton temposuna veya Zone 2'nin üst sınırına denk gelir. Bu noktada yağ oksidasyonu maksimuma yakındır (FatMax).
                        </li>
                        <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <strong style="color:rgb(var(--primary-rgb)); font-size: 1.1em;">LT2 (Anaerobik Eşik / MLSS):</strong><br>
                            Laktat üretim hızının, vücudun temizleme hızına eşit olduğu son noktadır (Maksimum Laktat Kararlı Durumu). Genellikle 4.0 mmol/L civarındadır ancak kişiye göre değişir. Bu noktanın üzerinde metabolik asidoz (H<sup>+</sup> iyonları) hızla artar ve yorgunluk kaçınılmaz olur.
                        </li>
                    </ul>

                    <h3>Geliştirme Stratejileri</h3>
                    <p>Bu iki eşiği sağa (daha yüksek hıza/güce) kaydırmak için hücresel düzeyde iki adaptasyon gereklidir:</p>
                    
                    <h4>1. Mitokondriyal Biyogenez (LT1 için)</h4>
                    <p>Yüksek hacimli, düşük yoğunluklu antrenmanlar (Zone 2), PGC-1α genini aktive ederek mitokondri sayısını artırır. Mitokondri ne kadar fazlaysa, pirüvat o kadar verimli işlenir ve laktata dönüşmeden enerjiye çevrilir.</p>
                    
                    <h4>2. MCT Taşıyıcı Yoğunluğu (LT2 için)</h4>
                    <p>Laktatın hücre dışına atılması ve başka hücrelere taşınması <strong>MCT1</strong> ve <strong>MCT4</strong> proteinleri ile olur. "Threshold" (eşik) antrenmanları ve yüksek yoğunluklu interval çalışmaları (HIIT), bu taşıyıcı proteinlerin yoğunluğunu artırarak laktatın kandan temizlenme hızını (clearance rate) iyileştirir.</p>
                `,
                "en": `
                    <p>Once known as "fatigue acid," lactate is now recognized as a vital fuel source and a key biomarker in modern sports physiology. George Brooks' "Lactate Shuttle Theory" proved that lactate produced in Type II fibers is transported to Type I fibers or the heart to be oxidized.</p>
                    
                    <h3>The Two-Threshold Model: LT1 and LT2</h3>
                    <p>The decisive factor in endurance performance is not lactate production, but clearance rate.</p>
                    
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <strong style="color:rgb(var(--primary-rgb)); font-size: 1.1em;">LT1 (Aerobic Threshold):</strong><br>
                            The point where blood lactate begins to rise above resting levels (~1.5 mmol/L). Corresponds to Marathon pace or upper Zone 2.
                        </li>
                        <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <strong style="color:rgb(var(--primary-rgb)); font-size: 1.1em;">LT2 (Anaerobic Threshold / MLSS):</strong><br>
                            Maximum Lactate Steady State. The limit where production equals clearance (~4.0 mmol/L). Above this, acidosis spikes.
                        </li>
                    </ul>
                ` 
            }, 
            "references": [
                "Brooks, G. A. (2018). The Science and Translation of Lactate Shuttle Theory. Cell Metabolism.",
                "San-Millán, I., & Brooks, G. A. (2018). Assessment of Metabolic Flexibility in Elite Athletes. Sports Medicine.",
                "Seiler, S. (2010). What is best practice for training intensity and duration distribution in endurance athletes?"
            ] 
        },
        { 
            "id": 104, 
            "date": "2024-10-30", 
            "readTime": { "tr": "14 dk", "en": "14 min" }, 
            "category": { "tr": "Koşu Mekaniği", "en": "Running Mechanics" }, 
            "title": { "tr": "Koşu Ekonomisi: Yay-Kütle Modeli ve Enerji Maliyeti", "en": "Running Economy: Spring-Mass Model & Energy Cost" }, 
            "summary": { 
                "tr": "Aynı VO2max değerine sahip iki koşucu neden farklı hızlarda koşar? Koşu ekonomisini (RE) belirleyen biyomekanik faktörler ve hesaplama formülü.", 
                "en": "Why do two runners with the same VO2max run at different speeds? Biomechanical factors determining Running Economy (RE) and calculation formula." 
            }, 
            "content": { 
                "tr": `
                    <p>Koşu Ekonomisi (RE), belirli bir hızda koşmak için gereken oksijen maliyetidir (enerji harcaması). Otomobillerdeki "yakıt tasarrufu" gibidir. Elit koşucular, amatörlere göre aynı hızda %20-30 daha az enerji harcarlar. Bu, VO<sub>2max</sub> değeri daha düşük olan bir atletin, daha ekonomik koşarak daha yüksek VO<sub>2max</sub>'a sahip bir rakibi geçebileceği anlamına gelir.</p>
                    
                    <h3>RE'nin Hesaplanması</h3>
                    <p>Koşu ekonomisi genellikle kg başına bir kilometrede tüketilen oksijen miktarı ile ifade edilir:</p>
                    
                    <div class="latex-formula" style="background: rgba(79, 209, 197, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <span>RE</span> <span class="op">=</span> 
                        <div class="fraction">
                            <span class="numerator">VO<sub>2</sub> (ml/kg/dk)</span>
                            <span class="denominator">Hız (m/dk)</span>
                        </div>
                    </div>

                    <h3>Biyomekanik ve "Yay-Kütle" Modeli</h3>
                    <p>İnsan bacağı koşu sırasında bir yay (spring) gibi davranır. Yerle temas anında tendonlar elastik enerji depolar ve itiş (push-off) fazında bu enerjiyi geri verir. Bu "bedava" enerjidir.</p>
                    <ul>
                        <li><strong>Dikey Salınım (Vertical Oscillation):</strong> Çok fazla zıplamak enerjiyi dikey düzlemde boşa harcar. Elitlerde bu değer 6-8 cm arasındadır.</li>
                        <li><strong>Yerle Temas Süresi (GCT):</strong> Ayak yerde ne kadar az kalırsa, elastik enerji kaybı o kadar az olur. Elit sprinterlerde <100ms, maratoncularda <200ms hedeflenir.</li>
                        <li><strong>Bacak Sertliği (Leg Stiffness):</strong> Tendonların sertliği ne kadar yüksekse, enerji geri dönüşümü o kadar verimli olur.</li>
                    </ul>

                    <h3>RE Nasıl Geliştirilir?</h3>
                    <p>Sadece koşmak ekonomiyi yıllar içinde geliştirir, ancak süreci hızlandırmanın yolları vardır:</p>
                    <ol>
                        <li><strong>Ağır Kuvvet Antrenmanı:</strong> (1-5 tekrar, %85+ 1RM). Kas hipertrofisine yol açmadan nöromüsküler verimliliği artırır.</li>
                        <li><strong>Plyometrikler:</strong> (Kutu zıplamaları, ip atlama). Tendon sertliğini (stiffness) artırarak "yay" etkisini güçlendirir.</li>
                        <li><strong>Karbon Plakalı Ayakkabılar:</strong> Araştırmalar, metatarsofalangeal eklemin bükülmesini engelleyerek ve köpük enerjisiyle ekonomiyi %2-4 oranında artırdığını göstermektedir.</li>
                    </ol>
                `,
                "en": `
                    <p>Running Economy (RE) represents the oxygen cost (energy expenditure) required to run at a given submaximal speed. It is analogous to fuel economy in cars. Elite runners expend 20-30% less energy than amateurs at the same speed.</p>
                    
                    <h3>Calculation of RE</h3>
                    <p>RE is typically expressed as the volume of oxygen consumed per kilogram per kilometer:</p>
                    
                    <div class="latex-formula" style="background: rgba(79, 209, 197, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <span>RE</span> <span class="op">=</span> 
                        <div class="fraction">
                            <span class="numerator">VO<sub>2</sub> (ml/kg/min)</span>
                            <span class="denominator">Speed (m/min)</span>
                        </div>
                    </div>

                    <h3>Biomechanics and the "Spring-Mass" Model</h3>
                    <p>The human leg acts like a spring during running. Tendons store elastic energy upon impact and return it during the push-off phase. This is essentially "free" energy.</p>
                    <ul>
                        <li><strong>Vertical Oscillation:</strong> Bouncing too high wastes energy vertically. Elite values are typically 6-8 cm.</li>
                        <li><strong>Ground Contact Time (GCT):</strong> Shorter contact time minimizes energy dissipation.</li>
                    </ul>
                ` 
            }, 
            "references": [
                "Barnes, K. R., & Kilding, A. E. (2015). Strategies to improve running economy. Sports Medicine.",
                "Hoogkamer, W., et al. (2018). A comparison of the energetic cost of running in marathon racing shoes. Sports Medicine."
            ] 
        }
    ],
    facts: [
        { 
            "tag": "#Fizyoloji", 
            "text": { 
                "tr": "Laktat asidoza neden olmaz; tam tersine, asidozu önlemeye çalışan bir tamponlama sürecinin yan ürünüdür. Asıl suçlu ATP hidrolizi sonucu açığa çıkan H+ iyonlarıdır.", 
                "en": "Lactate does not cause acidosis; rather, it is a byproduct of a buffering process attempting to prevent it. The real culprit is H+ ions released from ATP hydrolysis." 
            } 
        },
        { 
            "tag": "#Beslenme", 
            "text": { 
                "tr": "Pancar suyu (nitrat), kan damarlarını genişleterek oksijen maliyetini düşürebilir ve özellikle yüksek irtifada performansı artırabilir.", 
                "en": "Beetroot juice (nitrate) can vasodilate blood vessels, reducing oxygen cost and improving performance, especially at high altitudes." 
            } 
        },
        { 
            "tag": "#Mekanik", 
            "text": { 
                "tr": "Ayakkabı ağırlığındaki her 100 gramlık artış, maraton süresini ortalama 3-4 dakika yavaşlatır.", 
                "en": "Every 100-gram increase in shoe weight slows down marathon time by an average of 3-4 minutes." 
            } 
        },
        { 
            "tag": "#Antrenman", 
            "text": { 
                "tr": "Polarize antrenman modeli (80/20 kuralı), hem elit hem de amatör sporcularda VO2max artışı için en verimli yöntem olarak kanıtlanmıştır.", 
                "en": "The polarized training model (80/20 rule) has been proven as the most efficient method for VO2max improvement in both elite and amateur athletes." 
            } 
        }
    ]
};
