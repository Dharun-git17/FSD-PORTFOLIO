import { GraduationCap, Award, Briefcase, Clock, Calendar, CheckCircle } from 'lucide-react'
import { educationData, certificationsData } from '../data/portfolioData'

export function Education() {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Internship':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30'
      case 'Certification':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-400/30'
      case 'Course':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30'
      default:
        return 'bg-white/[0.05] text-slate-300 border-white/[0.08]'
    }
  }

  return (
    <section id="education" className="py-24 sm:py-32 relative bg-[#070a12]/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-600/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Education & Training.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Formal engineering degree foundation paired with hands-on internship experience and verified industry training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Academic Degree (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Formal Degree</span>
            </div>

            {educationData.map((edu) => (
              <div
                key={edu.degree}
                className="rounded-3xl bg-slate-900/70 border border-white/[0.08] p-6 sm:p-8 hover:border-cyan-400/30 transition-all shadow-xl relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                  {edu.degree}
                </h3>

                <div className="text-sm font-medium text-slate-300 mb-4">
                  {edu.institution}
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {edu.description}
                </p>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Location:</span>
                  <span className="text-slate-300">{edu.location}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Certifications & Internship Training (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Internship & Skill Certifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-2xl bg-slate-900/50 border border-white/[0.07] hover:border-cyan-400/30 p-5 sm:p-6 transition-all flex flex-col justify-between hover:bg-slate-900/75"
                >
                  <div>
                    {/* Badge and Duration */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${getBadgeColor(
                          cert.type
                        )}`}
                      >
                        {cert.type}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <Clock className="w-3 h-3 text-cyan-400/80" />
                        {cert.duration}
                      </span>
                    </div>

                    <h4 className="text-base font-display font-bold text-white mb-1">
                      {cert.title}
                    </h4>
                    <div className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-slate-400" />
                      <span>{cert.issuer}</span>
                    </div>

                    {/* Learned competencies */}
                    <div className="space-y-1.5 mb-4">
                      {cert.skillsLearned.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.05] text-[10px] font-mono text-slate-400">
                    Verified Credential from Resume
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
