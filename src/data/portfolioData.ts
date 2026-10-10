import type { PersonalInfo, Project, SkillItem, EducationItem, CertificationItem } from '../types'

export const personalInfo: PersonalInfo = {
  name: 'Dharun S',
  title: 'Full Stack Developer',
  location: 'Chengalpattu, Tamil Nadu, India',
  email: 'dhaurnsenchit17@gmail.com',
  github: 'https://github.com/Dharun-git17',
  linkedin: 'https://linkedin.com/in/dharun-full-stack-developer',
  headline: 'Engineering Ideas Into Digital Experiences.',
  subheadline:
    'I build responsive web applications and interactive digital experiences through thoughtful design, clean code, and practical problem-solving.',
  aboutPillars: [
    {
      title: 'Frontend Engineering',
      shortDesc: 'Component-driven, responsive user interfaces built with React.js, modern JavaScript, and clean CSS architectures.',
      detailedDesc: 'Focusing on intuitive user experiences, accessibility standards, fluid motion design, and performant state handling across devices.',
      icon: 'Layout'
    },
    {
      title: 'Backend & API Development',
      shortDesc: 'Scalable server-side logic and RESTful endpoints created using Node.js and Python.',
      detailedDesc: 'Architecting robust data flows, database schemas with MongoDB and Supabase, and integrating external microservices efficiently.',
      icon: 'Server'
    },
    {
      title: 'Problem Solving',
      shortDesc: 'Analytical thinking honed through Artificial Intelligence & Data Science coursework and real-world projects.',
      detailedDesc: 'Applying algorithmic logic, structured debugging, data structures, and continuous optimization to solve engineering challenges.',
      icon: 'Cpu'
    }
  ],
  // Optional: Enter your free Web3Forms access key from https://web3forms.com
  // to receive direct form submissions into dhaurnsenchit17@gmail.com without opening a mail client.
  web3formsKey: ''
}

export const skillsData: SkillItem[] = [
  // Frontend
  {
    name: 'React.js',
    category: 'Frontend',
    levelDescription: 'Component architecture, Hooks, dynamic state management & SPA routing',
    highlight: true
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    levelDescription: 'ES6+ syntax, asynchronous programming, DOM manipulation & Promises',
    highlight: true
  },
  {
    name: 'HTML5',
    category: 'Frontend',
    levelDescription: 'Semantic structure, accessible markup & SEO standards'
  },
  {
    name: 'CSS3',
    category: 'Frontend',
    levelDescription: 'Responsive layouts, Flexbox/Grid, CSS variables & animations'
  },

  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    levelDescription: 'RESTful API construction, asynchronous I/O, npm ecosystem & middleware',
    highlight: true
  },
  {
    name: 'Python',
    category: 'Backend',
    levelDescription: 'Data processing, scripting, backend logic & algorithmic implementations',
    highlight: true
  },

  // Database
  {
    name: 'MongoDB',
    category: 'Database',
    levelDescription: 'NoSQL document modeling, aggregation pipelines & database indexing',
    highlight: true
  },
  {
    name: 'Supabase',
    category: 'Database',
    levelDescription: 'PostgreSQL-backed queries, authentication workflows & cloud storage'
  },

  // Tools & Workflow
  {
    name: 'Git',
    category: 'Tools & Workflow',
    levelDescription: 'Version control, branch management, merge conflict resolution'
  },
  {
    name: 'GitHub',
    category: 'Tools & Workflow',
    levelDescription: 'Remote repository collaboration, CI/CD actions & open-source workflow',
    highlight: true
  },
  {
    name: 'VS Code',
    category: 'Tools & Workflow',
    levelDescription: 'Primary development IDE, debugging tooling & productivity extensions'
  },
  {
    name: 'Jenkins',
    category: 'Tools & Workflow',
    levelDescription: 'CI/CD pipeline automation concepts & deployment builds'
  }
]

