"use client";

import { useState, useEffect } from "react";
import {
  ExternalLink,
  Plus,
  RefreshCw,
  CheckCircle2,
  Save,
} from "lucide-react";
import { StatsCardsSkeleton, TableSkeleton } from "@/components/Skeletons";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import { getAdminTranslations } from "@/lib/admin-i18n";
import { DEFAULT_SETTINGS_MAP, broadcastSettingsUpdate } from "@/lib/settings-context";

import {
  AuditLogItem,
  AdminStats,
  BookingItem,
  TourItem,
  UserItem,
  DestinationItem,
  VisaItem,
  TransferItem,
  TourReservationItem,
  SiteSettingItem,
  TabType,
  LightboxImage,
  DestinationPreset,
  AZERBAIJAN_DESTINATION_PRESETS,
} from "./_components/types";

import { AdminSidebar } from "./_components/AdminSidebar";
import { OverviewTab } from "./_components/OverviewTab";
import { ToursTab } from "./_components/ToursTab";
import { BookingsTab } from "./_components/BookingsTab";
import { UsersTab } from "./_components/UsersTab";
import { DestinationsTab } from "./_components/DestinationsTab";
import { VisasTab } from "./_components/VisasTab";
import { TransfersTab } from "./_components/TransfersTab";
import { AuditLogsTab } from "./_components/AuditLogsTab";
import { SettingsTab } from "./_components/SettingsTab";
import { AdminModals } from "./_components/AdminModals";

