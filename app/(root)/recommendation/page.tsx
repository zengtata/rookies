"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CareerCard } from "@/components/CareerCard";

export default function RecommendationPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      const storedResponses = localStorage.getItem("quizResponses");
      if (!storedResponses) {
        alert("No quiz responses found. Please complete the quiz.");
        router.push("/quiz");
        return;
      }

      const responses = JSON.parse(storedResponses);
      if (!responses || responses.length < 11) {
        alert("Incomplete quiz responses found. Please complete the quiz.");
        router.push("/quiz");
        return;
      }

      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses }),
      });

      const data = await response.json();
      if (data.success) {
        setCareers(data.careers || []);
      } else {
        console.error("Failed to load careers:", data.error);
        alert("Error in recommendation: " + data.error);
      }
    };

    fetchCareers();
  }, [router]);

  const handleCareerSelection = async (careerId: string) => {
    const response = await fetch("/api/select-career", {
      method: "POST",
      body: JSON.stringify({ careerId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Failed to select career");
    }
  };

  // Convert vertical scroll to horizontal
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
      <div className="h-screen bg-white overflow-hidden">
        {/* Sticky top header */}
        <header className="h-16 border-b flex items-center gap-4 px-4 shrink-0">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Recommended Careers</h1>
        </header>

        {/* Main container */}
        <main
            ref={scrollContainerRef}
            onWheel={handleWheel}
            className= "hide-scrollbar overflow-hidden overflow-x-auto mx-auto w-[90vw] md:w-[calc(100vw-16rem)] h-[calc(100vh-2rem)] md:h-[calc(100vh-10%)]"
        >
          {careers.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading or no careers found...</p>
              </div>
          ) : (
              <div className="flex flex-row items-center h-full space-x-6 px-2 py-2">
                {careers.map((career) => (
                    <div key={career.id} className="first:ml-0">
                      <CareerCard
                          career={career}
                          onSelect={handleCareerSelection}
                      />
                    </div>
                ))}
              </div>
          )}
        </main>
      </div>
  );
}
