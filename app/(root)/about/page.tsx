"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"



// Dummy sentiment data
const chartDataSentiment = [
    { year: "2018", sentiment: 80 },
    { year: "2019", sentiment: 65 },
    { year: "2020", sentiment: 70 },
    { year: "2021", sentiment: 67 },
    { year: "2022", sentiment: 90 },
    { year: "2023", sentiment: 85 },
    { year: "2024", sentiment: 93 },
];

const AboutPage = () => {
    return (
        <div className="flex flex-col h-full w-full bg-grey">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 w-full border-b-2 bg-white">
                <div className="flex items-center gap-3 px-4 py-3">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold">About Rookies</h1>
                </div>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 w-full md:w-[90%] mx-auto p-10 overflow-y-auto">
                <ScrollArea className="h-full">
                    <div className="space-y-10">
                        {/* Section 1: Introduction */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            {/* Content Column */}
                            <div>
                                <p className="text-3xl font-semibold mb-3">Purpose</p>
                                <p className="text-gray-700">
                                    Choosing a career in tech can be overwhelming, especially for first-year CS students. Our platform helps students discover their ideal career through a guided quiz and personalized recommendations.
                                </p>
                            </div>

                            {/* Image Column */}
                            <div className="flex justify-center">
                                <Skeleton className="h-60 w-80 rounded-lg" />
                            </div>
                        </section>

                        {/* Section 2: How It Works */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-16">

                            <div className="flex justify-center">
                                <Skeleton className="h-60 w-80 rounded-lg" />
                            </div>

                            <div>
                                <p className="text-3xl font-semibold mb-3">How It Works</p>
                                <p className="text-gray-700">Our process is simple:</p>
                                <ul className="list-disc list-inside text-gray-700">
                                    <li>Take a quick quiz about your skills and interests.</li>
                                    <li>Receive personalized career recommendations.</li>
                                    <li>Follow a structured roadmap to success.</li>
                                </ul>
                            </div>

                        </section>

                        {/* Section 3: Sentiment Analysis */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-16">
                            <div>
                                <p className="text-3xl font-semibold mb-3">Sentiment Analysis</p>
                                <p className="text-gray-700">
                                    We use sentiment analysis to determine career suitability based on your quiz responses.
                                    This ensures accurate and relevant recommendations tailored to your skills and goals.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Card className="w-[80%]">
                                    <CardHeader>
                                        <CardTitle>Sentiment Over Time</CardTitle>
                                        <CardDescription>Yearly sentiment scores</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer
                                            config={
                                                {
                                                    sentiment: {
                                                        label: "Sentiment",
                                                        color: "hsl(var(--chart-1))",
                                                    },
                                                } as ChartConfig
                                            }
                                        >
                                            <AreaChart
                                                accessibilityLayer
                                                data={chartDataSentiment}
                                                margin={{ left: 8, right: 8 }}
                                            >
                                                <CartesianGrid vertical={false} />
                                                <XAxis
                                                    dataKey="year"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickMargin={8}
                                                    padding={{ left: 12}}
                                                />
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent indicator="line" />}
                                                />
                                                <Area
                                                    dataKey="sentiment"
                                                    type="natural"
                                                    fill="var(--color-sentiment)"
                                                    fillOpacity={0.4}
                                                    stroke="var(--color-sentiment)"
                                                />
                                            </AreaChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Section 4: Technologies */}
                        <section className="pt-16 text-center">
                            <div>
                                <p className="text-3xl font-semibold mb-3">Technologies Rookies Use</p>
                                <p className="text-gray-700 pb-20">
                                    We leverage state-of-the-art technologies to deliver personalized career insights.
                                    Our stack includes modern web frameworks, robust databases, and intelligent analytics.
                                </p>
                                <div className="flex flex-row justify-evenly">
                                    <div>
                                        <Image
                                            src="/icons/drizzle.svg"
                                            alt="Drizzle"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div>
                                        <Image
                                            src="/icons/neon.svg"
                                            alt="Neon"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div>
                                        <Image
                                            src="/icons/nextjs.svg"
                                            alt="Next.js"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div>
                                        <Image
                                            src="/icons/shadcn.svg"
                                            alt="Shadcn"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div>
                                        <Image
                                            src="/icons/tailwindcss.svg"
                                            alt="Tailwind CSS"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div>
                                        <Image
                                            src="/icons/typescript.svg"
                                            alt="TypeScript"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Future Plans */}
                        <section className="py-16">
                            <p className="text-3xl font-semibold mb-3">Future Plans</p>
                            <p className="text-gray-700">
                                We plan to enhance the platform by adding features like:
                            </p>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Machine learning-based career recommendations.</li>
                                <li>Personalized learning progress tracking.</li>
                                <li>Job and internship listings.</li>
                            </ul>
                        </section>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default AboutPage;
