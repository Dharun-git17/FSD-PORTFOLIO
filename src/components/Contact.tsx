import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MapPin,
  Send,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  Globe,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
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
  const [copiedDraft, setCopiedDraft] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success_api' | 'opened_gmail' | 'opened_mailto'
  >('idle')

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
      errors.email = 'Please enter a valid email format (e.g. name@domain.com).'
    }
    if (!formValues.subject.trim()) errors.subject = 'Please provide a subject.'
    if (!formValues.message.trim()) {
      errors.message = 'Please enter your message.'
    } else if (formValues.message.trim().length < 8) {
      errors.message = 'Message must be at least 8 characters.'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const getFormattedMessage = () => {
    return `Hi Dharun,\n\n${formValues.message}\n\n---\nBest regards,\n${formValues.name}\nEmail: ${formValues.email}`
  }

  const handleCopyDraft = () => {
    if (!validateForm()) return
    const textToCopy = `To: ${personalInfo.email}\nSubject: ${formValues.subject}\nFrom: ${formValues.name} <${formValues.email}>\n\n${getFormattedMessage()}`
    navigator.clipboard.writeText(textToCopy)
    setCopiedDraft(true)
    setTimeout(() => setCopiedDraft(false), 3000)
  }

  // 1. Direct Web Gmail Compose (Guaranteed browser-based delivery)
  const handleSendViaGmail = () => {
    if (!validateForm()) return

    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formValues.subject}`)
    const bodyEncoded = encodeURIComponent(getFormattedMessage())
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subjectEncoded}&body=${bodyEncoded}`

    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    setSubmissionStatus('opened_gmail')
  }

  // 2. Default System Mail Client (mailto:)
  const handleSendViaMailto = () => {
    if (!validateForm()) return

    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formValues.subject}`)
    const bodyEncoded = encodeURIComponent(getFormattedMessage())
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subjectEncoded}&body=${bodyEncoded}`

    window.location.href = mailtoUrl
    setSubmissionStatus('opened_mailto')
  }

  // 3. API Dispatch (if access key is provided, or default handler)
  const handleApiSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    // If Web3Forms access key is configured in portfolioData.ts
    if (personalInfo.web3formsKey && personalInfo.web3formsKey.trim() !== '') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: personalInfo.web3formsKey,
            name: formValues.name,
            email: formValues.email,
            subject: `[Portfolio Inquiry] ${formValues.subject}`,
            message: formValues.message,
            from_name: 'Portfolio Contact Box'
          })
        })
        const data = await response.json()
        if (data.success) {
          setIsSubmitting(false)
          setSubmissionStatus('success_api')
          return
        }
      } catch {
        // Fallback to Gmail compose below
      }
    }

    // Default guaranteed fallback: open Gmail web compose
    setIsSubmitting(false)
    handleSendViaGmail()
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
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-display font-bold text-white">
                  Send a Direct Message
                </h3>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                  Reliable Web Dispatch
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the details below. Messages are directed to{' '}
                <span className="text-cyan-400 font-mono">{personalInfo.email}</span>.
              </p>

              {/* Status Banner when an action was triggered */}
              <AnimatePresence>
                {submissionStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-400/40 text-xs text-slate-200 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {submissionStatus === 'opened_gmail' && 'Gmail Web Compose Opened'}
                          {submissionStatus === 'opened_mailto' && 'Default Mail App Opened'}
                          {submissionStatus === 'success_api' && 'Message Delivered Directly'}
                        </div>
                        <p className="text-slate-300 mt-0.5">
                          {submissionStatus === 'opened_gmail' &&
                            `A new browser tab opened with your message pre-filled to ${personalInfo.email}. Simply hit "Send" in Gmail.`}
                          {submissionStatus === 'opened_mailto' &&
                            `Your desktop mail client was triggered. If no mail program opened, use the "Send via Web (Gmail)" button below.`}
                          {submissionStatus === 'success_api' &&
                            `Your message was received and forwarded directly to ${personalInfo.email}.`}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-cyan-500/20">
                      <button
                        type="button"
                        onClick={handleSendViaGmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-[11px] transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Reopen in Gmail Web
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyDraft}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 font-mono text-[11px] transition-colors"
                      >
                        {copiedDraft ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Message Text</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmissionStatus('idle')
                          setFormValues({ name: '', email: '', subject: '', message: '' })
                        }}
                        className="ml-auto text-[11px] font-mono text-slate-400 hover:text-white"
                      >
                        Clear Form
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleApiSubmit} noValidate className="space-y-4">
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
                      <p className="text-[11px] text-red-400 mt-1 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.name}
                      </p>
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
                      <p className="text-[11px] text-red-400 mt-1 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.email}
                      </p>
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
                    <p className="text-[11px] text-red-400 mt-1 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.subject}
                    </p>
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
                    <p className="text-[11px] text-red-400 mt-1 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Multi-Dispatch Action Buttons */}
                <div className="pt-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Primary Button: Send via Web (Gmail) */}
                    <button
                      type="button"
                      onClick={handleSendViaGmail}
                      disabled={isSubmitting}
                      className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-50"
                    >
                      <Globe className="w-4 h-4 text-slate-950" />
                      <span>Send via Web (Gmail)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-950/70 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Secondary Button: Default Desktop Mail App */}
                    <button
                      type="button"
                      onClick={handleSendViaMailto}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-white/[0.1] hover:border-cyan-400/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <Send className="w-4 h-4 text-cyan-400" />
                      <span>Mail App (mailto)</span>
                    </button>

                    {/* Tertiary Button: Copy Message */}
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      title="Copy complete prepared message text"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-4 h-4 text-cyan-400" />
                          <span className="text-cyan-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5 text-cyan-400/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Direct web delivery guaranteed across all browsers
                    </span>
                    <span>To: {personalInfo.email}</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
