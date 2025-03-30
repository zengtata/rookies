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
    const renderResources = (resources: string) => {
        const resourceList = resources.split(",").map((item) => item.trim());
        return resourceList.map((resource, index) => {
            const linkMatch = resource.match(/\((https?:\/\/[^)]+)\)/);
            if (linkMatch) {
                const url = linkMatch[1];
                const textWithoutLink = resource.replace(linkMatch[0], "").trim();
                return (
                    <div key={index} className="mb-1">
                        {textWithoutLink}
                        <br />
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-buttonHover underline"
                        >
                            {url}
                        </a>
                    </div>
                );
            }
            return (
                <div key={index} className="mb-1">
                    {resource}
                </div>
            );
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[90%] bg-component p-6">
                <h2 className="text-2xl font-semibold mb-2 text-foreground">
                    {milestone.name}
                </h2>
                <p className="mb-4 text-foreground">{milestone.description}</p>
                <div className="mb-4">
                    <p className="font-bold">Resources:</p>
                    {renderResources(milestone.resources)}
                </div>
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
