"use client";

import React, { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function VideoMesh() {
    const video = useMemo(() => {
        const vid = document.createElement("video");
        vid.src = "/quiz.mp4";
        vid.crossOrigin = "anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.playsInline = true;
        vid.play().catch((err) => console.error("Video play failed:", err));
        return vid;
    }, []);

    const videoTexture = useMemo(() => new THREE.VideoTexture(video), [video]);

    useFrame(() => {
        videoTexture.needsUpdate = true;
    });

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
