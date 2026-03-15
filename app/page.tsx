import ScrollAnimations from "@/components/ScrollAnimations";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import VisitorCounter from "@/components/VisitorCounter";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <ThemeToggle />
      <div
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, #003d1f 0%, #001a0d 60%, #000 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,108,53,.04) 60px, rgba(0,108,53,.04) 61px),
              repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,108,53,.04) 60px, rgba(0,108,53,.04) 61px)`,
          }}
        />

        <p className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-[.85rem] text-[#c9a84c] animate-[fadeUp_.8s_.2s_forwards] whitespace-nowrap">
          ١١ مارس · يوم العلم السعودي
        </p>

        <VisitorCounter />

        <h1 className="relative z-10 font-['Amiri',serif] text-[clamp(3rem,9vw,7rem)] font-bold leading-[1.1] text-white mt-2 mb-4 animate-[fadeUp_.9s_.4s_forwards]">
          يوم <span className="text-[#1d8544] block">العلم</span>
        </h1>

        <p className="relative z-10 text-[clamp(.95rem,2vw,1.2rem)] font-light text-white/65 max-w-full px-4 py-6 sm:px-8 md:max-w-[520px] leading-[1.9] animate-[fadeUp_.9s_.6s_forwards]">
          رمزٌ للشموخ والعزة والكرامة — يُجسّد قيم الوطن ووحدة المملكة العربية السعودية
        </p>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-[fadeIn_1s_1.4s_forwards]">
          <span className="text-[.7rem] text-[#c9a84c] opacity-60">تمرير</span>
          <div className="w-px h-[50px] bg-gradient-to-b from-[#c9a84c] to-transparent animate-[lineGrow_1.4s_ease-in-out_infinite]" />
        </div>

        <video autoPlay muted loop playsInline
          className="absolute -top-80 inset-x-0 w-full h-[180%] object-cover opacity-40 pointer-events-none"
          style={{ mixBlendMode: "screen" }}>
          <source src="/flag-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ background: "var(--bg-sections)", transition: "background .35s ease" }}>

        {/* MEANING */}
        <section className="max-w-[900px] mx-auto px-8 py-24">
          <span className="inline-block font-bold text-[.76rem] text-[#c9a84c] border-r-2 border-[#c9a84c] pr-3 mb-5">الرمزية</span>
          <h2 className="font-['Amiri',serif] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.3] mb-6"
            style={{ color: "var(--text-primary)", transition: "color .35s ease" }}>
            ما الذي يمثله العلم؟
          </h2>
          <p className="text-[1.05rem] font-light leading-[2] mb-4"
            style={{ color: "var(--text-body)", transition: "color .35s ease" }}>
            يجسّد العلم مفهوم المملكة العربية السعودية في أبهى صوره، ويعبّر عن الوحدة الوطنية والعمق التاريخي الضارب بجذوره عبر الأجيال. فهو ليس مجرد قطعة قماش ترفرف في الهواء، بل هو هوية أمة وروح وطن.
          </p>
          <p className="text-[1.05rem] font-light leading-[2] mb-4"
            style={{ color: "var(--text-body)", transition: "color .35s ease" }}>
            يجسد العلم مفهوم الدولة، ويعبر عن الوحدة الوطنية والعمق التاريخي للمملكة العربية السعودية. ويعد العلم في المملكة العربية السعودية رمزاً للدولة والوطن; حيث يعبر عن الشموخ، والعزة، والمكانة، والكرامة، والمبادئ التي تقوم عليها البلاد.
          </p>
        </section>

        <div className="w-full h-px" style={{ background: "linear-gradient(to left, transparent, rgba(0,108,53,.5), transparent)" }} />

        {/* HERITAGE */}
        <section className="max-w-[900px] mx-auto px-8 py-24">
          <span className="inline-block font-bold text-[.76rem] text-[#c9a84c] border-r-2 border-[#c9a84c] pr-3 mb-5">التاريخ</span>
          <h2 className="font-['Amiri',serif] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.3] mb-6"
            style={{ color: "var(--text-primary)", transition: "color .35s ease" }}>
            علمٌ متوارث عبر الأجيال!
          </h2>
          <p className="text-[1.05rem] font-light leading-[2] mb-8"
            style={{ color: "var(--text-body)", transition: "color .35s ease" }}>
            ترجع جذور راية المملكة العربية السعودية إلى فجر الدولة السعودية الأولى، مروراً بعهود متعاقبة حملت كل واحدة منها قيم الإسلام والوحدة.
          </p>

          <div className="relative py-8" id="timeline-section">
            <div className="absolute right-[23px] top-0 bottom-0 w-0.5 timeline-line"
              style={{ background: "linear-gradient(to bottom, transparent, #006c35 10%, #006c35 90%, transparent)" }} />

            {[
              { title: "الدولة السعودية الأولى", body: "بدأت راية الدولة السعودية تتشكّل منذ عهد الإمام محمد بن سعود بن مقرن، حاملةً شعار التوحيد وقيم الإسلام." },
              { title: "الدولة السعودية الثانية", body: "واصل الإمام تركي بن عبدالله بن محمد بن سعود، مؤسس الدولة السعودية الثانية، حمل الراية ورفعها عالياً تجسيداً للاستمرارية والوحدة." },
              { title: "١١ مارس ١٩٣٧م", body: "اعتُمد العلم بشكله الحالي رسمياً، ليبدأ فصل جديد في مسيرة هذا الرمز الوطني العريق." },
              { title: "٢٠٢٣م — إقرار يوم العلم", body: "أقرّ خادم الحرمين الشريفين الملك سلمان بن عبدالعزيز آل سعود يومَ ١١ مارس يوماً رسمياً للعلم السعودي، تخليداً لهذه الذكرى الوطنية العزيزة." },
            ].map((item) => (
              <div key={item.title}
                className="grid gap-6 mb-14 opacity-0 translate-x-10 transition-all duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] scroll-reveal [&.visible]:opacity-100 [&.visible]:translate-x-0"
                style={{ gridTemplateColumns: "48px 1fr" }}>
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#0a0a0a] border-[3px] border-[rgba(201,168,76,.4)] flex-shrink-0 transition-all duration-400 [.visible_&]:bg-[#c9a84c] [.visible_&]:border-[#c9a84c] [.visible_&]:shadow-[0_0_0_5px_rgba(201,168,76,.15),0_0_18px_rgba(201,168,76,.35)]" />
                </div>
                <div style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  transition: "background .35s ease, border-color .35s ease",
                  borderRadius: "0.75rem",
                  padding: "1.25rem 1.5rem",
                }}>
                  <h3 className="font-['Amiri',serif] text-[1.3rem] mb-2"
                    style={{ color: "var(--text-green)", transition: "color .35s ease" }}>
                    {item.title}
                  </h3>
                  <p className="m-0 text-[.95rem] font-light leading-[2]"
                    style={{ color: "var(--text-body)", transition: "color .35s ease" }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px" style={{ background: "linear-gradient(to left, transparent, rgba(0,108,53,.5), transparent)" }} />

        {/* SPECS */}
        <section className="max-w-[900px] mx-auto px-8 py-24">
          <span className="inline-block font-bold text-[.76rem] text-[#c9a84c] border-r-2 border-[#c9a84c] pr-3 mb-5">المواصفات</span>
          <h2 className="font-['Amiri',serif] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.3] mb-6"
            style={{ color: "var(--text-primary)", transition: "color .35s ease" }}>
            تصميم العلم الوطني
          </h2>
          <p className="text-[1.05rem] font-light leading-[2] mb-4"
            style={{ color: "var(--text-body)", transition: "color .35s ease" }}>
            لكل تفصيلة في العلم السعودي دلالة ومعنى، من لونه إلى شكله وما يحمله من عبارات وشعارات.
          </p>

          <div className="grid gap-6 mt-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {[
              { label: "اللون", value: "أخضر ممتد من السارية إلى نهاية العلم" },
              { label: "الشكل والنسبة", value: "مستطيل الشكل — عرضه يساوي ثلثي طوله" },
              { label: "الشهادتان", value: "«لا إله إلا الله محمد رسول الله» بالخط الأبيض في وسط العلم" },
              { label: "السيف", value: "سيف مسلول أسفل الشهادتين، قبضته في الجهة اليمنى" },
            ].map((spec) => (
              <div key={spec.label}
                className="relative overflow-hidden rounded-xl p-6 opacity-0 translate-y-5 transition-all duration-500 scroll-reveal [&.visible]:opacity-100 [&.visible]:translate-y-0"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  transition: "background .35s ease, border-color .35s ease, opacity .5s, transform .5s",
                }}>
                <div className="absolute top-0 right-0 w-[60px] h-[60px]"
                  style={{ background: "radial-gradient(circle, rgba(0,108,53,.3), transparent 70%)" }} />
                <div className="text-[1.25rem] font-bold text-[#c9a84c] mb-1">{spec.label}</div>
                <div className="text-[1rem] leading-[1.6]"
                  style={{ color: "var(--text-primary)", transition: "color .35s ease" }}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px" style={{ background: "linear-gradient(to left, transparent, rgba(0,108,53,.5), transparent)" }} />

        {/* CELEBRATION */}
        <section className="max-w-[900px] mx-auto px-8 py-24">
          <div className="relative overflow-hidden rounded-[20px] px-12 py-16 text-center opacity-0 translate-y-8 transition-all duration-700 scroll-reveal [&.visible]:opacity-100 [&.visible]:translate-y-0"
            style={{
              background: "var(--bg-celebration)",
              border: "1px solid var(--border-green)",
              transition: "background .35s ease, border-color .35s ease, opacity .7s, transform .7s",
            }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at 20% 50%, rgba(201,168,76,.08), transparent 60%), radial-gradient(circle at 80% 50%, rgba(0,138,67,.15), transparent 60%)" }} />

            <span className="inline-block font-bold text-[.76rem] text-[#c9a84c] border-r-2 border-[#c9a84c] pr-3 mb-5">الاحتفال</span>
            <h2 className="font-['Amiri',serif] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.3] mb-4 relative z-10"
              style={{ color: "var(--text-primary)", transition: "color .35s ease" }}>
              يوم العلم السعودي
            </h2>
            <p className="text-[1.05rem] font-light leading-[2] max-w-[500px] mx-auto mb-6 relative z-10"
              style={{ color: "var(--text-body)", transition: "color .35s ease" }}>
              مناسبة وطنية تُحيي ذكرى اعتماد العلم بشكله الحالي، وتجدّد الفخر والانتماء في قلوب كل سعودي وسعودية.
            </p>
            <div className="inline-flex flex-col items-center bg-[#c9a84c] text-[#0a0a0a] rounded-xl px-8 py-2.5 font-extrabold text-[1.4rem] leading-[1.3] relative z-10">
              <small className="text-[.7rem] font-semibold uppercase opacity-70">يوافق كل عام</small>
              ١١ مارس
            </div>

            <div className="mt-8 relative z-10">
              <Link href="/quiz"
                className="inline-flex items-center gap-3 bg-transparent border-2 border-[#1d8544] text-[#1d8544] rounded-xl px-10 py-4 font-['Amiri',serif] text-[1.2rem] font-bold transition-all duration-300 hover:bg-[#1d8544] hover:text-white hover:shadow-[0_0_30px_rgba(29,133,68,.4)] hover:scale-105 active:scale-95">
                <span>اختبر معلوماتك عن العلم</span>
                <span className="text-[1.4rem]">←</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--border-green)",
        backdropFilter: "blur(8px)",
        padding: "24px 32px",
        background: "var(--bg-sections)",
        transition: "background .35s ease, border-color .35s ease",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <a href="https://hafcode.com" target="_blank" rel="noopener noreferrer">
            <Image src="/hafcod.png" alt="هاف كود" width={60} height={60} />
          </a>
          <p style={{
            margin: 0,
            fontSize: ".78rem",
            color: "var(--text-footer)",
            letterSpacing: ".05em",
            textAlign: "center",
            direction: "rtl",
            transition: "color .35s ease",
          }}>
            © جميع الحقوق محفوظة - هاف كود 2026
          </p>
        </div>
      </footer>
    </>
  );
}