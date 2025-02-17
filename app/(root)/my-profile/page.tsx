"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {signOutAction} from "@/app/actions/signOutAction";

const Page = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOutAction();
        router.push("/sign-in");
    };

    return (
        <>
            <div className="mb-5">
                <Button onClick={handleSignOut}>Logout</Button>
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={() => router.push("/recommendation")}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-200 mx-5"
                >
                    Change Career
                </Button>
                <Button
                    onClick={() => router.push("/quiz")}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-200 mx-5"
                >
                    Retake Quiz
                </Button>
            </div>
        </>
    );
};

export default Page;
