const fixedStrs = [
  ["25th Anniversary, Jumbo Size", "25th Anniversary - Jumbo Size"],
];

export const getCardImage = (expansion, number) => {
  return `https://images.pokemontcg.io/${expansion}/${number}.png`;
};

export const getExpansionImage = (expansion) => {
  return `https://images.pokemontcg.io/${expansion}/symbol.png`;
};

export const ExpansionsInSDK = {
  // SV
  "Scarlet & Violet Promos": "svp",
  "Scarlet & Violet": "sv1",
  "Paldea Evolved": "sv2",
  "Obsidian Flames": "sv3",
  "Scarlet & Violet 151": "sv3pt5",
  "Paradox Rift": "sv4",
  "Temporal Forces": "sv5",
  "Paldean Fates": "sv4pt5",
  "Twilight Masquerade": "sv6",
  "Shrouded Fable": "sv6pt5",
  "Stellar Crown": "sv7",
  "Prismatic Evolutions": "sv8pt5",
  "Surging Sparks": "sv8",
  "Journey Together": "sv9",
  "Destined Rivals": "sv10",
  // // SWSH
  "Crown Zenith": "swsh12pt5",
  "Rebel Clash": "swsh2",
  "Pokémon GO": "pgo",
  Celebrations: "cel25",
  "Vivid Voltage": "swsh4",
  "Shining Fates": "swsh45",
  "Battle Styles": "swsh5",
  "Chilling Reign": "swsh6",
  "Evolving Skies": "swsh7",
  "Fusion Strike": "swsh8",
  "Brilliant Stars": "swsh9",
  "Astral Radiance": "swsh10",
  "Lost Origin": "swsh11",
  "Silver Tempest": "swsh12",
  "Champion's Path": "swsh35",
  "Darkness Ablaze": "swsh3",
  "Sword & Shield": "swsh1",
  "Sword & Shield Promos": "swshp",
  "Cosmic Eclipse": "sm12",
  "Crimson Invasion": "sm4",
  "Burning Shadows": "sm3",
  "Guardians Rising": "sm2",
  "Sun & Moon": "det1",
  "Sun & Moon Promos": "smp",
  "Steam Siege": "xy11",
  "Roaring Skies": "xy6",
  "XY Promos": "xyp",
};

export const ExpansionsShortName = {
  // SV
  "Scarlet & Violet Promos": "SVP",
  "Scarlet & Violet": "SVI",
  "Paldea Evolved": "PAL",
  "Obsidian Flames": "OBF",
  "Scarlet & Violet 151": "MEW",
  "Paradox Rift": "PAR",
  "Temporal Forces": "TEF",
  "Paldean Fates": "PAF",
  "Twilight Masquerade": "TWM",
  "Shrouded Fable": "SFA",
  "Stellar Crown": "SCR",
  "Prismatic Evolutions": "PRE",
  "Surging Sparks": "SSP",
  "Journey Together": "JTG",
  "Destined Rivals": "DRI",
  // // SWSH
  "Crown Zenith": "CRZ",
  "Rebel Clash": "RCL",
  "Pokémon GO": "PGO",
  Celebrations: "CEL",
  "Vivid Voltage": "VIV",
  "Shining Fates": "SHF",
  "Battle Styles": "BST",
  "Chilling Reign": "CRE",
  "Evolving Skies": "EVS",
  "Fusion Strike": "FST",
  "Brilliant Stars": "BRS",
  "Astral Radiance": "ASR",
  "Lost Origin": "LOR",
  "Silver Tempest": "SIT",
  "Champion's Path": "CPA",
  "Darkness Ablaze": "DAA",
  "Sword & Shield": "SSH",
  "Sword & Shield Promos": "SSP",
  "Cosmic Eclipse": "CES",
  "Crimson Invasion": "CIN",
  "Burning Shadows": "BUS",
  "Guardians Rising": "GRI",
  "Sun & Moon": "SUM",
  "Sun & Moon Promos": "SMP",
  "Steam Siege": "STS",
  "Roaring Skies": "ROS",
  "XY Promos": "XYP",
};

export const parseCSV = (csv) => {
  const rows = csv.trim().split("\n").slice(1); // Пропускаем заголовок

  const parsed = rows.map((row) => {
    const [fixable, toFix] = fixedStrs.find((i) => row.includes(i[0])) || [];
    if (fixable) {
      row = row.replace(fixable, toFix);
    }

    const [, expansion, number, , name, rarity, variant, , , , count] =
      row.split(",");
    const exp = expansion.replaceAll('"', "");
    const card = {
      expansion: exp,
      short_expansion: ExpansionsShortName[exp],
      expansion_slug: ExpansionsInSDK[exp],
      number,
      name: name.replaceAll('"', ""),
      rarity: rarity.replaceAll('"', ""),
      variant: variant.replaceAll('"', ""),
      count: parseInt(count),
    };

    const cardImage = getCardImage(
      ExpansionsInSDK[card.expansion],
      card.number.includes("/")
        ? Number(card.number.split("/")[0])
        : card.number
    );
    const expansionImage = getExpansionImage(ExpansionsInSDK[card.expansion]);
    card.images = {
      card: cardImage,
      expansion: expansionImage,
    };
    return card;
  });

  const parsedByExpansion = parsed.reduce((acc, card) => {
    if (!acc[card.expansion]) {
      acc[card.expansion] = {};
    }
    if (!acc[card.expansion][card.number]) {
      acc[card.expansion][card.number] = [];
    }
    acc[card.expansion][card.number].push(card);
    return acc;
  }, {});

  return { byExpansion: parsedByExpansion, count: parsed.length };
};
