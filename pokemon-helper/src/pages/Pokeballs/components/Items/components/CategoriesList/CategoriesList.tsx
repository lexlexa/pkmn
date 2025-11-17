import { Button, Flex, Tree } from "antd"
import { useUnit } from "effector-react"
import { $categories, $categoryById } from "../../../../store/items"
import { getAllCategoriesIdsForTree, transformCategoriesToTreeData } from "../../helpers/categories"
import { $selectedCategory, CategoryModal, changeCategory } from "../../store/ui"

const BACKGROUND_COLOR = '#d9d9d9';

export const CategoriesList = () => {
    const categories = useUnit($categories)
    const categoriesTree = transformCategoriesToTreeData(categories)
    const allCategoriesKeys = getAllCategoriesIdsForTree(categoriesTree)
    const categoryById = useUnit($categoryById)
    const selectedCategory = useUnit($selectedCategory)

    const selectedCategoryData = selectedCategory ? categoryById[selectedCategory] : undefined

    return <Flex vertical align="flex-start" gap={16} style={{ width: 300, flexShrink: 0, backgroundColor: BACKGROUND_COLOR, borderRadius: 16, padding: '24px 0' }}>
        <Button
            disabled={!selectedCategory}
            style={{ marginLeft: 32 }}
            onClick={() => selectedCategoryData && CategoryModal.openEditModal(selectedCategoryData.id)}
        >
            Редактировать категорию
        </Button>
        <Tree
            rootStyle={{ backgroundColor: BACKGROUND_COLOR }}
            expandedKeys={allCategoriesKeys}
            onSelect={changeCategory}
            treeData={categoriesTree} />
    </Flex>
}