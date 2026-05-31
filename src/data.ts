import { PortfolioData } from "./types";

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "Devanshu Parmar",
    title: "Full Stack Developer | AI Engineering",
    bio: "I am a Full Stack Engineer interested in AI Engineering, Retrieval-Augmented Generation (RAG), backend systems, developer tools, and web applications. I work primarily with Angular, React, SQL, and modern AI technologies, and enjoy building practical software that solves real-world problems.",
    avatar: "/src/assets/images/picture.png",
    // avatar: "/src/assets/images/profile_image.jpeg",
    github: "https://github.com/Devanshu046",
    linkedin: "https://linkedin.com/in/devanshu-parmar",
    twitter: "https://twitter.com/ParmarDevanshu1",
    email: "devanshuparmar04@gmail.com",
    company: "Krishna softech",
    duration: "July 2024 - Present"
  },
  experiences: [
    {
      id: "exp-1",
      date: "May 2026",
      title: "RAG (Retrieval-Augmented Generation)"
    },
    {
      id: "exp-2",
      date: "Jan 2026",
      title: "Typing test desktop app"
    },
    {
      id: "exp-3",
      date: "Jul 2025",
      title: "WinForms (Desktop Apps)"
    },
    {
      id: "exp-4",
      date: "Jan 2025",
      title: "Jenkins, SignalR"
    },
    {
      id: "exp-5",
      date: "Jul 2024",
      title: "Angular, .NET API"
    }
  ],
  technologies: [
    {
      id: "tech-1",
      category: "LANGUAGES & FRAMEWORKS",
      skills: "JavaScript, TypeScript, Angular, C#, .NET, SQL"
    },
    {
      id: "tech-2",
      category: "STATE & APIS",
      skills: "RxJS, NgRx, SignalR, REST API, GraphQL, Graph.js"
    },
    {
      id: "tech-3",
      category: "UI & ACCESSIBILITY",
      skills: "Tailwind CSS, Bootstrap, Material UI, PrimeNG"
    },
    {
      id: "tech-4",
      category: "TOOLS & PLATFORMS",
      skills: "Git, GitHub, SSMS, Jenkins, DevOps, Vercel, VS Code, Cursor AI, Antigravity"
    },
    {
      id: "tech-5",
      category: "PRACTICES",
      skills: "Agile, TDD, CI, Code Reviews"
    },
    {
      id: "tech-6",
      category: "AI",
      skills: "RAG"
    }
  ],
  educations: [
    {
      id: "edu-1",
      period: "2020 — 2024",
      institution: "Gujarat Technological University",
      credential: "Bachelor of Engineering, Major in computer engineering ",
      details: "Graduated with high distinction."
    }
  ],
  projects: [
    {
      id: "proj-3",
      title: "Online Assessment",
      bulletPoints: [
        "Contributed to multiple modules and implemented NgRx state management in the reports module, resulting in faster UI performance and reduced 20% server overhead by minimizing multiple API calls.",
        "Worked on SignalR-based handling to prevent multiple examiner logins, enhancing user session management.",
        "Reduced UI re-renders through careful debugging and troubleshooting of data flow issues, improving overall responsiveness, and Implemented role-based access control to secure different application functionalities."
      ]
    },
    {
      id: "proj-4",
      title: "Interview App For Desktop",
      bulletPoints: [
        "Contributed to the development of a Windows Forms desktop application for live interviews with multiple panelists, enhancing real-time interaction and user experience."
      ]
    },
    {
      id: "proj-5",
      title: "Online MCQ Exam Platform (Angular, .NET, SQL, SignalR, JWT)",
      bulletPoints: [
        "Built real-time proctor approval using SignalR and JWT authentication in Angular frontend with .NET backend and SQL storage for secure exams.",
        "Ensured exam integrity through Angular/.NET real-time communication and SQL data validation."
      ]
    },
    {
      id: "proj-6",
      title: "Typing Test Application",
      bulletPoints: [
        "A WinForms desktop application for conducting typing tests and examinations. It provides real-time performance tracking and is used to evaluate typing proficiency in educational and training environments.",
        "Measures typing speed(WPM), accuracy, errors, and completion time. Supports examination workflows by delivering consistent and objective typing assessments."
      ]
    }
  ]
};
