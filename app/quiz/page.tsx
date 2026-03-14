"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const questions = [
  { id: 1, question: "ما هو اللون الأساسي لعلم المملكة العربية السعودية؟", options: ["الأحمر", "الأخضر", "الأبيض", "الأسود"], answer: 1, explanation: "اللون الأخضر هو اللون الرئيسي للعلم السعودي." },
  { id: 2, question: "متى اعتُمد العلم السعودي بشكله الحالي رسمياً؟", options: ["١٩٣٢م", "١٩٢٥م", "١٩٣٧م", "١٩٤٥م"], answer: 2, explanation: "اعتُمد العلم رسمياً في ١١ مارس ١٩٣٧م، وهو التاريخ الذي يُحتفل به كيوم للعلم." },
  { id: 3, question: "ما الذي يظهر في وسط العلم السعودي؟", options: ["نجمة وهلال", "الشهادتان وسيف", "نخلة وسيفان", "شمس مشرقة"], answer: 1, explanation: "يتوسط العلم عبارة «لا إله إلا الله محمد رسول الله» مكتوبةً بالخط الأبيض، أسفلها سيف مسلول." },
  { id: 4, question: "ما نسبة عرض العلم السعودي إلى طوله؟", options: ["النصف", "الثلثان", "الثلث", "متساوي"], answer: 1, explanation: "العلم مستطيل الشكل، عرضه يساوي ثلثي طوله (نسبة ٢:٣)." },
  { id: 5, question: "في أي اتجاه تتجه قبضة السيف في العلم السعودي؟", options: ["اليسار", "اليمين", "الأسفل", "الأعلى"], answer: 1, explanation: "قبضة السيف في الجهة اليمنى، والنصل يمتد نحو اليسار." },
  { id: 6, question: "من أقرّ يوم العلم السعودي رسمياً عام ٢٠٢٣م؟", options: ["الملك فهد بن عبدالعزيز", "الملك سلمان بن عبدالعزيز", "الملك عبدالله بن عبدالعزيز", "مجلس الشورى"], answer: 1, explanation: "أقرّ خادم الحرمين الشريفين الملك سلمان بن عبدالعزيز يوم ١١ مارس يوماً رسمياً للعلم السعودي." },
  { id: 7, question: "من هو مؤسس الدولة السعودية الثانية الذي واصل رفع الراية؟", options: ["الإمام محمد بن سعود", "الإمام تركي بن عبدالله", "الملك عبدالعزيز", "الأمير فيصل"], answer: 1, explanation: "الإمام تركي بن عبدالله بن محمد بن سعود هو مؤسس الدولة السعودية الثانية، وقد واصل حمل الراية ورفعها." },
];

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
      <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c9a84c" fontFamily="serif">H</text>
    </svg>
  );
}

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; selected: number }[]>([]);
  const [completions, setCompletions] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/quiz-completions")
      .then((r) => r.json())
      .then((d) => setCompletions(d.count))
      .catch(() => {});
  }, []);

  const q = questions[current];

  function handleSelect(idx: number) { if (confirmed) return; setSelected(idx); }

  function handleConfirm() {
    if (selected === null) return;
    const correct = selected === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { correct, selected }]);
    setConfirmed(true);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      const alreadyCounted = sessionStorage.getItem("quiz-completed");
      if (!alreadyCounted) {
        fetch("/api/quiz-completions", { method: "POST" })
          .then((r) => r.json())
          .then((d) => {
            setCompletions(d.count);
            sessionStorage.setItem("quiz-completed", "1");
          })
          .catch(() => {});
      }
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  function handleRestart() {
    setCurrent(0); setSelected(null); setConfirmed(false);
    setScore(0); setFinished(false); setAnswers([]);
  }

  const scorePercent = Math.round((score / questions.length) * 100);
  const medal = scorePercent === 100 ? "🏆" : scorePercent >= 75 ? "🥇" : scorePercent >= 50 ? "🥈" : "🥉";
  const scoreMsg = scorePercent === 100 ? "إجابات مثالية! أنت خبير بالعلم السعودي" : scorePercent >= 75 ? "أداء رائع! معرفتك ممتازة" : scorePercent >= 50 ? "جيد! يمكنك تحسين نتيجتك" : "حاول مجدداً وستتحسن نتيجتك";

  return (
    <div dir="rtl" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "radial-gradient(ellipse at 50% 30%, #003d1f 0%, #001a0d 55%, #000 100%)", fontFamily: "'Amiri', serif", color: "#f5f0e8", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: `repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(0,108,53,.04) 60px,rgba(0,108,53,.04) 61px), repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(0,108,53,.04) 60px,rgba(0,108,53,.04) 61px)` }} />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 15% 80%, rgba(201,168,76,.06) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(0,108,53,.12) 0%, transparent 50%)" }} />

      {/* زر الرجوع */}
      <div style={{ position: "relative", zIndex: 10, padding: "20px 32px 0" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,108,53,.12)", border: "1px solid rgba(0,108,53,.3)", borderRadius: 10, padding: "9px 18px", color: "rgba(245,240,232,.75)", fontSize: ".85rem", fontFamily: "'Amiri', serif", textDecoration: "none", transition: "all .2s" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          الصفحة الرئيسية
        </Link>
      </div>

      {/* المحتوى الرئيسي */}
      <div style={{ flex: 1, maxWidth: 720, width: "100%", margin: "0 auto", padding: "0 24px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", paddingTop: 40, paddingBottom: 32 }}>

          {/* عداد المكتملين — يظهر قبل الاختبار */}
          {completions !== null && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(0,108,53,.08)", border: "1px solid rgba(0,108,53,.25)", borderRadius: 12, padding: "8px 18px", marginBottom: 24 }}>
              <span style={{ position: "relative", display: "flex", width: 10, height: 10 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80", opacity: 0.6, animation: "ping 1s infinite" }} />
                <span style={{ position: "relative", borderRadius: "50%", width: 10, height: 10, background: "#4ade80", display: "block" }} />
              </span>
              <span style={{ fontSize: ".78rem", color: "rgba(245,240,232,.55)" }}>أتم الاختبار</span>
              <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#c9a84c", fontFamily: "'Amiri', serif" }}>
                {completions.toLocaleString("ar-SA")}
              </span>
              <span style={{ fontSize: ".72rem", color: "rgba(245,240,232,.35)" }}>شخص</span>
            </div>
          )}

<span style={{ display: "block", fontSize: ".72rem", color: "#c9a84c", borderRight: "2px solid #c9a84c", paddingRight: 12, width: "fit-content", margin: "0 auto 16px", fontFamily: "'Amiri', serif" }}>اختبر معلوماتك</span>
          <h1 style={{ fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: "bold", color: "#fff", margin: "0 0 8px", lineHeight: 1.2 }}>العلم السعودي</h1>
          <p style={{ color: "rgba(245,240,232,.55)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.8, margin: 0 }}>7 أسئلة عن تاريخ ورمزية علم المملكة العربية السعودية</p>
        </div>

        {!finished ? (
          <>
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: ".78rem", color: "#c9a84c", letterSpacing: ".1em" }}>السؤال {current + 1} من {questions.length}</span>
                <span style={{ fontSize: ".78rem", color: "rgba(245,240,232,.4)" }}>النقاط: {score}</span>
              </div>
              <div style={{ height: 4, background: "rgba(0,108,53,.2)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 999, background: "linear-gradient(to left, #c9a84c, #006c35)", width: `${((current + (confirmed ? 1 : 0)) / questions.length) * 100}%`, transition: "width .5s ease" }} />
              </div>
            </div>

            <div style={{ background: "rgba(0,108,53,.07)", border: "1px solid rgba(0,108,53,.25)", borderRadius: 20, padding: "36px 32px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle, rgba(201,168,76,.15), transparent 70%)" }} />
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", background: "rgba(201,168,76,.12)", border: "1px solid rgba(201,168,76,.3)", color: "#c9a84c", fontSize: ".85rem", fontFamily: "monospace", marginBottom: 20, fontWeight: "bold" }}>{current + 1}</div>
              <h2 style={{ fontSize: "clamp(1.1rem,3vw,1.45rem)", color: "#fff", lineHeight: 1.6, margin: 0 }}>{q.question}</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {q.options.map((opt, idx) => {
                let borderColor = "rgba(0,108,53,.25)", bg = "rgba(0,108,53,.06)", textColor = "rgba(245,240,232,.85)", icon: string | null = null;
                if (confirmed) {
                  if (idx === q.answer) { borderColor = "#22c55e"; bg = "rgba(34,197,94,.1)"; textColor = "#4ade80"; icon = "✓"; }
                  else if (idx === selected && selected !== q.answer) { borderColor = "#ef4444"; bg = "rgba(239,68,68,.08)"; textColor = "rgba(245,240,232,.5)"; icon = "✗"; }
                  else { borderColor = "rgba(0,108,53,.1)"; textColor = "rgba(245,240,232,.35)"; }
                } else if (idx === selected) { borderColor = "#c9a84c"; bg = "rgba(201,168,76,.1)"; textColor = "#c9a84c"; }
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} style={{ display: "flex", alignItems: "center", gap: 14, background: bg, border: `1px solid ${borderColor}`, borderRadius: 14, padding: "16px 20px", color: textColor, fontSize: "1rem", fontFamily: "'Amiri', serif", cursor: confirmed ? "default" : "pointer", textAlign: "right", transition: "all .25s", outline: "none" }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${borderColor}`, fontSize: ".8rem", color: icon ? (idx === q.answer ? "#4ade80" : "#ef4444") : textColor, transition: "all .25s" }}>
                      {icon || String.fromCharCode(0x0041 + idx)}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {confirmed && (
              <div style={{ background: "rgba(201,168,76,.07)", border: "1px solid rgba(201,168,76,.25)", borderRadius: 14, padding: "16px 20px", marginBottom: 24, animation: "fadeIn .4s ease" }}>
                <span style={{ fontSize: ".72rem", letterSpacing: ".2em", color: "#c9a84c", textTransform: "uppercase", fontFamily: "'Amiri', serif"  }}>💡 معلومة</span>
                <p style={{ margin: "8px 0 0", fontSize: ".95rem", color: "rgba(245,240,232,.75)", lineHeight: 1.9 }}>{q.explanation}</p>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-start" }}>
              {!confirmed ? (
                <button onClick={handleConfirm} disabled={selected === null} style={{ background: selected !== null ? "#c9a84c" : "rgba(201,168,76,.2)", color: selected !== null ? "#0a0a0a" : "rgba(201,168,76,.4)", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: "1rem", fontFamily: "'Amiri', serif", fontWeight: "bold", cursor: selected !== null ? "pointer" : "default", transition: "all .2s" }}>تأكيد الإجابة</button>
              ) : (
                <button onClick={handleNext} style={{ background: "linear-gradient(135deg, #006c35, #00a050)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: "1rem", fontFamily: "'Amiri', serif", fontWeight: "bold", cursor: "pointer", transition: "all .2s", boxShadow: "0 4px 20px rgba(0,108,53,.3)" }}>{current + 1 >= questions.length ? "عرض النتيجة ←" : "السؤال التالي ←"}</button>
              )}
            </div>
          </>
        ) : (
          <div style={{ animation: "fadeIn .5s ease" }}>
            <div style={{ background: "linear-gradient(135deg, #002e17, #001a0d)", border: "1px solid rgba(0,108,53,.35)", borderRadius: 24, padding: "48px 32px", textAlign: "center", marginBottom: 32, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 30% 50%, rgba(201,168,76,.07), transparent 60%), radial-gradient(circle at 70% 50%, rgba(0,138,67,.12), transparent 60%)" }} />
              <div style={{ fontSize: "4rem", marginBottom: 16 }}>{medal}</div>
              <div style={{ fontSize: "clamp(3rem,10vw,5rem)", fontWeight: "bold", color: scorePercent >= 75 ? "#4ade80" : scorePercent >= 50 ? "#c9a84c" : "#f87171", lineHeight: 1 }}>
                {score}<span style={{ fontSize: ".45em", color: "rgba(245,240,232,.3)" }}>/{questions.length}</span>
              </div>
              <p style={{ color: "#c9a84c", fontSize: "1.1rem", margin: "12px 0 4px" }}>{scoreMsg}</p>
              <p style={{ color: "rgba(245,240,232,.45)", fontSize: ".9rem", margin: 0 }}>أجبت بشكل صحيح على {score} من أصل {questions.length} أسئلة</p>

              {/* عداد المكتملين في صفحة النتيجة */}
              {completions !== null && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(0,108,53,.08)", border: "1px solid rgba(0,108,53,.25)", borderRadius: 12, padding: "8px 18px", marginTop: 20 }}>
                  <span style={{ position: "relative", display: "flex", width: 10, height: 10 }}>
                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80", opacity: 0.6, animation: "ping 1s infinite" }} />
                    <span style={{ position: "relative", borderRadius: "50%", width: 10, height: 10, background: "#4ade80", display: "block" }} />
                  </span>
                  <span style={{ fontSize: ".78rem", color: "rgba(245,240,232,.55)" }}>أتم الاختبار</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#c9a84c", fontFamily: "'Amiri', serif" }}>
                    {completions.toLocaleString("ar-SA")}
                  </span>
                  <span style={{ fontSize: ".72rem", color: "rgba(245,240,232,.35)" }}>شخص</span>
                </div>
              )}

              <div style={{ margin: "28px auto 0", maxWidth: 300 }}>
                <div style={{ height: 8, background: "rgba(255,255,255,.07)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 999, background: scorePercent >= 75 ? "linear-gradient(to left, #4ade80, #006c35)" : scorePercent >= 50 ? "linear-gradient(to left, #c9a84c, #a07830)" : "linear-gradient(to left, #f87171, #dc2626)", width: `${scorePercent}%`, transition: "width 1s ease .3s" }} />
                </div>
                <p style={{ color: "rgba(245,240,232,.3)", fontSize: ".78rem", marginTop: 8 }}>{scorePercent}%</p>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <span style={{ display: "inline-block", fontSize: ".72rem", color: "#c9a84c", borderRight: "2px solid #c9a84c", paddingRight: 12, marginBottom: 20 }}>مراجعة الإجابات</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {questions.map((qs, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: answers[i]?.correct ? "rgba(34,197,94,.06)" : "rgba(239,68,68,.06)", border: `1px solid ${answers[i]?.correct ? "rgba(34,197,94,.2)" : "rgba(239,68,68,.2)"}`, borderRadius: 12, padding: "14px 18px" }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: answers[i]?.correct ? "rgba(34,197,94,.15)" : "rgba(239,68,68,.15)", color: answers[i]?.correct ? "#4ade80" : "#f87171", fontSize: ".85rem", fontWeight: "bold" }}>
                      {answers[i]?.correct ? "✓" : "✗"}
                    </span>
                    <div>
                      <p style={{ margin: "0 0 4px", fontSize: ".9rem", color: "rgba(245,240,232,.8)", lineHeight: 1.6 }}>{qs.question}</p>
                      {!answers[i]?.correct && <p style={{ margin: 0, fontSize: ".82rem", color: "#4ade80" }}>الإجابة الصحيحة: {qs.options[qs.answer]}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
              <button onClick={handleRestart} style={{ display: "block", width: "100%", background: "#c9a84c", color: "#0a0a0a", border: "none", borderRadius: 14, padding: "16px", fontSize: "1.1rem", fontFamily: "'Amiri', serif", fontWeight: "bold", cursor: "pointer" }}>
                إعادة الاختبار 🔄
              </button>
              <Link href="/" style={{ display: "block", width: "100%", textAlign: "center", background: "rgba(0,108,53,.12)", color: "rgba(245,240,232,.7)", border: "1px solid rgba(0,108,53,.3)", borderRadius: 14, padding: "14px", fontSize: "1rem", fontFamily: "'Amiri', serif", textDecoration: "none", transition: "all .2s" }}>
                ← العودة للصفحة الرئيسية
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* الفوتر */}
            <footer
              style={{
                position: "relative",
                zIndex: 2,
                borderTop: "1px solid rgba(0,108,53,.2)",
                // background: "#d6d6d6",
                backdropFilter: "blur(8px)",
                padding: "24px 32px",
                background: `
                      radial-gradient(circle at 20% 50%, rgba(201,168,76,.08), transparent 60%),
                      radial-gradient(circle at 80% 50%, rgba(0,138,67,.15), transparent 60%)`,
              }}
            >
              <div
                style={{
                  maxWidth: 720,
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div>
                  <a href="https://hafcode.com" target="_blank" rel="noopener noreferrer">
                              <Image src="/hafcod.png" alt="هاف كود" width={60} height={60} />
                            </a>
      
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: ".78rem",
                    color: "#1d8544",
                    letterSpacing: ".05em",
                    textAlign: "center",
                    direction: "rtl",
                  }}
                >
                  © جميع الحقوق محفوظة - هاف كود 2026
                </p>
              </div>
            </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2); opacity: 0; } }
        button:hover { filter: brightness(1.08); }
      `}</style>
    </div>
  );
}