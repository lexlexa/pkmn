import type { TreeProps } from "antd";
import { useUnit } from "effector-react";
import { useState } from "react";
import { $itemsByCategory } from "../../../store/items";


export const useItems = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const itemsByCategory = useUnit($itemsByCategory)

    const changeCategory: TreeProps['onSelect'] = (categories) => {
        const category = categories[0]
        setSelectedCategory(Number(category.toString().split('-').at(-1)))
    }

    const visibleItems = selectedCategory ? itemsByCategory[selectedCategory] || [] : []


    return {
        selectedCategory,
        changeCategory,
        visibleItems
    }
}