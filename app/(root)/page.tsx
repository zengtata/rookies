"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MilestoneDetailsPanel } from "@/components/MilestoneDetailsPanel";
import { MilestoneSheet } from "@/components/MilestoneSheet";
import { MilestoneNavigation } from "@/components/MilestoneNavigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Milestone {
  milestone: {
    id: string;
    name: string;
    description: string;
    resources: string;
  };
  step_order: number;
}

export default function Homepage() {
  const [career, setCareer] = useState<any>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  // For detect mobile width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const fetchCareerDetails = async () => {
      const response = await fetch("/api/user-career-details", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        setCareer(data.career);
        setMilestones(data.milestones);
        // Reset progress when a new career is loaded
        setCurrentIndex(0);
        setCompletedMilestones([]);
      } else {
        console.error(data.error);
        if (data.error === "No career selected") {
          toast({
            title: "No Career Selected",
            description: "Please answer the quiz and select a career!",
          });
          router.push("/recommendation");
        }
      }
    };
    fetchCareerDetails();
  }, [router, toast]);


  useEffect(() => {
    if (!career) return;
    const fetchProgress = async () => {
      const res = await fetch(`/api/get-progress?careerId=${career.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setCurrentIndex(data.currentMilestone);
        setCompletedMilestones(data.completedMilestones || []);
      }
    };
    fetchProgress();
  }, [career]);


  const saveProgressToServer = async (
    currentMilestone: number,
    completed: string[],
  ) => {
    await fetch("/api/update-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        careerId: career.id,
        currentMilestone,
        completedMilestones: completed,
      }),
    });
  };


  const handleMilestoneClick = (index: number) => {
    setCurrentIndex(index);
    if (isMobile) {
      setSelectedMilestone(milestones[index].milestone);
      setSheetOpen(true);
    }
  };


  const handleCompleteMilestone = async () => {
    if (currentIndex < milestones.length) {
      const currentMilestoneId = milestones[currentIndex].milestone.id;
      let newCompleted = completedMilestones;
      if (!completedMilestones.includes(currentMilestoneId)) {
        newCompleted = [...completedMilestones, currentMilestoneId];
        setCompletedMilestones(newCompleted);
      }
      let newIndex = currentIndex;
      if (currentIndex < milestones.length - 1) {
        newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
      }
      await saveProgressToServer(newIndex, newCompleted);
    }
  };


  const handleUndoCompletion = async () => {
    const currentMilestoneId = milestones[currentIndex].milestone.id;
    const newCompleted = completedMilestones.filter(
      (id) => id !== currentMilestoneId,
    );
    setCompletedMilestones(newCompleted);
    await saveProgressToServer(currentIndex, newCompleted);
  };

  // Calculate progress as the percentage of completed milestones
  const progressPercentage =
    milestones.length > 0
      ? (completedMilestones.length / milestones.length) * 100
      : 0;

  return (
    <div className="flex flex-col min-h-screen w-full bg-background overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="flex items-center gap-3 px-4 py-3">
          <SidebarTrigger />
          {career && (
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {career.title}
              </h1>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Column 1 */}
        <div className="w-16 border-r border-border bg-background relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[80%] w-2 bg-component rounded-sm relative">
              <div
                className="bg-green-500 w-full transition-all duration-300"
                style={{ height: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="w-full md:w-2/5 overflow-y-auto hide-scrollbar p-4">
          <ScrollArea className="h-full">
            <MilestoneNavigation
              milestones={milestones}
              currentIndex={currentIndex}
              completedMilestones={completedMilestones}
              onMilestoneClick={handleMilestoneClick}
            />
          </ScrollArea>
        </div>

        {/* Column 3 */}
        <div className="hidden md:block flex-1 p-4 overflow-y-auto">
          {milestones[currentIndex] && (
            <MilestoneDetailsPanel
              milestone={milestones[currentIndex]}
              isCompleted={completedMilestones.includes(
                milestones[currentIndex].milestone.id,
              )}
              onComplete={handleCompleteMilestone}
              onUndo={handleUndoCompletion}
            />
          )}
        </div>
      </div>

      {/* Mobile View*/}
      {isMobile && selectedMilestone && (
        <MilestoneSheet
          milestone={selectedMilestone}
          isCompleted={completedMilestones.includes(selectedMilestone.id)}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          onComplete={handleCompleteMilestone}
          onUndo={handleUndoCompletion}
        />
      )}
    </div>
  );
}
