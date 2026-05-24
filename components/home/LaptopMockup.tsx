"use client";

import { Tv2, Film, LayoutGrid } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { HeroDict } from "@/locales/types";

const particles = [
  { top: "8%",  left: "4%",   size: 3, delay: 0,   dur: 3.2, color: "#60a5fa" },
  { top: "22%", left: "92%",  size: 2, delay: 0.8, dur: 2.8, color: "#a78bfa" },
  { top: "60%", left: "6%",   size: 2, delay: 1.4, dur: 3.6, color: "#22d3ee" },
  { top: "82%", left: "89%",  size: 3, delay: 0.4, dur: 3.0, color: "#818cf8" },
  { top: "42%", left: "97%",  size: 2, delay: 2.0, dur: 2.6, color: "#c084fc" },
  { top: "13%", left: "52%",  size: 2, delay: 1.2, dur: 3.8, color: "#93c5fd" },
  { top: "72%", left: "48%",  size: 2, delay: 1.8, dur: 2.9, color: "#6ee7b7" },
];

export default function LaptopMockup({ dict }: { dict: HeroDict }) {
  const reduce = useReducedMotion();

  const float = reduce
    ? {}
    : { animate: { y: [0, -11, 0] }, transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } };

  const badgeFloat = (delay: number, dist = 7) =>
    reduce
      ? {}
      : { animate: { y: [0, -dist, 0] }, transition: { duration: 3.5 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay } };

  const glowBreathe = reduce
    ? {}
    : { animate: { opacity: [0.1, 0.22, 0.1], scale: [1, 1.06, 1] }, transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } };

  const categories = [
    { label: "LIVE TV",  Icon: Tv2,        from: "from-blue-500",   to: "to-cyan-500",   count: "50,000+", shadow: "shadow-blue-500/40"   },
    { label: "MOVIES",   Icon: Film,       from: "from-violet-500", to: "to-purple-600", count: "80,000+", shadow: "shadow-violet-500/40" },
    { label: "SERIES",   Icon: LayoutGrid, from: "from-indigo-500", to: "to-blue-600",   count: "20,000+", shadow: "shadow-indigo-500/40" },
  ];

  return (
    <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[1px] pointer-events-none"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, background: p.color }}
          animate={reduce ? {} : { y: [0, -10, 0], opacity: [p.size === 3 ? 0.6 : 0.4, 0.9, p.size === 3 ? 0.6 : 0.4] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Ambient glow */}
      <motion.div
        className="absolute -inset-12 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)" }}
        {...glowBreathe}
      />
      <motion.div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.12) 0%, transparent 70%)" }}
        animate={reduce ? {} : { opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* Main float wrapper */}
      <motion.div {...float} style={{ willChange: "transform" }}>

        {/* Screen */}
        <motion.div
          className="relative rounded-[18px] bg-gradient-to-b from-[#1e2235] to-[#161929] p-[3px] border border-white/[0.08]"
          style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(59,130,246,0.14)" }}
          animate={reduce ? {} : { boxShadow: [
            "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.1)",
            "0 30px 80px rgba(0,0,0,0.7), 0 0 70px rgba(59,130,246,0.22)",
            "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.1)",
          ]}}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15 z-10" />
          <div className="rounded-[15px] overflow-hidden bg-[#080d1a] relative">

            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)" }}
              animate={reduce ? {} : { x: ["-120%", "220%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
            />

            {/* App top bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1528] border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Tv2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[11px] font-black text-white tracking-wide">
                  Exact<span className="text-blue-400">IPTV</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-slate-500">06:06 AM · Nov 22, 2025</span>
                <div className="flex items-center gap-1 bg-white/[0.06] border border-white/[0.08] rounded-md px-2 py-0.5">
                  <span className="text-[9px] text-slate-400">🔍 Search</span>
                </div>
              </div>
            </div>

            {/* Category circles */}
            <div className="px-6 py-5 bg-gradient-to-br from-[#0a0f20] via-[#080d1a] to-[#0c1022]">
              <div className="flex items-start justify-around mb-5">
                {categories.map(({ label, Icon, from, to, count, shadow }, idx) => (
                  <motion.div
                    key={label}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    whileHover={reduce ? {} : { y: -5, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className={`relative w-[72px] h-[72px] rounded-full bg-gradient-to-br ${from} ${to} flex items-center justify-center ring-2 ring-white/[0.08] shadow-lg ${shadow}`}
                      animate={reduce ? {} : { scale: [1, 1.03, 1] }}
                      transition={{ duration: 2.5 + idx * 0.4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    >
                      <div className="absolute inset-[2px] rounded-full bg-white/[0.06]" />
                      <Icon className="relative w-7 h-7 text-white drop-shadow-lg" />
                    </motion.div>
                    <span className="text-[10px] font-bold text-white tracking-wide">{label}</span>
                    <span className="text-[8px] text-slate-500">{count} titles</span>
                    <div className="flex items-center gap-1 opacity-40">
                      <div className="w-3 h-3 rounded border border-slate-600 flex items-center justify-center">
                        <span className="text-[6px] text-slate-400">↻</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature buttons */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: "LIVE WITH EPG", color: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
                  { label: "MULTI-SCREEN",  color: "border-violet-500/40 text-violet-400 bg-violet-500/10" },
                  { label: "CATCH UP",      color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
                ].map(({ label, color }) => (
                  <motion.div
                    key={label}
                    className={`flex items-center justify-center px-2 py-2 rounded-xl border ${color} cursor-pointer`}
                    whileHover={reduce ? {} : { scale: 1.04, y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <span className="text-[8px] font-bold tracking-wide">{label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                <span className="text-[9px] text-slate-500">Active Subscription</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-emerald-400 font-semibold">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hinge */}
        <div className="h-[6px] mx-3 bg-gradient-to-r from-[#0f1220] via-[#1a1f35] to-[#0f1220] shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />

        {/* Keyboard base */}
        <div className="rounded-b-2xl bg-gradient-to-b from-[#1a1f35] to-[#131728] border border-t-0 border-white/[0.07] px-5 pt-3 pb-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {[14, 12, 10].map((w, row) => (
            <div key={row} className="flex justify-center gap-[3px] mb-[3px]">
              {Array.from({ length: w }).map((_, i) => (
                <div key={i} className="h-[5px] flex-1 max-w-[22px] rounded-[2px] bg-white/[0.04] border border-white/[0.06]" />
              ))}
            </div>
          ))}
          <div className="flex justify-center mt-1.5">
            <div className="h-[5px] w-2/5 rounded-[2px] bg-white/[0.05] border border-white/[0.07]" />
          </div>
          <div className="mx-auto mt-2.5 w-20 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06]" />
        </div>

      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        className="absolute -top-5 -right-2 sm:-right-8 flex items-center gap-2.5 bg-[#0d1528] border border-blue-500/25 rounded-2xl px-3.5 py-2.5 shadow-xl shadow-blue-900/30 cursor-default"
        {...badgeFloat(0, 8)}
        whileHover={reduce ? {} : { scale: 1.05, borderColor: "rgba(59,130,246,0.5)" }}
        style={{ willChange: "transform" }}
      >
        <motion.span
          className="flex items-center gap-1 text-[10px] font-bold text-red-400"
          animate={reduce ? {} : { opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          {dict.liveNow}
        </motion.span>
        <div className="w-px h-3 bg-white/10" />
        <span className="text-[10px] font-semibold text-white">{dict.channels}</span>
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        className="absolute -bottom-3 -left-2 sm:-left-8 flex items-center gap-2 bg-[#0d1528] border border-violet-500/25 rounded-2xl px-3.5 py-2.5 shadow-xl shadow-violet-900/30 cursor-default"
        {...badgeFloat(1.0, 6)}
        whileHover={reduce ? {} : { scale: 1.05, borderColor: "rgba(139,92,246,0.5)" }}
        style={{ willChange: "transform" }}
      >
        <motion.span
          className="text-[10px] font-black text-cyan-400"
          animate={reduce ? {} : { textShadow: ["0 0 8px rgba(34,211,238,0.3)", "0 0 16px rgba(34,211,238,0.7)", "0 0 8px rgba(34,211,238,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          4K
        </motion.span>
        <span className="text-[9px] text-slate-500">Ultra HD · HDR</span>
      </motion.div>

      {/* Floating badge — mid right */}
      <motion.div
        className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-10 flex-col items-center gap-1 bg-[#0d1528] border border-emerald-500/20 rounded-2xl px-3 py-2.5 shadow-xl shadow-emerald-900/20 cursor-default"
        {...badgeFloat(0.5, 9)}
        whileHover={reduce ? {} : { scale: 1.05, borderColor: "rgba(52,211,153,0.4)" }}
        style={{ willChange: "transform" }}
      >
        <motion.span
          className="text-[10px] font-bold text-emerald-400"
          animate={reduce ? {} : { opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          99.9%
        </motion.span>
        <span className="text-[8px] text-slate-600">Uptime</span>
      </motion.div>

    </div>
  );
}
