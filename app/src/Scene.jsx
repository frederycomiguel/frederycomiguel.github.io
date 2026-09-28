import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ACCENT = '#4FD1C0';
const ACCENT_2 = '#F2A65A';
const LINE_COLOR = '#2A3040';

// nodes of the "systems integration" network — matches the stack in the page
const NODES = [
  { label: 'PHP', pos: [-3.2, 1.6, -1.2] },
  { label: 'Node', pos: [3.0, 1.9, 0.6] },
  { label: 'IA/MCP', pos: [-2.6, -1.8, 1.4] },
  { label: 'React', pos: [3.1, -1.3, -0.8] },
  { label: 'DB', pos: [0.2, -2.6, -1.8] },
  { label: 'AWS', pos: [0.4, 2.8, 1.6] },
];

function Particles({ count = 700 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 14 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#4A5468" size={0.05} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

function CoreNode() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.x += delta * 0.04;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function SatelliteNode({ pos, index }) {
  const ref = useRef();
  const speed = 0.3 + (index % 3) * 0.08;
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + index * 10;
      ref.current.rotation.y = t;
      ref.current.rotation.x = t * 0.6;
      ref.current.position.y = pos[1] + Math.sin(t * 0.5) * 0.15;
    }
  });
  const color = index % 2 === 0 ? ACCENT_2 : '#7A8AA8';
  return (
    <mesh ref={ref} position={pos}>
      <octahedronGeometry args={[0.34, 0]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function Lines() {
  const points = useMemo(() => {
    return NODES.map((n) => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...n.pos)]);
  }, []);
  return (
    <>
      {points.map((pair, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(pair.flatMap((v) => [v.x, v.y, v.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={LINE_COLOR} transparent opacity={0.7} />
        </line>
      ))}
    </>
  );
}

function Rig({ scrollRef }) {
  const group = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useMemo(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    const s = scrollRef.current; // 0..1
    if (group.current) {
      group.current.rotation.y += delta * 0.06;
      group.current.rotation.y += (mouse.current.x * 0.3 - group.current.rotation.y * 0.02) * delta;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.15, 0.03);
    }
    // camera pulls back and orbits down as the page scrolls
    const camZ = THREE.MathUtils.lerp(6.5, 11, s);
    const camY = THREE.MathUtils.lerp(0, -2.4, s);
    state.camera.position.set(
      Math.sin(s * Math.PI * 0.6) * 1.5,
      camY,
      camZ
    );
    state.camera.lookAt(0, camY * 0.4, 0);
  });

  return (
    <group ref={group}>
      <CoreNode />
      <Lines />
      {NODES.map((n, i) => (
        <SatelliteNode key={n.label} pos={n.pos} index={i} />
      ))}
    </group>
  );
}

export default function Scene({ scrollRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#0B0D12' }}
      aria-hidden="true"
    >
      <color attach="background" args={['#0B0D12']} />
      <fog attach="fog" args={['#0B0D12', 8, 22]} />
      <Particles />
      <Rig scrollRef={scrollRef} />
    </Canvas>
  );
}
