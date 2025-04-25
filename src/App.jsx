import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Background from './components/Background'
import MobileNav from './components/MobileNav'
import Resume from './components/Resume'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'}`}>
      <Background darkMode={darkMode} />
      
      {/* Dark overlay for better torch effect */}
      <AnimatePresence>
        {darkMode && (
          <motion.div 
            className="fixed inset-0 bg-black/40 pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      
      {!isMobile && <CustomCursor darkMode={darkMode} />}
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 relative z-40">
        {/* Hero Section */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center backdrop-blur-sm pt-16 pb-20 sm:py-0"
        >
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
              Hello, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Nikhil Gahlaut</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Full Stack Developer crafting scalable web solutions
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="#contact"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                Get in touch
              </a>
            </motion.div>
          </div>
        </motion.section>

        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />

        {/* Navigation Dots */}
        <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 hidden md:block z-50">
          {['home', 'about', 'skills', 'projects', 'resume', 'contact'].map((section) => (
            <button
              key={section}
              className="w-3 h-3 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors"
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
            />
          ))}
        </nav>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </main>
    </div>
  )
}

export default App
