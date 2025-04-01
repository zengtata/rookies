"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModelViewer } from "@/components/3dModel";

const questions = [
  // Section 1: Problem-Solving & Personality
  {
    question: "When solving a problem, you…",
    options: [
      "Follow a step-by-step process to avoid mistakes.",
      "Look for patterns or hidden insights in data.",
      "Brainstorm creative, outside-the-box solutions.",
      "Collaborate with others to find the best approach.",
    ],
  },
  {
    question: "How do you handle stress?",
    options: [
      "Stay calm and focus on solutions.",
      "Feel energized by high-pressure situations.",
      "Prefer to avoid stress with careful planning.",
      "Get overwhelmed but push through.",
    ],
  },

  // Section 2: Work Style & Environment
  {
    question: "Your ideal work environment is…",
    options: [
      "Remote with flexible hours.",
      "A structured office with clear routines.",
      "A collaborative open-plan space.",
      "A dynamic, fast-paced startup.",
    ],
  },
  {
    question: "How do you handle repetitive tasks?",
    options: [
      "Automate them with scripts/tools.",
      "Do them carefully to ensure consistency.",
      "Get bored but push through.",
      "Enjoy the predictability.",
    ],
  },

  // Section 3: Skills & Learning
  {
    question: "Which skills interest you most?",
    options: [
      "Coding/scripting (Python, Java, etc.).",
      "Data analysis or machine learning.",
      "Visual design or user experience.",
      "Networking or system administration.",
    ],
  },
  {
    question: "How do you learn best?",
    options: [
      "Hands-on projects or labs.",
      "Formal certifications/courses.",
      "Experimentation and trial/error.",
      "Mentorship or team collaboration.",
    ],
  },
  {
    question:
        "Which technical skills do you already have or want to explore? (Select all that apply)",
    options: [
      "Coding/scripting (e.g., Python, Java)",
      "Data analysis/machine learning",
      "Visual design (e.g., Figma, Adobe XD)",
      "Networking/system administration",
      "Cybersecurity tools (e.g., Wireshark, Kali Linux)",
      "Database management (SQL, NoSQL)",
      "None – I’m just starting out",
    ],
  },

  // Section 4: Career Goals & Values
  {
    question: "What matters most in your career?",
    options: [
      "Solving complex technical challenges.",
      "Protecting people’s privacy/safety.",
      "Leading teams and making strategic decisions.",
      "Creating products users love.",
    ],
  },
  {
    question: "What’s your long-term goal?",
    options: [
      "Becoming a technical expert in a niche field.",
      "Leading a company’s IT strategy.",
      "Starting your own tech venture.",
      "Mentoring others in tech.",
    ],
  },

  // Section 5: Ethics & Work-Life Balance
  {
    question: "How do you view ethical dilemmas in tech?",
    options: [
      "Advocate fiercely for user privacy.",
      "Balance ethics with business needs.",
      "Follow company policies strictly.",
      "Prioritize innovation over regulations.",
    ],
  },
  {
    question: "How important is work-life balance?",
    options: [
      "Critical—I need clear boundaries.",
      "Flexible—I don’t mind occasional crunch times.",
      "Not a priority—I’m driven by passion for the work.",
    ],
  },
];


interface Answers {
  [key: number]: string | string[];
}

const Page = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const router = useRouter();

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => {
      // The question 6 is a multiple choice question
      if (questionIndex === 6) {
        const current = Array.isArray(prev[6]) ? (prev[6] as string[]) : [];
        if (current.includes(answer)) {
          const updatedArr = current.filter((a) => a !== answer);
          return { ...prev, [6]: updatedArr };
        } else {
          return { ...prev, [6]: [...current, answer] };
        }
      }

      // Other questions are single choice
      if (prev[questionIndex] === answer) {
        const updated = { ...prev };
        delete updated[questionIndex];
        return updated;
      }
      return { ...prev, [questionIndex]: answer };
    });
  };

  const allAnswered = questions.every((_, index) => {
    if (index === 6) {
      return Array.isArray(answers[index]) && (answers[index] as string[]).length > 0;
    }
    return answers[index] !== undefined && answers[index] !== "";
  });

  const handleSubmit = async () => {
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const responses = questions.map((_, index) => {
      if (index === 6 && Array.isArray(answers[6])) {
        return (answers[6] as string[]).join(", ");
      }
      return answers[index] as string;
    });

    const response = await fetch("/api/quiz-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: responses }),
    });
    if (!response.ok) {
      console.error("Failed to save quiz answers", response.status);
      alert("Error saving quiz answers.");
      return;
    }
    try {
      const data = await response.json();
      if (data.success) {
        router.push("/recommendation");
      } else {
        console.error("Error saving quiz answers:", data.error);
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Error processing quiz submission.");
    }
  };

  return (
      <div className="h-screen bg-background overflow-hidden">
        <header className="h-16 border-b border-border flex items-center gap-4 px-4 shrink-0 bg-background">
          <SidebarTrigger />
          <h1 className="text-xl font-bold text-foreground">Career Quiz</h1>
        </header>
        <main className="flex flex-col md:flex-row p-4 mx-auto w-[90vw] lg:w-[calc(100vw-16rem)] h-[calc(100vh-4rem)] overflow-hidden bg-background">
          <div className="hidden md:flex w-full md:w-2/5 border border-border items-center justify-center bg-background">
            <ModelViewer />
          </div>
          <ScrollArea className="w-full md:w-3/5 h-full md:pl-4 hide-scrollbar bg-background">
            <div className="space-y-6 pb-8">
              {questions.map((q, index) => (
                  <div key={index} className="pb-6">
                    <p className="text-xl md:text-2xl font-medium text-foreground mb-8">
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                      {q.options.map((option, idx) => {
                        if (index !== 6 && answers[index] && answers[index] !== option)
                          return null;

                        const isSelected =
                            index === 6 && Array.isArray(answers[6])
                                ? (answers[6] as string[]).includes(option)
                                : answers[index] === option;
                        return (
                            <Button
                                key={idx}
                                onClick={() => handleAnswer(index, option)}
                                className={`inline-flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out ${
                                    isSelected
                                        ? "bg-button text-white border border-border hover:bg-buttonHover"
                                        : "bg-component text-foreground border border-border hover:bg-button hover:text-white"
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
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-transparent text-foreground cursor-not-allowed border border-border"
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
