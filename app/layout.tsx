import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./font";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "WhatShould AI",
  description: "AI Life Decision Simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.className)}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
