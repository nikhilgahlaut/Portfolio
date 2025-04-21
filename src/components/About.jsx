import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center py-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <motion.h1
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white"
            >
              Nikhil Gahlaut
            </motion.h1>
            <motion.h2 
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500"
            >
              About Me
            </motion.h2>
          </div>
          
          <div className="space-y-6">
            <motion.div 
              className="p-4 sm:p-6 rounded-lg bg-white dark:bg-[#1a1f35]/90 backdrop-blur-sm shadow-sm hover:shadow-md group transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300">
                  Full Stack Developer with 3+ years of experience in designing, developing, and optimizing web applications using
                  MERN stack. Proficient in building scalable, high-performing applications with React.js, Node.js, Express.js, and MongoDB.
                  Strong foundation in JavaScript, Data Structures & Algorithms, and DevOps practices.
                </p>
              </div>
            </motion.div>
            
            {/* Resume Download Button */}
            <motion.div 
              className="my-4 flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="https://drive.google.com/file/d/1hwlRKD1BL-Iq6AFPUwVZ3LyFMIgKKXoR/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <FiDownload className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </motion.div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                'JavaScript',
                'React.js',
                'Node.js',
                'Express.js',
                'MongoDB',
                'AWS',
                'SQL',
                'REST API',
                'Git'
              ].map((skill) => (
                <motion.span 
                  key={skill}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-[#1a1f35] text-gray-600 dark:text-gray-300 rounded-full text-xs sm:text-sm hover:shadow group-hover:dark:bg-blue-900/30 hover:dark:text-blue-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg transform rotate-3"></div>
          <motion.div 
            className="relative p-4 sm:p-6 rounded-lg bg-white dark:bg-[#1a1f35]/90 backdrop-blur-sm shadow-sm hover:shadow-md group transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300">Software Engineer at Wipro</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300">B.Tech in Computer Science (CGPA: 9.2)</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300">AWS Certified Cloud Practitioner</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300">Full Stack Development Certified</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default About 