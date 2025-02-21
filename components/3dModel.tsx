"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import {VideoMesh} from "@/components/VideoMesh";
// import { useControls } from "leva";

function Model(props: { modelPath: string }) {
    const { scene } = useGLTF(props.modelPath);

    // Default transformation values (use your preferred defaults)
    const rotation = [0, -3, 0];
    const scale = 0.008;
    const position = [0, 0, 0];

    return (
        <primitive
            object={scene}
            rotation={rotation}
            scale={[scale, scale, scale]}
            position={position}
        />
    );
}

export function ModelViewer() {
    return (
        <Canvas style={{ overflow: "hidden" }}>
            <ambientLight intensity={Math.PI} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={2} intensity={2} />
            <pointLight position={[-10, -10, -10]} />
            <directionalLight intensity={2} />
            <React.Suspense
                fallback={
                    <Html center>
                        <span>Loading model...</span>
                    </Html>
                }
            >
                <Model modelPath="/models/sony_trinitron_prl.glb" />
                <VideoMesh />
            </React.Suspense>
            <OrbitControls
                minAzimuthAngle={-0.60} // about -27° (horizontal limit)
                maxAzimuthAngle={0.60}  // about 27° (horizontal limit)
                minPolarAngle={(50 * Math.PI) / 180}  // about 75° in radians
                maxPolarAngle={(120 * Math.PI) / 180} // about 105° in radians
                enableZoom={false}
                enablePan={false}
            />
        </Canvas>
    );
}
