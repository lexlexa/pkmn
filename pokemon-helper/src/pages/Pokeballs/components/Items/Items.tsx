import { useEffect } from "react"
import { categoriesFxs, itemsFxs } from "../../store/items"
import { Button, Flex } from "antd"
import { CategoryForm } from "./components/CategoryForm/CategoryForm"
import { ItemForm } from "./components/ItemForm/ItemForm"
import { ItemsList } from "./components/ItemsList/ItemsList"
import { CategoryModal, ItemModal } from "./store/ui"
import { DrawerWithEffector } from "../../../../helpers/effector-modal"
import { CategoriesList } from "./components/CategoriesList/CategoriesList"


export const Items = () => {


    useEffect(() => {
        categoriesFxs.readFx()
        itemsFxs.readFx()
    }, [])


    return <Flex vertical gap={16}>
        <Flex gap={16}>
            <Button onClick={CategoryModal.openModal}>Создать категорию</Button>
            <Button onClick={ItemModal.openModal}>Создать товар</Button>
        </Flex>
        <Flex gap={16} align="flex-start">
            <CategoriesList />
            <ItemsList />
        </Flex>
        <DrawerWithEffector data={CategoryModal}>
            {(id) => <CategoryForm id={Number(id)} onClose={CategoryModal.closeModal} />}
        </DrawerWithEffector>
        <DrawerWithEffector data={ItemModal}>
            {(id) => <ItemForm id={Number(id)} onClose={ItemModal.closeModal} />}
        </DrawerWithEffector>
    </Flex>
}