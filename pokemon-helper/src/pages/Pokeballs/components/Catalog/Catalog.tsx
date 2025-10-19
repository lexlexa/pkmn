import { Flex, Input } from "antd";
import styles from "./Catalog.module.css";

import { type FC } from "react";

import { useUnit } from "effector-react";

import { $pokeballs } from "../../store";
import { useSearch } from "../../../../helpers/useSearch";
import { PokeballItem } from "./components/PokeballItem/PokeballItem";

type Props = {
  onEdit: (id: string) => void;
};

export const Catalog: FC<Props> = ({ onEdit }) => {
  const pokeballs = useUnit($pokeballs);

  const [search, onChangeSearch, filteredPokeballs] = useSearch(
    pokeballs,
    (item, s) => item.name.toLowerCase().includes(s)
  );

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Flex>
          <Input
            allowClear
            value={search}
            onChange={onChangeSearch}
            placeholder="Поиск"
          />
        </Flex>
      </div>
      <Flex wrap gap={16}>
        {filteredPokeballs.map((item) => (
          <PokeballItem item={item} onEdit={onEdit} />
        ))}
      </Flex>
    </div>
  );
};
