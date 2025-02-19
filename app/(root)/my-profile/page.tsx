"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/actions/signOutAction";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Page = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOutAction();
        router.push("/sign-in");
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Sticky Navigation Bar */}
            <header className="sticky top-0 z-50 h-16 border-b flex items-center px-4 bg-white">
                <SidebarTrigger />
                <h1 className="text-xl font-bold ml-4">Profile</h1>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-4">
                <div className="mb-5">
                    <Button onClick={handleSignOut} className="w-full md:w-auto">
                        Logout
                    </Button>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <Button
                        onClick={() => router.push("/recommendation")}
                        className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-200"
                    >
                        Change Career
                    </Button>
                    <Button
                        onClick={() => router.push("/quiz")}
                        className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-200"
                    >
                        Retake Quiz
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Page;
