import { Button, Flex, Input } from "antd";
import { withLayout } from "../../hocs/withLayout";
import { PokeballForm } from "./components/PokeballForm/PokeballForm";
import { PokeballItem } from "./components/PokeballItem/PokeballItem";
import {
  DatabaseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./Pokeballs.module.css";
import { Filaments } from "./components/Filaments/Filaments";
import { useEffect, useState } from "react";
import { $pokeballs, configsFxs, filamentsFxs, pokeballsFxs } from "./store";
import { useModal } from "../../helpers/useModal";
import { Configs } from "./components/Configs/Configs";
import { useUnit } from "effector-react";
import { useSearch } from "../../helpers/useSearch";
export const Pokeballs = withLayout(() => {
  const [isOpenFilaments, openFilaments, closeFilaments] = useModal();
  const [isOpenConfigs, openConfigs, closeConfigs] = useModal();
  const [isOpenEditForm, openEditing, closeEditing] = useModal();
  const [editId, setEditId] = useState<string | null>(null);
  const pokeballs = useUnit($pokeballs);

  const [search, onChangeSearch, filteredPokeballs] = useSearch(
    pokeballs,
    (item, s) => item.name.toLowerCase().includes(s)
  );

  const handleEditPokeball = (id: string) => {
    openEditing();
    setEditId(id);
  };

  const handleCancelEditPokeball = () => {
    closeEditing();
    setEditId(null);
  };

  const handleCreatePokeball = () => {
    openEditing();
    setEditId(null);
  };

  useEffect(() => {
    filamentsFxs.readFx();
    configsFxs.readFx();
    pokeballsFxs.readFx();
  }, []);

  const editingItem = pokeballs.find((item) => item.id === editId);

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
        <Flex gap={8}>
          <Button onClick={handleCreatePokeball} icon={<PlusOutlined />}>
            Создать
          </Button>
          <Button onClick={openFilaments} icon={<DatabaseOutlined />}>
            Филамент
          </Button>
          <Button onClick={openConfigs} icon={<SettingOutlined />} />
        </Flex>
      </div>
      <Flex wrap gap={16}>
        {filteredPokeballs.map((item) => (
          <PokeballItem item={item} onEdit={handleEditPokeball} />
        ))}
      </Flex>

      <PokeballForm
        key={editingItem ? "true" : "false"}
        item={editingItem}
        open={isOpenEditForm}
        onClose={handleCancelEditPokeball}
      />
      <Filaments open={isOpenFilaments} onClose={closeFilaments} />
      <Configs open={isOpenConfigs} onClose={closeConfigs} />
    </div>
  );
});
