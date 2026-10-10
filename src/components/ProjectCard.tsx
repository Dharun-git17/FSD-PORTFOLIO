import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Code2, ShieldAlert, Cpu, Eye, CheckCircle, Sparkles } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'overview' | 'interactive'>('overview')

  // Interactive demo states per project
  const [stegoMode, setStegoMode] = useState<'encode' | 'decode'>('encode')
  const [bugDefectIndex, setBugDefectIndex] = useState(0)
  const [cartCount, setCartCount] = useState(1)

  // 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max tilt: 7 degrees
    const rX = ((y - centerY) / centerY) * -5
    const rY = ((x - centerX) / centerX) * 5

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  // Precomputed sample defects for BugSense AI interactive visualizer
  const sampleDefects = [
    {
      query: 'App terminates abruptly upon clicking checkout button',
      matched: 'Crash occurs when user initiates order payment checkout flow',
      similarity: 0.94,
      status: 'Potential Duplicate Flagged'
    },
    {
      query: 'Navigation dropdown does not expand on mobile viewport',
      matched: 'Mobile hamburger drawer fails to toggle navigation links',
      similarity: 0.89,
      status: 'High Semantic Correspondence'
    }
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-16 lg:mb-24 last:mb-0"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        }}
        className="group relative rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-400/40 p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300 overflow-hidden"
      >
        {/* Subtle glow border effect */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Artwork & Interactive Tab (6 cols) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            {/* Visual Header Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                  PROJECT {project.number}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">{project.category}</span>
              </div>

              {/* Toggle: Preview Artwork vs Interactive Deep-Dive */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveInteractiveTab('overview')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeInteractiveTab === 'overview'
                      ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Artwork
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInteractiveTab('interactive')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeInteractiveTab === 'interactive'
                      ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Interactive Logic
                </button>
              </div>
            </div>

            {/* Main Visual Box */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#05070d] border border-white/[0.08] group-hover:border-white/[0.15] transition-all">
              {activeInteractiveTab === 'overview' ? (
                /* Custom Project Artwork */
                <div className="relative w-full h-full">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} Preview Showcase`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-950">
                      <Code2 className="w-12 h-12 text-cyan-400" />
                    </div>
                  )}

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />

                  {/* Badges on image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-200">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/[0.1]">
                      {project.subtitle}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-300 backdrop-blur-md border border-cyan-500/30">
                      Verified Technical Spec
                    </span>
                  </div>
                </div>
              ) : (
                /* Interactive Deep-Dive View by Project Type */
                <div className="p-4 sm:p-5 h-full flex flex-col justify-between text-xs font-mono bg-[#05070c] text-slate-300 overflow-y-auto">
                  {project.previewType === 'steganography' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                        <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          LSB Bit Manipulation Simulator
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => setStegoMode('encode')}
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              stegoMode === 'encode'
                                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Encode
                          </button>
                          <button
                            type="button"
                            onClick={() => setStegoMode('decode')}
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              stegoMode === 'decode'
                                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Decode
                          </button>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/60 border border-white/[0.05] space-y-1.5">
                        <div className="text-[10px] text-slate-400 uppercase">
                          Pixel RGB Channel Binary Bytes:
                        </div>
                        <div className="text-slate-300 text-[11px] leading-relaxed">
                          Pixel [0,0]: R: <span className="text-cyan-300 font-bold">1101010{stegoMode === 'encode' ? '1' : '0'}</span>{' '}
                          G: <span className="text-cyan-300 font-bold">1011001{stegoMode === 'encode' ? '0' : '0'}</span>{' '}
                          B: <span className="text-cyan-300 font-bold">0110111{stegoMode === 'encode' ? '1' : '0'}</span>
                        </div>
                        <div className="text-[10px] text-cyan-400/90 pt-1">
                          {stegoMode === 'encode'
                            ? '>> Injected payload bit into LSB: 1 -> 0 -> 1'
                            : '>> Extracted LSB bits reconstruct message char: "SECRET"'}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-200">
                        {stegoMode === 'encode'
                          ? 'Status: Payload hidden in imperceptible lowest bits. Image visually unmodified.'
                          : 'Status: Payload extracted successfully via bitmask extraction algorithm.'}
                      </div>
                    </div>
                  )}

                  {project.previewType === 'ecommerce' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                        <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          Storefront Live Interaction Test
                        </span>
                        <span className="text-[10px] text-slate-400">REST API • MongoDB</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-white/[0.08] flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-white">Quantum Tech Headset</div>
                          <div className="text-[11px] text-cyan-400 font-bold">$299.00 USD</div>
                          <div className="text-[10px] text-slate-400">Stock: In Database Catalog</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setCartCount(Math.max(1, cartCount - 1))}
                            className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold px-1">{cartCount}</span>
                          <button
                            type="button"
                            onClick={() => setCartCount(cartCount + 1)}
                            className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/60 border border-white/[0.05] flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Cart Total ({cartCount} items):</span>
                        <span className="text-cyan-400 font-bold">${cartCount * 299}.00</span>
                      </div>
                    </div>
                  )}

                  {project.previewType === 'bugsense' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                        <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          Sentence Transformers & FAISS Engine
                        </span>
                        <button
                          type="button"
                          onClick={() => setBugDefectIndex((bugDefectIndex + 1) % sampleDefects.length)}
                          className="px-2 py-0.5 text-[10px] bg-cyan-500/20 text-cyan-300 rounded hover:bg-cyan-500/30"
                        >
                          Next Defect Pair
                        </button>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/60 border border-white/[0.05] space-y-1.5">
                        <div className="text-[10px] text-slate-400">Incoming Defect Submission:</div>
                        <div className="text-slate-200 text-[11px]">"{sampleDefects[bugDefectIndex].query}"</div>
                        <div className="text-[10px] text-slate-400 pt-1">Nearest FAISS Vector Match:</div>
                        <div className="text-cyan-300 text-[11px]">"{sampleDefects[bugDefectIndex].matched}"</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-[11px]">
                        <span className="text-slate-300">{sampleDefects[bugDefectIndex].status}</span>
                        <span className="text-cyan-300 font-bold font-mono">
                          Cosine Sim: {(sampleDefects[bugDefectIndex].similarity * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Description, Features & Actions (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category / Subtitle */}
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
                {project.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-4">
                {project.title}
              </h3>

              {/* Concise Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Core Features */}
              <div className="space-y-2.5 mb-6">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Implementation Highlights:
                </div>
                <ul className="space-y-2">
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 group-hover:border-cyan-400/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: GitHub & Live Demo (only if verified) */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
              {project.hasVerifiedCode && project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-white/[0.1] hover:border-cyan-400/40 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>View Repository</span>
                </a>
              )}

              {/* Demo button shown ONLY if an actual verified deployed demo exists */}
              {project.hasVerifiedDemo && project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <span className="text-[11px] font-mono text-slate-400">
                Verified developer source
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
