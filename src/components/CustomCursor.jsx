import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, useSpring, useMotionValue, animate, useAnimation } from 'framer-motion'

// Particle component for the torch sparkle effect
const Particle = ({ x, y, color }) => {
  // Random movement parameters
  const particleX = useMotionValue(0)
  const particleY = useMotionValue(0)
  const size = useMotionValue(Math.random() * 3 + 1)
  const opacity = useMotionValue(Math.random() * 0.5 + 0.3)
  
  useEffect(() => {
    // Animate particles in random directions
    animate(particleX, (Math.random() - 0.5) * 60, {
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    })
    
    animate(particleY, (Math.random() - 0.5) * 60, {
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    })
    
    // Fade and size change
    animate(size, Math.random() * 4 + 1, {
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    })
    
    animate(opacity, Math.random() * 0.5 + 0.1, {
      duration: Math.random() * 1 + 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    })
  }, [])

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        x: x + particleX.get(),
        y: y + particleY.get(),
        width: size,
        height: size,
        backgroundColor: color,
        opacity: opacity,
        filter: "blur(1px)",
        boxShadow: `0 0 4px ${color}`
      }}
    />
  )
}

// Lens flare component
const LensFlare = ({ x, y, size, opacity }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x, 
        y,
        width: size,
        height: size,
        opacity,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0) 70%)',
        filter: 'blur(1px)'
      }}
    />
  )
}

