import { Flex, Tabs } from "antd";
import { withLayout } from "../../hocs/withLayout";
// import { PokeballForm } from "./components/PokeballForm/PokeballForm";
// import { PokeballItem } from "./components/PokeballItem/PokeballItem";
import { useEffect } from "react";
import { configsFxs, filamentsFxs, pokeballsFxs } from "./store";
import { Catalog } from "./components/Catalog/Catalog";
export const Pokeballs = withLayout(() => {

  useEffect(() => {
    filamentsFxs.readFx();
    configsFxs.readFx();
    pokeballsFxs.readFx();
  }, []);

  return <Flex>
    <Tabs items={[
      {
        key: 'catalog',
        label: 'Каталог',
        children: <Catalog />
      },
      {
        key: 'orders',
        label: 'Заказы',
        children: 'Заказы'
      }
    ]} />
  </Flex>
})
