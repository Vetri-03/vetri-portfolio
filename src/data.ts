// All text on the site lives here. Everything is taken from Vetri's résumé.

export const profile = {
  name: "Vetri Xavier S",
  first: "VETRI",
  last: "XAVIER",
  title: "Full-Stack Developer",
  headline: "Java · Spring Boot · React · TypeScript · DevOps & Cloud",
  location: "Madurai, Tamil Nadu, India",
  company: "Quantanics Techserv",
  email: "vetrixavier832@gmail.com",
  phone: "+91 98945 52303",
  phoneRaw: "919894552303",
  linkedin: "https://www.linkedin.com/in/vetri-xavier",
  linkedinLabel: "linkedin.com/in/vetri-xavier",
  github: "https://github.com/Vetri-03",
  githubLabel: "github.com/Vetri-03",
  resume: "assets/Vetri_Xavier_Resume.pdf",
  photo: "assets/vetri-cutout.webp",
  photoFallback: "assets/vetri-cutout.png",
  summary:
    "Full-Stack Developer with over a year of professional experience building and deploying production web applications and REST APIs. Strong in Java and Spring Boot, Python (Django, Flask) and Node.js (Express.js) on the backend, and React with TypeScript and JavaScript on the frontend.",
  summary2:
    "I design relational databases in MySQL, build role-based authentication, and take apps all the way to production on Linux servers with DigitalOcean, Nginx, Gunicorn, Systemd and SSL. I also build cross-platform mobile apps with React Native and Kotlin, and bring machine-learning models into real products.",
};

export const roles = [
  "Spring Boot REST APIs",
  "React + TypeScript frontends",
  "Django & Flask backends",
  "React Native mobile apps",
  "production Linux deployments",
];

export const stats = [
  { value: 1, suffix: "+", label: "year building production apps" },
  { value: 8, suffix: "", label: "projects built, web to mobile" },
  { value: 5, suffix: "", label: "backend frameworks" },
  { value: 10, suffix: "", label: "languages, from Java to Kotlin" },
];

export const marquee = [
  "Java",
  "Spring Boot",
  "React",
  "TypeScript",
  "Django",
  "Flask",
  "Express.js",
  "React Native",
  "Kotlin",
  "MySQL",
  "DigitalOcean",
  "Nginx",
  "Linux",
  "OpenCV",
];

/* ---------- Request pipeline (the "how I build" section) ---------- */

export type Layer = {
  id: string;
  name: string;
  short: string;
  tools: string[];
  what: string;
  log: string;
};

export const layers: Layer[] = [
  {
    id: "client",
    name: "Client",
    short: "UI",
    tools: ["React", "TypeScript", "React Native", "Kotlin", "Bootstrap"],
    what: "Responsive dashboards, user-management screens and cross-platform mobile apps that talk to REST APIs.",
    log: "[react] POST /api/sessions  → render <ScoreRing />",
  },
  {
    id: "edge",
    name: "Edge",
    short: "TLS",
    tools: ["Nginx", "SSL/TLS", "DigitalOcean"],
    what: "Nginx as the reverse proxy in front of every app, with SSL certificates configured on the server.",
    log: "[nginx] TLS handshake ok · proxy_pass → 127.0.0.1:8000",
  },
  {
    id: "process",
    name: "Process",
    short: "WSGI",
    tools: ["Gunicorn", "Systemd", "Linux"],
    what: "Gunicorn workers kept alive by Systemd units, so services restart on their own and survive reboots.",
    log: "[gunicorn] worker 2 accepted request (systemd: active)",
  },
  {
    id: "api",
    name: "API",
    short: "REST",
    tools: ["Spring Boot", "Django REST", "Flask", "Express.js", "CodeIgniter"],
    what: "RESTful APIs with authentication, authorization and role-based access control on five frameworks.",
    log: "[api] auth ok · role=ADMIN · RBAC check passed",
  },
  {
    id: "data",
    name: "Data",
    short: "SQL",
    tools: ["MySQL", "SQLite", "Schema design"],
    what: "Relational schemas designed from scratch for every project: users, roles, records, sessions and reports.",
    log: "[mysql] SELECT * FROM sessions WHERE user_id = ?",
  },
];

/* ---------- Experience ---------- */

