// ─── Portfolio Data — Vinay Jangam ───────────────────────────────────────────

export const personalInfo = {
  name: 'Vinay',
  fullName: 'Vinay Jangam',
  title: 'Software Engineer & Product Builder',
  tagline: 'Builder of Intelligent Systems & Digital Experiences',
  description:
    'I engineer full-stack applications, SaaS platforms, and intelligent systems that bridge the gap between great technology and real-world business value.',
  location: 'Pune, Maharashtra, India',
  email: 'vinayjangam18@gmail.com',
  github: 'https://github.com/Vinay1806',
  linkedin: 'https://www.linkedin.com/in/vinay-jangam-919704363',
  status: 'Open to opportunities',
  availableFor: ['Internships', 'Collaborations', 'Freelance', 'Full-time Roles'],
};

export const roles = [
  'Full-Stack Developer',
  'Product Builder',
  'Software Engineer',
  'ERP & SaaS Developer',
  'Technology Enthusiast',
];

export const aboutStats = [
  { label: 'Projects Built', value: '10+', suffix: '' },
  { label: 'Technologies', value: '25+', suffix: '' },
  { label: 'Research Paper', value: '1', suffix: '' },
  { label: 'Domains Covered', value: '6+', suffix: '' },
];

export const superpowers = [
  {
    icon: '⚡',
    title: 'Rapid Learner',
    description:
      'I pick up new technologies fast and turn unfamiliar tools into working solutions — often within days.',
  },
  {
    icon: '🧩',
    title: 'End-to-End Thinking',
    description:
      'I see the full product — from user need to system architecture to final experience. Not just the code layer.',
  },
  {
    icon: '🔨',
    title: 'Persistent Builder',
    description:
      'I commit to what I start. Complex problems are just puzzles — I iterate until the solution is solid.',
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    icon: '💻',
    skills: [
      { name: 'Java', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'TypeScript', level: 72 },
      { name: 'Python', level: 68 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 78 },
      { name: 'C++', name2: 'C++', level: 65 },
      { name: 'SQL', level: 72 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 82 },
      { name: 'Framer Motion', level: 60 },
      { name: 'Vite', level: 70 },
      { name: 'Responsive Design', level: 85 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 72 },
      { name: 'Express.js', level: 70 },
      { name: 'Flask', level: 65 },
      { name: 'REST APIs', level: 78 },
      { name: 'Firebase', level: 70 },
      { name: 'Authentication', level: 75 },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: '🗄️',
    skills: [
      { name: 'MySQL', level: 78 },
      { name: 'PostgreSQL', level: 72 },
      { name: 'Firestore', level: 68 },
      { name: 'Firebase RTDB', level: 65 },
      { name: 'DB Design', level: 75 },
      { name: 'JDBC', level: 70 },
    ],
  },
  {
    id: 'iot',
    label: 'IoT & Hardware',
    icon: '🔌',
    skills: [
      { name: 'ESP32', level: 80 },
      { name: 'Arduino', level: 78 },
      { name: 'ESP32-CAM', level: 72 },
      { name: 'OpenCV', level: 65 },
      { name: 'YOLO', level: 62 },
      { name: 'Embedded C/C++', level: 70 },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Data',
    icon: '🤖',
    skills: [
      { name: 'Python', level: 68 },
      { name: 'Pandas', level: 65 },
      { name: 'NumPy', level: 63 },
      { name: 'ML Fundamentals', level: 60 },
      { name: 'Computer Vision', level: 65 },
      { name: 'OpenAI APIs', level: 55 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    icon: '🔧',
    skills: [
      { name: 'Git', level: 82 },
      { name: 'GitHub', level: 82 },
      { name: 'VS Code', level: 90 },
      { name: 'Vercel', level: 72 },
      { name: 'Firebase Console', level: 70 },
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const featuredProjects = [
  {
    id: 'paseo',
    name: 'Mini PASEO',
    tagline: 'Autonomous AI Target Tracking System',
    description:
      'An AI-powered autonomous vehicle that uses YOLO object detection and computer vision to identify, track, and follow targets in real time — combining robotics, embedded systems, and machine learning in a single integrated system.',
    problem:
      'Surveillance and tracking systems required constant human monitoring. The challenge: build an autonomous system that detects and follows targets with zero manual intervention.',
    solution:
      'Built a YOLO-powered vision pipeline on a laptop that transmits real-time target coordinates via serial to an ESP32, which autonomously controls the vehicle and pan-tilt camera.',
    features: [
      'Real-time YOLO object detection',
      'Autonomous target following',
      'Pan-tilt camera mechanism',
      'ESP32-based motor control',
      'Serial communication pipeline',
      'Live video feed monitoring',
      'Multi-target tracking capability',
      'Published research paper',
    ],
    tech: ['Python', 'YOLO', 'OpenCV', 'ESP32', 'Arduino IDE', 'C/C++', 'Serial Communication', 'Computer Vision'],
    role: 'Co-developer (Team Project)',
    status: 'Completed',
    category: 'AI / Robotics / IoT',
    highlight: 'featured',
    color: '#8b5cf6',
    gradient: 'from-purple-600/20 to-pink-600/20',
    borderColor: 'rgba(139,92,246,0.3)',
    images: ['/1.jpeg', '/6.jpeg'],
    github: 'https://github.com/Vinay1806',
    demo: null,
    researchPaper: {
      title: 'Mini PASEO: Automatic Target Tracking Firing System',
      journal: 'IJSREM — International Journal of Scientific Research in Engineering and Management',
      issn: '2582-3930',
      sjif: '8.659',
      year: '2025',
      url: 'https://ijsrem.com/download/mini-paseo-automatic-target-tracking-firing-system/',
      authors: 'U. S. Shirshetti, S. Jagtap, A. Puranik, A. Pabalkar, Vinay J. Jangam',
    },
    metrics: [
      { label: 'Detection', value: 'Real-time' },
      { label: 'Published', value: 'IJSREM' },
      { label: 'SJIF', value: '8.659' },
    ],
  },
  {
    id: 'paintos',
    name: 'PaintOS',
    tagline: 'Enterprise ERP for Paint Manufacturing',
    description:
      'A cloud-based, subscription-driven ERP platform built specifically for paint manufacturers — centralizing inventory, formulations, sales, customer data, and business analytics into one intelligent system.',
    problem:
      'Paint manufacturers were drowning in spreadsheets, disconnected systems, and manual workflows — losing visibility and efficiency across critical operations.',
    solution:
      'PaintOS centralizes every core business process into a single cloud platform, giving manufacturers real-time control over inventory, formulas, production, and sales.',
    features: [
      'Multi-user authentication & RBAC',
      'Subscription-based SaaS access',
      'Inventory & product management',
      'Formulation management',
      'Customer relationship management',
      'Business analytics dashboard',
      'Cloud-native data storage',
      'Responsive across all devices',
    ],
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Firebase', 'PostgreSQL', 'Vercel', 'Git'],
    role: 'Full-Stack Developer Intern',
    status: 'In Development',
    category: 'ERP / SaaS',
    highlight: 'featured',
    color: '#3b82f6',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    borderColor: 'rgba(59,130,246,0.3)',
    image: '/Screenshot 2026-06-14 172458.png',
    github: null,
    demo: null,
    metrics: [
      { label: 'Modules Built', value: '8+' },
      { label: 'Tech Stack', value: '10+' },
      { label: 'Status', value: 'Live Dev' },
    ],
  },
];

export const otherProjects = [
  {
    id: 'supply-chain',
    name: 'Supply Chain ERP',
    tagline: 'End-to-end supply chain & procurement management platform',
    description:
      'A database-driven ERP system for managing suppliers, inventory, products, and procurement workflows with full CRUD operations and reporting.',
    tech: ['Python', 'Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    role: 'Solo Developer',
    status: 'Completed',
    category: 'ERP / Web App',
    github: 'https://github.com/Vinay1806',
    highlight: 'showcase',
    color: '#06b6d4',
  },
  {
    id: 'smart-door',
    name: 'Face Recognition Door Lock',
    tagline: 'IoT smart lock with AI-powered face recognition access control',
    description:
      'An ESP32-CAM powered smart door lock that automatically grants access to authorized users and triggers buzzer/LED alerts for unauthorized attempts.',
    tech: ['ESP32-CAM', 'ESP32', 'Arduino', 'C++', 'Servo Motor'],
    role: 'Solo Developer',
    status: 'Completed Prototype',
    category: 'IoT / Embedded',
    github: 'https://github.com/Vinay1806',
    highlight: 'showcase',
    color: '#10b981',
  },
  {
    id: 'grocery',
    name: 'Grocery Store Manager',
    tagline: 'Desktop application for billing, inventory & customer management',
    description:
      'A Java Swing desktop application with MySQL backend for managing grocery purchases, billing, customer records, and stock validation.',
    tech: ['Java', 'Java Swing', 'JDBC', 'MySQL'],
    role: 'Solo Developer',
    status: 'Completed',
    category: 'Desktop App',
    github: 'https://github.com/Vinay1806',
    highlight: 'showcase',
    color: '#f59e0b',
  },
  {
    id: 'habit-tracker',
    name: 'Multi-User Habit Tracker',
    tagline: 'Cloud-based habit tracking with auth and real-time sync',
    description:
      'A React + Firebase SaaS application for tracking daily habits, monitoring progress, and syncing data across sessions with multi-user support.',
    tech: ['React', 'TypeScript', 'Firebase'],
    role: 'Solo Developer',
    status: 'In Development',
    category: 'SaaS / Web App',
    github: 'https://github.com/Vinay1806',
    highlight: 'showcase',
    color: '#ec4899',
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experience = [
  {
    id: 'morex',
    role: 'Full-Stack Developer Intern',
    company: 'Morex Technologies / Dmor Paints',
    duration: 'June 2026 – Present',
    location: 'Pune, India',
    type: 'Internship',
    description:
      'Contributing to PaintOS — an enterprise-grade cloud ERP platform designed for paint manufacturers — across both frontend and backend layers.',
    responsibilities: [
      'Developing and maintaining features for PaintOS, a cloud ERP for paint manufacturing.',
      'Building responsive UIs using React, TypeScript, Next.js, and Tailwind CSS.',
      'Working on authentication systems, backend integrations, and database-driven workflows.',
      'Collaborating with the team on feature planning, implementation, and debugging.',
      'Contributing to product architecture and scalable SaaS development practices.',
    ],
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Firebase', 'PostgreSQL', 'Git', 'Coolify'],
    current: true,
  },
];

export const researchPaper = {
  title: 'Mini PASEO: Automatic Target Tracking Firing System',
  journal: 'International Journal of Scientific Research in Engineering and Management (IJSREM)',
  issn: '2582-3930',
  sjif: '8.659',
  year: '2025',
  url: 'https://ijsrem.com/download/mini-paseo-automatic-target-tracking-firing-system/',
  authors: ['U. S. Shirshetti', 'Sapna S. Jagtap', 'Avdhut P. Puranik', 'Aditya D. Pabalkar', 'Vinay J. Jangam'],
  abstract:
    'An AI-powered autonomous target tracking system integrating YOLO-based computer vision, robotics, and embedded systems for real-time detection and tracking.',
};

// ─── Education ────────────────────────────────────────────────────────────────

export const education = [
  {
    id: 'btech',
    degree: 'B.Tech in Engineering',
    institution: 'To Be Confirmed',
    duration: '2026 – 2029',
    status: 'Pursuing (DSY)',
    description: 'Direct Second Year admission following Diploma in Information Technology.',
    highlights: [
      'Advanced full-stack development',
      'SaaS & ERP system design',
      'Data science & AI',
      'Cloud-native development',
      'System design & scalable architectures',
    ],
    current: true,
  },
  {
    id: 'diploma',
    degree: 'Diploma in Information Technology',
    institution: 'Sou. Venutai Chavan Polytechnic, Pune',
    duration: '2023 – 2026',
    status: 'Completed',
    description:
      'Built a strong foundation in software development, databases, networking, and embedded systems — culminating in the Mini PASEO research project.',
    highlights: [
      'Mini PASEO Final Year Mega Project',
      'Research paper published in IJSREM',
      'Multiple software & IoT projects',
      'Foundations in databases, networking, embedded systems',
    ],
    current: false,
  },
];

// ─── Currently Building ───────────────────────────────────────────────────────

export const currentFocus = [
  {
    id: 'paintos',
    title: 'PaintOS ERP',
    description: 'Building enterprise-grade ERP modules for paint manufacturing businesses.',
    status: 'Active',
    color: '#3b82f6',
    icon: '🏭',
  },
  {
    id: 'saas-learning',
    title: 'SaaS Architecture',
    description: 'Deep-diving into scalable SaaS architecture patterns and cloud-native workflows.',
    status: 'Learning',
    color: '#8b5cf6',
    icon: '☁️',
  },
  {
    id: 'ai-exploration',
    title: 'AI Integration',
    description: 'Exploring AI-powered features and integrating LLM capabilities into applications.',
    status: 'Exploring',
    color: '#06b6d4',
    icon: '🤖',
  },
  {
    id: 'portfolio',
    title: 'Modern Web Experiences',
    description: 'Learning advanced animation, Three.js, and interactive design systems.',
    status: 'Learning',
    color: '#10b981',
    icon: '✨',
  },
];
