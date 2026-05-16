export const personal = {
  name: 'John Allison',
  title: 'Full Stack Engineer',
  email: 'john@example.com',
  github: 'https://github.com/johnallison',
  linkedin: 'https://linkedin.com/in/johnallison',
  twitter: 'https://twitter.com/johnallison',
  location: 'Available Worldwide · Remote',
  bio: "I'm a Full Stack Engineer who thrives at the intersection of elegant design and solid engineering. I build fast, accessible web applications — from pixel-perfect frontends to robust backend APIs — with craft and intentionality at every layer.",
  shortBio: 'Building elegant, performant web applications from frontend to backend.',
  available: true,
  yearsExp: 3,
  projectsShipped: 20,
  resumeUrl: '/resume.pdf',
};

export const experience = [
  {
    year: '2025 — Present',
    role: 'Senior Full Stack Engineer',
    org: 'Freelance / Remote',
    desc: 'Building scalable web applications with SvelteKit, Laravel, and TypeScript.',
    current: true
  },
  {
    year: '2024',
    role: 'Frontend Developer',
    org: 'Creative Studio',
    desc: 'Developed performant frontend systems and responsive UI libraries.',
    current: false
  },
  {
    year: '2023',
    role: 'Junior Web Engineer',
    org: 'Startup Team',
    desc: 'Worked across frontend and backend systems delivering production-ready features.',
    current: false
  }
];

export const projects = [
  {
    id: 'random-project',
    title: 'Random Project',
    tagline: 'A full-stack showcase application',
    description:
      'A full-stack web application demonstrating modern development practices with clean architecture, real-time updates, and intuitive UX. Built from the ground up with performance and scalability in mind.',
    longDescription:
      'This project demonstrates my ability to architect and build a complete product — from database schema design and API development in Laravel to a reactive, component-driven frontend in React. Features include JWT authentication, real-time notifications, and a responsive design system.',
    tech: ['React', 'Laravel', 'Tailwind CSS', 'MySQL', 'REST API'],
    category: 'fullstack',
    demo: '#',
    github: '#',
    featured: true,
    color: '#2563eb',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    tagline: 'Scalable online store with real-time inventory',
    description:
      'End-to-end e-commerce solution with product management, cart system, Stripe payment integration, and an admin dashboard with analytics.',
    longDescription:
      'Architected a multi-tenant e-commerce platform handling hundreds of concurrent users. Features real-time inventory sync via WebSockets, a Vue.js storefront with SSR for SEO, a Laravel API backend, and Redis caching for performance.',
    tech: ['Vue.js', 'Laravel', 'TypeScript', 'Redis', 'Stripe'],
    category: 'fullstack',
    demo: '#',
    github: '#',
    featured: true,
    color: '#7c3aed',
    year: '2024',
    status: 'Live',
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    tagline: 'Interactive data visualisation for business metrics',
    description:
      'Real-time analytics dashboard with interactive charts, customisable widgets, date range filtering, CSV exports, and role-based access control.',
    longDescription:
      'A TypeScript React dashboard that connects to multiple data sources via a unified REST API. Leverages recharts for interactive visualisations and a custom hook system for fetching and caching time-series data efficiently.',
    tech: ['React', 'TypeScript', 'Recharts', 'REST API', 'Tailwind CSS'],
    category: 'frontend',
    demo: '#',
    github: '#',
    featured: false,
    color: '#059669',
    year: '2023',
    status: 'Live',
  },
  {
    id: 'api-microservices',
    title: 'API Microservices',
    tagline: 'Production-grade REST API architecture',
    description:
      'RESTful microservices architecture with JWT authentication, rate limiting, API versioning, comprehensive documentation, and Docker deployment.',
    longDescription:
      'Designed and built a suite of Laravel microservices with a gateway pattern, enabling independent deployability and horizontal scaling. Includes a full OpenAPI spec, automated testing suite achieving 90%+ coverage, and Dockerised deployment pipeline.',
    tech: ['Laravel', 'PHP', 'PostgreSQL', 'Docker', 'Redis'],
    category: 'backend',
    demo: '#',
    github: '#',
    featured: false,
    color: '#dc2626',
    year: '2023',
    status: 'Live',
  },
  {
    id: 'design-system',
    title: 'Component Design System',
    tagline: 'Reusable UI library with full documentation',
    description:
      'A production-ready Vue.js component library with 40+ components, Storybook documentation, dark mode, accessibility baked in, and npm publishing.',
    longDescription:
      'Built from scratch to unify the UI across multiple internal products. Components are fully accessible (WCAG 2.1 AA), themeable via CSS variables, and tree-shakeable. Includes a Storybook instance as a living style guide.',
    tech: ['Vue.js', 'TypeScript', 'Storybook', 'SCSS', 'Vite'],
    category: 'frontend',
    demo: '#',
    github: '#',
    featured: false,
    color: '#f59e0b',
    year: '2023',
    status: 'Open Source',
  },
];

export type Skill = {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Tools';
  icon: string;
};

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 90, category: 'Frontend', icon: '⚛️' },
  { name: 'Vue.js', level: 85, category: 'Frontend', icon: '💚' },
  { name: 'TypeScript', level: 82, category: 'Frontend', icon: '🔷' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend', icon: '🎨' },
  { name: 'SvelteKit', level: 78, category: 'Frontend', icon: '🧡' },
  // Backend
  { name: 'Laravel', level: 88, category: 'Backend', icon: '🔴' },
  { name: 'PHP', level: 85, category: 'Backend', icon: '🐘' },
  { name: 'MySQL / PostgreSQL', level: 80, category: 'Backend', icon: '🗄️' },
  { name: 'REST API Design', level: 90, category: 'Backend', icon: '🔌' },
  { name: 'Redis', level: 72, category: 'Backend', icon: '🚀' },
  // Tools
  { name: 'Git / GitHub', level: 90, category: 'Tools', icon: '🐙' },
  { name: 'Docker', level: 70, category: 'Tools', icon: '🐳' },
  { name: 'Figma', level: 75, category: 'Tools', icon: '✏️' },
  { name: 'Vite / Webpack', level: 78, category: 'Tools', icon: '⚡' },
];

export const categories = ['all', 'fullstack', 'frontend', 'backend'] as const;
export type Category = (typeof categories)[number];

export const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
];