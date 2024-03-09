import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
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
  // for creating contacts during testing for contact notifications

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
      },
    }),
  ]);
  console.log(
    `${lePapier.username} to ${pimpampoum.username} contacts connected.`
  );

  console.log(`Contacts seeds complete.`);

  console.log(`Initial seeds complete.`);
}

seed();
