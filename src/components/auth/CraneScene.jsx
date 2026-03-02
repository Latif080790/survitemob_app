
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Material untuk komponen crane, agar konsisten
const craneMaterial = new THREE.MeshStandardMaterial({ color: '#ffc107', roughness: 0.5 }); // Warna kuning khas konstruksi
const baseMaterial = new THREE.MeshStandardMaterial({ color: '#424242', roughness: 0.7 }); // Abu-abu gelap

// Komponen untuk Hook yang beranimasi
const AnimatedHook = () => {
  const hookRef = useRef();

  // Animasi naik-turun yang playful menggunakan sine wave
  useFrame(({ clock }) => {
    hookRef.current.position.y = -1.5 + Math.sin(clock.getElapsedTime()) * 0.5;
  });

  return (
    <group ref={hookRef}>
      <mesh material={baseMaterial}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
      </mesh>
       <mesh material={baseMaterial} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
      </mesh>
    </group>
  );
};


// Komponen utama untuk Tower Crane
const TowerCrane = () => {
  const rotatingPartRef = useRef();

  // Animasi rotasi lambat dan berkelanjutan
  useFrame((state, delta) => {
    rotatingPartRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group position={[0, -2, 0]} scale={1.2}>
      {/* Base */}
      <mesh position={[0, 0, 0]} material={baseMaterial}>
        <boxGeometry args={[2.5, 0.2, 2.5]} />
      </mesh>
      
      {/* Tower Mast */}
      <mesh position={[0, 2.5, 0]} material={craneMaterial}>
        <boxGeometry args={[0.5, 5, 0.5]} />
      </mesh>

      {/* Rotating Part */}
      <group ref={rotatingPartRef} position={[0, 5, 0]}>
        {/* Slewing Unit */}
        <mesh material={baseMaterial}>
          <boxGeometry args={[0.8, 0.5, 0.8]} />
        </mesh>
        
        {/* Jib (lengan panjang) */}
        <mesh position={[2.5, 0.3, 0]} material={craneMaterial}>
          <boxGeometry args={[5, 0.3, 0.3]} />
        </mesh>

        {/* Counterweight Arm (lengan pendek) */}
        <mesh position={[-1.2, 0.3, 0]} material={craneMaterial}>
          <boxGeometry args={[2, 0.3, 0.3]} />
        </mesh>

        {/* Counterweight Block */}
        <mesh position={[-1.8, 0.3, 0]} material={baseMaterial}>
            <boxGeometry args={[1, 1, 1]} />
        </mesh>

         {/* Apex/Top */}
        <mesh position={[0, 0.8, 0]} material={craneMaterial}>
            <coneGeometry args={[0.4, 1, 4]} />
        </mesh>

        {/* Kabel dan Hook */}
        <group position={[3.5, 0.1, 0]}>
             <mesh>
                <cylinderGeometry args={[0.02, 0.02, 1.5, 8]}/>
                <meshStandardMaterial color="black" />
            </mesh>
            <AnimatedHook />
        </group>
      </group>
    </group>
  );
};

// Canvas utama yang merender adegan 3D
const CraneScene = () => {
  return (
    <Canvas 
      camera={{ position: [5, 5, 10], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      shadows // Aktifkan bayangan untuk efek 3D yang lebih baik
    >
      {/* Pencahayaan */}
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[10, 15, 5]} 
        intensity={2.5}
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <hemisphereLight intensity={0.5} groundColor="gray" />

      {/* Model Crane */}
      <TowerCrane />
      
      {/* Lantai/Dasar */}
       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5c6bc0" roughness={0.8} />
      </mesh>

      {/* Opsi: Kontrol orbit untuk development (bisa dimatikan di final) */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default CraneScene;
