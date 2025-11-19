import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MasakCook - Discover & Share Amazing Recipes",
  description:
    "Discover thousands of delicious recipes from home cooks around the world. Search by ingredient, cuisine, or diet. Save your favorites and share your own creations!",
  keywords: [
    "recipes",
    "cooking",
    "food",
    "cuisine",
    "meal planning",
    "home cooking",
    "recipe sharing",
  ],
  authors: [{ name: "MasakCook Team" }],
  openGraph: {
    title: "MasakCook - Discover & Share Amazing Recipes",
    description:
      "Discover thousands of delicious recipes from home cooks around the world.",
    type: "website",
    locale: "en_US",
    siteName: "MasakCook",
  },
  twitter: {
    card: "summary_large_image",
    title: "MasakCook - Discover & Share Amazing Recipes",
    description:
      "Discover thousands of delicious recipes from home cooks around the world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
