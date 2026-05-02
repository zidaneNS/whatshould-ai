'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import { IoSparkles } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

interface Navlink {
  label: string;
  href: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const navLinks: Navlink[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Simulation',
      href: '/simulation',
    },
    {
      label: 'Methods',
      href: '/method',
    },
    {
      label: 'Pricing',
      href: '/pricing',
    },
  ];


  return (
    <nav className="sticky top-0 bg-background z-20 py-4 px-12 border-b border-foreground flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <p className="text-xl font-semibold">WhatShould AI</p>
        <IoSparkles />
      </div>

      <div className="flex items-center gap-x-6">
        {navLinks.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className={`${pathname === item.href ? 'font-semibold' : ''}`}
          >{item.label}</Link>
        ))}
      </div>

      <Button
        size="lg"
        onClick={() => router.push('/simulation')}
      >Get Started</Button>
    </nav>
  )
}