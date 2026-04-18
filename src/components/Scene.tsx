import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const mesh1 = typeof window !== 'undefined' ? useRef<THREE.Mesh>(null) : null;
  const mesh2 = typeof window !== 'undefined' ? useRef<THREE.Mesh>(null) : null;
  const mesh3 = typeof window !== 'undefined' ? useRef<THREE.Mesh>(null) : null;
  
  // To track mouse velocity
  const prevMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    // Calculate mouse velocity for proportional energy
    const dx = x - prevMouse.current.x;
    const dy = y - prevMouse.current.y;
    const v = Math.sqrt(dx * dx + dy * dy);
    velocity.current = THREE.MathUtils.lerp(velocity.current, v, 0.1);
    prevMouse.current = { x, y };

    const energy = 1 + velocity.current * 15;

    // Smoothly rotate and shift the entire group with more "float"
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.3 + Math.cos(t / 4) / 10, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.3 + Math.sin(t / 4) / 10, 0.08);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 1.5, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y * 1.5, 0.05);
    
    // Individual "High-Energy Interactive" logic
    if (mesh1?.current) {
      // Purple Octahedron - Reactive Orbit
      const orbitRadius = 4 + x * 4;
      mesh1.current.position.x = THREE.MathUtils.lerp(mesh1.current.position.x, Math.cos(t * 0.6 * energy) * orbitRadius, 0.1);
      mesh1.current.position.z = THREE.MathUtils.lerp(mesh1.current.position.z, Math.sin(t * 0.6 * energy) * orbitRadius - 3, 0.1);
      mesh1.current.position.y = THREE.MathUtils.lerp(mesh1.current.position.y, Math.sin(t * energy) * 0.8 + y * 4, 0.1);
      mesh1.current.rotation.z += 0.01 * energy;
      mesh1.current.rotation.x += 0.005 * energy;
    }
    if (mesh2?.current) {
      // Blue Box - Contrary Pulse
      const orbitRadius = 6 - y * 4;
      mesh2.current.position.x = THREE.MathUtils.lerp(mesh2.current.position.x, Math.sin(-t * 0.5 * energy) * orbitRadius, 0.1);
      mesh2.current.position.z = THREE.MathUtils.lerp(mesh2.current.position.z, Math.cos(-t * 0.5 * energy) * orbitRadius - 5, 0.1);
      mesh2.current.position.y = THREE.MathUtils.lerp(mesh2.current.position.y, Math.cos(t * 0.8 * energy) * 0.8 + x * 4, 0.1);
      mesh2.current.rotation.x += 0.01 * energy;
      mesh2.current.rotation.y += 0.005 * energy;
    }
    if (mesh3?.current) {
      // Indigo Torus - Magnetic Depth
      const pulse = Math.sin(t * 0.4 * energy) * 3;
      mesh3.current.position.y = THREE.MathUtils.lerp(mesh3.current.position.y, 4 + pulse + y * 3, 0.1);
      mesh3.current.position.x = THREE.MathUtils.lerp(mesh3.current.position.x, Math.cos(t * 0.3 * energy) * (7 + x * 5), 0.1);
      mesh3.current.position.z = THREE.MathUtils.lerp(mesh3.current.position.z, -10 + Math.sin(t * 0.3 * energy) * 6 + x * 8, 0.1);
      mesh3.current.rotation.y -= 0.015 * energy;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={mesh1} position={[-3, 1.5, -3]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#a855f7" wireframe />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={mesh2} position={[3, -1.5, -4]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#3b82f6" wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={3}>
        <mesh ref={mesh3} position={[0, 3, -6]}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>
      </Float>
    </group>
  );
}

function StarField() {
  const stride = 3;
  const count = 3000;
  
  const positions = useMemo(() => {
    const array = new Float32Array(count * stride);
    for (let i = 0; i < count; i++) {
      array[i * stride] = (Math.random() - 0.5) * 20;
      array[i * stride + 1] = (Math.random() - 0.5) * 20;
      array[i * stride + 2] = (Math.random() - 0.5) * 20;
    }
    return array;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const { x, y } = state.pointer;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, y * 0.1, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, x * 0.1, 0.05);
    pointsRef.current.rotation.z += 0.0001;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} stride={stride} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function MovingLights() {
  const lightRef = useRef<THREE.SpotLight>(null);
  
  useFrame((state) => {
    if (!lightRef.current) return;
    const { x, y } = state.pointer;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x * 5, 0.1);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y * 5 + 5, 0.1);
  });

  return (
    <spotLight
      ref={lightRef}
      position={[0, 5, 10]}
      angle={0.15}
      penumbra={1}
      intensity={2}
      castShadow
    />
  );
}

