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
            <SheetContent className="w-[90%] bg-component p-6">
                <h2 className="text-2xl font-semibold mb-2 text-foreground">
                    {milestone.name}
                </h2>
                <p className="mb-4 text-foreground">{milestone.description}</p>
                <p className="mb-4">Resources: {milestone.resources}</p>
                {!isCompleted ? (
                    <Button
                        onClick={() => {
                            onOpenChange(false);
                            onComplete();
                        }}
                        className="bg-green-600 text-white transition-colors hover:bg-green-500"
                    >
                        Complete Milestone
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            onOpenChange(false);
                            onUndo();
                        }}
                        className="bg-button text-white transition-colors hover:bg-component"
                    >
                        Undo Completion
                    </Button>
                )}
            </SheetContent>
        </Sheet>
    );
}
