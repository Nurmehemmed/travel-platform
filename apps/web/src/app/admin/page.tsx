"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  Users,
  MapPin,
  ExternalLink,
  Plus,
  Search,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  DollarSign,
  ArrowLeft,
  RefreshCw,
  Shield,
  Trash2,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Copy,
  Download,
  ScrollText,
  Activity,
  Eye,
  LogOut,
} from "lucide-react";

interface AuditLogItem {
  id: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  actorType?: string | null;
  actorRole?: string | null;
  actorEmail?: string | null;
  ipAddress?: string | null;
  metadata?: any;
  createdAt: string;
}

interface AdminStats {
  totalRevenue: number;
  totalBookings: number;
  pendingBookings: number;
  activeTours: number;
  totalUsers: number;
}

interface BookingItem {
  id: string;
  travelerCount: number;
  totalPrice: string;
  status: "pending" | "confirmed" | "cancelled" | "refunded";
  bookedAt: string;
  userName?: string | null;
  userEmail?: string | null;
  tourTitle?: string | null;
  tourId?: string | null;
}

interface TourItem {
  id: string;
  title: string;
  slug: string;
  destinationId: string;
  destinationName?: string | null;
  destinationCountry?: string | null;
  overview: string;
  coverImageUrl?: string | null;
  durationDays: number;
  durationNights: number;
  basePrice: string;
  promoPrice?: string | null;
  ratingAvg: string;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
}

interface UserItem {
  id: string;
  name?: string | null;
  email: string;
  role: string;
  image?: string | null;
  createdAt: string;
  bookingCount: number;
}

interface DestinationItem {
  id: string;
  name: string;
  country: string;
  slug: string;
  heroImageUrl?: string | null;
  tourCount: number;
}

interface VisaItem {
  id: string;
  applicationNumber: string;
  visaType: "standard" | "urgent";
  status: "received" | "submitted_to_govt" | "approved" | "rejected";
  nationality: string;
  passportType: string;
  arrivalDate: string;
  purposeOfVisit: string;
  stayAddress: string;
  surname: string;
  givenNames: string;
  gender: string;
  birthDate: string;
  birthCountry: string;
  birthPlace: string;
  occupation: string;
  phoneNumber: string;
  email: string;
  residentialAddress: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportScanUrl?: string | null;
  photoUrl?: string | null;
  govFee: string;
  serviceFee: string;
  totalAmount: string;
  paymentStatus: string;
  asanApplicationId?: string | null;
  evisaPdfUrl?: string | null;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

type TabType = "overview" | "tours" | "bookings" | "users" | "destinations" | "visas" | "audit";

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [stats, setStats] = useState<AdminStats>({
    totalRevenue: 0,
    totalBookings: 0,
    pendingBookings: 0,
    activeTours: 0,
    totalUsers: 0,
  });
  const [recentBookings, setRecentBookings] = useState<BookingItem[]>([]);
  const [tours, setTours] = useState<TourItem[]>([]);
  const [bookingsList, setBookingsList] = useState<BookingItem[]>([]);
  const [usersList, setUsersList] = useState<UserItem[]>([]);
  const [destinationsList, setDestinationsList] = useState<DestinationItem[]>([]);
  const [visasList, setVisasList] = useState<VisaItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("all");
  const [visaStatusFilter, setVisaStatusFilter] = useState<string>("all");
  const [auditEntityFilter, setAuditEntityFilter] = useState<string>("all");
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Visa Modal & Processing States
  const [selectedVisa, setSelectedVisa] = useState<VisaItem | null>(null);
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<VisaItem["status"]>("received");
  const [editAsanId, setEditAsanId] = useState("");
  const [editPdfUrl, setEditPdfUrl] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [visaUpdateLoading, setVisaUpdateLoading] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Tour Modal
  const [isNewTourOpen, setIsNewTourOpen] = useState(false);
  const [newTourTitle, setNewTourTitle] = useState("");
  const [newTourDestId, setNewTourDestId] = useState("");
  const [newTourOverview, setNewTourOverview] = useState("");
  const [newTourBasePrice, setNewTourBasePrice] = useState("");
  const [newTourPromoPrice, setNewTourPromoPrice] = useState("");
  const [newTourDays, setNewTourDays] = useState("1");
  const [newTourImage, setNewTourImage] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setRefreshing(true);
      const [statsRes, toursRes, bookingsRes, usersRes, destsRes, visasRes, auditRes] =
        await Promise.all([
          fetch("/api/admin/stats").then((r) => r.json()),
          fetch("/api/admin/tours").then((r) => r.json()),
          fetch("/api/admin/bookings").then((r) => r.json()),
          fetch("/api/admin/users").then((r) => r.json()),
          fetch("/api/admin/destinations").then((r) => r.json()),
          fetch("/api/admin/visas").then((r) => r.json()).catch(() => ({ visas: [] })),
          fetch("/api/admin/audit-logs?limit=100").then((r) => r.json()).catch(() => ({ logs: [] })),
        ]);

