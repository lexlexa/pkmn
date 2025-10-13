export type TPokeballFilament = {
  id: string;
  color: string;
  count: number;
  name: string;
};

export type TPokeball = {
  id: string;
  pokedexIndex: string;
  tags: string[];
  name: string;
  filament: TPokeballFilament[];
  images: string[];
};
