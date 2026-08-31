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

const services = [
  {
    slug: "software-development",
    title: "Software Development",
    category: "Software Development",
    shortDescription:
      "Custom software development services for businesses looking to build scalable and reliable digital products.",
    description:
      "We design and develop custom software solutions around your business requirements, workflows and long-term goals.",
    features: JSON.stringify([
      "Custom software applications",
      "Business workflow systems",
      "API development",
      "System integrations",
      "Scalable application architecture",
    ]),
    process: JSON.stringify([
      "Discovery & requirements",
      "Architecture & planning",
      "UI and application development",
      "Testing & quality assurance",
      "Deployment & support",
    ]),
    featured: true,
    published: true,
  },

  {
    slug: "web-development",
    title: "Web Development",
    category: "Web Development",
    shortDescription:
      "Modern, responsive and high-performance websites and web applications built for growing businesses.",
    description:
      "We build responsive web experiences that combine modern design, strong performance, accessibility and maintainable technology.",
    features: JSON.stringify([
      "Corporate websites",
      "Web applications",
      "Responsive development",
      "Performance optimization",
      "API integrations",
    ]),
    process: JSON.stringify([
      "Requirements & strategy",
      "Information architecture",
      "Design & development",
      "Testing & optimization",
      "Launch & maintenance",
    ]),
    featured: true,
    published: true,
  },

  {
    slug: "mobile-development",
    title: "Mobile Development",
    category: "Mobile Development",
    shortDescription:
      "Mobile applications designed to deliver reliable and engaging experiences across modern devices.",
    description:
      "We handle the complete mobile development lifecycle, from product planning and interface design to development, testing and deployment.",
    features: JSON.stringify([
      "Mobile application development",
      "Cross-platform applications",
      "Mobile UI development",
      "API integration",
      "Testing and deployment",
    ]),
    process: JSON.stringify([
      "Product discovery",
      "UX and interface planning",
      "Application development",
      "Testing & refinement",
      "Deployment & support",
    ]),
    featured: true,
    published: true,
  },

  {
    slug: "saas-development",
    title: "SaaS Development",
    category: "SaaS Development",
    shortDescription:
      "Scalable SaaS platforms designed around customers, subscriptions and long-term product growth.",
    description:
      "We design SaaS platforms with modular architecture, secure authentication, customer management and infrastructure designed for future expansion.",
    features: JSON.stringify([
      "SaaS product development",
      "Multi-user applications",
      "Subscription-ready architecture",
      "Authentication & authorization",
      "Cloud-ready infrastructure",
    ]),
    process: JSON.stringify([
      "Product discovery",
      "Architecture design",
      "MVP development",
      "Testing & security",
      "Deployment & scaling",
    ]),
    featured: true,
    published: true,
  },

  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    category: "Cybersecurity",
    shortDescription:
      "Practical cybersecurity solutions that help organizations identify risks, improve security and protect digital assets.",
    description:
      "Modern businesses depend on applications, cloud infrastructure, APIs and connected systems. Our cybersecurity approach focuses on understanding your environment, identifying realistic risks and improving your defenses.",
    features: JSON.stringify([
      "Cybersecurity assessments",
      "Application security",
      "Security reviews",
      "Vulnerability assessment",
      "Security architecture",
    ]),
    process: JSON.stringify([
      "Security discovery",
      "Risk identification",
      "Assessment & analysis",
      "Remediation guidance",
      "Security improvement",
    ]),
    featured: true,
    published: true,
  },

  {
    slug: "cloud-security",
    title: "Cloud Security",
    category: "Cloud Security",
    shortDescription:
      "Security-focused cloud practices designed to reduce exposure and strengthen cloud environments.",
    description:
      "We help organizations review cloud configurations, access controls and security practices to build stronger and more controlled cloud environments.",
    features: JSON.stringify([
      "Cloud security assessments",
      "Configuration reviews",
      "Identity and access review",
      "Cloud security architecture",
      "Security monitoring guidance",
    ]),
    process: JSON.stringify([
      "Cloud environment discovery",
      "Configuration assessment",
      "Risk analysis",
      "Remediation planning",
      "Security validation",
    ]),
    featured: false,
    published: true,
  },

  {
    slug: "penetration-testing",
    title: "Penetration Testing",
    category: "Penetration Testing",
    shortDescription:
      "Security testing designed to identify exploitable weaknesses across applications, APIs and digital systems.",
    description:
      "Our penetration testing approach focuses on identifying realistic security weaknesses and providing practical remediation guidance.",
    features: JSON.stringify([
      "Web application testing",
      "API security testing",
      "Authentication testing",
      "Authorization testing",
      "Security reporting",
    ]),
    process: JSON.stringify([
      "Scope definition",
      "Reconnaissance",
      "Security testing",
      "Validation & analysis",
      "Reporting & remediation guidance",
    ]),
    featured: false,
    published: true,
  },

  {
    slug: "security-audit",
    title: "Security Audit",
    category: "Security Audit",
    shortDescription:
      "Structured security reviews to identify weaknesses in applications, systems and technology practices.",
    description:
      "We conduct practical security audits to help organizations understand their current security posture and prioritize improvements.",
    features: JSON.stringify([
      "Application security review",
      "Infrastructure review",
      "Access control review",
      "Security configuration review",
      "Risk assessment",
    ]),
    process: JSON.stringify([
      "Audit planning",
      "Environment review",
      "Control assessment",
      "Risk prioritization",
      "Final recommendations",
    ]),
    featured: false,
    published: true,
  },
];

async function main() {
  console.log("Starting services seed...\n");

  for (const service of services) {
    await prisma.service.upsert({
      where: {
        slug: service.slug,
      },
      update: service,
      create: service,
    });

    console.log(`✓ ${service.title}`);
  }

  console.log(
    `\nSuccessfully seeded ${services.length} services.`
  );
}

main()
  .catch((error) => {
    console.error("SERVICE SEED ERROR:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });