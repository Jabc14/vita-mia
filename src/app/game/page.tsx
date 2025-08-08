"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  text: string;
  options: { answer: string; next: string }[];
};

const questions: Record<string, Question> = {
  start: {
    id: "start",
    text: "Estás en un jardín lleno de flores, ¿qué haces primero?",
    options: [
      { answer: "Recojo una rosa roja", next: "rosa" },
      { answer: "Sigo un sendero con luces", next: "sendero" },
    ],
  },
  rosa: {
    id: "rosa",
    text: "La rosa tiene una nota escondida. ¿Quieres leerla?",
    options: [
      { answer: "Sí", next: "final-romantico" },
      { answer: "No", next: "final-misterioso" },
    ],
  },
  sendero: {
    id: "sendero",
    text: "El sendero te lleva a una fuente de agua. ¿Te acercas?",
    options: [
      { answer: "Sí", next: "final-sorpresa" },
      { answer: "No", next: "final-misterioso" },
    ],
  },
};

export default function GamePage() {
  const [current, setCurrent] = useState<Question>(questions.start);
  const router = useRouter();

  const handleAnswer = (next: string) => {
    if (next.startsWith("final-")) {
      router.push(`/final/${next}`);
    } else {
      setCurrent(questions[next]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-pink-100 to-red-300 p-6">
      <h1 className="text-2xl font-bold mb-4 text-pink-700">{current.text}</h1>
      <div className="flex flex-col gap-3">
        {current.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt.next)}
            className="bg-white border border-pink-300 px-4 py-2 rounded-lg shadow hover:bg-pink-50"
          >
            {opt.answer}
          </button>
        ))}
      </div>
    </div>
  );
}
