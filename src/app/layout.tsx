import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rizcent Technologies",
    template: "%s | Rizcent Technologies",
  },

  description:
    "Rizcent Technologies builds modern digital products and helps businesses secure their technology with practical cybersecurity solutions.",

  keywords: [
    "Rizcent Technologies",
    "software development",
    "web development",
    "SaaS development",
    "mobile app development",
    "cybersecurity",
    "penetration testing",
    "security audit",
  ],

  applicationName: "Rizcent Technologies",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Rizcent Technologies",
    title: "Rizcent Technologies",
    description:
      "Rizcent Technologies builds modern digital products and helps businesses secure their technology with practical cybersecurity solutions.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rizcent Technologies",
    description:
      "Rizcent Technologies builds modern digital products and helps businesses secure their technology with practical cybersecurity solutions.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060a16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}