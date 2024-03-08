import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const lePapier = await db.user.create({
    data: {
      username: "LePapier",
      email: "l@l.me",
      hashedPassword:
        "$2a$12$7IgXH7ORHd4x5O7.VC5LROJJFMq620II9ESleuMIYs.6KNDAsEYAe", // LePapier
      appWideName: "“me”",
      friendCode: "fsa7hyt3g58x",
      state: "LIVE",
    },
  });
  console.log(`${lePapier.username} created.`);

  const aliceChan = await db.user.create({
    data: {
      username: "Alice-chan",
      email: "a@a.com",
      hashedPassword:
        "$2a$12$uePHXFQIZxmEqAyvU74txewChLSQsnYt6zvf0m2ad7pnO0ORvRwh.", // Alice-chan
      appWideName: "Alice",
      friendCode: "k7mdsfwq2e9g",
      state: "LIVE",
    },
  });
  console.log(`${aliceChan.username} created.`);

  const lePapierToAliceChan = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: aliceChan.id,
        },
      },
      state: "LIVE",
      kind: "IRL",
    },
  });
  console.log(`${lePapier.username} to ${aliceChan.username} contact created.`);

  const aliceChanToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: aliceChan.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "IRL",
    },
  });
  console.log(`${aliceChan.username} to ${lePapier.username} contact created.`);

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToAliceChan.id,
      },
      data: {
        mirror: {
          connect: {
            id: aliceChanToLePapier.id,
          },
        },
      },
    }),
    await db.contact.update({
      where: {
        id: aliceChanToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToAliceChan.id,
          },
        },
      },
    }),
  ]);
  console.log(
    `${lePapier.username} to ${aliceChan.username} contacts connected.`
  );

  console.log(`Initial seeds complete.`);
}

seed();
