'use client';

import Image from "next/image";
import HeroButtonSection from "./HeroButtonSection";
import { IoSparklesOutline } from "react-icons/io5";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-x-8 px-12">
      <motion.div
        className="flex flex-col gap-y-6 max-w-1/2"
        initial={{
          translateX: -300,
          opacity: 0,
        }}
        whileInView={{
          translateX: 0,
          opacity: 100,
          transition: { duration: 0.5 }
        }}
      >
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
      </motion.div>

      <motion.div
        className="flex"
        initial={{
          translateX: 300,
          opacity: 0,
        }}
        whileInView={{
          translateX: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        viewport={{ once: true }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/aiko.png"
          alt="Aiko"
          width={800}
          height={800}
          className="object-cover object-center h-screen w-auto"
        />
      </motion.div>
    </div>
  )
}