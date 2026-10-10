import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { ArrowDown, FileText, MapPin, Code2 } from 'lucide-react'
import { Hero3D } from './Hero3D'

interface HeroProps {
  onOpenResume?: () => void
}

export function Hero({ onOpenResume }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' }
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/[0.08] rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Matrix Grid Texture */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* Status & Location Pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.08] backdrop-blur-md text-xs font-mono text-slate-300 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-cyan-300 font-medium">Available for Opportunities</span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-cyan-400/80" />
                Chengalpattu, Tamil Nadu, India
              </span>
            </motion.div>

            {/* Name & Title Identification */}
            <motion.div variants={itemVariants} className="space-y-1">
              <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Full Stack Developer & AI/DS Student</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white">
                DHARUN S
              </h1>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient leading-tight">
                "Engineering Ideas Into Digital Experiences."
              </h2>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed"
            >
              I build responsive web applications and interactive digital experiences through
              thoughtful design, clean code, and practical problem-solving.
            </motion.p>

            {/* Tech Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              {['React.js', 'Node.js', 'Python', 'MongoDB', 'Supabase', 'AI & Data Science'].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-mono px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-3 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 w-full sm:w-auto"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>

              {onOpenResume ? (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/[0.1] hover:border-cyan-400/50 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 w-full sm:w-auto"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Download Resume</span>
                </button>
              ) : (
                <a
                  href="./Dharun_S_Resume.pdf"
                  download="Dharun_S_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/[0.1] hover:border-cyan-400/50 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 w-full sm:w-auto"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Download Resume</span>
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Visual Centerpiece (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="w-full relative">
              <Hero3D />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors pointer-events-auto"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md p-1"
          aria-label="Scroll to About section"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-cyan-400"
            />
          </div>
        </a>
      </motion.div>
    </section>
  )
}
