import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function City() {
  return (
    <group>
      {/* Generate buildings in a grid pattern */}
      <BuildingCluster />

      {/* Neon signs and decorations */}
      <NeonDecorations />

      {/* Street lights */}
      <StreetLights />
    </group>
  )
}

function BuildingCluster() {
  const buildings = useMemo(() => {
    const result: Array<{
      position: [number, number, number]
      size: [number, number, number]
      color: string
      emissive: string
    }> = []

    // Create buildings in grid, avoiding roads
    const gridSize = 20
    const spacing = 25

    for (let x = -4; x <= 4; x++) {
      for (let z = -4; z <= 4; z++) {
        // Skip center and road areas
        if (Math.abs(x) <= 1 && Math.abs(z) <= 1) continue
        if (x === 0 || z === 0) continue
        if (Math.abs(x) === 2 && Math.abs(z) <= 1) continue
        if (Math.abs(z) === 2 && Math.abs(x) <= 1) continue

        const width = 8 + Math.random() * 8
        const depth = 8 + Math.random() * 8
        const height = 15 + Math.random() * 45

        const colors = ['#1a1a2e', '#0a0a1a', '#151530', '#0f0f25']
        const emissives = ['#ff2d95', '#00f0ff', '#a855f7', '#ff6b2b']

        result.push({
          position: [x * spacing + (Math.random() - 0.5) * 5, height / 2, z * spacing + (Math.random() - 0.5) * 5],
          size: [width, height, depth],
          color: colors[Math.floor(Math.random() * colors.length)],
          emissive: emissives[Math.floor(Math.random() * emissives.length)],
        })
      }
    }

    return result
  }, [])

  return (
    <group>
      {buildings.map((building, i) => (
        <Building key={i} {...building} />
      ))}
    </group>
  )
}

interface BuildingProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  emissive: string
}

function Building({ position, size, color, emissive }: BuildingProps) {
  const windowsRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (windowsRef.current) {
      // Subtle window flicker effect
      const material = windowsRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
    }
  })

  // Create window pattern
  const windowTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 256
    const ctx = canvas.getContext('2d')!

    // Building facade
    ctx.fillStyle = '#0a0a15'
    ctx.fillRect(0, 0, 128, 256)

    // Windows
    const windowSize = 8
    const windowSpacing = 16
    ctx.fillStyle = emissive

    for (let row = 0; row < 256 / windowSpacing; row++) {
      for (let col = 0; col < 128 / windowSpacing; col++) {
        // Random window on/off
        if (Math.random() > 0.3) {
          const opacity = 0.3 + Math.random() * 0.7
          ctx.globalAlpha = opacity
          ctx.fillRect(
            col * windowSpacing + 4,
            row * windowSpacing + 4,
            windowSize,
            windowSize
          )
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(size[0] / 8, size[1] / 16)
    return texture
  }, [size, emissive])

  return (
    <group position={position}>
      {/* Main building */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Windows overlay */}
      <mesh ref={windowsRef} position={[0, 0, size[2] / 2 + 0.1]}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          map={windowTexture}
          transparent
          emissive={emissive}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0, -size[2] / 2 - 0.1]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          map={windowTexture}
          transparent
          emissive={emissive}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[size[0] / 2 + 0.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size[2], size[1]]} />
        <meshStandardMaterial
          map={windowTexture}
          transparent
          emissive={emissive}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[-size[0] / 2 - 0.1, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[size[2], size[1]]} />
        <meshStandardMaterial
          map={windowTexture}
          transparent
          emissive={emissive}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Rooftop accent */}
      <mesh position={[0, size[1] / 2 + 0.5, 0]}>
        <boxGeometry args={[size[0] - 2, 1, size[2] - 2]} />
        <meshBasicMaterial color={emissive} transparent opacity={0.3} />
      </mesh>

      {/* Neon edge */}
      <NeonEdge size={size} color={emissive} />
    </group>
  )
}

interface NeonEdgeProps {
  size: [number, number, number]
  color: string
}

function NeonEdge({ size, color }: NeonEdgeProps) {
  return (
    <group position={[0, size[1] / 2 + 0.1, 0]}>
      {/* Top edges */}
      <mesh position={[0, 0, size[2] / 2]}>
        <boxGeometry args={[size[0], 0.2, 0.2]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 0, -size[2] / 2]}>
        <boxGeometry args={[size[0], 0.2, 0.2]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[size[0] / 2, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, size[2]]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[-size[0] / 2, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, size[2]]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

function NeonDecorations() {
  const signs = useMemo(() => {
    return [
      { position: [-25, 15, -25] as [number, number, number], text: 'CYBER', color: '#ff2d95' },
      { position: [25, 20, 25] as [number, number, number], text: 'NEON', color: '#00f0ff' },
      { position: [-25, 12, 25] as [number, number, number], text: 'DRIVE', color: '#a855f7' },
      { position: [25, 18, -25] as [number, number, number], text: 'ZONE', color: '#ff6b2b' },
    ]
  }, [])

  return (
    <group>
      {signs.map((sign, i) => (
        <NeonSign key={i} {...sign} />
      ))}
    </group>
  )
}

interface NeonSignProps {
  position: [number, number, number]
  text: string
  color: string
}

function NeonSign({ position, color }: NeonSignProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      // Flickering effect
      const material = meshRef.current.material as THREE.MeshBasicMaterial
      const flicker = Math.sin(state.clock.elapsedTime * 10 + position[0]) > 0.9 ? 0.5 : 1
      material.opacity = 0.8 * flicker
    }
  })

  return (
    <group position={position}>
      {/* Sign backing */}
      <mesh>
        <boxGeometry args={[6, 2, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Neon glow */}
      <mesh ref={meshRef} position={[0, 0, 0.2]}>
        <boxGeometry args={[5, 1.5, 0.1]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight position={[0, 0, 2]} intensity={2} color={color} distance={15} />
    </group>
  )
}

function StreetLights() {
  const lights = useMemo(() => {
    const result: [number, number, number][] = []

    // Place lights along roads
    for (let i = -80; i <= 80; i += 20) {
      result.push([7, 0, i])
      result.push([-7, 0, i])
      result.push([i, 0, 7])
      result.push([i, 0, -7])
    }

    return result
  }, [])

  return (
    <group>
      {lights.map((pos, i) => (
        <StreetLight key={i} position={pos} />
      ))}
    </group>
  )
}

interface StreetLightProps {
  position: [number, number, number]
}

function StreetLight({ position }: StreetLightProps) {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 8, 8]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Light fixture */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.5]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Light */}
      <pointLight
        position={[0, 7.5, 0]}
        intensity={1}
        color="#00f0ff"
        distance={20}
        decay={2}
      />
    </group>
  )
}