export const projectsData: Project[] = [
  {
    id: 'steganography-tool',
    number: '01',
    title: 'IMAGE STEGANOGRAPHY',
    subtitle: 'SECRET MESSAGE ENCODER',
    description:
      'A Python application that hides secret messages inside images using Least Significant Bit steganography and supports message extraction.',
    tags: ['Python', 'LSB Steganography', 'Image Processing', 'Security'],
    githubUrl: 'https://github.com/Dharun-git17',
    hasVerifiedCode: true,
    hasVerifiedDemo: false, // Hidden per instructions until an actual public live demo URL is supplied
    category: 'Python & Security',
    features: [
      'Encodes arbitrary textual payloads into image pixel matrices using Least Significant Bit (LSB) manipulation',
      'Preserves original visual fidelity so embedded payload remains imperceptible to human observers',
      'Provides accurate extraction and decoding mechanism to retrieve embedded secret data',
      'Implemented clean binary bit-shifting routines to handle data stream headers and boundaries'
    ],
    previewType: 'steganography',
    imageUrl: 'projects/steganography.jpg'
  },
  {
    id: 'ecommerce-platform',
    number: '02',
    title: 'E-COMMERCE WEBSITE',
    subtitle: 'FULL-STACK STOREFRONT',
    description:
      'A responsive full-stack e-commerce website featuring product listings, search, backend functionality, and database integration.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'REST API', 'JavaScript'],
    githubUrl: 'https://github.com/Dharun-git17',
    hasVerifiedCode: true,
    hasVerifiedDemo: false, // Hidden per instructions until verified live demo URL exists
    category: 'Full Stack',
    features: [
      'Interactive product catalogue with real-time text search and category filtering',
      'Responsive shopping cart management with instant quantity calculation',
      'Structured backend endpoints for product retrieval and order processing',
      'Persistent database integration for storing inventory catalog data'
    ],
    previewType: 'ecommerce',
    imageUrl: 'projects/ecommerce.jpg'
  },
  {
    id: 'bugsense-ai',
    number: '03',
    title: 'BUGSENSE AI',
    subtitle: 'DUPLICATE DEFECT FINDER',
    description:
      'An intelligent defect analysis tool that helps development teams identify duplicate bug reports and improve bug report quality.',
    tags: ['React', 'Vite', 'FastAPI', 'Sentence Transformers', 'FAISS'],
    githubUrl: 'https://github.com/Dharun-git17',
    hasVerifiedCode: true,
    hasVerifiedDemo: false,
    category: 'AI & Algorithms',
    features: [
      'Responsive frontend interface built with React and Vite for bug submission and analysis',
      'High-performance backend services powered by FastAPI',
      'Semantic text embeddings generated using Sentence Transformers to capture defect intent beyond keyword matches',
      'Vector similarity search powered by FAISS to index and rank potential duplicate reports in real-time'
    ],
    previewType: 'bugsense',
    imageUrl: 'projects/bugsense.jpg'
  }
]

export const educationData: EducationItem[] = [
  {
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    institution: 'Karpaga Vinayaga College of Engineering and Technology',
    period: 'Undergraduate Program',
    field: 'Artificial Intelligence & Data Science',
    location: 'Tamil Nadu, India',
    description:
      'Core coursework covering data structures, algorithms, machine learning fundamentals, database management systems, and modern software engineering paradigms.'
  }
]

export const certificationsData: CertificationItem[] = [
  {
    title: 'Full Stack Developer Intern',
    issuer: 'Codec Technologies',
    duration: '1 Month Internship',
    type: 'Internship',
    skillsLearned: ['Full Stack Web Development', 'Frontend Integration', 'Backend Workflow', 'Practical Collaboration']
  },
  {
    title: 'Cyber Security',
    issuer: 'Skill India',
    duration: '180 Hours Course',
    type: 'Certification',
    skillsLearned: ['Security Fundamentals', 'Network Defense', 'Information Assurance', 'Vulnerability Concepts']
  },
  {
    title: 'Basics of Computer Networking',
    issuer: 'Great Learning',
    duration: '6 Hours Course',
    type: 'Course',
    skillsLearned: ['OSI Model', 'TCP/IP Architecture', 'Network Protocols', 'IP Addressing']
  },
  {
    title: 'MySQL',
    issuer: 'Udemy',
    duration: '5 Hours Course',
    type: 'Course',
    skillsLearned: ['Relational Database Queries', 'SQL Syntax', 'JOIN Operations', 'Table Schema Design']
  }
]
