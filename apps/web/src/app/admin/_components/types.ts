import { LanguageCode } from "@/lib/i18n";

export type AdminLanguage = LanguageCode;

export interface AuditLogItem {
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

export interface AdminStats {
  totalRevenue: number;
  totalBookings: number;
  pendingBookings: number;
  activeTours: number;
  totalUsers: number;
}

export interface BookingItem {
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

export interface TourItem {
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

export interface UserItem {
  id: string;
  name?: string | null;
  email: string;
  role: string;
  image?: string | null;
  createdAt: string;
  bookingCount: number;
}

export interface DestinationItem {
  id: string;
  name: string;
  country: string;
  slug: string;
  heroImageUrl?: string | null;
  tourCount: number;
}

export interface VisaItem {
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

export interface TransferItem {
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
  femaleDriver?: boolean | null;
  additionalGuide?: boolean | null;
  driverName?: string | null;
  driverPhone?: string | null;
  adminNotes?: string | null;
  createdAt: string;
}

export interface TourReservationItem {
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

export interface SiteSettingItem {
  key: string;
  value: any;
  category: string;
  label: string;
  description?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
}

export interface LightboxImage {
  url: string;
  title: string;
}

export interface DestinationPreset {
  name: string;
  country: string;
  slug: string;
  image: string;
  desc: string;
}

export const AZERBAIJAN_DESTINATION_PRESETS: DestinationPreset[] = [
  {
    name: "Baku",
    country: "Azerbaijan",
    slug: "baku",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=80",
    desc: "Old City, Maiden Tower & Flame Towers",
  },
  {
    name: "Sheki",
    country: "Azerbaijan",
    slug: "sheki",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=80",
    desc: "Khan Palace & Silk Road Heritage",
  },
  {
    name: "Gobustan",
    country: "Azerbaijan",
    slug: "gobustan",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80",
    desc: "Mud Volcanoes & Prehistoric Rock Art",
  },
  {
    name: "Absheron",
    country: "Azerbaijan",
    slug: "absheron",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&q=80",
    desc: "Ateshgah Fire Temple & Yanar Dag",
  },
  {
    name: "Gabala",
    country: "Azerbaijan",
    slug: "gabala",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&q=80",
    desc: "Tufandag Mountains & Nohur Lake",
  },
  {
    name: "Quba",
    country: "Azerbaijan",
    slug: "quba",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&q=80",
    desc: "Caucasus Foothills & Red Village",
  },
  {
    name: "Shusha",
    country: "Azerbaijan",
    slug: "shusha",
    image: "https://images.unsplash.com/photo-1511497584788-87676104235f?w=1000&q=80",
    desc: "Cultural Capital & Jidir Duzu",
  },
];

export type TabType =
  | "overview"
  | "tours"
  | "bookings"
  | "users"
  | "destinations"
  | "visas"
  | "transfers"
  | "audit"
  | "settings";
