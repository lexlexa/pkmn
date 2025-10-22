import { Button, Flex, Tabs } from "antd";
import { withLayout } from "../../hocs/withLayout";
// import { PokeballForm } from "./components/PokeballForm/PokeballForm";
// import { PokeballItem } from "./components/PokeballItem/PokeballItem";
import { useEffect, useState } from "react";
import {
  $pokeballs,
  configsFxs,
  filamentsFxs,
  ordersFxs,
  pokeballsFxs,
} from "./store";
import { Catalog } from "./components/Catalog/Catalog";
import {
  DatabaseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useModal } from "../../helpers/useModal";
import { PokeballForm } from "./components/Catalog/components/PokeballForm/PokeballForm";
import { Filaments } from "./components/Filaments/Filaments";
import { Configs } from "./components/Configs/Configs";
import { OrderForm } from "./components/Catalog/components/OrderForm/OrderForm";
import { useUnit } from "effector-react";
import { Orders } from "./components/Orders/Orders";
export const Pokeballs = withLayout(() => {
  const [isOpenFilaments, openFilaments, closeFilaments] = useModal();
  const [isOpenConfigs, openConfigs, closeConfigs] = useModal();
  const [isOpenEditForm, openEditing, closeEditing] = useModal();
  const [isOpenOrderForm, openCreatingOrder, closeCreatingOrder] = useModal();
  const [editId, setEditId] = useState<string | null>(null);
  const pokeballs = useUnit($pokeballs);

  const editingItem = pokeballs.find((item) => item.id === editId);

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
    ordersFxs.readFx();
  }, []);

  return (
    <Flex style={{ width: "100%" }}>
      <Tabs
        style={{ width: "100%" }}
        items={[
          {
            key: "catalog",
            label: "Каталог",
            children: <Catalog onEdit={handleEditPokeball} />,
          },
          {
            key: "orders",
            label: "Заказы",
            children: <Orders />,
          },
        ]}
        tabBarExtraContent={
          <Flex gap={8}>
            <Button onClick={handleCreatePokeball} icon={<PlusOutlined />}>
              Создать
            </Button>
            <Button onClick={openCreatingOrder} icon={<PlusOutlined />}>
              Создать
            </Button>
            <Button onClick={openFilaments} icon={<DatabaseOutlined />}>
              Филамент
            </Button>
            <Button onClick={openConfigs} icon={<SettingOutlined />} />
          </Flex>
        }
      />

      <PokeballForm
        key={
          editingItem
            ? `pokeball-edit-${isOpenEditForm}`
            : `pokeball-${isOpenEditForm}`
        }
        item={editingItem}
        open={isOpenEditForm}
        onClose={handleCancelEditPokeball}
      />
      <Filaments open={isOpenFilaments} onClose={closeFilaments} />
      <Configs open={isOpenConfigs} onClose={closeConfigs} />
      <OrderForm
        key={isOpenOrderForm ? "order-true" : "order-false"}
        open={isOpenOrderForm}
        onClose={closeCreatingOrder}
      />
    </Flex>
  );
});
