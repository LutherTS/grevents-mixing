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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

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
      // state: "DEACTIVATED",
    },
  });

  // Quentin / WhoDidThatToYou

  const whoDidThatToYou = await db.user.create({
    data: {
      username: "WhoDidThatToYou",
      email: "q@q.com",
      hashedPassword:
        "$2a$12$GUVQktRR33Pxm9lxVAhmbu9SC.dInMR2h3Q7oNL3zYOngDaB7tOEe", // WhoDidThatToYou
      appWideName: "Quentin",
      friendCode: "sAdvy8f9uLYT",
      state: "LIVE",
      // state: "DEACTIVATED",
    },
  });

  // Roland / RG

  const rG = await db.user.create({
    data: {
      username: "RG",
      email: "r@r.com",
      hashedPassword:
        "$2a$12$upWLe7nfwK8mxnCJccSpEuhuq7Zgcl6zP0iOopC3vgyLDW1LH9dkO", // RG
      appWideName: "Roland",
      friendCode: "qX3DGt9b2YsU",
      state: "LIVE",
      // state: "DEACTIVATED",
    },
  });

  // Soren / TruePrince

  const truePrince = await db.user.create({
    data: {
      username: "TruePrince",
      email: "s@s.com",
      hashedPassword:
        "$2a$12$G2A1bB4nKn66WVC9lkQWP.9qh2//xod6vQbTZNisyPB39YyuSTQiO", // TruePrince
      appWideName: "Soren",
      friendCode: "cky4CUA7R9Yw",
      state: "LIVE",
      // state: "DEACTIVATED",
    },
  });

  // Titus / TheTitan

  const theTitan = await db.user.create({
    data: {
      username: "TheTitan",
      email: "t@t.com",
      hashedPassword:
        "$2a$12$OcHGmHR.zYmGo08sC80ZZuyP9KntjOHVG6RnrFKXnw2HyGSYU3X5m", // TheTitan
      appWideName: "Titus",
      friendCode: "W9bFAaptDxvE",
      state: "LIVE",
      // state: "DEACTIVATED",
    },
  });

  // Ursula / BlueCrow

  const blueCrow = await db.user.create({
    data: {
      username: "BlueCrow",
      email: "u@u.com",
      hashedPassword:
        "$2a$12$ZFCN7rFeEgmVOYQ6M31mgehpGV1m8NiQ/CWGx3/qKTkJ4xOqWxhs.", // BlueCrow
      appWideName: "Ursula",
      friendCode: "U5cTyPbetxvk",
      state: "LIVE",
      // state: "DEACTIVATED",
    },
  });

  // Victoria / LaVictoire

  const laVictoire = await db.user.create({
    data: {
      username: "LaVictoire",
      email: "v@v.com",
      hashedPassword:
        "$2a$12$QulFtzyqoOve.o6WMyLwCuzP6aUIfjksEPveRajJpcvcf.ojlGOgK", // LaVictoire
      appWideName: "Victoria",
      friendCode: "NL98sQFWGRx5",
      state: "LIVE",
      // state: "DEACTIVATED",
    },
  });

  // Wilda / oftheWild

  const ofTheWild = await db.user.create({
    data: {
      username: "oftheWild",
      email: "w@w.com",
      hashedPassword:
        "$2a$12$Y6eTEC/CBKoaZ7ryJDR6PuqxOaES6EZA.GjY8zjxsUb6XUYqo0die", // oftheWild
      appWideName: "Wilda",
      friendCode: "FWPbdZV6A9sN",
      state: "LIVE",
      // state: "DEACTIVATED",
    },
  });

  // Xenobia / ResRevealed

  const resRevealed = await db.user.create({
    data: {
      username: "ResRevealed",
      email: "x@x.com",
      hashedPassword:
        "$2a$12$v2MeRBz0ncCEBS3WMMDb.emMdjgL2Ep0bptqNRr.tsCiqcfowHsmG", // ResRevealed
      appWideName: "Xenobia",
      friendCode: "nFAQpjCq2z7P",
      state: "LIVE",
      // state: "DEACTIVATED",
    },
  });

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

  // “me” and Danny / relation combination “friend”
  // reaching 5 userNotIrlFriends for pagination testing

  const lePapierToDDan = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: dDan.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
    },
  });

  const dDanToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: dDan.id,
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

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToDDan.id,
      },
      data: {
        mirror: {
          connect: {
            id: dDanToLePapier.id,
          },
        },
        friendAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: dDanToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToDDan.id,
          },
        },
        friendAt: new Date(),
      },
    }),
  ]);

  // “me” and Elijah / relation combination nonexistent

  // “me” and Fiona / relation combination nonexistent

  // “me” and Grace / relation combination nonexistent

  // “me” and Hector / Hector currently nonexistent

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

  // “me” and Quentin / relation combination “none”
  // “me” processRelationship "SENTFRIEND" to Quentin

  const lePapierToWhoDidThatToYou = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: whoDidThatToYou.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      processRelationship: "SENTFRIEND",
    },
  });

  const whoDidThatToYouToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: whoDidThatToYou.id,
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

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToWhoDidThatToYou.id,
      },
      data: {
        mirror: {
          connect: {
            id: whoDidThatToYouToLePapier.id,
          },
        },
        sentFriendAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: whoDidThatToYouToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToWhoDidThatToYou.id,
          },
        },
      },
    }),
  ]);

  // “me” and Roland / relation combination “none”
  // Roland processRelationship "SENTFRIEND" to “me”

  const lePapierToRG = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: rG.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
    },
  });

  const rGToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: rG.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      processRelationship: "SENTFRIEND",
    },
  });

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToRG.id,
      },
      data: {
        mirror: {
          connect: {
            id: rGToLePapier.id,
          },
        },
      },
    }),
    await db.contact.update({
      where: {
        id: rGToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToRG.id,
          },
        },
        sentFriendAt: new Date(),
      },
    }),
  ]);

  // “me” and Soren / relation combination “friend”
  // “me” processRelationship "SENTIRL" to Soren

  const lePapierToTruePrince = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: truePrince.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
      processRelationship: "SENTIRL",
    },
  });

  const truePrinceToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: truePrince.id,
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

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToTruePrince.id,
      },
      data: {
        mirror: {
          connect: {
            id: truePrinceToLePapier.id,
          },
        },
        sentIrlAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: truePrinceToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToTruePrince.id,
          },
        },
      },
    }),
  ]);

  // “me” and Titus / relation combination “friend”
  // Titus processRelationship "SENTIRL" to “me”

  const lePapierToTheTitan = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: theTitan.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
    },
  });

  const theTitanToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: theTitan.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
      processRelationship: "SENTIRL",
    },
  });

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToTheTitan.id,
      },
      data: {
        mirror: {
          connect: {
            id: theTitanToLePapier.id,
          },
        },
      },
    }),
    await db.contact.update({
      where: {
        id: theTitanToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToTheTitan.id,
          },
        },
        sentIrlAt: new Date(),
      },
    }),
  ]);

  // “me” and Ursula / relation combination “none”
  // “me” processRelationship "ANNULFRIEND" to Ursula

  const lePapierToBlueCrow = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: blueCrow.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      processRelationship: "ANNULFRIEND",
    },
  });

  const blueCrowToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: blueCrow.id,
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

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToBlueCrow.id,
      },
      data: {
        mirror: {
          connect: {
            id: blueCrowToLePapier.id,
          },
        },
        annulFriendAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: blueCrowToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToBlueCrow.id,
          },
        },
      },
    }),
  ]);

  // “me” and Victoria / relation combination “none”
  // Victoria processRelationship "ANNULFRIEND" to “me”

  const lePapierToLaVictoire = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: laVictoire.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
    },
  });

  const laVictoireToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: laVictoire.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "NONE",
      processRelationship: "ANNULFRIEND",
    },
  });

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToLaVictoire.id,
      },
      data: {
        mirror: {
          connect: {
            id: laVictoireToLePapier.id,
          },
        },
      },
    }),
    await db.contact.update({
      where: {
        id: laVictoireToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToLaVictoire.id,
          },
        },
        annulFriendAt: new Date(),
      },
    }),
  ]);

  // “me” and Wilda / relation combination “friend”
  // “me” processRelationship "ANNULIRL" to Wilda

  const lePapierToOfTheWild = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: ofTheWild.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
      processRelationship: "ANNULIRL",
    },
  });

  const ofTheWildToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: ofTheWild.id,
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

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToOfTheWild.id,
      },
      data: {
        mirror: {
          connect: {
            id: ofTheWildToLePapier.id,
          },
        },
        annulIrlAt: new Date(),
      },
    }),
    await db.contact.update({
      where: {
        id: ofTheWildToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToOfTheWild.id,
          },
        },
      },
    }),
  ]);

  // “me” and Xenobia / relation combination “friend”
  // Xenobia processRelationship "ANNULIRL" to “me”

  const lePapierToResRevealed = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: lePapier.id,
        },
      },
      userLast: {
        connect: {
          id: resRevealed.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
    },
  });

  const resRevealedToLePapier = await db.contact.create({
    data: {
      userFirst: {
        connect: {
          id: resRevealed.id,
        },
      },
      userLast: {
        connect: {
          id: lePapier.id,
        },
      },
      state: "LIVE",
      kind: "FRIEND",
      processRelationship: "ANNULIRL",
    },
  });

  await Promise.all([
    await db.contact.update({
      where: {
        id: lePapierToResRevealed.id,
      },
      data: {
        mirror: {
          connect: {
            id: resRevealedToLePapier.id,
          },
        },
      },
    }),
    await db.contact.update({
      where: {
        id: resRevealedToLePapier.id,
      },
      data: {
        mirror: {
          connect: {
            id: lePapierToResRevealed.id,
          },
        },
        annulIrlAt: new Date(),
      },
    }),
  ]);

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

  // Work number / native
  // for no preexisting native not irl criteria from user yet

  const workNumber = await db.question.create({
    data: {
      name: "Work number",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Email address / native

  const emailAddress = await db.question.create({
    data: {
      name: "Email address",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Other email address / native

  const otherEmailAddress = await db.question.create({
    data: {
      name: "Other email address",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Last name / native / irl

  const lastName = await db.question.create({
    data: {
      name: "Last name",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Phone number / native / irl
  // for no preexisting native not irl criteria from user yet

  const phoneNumber = await db.question.create({
    data: {
      name: "Phone number",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Address / native / irl

  const address = await db.question.create({
    data: {
      name: "Address",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Other address / native / irl

  const otherAddress = await db.question.create({
    data: {
      name: "Other address",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Birthday / pseudo

  const birthday = await db.question.create({
    data: {
      name: "Birthday",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Birthdate / pseudo

  const birthdate = await db.question.create({
    data: {
      name: "Birthdate",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Father's birthday / pseudo
  // for no preexisting pseudonative criteria from user yet
  // for not irl purposes

  const fathersBirthday = await db.question.create({
    data: {
      name: "Father's birthday",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Mother's birthday / pseudo

  const mothersBirthday = await db.question.create({
    data: {
      name: "Mother's birthday",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Girlfriend's birthday / pseudo

  const girlfriendsBirthday = await db.question.create({
    data: {
      name: "Girlfriend's birthday",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Crush's birthday / pseudo

  const crushsBirthday = await db.question.create({
    data: {
      name: "Crush's birthday",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Father's birthdate / pseudo
  // for no preexisting pseudonative criteria from user yet
  // for irl purposes

  const fathersBirthdate = await db.question.create({
    data: {
      name: "Father's birthdate",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Mother's birthdate / pseudo

  const mothersBirthdate = await db.question.create({
    data: {
      name: "Mother's birthdate",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Girlfriend's birthdate / pseudo

  const girlfriendsBirthdate = await db.question.create({
    data: {
      name: "Girlfriend's birthdate",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Crush's birthdate / pseudo

  const crushsBirthdate = await db.question.create({
    data: {
      name: "Crush's birthdate",
      state: "LIVE",
      kind: "PSEUDO",
    },
  });

  // Favorite actor / custom

  const favoriteActor = await db.question.create({
    data: {
      name: "Favorite actor",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });

  // Favorite actress / custom

  const favoriteActress = await db.question.create({
    data: {
      name: "Favorite actress",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });

  // Favorite anime character / custom

  const favoriteAnimeCharacter = await db.question.create({
    data: {
      name: "Favorite anime character",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });

  // Favorite anime waifu / custom

  const favoriteAnimeWaifu = await db.question.create({
    data: {
      name: "Favorite anime waifu",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });

  // Favorite anime series / custom

  const favoriteAnimeSeries = await db.question.create({
    data: {
      name: "Favorite anime series",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });

  // Favorite anime franchise / custom

  const favoriteAnimeFranchise = await db.question.create({
    data: {
      name: "Favorite anime franchise",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });

  // Favorite anime studio / custom
  // for no preexisting custom criteria from user yet

  const favoriteAnimeStudio = await db.question.create({
    data: {
      name: "Favorite anime studio",
      state: "LIVE",
      kind: "CUSTOM",
    },
  });

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

  // WhoDidThatToYou, First name
  // native / pinned

  const whoDidThatToYouFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: whoDidThatToYou.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // WhoDidThatToYou, Last name
  // native / irl

  const whoDidThatToYouLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: whoDidThatToYou.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // RG, First name
  // native / pinned

  const rGFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: rG.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // RG, Last name
  // native / irl

  const rGLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: rG.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // TruePrince, First name
  // native / pinned

  const truePrinceFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: truePrince.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // TruePrince, Last name
  // native / irl

  const truePrinceLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: truePrince.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // TheTitan, First name
  // native / pinned

  const theTitanFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: theTitan.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // TheTitan, Last name
  // native / irl

  const theTitanLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: theTitan.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // BlueCrow, First name
  // native / pinned

  const blueCrowFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: blueCrow.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // BlueCrow, Last name
  // native / irl

  const blueCrowLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: blueCrow.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // LaVictoire, First name
  // native / pinned

  const laVictoireFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: laVictoire.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // LaVictoire, Last name
  // native / irl

  const laVictoireLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: laVictoire.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // oftheWild, First name
  // native / pinned

  const ofTheWildFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: ofTheWild.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // oftheWild, Last name
  // native / irl

  const ofTheWildLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: ofTheWild.id,
        },
      },
      question: {
        connect: {
          id: lastName.id,
        },
      },
    },
  });

  // ResRevealed, First name
  // native / pinned

  const resRevealedFirstName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      isPinned: true,
      pinnedAt: new Date(),
      user: {
        connect: {
          id: resRevealed.id,
        },
      },
      question: {
        connect: {
          id: firstName.id,
        },
      },
    },
  });

  // ResRevealed, Last name
  // native / irl

  const resRevealedLastName = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: resRevealed.id,
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
  // native / HIDDEN

  const aliceChanEmailAddress = await db.userQuestion.create({
    data: {
      state: "HIDDEN",
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
      kind: "PSEUDONATIVE",
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
      kind: "PSEUDONATIVE",
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

  // Trovounette, Email address
  // native

  const trovounetteEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: trovounette.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // Candi, Email address
  // native

  const candiEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: candi.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // D-Dan, Email address
  // native

  const dDanEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: dDan.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // El-Hadj, Email address
  // native

  const elHadjEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: elHadj.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // FioTriangle, Email address
  // native

  const fioTriangleEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: fioTriangle.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // Gracie-babie, Email address
  // native

  const gracieBabieEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: gracieBabie.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // Lucario, Email address
  // native

  const lucarioEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: lucario.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // MisterX, Email address
  // native

  const misterXEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: misterX.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // Nonyes, Email address
  // native

  const nonyesEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: nonyes.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // Ophelia-swan, Email address
  // native

  const opheliaSwanEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: opheliaSwan.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // Pimpampoum, Email address
  // native

  const pimpampoumEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: pimpampoum.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // WhoDidThatToYou, Email address
  // native

  const whoDidThatToYouEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: whoDidThatToYou.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // RG, Email address
  // native

  const rGEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: rG.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // TruePrince, Email address
  // native

  const truePrinceEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: truePrince.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // TheTitan, Email address
  // native

  const theTitanEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: theTitan.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // WhoDidThatToYou, Email address
  // native

  const blueCrowEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: blueCrow.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // LaVictoire, Email address
  // native

  const laVictoireEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: laVictoire.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // oftheWild, Email address
  // native

  const ofTheWildEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: ofTheWild.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
        },
      },
    },
  });

  // ResRevealed, Email address
  // native

  const resRevealedEmailAddress = await db.userQuestion.create({
    data: {
      state: "LIVE",
      user: {
        connect: {
          id: resRevealed.id,
        },
      },
      question: {
        connect: {
          id: emailAddress.id,
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

  console.log(`Seeding answers...`);

  // LePapier, First name
  // native / pinned
  // for preexisting native not irl (answer live)
  // when creating same native not irl criteria

  const lePapierFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Luther",
      userQuestion: {
        connect: {
          id: lePapierFirstName.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Last name
  // native / irl / pinned
  // for preexisting native irl (answer live)
  // when creating same native irl criteria

  const lePapierLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Tchofo Safo",
      userQuestion: {
        connect: {
          id: lePapierLastName.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // Alice-chan, First name
  // native / pinned

  const aliceChanFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Alice",
      userQuestion: {
        connect: {
          id: aliceChanFirstName.id,
        },
      },
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
    },
  });

  // Alice-chan, Last name
  // native / irl / pinned

  const aliceChanLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Perrini",
      userQuestion: {
        connect: {
          id: aliceChanLastName.id,
        },
      },
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
    },
  });

  // LePapier, Favorite actress
  // custom / shared (1)

  const lePapierFavoriteActressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Reese Witherspoon",
      userQuestion: {
        connect: {
          id: lePapierFavoriteActress.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // Alice-chan, Favorite actor
  // custom / shared (1)

  const aliceChanFavoriteActorAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Denzel Washington",
      userQuestion: {
        connect: {
          id: aliceChanFavoriteActor.id,
        },
      },
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
    },
  });

  // LePapier, Favorite actor
  // custom / not shared

  const lePapierFavoriteActorAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Will Smith",
      userQuestion: {
        connect: {
          id: lePapierFavoriteActor.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // Alice-chan, Favorite actress
  // custom / not shared

  const aliceChanFavoriteActressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Megan Fox",
      userQuestion: {
        connect: {
          id: aliceChanFavoriteActress.id,
        },
      },
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
    },
  });

  // Trovounette, First name
  // native / pinned

  const trovounetteFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Bianca",
      userQuestion: {
        connect: {
          id: trovounetteFirstName.id,
        },
      },
      user: {
        connect: {
          id: trovounette.id,
        },
      },
    },
  });

  // Trovounette, Last name
  // native / irl

  const trovounetteLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Trovò",
      userQuestion: {
        connect: {
          id: trovounetteLastName.id,
        },
      },
      user: {
        connect: {
          id: trovounette.id,
        },
      },
    },
  });

  // Candi, First name
  // native / pinned

  const candiFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Candice",
      userQuestion: {
        connect: {
          id: candiFirstName.id,
        },
      },
      user: {
        connect: {
          id: trovounette.id,
        },
      },
    },
  });

  // Candi, Last name
  // native / irl

  const candiLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Namubiru",
      userQuestion: {
        connect: {
          id: candiLastName.id,
        },
      },
      user: {
        connect: {
          id: candi.id,
        },
      },
    },
  });

  // D-Dan, First name
  // native / pinned

  const dDanFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Daniel",
      userQuestion: {
        connect: {
          id: dDanFirstName.id,
        },
      },
      user: {
        connect: {
          id: dDan.id,
        },
      },
    },
  });

  // D-Dan, Last name
  // native / irl

  const dDanLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Craig",
      userQuestion: {
        connect: {
          id: dDanLastName.id,
        },
      },
      user: {
        connect: {
          id: dDan.id,
        },
      },
    },
  });

  // El-Hadj, First name
  // native / pinned

  const elHadjFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Elijah",
      userQuestion: {
        connect: {
          id: elHadjFirstName.id,
        },
      },
      user: {
        connect: {
          id: elHadj.id,
        },
      },
    },
  });

  // El-Hadj, Last name
  // native / irl

  const elHadjLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Portgas",
      userQuestion: {
        connect: {
          id: elHadjLastName.id,
        },
      },
      user: {
        connect: {
          id: elHadj.id,
        },
      },
    },
  });

  // Lucario, First name
  // native / pinned

  const lucarioFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Lucas",
      userQuestion: {
        connect: {
          id: lucarioFirstName.id,
        },
      },
      user: {
        connect: {
          id: lucario.id,
        },
      },
    },
  });

  // Lucario, Last name
  // native / irl

  const lucarioLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Earthbound",
      userQuestion: {
        connect: {
          id: lucarioLastName.id,
        },
      },
      user: {
        connect: {
          id: lucario.id,
        },
      },
    },
  });

  // MisterX, First name
  // native / pinned

  const misterXFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Malcolm",
      userQuestion: {
        connect: {
          id: misterXFirstName.id,
        },
      },
      user: {
        connect: {
          id: misterX.id,
        },
      },
    },
  });

  // MisterX, Last name
  // native / irl

  const misterXLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Little",
      userQuestion: {
        connect: {
          id: misterXLastName.id,
        },
      },
      user: {
        connect: {
          id: misterX.id,
        },
      },
    },
  });

  // Nonyes, First name
  // native / pinned

  const nonyesFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Nancy",
      userQuestion: {
        connect: {
          id: nonyesFirstName.id,
        },
      },
      user: {
        connect: {
          id: nonyes.id,
        },
      },
    },
  });

  // Nonyes, Last name
  // native / irl

  const nonyesLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Commodore",
      userQuestion: {
        connect: {
          id: nonyesLastName.id,
        },
      },
      user: {
        connect: {
          id: nonyes.id,
        },
      },
    },
  });

  // Ophelia-swan, First name
  // native / pinned

  const opheliaSwanFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Ophelia",
      userQuestion: {
        connect: {
          id: opheliaSwanFirstName.id,
        },
      },
      user: {
        connect: {
          id: opheliaSwan.id,
        },
      },
    },
  });

  // Ophelia-swan, Last name
  // native / irl

  const opheliaSwanLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Rainbow",
      userQuestion: {
        connect: {
          id: opheliaSwanLastName.id,
        },
      },
      user: {
        connect: {
          id: opheliaSwan.id,
        },
      },
    },
  });

  // Pimpampoum, First name
  // native / pinned

  const pimpampoumFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Pamela",
      userQuestion: {
        connect: {
          id: pimpampoumFirstName.id,
        },
      },
      user: {
        connect: {
          id: pimpampoum.id,
        },
      },
    },
  });

  // Pimpampoum, Last name
  // native / irl

  const pimpampoumLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Nargacuga",
      userQuestion: {
        connect: {
          id: pimpampoumLastName.id,
        },
      },
      user: {
        connect: {
          id: pimpampoum.id,
        },
      },
    },
  });

  // WhoDidThatToYou, First name
  // native / pinned

  const whoDidThatToYouFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Quentin",
      userQuestion: {
        connect: {
          id: whoDidThatToYouFirstName.id,
        },
      },
      user: {
        connect: {
          id: whoDidThatToYou.id,
        },
      },
    },
  });

  // WhoDidThatToYou, Last name
  // native / irl

  const whoDidThatToYouLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Tartarino",
      userQuestion: {
        connect: {
          id: whoDidThatToYouLastName.id,
        },
      },
      user: {
        connect: {
          id: whoDidThatToYou.id,
        },
      },
    },
  });

  // RG, First name
  // native / pinned

  const rGFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Roland",
      userQuestion: {
        connect: {
          id: rGFirstName.id,
        },
      },
      user: {
        connect: {
          id: rG.id,
        },
      },
    },
  });

  // RG, Last name
  // native / irl

  const rGLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Gerric",
      userQuestion: {
        connect: {
          id: rGLastName.id,
        },
      },
      user: {
        connect: {
          id: rG.id,
        },
      },
    },
  });

  // TruePrince, First name
  // native / pinned

  const truePrinceFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Soren",
      userQuestion: {
        connect: {
          id: truePrinceFirstName.id,
        },
      },
      user: {
        connect: {
          id: truePrince.id,
        },
      },
    },
  });

  // TruePrince, Last name
  // native / irl

  const truePrinceLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Daein",
      userQuestion: {
        connect: {
          id: truePrinceLastName.id,
        },
      },
      user: {
        connect: {
          id: truePrince.id,
        },
      },
    },
  });

  // TheTitan, First name
  // native / pinned

  const theTitanFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Titus",
      userQuestion: {
        connect: {
          id: theTitanFirstName.id,
        },
      },
      user: {
        connect: {
          id: theTitan.id,
        },
      },
    },
  });

  // TheTitan, Last name
  // native / irl

  const theTitanLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Invictus",
      userQuestion: {
        connect: {
          id: theTitanLastName.id,
        },
      },
      user: {
        connect: {
          id: theTitan.id,
        },
      },
    },
  });

  // BlueCrow, First name
  // native / pinned

  const blueCrowFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Ursula",
      userQuestion: {
        connect: {
          id: blueCrowFirstName.id,
        },
      },
      user: {
        connect: {
          id: blueCrow.id,
        },
      },
    },
  });

  // BlueCrow, Last name
  // native / irl

  const blueCrowLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Black",
      userQuestion: {
        connect: {
          id: blueCrowLastName.id,
        },
      },
      user: {
        connect: {
          id: blueCrow.id,
        },
      },
    },
  });

  // LaVictoire, First name
  // native / pinned

  const laVictoireFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Victoria",
      userQuestion: {
        connect: {
          id: laVictoireFirstName.id,
        },
      },
      user: {
        connect: {
          id: laVictoire.id,
        },
      },
    },
  });

  // LaVictoire, Last name
  // native / irl

  const laVictoireLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Spice",
      userQuestion: {
        connect: {
          id: laVictoireLastName.id,
        },
      },
      user: {
        connect: {
          id: laVictoire.id,
        },
      },
    },
  });

  // oftheWild, First name
  // native / pinned

  const ofTheWildFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Wilda",
      userQuestion: {
        connect: {
          id: ofTheWildFirstName.id,
        },
      },
      user: {
        connect: {
          id: ofTheWild.id,
        },
      },
    },
  });

  // oftheWild, Last name
  // native / irl

  const ofTheWildLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Wilderness",
      userQuestion: {
        connect: {
          id: ofTheWildLastName.id,
        },
      },
      user: {
        connect: {
          id: ofTheWild.id,
        },
      },
    },
  });

  // ResRevealed, First name
  // native / pinned

  const resRevealedFirstNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Xenobia",
      userQuestion: {
        connect: {
          id: resRevealedFirstName.id,
        },
      },
      user: {
        connect: {
          id: resRevealed.id,
        },
      },
    },
  });

  // ResRevealed, Last name
  // native / irl

  const resRevealedLastNameAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Desistoria",
      userQuestion: {
        connect: {
          id: resRevealedLastName.id,
        },
      },
      user: {
        connect: {
          id: resRevealed.id,
        },
      },
    },
  });

  // LePapier, Email address
  // native

  const lePapierEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: lePapier.email,
      userQuestion: {
        connect: {
          id: lePapierEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Other email address
  // native
  // for preexisting native not irl (answer deleted)
  // when creating same native not irl criteria

  const lePapierOtherEmailAddressAnswer = await db.answer.create({
    data: {
      state: "DELETED",
      value: "l@l.app",
      userQuestion: {
        connect: {
          id: lePapierOtherEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Address
  // native / irl

  const lePapierAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "219 rue Bellevue, Studio B, 50000 Saint-Lô",
      userQuestion: {
        connect: {
          id: lePapierAddress.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Other address
  // native / irl
  // for preexisting native irl (answer deleted)
  // when creating same native irl criteria

  const lePapierOtherAddressAnswer = await db.answer.create({
    data: {
      state: "DELETED",
      value: "something something Shadowbriar",
      userQuestion: {
        connect: {
          id: lePapierOtherAddress.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // Alice-chan, Email address
  // native / HIDDEN

  const aliceChanEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: aliceChan.email,
      userQuestion: {
        connect: {
          id: aliceChanEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
    },
  });

  // Alice-chan, Address
  // native / irl

  const aliceChanAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "something something Wonderland",
      userQuestion: {
        connect: {
          id: aliceChanAddress.id,
        },
      },
      user: {
        connect: {
          id: aliceChan.id,
        },
      },
    },
  });

  // LePapier, Birthday
  // pseudonative / pinned
  // for preexisting pseudonative not irl (answer live)
  // when creating same pseudonative not irl criteria

  const lePapierBirthdayAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "January 1",
      userQuestion: {
        connect: {
          id: lePapierBirthday.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Mother's birthday
  // pseudonative
  // for preexisting pseudonative not irl (answer deleted)
  // when creating same pseudonative not irl criteria

  const lePapierMothersBirthdayAnswer = await db.answer.create({
    data: {
      state: "DELETED",
      value: "April 1",
      userQuestion: {
        connect: {
          id: lePapierMothersBirthday.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Girlfriend's birthday
  // pseudonative / irl
  // for preexisting pseudonative irl (answer live)
  // when creating same pseudonative not irl criteria

  const lePapierGirlfriendsBirthdayAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "August 1",
      userQuestion: {
        connect: {
          id: lePapierGirlfriendsBirthday.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Crush's birthday
  // pseudonative / irl
  // for preexisting pseudonative irl (answer deleted)
  // when creating same pseudonative not irl criteria

  const lePapierCrushsBirthdayAnswer = await db.answer.create({
    data: {
      state: "DELETED",
      value: "November 1",
      userQuestion: {
        connect: {
          id: lePapierCrushsBirthday.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Birthdate
  // pseudonative / irl / pinned
  // for preexisting pseudonative irl (answer live)
  // when creating same pseudonative irl criteria

  const lePapierBirthdateAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "January 1, 1990",
      userQuestion: {
        connect: {
          id: lePapierBirthdate.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Mother's birthdate
  // pseudonative / irl
  // for preexisting pseudonative irl (answer deleted)
  // when creating same pseudonative irl criteria

  const lePapierMothersBirthdateAnswer = await db.answer.create({
    data: {
      state: "DELETED",
      value: "April 1, 1960",
      userQuestion: {
        connect: {
          id: lePapierMothersBirthdate.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Girlfriend's birthdate
  // pseudonative
  // for preexisting pseudonative not irl (answer live)
  // when creating same pseudonative irl criteria

  const lePapierGirlfriendsBirthdateAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "August 1, 1990",
      userQuestion: {
        connect: {
          id: lePapierGirlfriendsBirthdate.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Crush's birthdate
  // pseudonative
  // for preexisting pseudonative not irl (answer deleted)
  // when creating same pseudonative irl criteria

  const lePapierCrushsBirthdateAnswer = await db.answer.create({
    data: {
      state: "DELETED",
      value: "November 1, 2000",
      userQuestion: {
        connect: {
          id: lePapierCrushsBirthdate.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Favorite anime character
  // custom / not shared / pinned

  const lePapierFavoriteAnimeCharacterAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Kaidzuka Inaho",
      userQuestion: {
        connect: {
          id: lePapierFavoriteAnimeCharacter.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Favorite anime waifu
  // custom / shared (2) / pinned
  // (1 UserQuestionFriend 'DELETED')

  const lePapierFavoriteAnimeWaifuAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Mikasa Ackerman",
      userQuestion: {
        connect: {
          id: lePapierFavoriteAnimeWaifu.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Favorite anime series
  // custom / not shared
  // for preexisting custom (answer live)
  // when creating same custom criteria

  const lePapierFavoriteAnimeSeriesAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: "Mobile Suit Gundam 00",
      userQuestion: {
        connect: {
          id: lePapierFavoriteAnimeSeries.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // LePapier, Favorite anime franchise
  // custom / not shared
  // for preexisting custom (answer deleted)
  // when creating same custom criteria

  const lePapierFavoriteAnimeFranchiseAnswer = await db.answer.create({
    data: {
      state: "DELETED",
      value: "Mobile Suit Gundam",
      userQuestion: {
        connect: {
          id: lePapierFavoriteAnimeFranchise.id,
        },
      },
      user: {
        connect: {
          id: lePapier.id,
        },
      },
    },
  });

  // Trovounette, Email address
  // native

  const trovounetteEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: trovounette.email,
      userQuestion: {
        connect: {
          id: trovounetteEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: trovounette.id,
        },
      },
    },
  });

  // Candi, Email address
  // native

  const candiEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: candi.email,
      userQuestion: {
        connect: {
          id: candiEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: candi.id,
        },
      },
    },
  });

  // D-Dan, Email address
  // native

  const dDanEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: dDan.email,
      userQuestion: {
        connect: {
          id: dDanEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: dDan.id,
        },
      },
    },
  });

  // El-Hadj, Email address
  // native

  const elHadjEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: elHadj.email,
      userQuestion: {
        connect: {
          id: elHadjEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: elHadj.id,
        },
      },
    },
  });

  // FioTriangle, Email address
  // native

  const fioTriangleEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: fioTriangle.email,
      userQuestion: {
        connect: {
          id: fioTriangleEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: fioTriangle.id,
        },
      },
    },
  });

  // Gracie-babie, Email address
  // native

  const gracieBabieEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: gracieBabie.email,
      userQuestion: {
        connect: {
          id: gracieBabieEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: gracieBabie.id,
        },
      },
    },
  });

  // Lucario, Email address
  // native

  const lucarioEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: lucario.email,
      userQuestion: {
        connect: {
          id: lucarioEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: lucario.id,
        },
      },
    },
  });

  // MisterX, Email address
  // native

  const misterXEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: misterX.email,
      userQuestion: {
        connect: {
          id: misterXEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: misterX.id,
        },
      },
    },
  });

  // Nonyes, Email address
  // native

  const nonyesEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: nonyes.email,
      userQuestion: {
        connect: {
          id: nonyesEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: nonyes.id,
        },
      },
    },
  });

  // Ophelia-swan, Email address
  // native

  const opheliaSwanEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: opheliaSwan.email,
      userQuestion: {
        connect: {
          id: opheliaSwanEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: opheliaSwan.id,
        },
      },
    },
  });

  // Pimpampoum, Email address
  // native

  const pimpampoumEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: pimpampoum.email,
      userQuestion: {
        connect: {
          id: pimpampoumEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: pimpampoum.id,
        },
      },
    },
  });

  // WhoDidThatToYou, Email address
  // native

  const whoDidThatToYouEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: whoDidThatToYou.email,
      userQuestion: {
        connect: {
          id: whoDidThatToYouEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: whoDidThatToYou.id,
        },
      },
    },
  });

  // RG, Email address
  // native

  const rGEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: rG.email,
      userQuestion: {
        connect: {
          id: rGEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: rG.id,
        },
      },
    },
  });

  // TruePrince, Email address
  // native

  const truePrinceEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: truePrince.email,
      userQuestion: {
        connect: {
          id: truePrinceEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: truePrince.id,
        },
      },
    },
  });

  // TheTitan, Email address
  // native

  const theTitanEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: theTitan.email,
      userQuestion: {
        connect: {
          id: theTitanEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: theTitan.id,
        },
      },
    },
  });

  // BlueCrow, Email address
  // native

  const blueCrowEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: blueCrow.email,
      userQuestion: {
        connect: {
          id: blueCrowEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: blueCrow.id,
        },
      },
    },
  });

  // LaVictoire, Email address
  // native

  const laVictoireEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: laVictoire.email,
      userQuestion: {
        connect: {
          id: laVictoireEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: laVictoire.id,
        },
      },
    },
  });

  // oftheWild, Email address
  // native

  const ofTheWildEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: ofTheWild.email,
      userQuestion: {
        connect: {
          id: ofTheWildEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: ofTheWild.id,
        },
      },
    },
  });

  // ResRevealed, Email address
  // native

  const resRevealedEmailAddressAnswer = await db.answer.create({
    data: {
      state: "LIVE",
      value: resRevealed.email,
      userQuestion: {
        connect: {
          id: resRevealedEmailAddress.id,
        },
      },
      user: {
        connect: {
          id: resRevealed.id,
        },
      },
    },
  });

  console.log(`Answers seeds complete.`);

  console.log(`Initial seeds complete.`);
}

seed();

// rm ./prisma/dev.db
// npx prisma db push
// node prisma/seeds.js

// npx prisma studio
