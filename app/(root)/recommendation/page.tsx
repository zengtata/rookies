"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RecommendationPage = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await fetch("/api/recommend", {
        method: "POST", // Ensure method is POST, not GET
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: [], interests: [], workPreference: "" }), // Replace with actual data
      });

      const data = await response.json();
      setCareers(data.careers || []); // Assuming the response contains the 'careers' array
    };

    fetchCareers();
  }, []);

  const handleCareerSelection = async (careerId: string) => {
    // Send the selected career ID to the backend to store it in the user-career table
    const response = await fetch("/api/select-career", {
      method: "POST",
      body: JSON.stringify({ careerId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Redirect the user to the homepage after selection
      router.push("/");
    } else {
      alert("Failed to select career");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800">
        Select Your Career
      </h1>

      <div className="space-y-6">
        {careers.map((career) => (
          <div key={career} className="space-y-2">
            <h3 className="text-xl font-medium text-gray-700">{career}</h3>
            <p className="text-gray-600">{career.description}</p>
            <Button
              onClick={() => handleCareerSelection(career.id)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
            >
              Select Career
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationPage;
