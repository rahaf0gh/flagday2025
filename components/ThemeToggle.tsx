"use client";

import { useSyncExternalStore } from "react";

const THEMES = {
  light: {
    "--bg-sections": "#ededed",
    "--text-primary": "#0a0a0a",
    "--text-body": "#444444",
    "--text-green": "#005c2e",
    "--text-footer": "#1d8544",
    "--bg-card": "rgba(0,108,53,0.05)",
    "--bg-card-hover": "rgba(0,108,53,0.10)",
    "--bg-celebration": "linear-gradient(135deg,#f0faf4 0%,#e8f5ee 50%,#f5fff8 100%)",
    "--border-card": "rgba(0,108,53,0.2)",
    "--border-card-hover": "rgba(0,108,53,0.5)",
    "--border-green": "rgba(0,108,53,0.2)",
    "--toggle-bg": "rgba(255,255,255,0.85)",
    "--toggle-border": "rgba(0,108,53,0.35)",
    "--toggle-icon": "#1d8544",
    "--toggle-shadow": "rgba(0,108,53,0.15)",
  },
  dark: {
    "--bg-sections": "#0d0d0d",
    "--text-primary": "#f0f0f0",
    "--text-body": "#aaaaaa",
    "--text-green": "#4ade80",
    "--text-footer": "#4ade80",
    "--bg-card": "rgba(0,108,53,0.12)",
    "--bg-card-hover": "rgba(0,108,53,0.20)",
    "--bg-celebration": "linear-gradient(135deg,#0a1f12 0%,#0d2016 50%,#0b1a10 100%)",
    "--border-card": "rgba(0,180,90,0.2)",
    "--border-card-hover": "rgba(74,222,128,0.5)",
    "--border-green": "rgba(0,108,53,0.3)",
    "--toggle-bg": "rgba(0,20,10,0.85)",
    "--toggle-border": "rgba(74,222,128,0.35)",
    "--toggle-icon": "#c9a84c",
    "--toggle-shadow": "rgba(201,168,76,0.15)",
  },
};

// ── مخزن خارج React تماماً ──────────────────────────────────────
let currentDark = true; // القيمة الافتراضية dark
const listeners = new Set<() => void>();

function getSnapshot() { return currentDark; }
function getServerSnapshot() { return true; } // SSR يعيد dark دائماً

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function applyTheme(dark: boolean) {
  const vars = dark ? THEMES.dark : THEMES.light;
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", dark ? "dark" : "light");
  localStorage.setItem("theme", dark ? "dark" : "light");
}

function setTheme(dark: boolean) {
  currentDark = dark;
  applyTheme(dark);
  listeners.forEach((cb) => cb()); // يُعلم React بالتغيير
}

// ────────────────────────────────────────────────────────────────

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => setTheme(!isDark);

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      style={{
        position: "fixed",
        top: "1.2rem",
        left: "1.2rem",
        zIndex: 9999,
        background: "var(--toggle-bg)",
        border: "1.5px solid var(--toggle-border)",
        borderRadius: "50%",
        width: "2.7rem",
        height: "2.7rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 2px 12px var(--toggle-shadow)",
        transition: "all .3s cubic-bezier(.22,1,.36,1)",
        backdropFilter: "blur(8px)",
      }}
    >
      {isDark ? (
        <svg style={{ width: "1.3rem", height: "1.3rem", fill: "var(--toggle-icon)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
      ) : (
        <svg style={{ width: "1.3rem", height: "1.3rem", fill: "var(--toggle-icon)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      )}
    </button>
  );
}