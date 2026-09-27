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
  kind: 'Diploma' | 'Certificate'
  issued: string
  link: string
  image: string
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

// Logos live in /public/icons as static files (multi-colour brand marks; Linux is a PNG
// because its full-colour Tux SVG is ~190 KB).
// `darkInvert` flips black logos to white on the dark theme so they stay visible.
export type Skill = { name: string; icon: string; darkInvert?: boolean }

export const skills: Skill[] = [
  { name: 'React', icon: 'react.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'JavaScript', icon: 'javascript.svg' },
  { name: 'HTML', icon: 'html5.svg' },
  { name: 'CSS', icon: 'css3.svg' },
  { name: 'Tailwind CSS', icon: 'tailwindcss.svg' },
  { name: 'shadcn/ui', icon: 'shadcnui.svg', darkInvert: true },
  { name: 'Zod', icon: 'zod.svg' },
  { name: 'Angular', icon: 'angular.svg' },
  { name: 'Vitest', icon: 'vitest.svg' },
  { name: 'Node.js', icon: 'nodejs.svg' },
  { name: 'Express', icon: 'express.svg', darkInvert: true },
  { name: 'Python', icon: 'python.svg' },
  { name: 'Django', icon: 'django.svg' },
  { name: 'PostgreSQL', icon: 'postgresql.svg' },
  { name: 'MongoDB', icon: 'mongodb.svg' },
  { name: 'Docker', icon: 'docker.svg' },
  { name: 'Git', icon: 'git.svg' },
  { name: 'GitHub', icon: 'github.svg', darkInvert: true },
  { name: 'GitLab', icon: 'gitlab.svg' },
  { name: 'Vite', icon: 'vitejs.svg' },
  { name: 'Linux', icon: 'linux.png' },
  { name: 'Unity', icon: 'unity.svg', darkInvert: true },
  { name: 'ElevenLabs', icon: 'elevenlabs.svg', darkInvert: true },
]

export const workProjects: Project[] = [
  {
    title: 'AI Learning Platform',
    description: 'Learning platform for schools with voice tutoring and AI-generated exams that teachers can assign and review.',
    checklist: ['React / TypeScript', 'Speech-to-text & text-to-speech', 'KaTeX math rendering', 'PDF export', 'Vitest'],
    period: '12/2025 – now',
    image: '/projects/ai-learning-platform.webp',
    live: 'https://app.amacoach.ai',
  },
  {
    title: 'Modular SaaS Platform',
    description: 'Platform where features and external APIs plug in as plugins, with switchable themes and layouts.',
    checklist: ['React / TypeScript', 'Plugin architecture', 'Theme & layout systems', 'Zod validation', 'Unit tests'],
    period: '04/2025 – 02/2026',
    image: '/projects/modular-saas-platform.webp',
    live: 'https://app.craftgenie.ai',
  },
  {
    title: 'AI Legal Assistant',
    description: 'Legal research chat that streams answers and shows the cited legal provisions beside the conversation.',
    checklist: ['React / TypeScript', 'WebSockets streaming', 'Design system', 'Tailwind CSS'],
    period: '07/2026 – 08/2026',
    image: '/projects/ai-legal-assistant.webp',
    live: 'https://law.semantif.ai',
  },
  {
    title: 'AI Document Assistant',
    description: 'AI chat over uploaded PDF, Word and Excel files, with the documents viewable in the browser.',
    checklist: ['React / TypeScript', 'PDF, Word & Excel viewers', 'Session reconnection', 'Markdown responses'],
    period: '12/2025',
    image: '/projects/ai-document-assistant.webp',
  },
  {
    title: 'Insect Trap Analysis',
    description: 'Image recognition app for monitoring pest traps: upload, analysis results, reports and PDF export.',
    checklist: ['React / TypeScript', 'shadcn/ui', 'Token-refresh auth', 'Reports dashboard', 'PDF export'],
    period: '06/2026 – 07/2026',
    image: '/projects/insect-trap-analysis.webp',
    live: 'https://pestscan.ai',
  },
]

export const personalProjects: Project[] = [
  {
    title: 'Questline',
    description: 'Gamified goal tracker: build quest maps, track objectives and discover public questlines.',
    checklist: ['Python / Django', 'JavaScript', 'Draggable quest maps', 'Progression engine'],
    period: '2026',
    repo: 'https://github.com/StefanZagarov/questline',
    image: '/projects/questline.webp',
  },
  {
    title: 'Natal Chart',
    description: 'Interactive astrology chart: drag the sky and wind the clock to cast a chart for any time and place.',
    checklist: ['React 19 / TypeScript', 'WebAssembly', 'Swiss Ephemeris', 'Tailwind CSS'],
    period: '2026',
    repo: 'https://github.com/StefanZagarov/chart-generator',
    image: '/projects/natal-chart.webp',
  },
  {
    title: 'DevDesk',
    description: 'Knowledge storage app that keeps every tool and piece of information in one place.',
    checklist: ['TypeScript monorepo', 'Express', 'PostgreSQL', 'Docker', 'JWT auth'],
    period: '2026',
    repo: 'https://github.com/StefanZagarov/DevDesk',
    image: '/projects/devdesk.webp',
  },
  {
    title: 'Hyprtimer',
    description: 'Desktop timer app with clock modes, persistent storage and extensive customization.',
    checklist: ['Electron Forge', 'JavaScript', 'Persistent storage'],
    period: '2025',
    repo: 'https://github.com/StefanZagarov/hyprtimer',
    image: '/projects/hyprtimer.webp',
  },
  {
    title: 'The Drunken Dragon',
    description: 'Fantasy storytelling platform for posting, reading and managing RPG stories.',
    checklist: ['React', 'JWT authentication', 'Role-based users'],
    period: '2025',
    repo: 'https://github.com/StefanZagarov/the-drunken-dragon',
    image: '/projects/the-drunken-dragon.webp',
  },
  {
    title: 'Distortion Pit',
    description: 'Music community app to add bands and songs, like and comment on them, and see them ranked by likes.',
    checklist: ['Angular 18 (standalone)', 'Node.js / Express', 'MongoDB / Mongoose', 'JWT authentication'],
    period: '2024',
    repo: 'https://github.com/StefanZagarov/distortion-pit',
    image: '/projects/distortion-pit.webp',
  },
]

// All SoftUni certificates, newest first (diploma on top). Images are the first page of
// each certificate, exported from SoftUni's public certificate pages.
export const certificates: Certificate[] = [
  {
    title: 'Front-End Developer with JavaScript',
    kind: 'Diploma',
    issued: '07/2025',
    link: 'https://softuni.bg/certificates/details/246809/30023660',
    image: '/certificates/front-end-diploma.webp',
  },
  {
    title: 'Containers and Cloud',
    kind: 'Certificate',
    issued: '08/2025',
    link: 'https://softuni.bg/certificates/details/249593/57e62521',
    image: '/certificates/containers-cloud.webp',
  },
  {
    title: 'Software Engineering and DevOps',
    kind: 'Certificate',
    issued: '07/2025',
    link: 'https://softuni.bg/certificates/details/246090/f5ef142f',
    image: '/certificates/software-engineering-devops.webp',
  },
  {
    title: 'ReactJS',
    kind: 'Certificate',
    issued: '04/2025',
    link: 'https://softuni.bg/certificates/details/241609/52ffffd5',
    image: '/certificates/reactjs.webp',
  },
  {
    title: 'HTML & CSS',
    kind: 'Certificate',
    issued: '02/2025',
    link: 'https://softuni.bg/certificates/details/237877/ba426bd0',
    image: '/certificates/html-css.webp',
  },
  {
    title: 'Angular',
    kind: 'Certificate',
    issued: '12/2024',
    link: 'https://softuni.bg/certificates/details/232502/2f9a5e2d',
    image: '/certificates/angular.webp',
  },
  {
    title: 'JS Back-End',
    kind: 'Certificate',
    issued: '10/2024',
    link: 'https://softuni.bg/certificates/details/228419/fa7e910e',
    image: '/certificates/js-back-end.webp',
  },
  {
    title: 'JS Applications',
    kind: 'Certificate',
    issued: '08/2024',
    link: 'https://softuni.bg/certificates/details/223199/1c9ee287',
    image: '/certificates/js-applications.webp',
  },
  {
    title: 'JS Advanced',
    kind: 'Certificate',
    issued: '06/2024',
    link: 'https://softuni.bg/certificates/details/217716/b626bc68',
    image: '/certificates/js-advanced.webp',
  },
  {
    title: 'Programming Fundamentals with JavaScript',
    kind: 'Certificate',
    issued: '04/2024',
    link: 'https://softuni.bg/certificates/details/209645/38d5e5fe',
    image: '/certificates/programming-fundamentals.webp',
  },
  {
    title: 'Programming Basics',
    kind: 'Certificate',
    issued: '10/2023',
    link: 'https://softuni.bg/certificates/details/186898/7de3d3dc',
    image: '/certificates/programming-basics.webp',
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
    description: 'Front-End Developer with JavaScript program, completed with a diploma.',
    checklist: ['JavaScript fundamentals & advanced', 'JS Applications & Back-End', 'Angular', 'ReactJS', 'HTML & CSS'],
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
