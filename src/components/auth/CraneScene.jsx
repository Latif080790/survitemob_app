
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const yellowMaterial = new THREE.MeshStandardMaterial({ color: '#ffc107', roughness: 0.6 });
const darkMaterial = new THREE.MeshStandardMaterial({ color: '#2c2c2c', roughness: 0.5 });
const metalMaterial = new THREE.MeshStandardMaterial({ color: '#a9a9a9', roughness: 0.4 });

const MastSection = ({ position }) => {
  const size = 2;
  const radius = 0.05;
  const braceRadius = 0.03;
  return (
    <group position={position}>
      <mesh position={[-0.5, size / 2, 0.5]} material={yellowMaterial}><cylinderGeometry args={[radius, radius, size, 8]} /></mesh>
      <mesh position={[0.5, size / 2, 0.5]} material={yellowMaterial}><cylinderGeometry args={[radius, radius, size, 8]} /></mesh>
      <mesh position={[-0.5, size / 2, -0.5]} material={yellowMaterial}><cylinderGeometry args={[radius, radius, size, 8]} /></mesh>
      <mesh position={[0.5, size / 2, -0.5]} material={yellowMaterial}><cylinderGeometry args={[radius, radius, size, 8]} /></mesh>
      {[0, size / 2, size].map(y => (
        <group key={y} position={[0, y, 0]}>
          <mesh position={[0, 0, 0.5]}><cylinderGeometry args={[braceRadius, braceRadius, 1, 6]} /></mesh>
          <mesh position={[0, 0, -0.5]}><cylinderGeometry args={[braceRadius, braceRadius, 1, 6]} /></mesh>
          <mesh position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[braceRadius, braceRadius, 1, 6]} /></mesh>
          <mesh position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[braceRadius, braceRadius, 1, 6]} /></mesh>
        </group>
      ))}
    </group>
  );
};

const Jib = () => {
  const length = 12;
  const height = 0.7;
  const radius = 0.04;
  return (
    <group position={[length / 2 + 0.5, height, 0]}>
        <mesh position={[0, 0, 0]} material={yellowMaterial}><cylinderGeometry args={[radius, radius, length, 8]} /></mesh>
        <mesh position={[0, -height, 0.4]} material={yellowMaterial}><cylinderGeometry args={[radius, radius, length, 8]} /></mesh>
        <mesh position={[0, -height, -0.4]} material={yellowMaterial}><cylinderGeometry args={[radius, radius, length, 8]} /></mesh>
    </group>
  );
};

const Cabin = () => (
    <group position={[1, -0.5, 0]}>
        <mesh material={darkMaterial}><boxGeometry args={[1, 1, 1]} /></mesh>
        <mesh position={[0.55, 0, 0]} material={new THREE.MeshStandardMaterial({ color: '#6aabff', transparent: true, opacity: 0.5 })}>
            <boxGeometry args={[0.1, 0.8, 0.8]} />
        </mesh>
    </group>
);

const TowerCrane = () => {
  const rotatingPartRef = useRef();
  useFrame((state, delta) => {
    rotatingPartRef.current.rotation.y += delta * 0.15; // Animasi sedikit lebih cepat
  });

  return (
    <group position={[0, -10, 0]} scale={1.2}> {/* Disesuaikan posisinya */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <MastSection key={i} position={[0, i * 2, 0]} />
      ))}
      <group ref={rotatingPartRef} position={[0, 14.5, 0]}>
        <mesh position={[0, 0.25, 0]} material={darkMaterial}><cylinderGeometry args={[0.8, 1, 0.5, 16]} /></mesh>
        <Cabin />
        <group position={[0, 0.5, 0]}>
            <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 8]} material={yellowMaterial}><cylinderGeometry args={[0.08, 0.08, 3, 8]} /></mesh>
            <mesh position={[0, 1.5, 0]} rotation={[0, 0, -Math.PI / 8]} material={yellowMaterial}><cylinderGeometry args={[0.08, 0.08, 3, 8]} /></mesh>
        </group>
        <Jib />
        <mesh position={[-2.5, 0.3, 0]} material={yellowMaterial}><boxGeometry args={[4, 0.4, 0.4]} /></mesh>
        <mesh position={[-4, 0, 0]} material={darkMaterial}><boxGeometry args={[1.5, 1.5, 1.5]} /></mesh>
        <group position={[7, 0.2, 0]}>
            <mesh material={metalMaterial}><boxGeometry args={[0.5, 0.3, 0.5]} /></mesh>
            <mesh position={[0, -2.5, 0]} material={darkMaterial}><cylinderGeometry args={[0.02, 0.02, 5, 8]} /></mesh>
            <mesh position={[0, -5, 0]} material={yellowMaterial}><coneGeometry args={[0.4, 0.8, 8]} /></mesh>
        </group>
      </group>
    </group>
  );
};

const CraneScene = () => {
  return (
    <Canvas 
        shadows 
        camera={{ position: [2, 2, 18], fov: 50 }} // Kamera lebih rendah dan lebih dekat
        style={{ width: '100%', height: '100%' }}
    >
      {/* Pencahayaan atmosfer senja */}
      <ambientLight intensity={0.4} color="#ffae42" />
      <directionalLight 
        position={[-10, 10, 5]} 
        intensity={2.5}
        color="#ffdaa5" // Warna cahaya hangat
        castShadow
      />
      <hemisphereLight intensity={1.2} groundColor="#fca921" skyColor="#fde6c5" />

      <React.Suspense fallback={null}>
        <TowerCrane />
      </React.Suspense>
      
      {/* Lantai dihilangkan untuk efek melayang */}

    </Canvas>
  );
};

export default CraneScene;
