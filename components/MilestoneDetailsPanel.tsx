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

interface MilestoneDetailsPanelProps {
    milestone: Milestone;
    isCompleted: boolean;
    onComplete: () => void;
    onUndo: () => void;
}

export function MilestoneDetailsPanel({
                                          milestone,
                                          isCompleted,
                                          onComplete,
                                          onUndo,
                                      }: MilestoneDetailsPanelProps) {
    return (
        <div className="hidden md:block md:w-50 md:mx-8 mt-8 md:mt-0 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-2">
                Level {milestone.step_order}: {milestone.milestone.name}
            </h2>
            <p className="text-gray-600 mb-4">{milestone.milestone.description}</p>
            <p className="text-gray-500 mb-4">
                Resources: {milestone.milestone.resources}
            </p>
            {!isCompleted ? (
                <Button onClick={onComplete} className="bg-green-500 text-white transition-colors hover:bg-green-600">
                    Complete Milestone
                </Button>
            ) : (
                <Button onClick={onUndo} className="bg-yellow-500 text-white transition-colors hover:bg-yellow-600">
                    Undo Completion
                </Button>
            )}
        </div>
    );
}
