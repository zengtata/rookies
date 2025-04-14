"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { X } from "lucide-react";

interface Career {
  id: string;
  title: string;
  description: string;
  sentiment_score?: number;
}

interface CareerReview {
  career_id: string;
  year: number;
  sentiment_score: number;
  num_reviews: number;
}

interface CareerCardProps {
  career: Career;
  onSelect: (careerId: string) => void;
  isSelected?: boolean;
}

export function CareerCard({
  career,
  onSelect,
  isSelected = false,
}: CareerCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [reviews, setReviews] = useState<CareerReview[]>([]);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(career.id);
  };

  useEffect(() => {
    if (expanded) {
      fetch(`/api/career-reviews?careerId=${career.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setReviews(data.reviews);
          }
        })
        .catch((error) =>
          console.error("Error fetching career review details:", error),
        );
    }
  }, [expanded, career.id]);

  const chartDataSentiment = reviews.map((item) => ({
    year: item.year,
    sentiment: item.sentiment_score,
  }));

  const chartDataReviews = reviews.map((item) => ({
    year: item.year,
    reviews: item.num_reviews,
  }));

  return (
    <>
      {/* Collapsed */}
      <div
        className={`relative flex-shrink-0 cursor-pointer transition-all duration-500 
          ${isSelected ? "bg-button" : "bg-component"} 
          border border-border rounded-lg shadow-md p-4 w-60 h-72 overflow-hidden hover:w-[360px] hover:rounded-lg hover:bg-buttonHover`}
        onClick={handleClick}
      >
        <p // Font Color Changed for Visibility
            className={`text-3xl md:text-5xl font-semibold pb-6 transition-opacity duration-300 ${
                isSelected ? "text-white" : "text-foreground"
            }`}
        >
        {career.title}
        </p>

        <p
            className={`mt-2 text-md transition-opacity duration-300 line-clamp-5 ${
                isSelected ? "text-white" : "text-foreground"
            }`}
        >

        {career.description}
        </p>
      </div>

      {/* Expanded */}
      {expanded && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
          onClick={handleClick}
        >
          <div
            className="relative bg-background w-5/6 h-[75vh] rounded-lg shadow-lg flex flex-col overflow-y-auto border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full p-6 flex flex-col items-center justify-center">
              <p className="text-2xl md:text-4xl font-semibold text-foreground">
                {career.title}
              </p>
              {!isSelected && (
                  <Button
                      onClick={handleSelect}
                      className="mt-6 bg-button text-white transition-colors hover:bg-buttonHover"
                  >
                    Select Career
                  </Button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                className="absolute top-4 right-4 text-foreground p-2 rounded-full hover:bg-component"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="m-4">
                <p className="text-foreground mt-2">
                  {career.description}
                </p>
              </div>

              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 w-[80%]">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Sentiment Over Time
                    </CardTitle>
                    <CardDescription className="text-foreground">
                      Yearly sentiment scores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={
                        {
                          sentiment: {
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

                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Reviews Over Time
                    </CardTitle>
                    <CardDescription className="text-foreground">
                      Yearly review counts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={
                        {
                          reviews: {
                            color: "hsl(var(--chart-2))",
                          },
                        } as ChartConfig
                      }
                    >
                      <AreaChart
                        accessibilityLayer
                        data={chartDataReviews}
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
                          dataKey="reviews"
                          type="natural"
                          fill="var(--color-reviews)"
                          fillOpacity={0.4}
                          stroke="var(--color-reviews)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
