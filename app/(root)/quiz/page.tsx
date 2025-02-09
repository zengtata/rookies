"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const questions = [
  {
    question: "Which language are you most comfortable with?",
    options: ["JavaScript", "Python", "Java", "C++"],
  },
  {
    question: "What is your primary interest?",
    options: [
      "Software Engineering",
      "Data Science",
      "Cybersecurity",
      "Business Analysis",
    ],
  },
  {
    question: "How do you prefer to work?",
    options: ["Independently", "In teams", "Flexible", "Structured"],
  },
];

interface Answers {
  [key: number]: string;
}

const Page = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedAnswer, setSelectedAnswer] = useState<{
    [key: number]: string;
  }>({});
  const router = useRouter();

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [questionIndex]: answer }));
    setSelectedAnswer((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = async () => {
    // Extract skills and interests from the answers
    const skills = [answers[0]]; // Assuming skills are stored in index 0
    const interests = [answers[1]]; // Assuming interests are stored in index 1
    const workPreference = answers[2]; // Assuming work preference is stored in index 2

    // Send the answers to the recommendation API
    const response = await fetch("/api/recommend", {
      method: "POST",
      body: JSON.stringify({ skills, interests, workPreference }),
      headers: { "Content-Type": "application/json" },
    });

    // Check if the response was successful
    if (!response.ok) {
      console.error("Failed to get recommendations", response.status);
      alert("Error in recommendation API");
      return;
    }

    try {
      const data = await response.json();

      if (data.success) {
        // Redirect to recommendation page with the results
        router.push("/recommendation");
      } else {
        // Log the error and display it to the user
        console.error("Recommendation error:", data.error);
        alert("Error in recommendation: " + data.error);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Error processing recommendation response");
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Quiz</h1>
      {questions.map((q, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-xl font-medium text-gray-700">{q.question}</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {q.options.map((option, idx) => (
              <Button
                key={idx}
                onClick={() => handleAnswer(index, option)}
                className={`${
                  selectedAnswer[index] === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Page;
