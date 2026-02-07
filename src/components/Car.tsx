import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Car() {
  const wheelFL = useRef<THREE.Mesh>(null!)
  const wheelFR = useRef<THREE.Mesh>(null!)
  const wheelBL = useRef<THREE.Mesh>(null!)
  const wheelBR = useRef<THREE.Mesh>(null!)
  const headlightL = useRef<THREE.SpotLight>(null!)
  const headlightR = useRef<THREE.SpotLight>(null!)

  useFrame((state, delta) => {
    // Rotate wheels
    const wheelSpeed = delta * 10
    if (wheelFL.current) wheelFL.current.rotation.x -= wheelSpeed
    if (wheelFR.current) wheelFR.current.rotation.x -= wheelSpeed
    if (wheelBL.current) wheelBL.current.rotation.x -= wheelSpeed
    if (wheelBR.current) wheelBR.current.rotation.x -= wheelSpeed
  })

  return (
    <group position={[0, 0.5, 0]}>
      {/* Car Body - Main */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.6, 4.5]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Car Body - Cabin */}
      <mesh castShadow position={[0, 0.9, -0.3]}>
        <boxGeometry args={[1.8, 0.6, 2]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.9, 0.6]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.6, 0.5, 0.05]} />
        <meshStandardMaterial
          color="#00f0ff"
          transparent
          opacity={0.4}
          metalness={0.5}
          roughness={0}
        />
      </mesh>

      {/* Rear Window */}
      <mesh position={[0, 0.9, -1.3]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[1.6, 0.5, 0.05]} />
        <meshStandardMaterial
          color="#00f0ff"
          transparent
          opacity={0.4}
          metalness={0.5}
          roughness={0}
        />
      </mesh>

      {/* Neon Underglow */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.2, 0.05, 4.7]} />
        <meshBasicMaterial color="#ff2d95" transparent opacity={0.8} />
      </mesh>

      {/* Side Neon Strips - Left */}
      <mesh position={[-1.05, 0.3, 0]}>
        <boxGeometry args={[0.05, 0.1, 4.3]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Side Neon Strips - Right */}
      <mesh position={[1.05, 0.3, 0]}>
        <boxGeometry args={[0.05, 0.1, 4.3]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Front Neon Strip */}
      <mesh position={[0, 0.3, 2.2]}>
        <boxGeometry args={[1.8, 0.1, 0.05]} />
        <meshBasicMaterial color="#ff2d95" />
      </mesh>

      {/* Rear Neon Strip */}
      <mesh position={[0, 0.3, -2.2]}>
        <boxGeometry args={[1.8, 0.1, 0.05]} />
        <meshBasicMaterial color="#ff6b2b" />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.6, 0.4, 2.25]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.6, 0.4, 2.25]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Headlight Spotlights */}
      <spotLight
        ref={headlightL}
        position={[-0.6, 0.4, 2.5]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        distance={30}
        target-position={[-0.6, 0, 10]}
      />
      <spotLight
        ref={headlightR}
        position={[0.6, 0.4, 2.5]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        distance={30}
        target-position={[0.6, 0, 10]}
      />

      {/* Tail Lights */}
      <mesh position={[-0.6, 0.4, -2.25]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshBasicMaterial color="#ff2d2d" />
      </mesh>
      <mesh position={[0.6, 0.4, -2.25]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshBasicMaterial color="#ff2d2d" />
      </mesh>

      {/* Spoiler */}
      <mesh castShadow position={[0, 1.1, -2]}>
        <boxGeometry args={[1.8, 0.05, 0.3]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[-0.7, 0.95, -2]}>
        <boxGeometry args={[0.08, 0.25, 0.15]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0.7, 0.95, -2]}>
        <boxGeometry args={[0.08, 0.25, 0.15]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <Wheel ref={wheelFL} position={[-0.9, 0, 1.3]} />
      <Wheel ref={wheelFR} position={[0.9, 0, 1.3]} />
      <Wheel ref={wheelBL} position={[-0.9, 0, -1.3]} />
      <Wheel ref={wheelBR} position={[0.9, 0, -1.3]} />

      {/* Point lights for underglow */}
      <pointLight position={[0, 0.1, 0]} intensity={3} color="#ff2d95" distance={5} />
      <pointLight position={[0, 0.1, 2]} intensity={2} color="#00f0ff" distance={3} />
      <pointLight position={[0, 0.1, -2]} intensity={2} color="#ff6b2b" distance={3} />
    </group>
  )
}

interface WheelProps {
  position: [number, number, number]
}

const Wheel = ({ position, ...props }: WheelProps & { ref?: React.Ref<THREE.Mesh> }) => {
  const wheelRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x -= delta * 10
    }
  })

  return (
    <group position={position}>
      <mesh ref={wheelRef} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.32, 8]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Rim glow */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.33, 6]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
    </group>
  )
}
