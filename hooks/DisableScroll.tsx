"use client";

import { useEffect } from "react";

export default function DisableScroll() {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return null;
}
