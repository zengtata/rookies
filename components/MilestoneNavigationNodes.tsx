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
    onMilestoneClick: (index: number) => void;
}

export function MilestoneNavigationNodes({
                                             milestones,
                                             currentIndex,
                                             onMilestoneClick,
                                         }: MilestoneNavigationNodesProps) {
    return (
        <div className="vertical-roadmap hide-scrollbar pb-6">
            {milestones.map((m, index) => {
                const isActive = index === currentIndex;
                const isLast = index === milestones.length - 1;

                return (
                    <div key={m.milestone.id} className="milestone-item">
                        <MilestoneNode
                            step={m.step_order}
                            title={m.milestone.name}
                            isActive={isActive}
                            onClick={() => onMilestoneClick(index)}
                        />
                        {/* If not the last node, show a line below it */}
                        {!isLast && <div className="line" />}
                    </div>
                );
            })}
        </div>
    );
}
