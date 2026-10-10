import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Globe,
  Database,
  Cpu,
  GitBranch,
  Terminal,
  FileCode,
  Layers,
  Wrench,
  Check
} from 'lucide-react'
import { skillsData } from '../data/portfolioData'
import type { SkillItem } from '../types'

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools & Workflow']

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory)

  // Map skill names to icons
  const getSkillIcon = (name: string) => {
    switch (name) {
      case 'React.js':
        return Globe
      case 'JavaScript':
        return Code
      case 'HTML5':
        return FileCode
      case 'CSS3':
        return Layers
      case 'Node.js':
        return Terminal
      case 'Python':
        return Cpu
      case 'MongoDB':
        return Database
      case 'Supabase':
        return Database
      case 'Git':
      case 'GitHub':
        return GitBranch
      case 'VS Code':
      case 'Jenkins':
        return Wrench
      default:
        return Code
    }
  }

  return (
    <section id="skills" className="py-24 sm:py-32 relative bg-[#070a12]/50">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Engineering Toolbox.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Technologies and workflows utilized across full-stack applications.
            Every item represents verified, hands-on project implementation without artificial percentages.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {categories.map((category) => {
            const isSelected = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? 'text-slate-950 font-semibold bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                    : 'text-slate-300 bg-slate-900/60 hover:text-white hover:bg-slate-800/80 border border-white/[0.06]'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: SkillItem) => {
              const IconComp = getSkillIcon(skill.name)
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={skill.name}
                  className="group relative rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/[0.07] hover:border-cyan-400/40 p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,240,255,0.15)] flex flex-col justify-between"
                >
                  <div>
                    {/* Top row with icon & category badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.04]">
                        {skill.category}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {skill.name}
                    </h3>

                    {/* Factual Description / Scope */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {skill.levelDescription}
                    </p>
                  </div>

                  {/* Verification indicator */}
                  <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-cyan-400/90">
                      <Check className="w-3.5 h-3.5" />
                      <span>Verified Coursework & Projects</span>
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
