"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";

function Model(props: { modelPath: string }) {
    const { scene } = useGLTF(props.modelPath);
    const groupRef = useRef<any>(null);

    console.log("scene from useGLTF:", scene);

    scene.traverse((child: any) => {
        console.log(child.name);
        if (child.isMesh && (child.name === "Marble" || child.name === "Marble_Marble_0")) {
            child.material = new MeshPhysicalMaterial({
                transmission: 1,
                transparent: true,
                opacity: 0.5,
                roughness: 0,
                metalness: 0,
                reflectivity: 0.1,
                thickness: 0.0001,
                envMapIntensity: 1.0,
            });
        }
    });


    const rotation = [0, -3, 0];
    const scale = 0.03;
    const position = [0, 0, 0];

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            <primitive
                object={scene}
                rotation={rotation}
                scale={[scale, scale, scale]}
                position={position}
            />
        </group>
    );
}

export function ModelViewer() {
    return (
        <Canvas style={{ overflow: "hidden" }}>
            <ambientLight intensity={3} />
            <spotLight position={[10, 10, 10]} angle={1} penumbra={3} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={2} />
            <pointLight position={[0, -10, 0]} intensity={2} />
            <pointLight position={[10, 0, 0]} intensity={2} />
            <directionalLight intensity={2} />
            <React.Suspense
                fallback={
                    <Html center>
                        <span>Loading model...</span>
                    </Html>
                }
            >
                <Model modelPath="/models/heart.glb" />
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
