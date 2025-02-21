"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export function Model() {
    // Create a control panel group called "Model"
    const { scale, rotation, position } = useControls("Model", {
        scale: { value: 1, min: 0.1, max: 5, step: 0.1 },
        rotation: { value: [0, 0, 0], min: -Math.PI, max: Math.PI, step: 0.01 },
        position: { value: [0, 0, 0], step: 0.1 },
    });

    const { scene } = useGLTF("/models/sony_trinitron_prl.glb");
    return (
        <primitive
            object={scene}
            scale={[scale, scale, scale]}
            rotation={rotation}
            position={position}
        />
    );
}
