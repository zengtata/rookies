"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface Milestone {
    id: string;
    name: string;
    description: string;
    resources: string;
}

interface MilestoneSheetProps {
    milestone: Milestone;
    isCompleted: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onComplete: () => void;
    onUndo: () => void;
}

export function MilestoneSheet({
                                   milestone,
                                   isCompleted,
                                   open,
                                   onOpenChange,
                                   onComplete,
                                   onUndo,
                               }: MilestoneSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full bg-white p-6">
                <h2 className="text-2xl font-semibold mb-2">{milestone.name}</h2>
                <p className="text-gray-600 mb-4">{milestone.description}</p>
                <p className="text-gray-500 mb-4">Resources: {milestone.resources}</p>
                {!isCompleted ? (
                    <Button
                        onClick={() => {
                            onOpenChange(false);
                            onComplete();
                        }}
                        className="bg-green-500 text-white transition-colors hover:bg-green-600"
                    >
                        Complete Milestone
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            onOpenChange(false);
                            onUndo();
                        }}
                        className="bg-yellow-500 text-white transition-colors hover:bg-yellow-600"
                    >
                        Undo Completion
                    </Button>
                )}
            </SheetContent>
        </Sheet>
    );
}
