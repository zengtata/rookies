"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {ModelViewer} from "@/components/3dModel";

const questions = [
  {
    question: "How do you tackle tough coding challenges?",
    options: [
      "I break problems down into smaller steps.",
      "I experiment until something clicks.",
      "I chat with my teammates for fresh ideas.",
      "I look back at what worked before.",
    ],
  },
  {
    question: "What role do you usually play in a team?",
    options: [
      "I love leading and keeping things organized.",
      "I enjoy sharing creative ideas.",
      "I prefer working independently.",
      "I’m the go-to for smoothing over conflicts.",
    ],
  },
  {
    question: "How do you decide what to work on first?",
    options: [
      "I plan everything in detail.",
      "I adapt on the fly as priorities change.",
      "I handle the toughest tasks first.",
      "I set priorities together with my team.",
    ],
  },
  {
    question: "How do you feel about learning new technologies?",
    options: [
      "I’m excited and always learning.",
      "I stick with what I know but can adjust.",
      "I rely on my strong basics.",
      "I need a little extra time to catch up.",
      "None of the above.",
    ],
  },
  {
    question: "Which technical skill is your strongest?",
    options: [
      "Coding (Python, Java...).",
      "Databases and SQL.",
      "Networking and systems.",
      "Designing software architecture.",
      "None of the above.",
    ],
  },
  {
    question: "How do you like to get feedback?",
    options: [
      "I appreciate tips that help me grow.",
      "I love hearing positive vibes.",
      "I prefer detailed, technical advice.",
      "A mix of both is best.",
    ],
  },
  {
    question: "How do you handle a conflict with a teammate?",
    options: [
      "I jump in to mediate and chat it out.",
      "I try to solve it on my own first.",
      "I follow our team’s process.",
      "I usually let it settle on its own.",
    ],
  },
  {
    question: "What matters most when starting a project?",
    options: [
      "Understanding what the user needs.",
      "Choosing the right tools and tech.",
      "Planning and scheduling tasks.",
      "Making sure everyone communicates well.",
    ],
  },
  {
    question: "How do you stay in the loop with tech trends?",
    options: [
      "I read blogs, articles and watch videos.",
      "I attend meetups and webinars.",
      "I take online courses and earn certificates.",
      "I chat with peers and join communities.",
      "None of the above.",
    ],
  },
  {
    question: "How would you describe your work style?",
    options: [
      "I thrive in a busy, collaborative space.",
      "I enjoy quiet time to focus deeply.",
      "I like a mix of solo and team work.",
      "I prefer a creative, flexible vibe."
    ],
  },
  {
    question: "Which tech area excites you the most?",
    options: [
      "Cloud and distributed systems.",
      "Cybersecurity",
      "Data and machine learning.",
      "Mobile and web apps.",
      "None of the above.",
    ],
  },
  {
    question: "How do you love to learn new things?",
    options: [
      "I set aside time for online courses and reading.",
      "I learn best while working on real projects.",
      "I enjoy learning from mentors and peers.",
      "I join workshops and community events.",
      "None of the above.",
    ],
  },
  {
    question: "What’s your ideal work environment?",
    options: [
      "A lively, open office.",
      "A quiet space just for me.",
      "A flexible setup that balances both.",
      "A well-organized, structured space.",
    ],
  },
  {
    question: "How do you balance big ideas with the details?",
    options: [
      "I keep a close eye on every little step.",
      "I start broad and then hone in on details.",
      "I delegate details while focusing on strategy.",
      "I switch between the big picture and details as needed.",
    ],
  },
  {
    question: "Which of these technologies have you tried?",
    options: [
      "Machine Learning",
      "Database Management",
      "Cloud Computing",
      "Mobile App Development",
      "Cybersecurity",
      "DevOps",
      "None of the above",
    ],
  },
];

interface Answers {
  [key: number]: string;
}

const Page = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const router = useRouter();

  // Toggle selection: clicking the same option clears it.
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
      <div className="h-screen bg-background overflow-hidden">
        {/* Header with sidebar trigger */}
        <header className="h-16 border-b border-border flex items-center gap-4 px-4 shrink-0 bg-background">
          <SidebarTrigger />
          <h1 className="text-xl font-bold text-foreground">Career Quiz</h1>
        </header>
        {/* Main container: 3D model on desktop, questions in a ScrollArea */}
        <main className="flex flex-col md:flex-row p-4 mx-auto w-[90vw] lg:w-[calc(100vw-16rem)] h-[calc(100vh-4rem)] overflow-hidden bg-background">
          {/* 3D Model Container (desktop only) */}
          <div className="hidden md:flex w-full md:w-2/5 border border-border items-center justify-center bg-background">
            <ModelViewer />
          </div>
          {/* Questions Container within a ScrollArea */}
          <ScrollArea className="w-full md:w-3/5 h-full md:pl-4 hide-scrollbar bg-background">
            <div className="space-y-6 pb-8">
              {questions.map((q, index) => (
                  <div key={index} className="pb-6">
                    <h3 className="text-xl font-medium text-foreground mb-8">
                      {q.question}
                    </h3>
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                      {q.options.map((option, idx) => {
                        // If an answer is selected, show only that one.
                        if (answers[index] && answers[index] !== option) return null;
                        return (
                            <Button
                                key={idx}
                                onClick={() => handleAnswer(index, option)}
                                className={`inline-flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out ${
                                    answers[index] === option
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