export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  githubUrl?: string
  liveDemoUrl?: string
  hasVerifiedCode: boolean
  hasVerifiedDemo: boolean
  category: 'Full Stack' | 'Python & Security' | 'AI & Algorithms'
  features: string[]
  previewType: 'steganography' | 'ecommerce' | 'bugsense'
  imageUrl?: string
}

export interface SkillItem {
  name: string
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools & Workflow'
  levelDescription: string
  highlight?: boolean
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  field: string
  location: string
  description: string
}

export interface CertificationItem {
  title: string
  issuer: string
  duration: string
  type: 'Internship' | 'Course' | 'Certification'
  skillsLearned: string[]
}

export interface PersonalInfo {
  name: string
  title: string
  location: string
  email: string
  github: string
  linkedin: string
  headline: string
  subheadline: string
  aboutPillars: {
    title: string
    shortDesc: string
    detailedDesc: string
    icon: string
  }[]
  web3formsKey?: string
}
