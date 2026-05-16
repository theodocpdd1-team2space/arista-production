import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARISTA Production | Sound System, LED & Lighting Gresik",
  description:
    "ARISTA Production adalah vendor event production untuk sound system, LED videotron, lighting, dan produk custom audio cable.",
  keywords: [
    "ARISTA Production",
    "sound system gresik",
    "sound system surabaya",
    "LED videotron",
    "lighting event",
    "vendor event production",
    "snake cable",
    "LAN to XLR",
  ],
  openGraph: {
    title: "ARISTA Production",
    description:
      "Sound System. LED Videotron. Stage Lighting. Custom Audio Cable.",
    url: "https://aristaproduction.com",
    siteName: "ARISTA Production",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
