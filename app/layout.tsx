import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WalletAdapter from "@/components/WalletAdapter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          `flex flex-col min-h-screen
          ${geistSans.variable} ${geistMono.variable} antialiased`
        }
        >
          <WalletAdapter>
            <Navbar/>
            <main className="flex-1">
            {children}
            </main>
          </WalletAdapter>
      </body>
    </html>
  );
}
