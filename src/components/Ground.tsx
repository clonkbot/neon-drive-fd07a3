import { useMemo } from 'react'
import * as THREE from 'three'

export default function Ground() {
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    // Background
    ctx.fillStyle = '#0a0a1a'
    ctx.fillRect(0, 0, 512, 512)

    // Grid lines
    ctx.strokeStyle = '#1a1a3a'
    ctx.lineWidth = 1

    // Draw grid
    const gridSize = 32
    for (let i = 0; i <= 512; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(512, i)
      ctx.stroke()
    }

    // Neon accent lines
    ctx.strokeStyle = '#ff2d9520'
    ctx.lineWidth = 2
    for (let i = 0; i <= 512; i += 128) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(512, i)
      ctx.stroke()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(50, 50)
    return texture
  }, [])

  return (
    <group>
      {/* Main ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial
          map={gridTexture}
          color="#0a0a1a"
          metalness={0.3}
          roughness={0.8}
        />
      </mesh>

      {/* Road - Main */}
      <Road position={[0, 0.01, 0]} rotation={0} length={200} />
      <Road position={[0, 0.01, 0]} rotation={Math.PI / 2} length={200} />

      {/* Road - Outer ring */}
      <Road position={[50, 0.01, 0]} rotation={0} length={200} />
      <Road position={[-50, 0.01, 0]} rotation={0} length={200} />
      <Road position={[0, 0.01, 50]} rotation={Math.PI / 2} length={200} />
      <Road position={[0, 0.01, -50]} rotation={Math.PI / 2} length={200} />
    </group>
  )
}

interface RoadProps {
  position: [number, number, number]
  rotation: number
  length: number
}

function Road({ position, rotation, length }: RoadProps) {
  const roadTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!

    // Road surface
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, 256, 1024)

    // Center line (dashed)
    ctx.strokeStyle = '#ff2d95'
    ctx.lineWidth = 4
    ctx.setLineDash([40, 30])
    ctx.beginPath()
    ctx.moveTo(128, 0)
    ctx.lineTo(128, 1024)
    ctx.stroke()

    // Edge lines
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 3
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.moveTo(10, 0)
    ctx.lineTo(10, 1024)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(246, 0)
    ctx.lineTo(246, 1024)
    ctx.stroke()

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, length / 10)
    return texture
  }, [length])

  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, rotation]}
      receiveShadow
    >
      <planeGeometry args={[12, length]} />
      <meshStandardMaterial
        map={roadTexture}
        metalness={0.2}
        roughness={0.9}
      />
    </mesh>
  )
}
