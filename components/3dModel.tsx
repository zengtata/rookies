"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { VideoMesh } from "@/components/VideoMesh";

function Model(props: { modelPath: string }) {
    const { scene } = useGLTF(props.modelPath);


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

function RotatingGroup() {
    const groupRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.5; // adjust rotation speed as desired
        }
    });

    return (
        <group ref={groupRef}>
            <Model modelPath="/models/sony_tv.glb" />
            <VideoMesh />
        </group>
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
                <RotatingGroup />
            </React.Suspense>
            <OrbitControls
                minAzimuthAngle={-0.6}
                maxAzimuthAngle={0.6}
                minPolarAngle={(50 * Math.PI) / 180}
                maxPolarAngle={(120 * Math.PI) / 180}
                enableZoom={false}
                enablePan={false}
            />
        </Canvas>
    );
}
