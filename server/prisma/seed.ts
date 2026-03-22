import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma v7 generated types require an options argument; `{}` is fine when you rely on DATABASE_URL.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Prisma v7 generated client requires an adapter when using a custom generator output path.
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "John  2",
        email: "john.do2e@example.com",
        password: "password",
      },
      {
        name: "Jane 3",
        email: "jane.doe3@example.com",
        password: "password",
      },
    ]
  })
}


seed().then(() => prisma.$disconnect())