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
  Car,
  MessageCircle,
  Sliders,
  Phone,
  Mail,
  Megaphone,
  Save,
} from "lucide-react";
import { StatsCardsSkeleton, TableSkeleton } from "@/components/Skeletons";

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

interface TransferItem {
  id: string;
  bookingNumber: string;
  direction: "arrival" | "departure" | "round_trip";
  airport: string;
  pickupZone: string;
  dropoffAddress: string;
  vehicleClass: string;
  flightNumber: string;
  flightDate: string;
  flightTime: string;
  returnFlightNumber?: string | null;
  returnDate?: string | null;
  returnTime?: string | null;
  passengerName: string;
  passengerCount: number;
  phoneNumber: string;
  email: string;
  luggageNotes?: string | null;
  distanceKm?: string | null;
  basePrice?: string | null;
  totalAmount: string;
  paymentMethod: "online" | "on_arrival";
  paymentStatus: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  driverName?: string | null;
  driverPhone?: string | null;
  adminNotes?: string | null;
  createdAt: string;
}

interface TourReservationItem {
  id: string;
  reservationNumber: string;
  tourId: string;
  tourTitle: string;
  tourDate: string;
  guests: number;
  travelerName: string;
  phoneNumber: string;
  price: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  guideName?: string | null;
  guidePhone?: string | null;
  adminNotes?: string | null;
  createdAt: string;
}

interface SiteSettingItem {
  key: string;
  value: any;
  category: string;
  label: string;
  description?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
}

