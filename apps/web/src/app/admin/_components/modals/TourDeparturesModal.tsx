"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  ShieldCheck,
  Plus,
  Sparkles,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import type { TourItem } from "../types";

interface TourDeparturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: TourItem | null;
}

export function TourDeparturesModal({
  isOpen,
  onClose,
  tour,
}: TourDeparturesModalProps) {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // New slot form state
  const [newDate, setNewDate] = useState("");
  const [newSeats, setNewSeats] = useState(12);
  const [newMinPax, setNewMinPax] = useState(4);
  const [newIsGuaranteed, setNewIsGuaranteed] = useState(true);
  const [newMeetingTime, setNewMeetingTime] = useState("09:00 AM");

  useEffect(() => {
    if (isOpen && tour) {
      fetchSlots();
    } else {
      setSlots([]);
      setShowAddForm(false);
      setFeedbackMsg(null);
    }
  }, [isOpen, tour]);

  const fetchSlots = async () => {
    if (!tour) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/tours/departures?packageId=${encodeURIComponent(tour.id)}`);
      const data = await res.json();
      if (data.slots) {
        setSlots(data.slots);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleBulkGenerate = async () => {
    if (!tour) return;
    setGenerating(true);
    setFeedbackMsg(null);
    try {
      const res = await fetch("/api/admin/tours/departures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "bulk_generate",
          packageId: tour.id,
          options: {
            weeksAhead: 8,
            daysOfWeek: [2, 6], // Tuesdays & Saturdays
            totalSeats: 12,
            minParticipants: 4,
            isGuaranteed: true,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg({ text: data.message || "Guaranteed departures generated!", type: "success" });
        await fetchSlots();
      } else {
        setFeedbackMsg({ text: data.error || "Generation failed", type: "error" });
      }
    } catch {
      setFeedbackMsg({ text: "Failed to generate schedule", type: "error" });
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleGuarantee = async (slotId: string, currentVal: boolean) => {
    try {
      const res = await fetch("/api/admin/tours/departures", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId,
          isGuaranteed: !currentVal,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSlots((prev) =>
          prev.map((s) => (s.id === slotId ? { ...s, isGuaranteed: !currentVal } : s))
        );
      }
    } catch {
      // ignore
    }
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour || !newDate) return;

    try {
      const res = await fetch("/api/admin/tours/departures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: tour.id,
          departureDate: newDate,
          totalSeats: newSeats,
          minParticipants: newMinPax,
          isGuaranteed: newIsGuaranteed,
          meetingTime: newMeetingTime,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg({ text: "New departure slot added successfully", type: "success" });
        setShowAddForm(false);
        setNewDate("");
        await fetchSlots();
      } else {
        setFeedbackMsg({ text: data.error || "Failed to add slot", type: "error" });
      }
    } catch {
      setFeedbackMsg({ text: "Failed to add slot", type: "error" });
    }
  };

  if (!isOpen || !tour) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-[#061225] to-[#0f3460] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-emerald-400 border border-white/15">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white font-display">
                  Guaranteed Departures & Capacity
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {slots.length} Active Slots
                </span>
              </div>
              <p className="text-xs text-blue-100/80 truncate max-w-md mt-0.5">
                {tour.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Controls Banner */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkGenerate}
              disabled={generating}
              className="px-3.5 py-1.5 rounded-xl bg-[#0f3460] hover:bg-[#1a4a80] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{generating ? "Generating..." : "⚡ Generate 8-Week Schedule (Tue/Sat)"}</span>
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{showAddForm ? "Cancel" : "Add Single Date"}</span>
            </button>
          </div>

          <button
            onClick={fetchSlots}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" /> Refresh
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div
            className={`mx-5 mt-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              feedbackMsg.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedbackMsg.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Add Slot Form Modal Dropdown */}
        {showAddForm && (
          <form
            onSubmit={handleAddSlot}
            className="m-5 p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 animate-fade-in"
          >
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Create New Departure Slot
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Departure Date *
                </label>
                <input
                  type="date"
                  required
                  value={newDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Total Seats
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={newSeats}
                  onChange={(e) => setNewSeats(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Min Pax Threshold
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={newMinPax}
                  onChange={(e) => setNewMinPax(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Meeting Time
                </label>
                <input
                  type="text"
                  value={newMeetingTime}
                  onChange={(e) => setNewMeetingTime(e.target.value)}
                  placeholder="09:00 AM"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newIsGuaranteed}
                  onChange={(e) => setNewIsGuaranteed(e.target.checked)}
                  className="rounded text-[#0f3460]"
                />
                <span>Mark 100% Guaranteed from day 1</span>
              </label>

              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-[#0f3460] text-white text-xs font-bold hover:bg-[#1a4a80] transition-colors"
              >
                Save Departure Slot
              </button>
            </div>
          </form>
        )}

        {/* Departures Table */}
        <div className="overflow-y-auto flex-1 p-5">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading departures...</div>
          ) : slots.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Calendar className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">
                No active departure slots in database for this tour yet.
              </p>
              <button
                onClick={handleBulkGenerate}
                disabled={generating}
                className="px-4 py-2 rounded-xl bg-[#0f3460] text-white text-xs font-bold shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Generate Guaranteed Schedule Now</span>
              </button>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Departure Date</th>
                  <th className="px-4 py-2.5">Time</th>
                  <th className="px-4 py-2.5">Capacity & Holds</th>
                  <th className="px-4 py-2.5">Min Pax</th>
                  <th className="px-4 py-2.5">Guarantee Status</th>
                  <th className="px-4 py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {slots.map((s) => {
                  const dateStr =
                    typeof s.departureDate === "string"
                      ? s.departureDate.split("T")[0]
                      : new Date(s.departureDate).toISOString().split("T")[0];
                  const avail = Number(s.availableSeats);
                  const total = Number(s.totalSeats);
                  const locked = Number(s.lockedSeats || 0);

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {dateStr}
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono">
                        {s.meetingTime || "09:00 AM"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              avail <= 3 ? "text-amber-600" : "text-emerald-700"
                            }`}
                          >
                            {avail} / {total} left
                          </span>
                          {locked > 0 && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-medium">
                              {locked} in cart
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-medium">
                        {s.minParticipants || 4} pax
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleGuarantee(s.id, s.isGuaranteed)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            s.isGuaranteed
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                          }`}
                        >
                          <ShieldCheck className="h-3 w-3" />
                          <span>{s.isGuaranteed ? "100% Guaranteed" : "Scheduled (Not Guar.)"}</span>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            avail <= 0 || s.status === "soldout"
                              ? "bg-red-100 text-red-700"
                              : s.status === "open"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {avail <= 0 ? "Sold Out" : s.status || "Open"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
