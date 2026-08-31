export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

export const jobs: Job[] = [
  {
    slug: "senior-full-stack-developer",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "India / Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Build scalable web applications and digital products for businesses and startups.",
    responsibilities: [
      "Design and develop modern web applications.",
      "Build reusable frontend and backend components.",
      "Work with databases, APIs and third-party services.",
      "Review code and maintain development standards.",
      "Collaborate with designers and project teams.",
    ],
    requirements: [
      "Strong JavaScript or TypeScript knowledge.",
      "Experience with React and Next.js.",
      "Experience building backend APIs.",
      "Understanding of SQL or NoSQL databases.",
      "Good problem-solving and communication skills.",
    ],
    niceToHave: [
      "Experience with cloud platforms.",
      "Docker experience.",
      "Experience with CI/CD.",
      "Previous startup experience.",
    ],
  },

  {
    slug: "cybersecurity-engineer",
    title: "Cybersecurity Engineer",
    department: "Cybersecurity",
    location: "India / Remote",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Help organizations identify security weaknesses and improve their security posture.",
    responsibilities: [
      "Perform security assessments.",
      "Support penetration testing engagements.",
      "Analyze vulnerabilities and security findings.",
      "Prepare technical security reports.",
      "Work with development teams to improve application security.",
    ],
    requirements: [
      "Strong understanding of application and network security.",
      "Knowledge of common web vulnerabilities.",
      "Understanding of Linux and networking.",
      "Ability to document technical findings clearly.",
      "Strong analytical skills.",
    ],
    niceToHave: [
      "Security certifications.",
      "Experience with penetration testing tools.",
      "Cloud security knowledge.",
      "Programming or scripting experience.",
    ],
  },

  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    location: "India / Remote",
    type: "Full-time",
    experience: "1+ years",
    description:
      "Create polished, responsive and high-performance interfaces for modern digital products.",
    responsibilities: [
      "Build responsive user interfaces.",
      "Translate designs into production-quality code.",
      "Create reusable React components.",
      "Optimize frontend performance.",
      "Work closely with designers and backend developers.",
    ],
    requirements: [
      "Strong HTML, CSS and JavaScript knowledge.",
      "React experience.",
      "Understanding of responsive design.",
      "Good understanding of Git.",
      "Attention to visual detail.",
    ],
    niceToHave: [
      "Next.js experience.",
      "TypeScript knowledge.",
      "Tailwind CSS experience.",
      "UI/UX understanding.",
    ],
  },

  {
    slug: "business-development-executive",
    title: "Business Development Executive",
    department: "Business",
    location: "India",
    type: "Full-time",
    experience: "1+ years",
    description:
      "Help Rizcent build relationships with businesses and identify new technology opportunities.",
    responsibilities: [
      "Identify and qualify potential clients.",
      "Understand customer requirements.",
      "Prepare proposals and presentations.",
      "Maintain client relationships.",
      "Coordinate with technical teams.",
    ],
    requirements: [
      "Strong communication skills.",
      "Good understanding of technology services.",
      "Ability to communicate with business stakeholders.",
      "Strong presentation and negotiation skills.",
      "Self-driven approach.",
    ],
    niceToHave: [
      "B2B sales experience.",
      "Technology industry experience.",
      "CRM experience.",
      "Startup experience.",
    ],
  },
];

export function getJobBySlug(slug: string) {
  return jobs.find((job) => job.slug === slug);
}