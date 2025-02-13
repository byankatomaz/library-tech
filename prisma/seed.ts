import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding process...");

  const userOne = {
    name: "Byanka Tomaz",
    email: "byanka@gmail.com",
    password: "12345"
  };

  let user;
  try {
    user = await prisma.user.create({
        data: userOne
    });
    
    console.log("Author created:", user);
  } catch (error) {
    console.error("Error creating author:", error);
    throw error;
  }

}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
