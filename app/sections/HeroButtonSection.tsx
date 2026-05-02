'use client';

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroButtonSection() {
  const router = useRouter();

  return (
    <div className="flex gap-x-2 items-center">
      <Button
        className="p-6 rounded-sm text-xl"
        onClick={() => router.push('/simulation')}
        >
        Start Simulation
        <ArrowRightIcon />
      </Button>
      <Button
        className="p-6 rounded-sm text-xl"
        variant="outline"
        onClick={() => router.push('/methodology')}
      >View Methodology</Button>
    </div>
  )
}