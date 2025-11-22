"use client";

import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

interface QuizResultProps {
  percentage: number;
  onRetake: () => void;
}

export default function QuizResult({ percentage, onRetake }: QuizResultProps) {
  const tier = (() => {
    if (percentage <= 25) return { title: "Casual Dreamer", image: "/casual-dreamer.png" };
    if (percentage <= 50) return { title: "Weekend Innovator", image: "/weekend-innovator.png" };
    if (percentage <= 75) return { title: "Relentless Builder", image: "/relentless-builder.png" };
    return { title: "Full‑Throttle Visionary", image: "/full-throttle-visionary.png" };
  })();

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">{tier.title}</h2>
      <img src={tier.image} alt={tier.title} width={512} height={512} className="rounded" />
      <p className="text-lg">{percentage}% Elon</p>
      <div className="flex gap-4">
        <Button onClick={onRetake}>Retake Quiz</Button>
        <Share text={`I scored ${percentage}% Elon! ${url}`} />
      </div>
    </div>
  );
}
