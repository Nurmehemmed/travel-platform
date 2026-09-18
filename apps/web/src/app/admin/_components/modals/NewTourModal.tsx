"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";
import { DestinationItem, AdminLanguage } from "../types";

interface NewTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: AdminLanguage;
  adminT: any;
  destinationsList: DestinationItem[];
  newTourTitle: string;
  setNewTourTitle: (val: string) => void;
  newTourDestId: string;
  setNewTourDestId: (val: string) => void;
  newTourOverview: string;
  setNewTourOverview: (val: string) => void;
  newTourBasePrice: string;
  setNewTourBasePrice: (val: string) => void;
  newTourPromoPrice: string;
  setNewTourPromoPrice: (val: string) => void;
  newTourDays: string;
  setNewTourDays: (val: string) => void;
  newTourImage: string;
  setNewTourImage: (val: string) => void;
  createLoading: boolean;
  handleCreateTour: (e: React.FormEvent) => void;
}

export const NewTourModal: React.FC<NewTourModalProps> = ({
  isOpen,
  onClose,
  language,
  adminT,
  destinationsList,
  newTourTitle,
  setNewTourTitle,
  newTourDestId,
  setNewTourDestId,
  newTourOverview,
  setNewTourOverview,
  newTourBasePrice,
  setNewTourBasePrice,
  newTourPromoPrice,
  setNewTourPromoPrice,
  newTourDays,
  setNewTourDays,
  newTourImage,
  setNewTourImage,
  createLoading,
  handleCreateTour,
}) => {
  if (!isOpen) return null;

  return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
        >
          <div
            className="relative w-full max-w-[520px] rounded-3xl p-8 shadow-2xl animate-scale-up"
            style={{ backgroundColor: "#f0f9ff", border: "1px solid #e0f2fe" }}
          >
            <button
              onClick={() => onClose()}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
              {language === "AZ" ? "Yeni Tur Paketi Əlavə Et" : "Add New Tour Package"}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {language === "AZ"
                ? "Yeni səyahət təcrübəsini birbaşa canlı sayt kataloqunda dərc edin"
                : "Publish a new travel experience directly to the live website catalog"}
            </p>

            <form onSubmit={handleCreateTour} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === "AZ" ? "Turun Adı" : "Tour Title"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Khinalug High Mountain Expedition"
                  value={newTourTitle}
                  onChange={(e) => setNewTourTitle(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "İstiqamət" : "Destination"}
                  </label>
                  <select
                    value={newTourDestId}
                    onChange={(e) => setNewTourDestId(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                  >
                    {destinationsList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}, {d.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "Müddət (Gün)" : "Duration (Days)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTourDays}
                    onChange={(e) => setNewTourDays(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "Baza Qiyməti ($)" : "Base Price ($)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="99.00"
                    value={newTourBasePrice}
                    onChange={(e) => setNewTourBasePrice(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Endirimli Qiymət ($, könüllü)"
                      : "Promo Price ($, optional)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="79.00"
                    value={newTourPromoPrice}
                    onChange={(e) => setNewTourPromoPrice(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === "AZ"
                    ? "Örtük Şəkli URL (könüllü)"
                    : "Cover Image URL (optional)"}
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newTourImage}
                  onChange={(e) => setNewTourImage(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === "AZ" ? "Ümumi Təsvir" : "Overview Description"}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    language === "AZ"
                      ? "Əsas məqamları və marşrutu təsvir edin..."
                      : "Describe the highlights and itinerary..."
                  }
                  value={newTourOverview}
                  onChange={(e) => setNewTourOverview(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                />
              </div>

              <button
                type="submit"
                disabled={createLoading}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity mt-2 cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#0f3460" }}
              >
                {createLoading
                  ? language === "AZ"
                    ? "Tur Yaradılır..."
                    : "Creating Tour..."
                  : language === "AZ"
                  ? "Tur Təcrübəsini Dərc Et"
                  : "Publish Tour Experience"}
              </button>
            </form>
          </div>
        </div>
  );
};
