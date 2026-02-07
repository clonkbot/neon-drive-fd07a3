import { useEffect, useState } from 'react'

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
        zIndex: 10,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Title */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'slideIn 0.8s ease forwards',
        }}
      >
        <h1
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #00f0ff 0%, #ff2d95 50%, #ff6b2b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            lineHeight: 1,
            letterSpacing: '0.05em',
            textShadow: '0 0 40px rgba(0, 240, 255, 0.5)',
            filter: 'drop-shadow(0 0 20px rgba(255, 45, 149, 0.5))',
            animation: 'glow-pulse 2s ease-in-out infinite',
            margin: 0,
          }}
        >
          NEON
        </h1>
        <h2
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.3em',
            marginTop: '-0.2em',
          }}
        >
          DRIVE
        </h2>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.6)',
          letterSpacing: '0.2em',
          marginTop: '1.5rem',
          textTransform: 'uppercase',
          animation: 'slideIn 0.8s ease 0.2s forwards',
          opacity: 0,
        }}
      >
        Browser-Based Arcade Racing
      </p>

      {/* Start Button */}
      <button
        onClick={onStart}
        style={{
          marginTop: '3rem',
          padding: '1rem 3rem',
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#00f0ff',
          background: 'transparent',
          border: '2px solid #00f0ff',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          animation: 'slideIn 0.8s ease 0.4s forwards, borderGlow 3s ease-in-out infinite',
          opacity: 0,
          textTransform: 'uppercase',
          minWidth: '200px',
          minHeight: '60px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 240, 255, 0.15)'
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        Start Engine
      </button>

      {/* Controls Info */}
      <div
        style={{
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          animation: 'slideIn 0.8s ease 0.6s forwards',
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Controls
        </p>
        <div
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 4vw, 2rem)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <ControlKey label="W / ↑" description="Accelerate" />
          <ControlKey label="S / ↓" description="Brake" />
          <ControlKey label="A / ←" description="Turn Left" />
          <ControlKey label="D / →" description="Turn Right" />
          <ControlKey label="Space" description="Handbrake" />
        </div>
        <p
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.3)',
            marginTop: '0.5rem',
          }}
        >
          Mobile: Use on-screen controls
        </p>
      </div>
    </div>
  )
}

function ControlKey({ label, description }: { label: string; description: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.3rem',
      }}
    >
      <span
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
          fontWeight: 600,
          color: '#ff2d95',
          padding: '0.4rem 0.6rem',
          border: '1px solid rgba(255, 45, 149, 0.4)',
          borderRadius: '4px',
          background: 'rgba(255, 45, 149, 0.1)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
          color: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        {description}
      </span>
    </div>
  )
}
