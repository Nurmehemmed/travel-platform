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
  overviewTab: {
    title: string;
    subtitle: string;
    viewAll: string;
    colCustomer: string;
    colTour: string;
    colGuests: string;
    colTotal: string;
    colStatus: string;
    colAction: string;
    noBookings: string;
    guest: string;
    customTour: string;
    travelerSingular: string;
    travelerPlural: string;
    confirm: string;
  };
  toursTab: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    colDetails: string;
    colDestination: string;
    colDuration: string;
    colPricing: string;
    colRating: string;
    colVisibility: string;
    colActions: string;
    days: string;
    nights: string;
    daySingular: string;
    nightSingular: string;
    active: string;
    inactive: string;
    reviews: string;
    edit: string;
    delete: string;
    noTours: string;
    createNewTour: string;
  };
  bookingsTab: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    colCustomer: string;
    colTour: string;
    colTravelers: string;
    colTotal: string;
    colStatus: string;
    colDate: string;
    colActions: string;
    noBookings: string;
    confirmBtn: string;
    cancelBtn: string;
  };
  destinationsTab: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    colPhoto: string;
    colName: string;
    colCountry: string;
    colSlug: string;
    colTours: string;
    colActions: string;
    noDestinations: string;
    addBtn: string;
    editBtn: string;
    deleteBtn: string;
  };
  visasTab: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    colApplicant: string;
    colPassport: string;
    colRefCode: string;
    colType: string;
    colStatus: string;
    colDate: string;
    colActions: string;
    noVisas: string;
    markProcessing: string;
    markIssued: string;
    reject: string;
    viewDetails: string;
    standard: string;
    express: string;
  };
  transfersTab: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    colPassenger: string;
    colFlight: string;
    colRoute: string;
    colVehicle: string;
    colDate: string;
    colFare: string;
    colStatus: string;
    colActions: string;
    noTransfers: string;
    confirm: string;
    cancel: string;
    complete: string;
  };
  usersTab: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    colUser: string;
    colRole: string;
    colCreated: string;
    colActions: string;
    noUsers: string;
    adminRole: string;
    staffRole: string;
    userRole: string;
  };
  auditTab: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    colAction: string;
    colEntity: string;
    colActor: string;
    colIp: string;
    colTime: string;
    noLogs: string;
  };
  settingsTab: {
    title: string;
    subtitle: string;
    saveBtn: string;
    savingBtn: string;
    catAll: string;
    catGeneral: string;
    catPricing: string;
    catContact: string;
    catFeatures: string;
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
      pendingBookings: "Pending Action",
      activeTours: "Active Tours",
      totalUsers: "Total Users",
      allTimeGross: "From confirmed bookings",
      confirmedPending: "Across all travel seasons",
      needsReview: "Needs employer confirmation",
      liveInCatalog: "Published on site",
      registeredTravelers: "Registered travelers",
      totalDestinations: "Total Destinations",
      catalogedRegions: "Cataloged regions",
      azerbaijanRegions: "Azerbaijan Regions",
      linkedTours: "Linked Tours",
      activeTourPackages: "Active tour packages",
      topDestination: "Top Destination",
    },
    overviewTab: {
      title: "Recent Customer Bookings",
      subtitle: "Live reservation requests from travelers",
      viewAll: "View all bookings →",
      colCustomer: "Customer",
      colTour: "Tour Experience",
      colGuests: "Guests",
      colTotal: "Total",
      colStatus: "Status",
      colAction: "Action",
      noBookings: "No recent bookings found.",
      guest: "Guest",
      customTour: "Custom Tour",
      travelerSingular: "Traveler",
      travelerPlural: "Travelers",
      confirm: "Confirm",
    },
    toursTab: {
      title: "All Tours & Experiences",
      subtitle: "Manage tour catalog, pricing, durations, and public visibility",
      searchPlaceholder: "Search tours...",
      colDetails: "Tour Details",
      colDestination: "Destination",
      colDuration: "Duration",
      colPricing: "Pricing",
      colRating: "Rating",
      colVisibility: "Site Visibility",
      colActions: "Actions",
      days: "days",
      nights: "nights",
      daySingular: "day",
      nightSingular: "night",
      active: "Active",
      inactive: "Hidden",
      reviews: "reviews",
      edit: "Edit",
      delete: "Delete",
      noTours: "No tours match your search.",
      createNewTour: "Create New Tour",
    },
    bookingsTab: {
      title: "All Bookings & Reservations",
      subtitle: "Manage customer bookings, deposits, confirmations and cancellations",
      searchPlaceholder: "Search by customer, email or tour...",
      filterAll: "All Statuses",
      colCustomer: "Customer",
      colTour: "Booked Tour",
      colTravelers: "Travelers",
      colTotal: "Total Price",
      colStatus: "Status",
      colDate: "Booked Date",
      colActions: "Actions",
      noBookings: "No bookings found matching filters.",
      confirmBtn: "Confirm",
      cancelBtn: "Cancel",
    },
    destinationsTab: {
      title: "Destinations & Regions",
      subtitle: "Manage featured locations, cities, and regional guides",
      searchPlaceholder: "Search destinations by name, region or slug...",
      colPhoto: "Photo",
      colName: "Destination",
      colCountry: "Country / Region",
      colSlug: "Slug",
      colTours: "Linked Tours",
      colActions: "Actions",
      noDestinations: "No destinations found matching your search.",
      addBtn: "Add Destination",
      editBtn: "Edit",
      deleteBtn: "Delete",
    },
    visasTab: {
      title: "e-Visa Processing Queue",
      subtitle: "Review, process, issue or reject incoming tourist and business visas",
      searchPlaceholder: "Search applicant, ref, passport...",
      colApplicant: "Applicant",
      colPassport: "Passport",
      colRefCode: "Ref Code",
      colType: "Visa Type",
      colStatus: "Status",
      colDate: "Created",
      colActions: "Actions",
      noVisas: "No e-Visa applications match your search.",
      markProcessing: "Process",
      markIssued: "Issue Visa",
      reject: "Reject",
      viewDetails: "View Details",
      standard: "Standard",
      express: "Express",
    },
    transfersTab: {
      title: "Airport Transfers & Chauffeur Queue",
      subtitle: "Manage airport arrivals, hotel drop-offs and chauffeur assignments",
      searchPlaceholder: "Search passenger, ref, flight, phone...",
      colPassenger: "Passenger",
      colFlight: "Flight & Airport",
      colRoute: "Pickup & Dropoff",
      colVehicle: "Vehicle",
      colDate: "Date & Time",
      colFare: "Fare",
      colStatus: "Status",
      colActions: "Actions",
      noTransfers: "No transfer bookings match your search.",
      confirm: "Confirm",
      cancel: "Cancel",
      complete: "Complete",
    },
    usersTab: {
      title: "Users & Staff Directory",
      subtitle: "Platform administrators, managers, and registered travelers",
      searchPlaceholder: "Search users by name or email...",
      colUser: "User",
      colRole: "Role",
      colCreated: "Joined",
      colActions: "Actions",
      noUsers: "No users match your search query.",
      adminRole: "Administrator",
      staffRole: "Staff Member",
      userRole: "Customer",
    },
    auditTab: {
      title: "System Audit Trail & Security Logs",
      subtitle: "Comprehensive activity log of all admin operations and data changes",
      searchPlaceholder: "Search action, entity ID, email, IP...",
      colAction: "Action",
      colEntity: "Entity",
      colActor: "Actor",
      colIp: "IP Address",
      colTime: "Timestamp",
      noLogs: "No audit records found matching your filters.",
    },
    settingsTab: {
      title: "Platform Settings & Operations Control",
      subtitle: "Configure live pricing, currency rates, support contact and site metadata",
      saveBtn: "Save All Settings",
      savingBtn: "Saving Settings...",
      catAll: "All Settings",
      catGeneral: "General",
      catPricing: "Pricing & Currency",
      catContact: "Support & Contact",
      catFeatures: "Features & Flags",
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
      allTimeGross: "Təsdiqlənmiş sifarişlərdən",
      confirmedPending: "Bütün səyahət mövsümləri üzrə",
      needsReview: "Təsdiq tələb olunur",
      liveInCatalog: "Saytda dərc edilib",
      registeredTravelers: "Qeydiyyatlı səyahətçilər",
      totalDestinations: "Cəmi İstiqamətlər",
      catalogedRegions: "Kataloqdakı regionlar",
      azerbaijanRegions: "Azərbaycan Regionları",
      linkedTours: "Bağlı Turlar",
      activeTourPackages: "Aktiv tur paketləri",
      topDestination: "Ən Populyar İstiqamət",
    },
    overviewTab: {
      title: "Son Müştəri Sifarişləri",
      subtitle: "Səyahətçilərdən daxil olan canlı rezervasiya sorğuları",
      viewAll: "Bütün sifarişlərə bax →",
      colCustomer: "Müştəri",
      colTour: "Tur Təcrübəsi",
      colGuests: "Qonaqlar",
      colTotal: "Məbləğ",
      colStatus: "Status",
      colAction: "Əməliyyat",
      noBookings: "Son sifariş tapılmadı.",
      guest: "Qonaq",
      customTour: "Fərdi Tur",
      travelerSingular: "Səyahətçi",
      travelerPlural: "Səyahətçi",
      confirm: "Təsdiqlə",
    },
    toursTab: {
      title: "Bütün Turlar və Təcrübələr",
      subtitle: "Tur kataloqu, qiymətlər, müddət və sayt görünüşünü idarə edin",
      searchPlaceholder: "Turları axtar...",
      colDetails: "Tur Məlumatları",
      colDestination: "İstiqamət",
      colDuration: "Müddət",
      colPricing: "Qiymət",
      colRating: "Reytinq",
      colVisibility: "Saytda Görünüş",
      colActions: "Əməliyyatlar",
      days: "gün",
      nights: "gecə",
      daySingular: "gün",
      nightSingular: "gecə",
      active: "Aktiv",
      inactive: "Gizli",
      reviews: "rəy",
      edit: "Düzəliş et",
      delete: "Sil",
      noTours: "Axtarışa uyğun tur tapılmadı.",
      createNewTour: "Yeni Tur Yarat",
    },
    bookingsTab: {
      title: "Bütün Sifarişlər və Rezervasiyalar",
      subtitle: "Müştəri sifarişləri, depozitlər, təsdiqlər və ləğvləri idarə edin",
      searchPlaceholder: "Müştəri, e-poçt və ya tur üzrə axtar...",
      filterAll: "Bütün Statuslar",
      colCustomer: "Müştəri",
      colTour: "Sifariş Edilən Tur",
      colTravelers: "Səyahətçilər",
      colTotal: "Ümumi Məbləğ",
      colStatus: "Status",
      colDate: "Sifariş Tarixi",
      colActions: "Əməliyyatlar",
      noBookings: "Filtrə uyğun sifariş tapılmadı.",
      confirmBtn: "Təsdiqlə",
      cancelBtn: "Ləğv et",
    },
    destinationsTab: {
      title: "İstiqamətlər və Regionlar",
      subtitle: "Seçilmiş məkanlar, şəhərlər və regional bələdçiləri idarə edin",
      searchPlaceholder: "Ad, region və ya slug üzrə axtar...",
      colPhoto: "Şəkil",
      colName: "İstiqamət",
      colCountry: "Ölkə / Region",
      colSlug: "Slug",
      colTours: "Bağlı Turlar",
      colActions: "Əməliyyatlar",
      noDestinations: "Axtarışa uyğun istiqamət tapılmadı.",
      addBtn: "Yeni İstiqamət",
      editBtn: "Düzəliş et",
      deleteBtn: "Sil",
    },
    visasTab: {
      title: "e-Viza Müraciətləri Növbəsi",
      subtitle: "Daxil olan turist və biznes vizalarını yoxlayın, icra edin, təsdiqləyin və ya imtina edin",
      searchPlaceholder: "Müraciətçi, kod, pasport axtar...",
      colApplicant: "Müraciətçi",
      colPassport: "Pasport",
      colRefCode: "Müraciət Kodu",
      colType: "Viza Növü",
      colStatus: "Status",
      colDate: "Tarix",
      colActions: "Əməliyyatlar",
      noVisas: "Axtarışa uyğun e-Viza müraciəti tapılmadı.",
      markProcessing: "İcraya götür",
      markIssued: "Viza Ver",
      reject: "İmtina et",
      viewDetails: "Ətraflı bax",
      standard: "Standart",
      express: "Ekspres",
    },
    transfersTab: {
      title: "Aeroport Transferləri və Sürücü Növbəsi",
      subtitle: "Hava limanı qarşılamaları, hotel çatdırılmaları və sürücü təyinatını idarə edin",
      searchPlaceholder: "Sərnişin, kod, reys, telefon axtar...",
      colPassenger: "Sərnişin",
      colFlight: "Reys və Aeroport",
      colRoute: "Marşrut",
      colVehicle: "Nəqliyyat",
      colDate: "Tarix və Saat",
      colFare: "Məbləğ",
      colStatus: "Status",
      colActions: "Əməliyyatlar",
      noTransfers: "Axtarışa uyğun transfer sifarişi tapılmadı.",
      confirm: "Təsdiqlə",
      cancel: "Ləğv et",
      complete: "Tamamla",
    },
    usersTab: {
      title: "İstifadəçilər və Heyət Siyahısı",
      subtitle: "Platform inzibatçıları, menecerlər və qeydiyyatlı səyahətçilər",
      searchPlaceholder: "Ad və ya e-poçt üzrə axtar...",
      colUser: "İstifadəçi",
      colRole: "Rol",
      colCreated: "Qeydiyyat",
      colActions: "Əməliyyatlar",
      noUsers: "Axtarışa uyğun istifadəçi tapılmadı.",
      adminRole: "İnzibatçı",
      staffRole: "Heyət Üzvü",
      userRole: "Müştəri",
    },
    auditTab: {
      title: "Sistem Audit və Təhlükəsizlik Girişləri",
      subtitle: "Bütün admin əməliyyatları və məlumat dəyişikliklərinin fəaliyyət jurnalı",
      searchPlaceholder: "Əməliyyat, ID, e-poçt, IP axtar...",
      colAction: "Əməliyyat",
      colEntity: "Obyekt",
      colActor: "İstifadəçi",
      colIp: "IP Ünvanı",
      colTime: "Zaman",
      noLogs: "Axtarışa uyğun audit qeydi tapılmadı.",
    },
    settingsTab: {
      title: "Platform Tənzimləmələri və Əməliyyat Nəzarəti",
      subtitle: "Canlı qiymətlər, məzənnələr, əlaqə və sayt tənzimləmələrini idarə edin",
      saveBtn: "Bütün Tənzimləmələri Yadda Saxla",
      savingBtn: "Yadda saxlanılır...",
      catAll: "Bütün Tənzimləmələr",
      catGeneral: "Ümumi",
      catPricing: "Qiymət və Valyuta",
      catContact: "Dəstək və Əlaqə",
      catFeatures: "Funksiyalar",
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
