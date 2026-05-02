'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoSparkles } from "react-icons/io5";
import { useActionState, useEffect, useRef, useState } from "react";
import { generateAnswers } from "../action";
import { Spinner } from "@/components/ui/spinner";
import ErrorInput from "@/components/ErrorInput";
import AiResultItem, { AiResult } from "../components/AiResultItem";

const aiResult = {
  outcome: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius consequatur a molestiae magnam maxime eligendi illum, velit ipsum quis saepe repellendus possimus quibusdam corporis explicabo, commodi sunt quam veritatis quidem, perferendis sint eaque. Blanditiis cupiditate architecto dolores! Consectetur molestiae excepturi fugiat, illum doloribus ad laborum delectus voluptates earum ratione quas rerum modi voluptas vero veritatis non officia aliquam? Culpa architecto doloribus aliquid. Non sunt odit praesentium, omnis adipisci porro esse ex quibusdam sed veritatis beatae eum nobis, perspiciatis ipsam minima totam dicta id tenetur corrupti consequuntur ratione, cupiditate numquam enim error! Odio, ut vitae quaerat veniam ipsa fugit ipsum natus!',
  reason: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, commodi.',
  advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia obcaecati cupiditate perferendis! Itaque autem doloremque necessitatibus magnam beatae officia. Soluta fuga esse, dolor maiores itaque vel nam veritatis. Obcaecati, excepturi!',
}

export default function AiInputSection() {
  const [state, action, pending] = useActionState(generateAnswers, undefined);
  const [errMessage, setErrMessage] = useState<string>('');
  const [bestResult, setBestResult] = useState<AiResult | null>(null);
  const [realisticResult, setRealisticResult] = useState<AiResult | null>(null);
  const [worstResult, setWorstResult] = useState<AiResult | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (state?.data && state.success) {
      console.log('data', state.data);

      if (
        !state.data.best?.outcome ||
        !state.data.best?.reason ||
        !state.data.best?.advice ||
        !state.data.realistic?.outcome ||
        !state.data.realistic?.reason ||
        !state.data.realistic?.advice ||
        !state.data.worst?.outcome ||
        !state.data.worst?.reason ||
        !state.data.worst?.advice
      ) {
        setErrMessage('The engine is not support yet for the prompt, please ensure your prompt is more descriptive');
        return;
      }

      setBestResult(state.data.best || null);
      setRealisticResult(state.data.realistic || null);
      setWorstResult(state.data.worst || null);

      if (!resultRef.current) return;
      resultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setErrMessage('');
  }, [state]);

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <form
        className="flex gap-x-6 w-full mt-8"
        action={action}
      >
        <div className="flex flex-col gap-y-6 w-full flex-1">
          <div className="flex flex-col p-3 rounded-sm border border-foreground gap-y-3">
            <p>Tell Aiko your situation</p>
            <textarea
              name="prompt"
              id="prompt"
              rows={6}
              placeholder="I have a pretty busy routine, internships, thesis, etc. However, I want to learn new skills and I want to find additional income, would it be a solution if I sacrifice my rest time for this?"
              className="outline-none"
            />
            {state?.errors?.prompt && <ErrorInput errorMessage={state.errors.prompt} />}
          </div>

          {pending ? (
            <div className="flex items-center gap-x-4 mx-auto">
              <p className="text-sm">Generating Results</p>
              <Spinner />
            </div>
          ) : (
            <Button
              className="py-6 px-12 mx-auto"
              type="submit"
            >
              <IoSparkles />
              Generate
            </Button>
          )}
          {state?.message && <ErrorInput errorMessage={state.message} />}
          {errMessage && <ErrorInput errorMessage={errMessage} />}
        </div>

        <div className="flex flex-col py-4 px-6 rounded-sm border border-foreground bg-accent items-center">
          <Image
            src="/aiko.png"
            alt="Aiko"
            height={800}
            width={800}
            className="rounded-full w-48 aspect-square object-cover object-center"
          />
          <p
            className="font-semibold mx-auto text-center text-xl"
          >Aiko</p>
          <p className="text-center">What do you want Aiko to be?</p>

          <div className="flex flex-col gap-y-2 p-2 rounded-sm border border-accent-foreground w-full">
            <textarea
              name="aikoAs"
              id="aikoAs"
              placeholder="e.g. psychologist and expert in IT"
              className="outline-none"
            />
          </div>
          {state?.errors?.aikoAs && <ErrorInput errorMessage={state.errors.aikoAs} />}
        </div>
      </form>

      {bestResult && realisticResult && worstResult && (
        <>
          <h1 className="text-3xl font-semibold text-center">Result</h1>
          <div
            className="grid grid-cols-3 w-full gap-8"
            ref={resultRef}
          >
            <AiResultItem
              variant="best"
              aiResult={bestResult}
            />
            <AiResultItem
              variant="realistic"
              aiResult={realisticResult}
            />
            <AiResultItem
              variant="worst"
              aiResult={worstResult}
            />
          </div>
        </>
      )}
    </div>
  )
}