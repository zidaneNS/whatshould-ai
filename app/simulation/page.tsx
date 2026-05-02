import { Separator } from "@/components/ui/separator";
import AiInputSection from "./sections/AiInputSection";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col py-8 px-12 gap-y-6">
      <h1 className="text-5xl font-semibold">Simulation Protocol</h1>
      <p className="max-w-2/3">Explain your situation. Ask Aiko to be the expert on the root of your problem if you want. Aiko will provide a simulation of the results of several decisions made from your situation</p>

      <Separator
        className="bg-foreground"
      />

      <AiInputSection />
    </div>
  )
}