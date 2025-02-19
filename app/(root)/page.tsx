"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MilestoneDetailsPanel } from "@/components/MilestoneDetailsPanel";
import { MilestoneSheet } from "@/components/MilestoneSheet";
import { MilestoneNavigationNodes } from "@/components/MilestoneNavigationNodes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

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

    // Detect mobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch career details and milestones
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
            } else {
                console.error(data.error);
                if (data.error === "No career selected") {
                    router.push("/quiz");
                }
            }
        };
        fetchCareerDetails();
    }, [router]);

    // Fetch progress from the DB on mount
    useEffect(() => {
        const fetchProgress = async () => {
            const res = await fetch("/api/get-progress", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.success) {
                setCurrentIndex(data.currentMilestone);
                setCompletedMilestones(data.completedMilestones);
            }
        };
        fetchProgress();
    }, []);

    // Save progress
    const saveProgressToServer = async (currentMilestone: number, completed: string[]) => {
        await fetch("/api/update-progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentMilestone, completedMilestones: completed }),
        });
    };

    // Milestone click
    const handleMilestoneClick = (index: number) => {
        setCurrentIndex(index);
        if (isMobile) {
            setSelectedMilestone(milestones[index].milestone);
            setSheetOpen(true);
        }
    };

    // Complete milestone
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

    // Undo milestone
    const handleUndoCompletion = async () => {
        const currentMilestoneId = milestones[currentIndex].milestone.id;
        const newCompleted = completedMilestones.filter((id) => id !== currentMilestoneId);
        setCompletedMilestones(newCompleted);
        await saveProgressToServer(currentIndex, newCompleted);
    };

    // Progress bar percentage
    const progressPercentage =
        milestones.length > 0 ? (completedMilestones.length / milestones.length) * 100 : 0;

    return (
        <div className="flex flex-col min-h-screen w-full bg-white">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 w-full border-b-2 bg-white">
                <div className="flex items-start justify-between px-4 py-3">
                    {career && (
                        <div className="flex gap-3 items-center">
                            <SidebarTrigger />
                            <div>
                                <h1 className="text-2xl font-bold">{career.title}</h1>
                                {/* <p className="text-sm text-gray-600">{career.description}</p> */}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main content: 3 columns on desktop */}
            <div className="flex flex-1">
                {/* Left Column: vertical bar with progress (visible on all screens) */}
                <div className="w-16 border-r bg-white relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-[80%] w-2 bg-gray-300 relative">
                            <div
                                className="bg-green-600 w-full transition-all duration-300"
                                style={{ height: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Middle Column: Milestone Navigation wrapped in a ScrollArea */}
                <ScrollArea className="w-full md:w-2/5 h-full pt-4 hide-scrollbar">
                    <MilestoneNavigationNodes
                        milestones={milestones}
                        currentIndex={currentIndex}
                        onMilestoneClick={handleMilestoneClick}
                    />
                </ScrollArea>

                {/* Right Column: Milestone Details (hidden on mobile) */}
                <div className="hidden md:block flex-1 p-4">
                    {milestones[currentIndex] && (
                        <MilestoneDetailsPanel
                            milestone={milestones[currentIndex]}
                            isCompleted={completedMilestones.includes(milestones[currentIndex].milestone.id)}
                            onComplete={handleCompleteMilestone}
                            onUndo={handleUndoCompletion}
                        />
                    )}
                </div>
            </div>

            {/* Mobile: Milestone Details Sheet */}
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
