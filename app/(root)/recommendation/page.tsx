"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CareerCard } from "@/components/CareerCard";
import { cn } from "@/lib/utils";
import {toast} from "@/hooks/use-toast";

export default function RecommendationPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const [currentCareerId, setCurrentCareerId] = useState<string | null>(null);
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        setCareers(data.careers || []);
      } else {
        console.error(data.error);
        toast({
          title: "No Quiz Answer Found!",
          description: "Please answer the quiz to get recommendations!",
        });
        router.push("/quiz");
      }
    };
    fetchCareers();
  }, [router, toast]);

  useEffect(() => {
    const fetchSelectedCareer = async () => {
      const res = await fetch("/api/user-career-details", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success && data.career) {
        setCurrentCareerId(data.career.id);
      } else {
        setCurrentCareerId(null);
      }
    };
    fetchSelectedCareer();
  }, []);

  const handleCareerSelection = async (careerId: string) => {
    const response = await fetch("/api/select-career", {
      method: "POST",
      body: JSON.stringify({ careerId }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setCurrentCareerId(careerId);
      router.push("/");
    } else {
      alert("Failed to select career");
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center gap-4 px-4 shrink-0 bg-background">
        <SidebarTrigger />
        <h1 className="text-xl font-bold text-foreground">
          Recommended Careers
        </h1>
      </header>

      {/* Main */}
      <main
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className="hide-scrollbar overflow-hidden overflow-x-auto mx-auto w-[90vw] md:w-[calc(100vw-16rem)] h-[calc(100vh-2rem)] md:h-[calc(100vh-10%)] bg-background"
      >
        {careers.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-foreground">Loading or no careers found...</p>
          </div>
        ) : (
          <div className="flex flex-row items-center h-full space-x-6 px-2 py-2">
            {careers.map((career, index) => (
              <div
                key={career.id}
                className="first:ml-0 flex flex-col items-center"
              >
                {index < 3 ? (
                  <button
                    className={cn("top-match h-14 w-14 bg-component")}
                    data-tooltip={"Top Match"}
                  >
                    <span className="h-5/6 w-5/6">
                      <img src="/icons/heart.svg" alt="heart" />
                    </span>
                  </button>
                ) : (
                  <div className="mb-2 h-[46px]" />
                )}
                <CareerCard
                  career={career}
                  onSelect={handleCareerSelection}
                  isSelected={career.id === currentCareerId}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
