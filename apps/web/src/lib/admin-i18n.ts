import { LanguageCode } from "./i18n";

export interface AdminTranslations {
  sidebar: {
    portalTitle: string;
    brandSubtitle: string;
    overview: string;
    tours: string;
    bookings: string;
    visas: string;
    transfers: string;
    users: string;
    destinations: string;
    audit: string;
    settings: string;
    adminTeam: string;
    liveDb: string;
    backToSite: string;
    signOut: string;
    newBadge: string;
  };
  headers: {
    overview: string;
    tours: string;
    bookings: string;
    visas: string;
    transfers: string;
    users: string;
    destinations: string;
    audit: string;
    settings: string;
  };
  actions: {
    saveSettings: string;
    savingSettings: string;
    refreshData: string;
    refreshing: string;
    openEvisaGov: string;
    addDestination: string;
    addNewTour: string;
    search: string;
    filterAll: string;
    exportCsv: string;
    delete: string;
    edit: string;
    view: string;
    save: string;
    cancel: string;
    close: string;
    confirm: string;
    actions: string;
  };
  stats: {
    totalRevenue: string;
    totalBookings: string;
    pendingBookings: string;
    activeTours: string;
    totalUsers: string;
    allTimeGross: string;
    confirmedPending: string;
    needsReview: string;
    liveInCatalog: string;
    registeredTravelers: string;
    totalDestinations: string;
    catalogedRegions: string;
    azerbaijanRegions: string;
    linkedTours: string;
    activeTourPackages: string;
    topDestination: string;
  };
  status: {
    pending: string;
    confirmed: string;
    cancelled: string;
    refunded: string;
    completed: string;
    received: string;
    processing: string;
    issued: string;
    rejected: string;
    assigned: string;
    active: string;
    inactive: string;
  };
  common: {
    loading: string;
    noDataFound: string;
    customer: string;
    traveler: string;
    email: string;
    phone: string;
    date: string;
    price: string;
    amount: string;
    status: string;
    type: string;
    title: string;
    category: string;
    location: string;
    duration: string;
    notes: string;
  };
}