      if (statsRes?.stats) {
        setStats(statsRes.stats);
        setRecentBookings(statsRes.recentBookings || []);
      }
      if (toursRes?.tours) setTours(toursRes.tours);
      if (bookingsRes?.bookings) setBookingsList(bookingsRes.bookings);
      if (usersRes?.users) setUsersList(usersRes.users);
      if (visasRes?.visas) setVisasList(visasRes.visas);
      if (auditRes?.logs) setAuditLogs(auditRes.logs);
      if (destsRes?.destinations) {
        setDestinationsList(destsRes.destinations);
        if (destsRes.destinations.length > 0 && !newTourDestId) {
          setNewTourDestId(destsRes.destinations[0].id);
        }
      }
    } catch (err) {
      console.error("Admin data fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const showNotification = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  // Toggle Tour Active Status
  const handleToggleTourActive = async (tourId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/tours", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: tourId, isActive: !currentStatus }),
      });
      if (res.ok) {
        setTours((prev) =>
          prev.map((t) => (t.id === tourId ? { ...t, isActive: !currentStatus } : t))
        );
        showNotification(`Tour status set to ${!currentStatus ? "Active" : "Hidden"}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Tour
  const handleDeleteTour = async (tourId: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    try {
      const res = await fetch(`/api/admin/tours?id=${tourId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTours((prev) => prev.filter((t) => t.id !== tourId));
        showNotification("Tour deleted successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status: newStatus }),
      });
      if (res.ok) {
        setBookingsList((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus as any } : b))
        );
        // Refresh stats
        fetch("/api/admin/stats")
          .then((r) => r.json())
          .then((d) => d?.stats && setStats(d.stats));
        showNotification(`Booking updated to ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update User Role
  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      if (res.ok) {
        setUsersList((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        showNotification(`User role updated to ${newRole.toUpperCase()}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create New Tour Form Submit
  const handleCreateTour = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      const res = await fetch("/api/admin/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTourTitle,
          destinationId: newTourDestId,
          overview: newTourOverview,
          basePrice: newTourBasePrice,
          promoPrice: newTourPromoPrice || null,
          durationDays: newTourDays,
          coverImageUrl: newTourImage || null,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.tour) {
        setIsNewTourOpen(false);
        setNewTourTitle("");
        setNewTourOverview("");
        setNewTourBasePrice("");
        setNewTourPromoPrice("");
        setNewTourImage("");
        showNotification("New tour created successfully!");
        fetchAllData();
      } else {
        alert(data?.error || "Failed to create tour");
      }
    } catch (err: any) {
      alert(err?.message || "Error creating tour");
    } finally {
      setCreateLoading(false);
    }
  };

  // Open Visa Modal
  const handleOpenVisaModal = (visa: VisaItem) => {
    setSelectedVisa(visa);
    setEditStatus(visa.status);
    setEditAsanId(visa.asanApplicationId || "");
    setEditPdfUrl(visa.evisaPdfUrl || "");
    setEditNotes(visa.adminNotes || "");
    setIsVisaModalOpen(true);
  };

  // Save Visa Updates
  const handleUpdateVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisa) return;
    setVisaUpdateLoading(true);

    try {
      const res = await fetch("/api/admin/visas", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedVisa.id,
          status: editStatus,
          asanApplicationId: editAsanId.trim() || null,
          evisaPdfUrl: editPdfUrl.trim() || null,
          adminNotes: editNotes.trim() || null,
        }),
      });

      const data = await res.json();
      if (res.ok && data?.application) {
        setVisasList((prev) =>
          prev.map((v) => (v.id === selectedVisa.id ? { ...v, ...data.application } : v))
        );
        setIsVisaModalOpen(false);
        showNotification(`Visa ${selectedVisa.applicationNumber} updated to ${editStatus.toUpperCase()}`);
      } else {
        alert(data?.error || "Failed to update visa");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVisaUpdateLoading(false);
    }
  };

  // Copy Formatted Information for ASAN (evisa.gov.az)
  const handleCopyAsanFormat = (visa: VisaItem) => {
    const formatted = `--- ASAN VISA APPLICANT DATA (evisa.gov.az) ---
Reference: ${visa.applicationNumber}
Type: ${visa.visaType.toUpperCase()} (${visa.visaType === "urgent" ? "Urgent 3-Hour" : "Standard 3-Day"})
Nationality: ${visa.nationality}
Passport Type: ${visa.passportType}
Surname: ${visa.surname}
Given Names: ${visa.givenNames}
Gender: ${visa.gender}
Date of Birth: ${visa.birthDate}
Country of Birth: ${visa.birthCountry}
Place of Birth: ${visa.birthPlace}
Occupation: ${visa.occupation}
Phone: ${visa.phoneNumber}
Email: ${visa.email}
Permanent Address: ${visa.residentialAddress}
Stay Address in Azerbaijan: ${visa.stayAddress}
Passport Number: ${visa.passportNumber}
Issue Date: ${visa.passportIssueDate}
Expiry Date: ${visa.passportExpiryDate}
Arrival Date: ${visa.arrivalDate}
Purpose of Visit: ${visa.purposeOfVisit}`;

    navigator.clipboard.writeText(formatted);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
    showNotification("Copied applicant details for evisa.gov.az!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: "#f8f5f0" }}>
      {/* ═══════════════════════════════════════════════════════ SIDEBAR */}
      <aside
        className="w-full md:w-64 shrink-0 flex flex-col justify-between border-r shadow-sm md:min-h-screen"
        style={{ backgroundColor: "#133e35", borderColor: "rgba(201, 162, 39, 0.2)" }}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full shadow-md"
                style={{ backgroundColor: "#c9a227" }}
              >
                <MapPin className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight block text-[#c9a227] leading-tight">
                  addmetour
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
                  Admin Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "tours", label: "Tours & Packages", icon: Compass, count: tours.length },
              {
                id: "bookings",
                label: "Bookings",
                icon: CalendarCheck,
                badge: stats.pendingBookings > 0 ? `${stats.pendingBookings} New` : undefined,
              },
              {
                id: "visas",
                label: "e-Visa Processing",
                icon: FileText,
                badge:
                  visasList.filter((v) => v.status === "received").length > 0
                    ? `${visasList.filter((v) => v.status === "received").length} New`
                    : undefined,
                count: visasList.length,
              },
              { id: "users", label: "Users & Staff", icon: Users, count: usersList.length },
              { id: "destinations", label: "Destinations", icon: MapPin, count: destinationsList.length },
              { id: "audit", label: "Audit Trail", icon: ScrollText, count: auditLogs.length > 0 ? auditLogs.length : undefined },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setSearchQuery("");
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "text-slate-900 shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  style={isActive ? { backgroundColor: "#c9a227" } : {}}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? "text-slate-900" : "text-[#c9a227]"}`} />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-900">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && !tab.badge && (
                    <span className="text-[11px] text-white/40 font-normal">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Back to Site */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: "#c9a227" }}
            >
              ADM
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">Admin Team</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Live on Neon DB
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Live Site
          </Link>

          <button
            onClick={async () => {
              await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
              });
              window.location.href = "/";
            }}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-100 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════ MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header
          className="h-16 px-6 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.85)", borderColor: "#e5ded4" }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-slate-900 capitalize font-display">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "tours" && "Tours & Experiences Management"}
              {activeTab === "bookings" && "Customer Bookings & Reservations"}
              {activeTab === "visas" && "e-Visa Operations & Fulfillment Queue"}
              {activeTab === "users" && "User & Staff Directory"}
              {activeTab === "destinations" && "Destinations & Regions"}
              {activeTab === "audit" && "System Audit Trail & Security Logs"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#c9a227] ${refreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </button>

            {activeTab === "visas" && (
              <a
                href="https://evisa.gov.az/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#133e35" }}
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#c9a227]" />
                Open Official evisa.gov.az
              </a>
            )}

            {activeTab === "tours" && (
              <button
                onClick={() => setIsNewTourOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: "#133e35" }}
              >
                <Plus className="h-4 w-4 text-[#c9a227]" />
                Add New Tour
              </button>
            )}
          </div>
        </header>

        {/* Notification Toast */}
        {actionSuccess && (
          <div className="m-6 mb-0 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Content Container */}
        <div className="p-6 md:p-8 space-y-8 flex-1">
          {/* ═══════════════════════════════════════════════════════ TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div
                  className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
                  style={{ borderColor: "#e8dfd5" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Total Revenue
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <DollarSign className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                      ${stats.totalRevenue.toFixed(2)}
                    </h3>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> From confirmed bookings
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
                  style={{ borderColor: "#e8dfd5" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Total Bookings
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <CalendarCheck className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                      {stats.totalBookings}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1">Across all travel seasons</p>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
                  style={{ borderColor: stats.pendingBookings > 0 ? "#f59e0b" : "#e8dfd5" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Pending Action
                    </span>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: stats.pendingBookings > 0 ? "#fef3c7" : "#f1f5f9" }}
                    >
                      <Clock
                        className={`h-4 w-4 ${
                          stats.pendingBookings > 0 ? "text-amber-600" : "text-slate-400"
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                      {stats.pendingBookings}
                    </h3>
                    <p
                      className={`text-[11px] font-semibold mt-1 ${
                        stats.pendingBookings > 0 ? "text-amber-600" : "text-slate-500"
                      }`}
                    >
                      {stats.pendingBookings > 0 ? "Needs employer confirmation" : "All up to date"}
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
                  style={{ borderColor: "#e8dfd5" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Active Tours
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                      <Compass className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                      {stats.activeTours} / {tours.length}
                    </h3>
                    <p className="text-[11px] text-purple-600 font-semibold mt-1">
                      Published on site
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Bookings Stream */}
              <div
                className="rounded-2xl border bg-white shadow-sm overflow-hidden"
                style={{ borderColor: "#e8dfd5" }}
              >
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-base text-slate-900 font-display">
                      Recent Customer Bookings
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Live reservation requests from travelers
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs font-semibold text-[#c9a227] hover:underline cursor-pointer"
                  >
                    View all bookings →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-3.5">Customer</th>
                        <th className="px-6 py-3.5">Tour Experience</th>
                        <th className="px-6 py-3.5">Guests</th>
                        <th className="px-6 py-3.5">Total</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentBookings.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                            No recent bookings found.
                          </td>
                        </tr>
                      ) : (
                        recentBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-bold text-slate-900">{b.userName || "Guest"}</p>
                              <p className="text-[11px] text-slate-500">{b.userEmail}</p>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-800 max-w-[220px] truncate">
                              {b.tourTitle || "Custom Tour"}
                            </td>
                            <td className="px-6 py-4 text-slate-600">
                              {b.travelerCount} {b.travelerCount > 1 ? "Travelers" : "Traveler"}
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-900">
                              ${parseFloat(b.totalPrice).toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  b.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : b.status === "pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {b.status === "pending" ? (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, "confirmed")}
                                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                                >
                                  Confirm
                                </button>
                              ) : (
                                <span className="text-slate-400 text-[11px]">—</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════════ TAB: TOURS */}
          {activeTab === "tours" && (
            <div
              className="rounded-2xl border bg-white shadow-sm overflow-hidden"
              style={{ borderColor: "#e8dfd5" }}
            >
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-base text-slate-900 font-display">
                    All Tours & Experiences ({tours.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage tour catalog, pricing, durations, and public visibility
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search tours..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#133e35]"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3.5">Tour Details</th>
                      <th className="px-6 py-3.5">Destination</th>
                      <th className="px-6 py-3.5">Duration</th>
                      <th className="px-6 py-3.5">Pricing</th>
                      <th className="px-6 py-3.5">Rating</th>
                      <th className="px-6 py-3.5">Site Visibility</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tours
                      .filter(
                        (t) =>
                          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.overview.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                {t.coverImageUrl ? (
                                  <img
                                    src={t.coverImageUrl}
                                    alt={t.title}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "/images/baku-old-city.jpg";
                                    }}
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center bg-slate-200 text-slate-400">
                                    <Compass className="h-5 w-5" />
                                  </div>
                                )}
                              </div>
                              <div className="max-w-xs">
                                <p className="font-bold text-slate-900 leading-tight">
                                  {t.title}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                  {t.overview}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                              style={{ backgroundColor: "#f5ede0", color: "#133e35" }}
                            >
                              {t.destinationName || "Azerbaijan"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-600">
                            {t.durationDays} {t.durationDays > 1 ? "Days" : "Day"}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">
                              ${parseFloat(t.promoPrice || t.basePrice).toFixed(2)}
                            </p>
                            {t.promoPrice && (
                              <p className="text-[10px] text-slate-400 line-through">
                                ${parseFloat(t.basePrice).toFixed(2)}
                              </p>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900">★ {t.ratingAvg}</span>
                            <span className="text-slate-400 text-[10px] ml-1">
                              ({t.reviewCount})
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleTourActive(t.id, t.isActive)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                                t.isActive
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  t.isActive ? "bg-emerald-600" : "bg-slate-400"
                                }`}
                              />
                              {t.isActive ? "Active (Live)" : "Hidden"}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteTour(t.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Tour"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ TAB: BOOKINGS */}
          {activeTab === "bookings" && (
            <div
              className="rounded-2xl border bg-white shadow-sm overflow-hidden"
              style={{ borderColor: "#e8dfd5" }}
            >
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-base text-slate-900 font-display">
                    Reservations & Bookings ({bookingsList.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review and confirm incoming bookings from travelers
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {["all", "pending", "confirmed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                        bookingStatusFilter === st
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3.5">Booking ID</th>
                      <th className="px-6 py-3.5">Customer</th>
                      <th className="px-6 py-3.5">Tour Experience</th>
                      <th className="px-6 py-3.5">Travelers</th>
                      <th className="px-6 py-3.5">Amount</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right">Change Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookingsList
                      .filter(
                        (b) =>
                          bookingStatusFilter === "all" ||
                          b.status === bookingStatusFilter
                      )
                      .map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-6 py-4 font-mono text-slate-400 text-[11px]">
                            #{b.id.slice(0, 8)}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">{b.userName || "Traveler"}</p>
                            <p className="text-[11px] text-slate-500">{b.userEmail}</p>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-800 max-w-[200px] truncate">
                            {b.tourTitle || "Custom Guided Tour"}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {b.travelerCount} Guests
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">
                            ${parseFloat(b.totalPrice).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                b.status === "confirmed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : b.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 outline-none focus:border-[#133e35] cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ TAB: USERS */}
          {activeTab === "users" && (
            <div
              className="rounded-2xl border bg-white shadow-sm overflow-hidden"
              style={{ borderColor: "#e8dfd5" }}
            >
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-base text-slate-900 font-display">
                    User & Staff Directory ({usersList.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    View registered users, employee roles, and booking engagement
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3.5">User</th>
                      <th className="px-6 py-3.5">Email</th>
                      <th className="px-6 py-3.5">Role</th>
                      <th className="px-6 py-3.5">Bookings Placed</th>
                      <th className="px-6 py-3.5">Joined Date</th>
                      <th className="px-6 py-3.5 text-right">Assign Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                              style={{
                                backgroundColor: u.role === "admin" ? "#133e35" : "#c9a227",
                              }}
                            >
                              {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-slate-900">{u.name || "Traveler"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-[11px]">
                          {u.email}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.role === "admin"
                                ? "bg-purple-100 text-purple-900"
                                : u.role === "agent"
                                ? "bg-blue-100 text-blue-900"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-800">
                          {u.bookingCount || 0}
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 outline-none focus:border-[#133e35] cursor-pointer"
                          >
                            <option value="customer">Customer</option>
                            <option value="agent">Agent</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ TAB: DESTINATIONS */}
          {activeTab === "destinations" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {destinationsList.map((d) => (
                  <div
                    key={d.id}
                    className="rounded-2xl border bg-white overflow-hidden shadow-sm flex flex-col justify-between"
                    style={{ borderColor: "#e8dfd5" }}
                  >
                    <div className="relative h-44 w-full bg-slate-100">
                      {d.heroImageUrl && (
                        <Image
                          src={d.heroImageUrl}
                          alt={d.name}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 text-white">
                        <h3 className="font-bold text-lg font-display">{d.name}</h3>
                        <p className="text-xs text-white/70">{d.country}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">
                        {d.tourCount} Active Tours
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        /{d.slug}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ TAB: VISAS */}
          {activeTab === "visas" && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#e8dfd5] shadow-sm">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Visa Orders</span>
                  <p className="text-2xl font-bold font-display text-slate-900 mt-1">{visasList.length}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e8dfd5] shadow-sm">
                  <span className="text-[11px] font-semibold text-amber-600 uppercase">New / Need Review</span>
                  <p className="text-2xl font-bold font-display text-amber-600 mt-1">
                    {visasList.filter((v) => v.status === "received").length}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e8dfd5] shadow-sm">
                  <span className="text-[11px] font-semibold text-red-600 uppercase">⚡ Urgent 3-Hour Visas</span>
                  <p className="text-2xl font-bold font-display text-red-600 mt-1">
                    {visasList.filter((v) => v.visaType === "urgent").length}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e8dfd5] shadow-sm">
                  <span className="text-[11px] font-semibold text-emerald-600 uppercase">Approved & Delivered</span>
                  <p className="text-2xl font-bold font-display text-emerald-600 mt-1">
                    {visasList.filter((v) => v.status === "approved").length}
                  </p>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="p-4 rounded-2xl bg-white border border-[#e8dfd5] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-80 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2">
                  <Search className="h-4 w-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search applicant, ref, passport..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-800 outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  {["all", "received", "submitted_to_govt", "approved", "rejected"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setVisaStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                        visaStatusFilter === st
                          ? "bg-[#133e35] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st === "all"
                        ? "All Visas"
                        : st === "submitted_to_govt"
                        ? "In Gov Review"
                        : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visas Table */}
              <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#e8dfd5" }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Ref & Speed</th>
                        <th className="py-3.5 px-4">Applicant Details</th>
                        <th className="py-3.5 px-4">Passport No</th>
                        <th className="py-3.5 px-4">Arrival Date</th>
                        <th className="py-3.5 px-4">Total Fee</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {visasList
                        .filter((v) => {
                          const matchesFilter =
                            visaStatusFilter === "all" || v.status === visaStatusFilter;
                          const q = searchQuery.toLowerCase().trim();
                          const matchesSearch =
                            q === "" ||
                            v.applicationNumber.toLowerCase().includes(q) ||
                            v.surname.toLowerCase().includes(q) ||
                            v.givenNames.toLowerCase().includes(q) ||
                            v.passportNumber.toLowerCase().includes(q) ||
                            v.nationality.toLowerCase().includes(q) ||
                            v.email.toLowerCase().includes(q);
                          return matchesFilter && matchesSearch;
                        })
                        .map((visa) => (
                          <tr key={visa.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <span className="font-mono font-bold text-slate-900 block">
                                {visa.applicationNumber}
                              </span>
                              <span
                                className={`inline-block text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 mt-0.5 ${
                                  visa.visaType === "urgent"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {visa.visaType === "urgent" ? "⚡ Urgent (3h)" : "Standard (3d)"}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-900 block">
                                {visa.surname} {visa.givenNames}
                              </span>
                              <span className="text-slate-500 block text-[11px]">
                                {visa.nationality} &middot; {visa.email}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 font-mono">
                              <span className="font-bold text-slate-800 block">{visa.passportNumber}</span>
                              <span className="text-[10px] text-slate-400">Exp: {visa.passportExpiryDate}</span>
                            </td>

                            <td className="py-3.5 px-4 font-medium text-slate-800">
                              {visa.arrivalDate}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-900 block">${visa.totalAmount}</span>
                              {visa.paymentStatus === "paid" ? (
                                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded mt-0.5">
                                  ✓ Paid
                                </span>
                              ) : (
                                <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mt-0.5">
                                  Pending
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              {visa.status === "received" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                                  <Clock className="h-3 w-3" /> New
                                </span>
                              )}
                              {visa.status === "submitted_to_govt" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-1 text-[11px] font-bold text-blue-800">
                                  <Clock className="h-3 w-3" /> In Gov Review
                                </span>
                              )}
                              {visa.status === "approved" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                                  <CheckCircle2 className="h-3 w-3" /> Approved
                                </span>
                              )}
                              {visa.status === "rejected" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-[11px] font-bold text-red-800">
                                  <AlertCircle className="h-3 w-3" /> Rejected
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleCopyAsanFormat(visa)}
                                  title="Copy Formatted Data for evisa.gov.az"
                                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleOpenVisaModal(visa)}
                                  className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                                  style={{ backgroundColor: "#133e35" }}
                                >
                                  Process & Update
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {visasList.length === 0 && (
                    <div className="py-12 text-center text-xs text-slate-500">
                      No visa applications received yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ AUDIT TRAIL TAB */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              {/* Header Context Banner */}
              <div
                className="rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                style={{ backgroundColor: "#133e35" }}
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c9a227]">
                    <Shield className="h-4 w-4" />
                    Security & Compliance Audit Trail
                  </div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Immutable System Activity & Event Logs
                  </h2>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Permanent record of critical operations: visa submissions, government sync updates, payment confirmations, and admin logins. All customer PII is automatically redacted.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
                  <button
                    onClick={fetchAllData}
                    disabled={refreshing}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/15"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 text-[#c9a227] ${refreshing ? "animate-spin" : ""}`} />
                    Refresh Logs
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl p-4 bg-white border border-[#e5ded4] shadow-sm">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    Total Logged Events
                  </div>
                  <div className="mt-1 text-2xl font-bold text-slate-900 font-display">
                    {auditLogs.length}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">Stored in Neon DB</div>
                </div>

                <div className="rounded-2xl p-4 bg-white border border-[#e5ded4] shadow-sm">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    e-Visa Actions
                  </div>
                  <div className="mt-1 text-2xl font-bold text-slate-900 font-display">
                    {auditLogs.filter((l) => l.entityType === "visa").length}
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-600 font-medium">Submissions & Status Changes</div>
                </div>

                <div className="rounded-2xl p-4 bg-white border border-[#e5ded4] shadow-sm">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    Payments
                  </div>
                  <div className="mt-1 text-2xl font-bold text-slate-900 font-display">
                    {auditLogs.filter((l) => l.entityType === "payment").length}
                  </div>
                  <div className="mt-1 text-[11px] text-blue-600 font-medium">Gateway Confirmations</div>
                </div>

                <div className="rounded-2xl p-4 bg-white border border-[#e5ded4] shadow-sm">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    Auth & Security
                  </div>
                  <div className="mt-1 text-2xl font-bold text-slate-900 font-display">
                    {auditLogs.filter((l) => l.entityType === "user" || l.action.startsWith("auth")).length}
                  </div>
                  <div className="mt-1 text-[11px] text-amber-600 font-medium">Admin & User Logins</div>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="rounded-2xl bg-white border border-[#e5ded4] p-4 shadow-sm space-y-3">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  {/* Entity Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                    {[
                      { id: "all", label: "All Events" },
                      { id: "visa", label: "e-Visa" },
                      { id: "payment", label: "Payments" },
                      { id: "user", label: "Auth & Users" },
                      { id: "tour", label: "Tours" },
                    ].map((btn) => {
                      const isSel = auditEntityFilter === btn.id;
                      return (
                        <button
                          key={btn.id}
                          onClick={() => setAuditEntityFilter(btn.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                            isSel
                              ? "bg-slate-900 text-white shadow-sm"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[240px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search action, entity ID, email, IP..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#133e35]"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Audit Logs Table */}
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                      <tr>
                        <th className="py-3 px-4">Timestamp (UTC)</th>
                        <th className="py-3 px-4">Action</th>
                        <th className="py-3 px-4">Entity</th>
                        <th className="py-3 px-4">Actor</th>
                        <th className="py-3 px-4">IP Address</th>
                        <th className="py-3 px-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {auditLogs
                        .filter((log) => {
                          if (auditEntityFilter !== "all" && log.entityType !== auditEntityFilter) {
                            return false;
                          }
                          if (!searchQuery) return true;
                          const q = searchQuery.toLowerCase();
                          return (
                            log.action.toLowerCase().includes(q) ||
                            log.entityType.toLowerCase().includes(q) ||
                            (log.entityId && log.entityId.toLowerCase().includes(q)) ||
                            (log.actorEmail && log.actorEmail.toLowerCase().includes(q)) ||
                            (log.ipAddress && log.ipAddress.toLowerCase().includes(q))
                          );
                        })
                        .map((log) => {
                          const isExpanded = expandedLogId === log.id;
                          const actionBadgeClass =
                            log.action.includes("failed") || log.action.includes("rejected")
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : log.action.includes("approved") ||
                                log.action.includes("confirmed") ||
                                log.action.includes("success")
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : log.action.includes("status_changed") || log.action.includes("updated")
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200";

                          return (
                            <tbody key={log.id} className="group">
                              <tr className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                                  {new Date(log.createdAt).toLocaleString("en-GB", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  })}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${actionBadgeClass}`}
                                  >
                                    {log.action}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-semibold text-slate-900 capitalize">
                                    {log.entityType}
                                  </div>
                                  {log.entityId && (
                                    <div className="text-[11px] font-mono text-slate-500 truncate max-w-[140px]">
                                      {log.entityId}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 text-slate-700 mr-1.5">
                                    {log.actorRole || log.actorType || "system"}
                                  </span>
                                  <span className="text-slate-700 text-xs">
                                    {log.actorEmail || "Anonymous / System"}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                                  {log.ipAddress || log.metadata?.ipAddress || "—"}
                                </td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                                    className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <Eye className="h-3 w-3 text-slate-400" />
                                    {isExpanded ? "Hide" : "Inspect"}
                                  </button>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr className="bg-slate-900 text-slate-200">
                                  <td colSpan={6} className="p-4">
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                                        <span className="font-mono">Log ID: {log.id}</span>
                                        <span className="text-amber-400 font-medium">PII-Redacted Payload</span>
                                      </div>
                                      <pre className="text-[11px] font-mono bg-slate-950 p-3 rounded-lg overflow-x-auto text-emerald-300">
                                        {JSON.stringify(log.metadata || {}, null, 2)}
                                      </pre>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          );
                        })}
                    </tbody>
                  </table>

                  {auditLogs.length === 0 && (
                    <div className="py-12 text-center text-xs text-slate-500">
                      No audit events recorded yet. Perform actions like submitting or processing visas to see audit trails here.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════ MODAL: CREATE TOUR */}
      {isNewTourOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsNewTourOpen(false);
          }}
          role="dialog"
        >
          <div
            className="relative w-full max-w-[520px] rounded-3xl p-8 shadow-2xl animate-scale-up"
            style={{ backgroundColor: "#faf7f2", border: "1px solid #e8dfd5" }}
          >
            <button
              onClick={() => setIsNewTourOpen(false)}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Add New Tour Package
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Publish a new travel experience directly to the live website catalog
            </p>

            <form onSubmit={handleCreateTour} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tour Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Khinalug High Mountain Expedition"
                  value={newTourTitle}
                  onChange={(e) => setNewTourTitle(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#133e35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination</label>
                  <select
                    value={newTourDestId}
                    onChange={(e) => setNewTourDestId(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none focus:border-[#133e35]"
                  >
                    {destinationsList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}, {d.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTourDays}
                    onChange={(e) => setNewTourDays(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#133e35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="99.00"
                    value={newTourBasePrice}
                    onChange={(e) => setNewTourBasePrice(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#133e35]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Promo Price ($, optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="79.00"
                    value={newTourPromoPrice}
                    onChange={(e) => setNewTourPromoPrice(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#133e35]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cover Image URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newTourImage}
                  onChange={(e) => setNewTourImage(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#133e35]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Overview Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the highlights and itinerary..."
                  value={newTourOverview}
                  onChange={(e) => setNewTourOverview(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#133e35]"
                />
              </div>

              <button
                type="submit"
                disabled={createLoading}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity mt-2 cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#133e35" }}
              >
                {createLoading ? "Creating Tour..." : "Publish Tour Experience"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ MODAL: PROCESS VISA */}
      {isVisaModalOpen && selectedVisa && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsVisaModalOpen(false);
          }}
          role="dialog"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-up"
            style={{ backgroundColor: "#faf7f2", border: "1px solid #e8dfd5" }}
          >
            <button
              onClick={() => setIsVisaModalOpen(false)}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-sm text-[#133e35]">
                {selectedVisa.applicationNumber}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${
                  selectedVisa.visaType === "urgent" ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-700"
                }`}
              >
                {selectedVisa.visaType === "urgent" ? "⚡ Urgent (3h)" : "Standard (3d)"}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Process e-Visa Application
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Review applicant passport data, copy information for submission to evisa.gov.az, and attach approved e-Visa PDF.
            </p>

            {/* Side-by-Side Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Column: Applicant Bio Data */}
              <div className="p-4 rounded-2xl bg-white border border-[#e2d8cc] text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">Applicant Bio Data</span>
                  <button
                    onClick={() => handleCopyAsanFormat(selectedVisa)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#133e35] hover:underline cursor-pointer"
                  >
                    <Copy className="h-3 w-3" />
                    Copy for ASAN
                  </button>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Full Name</span>
                  <span className="font-bold text-slate-800">{selectedVisa.surname} {selectedVisa.givenNames}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Nationality</span>
                    <span className="font-semibold text-slate-800">{selectedVisa.nationality}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Gender</span>
                    <span className="font-semibold text-slate-800">{selectedVisa.gender}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Birth Date</span>
                    <span className="font-semibold text-slate-800">{selectedVisa.birthDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Birth Place</span>
                    <span className="font-semibold text-slate-800">{selectedVisa.birthPlace}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Passport No</span>
                    <span className="font-mono font-bold text-slate-900">{selectedVisa.passportNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Expiry Date</span>
                    <span className="font-mono text-slate-800">{selectedVisa.passportExpiryDate}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Contact</span>
                  <span className="text-slate-800 block">{selectedVisa.email}</span>
                  <span className="text-slate-800 block">{selectedVisa.phoneNumber}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Stay Address in Azerbaijan</span>
                  <span className="text-slate-800 block">{selectedVisa.stayAddress}</span>
                </div>

                {selectedVisa.passportScanUrl && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium mb-1">Passport Scan / Photo</span>
                    <a
                      href={selectedVisa.passportScanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#133e35] hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Uploaded Document
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column: Update Status Form */}
              <form onSubmit={handleUpdateVisa} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Application Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none font-semibold cursor-pointer"
                  >
                    <option value="received">Received / New Verification</option>
                    <option value="submitted_to_govt">Submitted to evisa.gov.az (In Review)</option>
                    <option value="approved">Approved & Visa Issued</option>
                    <option value="rejected">Rejected / Action Needed</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    ASAN Government Reference ID (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ASAN-984128"
                    value={editAsanId}
                    onChange={(e) => setEditAsanId(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Reference number generated on evisa.gov.az</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Approved e-Visa PDF Download URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://.../approved-visa.pdf"
                    value={editPdfUrl}
                    onChange={(e) => setEditPdfUrl(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">URL will be provided to traveler on tracking page</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Officer Notes (Visible to Traveler)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Application submitted to ASAN Visa portal at 14:30."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={visaUpdateLoading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#133e35" }}
                  >
                    {visaUpdateLoading ? "Updating Application..." : "Save & Update Status"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
