"use client";

import { useEffect } from "react";

export default function DisableScroll() {
    useEffect(() => {
        // Store the current body overflow setting
        const originalOverflow = document.body.style.overflow;

        // Disable scrolling
        document.body.style.overflow = "hidden";

        // On unmount, restore original setting
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // Render nothing
    return null;
}
