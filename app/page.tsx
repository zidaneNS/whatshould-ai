import Image from "next/image";
import { IoSparklesOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import HeroButtonSection from "./sections/HeroButtonSection";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-x-8 px-12">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-2 bg-foreground text-background py-2 px-4 w-fit">
          <IoSparklesOutline />
          <p>WhatShould AI Engine</p>
        </div>

        <h1 className="text-5xl font-semibold">Simulate Your Future with Aiko.</h1>

        <div className="flex flex-col gap-y-2">
          <p className="py-1 px-2 bg-foreground w-fit text-background">Stop overthinking</p>
          <p>Tell Aiko what you're considering, and get clear, structured simulations of what could happen next — from best-case to worst-case — so you can move forward with confidence.</p>
        </div>

        <HeroButtonSection />
      </div>
      <Image
        src="/aiko.png"
        alt="Aiko"
        width={800}
        height={800}
        className="object-cover object-center h-screen w-auto"
      />
    </div>
  )
}