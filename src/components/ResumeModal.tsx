import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Printer, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { personalInfo, educationData, certificationsData, projectsData } from '../data/portfolioData'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handlePrint = () => {
    window.print()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-[#0b0f19] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Top Modal Action Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#070a12]/90 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono tracking-wider uppercase text-slate-300">
                  Verified Resume Document • Dharun S
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                  title="Print Resume"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <a
                  href="./Dharun_S_Resume.pdf"
                  download="Dharun_S_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-300 font-sans">
              {/* Header */}
              <div className="border-b border-white/[0.08] pb-6 space-y-3">
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  {personalInfo.name}
                </h2>
                <div className="text-sm font-mono text-cyan-400 uppercase tracking-widest">
                  {personalInfo.title} • Artificial Intelligence & Data Science Undergraduate
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400 pt-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {personalInfo.location}
                  </span>
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    {personalInfo.email}
                  </a>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors">
                    <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                    github.com/Dharun-git17
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors">
                    <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                    linkedin.com/in/dharun-full-stack-developer
                  </a>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/[0.08] pb-1.5">
                  Education
                </h3>
                {educationData.map((edu) => (
                  <div key={edu.degree} className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between text-sm sm:text-base font-semibold text-white">
                      <span>{edu.degree}</span>
                      <span className="text-xs font-mono text-slate-400">{edu.period}</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-300">{edu.institution}</div>
                    <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technical Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/[0.08] pb-1.5">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono">Frontend: </span>
                    <span className="text-slate-200 font-medium">React.js, JavaScript (ES6+), HTML5, CSS3</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono">Backend: </span>
                    <span className="text-slate-200 font-medium">Node.js, Python</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono">Database: </span>
                    <span className="text-slate-200 font-medium">MongoDB, Supabase</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono">Tools & Workflow: </span>
                    <span className="text-slate-200 font-medium">Git, GitHub, VS Code, Jenkins</span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/[0.08] pb-1.5">
                  Technical Projects
                </h3>
                {projectsData.map((project) => (
                  <div key={project.id} className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        {project.title} — {project.subtitle}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{project.category}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Internship & Certifications */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/[0.08] pb-1.5">
                  Internship & Certifications
                </h3>
                <div className="space-y-2.5 text-xs">
                  {certificationsData.map((c) => (
                    <div key={c.title} className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-semibold text-white">{c.title}</span>
                        <span className="text-slate-400"> — {c.issuer}</span>
                      </div>
                      <span className="font-mono text-cyan-400 text-[11px]">{c.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
