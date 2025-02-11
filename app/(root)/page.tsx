"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

const Homepage = () => {
    const [career, setCareer] = useState<any>(null);
    const [milestones, setMilestones] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCareerDetails = async () => {
            const response = await fetch("/api/user-career-details", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (data.success) {
                setCareer(data.career);
                setMilestones(data.milestones);
            } else {
                console.error(data.error);
                // If no career is selected, redirect to the quiz page.
                if (data.error === "No career selected") {
                    router.push("/quiz");
                }
            }
        };
        fetchCareerDetails();
    }, [router]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            {career ? (
                <>
                    <h1 className="text-3xl font-bold text-center">{career.title}</h1>
                    <p className="text-center text-gray-600 mb-6">{career.description}</p>
                    <h2 className="text-2xl font-semibold mb-4">Milestones</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        {milestones.map((m) => (
                            <AccordionItem
                                key={m.milestone.id}
                                value={`level-${m.step_order}`}
                            >
                                <AccordionTrigger>
                                    Level {m.step_order}: {m.milestone.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-gray-600">{m.milestone.description}</p>
                                    <p className="mt-2 text-gray-500">
                                        Resources: {m.milestone.resources}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </>
            ) : (
                <p>Loading career details...</p>
            )}
        </div>
    );
};

export default Homepage;