const CustomCursor = ({ darkMode }) => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const torchRef = useRef(null)
  const torchInnerRef = useRef(null)
  const [isClicked, setIsClicked] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [particleCount] = useState(10)
  const [particles, setParticles] = useState([])
  const [torchColor, setTorchColor] = useState("#ffffff")
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const torchSize = useMotionValue(darkMode ? 250 : 0)
  const innerGlowOpacity = useMotionValue(0.6)
  const torchControls = useAnimation()
  
  // Generate the lens flare elements
  const lensFlares = useMemo(() => {
    return [
      { size: 10, offset: { x: -15, y: -15 }, opacity: 0.8 },
      { size: 20, offset: { x: 20, y: 20 }, opacity: 0.5 },
      { size: 5, offset: { x: 35, y: -20 }, opacity: 0.7 },
    ]
  }, [])

  const springConfig = { damping: 25, stiffness: 200 }
  const followerX = useSpring(mouseX, springConfig)
  const followerY = useSpring(mouseY, springConfig)

  // Update particles when mouse moves
  useEffect(() => {
    if (darkMode) {
      // Create particles with random positions relative to cursor
      const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: mouseX.get(),
        y: mouseY.get(),
        color: torchColor
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [darkMode, particleCount, torchColor])
  
  // Update torch color periodically in dark mode
  useEffect(() => {
    if (!darkMode) return
    
    let colorInterval
    
    if (isClicked) {
      // During click, quickly cycle through vibrant colors
      colorInterval = setInterval(() => {
        const hue = Math.floor(Math.random() * 360)
        setTorchColor(`hsl(${hue}, 70%, 70%)`)
      }, 300)
    } else if (isHovering) {
      // When hovering, use a soft blue
      setTorchColor('#a0c8ff')
    } else {
      // Normal torch: subtle color changes
      colorInterval = setInterval(() => {
        // Gentle color transitions between warm white tones
        const hue = Math.floor(Math.random() * 30) + 20 // Golden warm tones
        const saturation = Math.floor(Math.random() * 10) + 10 // Low saturation
        setTorchColor(`hsl(${hue}, ${saturation}%, 95%)`) // High lightness for white torch
      }, 3000)
    }
    
    return () => {
      if (colorInterval) clearInterval(colorInterval)
    }
  }, [darkMode, isClicked, isHovering])

  // Update torch size when dark mode changes
  useEffect(() => {
    animate(torchSize, darkMode ? 250 : 0, {
      duration: 0.5,
      ease: "easeInOut"
    })

    // Add flickering effect when in dark mode
    if (darkMode) {
      startFlickerEffect()
    } else {
      torchControls.stop()
    }
  }, [darkMode])

  // Flicker effect for torch
  const startFlickerEffect = () => {
    const flicker = async () => {
      while (true) {
        // Random timing for natural flicker
        const flickerDelay = 2 + Math.random() * 4
        await new Promise(resolve => setTimeout(resolve, flickerDelay * 1000))
        
        // Quick, subtle size change
        await torchControls.start({
          scale: 1.05 + Math.random() * 0.1,
          opacity: 0.9 + Math.random() * 0.1,
          transition: { duration: 0.2 }
        })
        
        // Return to normal
        await torchControls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3 }
        })
      }
    }
    
    flicker()
  }

  useEffect(() => {
    let frame
    const moveCursor = (e) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }

    const handleMouseDown = () => {
      setIsClicked(true)
      if (darkMode) {
        animate(torchSize, 350, { duration: 0.3 })
        animate(innerGlowOpacity, 0.8, { duration: 0.2 })
      }
    }

    const handleMouseUp = () => {
      setIsClicked(false)
      if (darkMode) {
        animate(torchSize, 250, { duration: 0.3 })
        animate(innerGlowOpacity, 0.6, { duration: 0.2 })
      }
    }

    const addMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('a, button')
      
      magneticElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => setIsHovering(true))
        elem.addEventListener('mouseleave', () => setIsHovering(false))
        
        elem.addEventListener('mousemove', (e) => {
          const rect = elem.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          
          const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + 
            Math.pow(e.clientY - centerY, 2)
          )
          
          if (distance < 100) {
            const magnetStrength = (100 - distance) / 100
            mouseX.set(centerX + (e.clientX - centerX) * 0.2)
            mouseY.set(centerY + (e.clientY - centerY) * 0.2)
            
            if (darkMode) {
              animate(torchSize, 300, { duration: 0.2 })
              animate(innerGlowOpacity, 0.7, { duration: 0.2 })
            }
          } else if (darkMode && !isClicked) {
            animate(torchSize, 250, { duration: 0.2 })
            animate(innerGlowOpacity, 0.6, { duration: 0.2 })
          }
        })
      })
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    addMagneticEffect()

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const cursorVariants = {
    default: {
      opacity: 1,
      scale: 1
    },
    hover: {
      scale: 1.5,
      backgroundColor: "#3b82f6"
    },
    click: {
      scale: 0.8,
      backgroundColor: "#6366f1"
    }
  }

  const followerVariants = {
    default: {
      opacity: 1,
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.8)"
    },
    hover: {
      scale: 1.5,
      borderColor: "#3b82f6"
    },
    click: {
      scale: 0.8,
      borderColor: "#6366f1"
    }
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="hidden md:block fixed w-3 h-3 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        variants={cursorVariants}
        animate={isClicked ? "click" : isHovering ? "hover" : "default"}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={followerRef}
        className="hidden md:block fixed w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        variants={followerVariants}
        animate={isClicked ? "click" : isHovering ? "hover" : "default"}
        transition={{ duration: 0.3 }}
      />
      
      {darkMode && (
        <>
          {/* Particles */}
          {particles.map(particle => (
            <Particle 
              key={particle.id} 
              x={mouseX.get()} 
              y={mouseY.get()} 
              color={torchColor} 
            />
          ))}
        
          {/* Lens flares */}
          {isClicked && lensFlares.map((flare, index) => (
            <LensFlare
              key={index}
              x={mouseX.get() + flare.offset.x}
              y={mouseY.get() + flare.offset.y}
              size={flare.size}
              opacity={flare.opacity}
            />
          ))}
        
          {/* Inner glow - brighter center */}
          <motion.div
            ref={torchInnerRef}
            className="hidden md:block fixed pointer-events-none z-40"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${torchColor}80 0%, ${torchColor}00 70%)`,
              mixBlendMode: 'screen',
              width: 120,
              height: 120,
              opacity: innerGlowOpacity
            }}
            animate={torchControls}
          />
          
          {/* Main torch light */}
          <motion.div
            ref={torchRef}
            className="hidden md:block fixed pointer-events-none z-40"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
              borderRadius: '50%',
              boxShadow: isClicked ? `0 0 60px 20px ${torchColor}30` : `0 0 40px 10px ${torchColor}20`,
              background: `radial-gradient(circle, ${torchColor}30 0%, ${torchColor}10 60%, ${torchColor}00 70%)`,
              mixBlendMode: 'screen',
              width: torchSize,
              height: torchSize,
              filter: isClicked ? 'brightness(1.2)' : 'brightness(1)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: isClicked ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </>
  )
}

export default CustomCursor 