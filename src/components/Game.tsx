import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'
import Car from './Car'
import City from './City'
import Ground from './Ground'

interface GameProps {
  gameStarted: boolean
  onSpeedChange: (speed: number) => void
}

export default function Game({ gameStarted, onSpeedChange }: GameProps) {
  const carRef = useRef<THREE.Group>(null!)
  const { camera } = useThree()

  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
  })

  const velocity = useRef(0)
  const rotation = useRef(0)
  const position = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) return
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setKeys(k => ({ ...k, forward: true }))
          break
        case 's':
        case 'arrowdown':
          setKeys(k => ({ ...k, backward: true }))
          break
        case 'a':
        case 'arrowleft':
          setKeys(k => ({ ...k, left: true }))
          break
        case 'd':
        case 'arrowright':
          setKeys(k => ({ ...k, right: true }))
          break
        case ' ':
          setKeys(k => ({ ...k, brake: true }))
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setKeys(k => ({ ...k, forward: false }))
          break
        case 's':
        case 'arrowdown':
          setKeys(k => ({ ...k, backward: false }))
          break
        case 'a':
        case 'arrowleft':
          setKeys(k => ({ ...k, left: false }))
          break
        case 'd':
        case 'arrowright':
          setKeys(k => ({ ...k, right: false }))
          break
        case ' ':
          setKeys(k => ({ ...k, brake: false }))
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameStarted])

  useFrame((state, delta) => {
    if (!gameStarted || !carRef.current) return

    const acceleration = 8
    const maxSpeed = 4
    const friction = 0.98
    const brakeForce = 0.92
    const turnSpeed = 2.5

    // Acceleration
    if (keys.forward) {
      velocity.current = Math.min(velocity.current + acceleration * delta, maxSpeed)
    }
    if (keys.backward) {
      velocity.current = Math.max(velocity.current - acceleration * delta, -maxSpeed * 0.5)
    }

    // Braking
    if (keys.brake) {
      velocity.current *= brakeForce
    }

    // Friction
    velocity.current *= friction

    // Turning (only when moving)
    if (Math.abs(velocity.current) > 0.1) {
      const turnMultiplier = velocity.current > 0 ? 1 : -1
      if (keys.left) {
        rotation.current += turnSpeed * delta * turnMultiplier
      }
      if (keys.right) {
        rotation.current -= turnSpeed * delta * turnMultiplier
      }
    }

    // Update position
    const direction = new THREE.Vector3(
      Math.sin(rotation.current),
      0,
      Math.cos(rotation.current)
    )
    position.current.add(direction.multiplyScalar(velocity.current * delta * 10))

    // Apply to car
    carRef.current.position.copy(position.current)
    carRef.current.rotation.y = rotation.current

    // Update speed display
    onSpeedChange(velocity.current)

    // Camera follow
    const cameraOffset = new THREE.Vector3(
      -Math.sin(rotation.current) * 12,
      5,
      -Math.cos(rotation.current) * 12
    )
    const targetCameraPos = position.current.clone().add(cameraOffset)
    camera.position.lerp(targetCameraPos, 0.05)

    const lookAtPoint = position.current.clone().add(new THREE.Vector3(0, 1, 0))
    camera.lookAt(lookAtPoint)
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} color="#4a4a6a" />
      <directionalLight
        position={[50, 100, 50]}
        intensity={0.5}
        color="#8080ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Point lights for neon effect */}
      <pointLight position={[0, 10, 0]} intensity={2} color="#ff2d95" distance={100} />
      <pointLight position={[30, 5, 30]} intensity={1.5} color="#00f0ff" distance={80} />
      <pointLight position={[-30, 5, -30]} intensity={1.5} color="#ff6b2b" distance={80} />

      {/* Environment */}
      <Stars radius={200} depth={100} count={5000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#0a0a1a', 30, 150]} />
      <Environment preset="night" />

      {/* Ground */}
      <Ground />

      {/* City */}
      <City />

      {/* Car */}
      <group ref={carRef}>
        <Car />
      </group>
    </>
  )
}
