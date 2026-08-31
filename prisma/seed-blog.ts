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

const blogPosts = [
  {
    slug: "why-businesses-need-modern-software",
    title: "Why Businesses Need Modern Software in 2026",
    excerpt:
      "How custom software can help businesses improve operations, automate workflows and build scalable digital systems.",
    category: "Software Development",
    author: "Rizcent Technologies",
    date: "2026-08-20",
    readTime: "6 min read",
    featured: true,
    tags: JSON.stringify([
      "Software",
      "Business",
      "Digital Transformation",
    ]),
    content: JSON.stringify([
      {
        heading: "Technology is becoming part of every business",
        paragraphs: [
          "Modern businesses increasingly depend on software to manage customers, operations, communication and internal workflows.",
          "The right technology can reduce repetitive work, improve visibility and help teams make better decisions.",
        ],
      },
      {
        heading: "Custom software can solve specific problems",
        paragraphs: [
          "Off-the-shelf tools are useful for many organizations, but they may not always match a company's unique processes.",
          "Custom software allows businesses to design workflows around their actual requirements.",
        ],
      },
      {
        heading: "Build for the future",
        paragraphs: [
          "A good software architecture should support today's requirements while leaving room for future growth.",
          "Scalability, security, maintainability and performance should be considered from the beginning.",
        ],
      },
    ]),
    published: true,
  },

  {
    slug: "web-development-best-practices",
    title: "Web Development Best Practices for Modern Businesses",
    excerpt:
      "Important principles for building fast, accessible, secure and scalable business websites.",
    category: "Web Development",
    author: "Rizcent Technologies",
    date: "2026-08-16",
    readTime: "5 min read",
    featured: false,
    tags: JSON.stringify([
      "Web Development",
      "Performance",
      "SEO",
    ]),
    content: JSON.stringify([
      {
        heading: "Performance matters",
        paragraphs: [
          "A business website should load quickly and provide a smooth experience across desktop and mobile devices.",
          "Performance should be considered throughout development.",
        ],
      },
      {
        heading: "Build responsive experiences",
        paragraphs: [
          "Users access websites from many different screen sizes. Responsive layouts ensure the experience remains useful and easy to navigate.",
        ],
      },
      {
        heading: "Security should be built in",
        paragraphs: [
          "Authentication, input validation, dependency management and secure deployment practices all contribute to a stronger web application.",
        ],
      },
    ]),
    published: true,
  },

  {
    slug: "saas-development-guide",
    title: "A Practical Guide to Building a SaaS Product",
    excerpt:
      "Key architecture, product and technical considerations when building a scalable SaaS platform.",
    category: "SaaS Development",
    author: "Rizcent Technologies",
    date: "2026-08-12",
    readTime: "8 min read",
    featured: false,
    tags: JSON.stringify([
      "SaaS",
      "Cloud",
      "Product Development",
    ]),
    content: JSON.stringify([
      {
        heading: "Start with the product problem",
        paragraphs: [
          "A successful SaaS product starts with a clear customer problem rather than technology alone.",
          "Understanding users, workflows and business requirements helps create a focused first version.",
        ],
      },
      {
        heading: "Design for scale",
        paragraphs: [
          "SaaS applications often need to support multiple customers, users and organizations.",
          "A modular architecture makes it easier to expand functionality.",
        ],
      },
      {
        heading: "Security is fundamental",
        paragraphs: [
          "Customer data, authentication and authorization need strong protection from the beginning.",
        ],
      },
    ]),
    published: true,
  },

  {
    slug: "cybersecurity-for-growing-businesses",
    title: "Cybersecurity Essentials for Growing Businesses",
    excerpt:
      "Practical cybersecurity areas businesses should consider as their applications, teams and infrastructure grow.",
    category: "Cybersecurity",
    author: "Rizcent Technologies",
    date: "2026-08-08",
    readTime: "7 min read",
    featured: false,
    tags: JSON.stringify([
      "Cybersecurity",
      "Security",
      "Business",
    ]),
    content: JSON.stringify([
      {
        heading: "Security risks grow with your business",
        paragraphs: [
          "As organizations add applications, employees, cloud services and customer data, their security environment becomes more complex.",
        ],
      },
      {
        heading: "Protect identities and access",
        paragraphs: [
          "Strong authentication and appropriate access permissions are important foundations of an effective security program.",
        ],
      },
      {
        heading: "Regular security reviews",
        paragraphs: [
          "Regular assessments can help identify weaknesses before they become larger security problems.",
        ],
      },
    ]),
    published: true,
  },

  {
    slug: "cloud-security-mistakes",
    title: "Common Cloud Security Mistakes to Avoid",
    excerpt:
      "A look at common cloud security weaknesses and how organizations can reduce unnecessary exposure.",
    category: "Cloud Security",
    author: "Rizcent Technologies",
    date: "2026-08-04",
    readTime: "6 min read",
    featured: false,
    tags: JSON.stringify([
      "Cloud",
      "Security",
      "Infrastructure",
    ]),
    content: JSON.stringify([
      {
        heading: "Misconfigured resources",
        paragraphs: [
          "Cloud platforms provide powerful configuration options, but incorrect settings can unintentionally expose resources.",
        ],
      },
      {
        heading: "Excessive permissions",
        paragraphs: [
          "Users and services should receive only the permissions required for their responsibilities.",
        ],
      },
      {
        heading: "Continuous monitoring",
        paragraphs: [
          "Cloud security is not a one-time activity. Regular reviews and monitoring help organizations respond as environments change.",
        ],
      },
    ]),
    published: true,
  },
];

async function main() {
  console.log("Starting blog seed...");

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: {
        slug: post.slug,
      },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        author: post.author,
        date: post.date,
        readTime: post.readTime,
        featured: post.featured,
        tags: post.tags,
        content: post.content,
        published: post.published,
      },
      create: post,
    });

    console.log(`✓ ${post.title}`);
  }

  console.log("");
  console.log(`Successfully seeded ${blogPosts.length} blog posts.`);
}

main()
  .catch((error) => {
    console.error("");
    console.error("BLOG SEED ERROR:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });