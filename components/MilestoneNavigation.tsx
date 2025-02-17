// components/MilestoneNavigation.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface Milestone {
    milestone: {
        id: string;
        name: string;
        description: string;
        resources: string;
    };
    step_order: number;
}

interface MilestoneNavigationProps {
    milestones: Milestone[];
    currentIndex: number;
    completedMilestones: string[];
    onMilestoneClick: (m: Milestone, index: number) => void;
}

export function MilestoneNavigation({
                                        milestones,
                                        currentIndex,
                                        completedMilestones,
                                        onMilestoneClick,
                                    }: MilestoneNavigationProps) {
    return (
        <div className="md:w-1/3 flex flex-col space-y-4 overflow-auto pb-4 items-center">
            {milestones.map((m, index) => {
                const isActive = index === currentIndex;
                const isCompleted = completedMilestones.includes(m.milestone.id);
                let buttonClasses = "w-full py-2 px-4 rounded transition-colors";
                if (isActive) {
                    buttonClasses += " bg-blue-600 text-white hover:bg-blue-700 ";
                } else if (isCompleted) {
                    buttonClasses += " bg-green-600 text-white hover:bg-green-700";
                } else {
                    buttonClasses += " bg-gray-200 text-gray-800 hover:bg-gray-300";
                }
                return (
                    <div key={m.milestone.id} className="w-full p-2">
                        <Button onClick={() => onMilestoneClick(m, index)} className={buttonClasses}>
                            Level {m.step_order}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
}
