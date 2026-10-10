import { ArrowUp, Mail, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolioData'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#05070d] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              {personalInfo.title} • AI & Data Science Undergraduate
            </p>
            <p className="text-xs text-slate-400">
              {personalInfo.location}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-white/[0.08] hover:border-cyan-400/40 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-white/[0.08] hover:border-cyan-400/40 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Send direct email"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-white/[0.08] hover:border-cyan-400/40 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] hover:border-cyan-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Bottom Closing Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 text-center sm:text-left">
          <div>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </div>
          <div className="text-cyan-400/90 tracking-wide">
            "Built with curiosity. Crafted with code."
          </div>
        </div>
      </div>
    </footer>
  )
}
