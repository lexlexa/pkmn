import { useEffect } from "react"
import { $categories, $categoryById, categoriesFxs, itemsFxs } from "../../store/items"
import { useUnit } from "effector-react"
import { Button, Flex, Tree } from "antd"
import { getAllCategoriesIdsForTree, transformCategoriesToTreeData } from "./helpers/categories"
import { CategoryForm } from "./components/CategoryForm/CategoryForm"
import { ItemForm } from "./components/ItemForm/ItemForm"
import { useItems } from "./hooks/useItems"
import { ItemsList } from "./components/ItemsList/ItemsList"
import { CategoryModal, changeCategory, ItemModal } from "./store/ui"
import { DrawerWithEffector } from "../../../../helpers/effector-modal"


export const Items = () => {
    const categories = useUnit($categories)
    const categoryById = useUnit($categoryById)

    const { selectedCategory } = useItems()

    useEffect(() => {
        categoriesFxs.readFx()
        itemsFxs.readFx()
    }, [])

    const categoriesTree = transformCategoriesToTreeData(categories)
    const allCategoriesKeys = getAllCategoriesIdsForTree(categoriesTree)
    const selectedCategoryData = selectedCategory ? categoryById[selectedCategory] : undefined

    return <Flex vertical gap={16}>
        <Flex gap={16}>
            <Button onClick={CategoryModal.openModal}>Создать категорию</Button>
            <Button onClick={ItemModal.openModal}>Создать товар</Button>
            {!!selectedCategoryData && <Button onClick={() => CategoryModal.openEditModal(selectedCategoryData.id)}>Редактировать категорию</Button>}
        </Flex>
        <Flex>
            <Flex style={{ width: 300 }}><Tree expandedKeys={allCategoriesKeys} onSelect={changeCategory} treeData={categoriesTree} /></Flex>
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