type TabType = "overview" | "tours" | "bookings" | "users" | "destinations" | "visas" | "transfers" | "audit" | "settings";

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
  const [transfersList, setTransfersList] = useState<TransferItem[]>([]);
  const [tourReservationsList, setTourReservationsList] = useState<TourReservationItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  // Site Settings States
  const [settingsList, setSettingsList] = useState<SiteSettingItem[]>([]);
  const [settingsDraft, setSettingsDraft] = useState<Record<string, any>>({});
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsCategoryFilter, setSettingsCategoryFilter] = useState<string>("all");

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("all");
  const [tourResStatusFilter, setTourResStatusFilter] = useState<string>("all");
  const [visaStatusFilter, setVisaStatusFilter] = useState<string>("all");
  const [transferStatusFilter, setTransferStatusFilter] = useState<string>("all");
  const [auditEntityFilter, setAuditEntityFilter] = useState<string>("all");
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Lightbox Preview State
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  // Tour Reservation Modal State
  const [selectedTourRes, setSelectedTourRes] = useState<TourReservationItem | null>(null);
  const [isTourResModalOpen, setIsTourResModalOpen] = useState(false);
  const [editTourResStatus, setEditTourResStatus] = useState<TourReservationItem["status"]>("pending");
  const [editGuideName, setEditGuideName] = useState("");
  const [editGuidePhone, setEditGuidePhone] = useState("");
  const [editTourResNotes, setEditTourResNotes] = useState("");
  const [tourResUpdateLoading, setTourResUpdateLoading] = useState(false);

  // Transfer Modal & Dispatch States
  const [selectedTransfer, setSelectedTransfer] = useState<TransferItem | null>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [editTransferStatus, setEditTransferStatus] = useState<TransferItem["status"]>("pending");
  const [editTransferPaymentStatus, setEditTransferPaymentStatus] = useState("pending");
  const [editDriverName, setEditDriverName] = useState("");
  const [editDriverPhone, setEditDriverPhone] = useState("");
  const [editTransferNotes, setEditTransferNotes] = useState("");
  const [transferUpdateLoading, setTransferUpdateLoading] = useState(false);

  // Visa Modal & Processing States
  const [selectedVisa, setSelectedVisa] = useState<VisaItem | null>(null);
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<VisaItem["status"]>("received");
  const [editAsanId, setEditAsanId] = useState("");
  const [editPdfUrl, setEditPdfUrl] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [visaUpdateLoading, setVisaUpdateLoading] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  // SLA and Validity Helpers
  const getVisaSla = (visa: VisaItem) => {
    if (visa.visaType !== "urgent") {
      return <span className="text-[10px] text-slate-500 font-medium">Standard (3d)</span>;
    }
    if (visa.status === "approved") {
      return (
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          ✓ Fulfilled
        </span>
      );
    }
    if (visa.status === "rejected") {
      return (
        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          Rejected
        </span>
      );
    }
    const elapsedMinutes = Math.floor((Date.now() - new Date(visa.createdAt).getTime()) / 60000);
    const remaining = 180 - elapsedMinutes;
    if (remaining > 0) {
      return (
        <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1 animate-pulse">
          🔥 SLA: {remaining}m left
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
        🚨 SLA Overdue (+{Math.abs(remaining)}m)
      </span>
    );
  };

  const checkPassportExpiry = (expiryDate: string, arrivalDate: string) => {
    if (!expiryDate || !arrivalDate) return null;
    const exp = new Date(expiryDate).getTime();
    const arr = new Date(arrivalDate).getTime();
    if (isNaN(exp) || isNaN(arr)) return null;
    const diffDays = Math.floor((exp - arr) / (1000 * 60 * 60 * 24));
    if (diffDays < 90) {
      return {
        isWarning: true,
        days: diffDays,
        message: `Passport expires in ${diffDays} days from arrival (< 90 days required by Migration Service)!`,
      };
    }
    return null;
  };

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
      const [statsRes, toursRes, bookingsRes, usersRes, destsRes, visasRes, transfersRes, auditRes, tourRes, settingsRes] =
        await Promise.all([
          fetch("/api/admin/stats").then((r) => r.json()),
          fetch("/api/admin/tours").then((r) => r.json()),
          fetch("/api/admin/bookings").then((r) => r.json()),
          fetch("/api/admin/users").then((r) => r.json()),
          fetch("/api/admin/destinations").then((r) => r.json()),
          fetch("/api/admin/visas").then((r) => r.json()).catch(() => ({ visas: [] })),
          fetch("/api/admin/transfers").then((r) => r.json()).catch(() => ({ transfers: [] })),
          fetch("/api/admin/audit-logs?limit=100").then((r) => r.json()).catch(() => ({ logs: [] })),
          fetch("/api/tours/reserve").then((r) => r.json()).catch(() => ({ reservations: [] })),
          fetch("/api/admin/settings").then((r) => r.json()).catch(() => ({ settings: [] })),
        ]);

      if (statsRes?.stats) {
        setStats(statsRes.stats);
        setRecentBookings(statsRes.recentBookings || []);
      }
      if (toursRes?.tours) setTours(toursRes.tours);
      if (bookingsRes?.bookings) setBookingsList(bookingsRes.bookings);
      if (usersRes?.users) setUsersList(usersRes.users);
      if (visasRes?.visas) setVisasList(visasRes.visas);
      if (transfersRes?.transfers) setTransfersList(transfersRes.transfers);
      if (tourRes?.reservations) setTourReservationsList(tourRes.reservations);
      if (settingsRes?.settings) {
        setSettingsList(settingsRes.settings);
        const draftMap: Record<string, any> = {};
        for (const s of settingsRes.settings) {
          draftMap[s.key] = s.value;
        }
        setSettingsDraft(draftMap);
      }
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

  // Save Site Settings
  const handleSaveSettings = async () => {
    try {
      setSettingsSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates: settingsDraft }),
      });
      const data = await res.json();
      if (res.ok && data?.settings) {
        setSettingsList(data.settings);
        const draftMap: Record<string, any> = {};
        for (const s of data.settings) {
          draftMap[s.key] = s.value;
        }
        setSettingsDraft(draftMap);
        showNotification("Site settings saved and applied to live platform!");
      } else {
        alert(data?.error || "Failed to save settings");
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Error saving settings to server");
    } finally {
      setSettingsSaving(false);
    }
  };

  const handleResetSettings = () => {
    const draftMap: Record<string, any> = {};
    for (const s of settingsList) {
      draftMap[s.key] = s.value;
    }
    setSettingsDraft(draftMap);
    showNotification("Settings draft reset to saved values");
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

  // Open Transfer Modal
  const handleOpenTransferModal = (transfer: TransferItem) => {
    setSelectedTransfer(transfer);
    setEditTransferStatus(transfer.status);
    setEditTransferPaymentStatus(transfer.paymentStatus || "pending");
    setEditDriverName(transfer.driverName || "");
    setEditDriverPhone(transfer.driverPhone || "");
    setEditTransferNotes(transfer.adminNotes || "");
    setIsTransferModalOpen(true);
  };

  // Update Transfer
  const handleUpdateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransfer) return;
    try {
      setTransferUpdateLoading(true);
      const res = await fetch("/api/admin/transfers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTransfer.id,
          status: editTransferStatus,
          paymentStatus: editTransferPaymentStatus,
          driverName: editDriverName.trim() || null,
          driverPhone: editDriverPhone.trim() || null,
          adminNotes: editTransferNotes.trim() || null,
        }),
      });

      const data = await res.json();
      if (res.ok && data?.transfer) {
        setTransfersList((prev) =>
          prev.map((t) => (t.id === selectedTransfer.id ? { ...t, ...data.transfer } : t))
        );
        setIsTransferModalOpen(false);
        showNotification(`Transfer ${selectedTransfer.bookingNumber} updated successfully!`);
      } else {
        alert(data?.error || "Failed to update transfer");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTransferUpdateLoading(false);
    }
  };

  const handleOpenTourResModal = (resItem: TourReservationItem) => {
    setSelectedTourRes(resItem);
    setEditTourResStatus(resItem.status);
    setEditGuideName(resItem.guideName || "");
    setEditGuidePhone(resItem.guidePhone || "");
    setEditTourResNotes(resItem.adminNotes || "");
    setIsTourResModalOpen(true);
  };

  const handleUpdateTourRes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTourRes) return;
    try {
      setTourResUpdateLoading(true);
      const res = await fetch("/api/tours/reserve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTourRes.id,
          status: editTourResStatus,
          guideName: editGuideName.trim() || null,
          guidePhone: editGuidePhone.trim() || null,
          adminNotes: editTourResNotes.trim() || null,
        }),
      });

      const data = await res.json();
      if (res.ok && data?.reservation) {
        setTourReservationsList((prev) =>
          prev.map((r) => (r.id === selectedTourRes.id ? { ...r, ...data.reservation } : r))
        );
        setIsTourResModalOpen(false);
        showNotification(`Reservation ${selectedTourRes.reservationNumber} updated!`);
      } else {
        alert(data?.error || "Failed to update reservation");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTourResUpdateLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: "#f8f5f0" }}>
      {/* ═══════════════════════════════════════════════════════ SIDEBAR */}
      <aside
        className="w-full md:w-64 shrink-0 flex flex-col justify-between border-r shadow-sm md:min-h-screen"
        style={{ backgroundColor: "#0f3460", borderColor: "rgba(14, 165, 233, 0.2)" }}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full shadow-md"
                style={{ backgroundColor: "#f59e0b" }}
              >
                <MapPin className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight block text-[#f59e0b] leading-tight">
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
              {
                id: "transfers",
                label: "Airport Transfers",
                icon: Car,
                badge:
                  transfersList.filter((t) => t.status === "pending").length > 0
                    ? `${transfersList.filter((t) => t.status === "pending").length} New`
                    : undefined,
                count: transfersList.length,
              },
              { id: "users", label: "Users & Staff", icon: Users, count: usersList.length },
              { id: "destinations", label: "Destinations", icon: MapPin, count: destinationsList.length },
              { id: "audit", label: "Audit Trail", icon: ScrollText, count: auditLogs.length > 0 ? auditLogs.length : undefined },
              { id: "settings", label: "Site Settings", icon: Sliders },
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
                  style={isActive ? { backgroundColor: "#f59e0b" } : {}}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? "text-slate-900" : "text-[#f59e0b]"}`} />
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
              style={{ backgroundColor: "#f59e0b" }}
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
              {activeTab === "transfers" && "Airport Transfer Dispatch & Chauffeur Management"}
              {activeTab === "users" && "User & Staff Directory"}
              {activeTab === "destinations" && "Destinations & Regions"}
              {activeTab === "audit" && "System Audit Trail & Security Logs"}
              {activeTab === "settings" && "Platform Settings & Operations Control"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "settings" && (
              <button
                onClick={handleSaveSettings}
                disabled={settingsSaving}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#0f3460" }}
              >
                <Save className={`h-3.5 w-3.5 text-[#f59e0b] ${settingsSaving ? "animate-spin" : ""}`} />
                {settingsSaving ? "Saving Settings..." : "Save All Settings"}
              </button>
            )}

            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm cursor-pointer disabled:opacity-70"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#f59e0b] ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Refreshing..." : "Refresh Data"}</span>
            </button>

            {activeTab === "visas" && (
              <a
                href="https://evisa.gov.az/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0f3460" }}
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#f59e0b]" />
                Open Official evisa.gov.az
              </a>
            )}

            {activeTab === "tours" && (
              <button
                onClick={() => setIsNewTourOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: "#0f3460" }}
              >
                <Plus className="h-4 w-4 text-[#f59e0b]" />
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
          {loading ? (
            <div className="space-y-6 animate-fade-in">
              <StatsCardsSkeleton />
              <TableSkeleton rows={7} cols={5} />
            </div>
          ) : (
            <>
          {/* ═══════════════════════════════════════════════════════ TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div
                  className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
                  style={{ borderColor: "#e0f2fe" }}
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
                  style={{ borderColor: "#e0f2fe" }}
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
                  style={{ borderColor: stats.pendingBookings > 0 ? "#f59e0b" : "#e0f2fe" }}
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
                  style={{ borderColor: "#e0f2fe" }}
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
                style={{ borderColor: "#e0f2fe" }}
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
                    className="text-xs font-semibold text-[#f59e0b] hover:underline cursor-pointer"
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
              style={{ borderColor: "#e0f2fe" }}
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
                      className="pl-8 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0f3460]"
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
                              style={{ backgroundColor: "#f0f9ff", color: "#0f3460" }}
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
            <div className="space-y-6">
              {/* ── Direct Tour Reservations & Date Requests ── */}
              <div
                className="rounded-2xl border bg-white shadow-sm overflow-hidden"
                style={{ borderColor: "#e0f2fe" }}
              >
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-base text-slate-900 font-display">
                        Direct Tour Date Reservations ({tourReservationsList.length})
                      </h2>
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
                        Homepage Inquiries
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Direct inquiries submitted from landing page — assign licensed guides and chauffeurs
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
                      <button
                        key={st}
                        onClick={() => setTourResStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                          tourResStatusFilter === st
                            ? "bg-[#0f3460] text-white shadow-sm"
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
                        <th className="px-5 py-3.5">Ref & Date</th>
                        <th className="px-5 py-3.5">Experience</th>
                        <th className="px-5 py-3.5">Lead Traveler</th>
                        <th className="px-5 py-3.5">Price (~AZN)</th>
                        <th className="px-5 py-3.5">Assigned Guide</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tourReservationsList
                        .filter(
                          (r) =>
                            tourResStatusFilter === "all" ||
                            r.status === tourResStatusFilter
                        )
                        .map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-5 py-4">
                              <span className="font-mono font-bold text-slate-900 block text-xs">
                                {r.reservationNumber}
                              </span>
                              <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                                📅 {r.tourDate}
                              </span>
                            </td>
                            <td className="px-5 py-4 font-semibold text-slate-800 max-w-[200px] truncate">
                              {r.tourTitle}
                              <span className="text-[11px] text-slate-400 block font-normal">
                                {r.guests} {r.guests === 1 ? "Guest" : "Guests"}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <p className="font-bold text-slate-900">{r.travelerName}</p>
                              <a
                                href={`https://wa.me/${r.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                                  `Hello ${r.travelerName}! This is AddmeTour regarding your reservation for "${r.tourTitle}" on ${r.tourDate} (Ref: ${r.reservationNumber}).`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-mono font-semibold hover:underline"
                              >
                                <MessageCircle className="h-3 w-3" />
                                {r.phoneNumber}
                              </a>
                            </td>
                            <td className="px-5 py-4">
                              <span className="font-bold text-slate-900 block">${r.price}</span>
                              <span className="text-[10px] text-slate-400 block">
                                ~{(Number(r.price) * 1.7).toFixed(0)} AZN
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {r.guideName ? (
                                <div>
                                  <span className="font-semibold text-slate-800 block text-xs">
                                    {r.guideName}
                                  </span>
                                  {r.guidePhone && (
                                    <span className="text-[11px] text-slate-500 block font-mono">
                                      {r.guidePhone}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                  No Guide Assigned
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  r.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : r.status === "completed"
                                    ? "bg-slate-100 text-slate-800"
                                    : r.status === "pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {r.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => handleOpenTourResModal(r)}
                                className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                                style={{ backgroundColor: "#0f3460" }}
                              >
                                Assign Guide / Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {tourReservationsList.length === 0 && (
                    <div className="py-10 text-center text-xs text-slate-500">
                      No direct tour reservations received yet.
                    </div>
                  )}
                </div>
              </div>

              {/* ── Registered Portal Account Bookings ── */}
              <div
                className="rounded-2xl border bg-white shadow-sm overflow-hidden"
                style={{ borderColor: "#e0f2fe" }}
              >
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-base text-slate-900 font-display">
                      Registered Account Bookings ({bookingsList.length})
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Bookings created by registered users through checkout slots
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
                                className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 outline-none focus:border-[#0f3460] cursor-pointer"
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
                  {bookingsList.length === 0 && (
                    <div className="py-10 text-center text-xs text-slate-500">
                      No portal bookings recorded yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ TAB: USERS */}
          {activeTab === "users" && (
            <div
              className="rounded-2xl border bg-white shadow-sm overflow-hidden"
              style={{ borderColor: "#e0f2fe" }}
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
                                backgroundColor: u.role === "admin" ? "#0f3460" : "#f59e0b",
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
                            className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 outline-none focus:border-[#0f3460] cursor-pointer"
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
                    style={{ borderColor: "#e0f2fe" }}
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
                <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Visa Orders</span>
                  <p className="text-2xl font-bold font-display text-slate-900 mt-1">{visasList.length}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
                  <span className="text-[11px] font-semibold text-amber-600 uppercase">New / Need Review</span>
                  <p className="text-2xl font-bold font-display text-amber-600 mt-1">
                    {visasList.filter((v) => v.status === "received").length}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
                  <span className="text-[11px] font-semibold text-red-600 uppercase">⚡ Urgent 3-Hour Visas</span>
                  <p className="text-2xl font-bold font-display text-red-600 mt-1">
                    {visasList.filter((v) => v.visaType === "urgent").length}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
                  <span className="text-[11px] font-semibold text-emerald-600 uppercase">Approved & Delivered</span>
                  <p className="text-2xl font-bold font-display text-emerald-600 mt-1">
                    {visasList.filter((v) => v.status === "approved").length}
                  </p>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="p-4 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
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
                          ? "bg-[#0f3460] text-white shadow-sm"
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
              <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#e0f2fe" }}>
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
                              <div className="mt-1 flex flex-col gap-0.5">
                                {getVisaSla(visa)}
                              </div>
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
                              <span className="text-[10px] text-slate-400 block">Exp: {visa.passportExpiryDate}</span>
                              {(() => {
                                const expWarning = checkPassportExpiry(visa.passportExpiryDate, visa.arrivalDate);
                                if (expWarning) {
                                  return (
                                    <span
                                      title={expWarning.message}
                                      className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded mt-0.5"
                                    >
                                      ⚠️ Exp &lt; 90d
                                    </span>
                                  );
                                }
                                return null;
                              })()}
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
                              <div className="flex items-center justify-end gap-1.5">
                                {visa.passportScanUrl && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setLightboxImage({
                                        url: visa.passportScanUrl!,
                                        title: `Passport: ${visa.surname} ${visa.givenNames} (${visa.passportNumber})`,
                                      })
                                    }
                                    title="Preview Passport Document"
                                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-sky-700 transition-colors cursor-pointer"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>
                                )}
                                <a
                                  href={`https://wa.me/${visa.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                                    `Hello ${visa.givenNames}! This is AddmeTour regarding your Azerbaijan eVisa order (${visa.applicationNumber}).`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Contact Applicant on WhatsApp"
                                  className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
                                </a>
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
                                  style={{ backgroundColor: "#0f3460" }}
                                >
                                  Process
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

          {/* ═══════════════════════════════════════════════════════ AIRPORT TRANSFERS TAB */}
          {activeTab === "transfers" && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Transfers</span>
                  <p className="text-2xl font-bold font-display text-slate-900 mt-1">{transfersList.length}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
                  <span className="text-[11px] font-semibold text-amber-600 uppercase">Awaiting Driver / New</span>
                  <p className="text-2xl font-bold font-display text-amber-600 mt-1">
                    {transfersList.filter((t) => t.status === "pending").length}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
                  <span className="text-[11px] font-semibold text-sky-600 uppercase">Confirmed / En Route</span>
                  <p className="text-2xl font-bold font-display text-sky-600 mt-1">
                    {transfersList.filter((t) => t.status === "confirmed" || t.status === "in_progress").length}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
                  <span className="text-[11px] font-semibold text-emerald-600 uppercase">Completed</span>
                  <p className="text-2xl font-bold font-display text-emerald-600 mt-1">
                    {transfersList.filter((t) => t.status === "completed").length}
                  </p>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="p-4 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-80 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2">
                  <Search className="h-4 w-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search passenger, ref, flight, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-800 outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  {["all", "pending", "confirmed", "in_progress", "completed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setTransferStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                        transferStatusFilter === st
                          ? "bg-[#0f3460] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st === "all" ? "All Transfers" : st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transfers Table */}
              <div className="rounded-2xl bg-white border border-[#e0f2fe] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Ref & Route</th>
                        <th className="py-3 px-4">Flight & Schedule</th>
                        <th className="py-3 px-4">Passenger</th>
                        <th className="py-3 px-4">Vehicle & Amount</th>
                        <th className="py-3 px-4">Chauffeur</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transfersList
                        .filter((t) => {
                          const matchesFilter = transferStatusFilter === "all" || t.status === transferStatusFilter;
                          const q = searchQuery.toLowerCase().trim();
                          const matchesQuery =
                            !q ||
                            t.bookingNumber.toLowerCase().includes(q) ||
                            t.passengerName.toLowerCase().includes(q) ||
                            t.flightNumber.toLowerCase().includes(q) ||
                            t.phoneNumber.toLowerCase().includes(q) ||
                            t.dropoffAddress.toLowerCase().includes(q);
                          return matchesFilter && matchesQuery;
                        })
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <span className="font-mono font-bold text-slate-900 block text-xs">
                                {item.bookingNumber}
                              </span>
                              <span className="text-[11px] text-slate-500 block mt-0.5">
                                {item.airport} &middot;{" "}
                                {item.direction === "arrival"
                                  ? "🛬 Arrival"
                                  : item.direction === "departure"
                                  ? "🛫 Departure"
                                  : "🔄 Round Trip"}
                              </span>
                              <span className="text-[10px] text-slate-400 block line-clamp-1">
                                {item.pickupZone}: {item.dropoffAddress}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono font-semibold text-slate-800">
                                  ✈️ {item.flightNumber}
                                </span>
                                <a
                                  href={`https://www.flightradar24.com/data/flights/${item.flightNumber.replace(/\s+/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Track Live Flight on FlightRadar24"
                                  className="inline-flex items-center gap-0.5 text-[9px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded hover:bg-sky-100"
                                >
                                  Live ↗
                                </a>
                              </div>
                              <span className="text-[11px] text-slate-600 block mt-0.5">
                                {item.flightDate} at {item.flightTime}
                              </span>
                              {item.returnFlightNumber && (
                                <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                                  ↩️ {item.returnFlightNumber} on {item.returnDate}
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-900 block">
                                {item.passengerName}
                              </span>
                              <span className="text-[11px] text-slate-500 block">
                                {item.passengerCount} pax &middot; {item.phoneNumber}
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                {item.email}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-900 block">
                                ${item.totalAmount}
                              </span>
                              <span className="text-[11px] text-slate-600 font-medium block">
                                {item.vehicleClass === "sedan" ? "🚗 Sedan" : item.vehicleClass === "suv" ? "🚙 SUV" : item.vehicleClass === "minivan" ? "🚐 Minivan" : item.vehicleClass}
                              </span>
                              {item.paymentStatus === "paid" ? (
                                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded mt-0.5">
                                  ✓ Paid Online
                                </span>
                              ) : item.paymentStatus === "cash_collected" ? (
                                <span className="inline-block text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded mt-0.5">
                                  💵 Cash Remitted
                                </span>
                              ) : (
                                <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mt-0.5">
                                  ⚠️ Collect ${item.totalAmount}
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              {item.driverName ? (
                                <div>
                                  <span className="font-semibold text-slate-800 block text-xs">
                                    {item.driverName}
                                  </span>
                                  {item.driverPhone && (
                                    <span className="text-[11px] text-slate-500 block font-mono">
                                      {item.driverPhone}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                  Unassigned
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              {item.status === "pending" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                                  <Clock className="h-3 w-3" /> Pending
                                </span>
                              )}
                              {item.status === "confirmed" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                                  <CheckCircle2 className="h-3 w-3" /> Confirmed
                                </span>
                              )}
                              {item.status === "in_progress" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200 px-2.5 py-1 text-[11px] font-bold text-sky-800">
                                  <Car className="h-3 w-3" /> En Route
                                </span>
                              )}
                              {item.status === "completed" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-800">
                                  <CheckCircle2 className="h-3 w-3" /> Completed
                                </span>
                              )}
                              {item.status === "cancelled" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-[11px] font-bold text-red-800">
                                  <AlertCircle className="h-3 w-3" /> Cancelled
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`https://wa.me/${item.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                                    `Hello ${item.passengerName}! Your AddmeTour airport transfer is confirmed for flight ${item.flightNumber} (${item.flightDate} at ${item.flightTime}). Chauffeur: ${item.driverName || 'Assigned Driver'} (${item.driverPhone || 'On standby'}). Meetup: Arrival Hall exit after baggage reclaim.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Message Passenger on WhatsApp"
                                  className="p-1.5 rounded-lg border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors cursor-pointer"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
                                </a>
                                <button
                                  onClick={() => handleOpenTransferModal(item)}
                                  className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                                  style={{ backgroundColor: "#0f3460" }}
                                >
                                  {item.driverName ? "Manage" : "Assign Driver"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {transfersList.length === 0 && (
                    <div className="py-12 text-center text-xs text-slate-500">
                      No airport transfer bookings received yet.
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
                style={{ backgroundColor: "#0f3460" }}
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
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
                    <RefreshCw className={`h-3.5 w-3.5 text-[#f59e0b] ${refreshing ? "animate-spin" : ""}`} />
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
                      className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0f3460]"
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

          {/* ═══════════════════════════════════════════════════════ TAB: SITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-fade-in pb-12">
              {/* Top Banner & Control Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-[#f59e0b]" />
                    <span>Dynamic Platform Configuration</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modify business contact channels, pricing margins, announcement banners, and service availability without redeploying code.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleResetSettings}
                    disabled={settingsSaving}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Reset Draft
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    disabled={settingsSaving}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#0f3460" }}
                  >
                    <Save className={`h-4 w-4 text-[#f59e0b] ${settingsSaving ? "animate-spin" : ""}`} />
                    <span>{settingsSaving ? "Saving..." : "Save All Settings"}</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: "all", label: "All Settings", icon: Sliders },
                  { id: "contact", label: "Contact & Concierge", icon: Phone },
                  { id: "announcement", label: "Announcement Bar", icon: Megaphone },
                  { id: "pricing", label: "Pricing & Margins", icon: DollarSign },
                  { id: "operations", label: "Service Toggles", icon: Shield },
                  { id: "marketing", label: "Social Proof", icon: Sparkles },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = settingsCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSettingsCategoryFilter(cat.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-[#f59e0b]" : "text-slate-400"}`} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1. Contact & Concierge Settings */}
              {(settingsCategoryFilter === "all" || settingsCategoryFilter === "contact") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <Phone className="h-4 w-4 text-emerald-600" />
                        <span>Contact & Concierge Channels</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Controls numbers and handles used for WhatsApp booking, emergency assistance, and guest inquiries.
                      </p>
                    </div>
                    {settingsDraft["contact_whatsapp"] && (
                      <a
                        href={`https://wa.me/${String(settingsDraft["contact_whatsapp"]).replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Test WhatsApp Link</span>
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Primary WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["contact_whatsapp"] ?? ""}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({ ...prev, contact_whatsapp: e.target.value }))
                        }
                        placeholder="+994 55 100 31 46"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Linked dynamically to all "Book via WhatsApp", tour card buttons, and concierge triggers.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Operations & Emergency Hotline
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["contact_phone"] ?? ""}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({ ...prev, contact_phone: e.target.value }))
                        }
                        placeholder="+994 55 100 31 46"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Displayed in footer and support documents for voice inquiries.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Support Email Address
                      </label>
                      <input
                        type="email"
                        value={settingsDraft["contact_email"] ?? ""}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({ ...prev, contact_email: e.target.value }))
                        }
                        placeholder="info@addmetour.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Telegram Username / Support Channel
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["contact_telegram"] ?? ""}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({ ...prev, contact_telegram: e.target.value }))
                        }
                        placeholder="addmetour"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Baku Office / Operational Base Address
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["contact_address"] ?? ""}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({ ...prev, contact_address: e.target.value }))
                        }
                        placeholder="Nizami Street 48, Baku, Azerbaijan"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Site-wide Announcement Banner */}
              {(settingsCategoryFilter === "all" || settingsCategoryFilter === "announcement") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <Megaphone className="h-4 w-4 text-[#f59e0b]" />
                        <span>Live Site Announcement Banner</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Renders an interactive ribbon at the top of every page for promotions, border updates, or seasonal specials.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(settingsDraft["announcement_active"])}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({
                            ...prev,
                            announcement_active: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      <span className="ml-2 text-xs font-bold text-slate-700">
                        {settingsDraft["announcement_active"] ? "Active (Visible)" : "Disabled"}
                      </span>
                    </label>
                  </div>

                  {/* Banner Preview */}
                  {settingsDraft["announcement_active"] && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 flex items-center justify-between text-xs font-semibold shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] uppercase font-bold">
                          {settingsDraft["announcement_badge"] || "Offer"}
                        </span>
                        <span>{settingsDraft["announcement_text"] || "Preview announcement text goes here..."}</span>
                      </div>
                      <span className="text-[11px] underline font-bold cursor-pointer">
                        {settingsDraft["announcement_link"] || "Learn More"} ↗
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Badge Pill Text
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["announcement_badge"] ?? ""}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({ ...prev, announcement_badge: e.target.value }))
                        }
                        placeholder="Limited Offer"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Announcement Message Text
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["announcement_text"] ?? ""}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({ ...prev, announcement_text: e.target.value }))
                        }
                        placeholder="🌸 Autumn in Azerbaijan: Book custom tours early and get complimentary airport pickup!"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Call-to-Action Link URL
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["announcement_link"] ?? ""}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({ ...prev, announcement_link: e.target.value }))
                        }
                        placeholder="/#tours"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Pricing & Rates Configuration */}
              {(settingsCategoryFilter === "all" || settingsCategoryFilter === "pricing") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-emerald-600" />
                      <span>e-Visa & Airport Transfer Pricing (USD)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Adjust service fees charged to travelers. Changes reflect immediately on checkout and booking cards.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Standard eVisa (3d)
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-bold">$</span>
                        <input
                          type="number"
                          value={settingsDraft["pricing_visa_standard"] ?? 45}
                          onChange={(e) =>
                            setSettingsDraft((prev) => ({
                              ...prev,
                              pricing_visa_standard: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">Includes govt fee ($26)</span>
                    </div>

                    <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                        Urgent eVisa (3h)
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-700 font-bold">$</span>
                        <input
                          type="number"
                          value={settingsDraft["pricing_visa_urgent"] ?? 85}
                          onChange={(e) =>
                            setSettingsDraft((prev) => ({
                              ...prev,
                              pricing_visa_urgent: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-lg border border-amber-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-amber-700 mt-1 block">Includes urgent fee ($61)</span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Transfer Sedan Base
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-bold">$</span>
                        <input
                          type="number"
                          value={settingsDraft["pricing_transfer_sedan"] ?? 25}
                          onChange={(e) =>
                            setSettingsDraft((prev) => ({
                              ...prev,
                              pricing_transfer_sedan: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">Baku City Center</span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Transfer Minivan (Vito)
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-bold">$</span>
                        <input
                          type="number"
                          value={settingsDraft["pricing_transfer_minivan"] ?? 40}
                          onChange={(e) =>
                            setSettingsDraft((prev) => ({
                              ...prev,
                              pricing_transfer_minivan: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">Up to 6 Passengers</span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Transfer Sprinter VIP
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-bold">$</span>
                        <input
                          type="number"
                          value={settingsDraft["pricing_transfer_sprinter"] ?? 65}
                          onChange={(e) =>
                            setSettingsDraft((prev) => ({
                              ...prev,
                              pricing_transfer_sprinter: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">Up to 16 Passengers</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Operational Kill-Switches & Toggles */}
              {(settingsCategoryFilter === "all" || settingsCategoryFilter === "operations") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4 text-indigo-600" />
                      <span>Operational Kill-Switches & Feature Toggles</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enable or suspend customer-facing modules during peak season capacity or scheduled maintenance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Floating WhatsApp Widget</span>
                        <span className="text-[11px] text-slate-500">Show bottom-right WhatsApp chat bubble</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsDraft["operations_floating_whatsapp"] !== false}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({
                            ...prev,
                            operations_floating_whatsapp: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">e-Visa Application Service</span>
                        <span className="text-[11px] text-slate-500">Accept new online visa submissions</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsDraft["operations_visa_service"] !== false}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({
                            ...prev,
                            operations_visa_service: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Airport Transfer Bookings</span>
                        <span className="text-[11px] text-slate-500">Accept direct ride reservations</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsDraft["operations_transfer_service"] !== false}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({
                            ...prev,
                            operations_transfer_service: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Marketing & Social Proof */}
              {(settingsCategoryFilter === "all" || settingsCategoryFilter === "marketing") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span>Social Proof & Trust Badges</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ratings and review counters displayed in badges across the homepage.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        TripAdvisor Rating Display
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["marketing_tripadvisor_rating"] ?? "4.9"}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({
                            ...prev,
                            marketing_tripadvisor_rating: e.target.value,
                          }))
                        }
                        placeholder="4.9"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Verified Reviews Count
                      </label>
                      <input
                        type="text"
                        value={settingsDraft["marketing_tripadvisor_reviews"] ?? "2,400+"}
                        onChange={(e) =>
                          setSettingsDraft((prev) => ({
                            ...prev,
                            marketing_tripadvisor_reviews: e.target.value,
                          }))
                        }
                        placeholder="2,400+"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
            </>
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
            style={{ backgroundColor: "#f0f9ff", border: "1px solid #e0f2fe" }}
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
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination</label>
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
                  <label className="font-semibold text-slate-700 block mb-1">Duration (Days)</label>
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
                  <label className="font-semibold text-slate-700 block mb-1">Base Price ($)</label>
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
                  <label className="font-semibold text-slate-700 block mb-1">Promo Price ($, optional)</label>
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
                <label className="font-semibold text-slate-700 block mb-1">Cover Image URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newTourImage}
                  onChange={(e) => setNewTourImage(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
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
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                />
              </div>

              <button
                type="submit"
                disabled={createLoading}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity mt-2 cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#0f3460" }}
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
            style={{ backgroundColor: "#f0f9ff", border: "1px solid #e0f2fe" }}
          >
            <button
              onClick={() => setIsVisaModalOpen(false)}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-sm text-[#0f3460]">
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

            {/* SLA and Expiry Warning Banners */}
            <div className="flex flex-wrap items-center gap-2 my-2">
              {selectedVisa.visaType === "urgent" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                  {getVisaSla(selectedVisa)}
                </div>
              )}
              {(() => {
                const warning = checkPassportExpiry(selectedVisa.passportExpiryDate, selectedVisa.arrivalDate);
                if (warning) {
                  return (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-800">
                      ⚠️ {warning.message}
                    </div>
                  );
                }
                return null;
              })()}
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
                    className="flex items-center gap-1 text-[11px] font-bold text-[#0f3460] hover:underline cursor-pointer"
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
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Passport Document</span>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          url: selectedVisa.passportScanUrl!,
                          title: `Passport Scan: ${selectedVisa.surname} ${selectedVisa.givenNames} (${selectedVisa.passportNumber})`,
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Inspect Full Scan ↗
                    </button>
                  </div>
                )}

                {/* Direct WhatsApp Contact Button */}
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${selectedVisa.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Hello ${selectedVisa.givenNames}! This is AddmeTour regarding your Azerbaijan eVisa application (${selectedVisa.applicationNumber}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Message Applicant on WhatsApp
                  </a>
                </div>
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
                    style={{ backgroundColor: "#0f3460" }}
                  >
                    {visaUpdateLoading ? "Updating Application..." : "Save & Update Status"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* ═══════════════════════════════════════════════════════ TRANSFER DISPATCH MODAL */}
      {isTransferModalOpen && selectedTransfer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-sky-100">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Transfer Dispatch & Chauffeur Management
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-mono">
                  {selectedTransfer.bookingNumber}
                </h3>
              </div>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Booking Details */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-1">
                  Trip Information
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Route</span>
                  <span className="font-semibold text-slate-800">
                    {selectedTransfer.airport} &middot;{" "}
                    {selectedTransfer.direction === "arrival"
                      ? "🛬 Arrival (Airport → Hotel)"
                      : selectedTransfer.direction === "departure"
                      ? "🛫 Departure (Hotel → Airport)"
                      : "🔄 Round Trip"}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Zone & Specific Address</span>
                  <span className="font-semibold text-slate-800 block">{selectedTransfer.pickupZone}</span>
                  <span className="text-slate-600 block text-[11px]">{selectedTransfer.dropoffAddress}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Flight Details</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono font-semibold text-slate-800">
                      ✈️ {selectedTransfer.flightNumber} &middot; {selectedTransfer.flightDate} at {selectedTransfer.flightTime}
                    </span>
                    <a
                      href={`https://www.flightradar24.com/data/flights/${selectedTransfer.flightNumber.replace(/\s+/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-[10px] font-bold text-sky-600 hover:underline"
                    >
                      Track ↗
                    </a>
                  </div>
                  {selectedTransfer.returnFlightNumber && (
                    <span className="font-mono text-slate-600 block text-[11px] mt-0.5">
                      ↩️ Return: {selectedTransfer.returnFlightNumber} on {selectedTransfer.returnDate} at {selectedTransfer.returnTime}
                    </span>
                  )}
                </div>

                <div className="border-t border-slate-200/60 pt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Passenger</span>
                  <span className="font-semibold text-slate-800 block">
                    {selectedTransfer.passengerName} ({selectedTransfer.passengerCount} pax)
                  </span>
                  <span className="text-slate-600 block">{selectedTransfer.phoneNumber}</span>
                  <span className="text-slate-600 block">{selectedTransfer.email}</span>
                </div>

                {selectedTransfer.luggageNotes && (
                  <div className="border-t border-slate-200/60 pt-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Luggage & Special Notes</span>
                    <span className="text-slate-700 italic block">{selectedTransfer.luggageNotes}</span>
                  </div>
                )}

                <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Vehicle Class</span>
                    <span className="font-semibold text-slate-800">
                      {selectedTransfer.vehicleClass === "sedan" ? "🚗 Sedan" : selectedTransfer.vehicleClass === "suv" ? "🚙 SUV" : selectedTransfer.vehicleClass === "minivan" ? "🚐 Minivan" : selectedTransfer.vehicleClass}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Total Rate</span>
                    <span className="text-base font-extrabold text-sky-700">${selectedTransfer.totalAmount}</span>
                  </div>
                </div>

                {/* Quick WhatsApp Triggers */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                  <a
                    href={`https://wa.me/${editDriverPhone.replace(/\D/g, '') || ''}?text=${encodeURIComponent(
                      `🚖 *ADDMETOUR — CHAUFFEUR DISPATCH*\n• Ref: ${selectedTransfer.bookingNumber}\n• Flight: ${selectedTransfer.flightNumber} (${selectedTransfer.airport} at ${selectedTransfer.flightTime})\n• Route: ${selectedTransfer.pickupZone} ➔ ${selectedTransfer.dropoffAddress}\n• Passenger: ${selectedTransfer.passengerName} (${selectedTransfer.passengerCount} pax)\n• Phone: ${selectedTransfer.phoneNumber}\n• Vehicle: ${selectedTransfer.vehicleClass}\n• Payment: ${selectedTransfer.paymentStatus === 'paid' ? '✅ Paid Online' : `💵 Collect $${selectedTransfer.totalAmount} (~${Math.round(Number(selectedTransfer.totalAmount) * 1.7)} AZN) cash on arrival`}\n• Notes: ${selectedTransfer.luggageNotes || 'None'}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Dispatch Chauffeur via WhatsApp
                  </a>

                  <a
                    href={`https://wa.me/${selectedTransfer.phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `👋 Hello ${selectedTransfer.passengerName}! Your AddmeTour airport transfer is confirmed for flight ${selectedTransfer.flightNumber}:\n• Chauffeur: ${editDriverName || selectedTransfer.driverName || 'Assigned Driver'} (${editDriverPhone || selectedTransfer.driverPhone || 'On standby'})\n• Airport: ${selectedTransfer.airport}\n• Meeting Point: Arrival Hall exit after baggage reclaim (Chauffeur will hold AddmeTour sign with your name).\n• Free Waiting: 60 minutes after actual landing.\nWishing you a safe flight to Baku!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-sky-600 text-white font-bold text-[11px] hover:bg-sky-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Notify Passenger via WhatsApp
                  </a>
                </div>
              </div>

              {/* Right Column: Dispatch Form */}
              <form onSubmit={handleUpdateTransfer} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Transfer Status</label>
                  <select
                    value={editTransferStatus}
                    onChange={(e) => setEditTransferStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-semibold cursor-pointer"
                  >
                    <option value="pending">Pending (Awaiting Driver)</option>
                    <option value="confirmed">Confirmed (Driver Assigned)</option>
                    <option value="in_progress">In Progress (Driver En Route)</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Payment & Cash Settlement</label>
                  <select
                    value={editTransferPaymentStatus}
                    onChange={(e) => setEditTransferPaymentStatus(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-semibold cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid Online</option>
                    <option value="cash_collected">💵 Cash Collected by Chauffeur & Remitted</option>
                    <option value="on_arrival">Pay on Arrival (Cash Pending)</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Assigned Driver Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eldar Mammadov"
                    value={editDriverName}
                    onChange={(e) => setEditDriverName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-medium"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Visible to passenger on tracking page</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Driver Phone / WhatsApp Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +994 50 123 4567"
                    value={editDriverPhone}
                    onChange={(e) => setEditDriverPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Used for chauffeur WhatsApp dispatch</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Dispatch & Ops Notes</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Flight monitored, Terminal 1 greeting sign ready."
                    value={editTransferNotes}
                    onChange={(e) => setEditTransferNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={transferUpdateLoading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#0f3460" }}
                  >
                    {transferUpdateLoading ? "Updating Dispatch..." : "Save & Update Dispatch"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ TOUR RESERVATION MODAL */}
      {isTourResModalOpen && selectedTourRes && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-amber-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Tour Guide & Date Assignment
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-mono mt-1">
                  {selectedTourRes.reservationNumber}
                </h3>
              </div>
              <button
                onClick={() => setIsTourResModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Reservation Summary */}
              <div className="space-y-3 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60 text-xs">
                <div className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-1">
                  Tour Request Details
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Tour Experience</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedTourRes.tourTitle}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Preferred Date</span>
                    <span className="font-semibold text-slate-800">📅 {selectedTourRes.tourDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Party Size</span>
                    <span className="font-semibold text-slate-800">{selectedTourRes.guests} Guests</span>
                  </div>
                </div>

                <div className="border-t border-amber-200/60 pt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Lead Traveler</span>
                  <span className="font-semibold text-slate-900 block">{selectedTourRes.travelerName}</span>
                  <span className="text-slate-600 font-mono block">{selectedTourRes.phoneNumber}</span>
                </div>

                <div className="border-t border-amber-200/60 pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Group Rate</span>
                    <span className="text-base font-extrabold text-slate-900">${selectedTourRes.price} USD</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Approx. AZN</span>
                    <span className="text-xs font-bold text-slate-600">~{(Number(selectedTourRes.price) * 1.7).toFixed(0)} AZN</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60">
                  <a
                    href={`https://wa.me/${selectedTourRes.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Hello ${selectedTourRes.travelerName}! This is AddmeTour regarding your tour reservation for "${selectedTourRes.tourTitle}" on ${selectedTourRes.tourDate} (Ref: ${selectedTourRes.reservationNumber}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Chat with Traveler on WhatsApp
                  </a>
                </div>
              </div>

              {/* Right: Guide Assignment Form */}
              <form onSubmit={handleUpdateTourRes} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Reservation Status</label>
                  <select
                    value={editTourResStatus}
                    onChange={(e) => setEditTourResStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-semibold cursor-pointer"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="confirmed">Confirmed (Guide Assigned)</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assigned Guide Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Leyla Aliyeva (English Guide)"
                    value={editGuideName}
                    onChange={(e) => setEditGuideName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Guide Contact / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="e.g. +994 55 987 6543"
                    value={editGuidePhone}
                    onChange={(e) => setEditGuidePhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Operational Notes / Hotel Pickup</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Pickup from Four Seasons at 09:30 AM. Mercedes Sprinter arranged."
                    value={editTourResNotes}
                    onChange={(e) => setEditTourResNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={tourResUpdateLoading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#0f3460" }}
                  >
                    {tourResUpdateLoading ? "Saving..." : "Save Reservation & Guide"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ LIGHTBOX PREVIEW MODAL */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
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
                  <Download className="h-3.5 w-3.5" /> Full Resolution ↗
                </a>
                <button
                  onClick={() => setLightboxImage(null)}
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
      )}
    </div>
  );
}
