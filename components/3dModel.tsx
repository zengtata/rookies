"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { Leva } from "leva";
import { Model } from "./Model";

export function ModelViewer() {
    return (
        <>
            {/* Leva control panel for debugging/tweaking (optional) */}
            <Leva collapsed={false} />

            <Canvas style={{ width: "100%", height: "100%" }}>
                {/* Lights */}
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={2} />

                {/* Center your model at [0,0,0] */}
                <Center>
                    <Model />
                </Center>

                {/* OrbitControls to rotate/pan around the model */}
                <OrbitControls target={[0, 0, 0]} />
            </Canvas>
        </>
    );
}
