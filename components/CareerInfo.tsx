// components/CareerInfo.tsx
"use client";
import React from "react";

interface CareerInfoProps {
    career: {
        title: string;
        description: string;
    };
    progressPercentage: number;
}

export function CareerInfo({ career, progressPercentage }: CareerInfoProps) {
    return (
        <div className="w-full mb-8">
            <h1 className="text-3xl font-bold text-center mb-4">{career.title}</h1>
            <p className="text-center text-black mb-4">{career.description}</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    );
}
