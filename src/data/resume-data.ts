import { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = {
  personal: {
    name: "Akira Kurusu",
    title: "Phantom Thief & Full-Stack Developer",
    avatar: "/avatar.jpg",
    location: "Tokyo, Japan",
    email: "contact@example.com",
    phone: "+81-90-1234-5678",
    github: "",
    linkedin: "",
    website: "",
    summary: "Experienced full-stack developer with a passion for creating justice through code. Specialized in React, Node.js, and TypeScript. Leader of the Phantom Thieves development team, dedicated to changing hearts through innovative web applications."
  },
  skills: [
    {
      id: "react",
      name: "React",
      level: 95,
      category: "frontend",
      icon: "⚛️",
      color: "#61dafb"
    },
    {
      id: "typescript",
      name: "TypeScript",
      level: 90,
      category: "frontend",
      icon: "📘",
      color: "#3178c6"
    },
    {
      id: "nextjs",
      name: "Next.js",
      level: 88,
      category: "frontend",
      icon: "▲",
      color: "#000000"
    },
    {
      id: "nodejs",
      name: "Node.js",
      level: 85,
      category: "backend",
      icon: "🟢",
      color: "#339933"
    },
    {
      id: "python",
      name: "Python",
      level: 80,
      category: "backend",
      icon: "🐍",
      color: "#3776ab"
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      level: 75,
      category: "database",
      icon: "🐘",
      color: "#336791"
    },
    {
      id: "aws",
      name: "AWS",
      level: 70,
      category: "devops",
      icon: "☁️",
      color: "#ff9900"
    },
    {
      id: "figma",
      name: "Figma",
      level: 82,
      category: "design",
      icon: "🎨",
      color: "#f24e1e"
    }
  ],
  experience: [
    {
      id: "phantom-thieves-lead",
      company: "Phantom Thieves",
      position: "Lead Developer & Team Leader",
      startDate: "2023-04",
      location: "Tokyo, Japan",
      description: "Leading a team of skilled developers to create applications that change hearts and minds.",
      achievements: [
        "Architected and developed the Metaverse Navigation System using React and Node.js",
        "Implemented secure authentication system with zero security breaches",
        "Led team of 8 developers across multiple high-stakes projects",
        "Reduced application load times by 60% through performance optimization"
      ],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
      type: "work"
    },
    {
      id: "leblanc-intern",
      company: "LeBlanc Café",
      position: "Coffee & Code Intern",
      startDate: "2022-06",
      endDate: "2023-03",
      location: "Tokyo, Japan",
      description: "Balanced coffee brewing excellence with web development projects.",
      achievements: [
        "Developed point-of-sale system that improved order processing by 40%",
        "Created customer loyalty program with React Native mobile app",
        "Maintained 100% uptime for café's ordering system"
      ],
      technologies: ["React", "React Native", "Express.js", "MongoDB"],
      type: "internship"
    }
  ],
  education: [
    {
      id: "shujin-academy",
      institution: "Shujin Academy",
      degree: "High School Diploma",
      field: "Advanced Computer Science Track",
      startDate: "2020-04",
      endDate: "2023-03",
      gpa: 4.2,
      honors: ["Summa Cum Laude", "Computer Science Award", "Student Council President"],
      relevantCourses: [
        "Advanced Programming",
        "Data Structures & Algorithms",
        "Web Development",
        "Database Systems",
        "Software Engineering"
      ]
    }
  ],
  projects: [
    {
      id: "metaverse-navigator",
      name: "Metaverse Navigator",
      description: "A cutting-edge application for navigating cognitive palaces and changing hearts.",
      longDescription: "Revolutionary platform that allows users to explore subconscious realms through an intuitive web interface. Built with React, Three.js for 3D visualization, and a robust Node.js backend.",
      technologies: ["React", "Three.js", "TypeScript", "Node.js", "WebGL", "Socket.io"],
      startDate: "2023-04",
      status: "completed",
      links: {
        demo: "",
        github: ""
      },
      highlights: [
        "Real-time 3D palace rendering with WebGL",
        "Multi-user collaborative exploration",
        "Advanced security protocols for safe navigation",
        "Mobile-responsive design for on-the-go heists"
      ]
    },
    {
      id: "persona-tracker",
      name: "Persona Management System",
      description: "Comprehensive system for tracking and managing multiple personas with advanced fusion capabilities.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "TailwindCSS", "Framer Motion"],
      startDate: "2023-01",
      endDate: "2023-08",
      status: "completed",
      links: {
        demo: "",
        github: ""
      },
      highlights: [
        "Dynamic persona fusion calculator",
        "Statistics tracking and visualization",
        "Dark mode with Persona 5 theming",
        "PWA with offline capabilities"
      ]
    },
    {
      id: "calling-card-generator",
      name: "Calling Card Generator",
      description: "Stylish web application for generating personalized calling cards with Phantom Thieves aesthetics.",
      technologies: ["React", "Canvas API", "Styled Components", "Express.js"],
      startDate: "2022-10",
      endDate: "2022-12",
      status: "completed",
      links: {
        demo: "",
        github: ""
      },
      highlights: [
        "Custom canvas-based card designer",
        "Multiple template options",
        "Export to various formats (PNG, SVG, PDF)",
        "Social media integration"
      ]
    }
  ],
  achievements: [
    {
      id: "aws-cert",
      title: "AWS Certified Solutions Architect",
      description: "Professional certification demonstrating expertise in designing distributed systems on AWS.",
      date: "2023-09",
      issuer: "Amazon Web Services",
      type: "certification",
      link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
    },
    {
      id: "hackathon-winner",
      title: "Tokyo Hackathon 2023 Winner",
      description: "First place in the 'Social Impact' category for developing a mental health support application.",
      date: "2023-07",
      issuer: "Tokyo Tech Community",
      type: "competition"
    },
    {
      id: "open-source",
      title: "Major Open Source Contributor",
      description: "Contributed to 15+ open source projects with over 500 GitHub stars combined.",
      date: "2023-12",
      type: "other"
    }
  ],
  languages: [
    {
      id: "japanese",
      name: "Japanese",
      proficiency: "native"
    },
    {
      id: "english",
      name: "English",
      proficiency: "fluent"
    },
    {
      id: "korean",
      name: "Korean",
      proficiency: "intermediate"
    }
  ],
  interests: [
    {
      id: "gaming",
      name: "Gaming",
      description: "RPGs, strategy games, and game development",
      icon: "🎮"
    },
    {
      id: "coffee",
      name: "Coffee Brewing",
      description: "Specialty coffee and brewing techniques",
      icon: "☕"
    },
    {
      id: "photography",
      name: "Photography",
      description: "Street photography and portraits",
      icon: "📸"
    },
    {
      id: "cooking",
      name: "Cooking",
      description: "Japanese and international cuisine",
      icon: "🍳"
    },
    {
      id: "music",
      name: "Music",
      description: "Jazz, rock, and video game soundtracks",
      icon: "🎵"
    }
  ],
  metadata: {
    lastUpdated: "2024-01-15",
    version: "1.0.0",
    theme: "dark"
  }
};