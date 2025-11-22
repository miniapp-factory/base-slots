"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";
import QuizResult from "./quiz-result";

const questions = [
  {
    question: "What is your favorite type of innovation?",
    options: [
      { text: "Space exploration", value: 1 },
      { text: "Electric vehicles", value: 1 },
      { text: "Social media", value: 0 },
      { text: "Cooking", value: 0 },
    ],
  },
  {
    question: "How often do you work on side projects?",
    options: [
      { text: "Every day", value: 1 },
      { text: "Once a week", value: 0.5 },
      { text: "Rarely", value: 0 },
      { text: "Never", value: 0 },
    ],
  },
  {
    question: "What’s your attitude toward risk?",
    options: [
      { text: "I love taking big risks", value: 1 },
      { text: "I take calculated risks", value: 0.5 },
      { text: "I avoid risks", value: 0 },
      { text: "I only take safe bets", value: 0 },
    ],
  },
  {
    question: "Which industry excites you the most?",
    options: [
      { text: "Space tech", value: 1 },
      { text: "Renewable energy", value: 0.5 },
      { text: "Finance", value: 0 },
      { text: "Fashion", value: 0 },
    ],
  },
  {
    question: "How do you handle criticism?",
    options: [
      { text: "I use it to improve", value: 1 },
      { text: "I ignore it", value: 0.5 },
      { text: "I get defensive", value: 0 },
      { text: "I avoid it", value: 0 },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setShuffledQuestions(questions.map(q => ({ ...q, options: shuffleArray(q.options) })));
  }, []);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const value = shuffledQuestions[currentIndex].options[selectedOption].value;
    setScore(prev => prev + value);
    setSelectedOption(null);
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetake = () => {
    setScore(0);
    setShowResult(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShuffledQuestions(questions.map(q => ({ ...q, options: shuffleArray(q.options) })));
  };

  if (showResult) {
    const percentage = Math.round((score / 5) * 100);
    return (
      <QuizResult percentage={percentage} onRetake={handleRetake} />
    );
  }

  const currentQuestion = shuffledQuestions[currentIndex];

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
      <div className="space-y-2">
        {currentQuestion.options.map((opt, idx) => (
          <Button
            key={idx}
            variant={selectedOption === idx ? "secondary" : "outline"}
            onClick={() => handleOptionSelect(idx)}
            className="w-full justify-start"
          >
            {opt.text}
          </Button>
        ))}
      </div>
      <Button
        onClick={handleNext}
        disabled={selectedOption === null}
        className="w-full"
      >
        {currentIndex + 1 === shuffledQuestions.length ? "Finish" : "Next"}
      </Button>
    </div>
  );
}
