"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface MilestoneNodeProps {
    step: number;
    title: string;
    isActive: boolean;
    completed?: boolean;
    onClick: () => void;
}

export function MilestoneNode({ step, title, isActive, completed, onClick }: MilestoneNodeProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "button",
                isActive
                    ? "bg-blue text-white"
                    : completed
                        ? "bg-green-500"
                        : "bg-dark1"
            )}
            data-tooltip={title}
        >
            <span className="stepNumber">{step}</span>
        </button>
    );
}