function DecorativeElements() {
  const groupRef = useRef<THREE.Group>(null);
  
  const items = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        -5 - Math.random() * 10
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      rotationSpeed: Math.random() * 0.02,
      color: i % 2 === 0 ? "#a855f7" : "#3b82f6"
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 0.2, 0.1);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y * 0.2, 0.1);

    groupRef.current.children.forEach((child, i) => {
      const item = items[i];
      child.position.y += Math.sin(t * item.speed) * 0.005;
      child.rotation.x += item.rotationSpeed;
      child.rotation.y += item.rotationSpeed;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh key={i} position={item.position} scale={item.scale}>
          {i % 3 === 0 ? <tetrahedronGeometry /> : i % 3 === 1 ? <icosahedronGeometry /> : <octahedronGeometry />}
          <meshStandardMaterial color={item.color} wireframe opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  );
}

function EmissiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 20;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, -x * 0.8, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, -y * 0.8, 0.05);
    pointsRef.current.rotation.z = t * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function NeuralConnections() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const count = 40;
  
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 10;
      const y1 = (Math.random() - 0.5) * 10;
      const z1 = (Math.random() - 0.5) * 5 - 2;
      const x2 = x1 + (Math.random() - 0.5) * 2;
      const y2 = y1 + (Math.random() - 0.5) * 2;
      const z2 = z1 + (Math.random() - 0.5) * 2;
      p.push(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
    }
    return p;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    
    lineRef.current.rotation.y = THREE.MathUtils.lerp(lineRef.current.rotation.y, x * 0.1, 0.05);
    lineRef.current.rotation.x = THREE.MathUtils.lerp(lineRef.current.rotation.x, -y * 0.1, 0.05);
    lineRef.current.position.y = Math.sin(t / 2) * 0.2;
  });

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function AtmosphericPlanes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 1, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y * 1, 0.05);
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = t * (0.02 * (i + 1));
      child.scale.setScalar(1 + Math.sin(t * 0.5 + i) * 0.1);
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-5, 2, -10]} rotation={[0, 0, 0.5]}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.03} />
      </mesh>
      <mesh position={[5, -2, -12]} rotation={[0, 0, -0.5]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

function FloatingCubes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 30;
  const tempObject = new THREE.Object3D();

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, -5 - Math.random() * 10],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      speed: Math.random() * 0.2 + 0.1,
      scale: Math.random() * 0.15 + 0.05
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    particles.forEach((particle, i) => {
      const { position, rotation, speed, scale } = particle;
      tempObject.position.set(
        position[0] + x * 2,
        position[1] + y * 2 + Math.sin(t * speed) * 0.5,
        position[2]
      );
      tempObject.rotation.set(rotation[0] + t * speed, rotation[1] + t * speed, rotation[2]);
      tempObject.scale.setScalar(scale);
      tempObject.updateMatrix();
      meshRef.current?.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" transparent opacity={0.2} wireframe />
    </instancedMesh>
  );
}

function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.2, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.2, 0.05);
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = t * (0.1 * (i + 1));
      child.rotation.x = t * (0.05 * (i + 1));
    });
  });

  return (
    <group ref={groupRef}>
      {[4, 6, 8].map((radius, i) => (
        <mesh key={i} rotation={[Math.random(), Math.random(), 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#a855f7" : "#3b82f6"} transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function DataSpikes() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const count = 50;
  
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 25;
        const z = -10 - Math.random() * 10;
        const yBase = (Math.random() - 0.5) * 15;
        const height = Math.random() * 2 + 0.5;
        p.push(new THREE.Vector3(x, yBase, z), new THREE.Vector3(x, yBase + height, z));
    }
    return p;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    
    lineRef.current.position.x = THREE.MathUtils.lerp(lineRef.current.position.x, x * 0.5, 0.05);
    lineRef.current.position.y = THREE.MathUtils.lerp(lineRef.current.position.y, y * 0.5, 0.05);
    
    // Pulse opacity
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.05 + Math.abs(Math.sin(t)) * 0.1;
  });

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
    </lineSegments>
  );
}

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={1} />
      
      <MovingLights />
      
      <GeometricShapes />
      <DecorativeElements />
      <FloatingCubes />
      <OrbitalRings />
      <DataSpikes />
      <EmissiveParticles />
      <NeuralConnections />
      <AtmosphericPlanes />
      <StarField />
      <Sparkles count={100} scale={15} size={2} speed={0.4} opacity={0.3} color="#3b82f6" />
      <Sparkles count={50} scale={10} size={1} speed={0.6} opacity={0.4} color="#a855f7" />
    </>
  );
}
