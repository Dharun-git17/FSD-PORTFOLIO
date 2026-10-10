import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Check, Copy, ExternalLink, MessageSquare } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolioData'

export function Contact() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    if (!formValues.name.trim()) errors.name = 'Please provide your name.'
    if (!formValues.email.trim()) {
      errors.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Please provide a valid email format.'
    }
    if (!formValues.subject.trim()) errors.subject = 'Please provide a subject.'
    if (!formValues.message.trim()) {
      errors.message = 'Please enter your message.'
    } else if (formValues.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    // Formatted mailto link for direct static client transmission
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${formValues.subject}`)
    const mailtoBody = encodeURIComponent(
      `Name: ${formValues.name}\nEmail: ${formValues.email}\n\nMessage:\n${formValues.message}`
    )
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`

    // Trigger user mail client
    window.location.href = mailtoUrl

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmissionComplete(true)
    }, 500)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Let's Build Something Meaningful.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Have a project idea, a collaboration in mind, or a development opportunity? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Communication Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-slate-900/60 border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-display font-bold text-white">
                Contact Channels
              </h3>

              {/* Email Card with 1-click copy */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Verified Email
                    </div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-mono text-cyan-300 hover:text-white truncate block transition-colors"
                      title={personalInfo.email}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Location & Timezone
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white">
                    {personalInfo.location}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    India Standard Time (IST • UTC+05:30)
                  </div>
                </div>
              </div>

              {/* Verified Profiles */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Verified Social & Code Profiles
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-white/[0.08] hover:border-cyan-400/40 text-slate-200 hover:text-cyan-300 transition-all text-xs font-mono group"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-cyan-400" />
                      GitHub
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-white/[0.08] hover:border-cyan-400/40 text-slate-200 hover:text-cyan-300 transition-all text-xs font-mono group"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                      LinkedIn
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/60 border border-white/[0.08] p-6 sm:p-8 lg:p-10 shadow-xl">
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the details below. This generates an authenticated email dispatch directly to{' '}
                <span className="text-cyan-400 font-mono">{personalInfo.email}</span>.
              </p>

              {submissionComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-400/30 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-400/40">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-white">
                    Mail Client Triggered
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Your message draft has been formatted and opened in your email client. You can also directly reach out to{' '}
                    <span className="text-cyan-300 font-mono">{personalInfo.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionComplete(false)
                      setFormValues({ name: '', email: '', subject: '', message: '' })
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-900 border border-white/[0.1] text-slate-300 hover:text-white"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formValues.name}
                        onChange={(e) => {
                          setFormValues({ ...formValues, name: e.target.value })
                          if (formErrors.name) setFormErrors({ ...formErrors, name: '' })
                        }}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                          formErrors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/[0.08] focus:border-cyan-400 focus:ring-cyan-400'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-400 mt-1 font-mono">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formValues.email}
                        onChange={(e) => {
                          setFormValues({ ...formValues, email: e.target.value })
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' })
                        }}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                          formErrors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/[0.08] focus:border-cyan-400 focus:ring-cyan-400'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-400 mt-1 font-mono">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Subject <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formValues.subject}
                      onChange={(e) => {
                        setFormValues({ ...formValues, subject: e.target.value })
                        if (formErrors.subject) setFormErrors({ ...formErrors, subject: '' })
                      }}
                      placeholder="Project Opportunity / Full-Stack Inquiry"
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                        formErrors.subject
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-white/[0.08] focus:border-cyan-400 focus:ring-cyan-400'
                      }`}
                    />
                    {formErrors.subject && (
                      <p className="text-[11px] text-red-400 mt-1 font-mono">{formErrors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formValues.message}
                      onChange={(e) => {
                        setFormValues({ ...formValues, message: e.target.value })
                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' })
                      }}
                      placeholder="Share project scope, questions, or opportunities..."
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all resize-y ${
                        formErrors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-white/[0.08] focus:border-cyan-400 focus:ring-cyan-400'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-red-400 mt-1 font-mono">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Formatting Dispatch...' : 'Dispatch Message'}</span>
                    </button>
                    <span className="block sm:inline-block sm:ml-4 mt-2 sm:mt-0 text-[11px] font-mono text-slate-400">
                      Static verified dispatch via client mailto
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
