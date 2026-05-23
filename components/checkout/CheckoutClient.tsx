"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check, Shield, Lock,
  ChevronLeft, Zap, Star, AlertCircle, Loader2,
  ChevronDown, ChevronUp,
} from "lucide-react";
import type { CheckoutDict, Locale } from "@/locales/types";
import { localePath } from "@/lib/url";

// ─── Static plan data (prices never change with language) ────────────────────

const PLAN_STATIC = {
  "1month":   { price: "€20", perMonth: "€20.00/mo", popular: false },
  "3months":  { price: "€35", perMonth: "€11.67/mo", popular: false },
  "6months":  { price: "€45", perMonth: "€7.50/mo",  popular: false },
  "12months": { price: "€65", perMonth: "€5.42/mo",  popular: true  },
} as const;

type PlanKey = keyof typeof PLAN_STATIC;
type PaymentMethod = "card" | "paypal" | "bank" | "crypto";

// ─── Payment method icons (branded) ──────────────────────────────────────────

const CardPaymentIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 26 18" className="w-6 h-4" fill="none">
    <rect x="0.75" y="0.75" width="24.5" height="16.5" rx="2.5"
      stroke={active ? "#60a5fa" : "#475569"} strokeWidth="1.5"
      fill={active ? "rgba(59,130,246,0.07)" : "transparent"} />
    <rect x="0.75" y="4.5" width="24.5" height="3.5"
      fill={active ? "#3b82f6" : "#374151"} opacity="0.3" />
    <rect x="3" y="11" width="5.5" height="2.5" rx="1"
      fill={active ? "#93c5fd" : "#4b5563"} />
    <circle cx="20.5" cy="12.25" r="1.8"
      fill={active ? "#3b82f6" : "#374151"} opacity={active ? 0.9 : 0.6} />
    <circle cx="17.5" cy="12.25" r="1.8"
      fill={active ? "#93c5fd" : "#374151"} opacity={active ? 0.55 : 0.4} />
  </svg>
);

const PayPalPaymentIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M5.5 4.5h6c2.6 0 4.2 1.3 3.8 3.9C14.8 11 12.9 12 10.2 12H8.3l-1 6H5l1.5-13.5z"
      fill={active ? "#1e3a8a" : "#374151"} />
    <path d="M8.8 7.5h5.7c2.6 0 4.2 1.3 3.8 3.9C17.8 14 15.9 15 13.2 15H11l-1.1 5.5H7.4L8.8 7.5z"
      fill={active ? "#3b82f6" : "#4b5563"} />
  </svg>
);

const BankPaymentIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M3 10L12 4.5 21 10H3z"
      fill={active ? "#0ea5e9" : "#374151"} />
    <rect x="5.5" y="11" width="2" height="6" rx="0.5"
      fill={active ? "#38bdf8" : "#4b5563"} />
    <rect x="9.5" y="11" width="2" height="6" rx="0.5"
      fill={active ? "#38bdf8" : "#4b5563"} />
    <rect x="13.5" y="11" width="2" height="6" rx="0.5"
      fill={active ? "#38bdf8" : "#4b5563"} />
    <rect x="17.5" y="11" width="2" height="6" rx="0.5"
      fill={active ? "#38bdf8" : "#4b5563"} />
    <rect x="3" y="17.5" width="18" height="2" rx="0.75"
      fill={active ? "#0ea5e9" : "#374151"} />
  </svg>
);

const CryptoPaymentIcon = ({ active }: { active: boolean }) => {
  const c = active ? "#f59e0b" : "#475569";
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke={c} strokeWidth="1.5"
        fill={active ? "rgba(245,158,11,0.06)" : "transparent"} />
      <line x1="9.5" y1="8" x2="9.5" y2="16" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 8h3c1 0 1.8.6 1.8 1.5s-.6 1.5-1.8 1.5H9.5"
        stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M9.5 11h3.2c1.1 0 1.9.7 1.9 1.6 0 1-.8 1.7-2 1.7H9.5"
        stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="11" y1="6.5" x2="11" y2="8" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="6.5" x2="13" y2="8" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="11" y1="16" x2="11" y2="17.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="16" x2="13" y2="17.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
};

// Per-method brand config (visual only — labels come from dict)
const PAYMENT_METHOD_CONFIG = [
  { key: "card"   as PaymentMethod, Icon: CardPaymentIcon,   activeCard: "border-blue-500/50 bg-blue-500/[0.08] shadow-[0_0_18px_rgba(59,130,246,0.14)]",   activeLabel: "text-blue-300"  },
  { key: "paypal" as PaymentMethod, Icon: PayPalPaymentIcon, activeCard: "border-blue-700/50 bg-blue-900/[0.14] shadow-[0_0_18px_rgba(30,64,175,0.14)]",    activeLabel: "text-blue-400"  },
  { key: "bank"   as PaymentMethod, Icon: BankPaymentIcon,   activeCard: "border-sky-500/50 bg-sky-500/[0.08] shadow-[0_0_18px_rgba(14,165,233,0.14)]",     activeLabel: "text-sky-300"   },
  { key: "crypto" as PaymentMethod, Icon: CryptoPaymentIcon, activeCard: "border-amber-500/50 bg-amber-500/[0.07] shadow-[0_0_18px_rgba(245,158,11,0.14)]", activeLabel: "text-amber-300" },
];

