import { motion } from 'framer-motion'
import { useState } from 'react'

const SkillCard = ({ skill, icon, description, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  
  // Support for touch devices
  const handleTouch = () => {
    setIsTouched(!isTouched)
  }

  return (
    <motion.div
      className="relative w-full rounded-xl p-4 sm:p-6 cursor-pointer perspective-1000 bg-white dark:bg-[#1a1f35]/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={handleTouch}
      whileHover={{ scale: 1.02 }}
      style={{ height: '100%', minHeight: '200px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <motion.div
        className="w-full h-full"
        animate={{
          rotateX: isHovered || isTouched ? 180 : 0,
          transition: { duration: 0.6 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full flex flex-col items-center justify-center backface-hidden">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300 mb-2 text-center">{skill}</h3>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full flex items-center justify-center p-3 sm:p-4 text-center backface-hidden"
          style={{ transform: 'rotateX(180deg)' }}
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300">{description}</p>
        </div>
      </motion.div>
      
      {/* Small tooltip for touch devices */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-400 md:hidden">
        Tap to flip
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const skills = [
    {
      skill: "Frontend Development",
      icon: "🎨",
      description: "Expertise in ReactJS, HTML, CSS, jQuery, and Tailwind CSS. Experienced in building responsive and interactive user interfaces."
    },
    {
      skill: "Backend Development",
      icon: "⚙️",
      description: "Proficient in Node.js and Express.js for building scalable server-side applications and REST APIs."
    },
    {
      skill: "Database Management",
      icon: "🗄️",
      description: "Experience with SQL, MySQL, and MongoDB. Skilled in database optimization and query performance."
    },
    {
      skill: "DevOps & Cloud",
      icon: "☁️",
      description: "AWS certified with experience in S3, Lambda, EC2. Proficient in Docker, Git, and CI/CD practices."
    },
    {
      skill: "Software Architecture",
      icon: "🏗️",
      description: "Strong foundation in Data Structures and Algorithms, REST API Development, and system design."
    },
    {
      skill: "Professional Skills",
      icon: "👥",
      description: "Leadership, Communication, Problem-Solving, Teamwork, and Project Management in Agile environments."
    }
  ]

  return (
    <section id="skills" className="min-h-screen py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-blue-500 mb-3 sm:mb-4"
          >
            Skills & Expertise
          </motion.h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            Comprehensive technical and professional capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.skill} {...skill} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills 