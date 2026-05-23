import { TrendingDown, Globe2, Layers, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: TrendingDown,
    title: "Save Up to 90% on TV Bills",
    description: "Sky TV costs £100+/month. Our annual plan is just €65 total — that's a saving of over £1,100 per year with more channels than you'd ever get from cable.",
    stat: "90%",
    statLabel: "Average savings",
  },
  {
    icon: Globe2,
    title: "Global Content at Your Fingertips",
    description: "50+ countries, 50+ languages. Watch UK, US, Arabic, French, German, Spanish, Italian, Indian, and more. No other service offers this breadth of international content.",
    stat: "50+",
    statLabel: "Countries covered",
  },
  {
    icon: Layers,
    title: "Enterprise-Grade Infrastructure",
    description: "Unlike cheap providers, we operate multiple redundant servers across global data centers. 99.9% uptime means your channels are always available when you need them.",
    stat: "99.9%",
    statLabel: "Server uptime",
  },
  {
    icon: HeartHandshake,
    title: "Real Human Support, Always",
    description: "Our expert team responds on WhatsApp 24/7 — usually within 5 minutes. We help with setup, troubleshooting, and any question you have. No bots, no wait queues.",
    stat: "<5min",
    statLabel: "Avg. response time",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-medium mb-4">
            Why We&apos;re Different
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
            Why Choose{" "}
            <span className="gradient-text">Exact IPTV</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg px-2 sm:px-0">
            In a market full of unreliable providers, we stand out with premium quality, genuine support, and unbeatable value.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group glass rounded-2xl p-5 sm:p-8 border border-white/5 hover:border-purple-500/20 transition-all duration-300 active:scale-[0.99]"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Stat + icon */}
                  <div className="flex-shrink-0 text-center">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-600/20 to-purple-600/10 border border-purple-500/20 flex items-center justify-center mb-2">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                    </div>
                    <div className="text-base sm:text-xl font-black gradient-text">{reason.stat}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 leading-tight">{reason.statLabel}</div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-2">{reason.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="mt-12 sm:mt-16 glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-white/5">
            <h3 className="text-white font-bold text-base sm:text-lg text-center">
              How We Compare to Traditional TV
            </h3>
          </div>
          <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full min-w-[420px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-400">Feature</th>
                  <th className="text-center px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-400">Sky TV</th>
                  <th className="text-center px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-400">Cable</th>
                  <th className="text-center px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold text-purple-400 bg-purple-500/5">Exact IPTV</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly Cost", "£80-120", "£50-80", "From €5.42"],
                  ["Live Channels", "~600", "~400", "50,000+"],
                  ["VOD Library", "Limited", "Limited", "100,000+"],
                  ["4K Content", "Extra cost", "Rare", "Included"],
                  ["Int'l Channels", "Limited", "Very limited", "50+ Countries"],
                  ["Devices", "1-2", "1-2", "5+"],
                  ["Contracts", "18-24 months", "12-24 months", "None"],
                  ["Watch Abroad", "❌", "❌", "✅"],
                ].map(([feature, sky, cable, iptv]) => (
                  <tr key={feature} className="border-b border-white/5 last:border-0">
                    <td className="px-4 sm:px-6 py-3 text-xs sm:text-sm text-gray-300 font-medium">{feature}</td>
                    <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-gray-500 text-center">{sky}</td>
                    <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-gray-500 text-center">{cable}</td>
                    <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-green-400 text-center font-semibold bg-purple-500/5">{iptv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