// ─── Form primitives ──────────────────────────────────────────────────────────

function FormField({ label, id, error, children }: {
  label: string; id: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

function TextInput({ id, type = "text", placeholder, value, onChange, error, maxLength, inputMode, autoComplete }: {
  id: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; error?: string; maxLength?: number;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      inputMode={inputMode}
      autoComplete={autoComplete}
      className={`w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none transition-all duration-200 ${
        error
          ? "bg-red-500/[0.05] border border-red-500/40 focus:border-red-400/60"
          : "bg-white/[0.04] border border-white/[0.10] focus:border-violet-500/60 focus:bg-white/[0.06]"
      }`}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CheckoutClient({ plan: initialPlan, lang, dict }: {
  plan: string;
  lang: Locale;
  dict: CheckoutDict;
}) {
  const selectedPlan: PlanKey = (initialPlan as PlanKey) in PLAN_STATIC ? (initialPlan as PlanKey) : "1month";

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const planStatic = PLAN_STATIC[selectedPlan];
  const planT = dict.plans[selectedPlan];

  const paymentLabels: Record<PaymentMethod, string> = {
    card: dict.creditCard,
    paypal: dict.paypal,
    bank: dict.bankTransfer,
    crypto: dict.crypto,
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = dict.errorName;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = dict.errorEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const methodLabel = paymentLabels[paymentMethod];
    const msg = [
      "Hello! I'd like to subscribe.",
      "",
      `📦 Plan: ${planT.label} (${planStatic.price})`,
      `💳 Payment: ${methodLabel}`,
      `👤 Name: ${name}`,
      `📧 Email: ${email}`,
      whatsapp ? `📱 WhatsApp: ${whatsapp}` : "",
    ].filter(Boolean).join("\n");
    setTimeout(() => {
      window.open(`https://wa.me/447380310123?text=${encodeURIComponent(msg)}`, "_blank");
      setLoading(false);
    }, 700);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-20 pb-20">

      {/* Page header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link
          href={localePath(lang, '/pricing')}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-7 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {dict.backToPricing}
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
            <Lock className="w-4.5 h-4.5 text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{dict.secureCheckout}</h1>
            <p className="text-slate-500 text-xs mt-0.5">{dict.sslNote}</p>
          </div>
        </div>
      </div>

      {/* Mobile collapsible summary */}
      <div className="lg:hidden max-w-6xl mx-auto px-4 sm:px-6 mb-5">
        <button
          type="button"
          onClick={() => setSummaryOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3.5 glass rounded-2xl border border-white/[0.08] hover:border-violet-500/25 transition-colors"
        >
          <span className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-violet-400 font-bold">{planT.label}</span> {dict.planSelected}
          </span>
          <span className="flex items-center gap-2 text-white font-black text-sm">
            {planStatic.price}
            {summaryOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
          </span>
        </button>
        {summaryOpen && (
          <div className="mt-2 glass rounded-2xl border border-white/[0.06] p-4 space-y-2">
            {planT.features.map(f => (
              <div key={f} className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-green-400" />
                </span>
                {f}
              </div>
            ))}
            <div className="pt-3 mt-1 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-slate-500 text-xs">{dict.totalDueToday}</span>
              <div className="text-right">
                <div className="text-white font-black">{planStatic.price}</div>
                <div className="text-slate-600 text-xs">{planStatic.perMonth}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] lg:gap-8 xl:gap-12 lg:items-start">

          {/* ── Left: Checkout form ─────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Step 1: Payment Method */}
            <section className="glass rounded-2xl border border-white/[0.06] p-5 sm:p-6">
              <h2 className="text-white font-bold text-sm mb-4 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-[11px] font-black flex items-center justify-center flex-shrink-0">1</span>
                {dict.paymentMethod}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                {PAYMENT_METHOD_CONFIG.map(({ key, Icon, activeCard, activeLabel }) => {
                  const isActive = paymentMethod === key;
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setPaymentMethod(key)}
                      className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? activeCard
                          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.03]"
                      }`}
                    >
                      <Icon active={isActive} />
                      <span className={`text-xs font-semibold leading-tight text-center transition-colors ${isActive ? activeLabel : "text-slate-500"}`}>
                        {paymentLabels[key]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Your details */}
            <section className="glass rounded-2xl border border-white/[0.06] p-5 sm:p-6">
              <h2 className="text-white font-bold text-sm mb-4 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-[11px] font-black flex items-center justify-center flex-shrink-0">2</span>
                {dict.yourDetails}
              </h2>
              <div className="space-y-3.5">
                <FormField label={dict.fullName} id="name" error={errors.name}>
                  <TextInput id="name" placeholder={dict.namePlaceholder} value={name} onChange={setName} error={errors.name} autoComplete="name" />
                </FormField>
                <FormField label={dict.emailAddress} id="email" error={errors.email}>
                  <TextInput id="email" type="email" placeholder={dict.emailPlaceholder} value={email} onChange={setEmail} error={errors.email} autoComplete="email" />
                </FormField>
                <FormField label={dict.whatsappNumber} id="whatsapp">
                  <TextInput id="whatsapp" placeholder={dict.whatsappPlaceholder} value={whatsapp} onChange={setWhatsapp} autoComplete="tel" />
                </FormField>
                <p className="text-slate-600 text-xs pt-0.5">{dict.credentialsNote}</p>
              </div>
            </section>

            {/* Submit */}
            <div className="space-y-3 pb-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-[15px] px-8 rounded-full text-white font-semibold text-[15px] tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_32px_rgba(139,92,246,0.35),0_4px_16px_rgba(109,40,217,0.25)] hover:shadow-[0_0_48px_rgba(139,92,246,0.55),0_6px_24px_rgba(109,40,217,0.35)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[position:100%_0]" />
                <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/[0.12]" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <><Loader2 className="w-[18px] h-[18px] animate-spin opacity-80" /><span>{dict.processing}</span></>
                  ) : (
                    <>
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.15] backdrop-blur-sm">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                      <span>{dict.completeOrder} — {planStatic.price}</span>
                    </>
                  )}
                </span>
              </button>

              <div className="flex items-center justify-center gap-5 pt-0.5">
                <span className="flex items-center gap-1.5 text-slate-600 text-xs"><Shield className="w-3 h-3 text-green-500/60" /> {dict.sslSecured}</span>
                <span className="flex items-center gap-1.5 text-slate-600 text-xs"><Lock className="w-3 h-3 text-violet-500/60" /> {dict.encrypted}</span>
                <span className="flex items-center gap-1.5 text-slate-600 text-xs"><Zap className="w-3 h-3 text-amber-500/60" /> {dict.instantAccess}</span>
              </div>
            </div>

          </form>

          {/* ── Right: Sticky order summary ─────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">

              {/* Summary card */}
              <div className="glass rounded-2xl border border-white/[0.06] p-6">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">{dict.orderSummary}</p>

                <div className={`rounded-xl p-4 mb-5 ${
                  planStatic.popular
                    ? "bg-gradient-to-br from-violet-600/15 to-purple-600/8 border border-violet-500/20"
                    : "bg-white/[0.03] border border-white/[0.06]"
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-white font-bold text-lg leading-none">{planT.label} {dict.planWord}</p>
                      <p className="text-slate-500 text-xs mt-1">{dict.premiumSubscription}</p>
                    </div>
                    {planStatic.popular && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold">
                        <Star className="w-2.5 h-2.5 fill-current" /> {dict.best}
                      </span>
                    )}
                  </div>
                  <div className="flex items-end gap-1.5 mt-3">
                    <span className="text-4xl font-black text-white">{planStatic.price}</span>
                    <span className="text-slate-400 text-sm mb-1.5">/ {planT.period}</span>
                  </div>
                  <p className="text-violet-400 text-xs font-semibold mt-1">{planStatic.perMonth}</p>
                  {planT.savings && (
                    <span className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-semibold">
                      {planT.savings}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-5">
                  {planT.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-green-400" />
                      </span>
                      <span className="text-slate-400 text-xs">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/[0.06] pt-4 space-y-2.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{dict.subtotal}</span>
                    <span className="text-slate-300 font-medium">{planStatic.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{dict.setupFee}</span>
                    <span className="text-green-400 font-semibold">{dict.free}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 border-t border-white/[0.06]">
                    <span className="text-white font-bold text-sm">{dict.totalDueToday}</span>
                    <div className="text-right">
                      <div className="text-white font-black text-2xl leading-none">{planStatic.price}</div>
                      <div className="text-slate-600 text-xs mt-0.5">{planStatic.perMonth}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="glass rounded-2xl border border-white/[0.06] p-5 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{dict.instantActivation}</p>
                    <p className="text-slate-600 text-xs">{dict.instantActivationSub}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{dict.securePrivate}</p>
                    <p className="text-slate-600 text-xs">{dict.securePrivateSub}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <Lock className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{dict.support247}</p>
                    <p className="text-slate-600 text-xs">{dict.support247Sub}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
