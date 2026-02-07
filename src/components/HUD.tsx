import { useState, useEffect } from 'react'

interface HUDProps {
  speed: number
}

export default function HUD({ speed }: HUDProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const displaySpeed = Math.abs(Math.round(speed * 50))

  return (
    <>
      {/* Speed Display */}
      <div
        style={{
          position: 'fixed',
          bottom: isMobile ? '180px' : '40px',
          right: isMobile ? '50%' : '40px',
          transform: isMobile ? 'translateX(50%)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-end',
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 900,
            color: displaySpeed > 100 ? '#ff2d95' : '#00f0ff',
            textShadow: displaySpeed > 100
              ? '0 0 30px #ff2d95, 0 0 60px rgba(255, 45, 149, 0.5)'
              : '0 0 30px #00f0ff, 0 0 60px rgba(0, 240, 255, 0.5)',
            lineHeight: 1,
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
          }}
        >
          {displaySpeed}
        </div>
        <div
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          km/h
        </div>
      </div>

      {/* Title Badge */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          background: 'rgba(10, 10, 26, 0.7)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '4px',
          backdropFilter: 'blur(10px)',
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00f0ff',
            boxShadow: '0 0 10px #00f0ff',
            animation: 'glow-pulse 1.5s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: '0.15em',
          }}
        >
          NEON DRIVE
        </span>
      </div>

      {/* Mobile Controls */}
      {isMobile && <MobileControls />}

      {/* Mini Map / Compass */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: 'clamp(60px, 12vw, 80px)',
          height: 'clamp(60px, 12vw, 80px)',
          borderRadius: '50%',
          border: '2px solid rgba(0, 240, 255, 0.3)',
          background: 'rgba(10, 10, 26, 0.6)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(0.55rem, 1.2vw, 0.7rem)',
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center',
          }}
        >
          <div style={{ color: '#ff2d95', fontWeight: 700 }}>N</div>
          <div style={{ fontSize: '0.6em', marginTop: '4px' }}>FREE ROAM</div>
        </div>
      </div>
    </>
  )
}

function MobileControls() {
  const handleTouchStart = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  }

  const handleTouchEnd = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keyup', { key }))
  }

  const buttonStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    border: '2px solid rgba(0, 240, 255, 0.4)',
    background: 'rgba(0, 240, 255, 0.1)',
    color: '#00f0ff',
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '1.2rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  }

  const accelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    width: '80px',
    height: '80px',
    border: '2px solid rgba(255, 45, 149, 0.5)',
    background: 'rgba(255, 45, 149, 0.15)',
    color: '#ff2d95',
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '0 20px',
        zIndex: 30,
        pointerEvents: 'none',
      }}
    >
      {/* Left side - Direction controls */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto',
        }}
      >
        <button
          style={buttonStyle}
          onTouchStart={() => handleTouchStart('w')}
          onTouchEnd={() => handleTouchEnd('w')}
        >
          ↑
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={buttonStyle}
            onTouchStart={() => handleTouchStart('a')}
            onTouchEnd={() => handleTouchEnd('a')}
          >
            ←
          </button>
          <button
            style={buttonStyle}
            onTouchStart={() => handleTouchStart('s')}
            onTouchEnd={() => handleTouchEnd('s')}
          >
            ↓
          </button>
          <button
            style={buttonStyle}
            onTouchStart={() => handleTouchStart('d')}
            onTouchEnd={() => handleTouchEnd('d')}
          >
            →
          </button>
        </div>
      </div>

      {/* Right side - Accelerate/Brake */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'auto',
        }}
      >
        <button
          style={accelButtonStyle}
          onTouchStart={() => handleTouchStart('w')}
          onTouchEnd={() => handleTouchEnd('w')}
        >
          GAS
        </button>
        <button
          style={{
            ...accelButtonStyle,
            border: '2px solid rgba(255, 107, 43, 0.5)',
            background: 'rgba(255, 107, 43, 0.15)',
            color: '#ff6b2b',
          }}
          onTouchStart={() => handleTouchStart(' ')}
          onTouchEnd={() => handleTouchEnd(' ')}
        >
          BRAKE
        </button>
      </div>
    </div>
  )
}
