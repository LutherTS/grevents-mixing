import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  console.log(`Beginning seeds...`);

  console.log(`Seeding users...`);

  // “me” / LePapier

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

  // Alice / Alice-chan

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

  // Bianca / Trovounette

  const trovounette = await db.user.create({
    data: {
      username: "Trovounette",
      email: "b@b.com",
      hashedPassword:
        "$2a$12$LxyeiZiFQ2t2m7rODda9B.O171J3GPuva77qfCLCSAUhZ60EWTFwW", // Trovounette
      appWideName: "Bianca",
      friendCode: "w6s38rye29fn",
      state: "LIVE",
    },
  });
  console.log(`${trovounette.username} created.`);

  // Candice / Candi

  const candi = await db.user.create({
    data: {
      username: "Candi",
      email: "c@c.com",
      hashedPassword:
        "$2a$12$dCJyvJBRaz8bpgLHRrHW2etVFXD0s51/r8tkdkZwXT8zXeBxT.Kb2", // Candi
      appWideName: "Candice",
      friendCode: "amdgw643uty9",
      state: "LIVE",
    },
  });
  console.log(`${candi.username} created.`);

  // Danny / D-Dan

  const dDan = await db.user.create({
    data: {
      username: "D-Dan",
      email: "d@d.com",
      hashedPassword:
        "$2a$12$iUu18mSH7lUoZc7g6g3sjuTVwy72Vyvc/kpTB9b0FERZA0ETepGP6", // D-Dan
      appWideName: "Danny",
      friendCode: "bq9vhrtamj2w",
      state: "LIVE",
    },
  });
  console.log(`${dDan.username} created.`);

  // Elijah / El-Hadj
  // for creating contacts through find

  const elHadj = await db.user.create({
    data: {
      username: "El-Hadj",
      email: "e@e.com",
      hashedPassword:
        "$2a$12$3AYWQwwEm70zwEpnP4AIyu49TEyNgvv1eMQvz0c.PgxmDZryZz67.", // El-Hadj
      appWideName: "Elijah",
      friendCode: "s73urd6kvbxj",
      state: "LIVE",
    },
  });
  console.log(`${elHadj.username} created.`);

  // Fiona / FioTriangle
  // no contacts, no answers
  // for creating contacts during testing
  // for contact notifications

  const fioTriangle = await db.user.create({
    data: {
      username: "FioTriangle",
      email: "f@f.com",
      hashedPassword:
        "$2a$12$iwnzkb.lDDFRIHHBGMmOEONw00W/GIwX7OD8JxNhMciuLvk/rALbW", // FioTriangle
      appWideName: "Fiona",
      friendCode: "ngx7h3tkbu8s",
      state: "LIVE",
    },
  });
  console.log(`${fioTriangle.username} created.`);

  // Grace / Gracie-babie
  // no contacts, no answers
  // DO NOT FIND ON THE APP VIA FIND

  const gracieBabie = await db.user.create({
    data: {
      username: "Gracie-babie",
      email: "g@g.com",
      hashedPassword:
        "$2a$12$6yHob1L9kfrWTYM3B6pL1u67CnHI/AKMaxtfv28Ydk5VzxDeuhCUq", // Gracie-babie
      appWideName: "Grace",
      friendCode: "v27WpaHzYRyE",
      state: "LIVE",
    },
  });
  console.log(`${gracieBabie.username} created.`);

  /* Hector / Hectavus manually created on the Sign-In page.
  const hector = await db.user.create({
    data: {
      username: "Hectavus",
      email: "h@h.com",
      hashedPassword: // Hectavus
      appWideName: "Hector"
    },
  });
  console.log(`${hector.username} created.`);
  */

  // Lucas / Lucario

  const lucario = await db.user.create({
    data: {
      username: "Lucario",
      email: "l@l.com",
      hashedPassword:
        "$2a$12$oOJFmvblCEREkIlI/UcYIO8mOFF0OewEmYNXyB8MHlU.ZKU3dWuRC", // Lucario
      appWideName: "Lucas",
      friendCode: "uxfv9b76kw35",
      state: "LIVE",
    },
  });
  console.log(`${lucario.username} created.`);

  // Malcolm / MisterX

  const misterX = await db.user.create({
    data: {
      username: "MisterX",
      email: "m@m.com",
      hashedPassword:
        "$2a$12$wL5QmeFlP4ZErJ4w3nwN..feiXznhw4HDApZrI7he/zEyGY7Njg8G", // MisterX
      appWideName: "Malcolm",
      friendCode: "sr5aetd843fp",
      state: "LIVE",
    },
  });
  console.log(`${misterX.username} created.`);

  // Nancy / Nonyes

  const nonyes = await db.user.create({
    data: {
      username: "Nonyes",
      email: "n@n.com",
      hashedPassword:
        "$2a$12$XrYHAPv0JJx9kHD75uOpqeuiopl1HLuMuGoXQJa8EzslhmgMw7Ntu", // Nonyes
      appWideName: "Nancy",
      friendCode: "ay8bs36e9h5t",
      state: "LIVE",
    },
  });
  console.log(`${nonyes.username} created.`);

  // Ophelia / Ophelia-swan

  const opheliaSwan = await db.user.create({
    data: {
      username: "Ophelia-swan",
      email: "o@o.com",
      hashedPassword:
        "$2a$12$nvpZFeUg3qgtbVonnbcWNOxsXxHqj643v7gBQs0OWo/VobRYAsP/G", // Ophelia-swan
      appWideName: "Ophelia",
      friendCode: "zsg6x5feutn8",
      state: "LIVE",
    },
  });
  console.log(`${opheliaSwan.username} created.`);

  // Pamela / Pimpampoum

  const pimpampoum = await db.user.create({
    data: {
      username: "Pimpampoum",
      email: "p@p.com",
      hashedPassword:
        "$2a$12$/aojscO6dz4Oypig/dx1NuJ2DNYZn3RW5BfQVAzYwYyftmmkS6VUW", // Pimpampoum
      appWideName: "Pamela",
      friendCode: "unpzyb4qkm3w",
      state: "LIVE",
    },
  });
  console.log(`${pimpampoum.username} created.`);

  console.log(`Users seeds complete.`);

  console.log(`Seeding contacts...`);

  // “me” and Alice / relation combination “irl”

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
        irlAt: new Date(),
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
        irlAt: new Date(),
      },
    }),
  ]);
  console.log(
    `${lePapier.username} to ${aliceChan.username} contacts connected.`
  );

  // “me” and Bianca / relation combination “friend”

  const lePapierToTrovounette = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: trovounette.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
    },
  });
  console.log(
    `${lePapier.username} to ${trovounette.username} contact created.`
  );

  const trovounetteToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: trovounette.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
    },
  });
  console.log(
    `${trovounette.username} to ${lePapier.username} contact created.`
  );

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToTrovounette.id,
      },
      data: {
        mirror: {
          connect: {
            id: trovounetteToLePapier.id,
          },
        },
        friendAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: trovounetteToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToTrovounette.id,
          },
        },
        friendAt: new Date(),
      },
    }),
  ]);
  console.log(
    `${lePapier.username} to ${trovounette.username} contacts connected.`
  );

  // “me” and Candice / relation combination “none”

  const lePapierToCandi = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: candi.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
    },
  });
  console.log(`${lePapier.username} to ${candi.username} contact created.`);

  const candiToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: candi.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
    },
  });
  console.log(`${candi.username} to ${lePapier.username} contact created.`);

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToCandi.id,
      },
      data: {
        mirror: {
          connect: {
            id: candiToLePapier.id,
          },
        },
      },
    }),
    await db.contact.update({
      where: {
        id: candiToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToCandi.id,
          },
        },
      },
    }),
  ]);
  console.log(`${lePapier.username} to ${candi.username} contacts connected.`);

  // “me” and Danny / relation combination nonexistent

  // “me” and Elijah / relation combination nonexistent

  // “me” and Fiona / relation combination nonexistent

  // “me” and Grace / relation combination nonexistent

  // “me” and Hector / relation combination nonexistent

  // “me” and Lucas / relation combination “friend”

  const lePapierToLucario = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: lucario.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
    },
  });
  console.log(`${lePapier.username} to ${lucario.username} contact created.`);

  const lucarioToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lucario.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
    },
  });
  console.log(`${lucario.username} to ${lePapier.username} contact created.`);

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToLucario.id,
      },
      data: {
        mirror: {
          connect: {
            id: lucarioToLePapier.id,
          },
        },
        friendAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: lucarioToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToLucario.id,
          },
        },
        friendAt: new Date(),
      },
    }),
  ]);
  console.log(
    `${lePapier.username} to ${lucario.username} contacts connected.`
  );

  // “me” and Malcolm / relation combination “irl”

  const lePapierToMisterX = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: misterX.id,
        },
      },
      state: "LIVE",
      kind: "IRL",
    },
  });
  console.log(`${lePapier.username} to ${misterX.username} contact created.`);

  const misterXToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: misterX.id,
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
  console.log(`${misterX.username} to ${lePapier.username} contact created.`);

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToMisterX.id,
      },
      data: {
        mirror: {
          connect: {
            id: misterXToLePapier.id,
          },
        },
        irlAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: misterXToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToMisterX.id,
          },
        },
        irlAt: new Date(),
      },
    }),
  ]);
  console.log(
    `${lePapier.username} to ${misterX.username} contacts connected.`
  );

  // “me” and Nancy / relation combination “blocking”

  const lePapierToNonyes = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: nonyes.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      blocking: true,
    },
  });
  console.log(`${lePapier.username} to ${nonyes.username} contact created.`);

  const nonyesToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: nonyes.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      blocking: false,
    },
  });
  console.log(`${nonyes.username} to ${lePapier.username} contact created.`);

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToNonyes.id,
      },
      data: {
        mirror: {
          connect: {
            id: nonyesToLePapier.id,
          },
        },
        blockedAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: nonyesToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToNonyes.id,
          },
        },
      },
    }),
  ]);
  console.log(`${lePapier.username} to ${nonyes.username} contacts connected.`);

  // “me” and Ophelia / relation combination “blocked”

  const lePapierToOpheliaSwan = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: opheliaSwan.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      blocking: false,
    },
  });
  console.log(
    `${lePapier.username} to ${opheliaSwan.username} contact created.`
  );

  const opheliaSwanToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: opheliaSwan.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      blocking: true,
    },
  });
  console.log(
    `${opheliaSwan.username} to ${lePapier.username} contact created.`
  );

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToOpheliaSwan.id,
      },
      data: {
        mirror: {
          connect: {
            id: opheliaSwanToLePapier.id,
          },
        },
      },
    }),
    await db.contact.update({
      where: {
        id: opheliaSwanToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToOpheliaSwan.id,
          },
        },
        blockedAt: new Date(),
      },
    }),
  ]);
  console.log(
    `${lePapier.username} to ${opheliaSwan.username} contacts connected.`
  );

  // “me” and Pamela / relation combination “blocking-and-blocked”

  const lePapierToPimpampoum = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: pimpampoum.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      blocking: true,
    },
  });
  console.log(
    `${lePapier.username} to ${pimpampoum.username} contact created.`
  );

  const pimpampoumToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: pimpampoum.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      blocking: true,
    },
  });
  console.log(
    `${pimpampoum.username} to ${lePapier.username} contact created.`
  );

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToPimpampoum.id,
      },
      data: {
        mirror: {
          connect: {
            id: pimpampoumToLePapier.id,
          },
        },
        blockedAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: pimpampoumToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToPimpampoum.id,
          },
        },
        blockedAt: new Date(),
      },
    }),
  ]);
  console.log(
    `${lePapier.username} to ${pimpampoum.username} contacts connected.`
  );

  console.log(`Contacts seeds complete.`);

  console.log(`Seeding questions...`);

  // First name / native

  const firstName = await db.question.create({
    data: {
      name: "First name",
      state: "LIVE",
      kind: "NATIVE",
    },
  });
  console.log(`"${firstName.name}" question created.`);

  // Work number / native
  // for no preexisting native not irl criteria from user yet

  const workNumber = await db.question.create({
    data: {
      name: "Work number",
      state: "LIVE",
      kind: "NATIVE",
    },
  });
  console.log(`"${workNumber.name}" question created.`);

  // Email address / native

  const emailAddress = await db.question.create({
    data: {
      name: "Email address",
      state: "LIVE",
      kind: "NATIVE",
    },
  });
  console.log(`"${emailAddress.name}" question created.`);

  // Other email address / native

  const otherEmailAddress = await db.question.create({
    data: {
      name: "Other email address",
      state: "LIVE",
      kind: "NATIVE",
    },
  });
  console.log(`"${otherEmailAddress.name}" question created.`);

  // Last name / native / irl

  const lastName = await db.question.create({
    data: {
      name: "Last name",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });
  console.log(`"${lastName.name}" question created.`);

  // Phone number / native / irl
  // for no preexisting native not irl criteria from user yet

  const phoneNumber = await db.question.create({
    data: {
      name: "Phone number",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });
  console.log(`"${phoneNumber.name}" question created.`);

  // Address / native / irl

  const address = await db.question.create({
    data: {
      name: "Address",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });
  console.log(`"${address.name}" question created.`);

  // Other address / native / irl

  const otherAddress = await db.question.create({
    data: {
      name: "Other address",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });
  console.log(`"${otherAddress.name}" question created.`);

  // Birthday / pseudo

  const birthday = await db.question.create({
    data: {
      name: "Birthday",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${birthday.name}" question created.`);

  // Birthdate / pseudo

  const birthdate = await db.question.create({
    data: {
      name: "Birthdate",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${birthdate.name}" question created.`);

  // Father's birthday / pseudo
  // for no preexisting pseudonative criteria from user yet
  // for not irl purposes

  const fathersBirthday = await db.question.create({
    data: {
      name: "Father's birthday",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${fathersBirthday.name}" question created.`);

  // Mother's birthday / pseudo

  const mothersBirthday = await db.question.create({
    data: {
      name: "Mother's birthday",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${mothersBirthday.name}" question created.`);

  // Girlfriend's birthday / pseudo

  const girlfriendsBirthday = await db.question.create({
    data: {
      name: "Girlfriend's birthday",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${girlfriendsBirthday.name}" question created.`);

  // Crush's birthday / pseudo

  const crushsBirthday = await db.question.create({
    data: {
      name: "Crush's birthday",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${crushsBirthday.name}" question created.`);

  // Father's birthdate / pseudo
  // for no preexisting pseudonative criteria from user yet
  // for irl purposes

  const fathersBirthdate = await db.question.create({
    data: {
      name: "Father's birthdate",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${fathersBirthdate.name}" question created.`);

  // Mother's birthdate / pseudo

  const mothersBirthdate = await db.question.create({
    data: {
      name: "Mother's birthdate",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${mothersBirthdate.name}" question created.`);

  // Girlfriend's birthdate / pseudo

  const girlfriendsBirthdate = await db.question.create({
    data: {
      name: "Girlfriend's birthdate",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${girlfriendsBirthdate.name}" question created.`);

  // Crush's birthdate / pseudo

  const crushsBirthdate = await db.question.create({
    data: {
      name: "Crush's birthdate",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${crushsBirthdate.name}" question created.`);

  // Favorite actor / pseudo

  const favoriteActor = await db.question.create({
    data: {
      name: "Favorite actor",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${favoriteActor.name}" question created.`);

  // Favorite actress / pseudo

  const favoriteActress = await db.question.create({
    data: {
      name: "Favorite actress",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${favoriteActress.name}" question created.`);

  // Favorite anime character / pseudo

  const favoriteAnimeCharacter = await db.question.create({
    data: {
      name: "Favorite anime character",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${favoriteAnimeCharacter.name}" question created.`);

  // Favorite anime waifu / pseudo

  const favoriteAnimeWaifu = await db.question.create({
    data: {
      name: "Favorite anime waifu",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${favoriteAnimeWaifu.name}" question created.`);

  // Favorite anime series / pseudo

  const favoriteAnimeSeries = await db.question.create({
    data: {
      name: "Favorite anime series",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${favoriteAnimeSeries.name}" question created.`);

  // Favorite anime franchise / pseudo

  const favoriteAnimeFranchise = await db.question.create({
    data: {
      name: "Favorite anime franchise",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${favoriteAnimeFranchise.name}" question created.`);

  // Favorite anime studio / pseudo
  // for no preexisting custom criteria from user yet

  const favoriteAnimeStudio = await db.question.create({
    data: {
      name: "Favorite anime studio",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });
  console.log(`"${favoriteAnimeStudio.name}" question created.`);

  console.log(`Questions seeds complete.`);

  console.log(`Seeding user questions...`);

  // LePapier, First name
  // native / pinned
  // for preexisting native not irl (answer live)
  // when creating same native not irl criteria

  const lePapierFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // LePapier, Last name
  // native / irl / pinned
  // for preexisting native irl (answer live)
  // when creating same native irl criteria

  const lePapierLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // Alice-chan, First name
  // native / pinned

  const aliceChanFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // Alice-chan, Last name
  // native / irl / pinned

  const aliceChanLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // LePapier, Favorite actress
  // custom / shared (1)

  const lePapierFavoriteActress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: favoriteActress.id,
        },
      },
    },
  });

  // Alice-chan, Favorite actor
  // custom / shared (1)

  const aliceChanFavoriteActor = await db.userQuestion.create({
    data: {
      state: "LIVE",
      pinnedAt: new Date(),
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
      question: {
        connect: {
          id: favoriteActor.id,
        },
      },
    },
  });

  // LePapier, Favorite actor
  // custom / not shared

  const lePapierFavoriteActor = await db.userQuestion.create({
    data: {
      state: "LIVE",
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: favoriteActor.id,
        },
      },
    },
  });

  // Alice-chan, Favorite actress
  // custom / not shared

  const aliceChanFavoriteActress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      pinnedAt: new Date(),
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
      question: {
        connect: {
          id: favoriteActress.id,
        },
      },
    },
  });

  // Trovounette, First name
  // native / pinned

  const trovounetteFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: trovounette.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // Trovounette, Last name
  // native / irl

  const trovounetteLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: trovounette.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // Candi, First name
  // native / pinned

  const candiFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: candi.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // Candi, Last name
  // native / irl

  const candiLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: candi.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // D-Dan, First name
  // native / pinned

  const dDanFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: dDan.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // D-Dan, Last name
  // native / irl

  const dDanLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: dDan.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // El-Hadj, First name
  // native / pinned

  const elHadjFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: elHadj.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // El-Hadj, Last name
  // native / irl

  const elHadjLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: elHadj.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // Lucario, First name
  // native / pinned

  const lucarioFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lucario.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // Lucario, Last name
  // native / irl

  const lucarioLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: lucario.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // MisterX, First name
  // native / pinned

  const misterXFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: misterX.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // MisterX, Last name
  // native / irl

  const misterXLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: misterX.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // Nonyes, First name
  // native / pinned

  const nonyesFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: nonyes.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // Nonyes, Last name
  // native / irl

  const nonyesLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: nonyes.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // Ophelia-swan, First name
  // native / pinned

  const opheliaSwanFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: opheliaSwan.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // Ophelia-swan, Last name
  // native / irl

  const opheliaSwanLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: opheliaSwan.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // Pimpampoum, First name
  // native / pinned

  const pimpampoumFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: pimpampoum.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // Pimpampoum, Last name
  // native / irl

  const pimpampoumLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: pimpampoum.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // LePapier, Email address
  // native

  const lePapierEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // LePapier, Other email address
  // native
  // for preexisting native not irl (answer deleted)
  // when creating same native not irl criteria

  const lePapierOtherEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: otherEmailAddress.id,
        },
      },
    },
  });

  // LePapier, Address
  // native / irl

  const lePapierAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: address.id,
        },
      },
    },
  });

  // LePapier, Other address
  // native / irl
  // for preexisting native irl (answer deleted)
  // when creating same native irl criteria

  const lePapierOtherAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: otherAddress.id,
        },
      },
    },
  });

  // Alice-chan, Email address
  // native

  const aliceChanEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // Alice-chan, Address
  // native / irl

  const aliceChanAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
      question: {
        connect: {
          id: address.id,
        },
      },
    },
  });

  // LePapier, Birthday
  // pseudonative / pinned
  // for preexisting pseudonative not irl (answer live)
  // when creating same pseudonative not irl criteria

  const lePapierBirthday = await db.userQuestion.create({
    data: {
      state: "LIVE",
      kind: "PSEUDONATIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: birthday.id,
        },
      },
    },
  });

  // LePapier, Mother's birthday
  // pseudonative
  // for preexisting pseudonative not irl (answer deleted)
  // when creating same pseudonative not irl criteria

  const lePapierMothersBirthday = await db.userQuestion.create({
    data: {
      state: "LIVE",
      kind: "PSEUDONATIVE",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: mothersBirthday.id,
        },
      },
    },
  });

  // LePapier, Girlfriend's birthday
  // pseudonative / irl
  // for preexisting pseudonative irl (answer live)
  // when creating same pseudonative not irl criteria

  const lePapierGirlfriendsBirthday = await db.userQuestion.create({
    data: {
      state: "LIVE",
      kind: "PSEUDONATIVEIRL",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: girlfriendsBirthday.id,
        },
      },
    },
  });

  // LePapier, Crush's birthday
  // pseudonative / irl
  // for preexisting pseudonative irl (answer deleted)
  // when creating same pseudonative not irl criteria

  const lePapierCrushsBirthday = await db.userQuestion.create({
    data: {
      state: "LIVE",
      kind: "PSEUDONATIVEIRL",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: crushsBirthday.id,
        },
      },
    },
  });

  // LePapier, Birthdate
  // pseudonative / irl / pinned
  // for preexisting pseudonative irl (answer live)
  // when creating same pseudonative irl criteria

  const lePapierBirthdate = await db.userQuestion.create({
    data: {
      state: "LIVE",
      kind: "PSEUDONATIVEIRL",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: birthdate.id,
        },
      },
    },
  });

  // LePapier, Mother's birthdate
  // pseudonative / irl
  // for preexisting pseudonative irl (answer deleted)
  // when creating same pseudonative irl criteria

  const lePapierMothersBirthdate = await db.userQuestion.create({
    data: {
      state: "LIVE",
      kind: "PSEUDONATIVEIRL",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: mothersBirthdate.id,
        },
      },
    },
  });

  // LePapier, Girlfriend's birthdate
  // pseudonative
  // for preexisting pseudonative not irl (answer live)
  // when creating same pseudonative irl criteria

  const lePapierGirlfriendsBirthdate = await db.userQuestion.create({
    data: {
      state: "LIVE",
      kind: "PSEUDONATIVEIRL",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: girlfriendsBirthdate.id,
        },
      },
    },
  });

  // LePapier, Crush's birthdate
  // pseudonative
  // for preexisting pseudonative not irl (answer deleted)
  // when creating same pseudonative irl criteria

  const lePapierCrushsBirthdate = await db.userQuestion.create({
    data: {
      state: "LIVE",
      kind: "PSEUDONATIVEIRL",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: crushsBirthdate.id,
        },
      },
    },
  });

  // LePapier, Favorite anime character
  // custom / not shared / pinned

  const lePapierFavoriteAnimeCharacter = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: favoriteAnimeCharacter.id,
        },
      },
    },
  });

  // LePapier, Favorite anime waifu
  // custom / shared (2) / pinned
  // (1 UserQuestionFriend 'DELETED')

  const lePapierFavoriteAnimeWaifu = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: favoriteAnimeWaifu.id,
        },
      },
    },
  });

  // LePapier, Favorite anime series
  // custom / not shared
  // for preexisting custom (answer live)
  // when creating same custom criteria

  const lePapierFavoriteAnimeSeries = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: favoriteAnimeSeries.id,
        },
      },
    },
  });

  // LePapier, Favorite anime franchise
  // custom / not shared
  // for preexisting custom (answer deleted)
  // when creating same custom criteria

  const lePapierFavoriteAnimeFranchise = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: lePapier.id,
        },
      },
      question: {
        connect: {
          id: favoriteAnimeFranchise.id,
        },
      },
    },
  });

  console.log(`User questions seeds complete.`);

  console.log(`Seeding user question friends...`);

  // LePapier, Favorite actress shared to Alice-chan

  const lePapierFavoriteActressToAliceChan = await db.userQuestionFriend.create(
    {
      data: {
        state: "LIVE",
        isSharedToFriend: true,
        sharedToFriendAt: new Date(),
        userQuestion: {
          connect: {
            id: lePapierFavoriteActress.id,
          },
        },
        contact: {
          connect: {
            id: lePapierToAliceChan.id,
          },
        },
      },
    }
  );

  // Alice-chan, Favorite actor shared to LePapier

  const aliceChanFavoriteActorToLePapier = await db.userQuestionFriend.create({
    data: {
      state: "LIVE",
      isSharedToFriend: true,
      sharedToFriendAt: new Date(),
      userQuestion: {
        connect: {
          id: aliceChanFavoriteActor.id,
        },
      },
      contact: {
        connect: {
          id: aliceChanToLePapier.id,
        },
      },
    },
  });

  // LePapier, Favorite anime waifu shared to Alice-chan

  const lePapierFavoriteAnimeWaifuToAliceChan =
    await db.userQuestionFriend.create({
      data: {
        state: "LIVE",
        isSharedToFriend: true,
        sharedToFriendAt: new Date(),
        userQuestion: {
          connect: {
            id: lePapierFavoriteAnimeWaifu.id,
          },
        },
        contact: {
          connect: {
            id: lePapierToAliceChan.id,
          },
        },
      },
    });

  // LePapier, Favorite anime waifu no longer shared to Trovounette

  const lePapierFavoriteAnimeWaifuToTrovounette =
    await db.userQuestionFriend.create({
      data: {
        state: "LIVE",
        isSharedToFriend: false,
        sharedToFriendAt: null,
        userQuestion: {
          connect: {
            id: lePapierFavoriteAnimeWaifu.id,
          },
        },
        contact: {
          connect: {
            id: lePapierToTrovounette.id,
          },
        },
      },
    });

  // LePapier, Favorite anime waifu shared to MisterX

  const lePapierFavoriteAnimeWaifuToMisterX =
    await db.userQuestionFriend.create({
      data: {
        state: "LIVE",
        isSharedToFriend: true,
        sharedToFriendAt: new Date(),
        userQuestion: {
          connect: {
            id: lePapierFavoriteAnimeWaifu.id,
          },
        },
        contact: {
          connect: {
            id: lePapierToMisterX.id,
          },
        },
      },
    });

  // LePapier, First name pinned by Alice-chan

  const lePapierFirstNameToAliceChan = await db.userQuestionFriend.create({
    data: {
      state: "LIVE",
      isPinnedByFriend: true,
      pinnedByFriendAt: new Date(),
      userQuestion: {
        connect: {
          id: lePapierFirstName.id,
        },
      },
      contact: {
        connect: {
          id: lePapierToAliceChan.id,
        },
      },
    },
  });

  console.log(`User question friends seeds complete.`);

  console.log(`Initial seeds complete.`);
}

seed();

// rm ./prisma/dev.db
// npx prisma db push
// node prisma/seeds.js

// npx prisma studio
