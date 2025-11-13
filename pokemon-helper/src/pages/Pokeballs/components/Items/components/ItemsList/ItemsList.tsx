import { Flex } from "antd"
import { ItemsItem } from "../ItemsItem/ItemsItem"
import { useUnit } from "effector-react"
import { $itemsBySelectedCategory, ItemModal } from "../../store/ui"

export const ItemsList = () => {
    const itemsBySelectedCategory = useUnit($itemsBySelectedCategory)
    return <Flex gap={16} style={{ flexGrow: 1 }} wrap>
        {itemsBySelectedCategory.map(item => <ItemsItem key={item.id} item={item} onEdit={ItemModal.openEditModal} />)}
    </Flex>
}