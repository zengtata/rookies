"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: string }>({});
  const router = useRouter();

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
    setSelectedAnswer((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Ensure that all questions have been answered.
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Convert answers object to an array of responses.
    const responses = Object.values(answers);

    // Save responses to localStorage for later use (e.g., in the RecommendationPage)
    localStorage.setItem("quizResponses", JSON.stringify(responses));

    // Send responses to the recommendation API endpoint.
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

  return (
      <div className="bg-gray-100 p-8 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-lg space-y-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Career Recommendation Quiz
          </h1>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-700">
              {questions[currentQuestionIndex].question}
            </h3>
            <ul className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, idx) => (
                  <li key={idx}>
                    <Button
                        onClick={() => handleAnswer(currentQuestionIndex, option)}
                        className={`${
                            selectedAnswer[currentQuestionIndex] === option
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800"
                        } w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out`}
                    >
                      {option}
                    </Button>
                  </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            {currentQuestionIndex > 0 && (
                <Button
                    onClick={handlePrevious}
                    className="w-auto bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 ease-in-out"
                >
                  Previous
                </Button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
                <Button
                    onClick={handleNext}
                    className="w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                >
                  Next
                </Button>
            ) : (
                <Button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                >
                  Submit
                </Button>
            )}
          </div>
        </div>
      </div>
  );
};

export default Page;
