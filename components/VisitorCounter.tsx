"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Only count once per browser session
    const alreadyCounted = sessionStorage.getItem("visited");

    if (alreadyCounted) {
      // Just fetch current count without incrementing
      fetch("/api/visitors")
        .then((r) => r.json())
        .then((d) => setCount(d.count))
        .catch(() => {});
    } else {
      // Increment counter on first visit this session
      fetch("/api/visitors", { method: "POST" })
        .then((r) => r.json())
        .then((d) => {
          setCount(d.count);
          sessionStorage.setItem("visited", "1");
        })
        .catch(() => {});
    }
  }, []);

  if (count === null) return null;

  return (
    <div
      className="inline-flex items-center gap-3 bg-[rgba(0,108,53,.08)] border border-[rgba(0,108,53,.25)] rounded-xl px-5 py-2.5 text-sm"
      dir="rtl"
    >
      {/* Pulse dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-60" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4ade80]" />
      </span>

      <span className="text-[rgba(245,240,232,.55)] text-[.78rem] tracking-[.05em]">
        عدد الزيارات
      </span>

      <span className="font-['Amiri',serif] text-[1.1rem] font-bold text-[#c9a84c] tabular-nums">
        {count.toLocaleString("ar-SA")}
      </span>

      <span className="text-[rgba(245,240,232,.35)] text-[.72rem]">زيارة</span>
    </div>
  );
}