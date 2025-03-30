"use client";
import React from "react";
import { MilestoneNode } from "./MilestoneNode";

interface Milestone {
    milestone: {
        id: string;
        name: string;
        description: string;
        resources: string;
    };
    step_order: number;
}

interface MilestoneNavigationNodesProps {
    milestones: Milestone[];
    currentIndex: number;
    completedMilestones: string[];
    onMilestoneClick: (index: number) => void;
}

export function MilestoneNavigation({
                                             milestones,
                                             currentIndex,
                                             completedMilestones,
                                             onMilestoneClick,
                                         }: MilestoneNavigationNodesProps) {
    return (
        <div className="relative vertical-roadmap hide-scrollbar pb-6">
            <div className="relative space-y-12">
                {milestones.map((m, index) => {
                    const isActive = index === currentIndex;
                    const isLeft = index % 2 === 0;
                    const completed = completedMilestones.includes(m.milestone.id);
                    return (
                        <div key={m.milestone.id} className="relative flex">
                            {isLeft ? (
                                <>
                                    <div className="w-full flex justify-end pr-24">
                                        <MilestoneNode
                                            step={m.step_order}
                                            title={m.milestone.name}
                                            isActive={isActive}
                                            completed={completed}
                                            onClick={() => onMilestoneClick(index)}
                                        />
                                    </div>
                                    <div className="w-1/2"></div>
                                </>
                            ) : (
                                <>
                                    <div className="w-1/2"></div>
                                    <div className="w-full flex justify-start pl-24">
                                        <MilestoneNode
                                            step={m.step_order}
                                            title={m.milestone.name}
                                            isActive={isActive}
                                            completed={completed}
                                            onClick={() => onMilestoneClick(index)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
