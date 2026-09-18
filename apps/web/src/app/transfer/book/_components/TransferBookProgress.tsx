"use client";

import React from "react";
import { Check } from "lucide-react";

interface TransferBookProgressProps {
  step: 1 | 2 | 3 | 4;
  tb: any;
}

export const TransferBookProgress: React.FC<TransferBookProgressProps> = ({ step, tb }) => {
  return (
    <div className="mb-8 rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-sky-100">
      <div className="flex items-center justify-between relative">
        {/* Background connecting track */}
        <div className="absolute top-[18px] left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 -translate-y-1/2 z-0 hidden sm:block" />
        {/* Active completed progress fill */}
        <div
          className="absolute top-[18px] left-[12.5%] h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500 hidden sm:block"
          style={{
            width: `${((Math.min(step, 4) - 1) / 3) * 75}%`,
          }}
        />
        {[
          { num: 1, title: tb.step1Nav },
          { num: 2, title: tb.step2Nav },
          { num: 3, title: tb.step3Nav },
          { num: 4, title: tb.step4Nav },
        ].map((s) => {
          const isDone = step > s.num;
          const isCurrent = step === s.num;
          return (
            <div key={s.num} className="relative z-10 flex flex-col items-center flex-1">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all shadow-sm ${
                  isDone
                    ? "bg-emerald-500 text-white shadow-emerald-200"
                    : isCurrent
                    ? "bg-sky-600 text-white shadow-sky-200 ring-4 ring-sky-100"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : s.num}
              </div>
              <span
                className={`mt-2 text-center text-[11px] sm:text-xs font-medium transition-colors ${
                  isCurrent ? "text-sky-700 font-bold" : isDone ? "text-slate-700" : "text-slate-400"
                }`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
