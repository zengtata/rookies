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
    // Helper function to render resources on separate lines with link on new line.
    const renderResources = (resources: string) => {
        // Split the string by commas and trim each part.
        const resourceList = resources.split(",").map((item) => item.trim());
        return resourceList.map((resource, index) => {
            // Extract a URL wrapped in parentheses.
            const linkMatch = resource.match(/\((https?:\/\/[^)]+)\)/);
            if (linkMatch) {
                const url = linkMatch[1];
                // Remove the URL (with parentheses) from the resource text.
                const textWithoutLink = resource.replace(linkMatch[0], "").trim();
                return (
                    <div key={index} className="mb-1">
                        {textWithoutLink}
                        <br />
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
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
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
                Level {milestone.step_order}: {milestone.milestone.name}
            </h2>
            <p className="mb-4 text-foreground">
                {milestone.milestone.description}
            </p>
            <div className="mb-4">
                <p className="font-bold">Resources:</p>
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
