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
    const renderResources = (resources: string) => {
        const resourceList = resources.split(",").map((item) => item.trim());
        return resourceList.map((resource, index) => {
            const linkMatch = resource.match(/\((https?:\/\/[^)]+)\)/);
            if (linkMatch) {
                const url = linkMatch[1];
                const textWithoutLink = resource.replace(linkMatch[0], "").trim();
                return (
                    <div key={index} className="mb-4">
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
        <div className="hidden md:block md:w-50 md:mx-8 mt-8 md:mt-0 p-6 border border-border rounded-lg shadow-lg bg-component">
            <p className="text-2xl lg:text-3xl font-semibold mb-4 text-foreground">
                Level {milestone.step_order}: {milestone.milestone.name}
            </p>
            <p className="text-md lg:text-xl mb-4 text-foreground">
                {milestone.milestone.description}
            </p>
            <div className="text-md lg:text-xl mb-6">
                <p className="font-bold mb-2">Resources:</p>
                {renderResources(milestone.milestone.resources)}
            </div>
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
