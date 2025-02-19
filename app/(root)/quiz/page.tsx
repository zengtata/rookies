"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const questions = [
  {
    question: "Which of these activities do you enjoy most?",
    options: [
      "Solving problems and puzzles",
      "Helping others and making a positive impact",
      "Expressing creativity and imagination",
      "None of these",
    ],
  },
  {
    question: "What type of work setting do you prefer?",
    options: [
      "Fast-paced and constantly evolving",
      "Collaborative with a focus on teamwork",
      "Quiet, with independent tasks",
      "None of these",
    ],
  },
  {
    question: "What’s your preferred way of learning new skills?",
    options: [
      "Hands-on experience and trial-and-error",
      "Reading, research, and self-study",
      "Discussion and group activities",
      "None of these",
    ],
  },
  {
    question: "What are your long-term career ambitions?",
    options: [
      "Achieve financial stability",
      "Pursue a career that makes a positive societal impact",
      "Have a creative career that allows for personal expression",
      "Become an expert in a specific field",
      "Something else",
    ],
  },
  {
    question: "How do you manage stress or challenging situations?",
    options: [
      "I thrive on challenges and work well under pressure",
      "I prefer a steady pace and avoid stressful situations",
      "I use creative outlets to cope with stress",
      "None of these",
    ],
  },
  {
    question: "Which skill would you consider your strongest?",
    options: [
      "Problem-solving and analytical thinking",
      "Communication and collaboration",
      "Creativity and innovative thinking",
      "Leadership and team management",
      "Adaptability to change",
      "Something else",
    ],
  },
  {
    question: "When working with others, which role do you usually take on?",
    options: ["Leader", "Organiser", "Idea generator", "Listener", "Other"],
  },
  {
    question: "How do you prefer to communicate with others?",
    options: [
      "Face-to-face interaction",
      "Via phone or video calls",
      "Through email or text messages",
      "It depends on the situation",
    ],
  },
  {
    question: "How do you approach conflict or disagreement in a team?",
    options: [
      "I try to find a solution that works for everyone",
      "I avoid conflict and hope it resolves on its own",
      "I stand firm on my opinions and try to defend them",
      "None of these",
    ],
  },
  {
    question: "What’s your approach to tackling complex problems?",
    options: [
      "Break it down into smaller tasks and tackle them one by one",
      "Think creatively and explore unconventional solutions",
      "Collaborate with others and seek input when needed",
      "Something else",
    ],
  },
  {
    question:
        "What coding languages are you familiar with or interested in learning?",
    options: [
      "Python",
      "Java",
      "C++",
      "JavaScript",
      "SQL",
      "Go",
      "R",
      "C#",
      "HTML/CSS",
      "I’m not familiar with any yet",
    ],
  },
];

interface Answers {
  [key: number]: string;
}

const Page = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const router = useRouter();

  // Toggle selection: if the same answer is clicked, clear it; otherwise, set it.
  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => {
      if (prev[questionIndex] === answer) {
        const updated = { ...prev };
        delete updated[questionIndex];
        return updated;
      }
      return { ...prev, [questionIndex]: answer };
    });
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const responses = questions.map((_, index) => answers[index]);
    localStorage.setItem("quizResponses", JSON.stringify(responses));

    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses }),
    });

    if (!response.ok) {
      console.error("Failed to get recommendations", response.status);
      alert("Error in recommendation API");
      return;
    }

    try {
      const data = await response.json();
      if (data.success) {
        router.push("/recommendation");
      } else {
        console.error("Recommendation error:", data.error);
        alert("Error in recommendation: " + data.error);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Error processing recommendation response");
    }
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
      <div className="h-screen overflow-hidden">
        {/* Header with sidebar trigger */}
        <header className="h-16 border-b flex items-center gap-4 px-4 shrink-0">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Career Quiz</h1>
        </header>

        {/* Main container: flex-col on mobile, flex-row on desktop */}
        <main className="flex flex-col md:flex-row p-4 mx-auto w-[90vw] md:w-[calc(100vw-16rem)] h-[calc(100vh-4rem)] overflow-hidden">
          {/* 3D Model Container (desktop only) */}
          <div className="hidden md:flex w-full md:w-1/3 border border-gray-300 items-center justify-center">
            <p className="text-lg font-medium">3D model</p>
          </div>

          {/* Questions Container within a ScrollArea */}
          <ScrollArea className="w-full md:w-2/3 h-full md:pl-4 hide-scrollbar">
            <div className="space-y-6 pb-8">
              {questions.map((q, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-medium text-gray-700 mb-8">
                      {q.question}
                    </h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {q.options.map((option, idx) => {
                        // If an answer is already selected, only render that one.
                        if (answers[index] && answers[index] !== option) return null;
                        return (
                            <Button
                                key={idx}
                                onClick={() => handleAnswer(index, option)}
                                className={`inline-flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out ${
                                    answers[index] === option
                                        ? "bg-blue-600 text-white border border-blue-600"
                                        : "bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                              {option}
                            </Button>
                        );
                      })}
                    </div>
                  </div>
              ))}
              <div className="flex justify-center mt-8">
                <Button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`px-6 py-3 rounded-lg shadow-md transition-colors duration-200 ease-in-out ${
                        allAnswered
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-400 text-gray-800 cursor-not-allowed"
                    }`}
                >
                  Submit
                </Button>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
  );
};

export default Page;
