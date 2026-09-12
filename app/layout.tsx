import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "600", "700"],
});

const rocaOne = localFont({
  src: [
    {
      path: "./fonts/roca-one/RocaOne-Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/roca-one/RocaOne-It.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/roca-one/RocaOne-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/roca-one/RocaOne-BdIt.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-roca",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MyTripDesigner — Créatrice de voyages sur mesure",
    template: "%s | MyTripDesigner",
  },
  description:
    "MyTripDesigner conçoit des itinéraires sur mesure : carnet de voyage détaillé, bonnes adresses et logistique gérée de bout en bout.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${rocaOne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
