import { Separator } from "@/components/ui/separator";
import { FaBalanceScale } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";

export interface AiResult {
  outcome: string;
  reason: string;
  advice: string;
}

interface AiResultProps {
  variant: 'best' | 'realistic' | 'worst';
  aiResult: {
    outcome: string;
    reason: string;
    advice: string;
  };
}

export default function AiResultItem({
  variant,
  aiResult,
}: AiResultProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 rounded-t-sm bg-foreground text-background flex items-center gap-x-3 justify-center">
        <p>{variant.toUpperCase()} CASE</p>
        {
          variant === 'best'
            ? <FaArrowTrendUp />
            : variant === 'realistic'
              ? <FaBalanceScale />
              : <IoWarningOutline />
        }
      </div>

      <div className="flex flex-col gap-y-4 p-4 border border-foreground border-b-0 text-foreground">
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">Outcome:</p>
          <p>{aiResult.outcome}</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-y-2">
        <p className="font-semibold">Reason:</p>
        <p>{aiResult.reason}</p>
        </div>

      </div>
      <div className="flex flex-col gap-y-2 border border-b-foreground border-x-foreground p-4 rounded-b-sm text-foreground bg-accent">
        <p className="text-accent-foreground font-semibold">AIKO'S ADVICE</p>
        <p>{aiResult.advice}</p>
      </div>
    </div>
  )
}