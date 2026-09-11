import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Payment — Azerbaijan e-Visa",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VisaPayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
