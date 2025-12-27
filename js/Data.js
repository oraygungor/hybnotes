// Bu dosya, uygulamanın veri kaynağıdır.
// Bilimsel veriler, formüller ve akademik referanslar içerir.

window.HybNotesData = {
    posts: [
        // --- YENİ EKLENEN SHOWCASE MAKALESİ (ID: 999) ---
        {
            "id": 999,
            "date": "2024-01-01",
            "readTime": { "tr": "5 dk", "en": "5 min" },
            "category": { "tr": "Sistem Kılavuzu", "en": "System Guide" },
            "title": { "tr": "HybNotes Tipografi ve LaTeX Kılavuzu: Neler Yapabiliriz?", "en": "HybNotes Typography & LaTeX Guide: What Can We Do?" },
            "summary": { 
                "tr": "Bu makale, uygulamanın desteklediği tüm matematiksel formatları, metin stillerini ve görsel düzenleri test etmek için oluşturulmuştur.", 
                "en": "This article is created to test all mathematical formats, text styles, and visual layouts supported by the application." 
            }, 
            "content": { 
                "tr": `
                    <p>Bu yazı, <strong>HybNotes</strong> altyapısının desteklediği tüm içerik türlerini sergilemektedir. KaTeX entegrasyonu sayesinde artık akademik düzeyde formülleri doğrudan render edebiliyoruz.</p>
                    
                    <h3>1. Matematiksel Formüller</h3>
                    <p>Satır içi formüller metnin akışını bozmadan (örneğin $E=mc^2$ gibi) kullanılabilir. Blok formüller ise ortalanmış ve büyük görünür:</p>
                    
                    <h4>Temel Cebir ve Kesirler</h4>
                    $$ x = \frac{-b \pm \sqrt{b^2-4ac}}{2a} $$

                    <h4>İntegral ve Limitler</h4>
                    $$ \int_{a}^{b} f(x)dx = F(b) - F(a) $$
                    
                    $$ \lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e $$

                    <h3>2. Matrisler ve Diziler</h3>
                    <p>Karmaşık veri setleri veya vektörler için matris kullanımı:</p>
                    $$ 
                    A = \begin{pmatrix} 
                    a & b \\ 
                    c & d 
                    \end{pmatrix} 
                    \times 
                    \begin{pmatrix} 
                    x \\ 
                    y 
                    \end{pmatrix}
                    $$

                    <h3>3. Kimyasal Denklemler ve Reaksiyonlar</h3>
                    <p>Spor fizyolojisindeki metabolik süreçleri anlatmak için kimyasal oklar ve bileşikler:</p>
                    $$ C_6H_{12}O_6 + 6O_2 \rightarrow 6CO_2 + 6H_2O + Enerji $$

                    <h3>4. Tipografik Elementler</h3>
                    <p>Metin içi vurgular ve listeler:</p>
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><strong>Kalın Metin:</strong> Önemli kavramlar için.</li>
                        <li><em>İtalik Metin:</em> Vurgular ve yabancı terimler için.</li>
                        <li><u>Altı Çizili:</u> Dikkat çekmek için.</li>
                    </ul>

                    <blockquote>
                        "Bu bir blok alıntı (blockquote) örneğidir. Önemli sözler veya vurgulanması gereken paragraflar bu şekilde, sol tarafı çizgili ve hafif farklı bir arka planla gösterilir."
                    </blockquote>

                    <h3>5. Karmaşık Fonksiyonlar (Örnek: Kardiyovasküler)</h3>
                    <p>Hem metin hem matematiği birleştiren karmaşık durumlar:</p>
                    $$ 
                    \text{Stroke Volume} = \frac{\text{EDV} - \text{ESV}}{\text{Body Surface Area}} 
                    $$
                `,
                "en": `
                    <p>This post showcases all content types supported by the <strong>HybNotes</strong> infrastructure. Thanks to KaTeX integration, we can now render academic-level formulas directly.</p>
                    
                    <h3>1. Mathematical Formulas</h3>
                    <p>Inline formulas can be used without breaking the text flow (like $E=mc^2$). Block formulas appear centered and large:</p>
                    
                    <h4>Basic Algebra and Fractions</h4>
                    $$ x = \frac{-b \pm \sqrt{b^2-4ac}}{2a} $$

                    <h4>Integrals and Limits</h4>
                    $$ \int_{a}^{b} f(x)dx = F(b) - F(a) $$
                    
                    $$ \lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e $$

                    <h3>2. Matrices and Arrays</h3>
                    <p>Using matrices for complex datasets or vectors:</p>
                    $$ 
                    A = \begin{pmatrix} 
                    a & b \\ 
                    c & d 
                    \end{pmatrix} 
                    \times 
                    \begin{pmatrix} 
                    x \\ 
                    y 
                    \end{pmatrix}
                    $$
                `
            }, 
            "references": [
                "HybNotes Technical Documentation v2.0",
                "KaTeX Supported Functions List"
            ] 
        },
        
        // --- GÜNCELLENMİŞ MEVCUT MAKALELER ---
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
                    <p>Dayanıklılık sporlarında performansın "altın standardı" olarak kabul edilen <strong>VO<sub>2max</sub></strong>, bir sporcunun deniz seviyesinde, maksimum efor sırasında kullanabildiği en yüksek oksijen hacmini ifade eder.</p>
                    
                    <h3>Fick Prensibi ve Matematiksel Model</h3>
                    <p>Adolf Fick tarafından 1870'de geliştirilen prensip, VO<sub>2max</sub>'ı belirleyen fizyolojik bileşenleri şu temel denklemle açıklar:</p>
                    
                    $$ VO_{2max} = Q \times (a-v)O_2 $$

                    <p>Bu denklemde:</p>
                    <ul style="list-style-type: disc; padding-left: 20px; color: #a9b3d9;">
                        <li><strong>Q (Kardiyak Çıktı):</strong> Kalbin bir dakikada pompaladığı kan miktarıdır. Formülü şöyledir: $$ Q = SV \times HR $$ (Atım Hacmi × Kalp Atım Hızı). Elit sporcularda 35-40 L/dk'ya kadar çıkabilir.</li>
                        <li><strong>(a-v)O<sub>2</sub> Farkı:</strong> Arteriyel (temiz) ve venöz (kirli) kan arasındaki oksijen farkıdır.</li>
                    </ul>

                    <blockquote>
                        "VO2max motorun hacmini belirler, ancak o motorla ne kadar hızlı gidebileceğinizi Koşu Ekonomisi ve Laktat Eşiği belirler." — Dr. Stephen Seiler
                    </blockquote>

                    <h3>Genetik ve Antrenman</h3>
                    <p>Eğer "high responder" bir genetiğe sahipseniz, düzenli antrenmanla VO2max değerinizi şu oranda artırabilirsiniz:</p>
                    $$ \Delta VO_{2max} \approx \%40 - \%50 $$
                `,
                "en": `
                    <p>Considered the "gold standard" of performance in endurance sports, <strong>VO<sub>2max</sub></strong> refers to the maximum volume of oxygen an athlete can utilize during maximal effort at sea level.</p>
                    
                    <h3>The Fick Principle</h3>
                    <p>Adolf Fick's principle describes the components determining VO<sub>2max</sub>:</p>
                    
                    $$ VO_{2max} = Q \times (a-v)O_2 $$

                    <p>In this equation:</p>
                    <ul style="list-style-type: disc; padding-left: 20px; color: #a9b3d9;">
                        <li><strong>Q (Cardiac Output):</strong> $$ Q = SV \times HR $$ Can reach up to 35-40 L/min in elite athletes.</li>
                        <li><strong>(a-v)O<sub>2</sub> Difference:</strong> The difference in oxygen content between arterial and venous blood.</li>
                    </ul>
                `
            }, 
            "references": [
                "Bassett, D. R., & Howley, E. T. (2000). Medicine and Science in Sports and Exercise.",
                "Lundby, C., et al. (2017). Physiological Reviews."
            ] 
        },


 
        
        

  {
    "id": 8382,
    "date": "2025-12-27",
    "readTime": {
      "tr": "3 dk",
      "en": "3 min"
    },
    "category": {
      "tr": "Fizyoloji",
      "en": "Physiology"
    },
    "title": {
      "tr": "Koşunun Denkleminde 4. Değişken: Fizyolojik Direnç (Resilience)",
      "en": "Example Title EN"
    },
    "summary": {
      "tr": "Yarışın sonu gerçek sınavdır: kritik güç/hız düşüşüne direnebilen kazanır: fizyolojik direnç.",
      "en": "English summary..."
    },
    "content": {
      "tr": "<p><span style='background-color: rgba(0, 0, 0, 0);'>Bir maratoncunun potansiyelini tahmin etmek için elimizde yıllardır güvenilen, 3 temel değişkene dayalı 'Klasik Model' vardı. Ancak bilim insanları, bu modelin kağıt üzerindeki tahminlerinin, yorgunluk faktörü devreye girdiğinde gerçek yarış sonuçlarıyla her zaman örtüşmediğini fark etti.</span></p><p><span style='background-color: rgba(0, 0, 0, 0);'>Prof. Andrew M. Jones’un ses getiren makalesi, 30 yıllık bu kavramsal çerçeveyi güncelliyor ve modele </span><strong style='background-color: rgba(0, 0, 0, 0);'>'Fizyolojik Direnç' (Resilience)</strong><span style='background-color: rgba(0, 0, 0, 0);'> adında, bağımsız bir aday değişken eklenmesini öneriyor.</span></p><p>İşte Jones'un önerdiği güncel modelin detayları ve bilimsel arka planı:</p><h2><strong>Klasik Model (1991): Performansın 3 Ayağı</strong></h2><p><span style='background-color: rgba(0, 0, 0, 0);'>Hikaye, Dr. Michael Joyner'ın 1991 yılında yayınladığı ve bugün hala referans alınan modelle başlıyor. Joyner, dayanıklılık performansını şu 3 fizyolojik sütun üzerine kurmuştu:</span></p><ol><li><strong style='background-color: rgba(0, 0, 0, 0);'>Motorun Hacmi ($\\dot{V}_{O_{2}max}$):</strong> Sporcunun maksimal oksijen kapasitesi.</li><li><strong style='background-color: rgba(0, 0, 0, 0);'>Yakıt Verimliliği (Koşu Ekonomisi):</strong> Belirli bir hızda harcanan enerji miktarı.</li><li><strong style='background-color: rgba(0, 0, 0, 0);'>Sürdürülebilir Eşik (Laktat Eşiği/Kritik Hız):</strong> Motoru boğmadan çıkılabilen maksimum devir.</li></ol><p><span style='background-color: rgba(0, 0, 0, 0);'>Ancak bu model, değişkenleri büyük ölçüde </span><strong style='background-color: rgba(0, 0, 0, 0);'>statik</strong><span style='background-color: rgba(0, 0, 0, 0);'> kabul ediyordu; yani start çizgisindeki fizyolojik değerlerin yarış boyunca sabit kaldığı varsayılıyordu.</span></p><h2><strong>Eksik Parça: 'Yorgunlukla Aşınma'</strong></h2><p><span style='background-color: rgba(0, 0, 0, 0);'>Andrew Jones, bu değişkenlerin sabit olmadığını ve yorgunlukla birlikte bozulduğunu vurguluyor.</span></p><ul><li><strong style='background-color: rgba(0, 0, 0, 0);'>Kritik Güç Kaybı:</strong><span style='background-color: rgba(0, 0, 0, 0);'> Bisikletçiler üzerinde yapılan kontrollü çalışmalarda, 2 saatlik ağır bir egzersizden sonra sporcuların </span><strong style='background-color: rgba(0, 0, 0, 0);'>Kritik Güç (CP)</strong><span style='background-color: rgba(0, 0, 0, 0);'> değerlerinde ortalama </span><strong style='background-color: rgba(0, 0, 0, 0);'>~%10</strong><span style='background-color: rgba(0, 0, 0, 0);'> oranında bir düşüş saptanmıştır.</span></li><li><strong style='background-color: rgba(0, 0, 0, 0);'>Koşuya Yansıması:</strong><span style='background-color: rgba(0, 0, 0, 0);'> Jones, benzer bir mekanizmanın koşuda da geçerli olduğunu savunarak; yarış ilerledikçe koşu ekonomisinin ve kritik hızın (CS) bozulabileceğini, ancak klasik testlerin (sporcu dinlenikken yapıldığı için) bu kaybı göremediğini belirtmektedir.</span></li></ul><h2><strong>Yeni Aday Değişken: 'Fizyolojik Direnç'</strong></h2><p><span style='background-color: rgba(0, 0, 0, 0);'>Jones, performans modeline </span><strong style='background-color: rgba(0, 0, 0, 0);'>'Direnç'</strong><span style='background-color: rgba(0, 0, 0, 0);'> (Resilience) kavramının eklenmesini öneriyor. Bu, fizyolojik parametrelerin zamanla bozulmasına karşı koyabilme kapasitesidir.</span></p><ul><li><strong style='background-color: rgba(0, 0, 0, 0);'>Neden Önemli?</strong><span style='background-color: rgba(0, 0, 0, 0);'> Araştırmalarda, yorgunluk sonrası performans parametrelerindeki düşüşün bireyler arasında </span><strong style='background-color: rgba(0, 0, 0, 0);'>%1</strong><span style='background-color: rgba(0, 0, 0, 0);'> ile </span><strong style='background-color: rgba(0, 0, 0, 0);'>%32</strong><span style='background-color: rgba(0, 0, 0, 0);'> gibi çok geniş bir aralıkta değiştiği görülmüştür.</span></li><li><strong style='background-color: rgba(0, 0, 0, 0);'>Bağımsızlık İddiası:</strong><span style='background-color: rgba(0, 0, 0, 0);'> Mevcut verilerde, yorgunlukla ortaya çıkan bu performans düşüşünün büyüklüğü, sporcunun başlangıçtaki $\\dot{V}_{O_{2}max}$ veya Eşik değerleriyle zayıf ilişkili görünmektedir. Yani iki sporcunun başlangıç değerleri aynı olsa bile, biri 'dayanıklılık kaybına' daha dirençli olduğu için yarışı kazanabilir.</span></li></ul><h2><strong>Direnci Destekleyen Faktörler</strong></h2><p>Makale, bu direnç kapasitesini korumak için bazı kritik stratejilere işaret ediyor:</p><ul><li><strong style='background-color: rgba(0, 0, 0, 0);'>Yakıt Stratejisi:</strong><span style='background-color: rgba(0, 0, 0, 0);'> Çalışmalar, egzersiz sırasında saatte </span><strong style='background-color: rgba(0, 0, 0, 0);'>60g karbonhidrat</strong><span style='background-color: rgba(0, 0, 0, 0);'> alımının Kritik Güç (CP) düşüşünü, plaseboya kıyasla önemli ölçüde hafiflettiğini </span><strong style='background-color: rgba(0, 0, 0, 0);'>göstermiştir.</strong><span style='background-color: rgba(0, 0, 0, 0);'> (Not: Güncel literatürde bazı durumlarda bu miktar 90-120g/saat seviyelerine kadar çıkabilmektedir).</span></li><li><strong style='background-color: rgba(0, 0, 0, 0);'>Antrenman Geçmişi:</strong><span style='background-color: rgba(0, 0, 0, 0);'> Profesyonel bisikletçilerin, gençlere (U23) kıyasla yorgunluk altında güçlerini çok daha iyi korudukları gözlemlenmiştir; bu da direncin uzun yıllara dayanan antrenman birikimiyle geliştiğini düşündürmektedir.</span></li><li><strong style='background-color: rgba(0, 0, 0, 0);'>Ekipman:</strong><span style='background-color: rgba(0, 0, 0, 0);'> Yeni nesil ayakkabılar, kas hasarını azaltarak yorgunluğa bağlı ekonomi kaybını </span><strong style='background-color: rgba(0, 0, 0, 0);'>muhtemelen</strong><span style='background-color: rgba(0, 0, 0, 0);'> hafifletebilir.</span></li></ul><h2><strong>Sonuç: Model Güncelleniyor</strong></h2><p><span style='background-color: rgba(0, 0, 0, 0);'>Eskiden performans tahmini; büyük ölçüde </span><strong style='background-color: rgba(0, 0, 0, 0);'>Kapasite</strong><span style='background-color: rgba(0, 0, 0, 0);'> (VO2max) ve </span><strong style='background-color: rgba(0, 0, 0, 0);'>Verim</strong><span style='background-color: rgba(0, 0, 0, 0);'> (Ekonomi) üzerine kuruluydu.</span></p><p><span style='background-color: rgba(0, 0, 0, 0);'>Bugün Andrew Jones'un önerdiği genişletilmiş çerçeve, finişe geliş süresini belirleyen etkenin sadece 'taze' haldeki değerler değil, bu değerlerin </span><strong style='background-color: rgba(0, 0, 0, 0);'>yorgunluk altında ne kadar korunduğu</strong><span style='background-color: rgba(0, 0, 0, 0);'> (Direnç) olduğunu savunuyor. Elit atletler, fizyolojik parametreleri yarışın sonuna kadar 'sağlam kaldığı' için fark yaratıyor olabilir.</span></p>",
      "en": "<p>Content...</p><div class='math-box'>$$ E = mc^2 $$</div>"
    },
    "references": []
  }

,

        
        {
            "id": 105,
            "date": "2025-12-27",
            "readTime": { "tr": "6 dk", "en": "6 min" },
            "category": { "tr": "Spor Fizyolojisi", "en": "Exercise Physiology" },
            "title": { "tr": "Koşunun Yeni Denkleminde 4. Değişken: Fizyolojik Direnç (Resilience)", "en": "The 4th Variable in the New Equation of Running: Physiological Resilience" },
            "summary": {
                "tr": "Prof. Andrew M. Jones'un çığır açan çalışması, 30 yıllık klasik dayanıklılık modelini güncelliyor.",
                "en": "Prof. Andrew M. Jones's groundbreaking work updates the 30-year-old classical endurance model."
            },
            "content": {
                "tr": `
                    <p>Klasik model yorgunluk faktörünü göz ardı etmekteydi. Prof. Andrew M. Jones, modele <strong>'Fizyolojik Direnç'</strong> değişkenini ekledi.</p>
                    
                    <h3>Direnç ve Güç Kaybı</h3>
                    <p>Yorgunlukla birlikte Kritik Güç (CP) değerindeki düşüş şu şekilde modellenebilir:</p>
                    
                    $$ CP(t) = CP_{başlangıç} \cdot e^{-kt} $$
                    
                    <p>Burada $k$, sporcunun yorgunluk katsayısıdır (direnç). Yapılan çalışmalarda 2 saat sonunda ortalama düşüş:</p>
                    
                    $$ \Delta CP \approx \%10 $$
                    
                    <p>Bu veriler, iki sporcunun başlangıç değerleri aynı olsa bile ($VO_{2max}^A = VO_{2max}^B$), direnç kapasitesi yüksek olanın yarışı kazanacağını gösterir.</p>
                `,
                "en": `
                    <p>The classical model ignored the fatigue factor. Prof. Andrew M. Jones added the <strong>'Physiological Resilience'</strong> variable.</p>
                    
                    <h3>Resilience and Power Loss</h3>
                    <p>The decline in Critical Power (CP) with fatigue can be modeled as:</p>
                    
                    $$ CP(t) = CP_{initial} \cdot e^{-kt} $$
                    
                    <p>Where $k$ is the fatigue coefficient. Studies show an average drop after 2 hours:</p>
                    
                    $$ \Delta CP \approx \%10 $$
                `
            },
            "references": [
                "Jones, A. M. (2023). The Journal of Physiology."
            ]
        },

        { 
            "id": 102, 
            "date": "2024-11-10", 
            "readTime": { "tr": "12 dk", "en": "12 min" }, 
            "category": { "tr": "Beslenme", "en": "Nutrition" }, 
            "title": { "tr": "Kafein ve Nöromüsküler Performans", "en": "Caffeine & Neuromuscular Performance" }, 
            "summary": { 
                "tr": "Kafeinin moleküler etkileri ve adenozin reseptörleri.", 
                "en": "Molecular effects of caffeine and adenosine receptors." 
            }, 
            "content": { 
                "tr": `
                    <p>Kafein ($C_8H_{10}N_4O_2$), dünyada en yaygın kullanılan psikoaktif maddedir.</p>
                    
                    <h3>Etki Mekanizmaları</h3>
                    <p>Kafein, adenozin reseptörlerine bağlanma eğilimindedir. Reseptör bağlanma afinitesi şu denklemle ifade edilebilir:</p>
                    
                    $$ K_d = \frac{[R][L]}{[RL]} $$
                    
                    <ol style="list-style-type: decimal; padding-left: 20px; color: #e7ecff;">
                        <li><strong>Adenozin Antagonizmi:</strong> Beyindeki $A_1$ ve $A_{2a}$ reseptörlerini bloke eder.</li>
                        <li><strong>Kalsiyum ($Ca^{2+}$) Mobilizasyonu:</strong> Sarkoplazmik retikulumdan kalsiyum salınımını artırır.</li>
                    </ol>

                    <h3>Dozaj Eğrisi</h3>
                    <p>Optimal dozaj aralığı:</p>
                    $$ 3 \le \text{Dozaj} \le 6 \text{ mg/kg} $$
                `,
                "en": `
                    <p>Caffeine ($C_8H_{10}N_4O_2$) is the most widely consumed psychoactive substance.</p>
                    
                    <h3>Mechanisms</h3>
                    <p>Receptor binding affinity:</p>
                    $$ K_d = \frac{[R][L]}{[RL]} $$
                    
                    <ol style="list-style-type: decimal; padding-left: 20px; color: #e7ecff;">
                        <li><strong>Adenosine Antagonism:</strong> Blocks $A_1$ and $A_{2a}$ receptors.</li>
                        <li><strong>Calcium ($Ca^{2+}$) Mobilization:</strong> Increases release from SR.</li>
                    </ol>
                ` 
            }, 
            "references": [
                "Guest, N., et al. (2018). Caffeine, CYP1A2 Genotype."
            ] 
        },

        { 
            "id": 103, 
            "date": "2024-11-05", 
            "readTime": { "tr": "18 dk", "en": "18 min" }, 
            "category": { "tr": "Antrenman Bilimi", "en": "Training Science" }, 
            "title": { "tr": "Laktat Eşiği Fizyolojisi", "en": "Lactate Threshold Physiology" }, 
            "summary": { 
                "tr": "Laktat metabolizması ve eşiklerin kimyasal temeli.", 
                "en": "Lactate metabolism and chemical basis of thresholds." 
            }, 
            "content": { 
                "tr": `
                    <p>Laktat bir atık değil, yakıttır. Glikoliz sonucu oluşan Pirüvat, oksijen yokluğunda laktata dönüşür:</p>
                    
                    $$ \text{Pirüvat} + NADH + H^+ \leftrightarrow \text{Laktat} + NAD^+ $$
                    
                    <h3>Eşik Modeli</h3>
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <strong style="color:rgb(var(--primary-rgb)); font-size: 1.1em;">LT1:</strong> Kan laktatı $\approx 1.5 \text{ mmol/L}$
                        </li>
                        <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <strong style="color:rgb(var(--primary-rgb)); font-size: 1.1em;">LT2 (MLSS):</strong> Üretim = Temizleme olduğu nokta. $$ \frac{d[La^-]}{dt} = 0 $$ Genellikle $\approx 4.0 \text{ mmol/L}$ civarındadır.
                        </li>
                    </ul>
                `,
                "en": `
                    <p>Lactate is fuel. Pyruvate converts to lactate:</p>
                    
                    $$ \text{Pyruvate} + NADH + H^+ \leftrightarrow \text{Lactate} + NAD^+ $$
                    
                    <h3>Threshold Model</h3>
                    <ul style="list-style-type: none; padding: 0;">
                        <li><strong>LT1:</strong> Blood lactate $\approx 1.5 \text{ mmol/L}$</li>
                        <li><strong>LT2 (MLSS):</strong> Where Production = Clearance. $$ \frac{d[La^-]}{dt} = 0 $$</li>
                    </ul>
                ` 
            }, 
            "references": [
                "Brooks, G. A. (2018). Cell Metabolism."
            ] 
        },

        { 
            "id": 104, 
            "date": "2024-10-30", 
            "readTime": { "tr": "14 dk", "en": "14 min" }, 
            "category": { "tr": "Koşu Mekaniği", "en": "Running Mechanics" }, 
            "title": { "tr": "Koşu Ekonomisi: Yay-Kütle Modeli", "en": "Running Economy: Spring-Mass Model" }, 
            "summary": { 
                "tr": "Koşu ekonomisi hesaplaması ve biyomekanik formüller.", 
                "en": "Running economy calculation and biomechanical formulas." 
            }, 
            "content": { 
                "tr": `
                    <p>Koşu Ekonomisi (RE), belirli bir hızda tüketilen oksijen miktarıdır.</p>
                    
                    <h3>RE'nin Hesaplanması</h3>
                    <p>Eski karmaşık HTML yapısı yerine artık net bir formül kullanıyoruz:</p>
                    
                    $$ RE = \frac{VO_2 \; (ml/kg/dk)}{v \; (m/dk)} $$

                    <h3>Yay-Kütle Modeli (Spring-Mass)</h3>
                    <p>Bacak bir yay gibi davranır. Hooke kanununa göre yaydaki kuvvet:</p>
                    
                    $$ F_{yay} = k \cdot \Delta x $$
                    
                    <p>Burada $k$ bacak sertliğini (leg stiffness), $\Delta x$ ise sıkışma miktarını gösterir.</p>
                `,
                "en": `
                    <p>Running Economy (RE) is the oxygen cost at a given speed.</p>
                    
                    <h3>Calculation of RE</h3>
                    
                    $$ RE = \frac{VO_2 \; (ml/kg/min)}{v \; (m/min)} $$

                    <h3>Spring-Mass Model</h3>
                    <p>Leg acts like a spring. According to Hooke's Law:</p>
                    
                    $$ F_{spring} = k \cdot \Delta x $$
                ` 
            }, 
            "references": [
                "Barnes, K. R., & Kilding, A. E. (2015). Sports Medicine."
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
