import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Studio Flora - Flower Order Form",
  description: "Create your perfect floral arrangement with Studio Flora's easy-to-use order form. Fresh arrangements, cut flowers, and dish gardens for all occasions.",
  keywords: ["flowers", "floral arrangements", "bouquets", "wedding flowers", "funeral flowers", "birthday flowers", "studio flora"],
  authors: [{ name: "Studio Flora" }],
  creator: "Studio Flora",
  openGraph: {
    title: "Studio Flora - Flower Order Form",
    description: "Create your perfect floral arrangement with Studio Flora's easy-to-use order form.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Flora - Flower Order Form",
    description: "Create your perfect floral arrangement with Studio Flora's easy-to-use order form.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${inter.variable} ${dancingScript.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}