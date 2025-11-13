import { Flex, Input, Select } from "antd";
import styles from "./Catalog.module.css";

import { useMemo, useState, type FC } from "react";

import { useUnit } from "effector-react";

import { $pokeballs } from "../../store";
import { useSearch } from "../../../../helpers/useSearch";
import { PokeballItem } from "./components/PokeballItem/PokeballItem";

type Props = {
  onEdit: (id: string) => void;
};

enum SortVariants {
  NAME = 'name',
  POKEDEX = 'pokedex'
}

export const Catalog: FC<Props> = ({ onEdit }) => {
  const pokeballs = useUnit($pokeballs);
  const [sort, setSort] = useState<SortVariants | null>(null)

  const [search, onChangeSearch, filteredPokeballs] = useSearch(
    pokeballs,
    (item, s) => item.name.toLowerCase().includes(s)
  );

  const sortOptions = [
    { label: 'По названию', value: SortVariants.NAME },
    { label: 'По номеру', value: SortVariants.POKEDEX }
  ]

  const items = useMemo(() => {
    if (sort === SortVariants.POKEDEX) return [...filteredPokeballs].sort((a, b) => Number(a.pokedexIndex) > Number(b.pokedexIndex) ? -1 : 1)
    if (sort === SortVariants.NAME) return [...filteredPokeballs].sort((a, b) => a.name > b.name ? 1 : -1)
    return filteredPokeballs
  }, [filteredPokeballs, sort])

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Flex gap={8}>
          <Input
            allowClear
            value={search}
            onChange={onChangeSearch}
            placeholder="Поиск"
            style={{ width: 200 }}
          />
          <Select value={sort} style={{ width: 200 }} allowClear onChange={setSort} options={sortOptions} placeholder="Без сортировки" />
        </Flex>
      </div>
      <Flex wrap gap={16}>
        {items.map((item) => (
          <PokeballItem item={item} onEdit={onEdit} />
        ))}
      </Flex>
    </div>
  );
};
