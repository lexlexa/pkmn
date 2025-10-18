import { Button, Drawer } from "antd";
import styles from "./PokeballForm.module.css";
import { useState, type FC } from "react";
import { PokeballFilaments } from "./components/PokeballsFilament/PokeballsFilament";
import { PokeballsPrice } from "./components/PokeballsPrice/PokeballsPrice";
import { PokeballsImages } from "./components/PokeballsImages/PokeballsImages";
import { pokeballsFxs, type TPokeball, type TPokeballFilament } from "../../../../store";
import { generateUUID } from "../../../../../Sale/helpers";
import { FormInput } from "../../../../../../components/Form/components/Input/Input";

type Props = {
  open: boolean;
  onClose: () => void;
  item?: TPokeball;
};

export const PokeballForm: FC<Props> = ({ open, onClose, item }) => {
  const [name, setName] = useState(item?.name || "");
  const [number, setNumber] = useState(item?.pokedexIndex || "");
  const [files, setFiles] = useState<string[]>(item?.images || []);
  const [filament, setFilament] = useState<Partial<TPokeballFilament>[]>(
    item?.filament || [{}]
  );
  const [price, setPrice] = useState<number | string | null>(item?.price || null);

  const filamentTotal = filament.reduce(
    (acc, curr) => acc + Number(curr.count || 0),
    0
  );

  const handleCreate = async () => {
    const data: TPokeball = {
      name,
      pokedexIndex: number,
      filament: filament as TPokeballFilament[],
      images: files,
      price: Number(price || 0),
      id: generateUUID(),
    };

    await pokeballsFxs.createFx(data);
    onClose();
  };
  const handleEdit = async () => {
    const data: TPokeball = {
      id: item!.id,
      name,
      pokedexIndex: number,
      filament: filament as TPokeballFilament[],
      images: files,
      price: Number(price || 0),
    };

    await pokeballsFxs.updateFx(data);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <div className={styles.form}>
        <FormInput
          label="Название"
          onChange={setName}
          placeholder="Bulbasaur"
          value={name}
        />
        <FormInput
          label="Номер в Pokedex"
          onChange={setNumber}
          value={number}
        />
        <PokeballFilaments items={filament} onChange={setFilament} />
        <PokeballsImages files={files} setFiles={setFiles} />
        <PokeballsPrice
          filamentTotal={filamentTotal}
          price={price}
          setPrice={setPrice}
        />
        <Button onClick={item ? handleEdit : handleCreate}>Сохранить</Button>
      </div>
    </Drawer>
  );
};
