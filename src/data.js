export const PERSONAL_INFO = {
  name: "Rati Vardiashvili",
  role: "Software Engineer",
  location: "Bremen, Germany",
  email: "vardiashvilirati33@gmail.com",
  github: "https://github.com/rvardiashvili",
  linkedin: "https://www.linkedin.com/in/rvardiashvili",
  spotify: "https://open.spotify.com/user/gze4xxzme1e1f1ty1kt32kuot?si=d7afc329aef74d1d",
  cv_link: "https://drive.google.com/uc?export=download&id=14wRpsiVqvTm4ykE0_I3yxFO6BjdnYV0x",
  about: "I engineer high-performance systems where precision meets scale. Blending academic depth with practical backend expertise, I bridge the gap between raw system efficiency and modern cloud infrastructure. From optimizing gigapixel satellite data pipelines to building robust enterprise integrations, I design solutions that solve complex problems with elegance and speed.",
  tagline: "Engineering Intelligence."
};

export const EDUCATION = [
  {
    school: "Constructor University",
    degree: "B.Sc. Computer Science",
    location: "Bremen, Germany",
    period: "2022 - Jan 2026",
    desc: ""
  },
  {
    school: "Buckswood International",
    degree: "High School Diploma",
    location: "Tbilisi, Georgia",
    period: "2022",
    desc: ""
  }
];

export const EXPERIENCE = [
  {
    company: "Softgen",
    role: "Backend Developer",
    period: "Jul 2025 - Sep 2025",
    location: "Tbilisi",
    description: "Engineered Java-based integration solutions to automate interactions with the Georgian Revenue Service. Streamlined data exchange processes and collaborated with cross-functional teams to integrate secure APIs.",
    tags: ["Java", "Spring Boot", "REST APIs", "Integration"]
  },
  {
    company: "FINA LLC",
    role: "Systems Intern",
    period: "Aug 2023 - Dec 2024",
    location: "Georgia",
    description: "Developed an internal security system using Raspberry Pi clusters. Administered the company's main web platform and received in-depth training on Java EE backend architectures.",
    tags: ["Python", "IoT", "Linux Ops", "NGINX"]
  }
];

export const PROJECTS = [
  {
    title: "GeoTiff Pipeline",
    category: "AI / Data",
    description: "Memory-efficient pipeline for gigapixel satellite image processing. Optimized for high-throughput analysis using multi-threaded producer-consumer architecture.",
    tech: "Python",
    tags: ["PyTorch", "Rasterio", "NumPy"],
    link: "https://github.com/rvardiashvili/GeoTiff-Scalable-Analysis-Pipeline"
  },
  {
    title: "RSGE API Wrapper",
    category: "Integration",
    description: "Robust Java integration for automating interactions with the Georgian Revenue Service.",
    tech: "Java",
    tags: ["Java", "API", "Automation"],
    link: "https://github.com/rvardiashvili/rsge-api-java"
  },
  {
    title: "Web Dev Course",
    category: "Education",
    description: "Comprehensive collection of web development resources and coursework.",
    tech: "Web",
    tags: ["React", "JS"],
    link: "https://github.com/rvardiashvili/web-development-course"
  }
];

export const BOOKS = [
  { title: "Mistborn", author: "B. Sanderson" },
  { title: "Tress of Emerald Sea", author: "B. Sanderson" },
  { title: "Metro 2033", author: "D. Glukhovsky" }
];

const BASE_URL = import.meta.env.BASE_URL;

export const PHOTOS = [
  { id: 1, src: `${BASE_URL}media/webp/unnamed.webp`, desc: "Night Market", color: "bg-red-900" },
  { id: 2, src: `${BASE_URL}media/webp/unnamed (1).webp`, desc: "Silhouette", color: "bg-orange-900" },
  { id: 3, src: `${BASE_URL}media/webp/unnamed (2).webp`, desc: "Fog", color: "bg-slate-800" },
  { id: 4, src: `${BASE_URL}media/webp/unnamed (3).webp`, desc: "Archives", color: "bg-yellow-900" },
  { id: 5, src: `${BASE_URL}media/webp/DSC01653.webp`, desc: "Perspective", color: "bg-blue-900" },
  { id: 6, src: `${BASE_URL}media/webp/IMG_1097.webp`, desc: "Moment", color: "bg-green-900" }
];
