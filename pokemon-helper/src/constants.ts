import common from "./assets/common.svg";
import doubleRare from "./assets/double-rare.svg";
import hyperRare from "./assets/hyper-rare.svg";
import illustationRare from "./assets/illustration-rare.svg";
import promo from "./assets/promo.svg";
import rareHolo from "./assets/rare-holo.svg";
import rareSecret from "./assets/rare-secret.svg";
import rare from "./assets/rare.svg";
import ultraRare from "./assets/ultra-rare.svg";
import uncommon from "./assets/uncommon.svg";

export enum CardVariants {
  NORMAL = "Normal",
  NORMAL_HOLO = "Normal Holo",
  REVERSE_HOLO = "Reverse Holo",
}

export enum CardRarities {
  COMMON = "Common",
  UNCOMMON = "Uncommon",
  RARE = "Rare",
  RARE_HOLO = "Rare Holo",
  DOUBLE_RARE = "Double Rare",
  ILLUSTRATION_RARE = "Illustration Rare",
  ULTRA_RARE = "Ultra Rare",
  HYPER_RARE = "Hyper Rare",
  RARE_SECRET = "Rare Secret",
  PROMO = "Promo",
}

export const IconByRare = {
  [CardRarities.COMMON]: common,
  [CardRarities.UNCOMMON]: uncommon,
  [CardRarities.RARE]: rare,
  [CardRarities.RARE_HOLO]: rareHolo,
  [CardRarities.DOUBLE_RARE]: doubleRare,
  [CardRarities.ILLUSTRATION_RARE]: illustationRare,
  [CardRarities.ULTRA_RARE]: ultraRare,
  [CardRarities.HYPER_RARE]: hyperRare,
  [CardRarities.RARE_SECRET]: rareSecret,
  [CardRarities.PROMO]: promo,
};
