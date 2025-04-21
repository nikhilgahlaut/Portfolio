import { motion } from 'framer-motion'
import { FiDownload, FiExternalLink, FiFileText, FiBriefcase, FiAward, FiBook } from 'react-icons/fi'

const ResumeSection = ({ title, icon: Icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center mb-4">
        <Icon className="text-blue-500 mr-3 w-5 h-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      </div>
      <div className="ml-8 space-y-4">
        {children}
      </div>
    </motion.div>
  )
}

const ResumeItem = ({ period, title, organization, description }) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="border-l-2 border-blue-500 pl-4 py-2"
    >
      <div className="text-sm text-gray-500 dark:text-gray-400">{period}</div>
      <div className="text-lg font-medium text-gray-800 dark:text-gray-300">{title}</div>
      <div className="text-blue-500 font-medium">{organization}</div>
      {description && (
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">{description}</p>
      )}
    </motion.div>
  )
}

const Resume = () => {
  // Resume URL from Google Drive
  const resumeUrl = "https://drive.google.com/file/d/1hwlRKD1BL-Iq6AFPUwVZ3LyFMIgKKXoR/view?usp=sharing";
  
  return (
    <section id="resume" className="min-h-screen py-16 sm:py-20">
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
            Resume
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6">
            My professional journey and accomplishments
          </p>
          
          {/* Resume Download Button */}
          <motion.div 
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href={resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FiDownload className="w-5 h-5" />
              <span className="font-medium">Download Full Resume</span>
              <FiExternalLink className="w-4 h-4 ml-1" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <ResumeSection title="Work Experience" icon={FiBriefcase}>
              <ResumeItem 
                period="2020 - Present"
                title="Software Engineer"
                organization="Wipro Technologies"
                description="Developing and maintaining full-stack web applications using MERN stack. Leading a team of 4 developers and implementing CI/CD practices."
              />
              <ResumeItem 
                period="2019 - 2020"
                title="Web Development Intern"
                organization="Tech Innovators"
                description="Assisted in building responsive web applications and implemented new features using React.js."
              />
            </ResumeSection>
            
            <ResumeSection title="Education" icon={FiBook}>
              <ResumeItem 
                period="2016 - 2020"
                title="B.Tech in Computer Science"
                organization="Institute of Engineering and Technology"
                description="CGPA: 9.2/10. Specialized in Web Technologies and Cloud Computing."
              />
            </ResumeSection>
          </div>
          
          <div>
            <ResumeSection title="Certifications" icon={FiAward}>
              <ResumeItem 
                period="2022"
                title="AWS Certified Cloud Practitioner"
                organization="Amazon Web Services"
              />
              <ResumeItem 
                period="2021"
                title="Full Stack Web Development"
                organization="Udemy"
              />
              <ResumeItem 
                period="2020"
                title="Advanced JavaScript"
                organization="freeCodeCamp"
              />
            </ResumeSection>
            
            <ResumeSection title="Skills & Technologies" icon={FiFileText}>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript (ES6+)", 
                  "React.js", 
                  "Node.js", 
                  "Express", 
                  "MongoDB", 
                  "RESTful APIs", 
                  "GraphQL", 
                  "AWS", 
                  "Docker", 
                  "Git", 
                  "CI/CD", 
                  "Agile/Scrum"
                ].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-[#1a1f35] text-gray-600 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ResumeSection>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Resume 