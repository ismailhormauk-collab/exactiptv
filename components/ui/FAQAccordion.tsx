"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/data/faq";

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2.5">
      {items.map((item, index) => (
        <div
          key={index}
          className={`glass rounded-xl border transition-all duration-200 overflow-hidden ${
            openIndex === index ? "border-purple-500/30" : "border-white/5"
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className={`text-sm font-semibold transition-colors ${openIndex === index ? "text-white" : "text-gray-200"}`}>
              {item.question}
            </span>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 text-purple-400 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-4">
              <div className="h-px bg-white/5 mb-3" />
              <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
