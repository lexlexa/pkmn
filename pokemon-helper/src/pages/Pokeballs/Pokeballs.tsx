import { Button, Flex, Tabs } from "antd";
import { withLayout } from "../../hocs/withLayout";
// import { PokeballForm } from "./components/PokeballForm/PokeballForm";
// import { PokeballItem } from "./components/PokeballItem/PokeballItem";
import { useEffect, useState } from "react";
import {
  $pokeballs,
  configsFxs,
  ordersFxs,
  pokeballsFxs,
} from "./store";
import {
  SettingOutlined,
} from "@ant-design/icons";
import { useModal } from "../../helpers/useModal";
import { PokeballForm } from "./components/Catalog/components/PokeballForm/PokeballForm";
import { Filaments } from "./components/Filaments/Filaments";
import { Configs } from "./components/Configs/Configs";
import { OrderForm } from "./components/Catalog/components/OrderForm/OrderForm";
import { useUnit } from "effector-react";
import { Orders } from "./components/Orders/Orders";
import { Items } from "./components/Items/Items";
import { Filament } from "./components/Filament/Filament";
import { filamentBrandsFxs, filamentTypesFxs, filamentsFxs } from "./store/filaments";
export const Pokeballs = withLayout(() => {
  const [isOpenFilaments, _openFilaments, closeFilaments] = useModal();
  const [isOpenConfigs, openConfigs, closeConfigs] = useModal();
  const [isOpenEditForm, _openEditing, closeEditing] = useModal();
  const [isOpenOrderForm, _openCreatingOrder, closeCreatingOrder] = useModal();
  const [editId, setEditId] = useState<string | null>(null);
  const [_selectedTab, setSelectedTab] = useState<string>('pokeballs');
  const pokeballs = useUnit($pokeballs);

  const editingItem = pokeballs.find((item) => item.id === editId);

  // const handleEditPokeball = (id: string) => {
  //   openEditing();
  //   setEditId(id);
  // };

  const handleCancelEditPokeball = () => {
    closeEditing();
    setEditId(null);
  };

  // const handleCreatePokeball = () => {
  //   openEditing();
  //   setEditId(null);
  // };

  useEffect(() => {
    filamentBrandsFxs.readFx()
    filamentTypesFxs.readFx()
    filamentsFxs.readFx()
  }, [])

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
        onChange={setSelectedTab}
        items={[
          // {
          //   key: "pokeballs",
          //   label: "Каталог покеболов",
          //   children: <Catalog onEdit={handleEditPokeball} />,
          // },
          {
            key: "catalog",
            label: "Каталог",
            children: <Items />,
          },
          {
            key: "orders",
            label: "Заказы",
            children: <Orders />,
          },
          {
            key: "filaments",
            label: "Филамент",
            children: <Filament />,
          },
        ]}
        tabBarExtraContent={
          <Flex gap={8}>
            {/* {selectedTab === 'pokeballs' && <Button onClick={handleCreatePokeball} icon={<PlusOutlined />}>
              Создать покеболл
            </Button>} */}
            {/* <Button onClick={openCreatingOrder} icon={<PlusOutlined />}>
              Создать заказ
            </Button> */}
            {/* <Button onClick={openFilaments} icon={<DatabaseOutlined />}>
              Филамент
            </Button> */}
            <Button onClick={openConfigs} icon={<SettingOutlined />} />
          </Flex>
        }
      />

      <PokeballForm
        key={`${editId}-${isOpenEditForm}`}
        item={editingItem}
        open={isOpenEditForm}
        onClose={handleCancelEditPokeball}
      />
      <Filaments open={isOpenFilaments} onClose={closeFilaments} />
      <Configs open={isOpenConfigs} onClose={closeConfigs} />
      <OrderForm
        open={isOpenOrderForm}
        onClose={closeCreatingOrder}
        key={`${isOpenOrderForm}`}
      />
    </Flex>
  );
});
