export type Project = {
  title: string
  description: string
  checklist: string[]
  period: string
  repo?: string
  live?: string
  image?: string
}

export type ExperienceCard = {
  title: string
  org: string
  period: string
  description: string
  checklist?: string[]
  link?: string
}

export type Certificate = {
  title: string
  issuer: string
  link: string
  image?: string
}

export const profile = {
  name: 'Stefan Zagarov',
  firstName: 'Stefan',
  lastName: 'Zagarov',
  shortName: 'Stefan Z.',
  role: 'Front-End Developer',
  location: 'Sofia, Bulgaria',
  email: 'stefan.zagarov@gmail.com',
  phone: '+359 87 793 5040',
  github: 'https://github.com/StefanZagarov',
  photo: '/photo.jpg',
  cv: '/Stefan_Zagarov_CV.pdf',
}

export const about = {
  text: [
    "I'm a front-end developer building AI-powered web applications with React and TypeScript. At work I develop front-ends for AI products — chat assistants, voice tutoring, document analysis — and take them from design to production.",
    'I started out building tools for a 3D architectural modeling app in C# and Unity, then retrained as a front-end developer at SoftUni. I care about clean architecture, tested code and interfaces that feel good to use.',
  ],
}

// Logos live in /public/icons as static SVGs (multi-colour brand marks).
// `darkInvert` flips black logos to white on the dark theme so they stay visible.
export type Skill = { name: string; icon: string; darkInvert?: boolean }

export const skills: Skill[] = [
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'shadcn/ui', icon: 'shadcnui', darkInvert: true },
  { name: 'Zod', icon: 'zod' },
  { name: 'Angular', icon: 'angular' },
  { name: 'Vitest', icon: 'vitest' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Express', icon: 'express', darkInvert: true },
  { name: 'Python', icon: 'python' },
  { name: 'Django', icon: 'django' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github', darkInvert: true },
  { name: 'GitLab', icon: 'gitlab' },
  { name: 'Vite', icon: 'vitejs' },
  { name: 'Linux', icon: 'linux' },
  { name: 'Unity', icon: 'unity', darkInvert: true },
  { name: 'ElevenLabs', icon: 'elevenlabs', darkInvert: true },
]

export const workProjects: Project[] = [
  {
    title: 'AI Learning Platform',
    description: 'Learning platform for schools with voice tutoring and AI-generated exams that teachers can assign and review.',
    checklist: ['React / TypeScript', 'Speech-to-text & text-to-speech', 'KaTeX math rendering', 'PDF export', 'Vitest'],
    period: '12/2025 – now',
  },
  {
    title: 'Modular SaaS Platform',
    description: 'Platform where features and external APIs plug in as plugins, with switchable themes and layouts.',
    checklist: ['React / TypeScript', 'Plugin architecture', 'Theme & layout systems', 'Zod validation', 'Unit tests'],
    period: '04/2025 – 02/2026',
  },
  {
    title: 'AI Legal Assistant',
    description: 'Legal research chat that streams answers and shows the cited legal provisions beside the conversation.',
    checklist: ['React / TypeScript', 'WebSockets streaming', 'Design system', 'Tailwind CSS'],
    period: '07/2026 – 08/2026',
  },
  {
    title: 'AI Document Assistant',
    description: 'AI chat over uploaded PDF, Word and Excel files, with the documents viewable in the browser.',
    checklist: ['React / TypeScript', 'PDF, Word & Excel viewers', 'Session reconnection', 'Markdown responses'],
    period: '12/2025',
  },
  {
    title: 'Insect Trap Analysis',
    description: 'Image recognition app for monitoring pest traps: upload, analysis results, reports and PDF export.',
    checklist: ['React / TypeScript', 'shadcn/ui', 'Token-refresh auth', 'Reports dashboard', 'PDF export'],
    period: '06/2026 – 07/2026',
  },
]

export const personalProjects: Project[] = [
  {
    title: 'Questline',
    description: 'Gamified goal tracker: build quest maps, track objectives and discover public questlines.',
    checklist: ['Python / Django', 'JavaScript', 'Draggable quest maps', 'Progression engine'],
    period: '2026',
    repo: 'https://github.com/StefanZagarov/questline',
  },
  {
    title: 'Natal Chart',
    description: 'Interactive astrology chart: drag the sky and wind the clock to cast a chart for any time and place.',
    checklist: ['React 19 / TypeScript', 'WebAssembly', 'Swiss Ephemeris', 'Tailwind CSS'],
    period: '2026',
    repo: 'https://github.com/StefanZagarov/chart-generator',
  },
  {
    title: 'DevDesk',
    description: 'Knowledge storage app that keeps every tool and piece of information in one place.',
    checklist: ['TypeScript monorepo', 'Express', 'PostgreSQL', 'Docker', 'JWT auth'],
    period: '2026',
    repo: 'https://github.com/StefanZagarov/DevDesk',
  },
  {
    title: 'Hyprtimer',
    description: 'Desktop timer app with clock modes, persistent storage and extensive customization.',
    checklist: ['Electron Forge', 'JavaScript', 'Persistent storage'],
    period: '2025',
    repo: 'https://github.com/StefanZagarov/hyprtimer',
  },
  {
    title: 'The Drunken Dragon',
    description: 'Fantasy storytelling platform for posting, reading and managing RPG stories.',
    checklist: ['React', 'JWT authentication', 'Role-based users'],
    period: '2025',
    repo: 'https://github.com/StefanZagarov/the-drunken-dragon',
  },
]

export const certificates: Certificate[] = [
  {
    title: 'Front-End Developer With JavaScript',
    issuer: 'Software University',
    link: 'https://softuni.bg/certificates/details/246809/30023660',
  },
]

export const workExperience: ExperienceCard[] = [
  {
    title: 'IT Application Developer',
    org: 'Semantif.AI',
    period: '04/2025 – Present',
    description: 'Developing front-ends for AI-powered web products, from an internal SaaS platform to client applications.',
    checklist: ['AI chat assistants', 'Voice tutoring', 'Plugin architecture', 'Design to production', 'Unit testing'],
    link: 'https://semantif.ai/',
  },
  {
    title: 'Software Developer — Unity',
    org: 'BIMExperts',
    period: '06/2022 – 11/2022',
    description: 'Developed user-facing features for a 3D architectural modeling application using C# and Unity.',
    checklist: ['Object placement system', 'Blueprint snapshots', 'Messaging & logging UI'],
    link: 'https://bimexperts.com/en',
  },
  {
    title: 'Warehouse Operations',
    org: 'Denicom',
    period: '10/2023 – 04/2025',
    description: 'Order fulfillment for chain stores and individual clients, and inventory management.',
    checklist: ['Order fulfillment', 'Inventory management'],
  },
]

export const educationExperience: ExperienceCard[] = [
  {
    title: 'Front-End Developer',
    org: 'Software University',
    period: '09/2023 – 07/2025',
    description: 'Front-End Developer With JavaScript program, completed with a certificate.',
    checklist: ['JavaScript', 'React', 'Angular', 'Node.js / Express', 'MongoDB'],
    link: 'https://softuni.bg/certificates/details/246809/30023660',
  },
  {
    title: 'Multimedia and Computer Graphics',
    org: 'New Bulgarian University',
    period: '09/2019 – 2023 · Discontinued',
    description: 'Studied multimedia design and computer graphics.',
  },
  {
    title: 'Electric Power Engineering',
    org: 'Technical University',
    period: '08/2016 – 08/2018',
    description: 'Studied electric power engineering.',
  },
]
