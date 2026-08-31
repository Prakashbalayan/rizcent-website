import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const jobs = [
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
    featured: true,
    published: true,
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
    featured: false,
    published: true,
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
    featured: false,
    published: true,
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
    featured: false,
    published: true,
  },
];

async function main() {
  console.log("Starting jobs seed...");

  for (const job of jobs) {
    await prisma.job.upsert({
      where: {
        slug: job.slug,
      },
      update: {
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        description: job.description,
        responsibilities: JSON.stringify(job.responsibilities),
        requirements: JSON.stringify(job.requirements),
        niceToHave: JSON.stringify(job.niceToHave),
        featured: job.featured,
        published: job.published,
      },
      create: {
        slug: job.slug,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        description: job.description,
        responsibilities: JSON.stringify(job.responsibilities),
        requirements: JSON.stringify(job.requirements),
        niceToHave: JSON.stringify(job.niceToHave),
        featured: job.featured,
        published: job.published,
      },
    });

    console.log(`✓ ${job.title}`);
  }

  console.log("");
  console.log(`Successfully seeded ${jobs.length} jobs.`);
}

main()
  .catch((error) => {
    console.error("JOB SEED ERROR:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });