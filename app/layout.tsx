import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WalletAdapter from "@/components/WalletAdapter";

const unbounded = Unbounded ({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-unbounded",
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
          ${unbounded.className} tracking-tight antialiased`
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
