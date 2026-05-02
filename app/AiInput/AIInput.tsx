'use client';

import { Button } from "@/components/ui/button";
import { aiInteract } from "./action";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function AIInput() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const handleCLick = async () => {
    try {
      setIsLoading(true);
      const responseText = await aiInteract();

      if (responseText) {
        setResult(responseText);
      }
      setIsLoading(false);
    } catch (err) {
      console.error('handleClick:::ERROR', err);
      setIsLoading(false);
    }
  }
  return (
    <div className="flex items-center flex-col gap-y-4 w-1/2">
      <Button
        onClick={handleCLick}
      >Click me</Button>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex bg-primary text-background rounded-sm py-4 px-6 w-full">{result}</div>
      )}
    </div>
  )
}