export const ADMIN_TRANSLATIONS: Record<"EN" | "AZ", AdminTranslations> = {
  EN: {
    sidebar: {
      portalTitle: "addmetour",
      brandSubtitle: "Admin Portal",
      overview: "Overview",
      tours: "Tours & Packages",
      bookings: "Bookings",
      visas: "e-Visa Processing",
      transfers: "Airport Transfers",
      users: "Users & Staff",
      destinations: "Destinations",
      audit: "Audit Trail",
      settings: "Site Settings",
      adminTeam: "Admin Team",
      liveDb: "Live on Neon DB",
      backToSite: "Back to Live Site",
      signOut: "Sign Out",
      newBadge: "New",
    },
    headers: {
      overview: "Dashboard Overview",
      tours: "Tours & Experiences Management",
      bookings: "Customer Bookings & Reservations",
      visas: "e-Visa Operations & Fulfillment Queue",
      transfers: "Airport Transfer Dispatch & Chauffeur Management",
      users: "User & Staff Directory",
      destinations: "Destinations & Regions",
      audit: "System Audit Trail & Security Logs",
      settings: "Platform Settings & Operations Control",
    },
    actions: {
      saveSettings: "Save All Settings",
      savingSettings: "Saving Settings...",
      refreshData: "Refresh Data",
      refreshing: "Refreshing...",
      openEvisaGov: "Open Official evisa.gov.az",
      addDestination: "Add Destination",
      addNewTour: "Add New Tour",
      search: "Search...",
      filterAll: "All",
      exportCsv: "Export CSV",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
      confirm: "Confirm",
      actions: "Actions",
    },
    stats: {
      totalRevenue: "Total Revenue",
      totalBookings: "Total Bookings",
      pendingBookings: "Pending Bookings",
      activeTours: "Active Tours",
      totalUsers: "Total Users",
      allTimeGross: "All time gross",
      confirmedPending: "Confirmed & pending",
      needsReview: "Needs review",
      liveInCatalog: "Live in catalog",
      registeredTravelers: "Registered travelers",
      totalDestinations: "Total Destinations",
      catalogedRegions: "Cataloged regions",
      azerbaijanRegions: "Azerbaijan Regions",
      linkedTours: "Linked Tours",
      activeTourPackages: "Active tour packages",
      topDestination: "Top Destination",
    },
    status: {
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      refunded: "Refunded",
      completed: "Completed",
      received: "Received",
      processing: "Processing",
      issued: "Issued",
      rejected: "Rejected",
      assigned: "Assigned",
      active: "Active",
      inactive: "Inactive",
    },
    common: {
      loading: "Loading...",
      noDataFound: "No records found",
      customer: "Customer",
      traveler: "Traveler",
      email: "Email",
      phone: "Phone",
      date: "Date",
      price: "Price",
      amount: "Amount",
      status: "Status",
      type: "Type",
      title: "Title",
      category: "Category",
      location: "Location",
      duration: "Duration",
      notes: "Notes",
    },
  },
  AZ: {
    sidebar: {
      portalTitle: "addmetour",
      brandSubtitle: "Admin Panel",
      overview: "Ümumi Baxış",
      tours: "Turlar və Paketlər",
      bookings: "Sifarişlər",
      visas: "e-Viza Əməliyyatları",
      transfers: "Aeroport Transferləri",
      users: "İstifadəçilər və Heyət",
      destinations: "İstiqamətlər",
      audit: "Audit Girişləri",
      settings: "Sayt Tənzimləmələri",
      adminTeam: "Admin Heyəti",
      liveDb: "Neon DB-də Aktivdir",
      backToSite: "Sayta Qayıt",
      signOut: "Çıxış",
      newBadge: "Yeni",
    },
    headers: {
      overview: "İdarəetmə Paneli",
      tours: "Turlar və Təcrübələr İdarəetməsi",
      bookings: "Müştəri Sifarişləri və Rezervasiyalar",
      visas: "e-Viza Əməliyyatları və İcra Növbəsi",
      transfers: "Aeroport Transferləri və Sürücü İdarəetməsi",
      users: "İstifadəçi və Heyət Siyahısı",
      destinations: "İstiqamətlər və Regionlar",
      audit: "Sistem Audit və Təhlükəsizlik Girişləri",
      settings: "Platform Tənzimləmələri və Əməliyyat Nəzarəti",
    },
    actions: {
      saveSettings: "Bütün Tənzimləmələri Yadda Saxla",
      savingSettings: "Yadda saxlanılır...",
      refreshData: "Məlumatı Yenilə",
      refreshing: "Yenilənir...",
      openEvisaGov: "Rəsmi evisa.gov.az Aç",
      addDestination: "Yeni İstiqamət",
      addNewTour: "Yeni Tur Əlavə Et",
      search: "Axtarış...",
      filterAll: "Hamısı",
      exportCsv: "CSV İxrac Et",
      delete: "Sil",
      edit: "Düzəliş et",
      view: "Bax",
      save: "Yadda saxla",
      cancel: "Ləğv et",
      close: "Bağla",
      confirm: "Təsdiqlə",
      actions: "Əməliyyatlar",
    },
    stats: {
      totalRevenue: "Ümumi Gəlir",
      totalBookings: "Ümumi Sifarişlər",
      pendingBookings: "Gözləyən Sifarişlər",
      activeTours: "Aktiv Turlar",
      totalUsers: "Cəmi İstifadəçilər",
      allTimeGross: "Bütün dövrlər üzrə",
      confirmedPending: "Təsdiqlənmiş və gözləyən",
      needsReview: "Baxış tələb edir",
      liveInCatalog: "Kataloqda aktiv",
      registeredTravelers: "Qeydiyyatlı səyahətçilər",
      totalDestinations: "Cəmi İstiqamətlər",
      catalogedRegions: "Kataloqdakı regionlar",
      azerbaijanRegions: "Azərbaycan Regionları",
      linkedTours: "Bağlı Turlar",
      activeTourPackages: "Aktiv tur paketləri",
      topDestination: "Ən Populyar İstiqamət",
    },
    status: {
      pending: "Gözləmədə",
      confirmed: "Təsdiqləndi",
      cancelled: "Ləğv edildi",
      refunded: "Qaytarıldı",
      completed: "Tamamlandı",
      received: "Qəbul edildi",
      processing: "İcrada",
      issued: "Verildi",
      rejected: "İmtina edildi",
      assigned: "Təyin edildi",
      active: "Aktiv",
      inactive: "Deaktiv",
    },
    common: {
      loading: "Yüklənir...",
      noDataFound: "Heç bir məlumat tapılmadı",
      customer: "Müştəri",
      traveler: "Səyahətçi",
      email: "E-poçt",
      phone: "Telefon",
      date: "Tarix",
      price: "Qiymət",
      amount: "Məbləğ",
      status: "Status",
      type: "Növ",
      title: "Başlıq",
      category: "Kateqoriya",
      location: "Məkan",
      duration: "Müddət",
      notes: "Qeydlər",
    },
  },
};

export function getAdminTranslations(language: LanguageCode): AdminTranslations {
  if (language === "AZ") {
    return ADMIN_TRANSLATIONS.AZ;
  }
  return ADMIN_TRANSLATIONS.EN;
}
