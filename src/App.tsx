import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ResumeModal } from './components/ResumeModal'

export function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 selection:bg-cyan-500/25 selection:text-cyan-300 relative overflow-x-hidden font-sans">
      {/* Cinematic Ambient Background Lighting Orbs */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] bg-cyan-500/[0.035] rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-10 w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[200px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-cyan-600/[0.025] rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Sticky Navigation */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Sections */}
      <main>
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Recruiter Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  )
}

export default App
