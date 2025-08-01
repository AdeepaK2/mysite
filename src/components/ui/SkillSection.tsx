'use client'

import { motion } from 'framer-motion'
import { 
  SiJavascript,
  SiCplusplus,
  SiTypescript,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiJest,
  SiFigma,
  SiFirebase,
  SiSocketdotio,
  SiGit,
  SiClickup
} from 'react-icons/si'
import { FaJava, FaDatabase } from 'react-icons/fa'

const SkillSection = () => {
  const skills = [
    { name: 'Java', Icon: FaJava, category: 'language', color: 'text-orange-500' },
    { name: 'C', Icon: SiCplusplus, category: 'language', color: 'text-blue-500' },
    { name: 'TypeScript', Icon: SiTypescript, category: 'language', color: 'text-blue-400' },
    { name: 'PHP', Icon: SiPhp, category: 'language', color: 'text-purple-500' },
    { name: 'React', Icon: SiReact, category: 'frontend', color: 'text-cyan-400' },
    { name: 'Next.js', Icon: SiNextdotjs, category: 'frontend', color: 'text-gray-300' },
    { name: 'Tailwind', Icon: SiTailwindcss, category: 'frontend', color: 'text-teal-400' },
    { name: 'Express.js', Icon: SiExpress, category: 'backend', color: 'text-green-400' },
    { name: 'MongoDB', Icon: SiMongodb, category: 'database', color: 'text-green-600' },
    { name: 'MySQL', Icon: SiMysql, category: 'database', color: 'text-blue-600' },
    { name: 'PostgreSQL', Icon: SiPostgresql, category: 'database', color: 'text-blue-500' },
    { name: 'MSSQL', Icon: FaDatabase, category: 'database', color: 'text-red-500' },
    { name: 'Postman', Icon: SiPostman, category: 'testing', color: 'text-orange-500' },
    { name: 'Jest', Icon: SiJest, category: 'testing', color: 'text-red-400' },
    { name: 'Figma', Icon: SiFigma, category: 'design', color: 'text-purple-400' },
    { name: 'Firebase', Icon: SiFirebase, category: 'other', color: 'text-yellow-500' },
    { name: 'Socket.IO', Icon: SiSocketdotio, category: 'other', color: 'text-gray-400' },
    { name: 'Git', Icon: SiGit, category: 'version', color: 'text-orange-600' },
    { name: 'ClickUp', Icon: SiClickup, category: 'project', color: 'text-pink-500' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20
      }
    }
  }

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.15),transparent_70%)]"></div>
      
      {/* Comic dots pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="comic-dots w-full h-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-white">Tech </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Arsenal
              </span>
            </motion.h2>
            <motion.div 
              className="action-text text-cyan-400 text-base mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              POWER-UP COMPLETE!
            </motion.div>
            <motion.p 
              className="text-gray-300 text-sm max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Armed with cutting-edge technologies and battle-tested skills
            </motion.p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {skills.map((skill, index) => {
              const IconComponent = skill.Icon
              return (
                <motion.div
                  key={skill.name}
                  variants={skillVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Icon */}
                  <motion.div
                    className={`${skill.color} mb-2 group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent size={32} className="md:w-10 md:h-10" />
                  </motion.div>
                  
                  {/* Skill Name */}
                  <h3 className="text-white font-semibold text-xs md:text-sm text-center group-hover:text-cyan-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  
                  {/* Underline effect */}
                  <motion.div
                    className="h-0.5 bg-cyan-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              )
            })}
          </motion.div>

          {/* Floating action bubbles */}
          <motion.div
            className="absolute top-20 right-10 hidden lg:block"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="comic-bubble bg-purple-400 text-black px-2 py-1 rounded-full text-xs font-bold">
              CODE! 💻
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-20 left-10 hidden lg:block"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            <div className="comic-bubble bg-green-400 text-black px-2 py-1 rounded-full text-xs font-bold">
              BUILD! 🚀
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillSection
