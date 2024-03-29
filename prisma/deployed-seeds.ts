import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  console.log(`Beginning deployment seeds...`);

  console.log(`Seeding questions...`);

  // First name / native

  const firstName = await db.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVE",
        name: "First name",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "First name",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Birthday / native

  const birthday = await db.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVE",
        name: "Birthday",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Birthday",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Email address / native

  const emailAddress = await db.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVE",
        name: "Email address",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Email address",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Other email address / native

  const otherEmailAddress = await db.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVE",
        name: "Other email address",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Other email address",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Last name / native / irl

  const lastName = await db.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVEIRL",
        name: "Last name",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Last name",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Birthdate / native / irl

  const birthdate = await db.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVEIRL",
        name: "Birthdate",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Birthdate",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Phone number / native / irl

  const phoneNumber = await db.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVEIRL",
        name: "Phone number",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Phone number",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Address / native / irl

  const address = await db.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVEIRL",
        name: "Address",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Address",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  console.log(`Questions seeds complete.`);

  console.log(`Deployment seeds complete.`);
}

seed()
  .then(async () => {
    await db.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await db.$disconnect();

    process.exit(1);
  });

// rm ./prisma/dev.db
// npx prisma db push
// npx prisma db seed

// npx prisma studio
