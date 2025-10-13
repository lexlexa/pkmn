import {
  Expansions,
  ExpansionsShortName,
  ExpansionsInSDK,
} from "../constants/expansions.ts";

export type Expansion = {
  [key: string]: Card[];
};

export type ParsedExpansions = Partial<Record<Expansions, Expansion>>;

export type RawCard = {
  expansion: Expansions;
  short_expansion: (typeof ExpansionsShortName)[keyof typeof ExpansionsShortName];
  expansion_slug: (typeof ExpansionsInSDK)[keyof typeof ExpansionsInSDK];
  number: string;
  name: string;
  rarity: string;
  variant: string;
  count: number;
};

export type Card = RawCard & {
  images: {
    card: string;
    expansion: string;
  };
};