export default function AdminPortalPage() {
  const { language } = useLanguage();
  const adminT = getAdminTranslations(language);
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
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

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

  // Destination Modal & Management States
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [destinationModalMode, setDestinationModalMode] = useState<"create" | "edit">("create");
  const [editingDestinationId, setEditingDestinationId] = useState<string | null>(null);
  const [destFormName, setDestFormName] = useState("");
  const [destFormCountry, setDestFormCountry] = useState("Azerbaijan");
  const [destFormSlug, setDestFormSlug] = useState("");
  const [destFormHeroImage, setDestFormHeroImage] = useState("");
  const [destSaving, setDestSaving] = useState(false);
  const [destSearchQuery, setDestSearchQuery] = useState("");

  // Create Tour Modal States
  const [isNewTourOpen, setIsNewTourOpen] = useState(false);
  const [newTourTitle, setNewTourTitle] = useState("");
  const [newTourDestId, setNewTourDestId] = useState("");
  const [newTourOverview, setNewTourOverview] = useState("");
  const [newTourBasePrice, setNewTourBasePrice] = useState("");
  const [newTourPromoPrice, setNewTourPromoPrice] = useState("");
  const [newTourDays, setNewTourDays] = useState("1");
  const [newTourImage, setNewTourImage] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  // Success Notification
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
        const draftMap: Record<string, any> = { ...DEFAULT_SETTINGS_MAP };
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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    window.location.href = "/";
  };

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
        const draftMap: Record<string, any> = { ...DEFAULT_SETTINGS_MAP };
        for (const s of data.settings) {
          draftMap[s.key] = s.value;
        }
        setSettingsDraft(draftMap);

        // Fetch fresh public settings structure and broadcast across all tabs & localStorage instantly
        try {
          const pubRes = await fetch("/api/settings", { cache: "no-store" });
          if (pubRes.ok) {
            const pubData = await pubRes.json();
            broadcastSettingsUpdate(pubData);
          }
        } catch {}

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
    const draftMap: Record<string, any> = { ...DEFAULT_SETTINGS_MAP };
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

  // Destination Management Presets & Handlers
  const handleOpenCreateDestination = () => {
    setDestinationModalMode("create");
    setEditingDestinationId(null);
    setDestFormName("");
    setDestFormCountry("Azerbaijan");
    setDestFormSlug("");
    setDestFormHeroImage(AZERBAIJAN_DESTINATION_PRESETS[0]!.image);
    setIsDestinationModalOpen(true);
  };

  const handleOpenEditDestination = (d: DestinationItem) => {
    setDestinationModalMode("edit");
    setEditingDestinationId(d.id);
    setDestFormName(d.name);
    setDestFormCountry(d.country || "Azerbaijan");
    setDestFormSlug(d.slug);
    setDestFormHeroImage(d.heroImageUrl || "");
    setIsDestinationModalOpen(true);
  };

  const handleSelectPresetDestination = (preset: DestinationPreset) => {
    setDestFormName(preset.name);
    setDestFormCountry(preset.country);
    if (destinationModalMode === "create") {
      setDestFormSlug(preset.slug);
    }
    setDestFormHeroImage(preset.image);
  };

  const handleSaveDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destFormName.trim()) {
      alert("Please enter a destination name");
      return;
    }
    setDestSaving(true);
    try {
      if (destinationModalMode === "create") {
        const res = await fetch("/api/admin/destinations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: destFormName.trim(),
            country: destFormCountry.trim() || "Azerbaijan",
            customSlug: destFormSlug.trim(),
            heroImageUrl: destFormHeroImage.trim(),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create destination");
        setDestinationsList((prev) => [data.destination, ...prev]);
        showNotification(`Destination "${destFormName}" added successfully!`);
      } else {
        const res = await fetch("/api/admin/destinations", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingDestinationId,
            name: destFormName.trim(),
            country: destFormCountry.trim() || "Azerbaijan",
            slug: destFormSlug.trim(),
            heroImageUrl: destFormHeroImage.trim(),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update destination");
        setDestinationsList((prev) =>
          prev.map((item) => (item.id === editingDestinationId ? data.destination : item))
        );
        showNotification(`Destination "${destFormName}" updated successfully!`);
      }
      setIsDestinationModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to save destination");
    } finally {
      setDestSaving(false);
    }
  };

  const handleDeleteDestination = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete destination "${name}"? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/destinations?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete destination");
      setDestinationsList((prev) => prev.filter((d) => d.id !== id));
      showNotification(`Destination "${name}" deleted.`);
    } catch (err: any) {
      alert(err.message || "Failed to delete destination");
    }
  };

  const filteredDestinations = destinationsList.filter((d) => {
    if (!destSearchQuery.trim()) return true;
    const q = destSearchQuery.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.slug.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: "#f8f5f0" }}>
      {/* Sidebar */}
      <AdminSidebar
        adminT={adminT}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSearchQuery={setSearchQuery}
        stats={stats}
        tours={tours}
        visasList={visasList}
        transfersList={transfersList}
        usersList={usersList}
        destinationsList={destinationsList}
        auditLogs={auditLogs}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header
          className="h-16 px-6 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.85)", borderColor: "#e5ded4" }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-slate-900 capitalize font-display">
              {activeTab === "overview" && adminT.headers.overview}
              {activeTab === "tours" && adminT.headers.tours}
              {activeTab === "bookings" && adminT.headers.bookings}
              {activeTab === "visas" && adminT.headers.visas}
              {activeTab === "transfers" && adminT.headers.transfers}
              {activeTab === "users" && adminT.headers.users}
              {activeTab === "destinations" && adminT.headers.destinations}
              {activeTab === "audit" && adminT.headers.audit}
              {activeTab === "settings" && adminT.headers.settings}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector variant="light" allowedLanguages={["EN", "AZ"]} />

            {activeTab === "settings" && (
              <button
                onClick={handleSaveSettings}
                disabled={settingsSaving}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#0f3460" }}
              >
                <Save className={`h-3.5 w-3.5 text-[#f59e0b] ${settingsSaving ? "animate-spin" : ""}`} />
                {settingsSaving ? adminT.actions.savingSettings : adminT.actions.saveSettings}
              </button>
            )}

            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm cursor-pointer disabled:opacity-70"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#f59e0b] ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? adminT.actions.refreshing : adminT.actions.refreshData}</span>
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
                {adminT.actions.openEvisaGov}
              </a>
            )}

            {activeTab === "destinations" && (
              <button
                onClick={handleOpenCreateDestination}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: "#0f3460" }}
              >
                <Plus className="h-4 w-4 text-[#f59e0b]" />
                {adminT.actions.addDestination}
              </button>
            )}

            {activeTab === "tours" && (
              <button
                onClick={() => setIsNewTourOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: "#0f3460" }}
              >
                <Plus className="h-4 w-4 text-[#f59e0b]" />
                {adminT.actions.addNewTour}
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

        <div className="p-6 md:p-8 space-y-6">
          {loading ? (
            <div className="space-y-6">
              <StatsCardsSkeleton />
              <TableSkeleton rows={8} />
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <OverviewTab
                  adminT={adminT}
                  stats={stats}
                  tours={tours}
                  recentBookings={recentBookings}
                  setActiveTab={setActiveTab}
                  handleUpdateBookingStatus={handleUpdateBookingStatus}
                />
              )}

              {activeTab === "tours" && (
                <ToursTab
                  adminT={adminT}
                  tours={tours}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleToggleTourActive={handleToggleTourActive}
                  handleDeleteTour={handleDeleteTour}
                />
              )}

              {activeTab === "bookings" && (
                <BookingsTab
                  language={language}
                  adminT={adminT}
                  tourReservationsList={tourReservationsList}
                  bookingsList={bookingsList}
                  tourResStatusFilter={tourResStatusFilter}
                  setTourResStatusFilter={setTourResStatusFilter}
                  bookingStatusFilter={bookingStatusFilter}
                  setBookingStatusFilter={setBookingStatusFilter}
                  handleOpenTourResModal={handleOpenTourResModal}
                  handleUpdateBookingStatus={handleUpdateBookingStatus}
                />
              )}

              {activeTab === "users" && (
                <UsersTab
                  language={language}
                  adminT={adminT}
                  usersList={usersList}
                  handleUpdateUserRole={handleUpdateUserRole}
                />
              )}

              {activeTab === "destinations" && (
                <DestinationsTab
                  language={language}
                  adminT={adminT}
                  destinationsList={destinationsList}
                  destSearchQuery={destSearchQuery}
                  setDestSearchQuery={setDestSearchQuery}
                  filteredDestinations={filteredDestinations}
                  handleOpenCreateDestination={handleOpenCreateDestination}
                  handleOpenEditDestination={handleOpenEditDestination}
                  handleDeleteDestination={handleDeleteDestination}
                />
              )}

              {activeTab === "visas" && (
                <VisasTab
                  language={language}
                  adminT={adminT}
                  visasList={visasList}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  visaStatusFilter={visaStatusFilter}
                  setVisaStatusFilter={setVisaStatusFilter}
                  getVisaSla={getVisaSla}
                  checkPassportExpiry={checkPassportExpiry}
                  handleCopyAsanFormat={handleCopyAsanFormat}
                  handleOpenVisaModal={handleOpenVisaModal}
                  setLightboxImage={setLightboxImage}
                />
              )}

              {activeTab === "transfers" && (
                <TransfersTab
                  language={language}
                  adminT={adminT}
                  transfersList={transfersList}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  transferStatusFilter={transferStatusFilter}
                  setTransferStatusFilter={setTransferStatusFilter}
                  handleOpenTransferModal={handleOpenTransferModal}
                />
              )}

              {activeTab === "audit" && (
                <AuditLogsTab
                  language={language}
                  adminT={adminT}
                  auditLogs={auditLogs}
                  auditEntityFilter={auditEntityFilter}
                  setAuditEntityFilter={setAuditEntityFilter}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  expandedLogId={expandedLogId}
                  setExpandedLogId={setExpandedLogId}
                  fetchAllData={fetchAllData}
                  refreshing={refreshing}
                />
              )}

              {activeTab === "settings" && (
                <SettingsTab
                  language={language}
                  adminT={adminT}
                  settingsDraft={settingsDraft}
                  setSettingsDraft={setSettingsDraft}
                  settingsCategoryFilter={settingsCategoryFilter}
                  setSettingsCategoryFilter={setSettingsCategoryFilter}
                  settingsSaving={settingsSaving}
                  handleResetSettings={handleResetSettings}
                  handleSaveSettings={handleSaveSettings}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Modals */}
      <AdminModals
        language={language}
        adminT={adminT}
        isNewTourOpen={isNewTourOpen}
        setIsNewTourOpen={setIsNewTourOpen}
        destinationsList={destinationsList}
        newTourTitle={newTourTitle}
        setNewTourTitle={setNewTourTitle}
        newTourDestId={newTourDestId}
        setNewTourDestId={setNewTourDestId}
        newTourOverview={newTourOverview}
        setNewTourOverview={setNewTourOverview}
        newTourBasePrice={newTourBasePrice}
        setNewTourBasePrice={setNewTourBasePrice}
        newTourPromoPrice={newTourPromoPrice}
        setNewTourPromoPrice={setNewTourPromoPrice}
        newTourDays={newTourDays}
        setNewTourDays={setNewTourDays}
        newTourImage={newTourImage}
        setNewTourImage={setNewTourImage}
        createLoading={createLoading}
        handleCreateTour={handleCreateTour}
        isVisaModalOpen={isVisaModalOpen}
        setIsVisaModalOpen={setIsVisaModalOpen}
        selectedVisa={selectedVisa}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        editAsanId={editAsanId}
        setEditAsanId={setEditAsanId}
        editPdfUrl={editPdfUrl}
        setEditPdfUrl={setEditPdfUrl}
        editNotes={editNotes}
        setEditNotes={setEditNotes}
        visaUpdateLoading={visaUpdateLoading}
        handleUpdateVisa={handleUpdateVisa}
        getVisaSla={getVisaSla}
        checkPassportExpiry={checkPassportExpiry}
        handleCopyAsanFormat={handleCopyAsanFormat}
        isTransferModalOpen={isTransferModalOpen}
        setIsTransferModalOpen={setIsTransferModalOpen}
        selectedTransfer={selectedTransfer}
        editTransferStatus={editTransferStatus}
        setEditTransferStatus={setEditTransferStatus}
        editTransferPaymentStatus={editTransferPaymentStatus}
        setEditTransferPaymentStatus={setEditTransferPaymentStatus}
        editDriverName={editDriverName}
        setEditDriverName={setEditDriverName}
        editDriverPhone={editDriverPhone}
        setEditDriverPhone={setEditDriverPhone}
        editTransferNotes={editTransferNotes}
        setEditTransferNotes={setEditTransferNotes}
        transferUpdateLoading={transferUpdateLoading}
        handleUpdateTransfer={handleUpdateTransfer}
        isTourResModalOpen={isTourResModalOpen}
        setIsTourResModalOpen={setIsTourResModalOpen}
        selectedTourRes={selectedTourRes}
        editTourResStatus={editTourResStatus}
        setEditTourResStatus={setEditTourResStatus}
        editGuideName={editGuideName}
        setEditGuideName={setEditGuideName}
        editGuidePhone={editGuidePhone}
        setEditGuidePhone={setEditGuidePhone}
        editTourResNotes={editTourResNotes}
        setEditTourResNotes={setEditTourResNotes}
        tourResUpdateLoading={tourResUpdateLoading}
        handleUpdateTourRes={handleUpdateTourRes}
        isDestinationModalOpen={isDestinationModalOpen}
        setIsDestinationModalOpen={setIsDestinationModalOpen}
        destinationModalMode={destinationModalMode}
        destFormName={destFormName}
        setDestFormName={setDestFormName}
        destFormCountry={destFormCountry}
        setDestFormCountry={setDestFormCountry}
        destFormSlug={destFormSlug}
        setDestFormSlug={setDestFormSlug}
        destFormHeroImage={destFormHeroImage}
        setDestFormHeroImage={setDestFormHeroImage}
        destSaving={destSaving}
        handleSaveDestination={handleSaveDestination}
        handleSelectPresetDestination={handleSelectPresetDestination}
        lightboxImage={lightboxImage}
        setLightboxImage={setLightboxImage}
      />
    </div>
  );
}
