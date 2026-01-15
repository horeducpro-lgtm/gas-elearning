"use client";

import React, { useState } from 'react';

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onNext: () => void;
}

export default function QuizCard({ question, options, correctAnswer, onNext }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{question}</h2>
      <div className="grid gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => !selected && setSelected(option)}
            className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
              selected === option 
                ? (option === correctAnswer ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700")
                : "bg-gray-50 border-gray-200 hover:border-blue-400 text-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-8 flex flex-col items-center">
          <button onClick={() => { setSelected(null); onNext(); }} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}