export const experience = [
  {
    role: "Developer",
    company: "Quantanics Techserv Pvt Ltd",
    place: "Madurai",
    period: "April 2025 – Present",
    current: true,
    intro:
      "Design, develop and deploy full-stack web applications and REST APIs across the complete software lifecycle, from database design and backend services to React and TypeScript frontends and production deployment.",
    blocks: [
      {
        k: "Backend",
        t: "Build backends with Spring Boot, Django, Flask, Express.js and CodeIgniter.",
      },
      {
        k: "Frontend",
        t: "Develop responsive dashboards, user management and role-based access control modules.",
      },
      {
        k: "Mobile",
        t: "Develop cross-platform mobile applications using React Native and Kotlin.",
      },
      {
        k: "Computer vision",
        t: "Integrate OpenCV, YOLO and MediaPipe models into production applications.",
      },
      {
        k: "DevOps",
        t: "Provision, deploy and maintain DigitalOcean servers with Gunicorn, Nginx and Systemd, including SSL, uptime monitoring and scalability planning.",
      },
    ],
  },
  {
    role: "Intern · IoT & Data Science",
    company: "Quantanics Techserv Pvt Ltd",
    place: "Madurai",
    period: "March 2023 – April 2023",
    current: false,
    intro:
      "Worked on data pipelines and device data integration for early-stage monitoring and automation initiatives, building a foundation in Python, data handling and backend development.",
    blocks: [],
  },
];

/* ---------- Projects ---------- */

export type Visual =
  | "dcms"
  | "yoga"
  | "solvent"
  | "smartories"
  | "occupancy"
  | "driving"
  | "alumni"
  | "safety";

export type Project = {
  id: string;
  title: string;
  full: string;
  tagline: string;
  visual: Visual;
  featured?: boolean;
  tags: string[]; // filter keys
  stack: { layer: string; items: string[] }[];
  summary: string;
  built: string[];
};

export const projects: Project[] = [
  {
    id: "dcms",
    title: "DCMS",
    full: "Drug Content Management System",
    tagline: "Track and organise drug content records with role-based access.",
    visual: "dcms",
    featured: true,
    tags: ["java", "react", "mysql"],
    stack: [
      { layer: "Frontend", items: ["React", "TypeScript"] },
      { layer: "Backend", items: ["Java", "Spring Boot"] },
      { layer: "Database", items: ["MySQL"] },
    ],
    summary:
      "A full-stack management system for tracking and organising drug content records.",
    built: [
      "Spring Boot REST APIs with role-based access control",
      "MySQL database schema designed from scratch",
      "Responsive React and TypeScript frontend",
    ],
  },
  {
    id: "yoga",
    title: "Smart Yoga Mat",
    full: "AI-Powered Posture & Fitness Platform",
    tagline: "Real-time yoga posture analysis and accuracy scoring on your phone.",
    visual: "yoga",
    featured: true,
    tags: ["mobile", "python", "cv", "devops", "mysql"],
    stack: [
      { layer: "Mobile", items: ["React Native", "TypeScript"] },
      { layer: "Backend", items: ["Django REST Framework"] },
      { layer: "Vision", items: ["OpenCV", "YOLO", "MediaPipe"] },
      { layer: "Database", items: ["MySQL"] },
      { layer: "Cloud", items: ["DigitalOcean"] },
    ],
    summary:
      "A full-stack fitness platform: a React Native app and a Django REST Framework backend for real-time posture analysis and accuracy scoring.",
    built: [
      "Live pose estimation with OpenCV, YOLO and MediaPipe",
      "User authentication and session history",
      "Gamification: streaks, badges and leaderboards",
      "MySQL database design",
      "Backend deployed on DigitalOcean",
    ],
  },
  {
    id: "solvent",
    title: "Industrial Solvent Filler",
    full: "Remote Monitoring & Control Platform",
    tagline: "Centralised remote monitoring and control of solvent filling operations.",
    visual: "solvent",
    featured: true,
    tags: ["python", "react", "devops", "mysql"],
    stack: [
      { layer: "Frontend", items: ["React", "JavaScript"] },
      { layer: "Backend", items: ["Django", "Flask"] },
      { layer: "Database", items: ["MySQL"] },
      { layer: "Infra", items: ["DigitalOcean", "Nginx", "Gunicorn", "Systemd"] },
    ],
    summary:
      "A web platform for centralised remote monitoring and control of industrial solvent filling operations.",
    built: [
      "Device-management and real-time control APIs in Django and Flask",
      "MySQL database design",
      "Secure role-based authentication",
      "React frontend",
      "Deployed on DigitalOcean with Gunicorn, Nginx and Systemd",
    ],
  },
  {
    id: "smartories",
    title: "SmarTories",
    full: "Machine Performance & Production Monitoring",
    tagline: "Real-time machine performance, runtime and downtime dashboards.",
    visual: "smartories",
    featured: true,
    tags: ["php", "react", "mysql"],
    stack: [
      { layer: "Frontend", items: ["React", "JavaScript"] },
      { layer: "Backend", items: ["CodeIgniter", "PHP", "Python"] },
      { layer: "Database", items: ["MySQL"] },
    ],
    summary:
      "A production monitoring web application for real-time machine performance tracking.",
    built: [
      "MySQL database design",
      "Backend modules in CodeIgniter",
      "React dashboards for production count, runtime and downtime analysis",
      "Performance reporting",
    ],
  },
  {
    id: "occupancy",
    title: "Room Occupancy",
    full: "Room Occupancy Monitoring System",
    tagline: "Cloud-based occupancy tracking with a live dashboard and history.",
    visual: "occupancy",
    tags: ["python", "react", "devops", "mysql"],
    stack: [
      { layer: "Frontend", items: ["React", "JavaScript"] },
      { layer: "Backend", items: ["Django"] },
      { layer: "Database", items: ["MySQL"] },
      { layer: "Infra", items: ["DigitalOcean", "Nginx", "Gunicorn"] },
    ],
    summary:
      "A cloud-based occupancy tracking application with a live dashboard and historical reports.",
    built: [
      "Django backend, REST APIs and database schema",
      "Live dashboard and historical reports",
      "Deployed and maintained on DigitalOcean with Gunicorn and Nginx",
    ],
  },
  {
    id: "driving",
    title: "Vetri Driving School",
    full: "Vetri Driving School Website",
    tagline: "Responsive website with course management and online enquiries.",
    visual: "driving",
    tags: ["python", "react", "devops", "mysql"],
    stack: [
      { layer: "Frontend", items: ["React", "JavaScript", "Bootstrap"] },
      { layer: "Backend", items: ["Django"] },
      { layer: "Database", items: ["MySQL"] },
      { layer: "Infra", items: ["Linux"] },
    ],
    summary:
      "A responsive driving school website with course management and online enquiry features.",
    built: [
      "Django backend with MySQL integration",
      "Admin panel for courses and student enquiries",
      "Deployed on a Linux server",
    ],
  },
  {
    id: "alumni",
    title: "Alumni Matchmaker",
    full: "Alumni Matchmaker",
    tagline: "Connects alumni and students by interests, careers and mentorship.",
    visual: "alumni",
    tags: ["web"],
    stack: [{ layer: "Type", items: ["Web application"] }],
    summary:
      "A platform that connects alumni and current students based on shared interests, career paths and mentorship needs.",
    built: [
      "Matching on shared interests and career paths",
      "Mentorship-driven connections between alumni and students",
    ],
  },
  {
    id: "safety",
    title: "Women Safety App",
    full: "Women Safety Mobile App",
    tagline: "Android app with emergency alerts, live location and SOS.",
    visual: "safety",
    tags: ["mobile"],
    stack: [{ layer: "Mobile", items: ["Kotlin", "Android"] }],
    summary:
      "An Android application providing emergency alerts, live location sharing and SOS features for personal safety.",
    built: ["Emergency alerts", "Live location sharing", "One-tap SOS"],
  },
];

