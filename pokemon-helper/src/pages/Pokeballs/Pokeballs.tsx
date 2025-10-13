import { withLayout } from "../../hocs/withLayout";
import { PokeballForm } from "./components/PokeballForm/PokeballForm";
import { PokeballItem } from "./components/PokeballItem/PokeballItem";

export const Pokeballs = withLayout(() => {
  return (
    <div>
      <PokeballItem
        item={{
          name: "Bulbasaur",
          pokedexIndex: "1",
          id: "1",
          tags: ["test", "test2", "test3"],
          filament: [{ id: "1", color: "green", count: 10, name: "Green" }],
          images: [],
        }}
      />
      <PokeballForm />
    </div>
  );
});
