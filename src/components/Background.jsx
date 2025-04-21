import { motion, useAnimationFrame } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor hidden lg:block'
    document.body.appendChild(cursor)

    const updateCursor = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1')
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0')

    // Add cursor styles
    const style = document.createElement('style')
    style.textContent = `
      .custom-cursor {
        width: 20px;
        height: 20px;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
      }
      .custom-cursor::before {
        content: '</>';
        position: absolute;
        font-size: 12px;
        color: #60A5FA;
        transform: translate(-50%, -50%);
        animation: cursorPulse 2s infinite;
      }
      @keyframes cursorPulse {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }
      body { cursor: none; }
      a, button, input, textarea { cursor: none; }
      a:hover ~ .custom-cursor::before,
      button:hover ~ .custom-cursor::before {
        color: #93C5FD;
        transform: translate(-50%, -50%) scale(1.5);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', () => cursor.style.opacity = '1')
      document.removeEventListener('mouseleave', () => cursor.style.opacity = '0')
      document.body.removeChild(cursor)
      document.head.removeChild(style)
    }
  }, [])

  return null
}

const CodeSnippet = ({ darkMode, index }) => {
  const snippets = [
    '<div>', 'function()', 'const', 'return', 'import', 'export',
    '{ }', '=> {}', 'async', 'await', 'useState', 'useEffect',
    'npm install', 'git commit', 'docker run', 'npm start',
    'react', 'node', 'next', 'typescript'
  ]
  
  return (
    <motion.div
      className={`absolute font-mono text-xs sm:text-sm ${
        darkMode ? 'text-cyan-400/50' : 'text-blue-500/40'
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {snippets[index % snippets.length]}
    </motion.div>
  )
}

const BinaryRain = ({ darkMode, index }) => {
  const [binary, setBinary] = useState('01')
  
  useAnimationFrame(() => {
    setBinary(prev => Math.random() > 0.5 ? '10' : '01')
  })

  return (
    <motion.div
      className={`absolute font-mono text-xs ${
        darkMode ? 'text-emerald-400/60' : 'text-emerald-500/40'
      }`}
      style={{
        left: `${(index % 30) * 3.33}%`,
        top: -20,
      }}
      animate={{
        y: ['0%', '120%'],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
    >
      {binary}
    </motion.div>
  )
}

const TechSymbol = ({ darkMode, index }) => {
  const symbols = [
    '<>', '/>', '{ }', '[]', '()', '&&', '||', '=>', '+=', '===',
    '++', '--', '!=', '>=', '<=', '**', '??', '...', '///', '###'
  ]
  
  return (
    <motion.div
      className={`absolute font-mono text-base sm:text-lg ${
        darkMode ? 'text-indigo-400/55' : 'text-violet-500/40'
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: Math.random() * 15 + 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {symbols[index % symbols.length]}
    </motion.div>
  )
}

const Background = ({ darkMode }) => {
  const [isMobile, setIsMobile] = useState(false)
  
  // Check for mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // Determine number of elements based on screen size
  const getElementCount = () => {
    if (isMobile) {
      return {
        codeSnippets: 10,
        binaryRain: 10,
        techSymbols: 8
      }
    }
    return {
      codeSnippets: 30,
      binaryRain: 30,
      techSymbols: 25
    }
  }
  
  const { codeSnippets, binaryRain, techSymbols } = getElementCount()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <CustomCursor />
      
      {/* Base Background */}
      <div 
        className={`absolute inset-0 transition-colors duration-500
          ${darkMode 
            ? 'bg-[#0a1121]' // Deeper, richer dark blue
            : 'bg-gray-50'
          }`}
      />

      {/* Gradient Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500
          ${darkMode 
            ? 'bg-gradient-to-br from-[#0a1121] via-[#141e33] to-[#0a1121] opacity-95' 
            : 'bg-gradient-to-br from-gray-50/95 via-white/95 to-gray-100/95'
          }`}
      />

      {/* Code Snippets */}
      <div className="absolute inset-0">
        {[...Array(codeSnippets)].map((_, i) => (
          <CodeSnippet key={`code-${i}`} darkMode={darkMode} index={i} />
        ))}
      </div>

      {/* Binary Rain */}
      <div className="absolute inset-0">
        {[...Array(binaryRain)].map((_, i) => (
          <BinaryRain key={`binary-${i}`} darkMode={darkMode} index={i} />
        ))}
      </div>

      {/* Tech Symbols */}
      <div className="absolute inset-0">
        {[...Array(techSymbols)].map((_, i) => (
          <TechSymbol key={`symbol-${i}`} darkMode={darkMode} index={i} />
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500
          ${darkMode ? 'opacity-[0.1]' : 'opacity-[0.07]'}`}
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '2rem 2rem' : '4rem 4rem',
        }}
      />

      {/* Vignette Effect for Dark Mode */}
      {darkMode && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
          }}
        />
      )}
    </div>
  )
}

export default Background 