export const filters = [
  { key: "all", label: "All" },
  { key: "java", label: "Java / Spring" },
  { key: "python", label: "Django / Flask" },
  { key: "react", label: "React" },
  { key: "mobile", label: "Mobile" },
  { key: "devops", label: "Deployed on cloud" },
  { key: "cv", label: "Computer vision" },
];

/* ---------- Skills ---------- */

// `match` links a skill to project filter keys / stack items so clicking it filters projects.
export const skillGroups = [
  {
    name: "Frontend",
    code: "01",
    skills: ["React", "TypeScript", "JavaScript", "React Native", "Bootstrap", "Responsive Web Design", "REST API Integration"],
  },
  {
    name: "Backend",
    code: "02",
    skills: ["Spring Boot", "Django", "Django REST Framework", "Flask", "Express.js", "CodeIgniter", "RESTful API Design", "Role-Based Access Control", "Auth & Authorization"],
  },
  {
    name: "DevOps & Cloud",
    code: "03",
    skills: ["DigitalOcean", "Linux", "Nginx", "Gunicorn", "Systemd", "SSL/TLS", "Cloud Deployment", "Production Servers", "Uptime Monitoring", "Grafana"],
  },
  {
    name: "Languages",
    code: "04",
    skills: ["Java", "TypeScript", "JavaScript (ES6+)", "Python", "Kotlin", "PHP", "SQL", "C", "HTML5", "CSS3"],
  },
  {
    name: "Databases",
    code: "05",
    skills: ["MySQL", "SQLite", "Database Schema Design"],
  },
  {
    name: "Tools & more",
    code: "06",
    skills: ["Git", "GitHub", "Postman", "VS Code", "XAMPP", "OpenCV", "YOLO", "MediaPipe", "MQTT"],
  },
];

/* ---------- Education, certifications, workshops ---------- */

export const education = {
  degree: "B.Tech, Information Technology",
  school: "National Engineering College",
  period: "2021 – 2025",
  score: "CGPA 7.37 / 10",
};

export const certifications = [
  { name: "React.js Development", by: "Great Learning" },
  { name: "Python for Data Science", by: "IBM" },
  { name: "C for Everyone", by: "Coursera" },
  { name: "Linguaskill English Proficiency", by: "Cambridge University" },
];

export const workshops =
  "Delivered hands-on workshops and technical sessions on full-stack web development with Django and React, and on embedded systems programming, for student communities.";

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "How I build" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
