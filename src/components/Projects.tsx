import { FolderGit2, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { projectsData, personalInfo } from '../data/portfolioData'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="flex flex-col items-start space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Featured Technical Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Selected Works.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore concrete applications demonstrating full-stack engineering, security concepts, and AI/DS algorithmic solutions.
            </p>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] hover:border-cyan-400/40 transition-all self-start md:self-end"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400" />
            <span>All Repositories @ GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Project Cards List */}
        <div className="space-y-12">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
