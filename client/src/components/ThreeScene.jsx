import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, Line, Sphere, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useEscalationContext } from '../context/EscalationContext';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// 1. Dynamic Particles
const InteractiveParticles = ({ count = 1000 }) => {
  const { mouse } = useThree();
  const pRef = useRef();
  
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
       p[i * 3] = (Math.random() - 0.5) * 40;
       p[i * 3 + 1] = (Math.random() - 0.5) * 40;
       p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (!pRef.current) return;
    const t = state.clock.getElapsedTime();
    const positions = pRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        positions[i * 3 + 1] += Math.sin(t * 0.2 + x) * 0.005;
        
        const dx = mouse.x * 15 - x;
        const dy = mouse.y * 10 - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 4) {
            positions[i * 3] += dx * 0.005;
            positions[i * 3 + 1] += dy * 0.005;
        }
    }
    pRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f5ff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.3}
      />
    </Points>
  );
};

// 2. The Engine Reactor Core
const ReactorCore = () => {
  const { score } = useEscalationContext();
  const safeScore = score || 1;
  const groupRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  
  const intensity = 1 + (safeScore / 5);
  const coreColor = useMemo(() => {
    const ratio = safeScore / 10;
    return new THREE.Color().setHSL(0.5 - ratio * 0.4, 1, 0.5);
  }, [safeScore]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    ring1.current.rotation.x = t * 0.5;
    ring2.current.rotation.z = -t * 0.3;
    const s = 1 + Math.sin(t * 3) * 0.04 + (safeScore / 25);
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.8, 16, 16]}>
        <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={intensity * 2} />
      </Sphere>
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.02, 8, 64]} />
        <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={intensity} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 8, 64]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={intensity} />
      </mesh>
    </group>
  );
};

const PostProcessing = () => {
    const { score } = useEscalationContext();
    const safeScore = score || 1;
    
    return (
        <EffectComposer multisampling={0}>
            <Bloom 
                intensity={0.8 + (safeScore / 10)} 
                luminanceThreshold={0.5} 
                luminanceSmoothing={0.5}
            />
            <ChromaticAberration 
                offset={new THREE.Vector2(0.0005 * safeScore, 0.0005 * safeScore)}
                blendFunction={BlendFunction.SCREEN}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
    );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={['#010409']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff2d78" />

      <InteractiveParticles />
      <ReactorCore />
      
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <Suspense fallback={null}>
        <PostProcessing />
      </Suspense>
    </>
  );
};

const ThreeScene = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={1} // Lock to 1 for stability
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeScene;


