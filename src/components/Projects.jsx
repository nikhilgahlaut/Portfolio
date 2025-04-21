import { motion } from 'framer-motion'

const ProjectCard = ({ title, description, tags, link, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-4 sm:p-6 rounded-lg bg-white dark:bg-[#1a1f35]/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="relative">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-300 group-hover:dark:text-blue-300 transition-colors duration-300">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 dark:bg-[#1a1f35] text-gray-600 dark:text-gray-300 rounded-full group-hover:dark:bg-blue-900/30 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm sm:text-base inline-flex items-center"
        >
          View Project <span className="ml-1">→</span>
        </a>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const projects = [
    {
      title: "Project Management System",
      description: "Designed a MERN-based web platform for task tracking, team collaboration, and progress monitoring, increasing team efficiency by 25%.",
      tags: ["React", "Node.js", "MongoDB", "Express.js"],
      link: "#"
    },
    {
      title: "Video Captioning App",
      description: "Developed a web application allowing users to add captions to videos by entering a hosted video URL. Implemented timestamped captions with pause/play functionality and seamless video playback.",
      tags: ["React.js", "Node.js", "Video API", "Real-time Processing"],
      link: "#"
    },
    {
      title: "Image Gallery App",
      description: "Built a React.js-powered gallery with API integration, improving image loading time by 30% and enhancing user engagement.",
      tags: ["React.js", "REST API", "Image Optimization"],
      link: "#"
    },
    {
      title: "Workout Tracker App",
      description: "Developed a fitness tracking application for logging workouts, analyzing progress, and setting goals.",
      tags: ["MERN Stack", "Data Visualization", "User Authentication"],
      link: "#"
    }
  ]

  return (
    <section id="projects" className="min-h-screen py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 sm:space-y-12"
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-3 sm:mb-4">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Showcasing my recent development work
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects 