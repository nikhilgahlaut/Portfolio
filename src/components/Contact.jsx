import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiMapPin } from 'react-icons/fi'

const ContactItem = ({ icon: Icon, title, value, link }) => (
  <motion.a
    href={link} 
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-3 text-gray-600 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
    whileHover={{ x: 5, scale: 1.02 }}
  >
    <div className="p-2 sm:p-3 rounded-full bg-white dark:bg-[#1a1f35] shadow-sm group-hover:shadow-md transition-all duration-300">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
    </div>
    <div>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">{title}</p>
      <p className="text-sm sm:text-base font-medium dark:text-white group-hover:dark:text-blue-300 transition-colors duration-300">{value}</p>
    </div>
  </motion.a>
)

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen py-16 sm:py-20">
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
            Get in Touch
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              <ContactItem 
                icon={FiPhone}
                title="Phone" 
                value="+91 7255016829"
                link="tel:+917255016829"
              />
              <ContactItem 
                icon={FiMail}
                title="Email" 
                value="2015gahlaut.nikhil@gmail.com"
                link="mailto:2015gahlaut.nikhil@gmail.com"
              />
              <ContactItem 
                icon={FiLinkedin}
                title="LinkedIn" 
                value="Connect with me"
                link="https://www.linkedin.com/in/nikhil-gahlaut-61b1571aa/"
              />
              <ContactItem 
                icon={FiGithub}
                title="GitHub" 
                value="Check my repos"
                link="https://github.com/nikhilgahlaut" 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-[#1a1f35]/90 p-4 sm:p-6 rounded-lg backdrop-blur-sm shadow-sm hover:shadow-md group transition-all duration-300 mt-4 md:mt-0"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300 mb-4">
                  Location & Languages
                </h3>
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 sm:p-2 rounded-full bg-gray-100 dark:bg-[#1a1f35] group-hover:scale-110 transition-transform duration-300">
                    <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300">Noida, Uttar Pradesh, India</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium group-hover:dark:text-blue-300 transition-colors duration-300">Languages:</p>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Hindi'].map((lang) => (
                      <motion.span
                        key={lang}
                        className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-[#1a1f35] text-gray-600 dark:text-gray-300 rounded-full text-xs sm:text-sm group-hover:dark:bg-blue-900/30 group-hover:dark:text-blue-300 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {lang}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact 