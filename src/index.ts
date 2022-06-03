import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "adams@prisma.io",
      name: "Sabin Adams",
      type: "User",
      Message: {
        createMany: {
          data: [
            {
              message: "A message from Sabin",
            },
            {
              message: "Another message from Sabin",
            },
          ],
        },
      },
    },
  });
  const users = await prisma.user.findFirst({
    where: { email: "adams@prisma.io" },
    include: {
      Message: true,
    },
  });
  console.log(users);
}

main().catch((e) => {
  console.log(e);
});
