export interface Project {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  services: string[];
  year: string;
  clientType: string;
  featured: boolean;
  challenge: string;
  solution: string;
  results: string[];
}

export const projects: Project[] = [
  {
    slug: "business-management-platform",
    title: "Business Management Platform",
    category: "Software Development",
    shortDescription:
      "A centralized platform designed to simplify business operations, workflows and reporting.",
    description:
      "A custom business management platform built to bring important operational workflows into one reliable digital environment.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
    ],
    services: [
      "Software Development",
      "Web Development",
      "API Development",
    ],
    year: "2026",
    clientType: "Business Platform",
    featured: true,
    challenge:
      "The business needed a centralized system to replace disconnected workflows and reduce repetitive manual operations.",
    solution:
      "We designed a modular web platform with structured workflows, role-based access, reporting and API-driven architecture.",
    results: [
      "Centralized business workflows",
      "Improved operational visibility",
      "Reduced manual processes",
      "Scalable technical foundation",
    ],
  },

  {
    slug: "modern-business-website",
    title: "Modern Business Website",
    category: "Web Development",
    shortDescription:
      "A modern responsive website designed to strengthen a company's digital presence.",
    description:
      "A high-performance corporate website focused on clear communication, responsive design and conversion-oriented user experiences.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    services: [
      "Web Development",
      "UI Development",
      "Performance Optimization",
    ],
    year: "2026",
    clientType: "Corporate Website",
    featured: true,
    challenge:
      "The existing online presence did not clearly communicate the company's services or provide a strong experience across devices.",
    solution:
      "We created a responsive website with a structured information architecture, modern UI and performance-focused implementation.",
    results: [
      "Modern digital presence",
      "Responsive user experience",
      "Clear service presentation",
      "Improved website performance",
    ],
  },

  {
    slug: "saas-product-platform",
    title: "SaaS Product Platform",
    category: "SaaS Development",
    shortDescription:
      "A scalable SaaS platform designed around subscription-based digital services.",
    description:
      "A SaaS product architecture designed to support customers, organizations, subscriptions and future product expansion.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Cloud Infrastructure",
    ],
    services: [
      "SaaS Development",
      "Software Development",
      "Cloud Development",
    ],
    year: "2026",
    clientType: "SaaS Product",
    featured: true,
    challenge:
      "The product required an architecture capable of supporting multiple customers while keeping the platform maintainable and scalable.",
    solution:
      "We designed a modular SaaS architecture with authentication, organization management, subscription-ready workflows and scalable backend services.",
    results: [
      "Scalable SaaS foundation",
      "Structured customer management",
      "Modular product architecture",
      "Cloud-ready infrastructure",
    ],
  },

  {
    slug: "secure-api-platform",
    title: "Secure API Platform",
    category: "Cybersecurity",
    shortDescription:
      "A security-focused API platform designed around controlled access and reliable data exchange.",
    description:
      "A secure API architecture designed to support controlled communication between applications and services.",
    technologies: [
      "Node.js",
      "TypeScript",
      "REST API",
      "PostgreSQL",
    ],
    services: [
      "Cybersecurity",
      "API Development",
      "Security Architecture",
    ],
    year: "2026",
    clientType: "Technology Platform",
    featured: false,
    challenge:
      "The platform needed reliable APIs while maintaining strong authentication, authorization and data protection controls.",
    solution:
      "We designed structured API endpoints with authentication, authorization and security-focused application architecture.",
    results: [
      "Controlled API access",
      "Improved security architecture",
      "Reliable service communication",
      "Maintainable backend foundation",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}