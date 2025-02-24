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
        <div className="hidden md:block md:w-50 md:mx-8 mt-8 md:mt-0 p-6 border border-border rounded-lg shadow-lg bg-component">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
                Level {milestone.step_order}: {milestone.milestone.name}
            </h2>
            <p className="mb-4 text-foreground">
                {milestone.milestone.description}
            </p>
            <p className="mb-4">
                Resources: {milestone.milestone.resources}
            </p>
            {!isCompleted ? (
                <Button
                    onClick={onComplete}
                    className="bg-green-600 text-white transition-colors hover:bg-green-500"
                >
                    Complete Milestone
                </Button>
            ) : (
                <Button
                    onClick={onUndo}
                    className="bg-button text-white transition-colors hover:bg-buttonHover"
                >
                    Undo Completion
                </Button>
            )}
        </div>
    );
}
