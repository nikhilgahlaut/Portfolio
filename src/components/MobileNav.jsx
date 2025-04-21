import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiMenu, FiX, FiFileText } from 'react-icons/fi'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const menuItems = [
    { id: 'home', label: 'Home', icon: <FiHome /> },
    { id: 'about', label: 'About', icon: <FiUser /> },
    { id: 'skills', label: 'Skills', icon: <FiCode /> },
    { id: 'projects', label: 'Projects', icon: <FiBriefcase /> },
    { id: 'resume', label: 'Resume', icon: <FiFileText /> },
    { id: 'contact', label: 'Contact', icon: <FiMail /> }
  ]
  
  const toggleMenu = () => setIsOpen(!isOpen)
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }
  
  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button 
        onClick={toggleMenu}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-blue-500 text-white shadow-lg"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      
      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>
      
      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-20 right-5 bg-white dark:bg-[#1a1f35] rounded-2xl shadow-xl z-50 p-4 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <motion.li 
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center w-full px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
                  >
                    <span className="text-blue-500 mr-3">
                      {item.icon}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {item.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNav 