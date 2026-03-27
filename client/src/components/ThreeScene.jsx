import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, TorusKnot, Float, Stars, Line, Sphere, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useEscalationContext } from '../context/EscalationContext';

const Particles = ({ count = 2000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
       p[i * 3] = (Math.random() - 0.5) * 20;
       p[i * 3 + 1] = (Math.random() - 0.5) * 10;
       p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const pRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
        pRef.current.geometry.attributes.position.array[i * 3 + 1] += Math.sin(time + pRef.current.geometry.attributes.position.array[i * 3]) * 0.005;
        pRef.current.geometry.attributes.position.array[i * 3 + 1] += 0.005;
        if (pRef.current.geometry.attributes.position.array[i * 3 + 1] > 5) {
            pRef.current.geometry.attributes.position.array[i * 3 + 1] = -5;
        }
    }
    pRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f5ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const EngineCore = () => {
  const { score } = useEscalationContext();
  const torusRef = useRef();
  
  const coreColor = useMemo(() => {
    const ratio = (score - 1) / 9;
    const r = 0 + ratio * 1;
    const g = 0.96 - ratio * 0.8;
    const b = 1;
    return new THREE.Color(r, g, b);
  }, [score]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    torusRef.current.rotation.x = t * 0.5;
    torusRef.current.rotation.y = t * 0.3;
    torusRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05 + (score / 15));
  });

  return (
    <TorusKnot ref={torusRef} args={[1, 0.4, 128, 32]}>
      <meshStandardMaterial 
        color={coreColor} 
        emissive={coreColor} 
        emissiveIntensity={1.5 + score / 2} 
        wireframe 
      />
    </TorusKnot>
  );
};

// Second 3D element: A distorted icosahedron representing "Neural Noise"
const NeuralNoise = () => {
  const { score } = useEscalationContext();
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = -t * 0.2;
    // Move slowly across the background
    meshRef.current.position.x = Math.sin(t * 0.5) * 5;
    meshRef.current.position.y = Math.cos(t * 0.3) * 2;
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 15]} position={[5, 2, -2]}>
        <MeshDistortMaterial
          color="#ff2d78"
          speed={3}
          distort={0.4 + (score / 20)}
          radius={1}
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
};

const Satellites = () => {
    const groupRef = useRef();
    const satelliteCount = 3;

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.z = time * 0.2;
    });

    return (
        <group ref={groupRef}>
            {[0, 1, 2].map((i) => {
                const angle = (i / satelliteCount) * Math.PI * 2;
                const x = Math.cos(angle) * 3;
                const y = Math.sin(angle) * 3;
                return (
                    <group key={i} position={[x, y, 0]}>
                        <Sphere args={[0.2, 16, 16]}>
                            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={2} />
                        </Sphere>
                        <Line
                            points={[[0, 0, 0], [-x, -y, 0]]}
                            color="#ff2d78"
                            lineWidth={1}
                            transparent
                            opacity={0.3}
                        />
                    </group>
                );
            })}
        </group>
    );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff2d78" />
      
      <Particles />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <EngineCore />
        <Satellites />
      </Float>
      
      <NeuralNoise />
      
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

const ThreeScene = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -2, // Put even further back
      pointerEvents: 'none', // Critical: Let mouse events pass through to content
      background: 'radial-gradient(circle at center, #050d1a 0%, #010409 100%)'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ pointerEvents: 'none' }} // Ensure individual canvas doesn't block
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
