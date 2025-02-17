"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface MilestoneNodeProps {
    step: number;
    title: string;
    isActive: boolean;
    onClick: () => void;
}

export function MilestoneNode({ step, title, isActive, onClick }: MilestoneNodeProps) {
    return (
        <div className="relative tooltip-container" onClick={onClick}>
            <div
                className={cn(
                    "w-20 h-20 flex items-center justify-center border-2",
                    isActive ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-200 border-gray-300 text-gray-800"
                )}
            >
                <span className="text-xl font-bold">{step}</span>
            </div>
            {/* Tooltip showing milestone title */}
            <div className="tooltip">
                {title}
            </div>
        </div>
    );
}
