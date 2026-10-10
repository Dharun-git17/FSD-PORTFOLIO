import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout, Server, Cpu, CheckCircle2, Terminal, Layers, Sparkles } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

export function About() {
  const [activeTab, setActiveTab] = useState(0)

  const pillarIcons = [Layout, Server, Cpu]

  const interactiveDetails = [
    {
      title: 'Frontend Architecture Blueprint',
      badge: 'React & Component Hierarchy',
      codeSnippet: `// Modular React Component Pattern
export function InteractiveStorefront() {
  const [cart, setCart] = useStore((s) => [s.cart, s.setCart]);
  return (
    <motion.section className="grid-responsive">
      <ProductCatalog filter={activeFilter} />
      <CartDrawer isOpen={isOpen} items={cart} />
    </motion.section>
  );
}`,
      highlights: [
        'Component modularity and clean separation of concerns',
        'Intuitive UI state management with reactive updates',
        'Fluid animations powered by Framer Motion & CSS'
      ]
    },
    {
      title: 'Backend & Data Flow Pipeline',
      badge: 'Node.js, Python & Database',
      codeSnippet: `// RESTful Endpoint & Data Serialization
app.post('/api/stego/encode', upload.single('image'), async (req, res) => {
  const { secretPayload } = req.body;
  const processedBuffer = await lsbStegoEngine.embed(
    req.file.buffer, 
    secretPayload
  );
  return res.json({ status: 'success', hash: generateHash(processedBuffer) });
});`,
      highlights: [
        'Secure API route definitions and request validation',
        'Efficient database models across MongoDB & Supabase',
        'Scalable data pipelines handling binary and text payloads'
      ]
    },
    {
      title: 'Algorithmic Problem Solving',
      badge: 'AI & Data Science Fundamentals',
      codeSnippet: `// Vector Similarity Calculation for Defect Reports
def compute_defect_similarity(query_vector, index_vectors):
    # Normalize embeddings for cosine distance
    faiss.normalize_L2(query_vector)
    distances, indices = faiss_index.search(query_vector, k=5)
    return [{"defect_id": idx, "similarity": float(dist)} 
            for dist, idx in zip(distances[0], indices[0])]`,
      highlights: [
        'Algorithmic rigor applied to real developer tooling',
        'Vector similarity search using Sentence Transformers & FAISS',
        'Data structure optimization and clean debugging mindset'
      ]
    }
  ]

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      {/* Background Subtle Accent Light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-start space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Philosophy & Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Curiosity into Creation.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            I am an undergraduate student in <span className="text-cyan-400 font-semibold">Artificial Intelligence & Data Science</span> at{' '}
            <span className="text-white">Karpaga Vinayaga College of Engineering and Technology</span>. 
            I bridge computational logic and intuitive web interfaces, building full-stack web applications 
            with focused engineering and thoughtful design.
          </p>
        </div>

        {/* The Three Visual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {personalInfo.aboutPillars.map((pillar, idx) => {
            const IconComponent = pillarIcons[idx]
            const isSelected = activeTab === idx

            return (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveTab(idx)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 transition-all ${
                  isSelected
                    ? 'bg-slate-900/90 border border-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.12)]'
                    : 'bg-slate-900/40 border border-white/[0.07] hover:border-white/[0.2] hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                        : 'bg-white/[0.04] border-white/[0.08] text-slate-300'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  {pillar.shortDesc}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.detailedDesc}
                </p>

                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{isSelected ? 'Active Console View' : 'Click to inspect blueprint'}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Small Interactive Engineering Blueprint Element */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-[#090d16] border border-white/[0.09] p-6 sm:p-8 overflow-hidden relative shadow-2xl"
        >
          {/* Top Console Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 pl-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>telemetry // {personalInfo.aboutPillars[activeTab].title}</span>
              </div>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
              {interactiveDetails[activeTab].badge}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {/* Left Code Inspection (7 cols) */}
            <div className="lg:col-span-7 bg-[#05070c] rounded-xl p-4 sm:p-5 border border-white/[0.05] overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 mb-3 border-b border-white/[0.05]">
                <span>Sample Implementation Workflow</span>
                <span className="text-cyan-400/80">UTF-8 • Synthesized</span>
              </div>
              <pre className="text-cyan-300/90 whitespace-pre">
                <code>{interactiveDetails[activeTab].codeSnippet}</code>
              </pre>
            </div>

            {/* Right Highlights & Principles (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Key Principles
                </div>
                <h4 className="text-lg font-display font-semibold text-white mb-4">
                  {interactiveDetails[activeTab].title}
                </h4>

                <ul className="space-y-3">
                  {interactiveDetails[activeTab].highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-400">
                <span className="text-cyan-400 font-medium">Fact-based context:</span> Coursework and project implementation developed during academic tenure at Karpaga Vinayaga College of Engineering and Technology.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
