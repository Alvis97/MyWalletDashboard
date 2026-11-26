import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { Manrope, Inter } from "next/font/google"
import Navbar from "@/components/AppWrapper";
import WalletAdapter from "@/components/WalletAdapter";
import AppWrapper from "@/components/AppWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={
          `flex flex-col min-h-screen
          tracking-tight antialiased
          ${inter.variable} ${manrope.variable}`
        }
        >
         <AppWrapper>
          {children}
         </AppWrapper>
      </body>
    </html>
  );
}
