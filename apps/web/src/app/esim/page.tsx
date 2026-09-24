import type { Metadata } from "next";
import EsimClient from "./EsimClient";

export const metadata: Metadata = {
  title: "Azerbaijan Tourist eSIM (4G/5G) | High-Speed Mobile Internet",
  description:
    "Instant high-speed 4G/5G tourist eSIM for Azerbaijan. Instant QR delivery via email & WhatsApp. Keep your home number & WhatsApp active. Compatible with iPhone, Galaxy & Pixel.",
  keywords: [
    "Azerbaijan eSIM",
    "Baku tourist eSIM",
    "Azerbaijan internet SIM",
    "Baku airport mobile data",
    "Azerbaijan 5G tourist SIM",
    "eSIM Azerbaijan online",
    "Azercell tourist eSIM",
    "Bakcell tourist data",
  ],
  openGraph: {
    title: "Azerbaijan Tourist eSIM | Instant 4G/5G QR Delivery",
    description:
      "Stay connected the second you land in Baku. High-speed 4G/5G tourist data packages from 3GB to 20GB. Instant QR activation.",
    url: "https://addmetour.com/esim",
    type: "website",
  },
};

export default function EsimPage() {
  return <EsimClient />;
}
