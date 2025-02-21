// components/VideoMesh.tsx
"use client";

import React, { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function VideoMesh() {
    // Create a video element and set it up for auto-play
    const video = useMemo(() => {
        const vid = document.createElement("video");
        vid.src = "/quiz.mp4"; // Ensure quiz.mp4 is in your public folder
        vid.crossOrigin = "anonymous";
        vid.loop = true;
        vid.muted = true;         // Must be muted to auto-play
        vid.playsInline = true;   // Required on iOS Safari
        // Start playing the video after setting these properties
        vid.play().catch((err) => console.error("Video play failed:", err));
        return vid;
    }, []);

    // Create a VideoTexture from the video element
    const videoTexture = useMemo(() => new THREE.VideoTexture(video), [video]);

    // Ensure texture updates each frame
    useFrame(() => {
        videoTexture.needsUpdate = true;
    });

    // Hardcoded transformation values
    const position: [number, number, number] = [0.06, 0.43, 0.82];
    const rotation: [number, number, number] = [0, 0.14, 0];
    const scale: [number, number, number] = [0.39, 0.49, 0.1];

    return (
        <mesh position={position} rotation={rotation} scale={scale}>
            <planeGeometry args={[5, 3]} />
            <meshStandardMaterial map={videoTexture} side={THREE.DoubleSide} />
        </mesh>
    );
}
