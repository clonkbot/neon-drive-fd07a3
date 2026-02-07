import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import Game from './components/Game'
import HUD from './components/HUD'
import StartScreen from './components/StartScreen'
import './styles.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [speed, setSpeed] = useState(0)

  return (
    <div className="app-container">
      {/* Scanline overlay */}
      <div className="scanlines" />

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)' }}
      >
        <Suspense fallback={null}>
          <Game
            gameStarted={gameStarted}
            onSpeedChange={setSpeed}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <HUD speed={speed} />
      )}

      {/* Footer */}
      <footer className="footer">
        <span>Requested by <a href="https://twitter.com/Vasu_Devs" target="_blank" rel="noopener noreferrer">@Vasu_Devs</a></span>
        <span className="dot">·</span>
        <span>Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></span>
      </footer>
    </div>
  )
}

export default App
