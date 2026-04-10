"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const MonolithVisual = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={18}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial 
          color="#1a1a1e" 
          speed={1.5} 
          distort={0.15} 
          roughness={0.1} 
          metalness={1}
          opacity={0.8}
          transparent
        />
      </mesh>
    </Float>
  );
};

export const ExperienceHero = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[50, 50, 50]} intensity={2} color="#3b82f6" />
        <pointLight position={[-50, -50, -50]} intensity={1} color="#ffffff" />
        <MonolithVisual />
      </Canvas>
      <div className="absolute inset-0 linear-grid mask-fade-bottom opacity-20" />
    </div>
  );
};
