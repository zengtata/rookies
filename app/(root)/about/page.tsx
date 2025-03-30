"use client";
import React, { useState } from "react";
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MilestoneNavigation } from "@/components/MilestoneNavigation";
import {ModelViewer} from "@/components/3dModel2";

// Dummy sentiment data
const chartDataSentiment = [
    { year: "2018", sentiment: 80 },
    { year: "2019", sentiment: 65 },
    { year: "2020", sentiment: 70 },
    { year: "2021", sentiment: 67 },
    { year: "2022", sentiment: 90 },
    { year: "2023", sentiment: 85 },
];

// Dummy milestones
const dummyMilestones = [
    {
        milestone: {
            id: "dummy1",
            name: "Step 1: Take Quiz",
            description: "Description for dummy milestone 1.",
            resources: "",
        },
        step_order: 1,
    },
    {
        milestone: {
            id: "dummy2",
            name: "Step 2: Choose Career",
            description: "Description for dummy milestone 2.",
            resources: "",
        },
        step_order: 2,
    },
    {
        milestone: {
            id: "dummy3",
            name: "Step 3: Follow Roadmap",
            description: "Description for dummy milestone 3.",
            resources: "",
        },
        step_order: 3,
    },
];

const AboutPage = () => {
    const [carouselApi, setCarouselApi] = useState<any>(null);

    // redirect to 0: quiz, 1: recommendation, 2: roadmap
    const handleNavigationClick = (index: number) => {
        carouselApi?.scrollTo(index);
    };

    return (
        <div className="flex flex-col h-full w-full bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
                <div className="flex items-center gap-3 px-4 py-3">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold text-foreground">About Rookies</h1>
                </div>
            </header>

            <div className="flex-1 w-full md:w-[90%] mx-auto p-10 overflow-y-auto">
                <ScrollArea className="h-full">
                    <div className="space-y-10">

                        {/* Section 1: Introduction */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-center lg:text-start items-center">
                            <div>
                                <p className="text-3xl md:text-5xl font-semibold mb-4 text-foreground">
                                    Purpose
                                </p>
                                <p className="text-foreground text-lg md:text-xl">
                                    Choosing a career in tech can be overwhelming, especially for first-year students. Our platform helps students discover their ideal career through a guided quiz and personalized recommendations.
                                </p>
                            </div>
                            <div className="grid-cols-1 justify-center text-foreground">
                                <svg viewBox="0 0 500 100" className="mx-auto">
                                    <defs>
                                        <path
                                            id="curve"
                                            d="M10,120 Q250,0 490,120"
                                            fill="transparent"
                                        />
                                    </defs>
                                    <text className="font-extrabold text-3xl fill-current">
                                        <textPath href="#curve" startOffset="50%" textAnchor="middle">
                                            Designed With
                                        </textPath>
                                    </text>
                                </svg>

                                <ModelViewer />
                            </div>
                        </section>

                        {/* Section 2: How It Works */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 text-center lg:text-start">
                            <div className="flex justify-center">
                                <Carousel className="w-[330px] h-60 sm:w-96 border-2 rounded-lg border-component" setApi={setCarouselApi}>
                                    <CarouselContent>
                                        <CarouselItem>
                                            <div className="p-4">
                                                <p className="text-2xl md:text-3xl font-medium text-foreground mb-8">
                                                    What is your favorite programming language?
                                                </p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Button className="text-md md:text-lg bg-component text-foreground border border-border hover:bg-button hover:text-white">
                                                        JavaScript
                                                    </Button>
                                                    <Button className="text-md md:text-lg bg-component text-foreground border border-border hover:bg-button hover:text-white">
                                                        Python
                                                    </Button>
                                                    <Button className="text-md md:text-lg bg-component text-foreground border border-border hover:bg-button hover:text-white">
                                                        Java
                                                    </Button>
                                                    <Button className="text-md md:text-lg bg-component text-foreground border border-border hover:bg-button hover:text-white">
                                                        C++
                                                    </Button>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                        <CarouselItem>
                                            <div className="flex items-center justify-center h-full w-full">
                                                <button
                                                    className={cn("top-match h-28 w-28 bg-component")}
                                                    data-tooltip="Top Match"
                                                >
                                                  <span className="h-5/6 w-5/6">
                                                    <img src="/icons/heart.svg" alt="heart" />
                                                  </span>
                                                </button>
                                            </div>
                                        </CarouselItem>
                                        <CarouselItem>
                                            <div className="h-60 w-96">
                                                <ScrollArea className="h-full">
                                                    <MilestoneNavigation
                                                        milestones={dummyMilestones}
                                                        currentIndex={0}
                                                        completedMilestones={[]}
                                                        onMilestoneClick={(index: number) =>
                                                            console.log("Clicked dummy milestone", index)
                                                        }
                                                    />
                                                </ScrollArea>
                                            </div>
                                        </CarouselItem>
                                    </CarouselContent>
                                    <p className="text-center text-sm text-foreground mb-8">Swipe {"<->"}</p>
                                    <CarouselPrevious />
                                    <CarouselNext />

                                </Carousel>
                            </div>

                            <div>
                                <p className="text-3xl md:text-5xl font-semibold my-3 pt-10 text-foreground">
                                    How It Works
                                </p>
                                <p className="text-foreground text-md md:text-lg pb-4">Our process is simple:</p>
                                <ul className="list-disc list-inside text-foreground text-md md:text-lg">
                                    <li className="pb-2">
                                        Take a quick{" "}
                                        <button
                                            className="underline text-buttonHover font-bold"
                                            onClick={() => handleNavigationClick(0)}
                                        >
                                            QUIZ
                                        </button>{" "}
                                        about your skills and interests.
                                    </li>
                                    <li className="pb-2">
                                        Receive personalized career{" "}
                                        <button
                                            className="underline text-buttonHover font-bold"
                                            onClick={() => handleNavigationClick(1)}
                                        >
                                            RECOMMENDATION
                                        </button>.
                                    </li>
                                    <li className="pb-2">
                                        Follow a structured{" "}
                                        <button
                                            className="underline text-buttonHover font-bold"
                                            onClick={() => handleNavigationClick(2)}
                                        >
                                            ROADMAP
                                        </button>{" "}
                                        to success.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 3: Sentiment Analysis */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-center lg:text-start">
                            <div>
                                <p className="text-3xl md:text-5xl font-semibold mb-3 text-foreground">
                                    Sentiment Analysis
                                </p>
                                <p className="text-foreground text-lg md:text-xl">
                                    We leverage sentiment analysis to extract yearly sentiment scores for each career and tally the number of reviews for each year. This data is then visualized in an interactive chart, offering clear insights into evolving job market trends and helping you make informed career decisions.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Card className="w-[80%] bg-component">
                                    <CardHeader>
                                        <CardTitle className="text-foreground">Sentiment Over Time</CardTitle>
                                        <CardDescription className="text-foreground">
                                            Yearly sentiment scores
                                        </CardDescription>
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
                                                    padding={{ left: 12 }}
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
                        <section className="py-16 text-center">
                            <div>
                                <p className="text-3xl md:text-5xl font-semibold mb-6 text-foreground">
                                    Technologies Behind Insights
                                </p>
                                <p className="pb-20 text-foreground text-lg md:text-xl">
                                    Our platform uses cutting-edge tools to deliver tailored career guidance. We utilize advanced web frameworks, scalable databases, and smart analytics with machine learning to transform raw data into actionable job market insights that empower your career journey.
                                </p>
                                <div className="flex flex-row justify-evenly">
                                    <div>
                                        <Image src="/icons/drizzle.svg" alt="Drizzle" width={50} height={50} />
                                    </div>
                                    <div>
                                        <Image src="/icons/neon.svg" alt="Neon" width={50} height={50} />
                                    </div>
                                    <div>
                                        <Image src="/icons/nextjs.svg" alt="Next.js" width={50} height={50} />
                                    </div>
                                    <div>
                                        <Image src="/icons/shadcn.svg" alt="Shadcn" width={50} height={50} />
                                    </div>
                                    <div>
                                        <Image src="/icons/tailwindcss.svg" alt="Tailwind CSS" width={50} height={50} />
                                    </div>
                                    <div>
                                        <Image src="/icons/typescript.svg" alt="TypeScript" width={50} height={50} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Future Plans */}
                        <section className="py-16">
                            <p className="text-3xl md:text-5xl font-semibold mb-3 text-foreground text-center">Future Plans</p>
                            <ul className="list-disc list-inside text-foreground p-4">
                                <li className="pb-4 text-lg md:text-xl">We're gearing up to integrate dynamic, up-to-date data with real-time sentiment analysis to provide continuously refined insights.</li>
                                <li className="pb-4 text-lg md:text-xl">Our vision extends beyond IT careers, expanding to a broader array of industries.</li>
                                <li className="pb-4 text-lg md:text-xl">We plan to offer a more detailed roadmap for each career milestone, complete with useful links and resources to help guide your professional journey at every step.</li>
                            </ul>
                        </section>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default AboutPage;
