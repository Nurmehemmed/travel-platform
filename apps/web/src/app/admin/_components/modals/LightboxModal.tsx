"use client";

import React from "react";
import { X, Download } from "lucide-react";
import { LightboxImage, AdminLanguage } from "../types";

interface LightboxModalProps {
  lightboxImage: LightboxImage | null;
  onClose: () => void;
  language: AdminLanguage;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  lightboxImage,
  onClose,
  language,
}) => {
  if (!lightboxImage) return null;

  return (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => onClose()}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 text-white">
              <span className="font-semibold text-xs tracking-wide truncate max-w-md">
                {lightboxImage.title}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />{" "}
                  {language === "AZ" ? "Tam Ölçüdə ↗" : "Full Resolution ↗"}
                </a>
                <button
                  onClick={() => onClose()}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative w-full h-[70vh] bg-black/50 flex items-center justify-center p-4">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
  );
};
