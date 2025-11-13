import type { TreeProps, TreeSelectProps } from "antd";
import type { TCategory } from "../../../store/items";


export const transformCategoriesToTreeData = (categories: TCategory[], keyPrefix?: string): TreeProps['treeData'] => {
    return categories.map(item => ({
        title: item.name,
        selectable: true,
        key: `${keyPrefix ? `${keyPrefix}-` : ''}${item.id}`,
        children: transformCategoriesToTreeData(item.childrens || [], `${item.id}`)

    }))
}

export const transformCategoriesToTreeDataOptions = (categories: TCategory[], keyPrefix?: string): TreeSelectProps['treeData'] => {
    return categories.map(item => ({
        label: item.name,
        value: `${keyPrefix ? `${keyPrefix}-` : ''}${item.id}`,
        key: `${keyPrefix ? `${keyPrefix}-` : ''}${item.id}`,
        children: transformCategoriesToTreeDataOptions(item.childrens || [], `${item.id}`)
    }))
}

export const flatCategories = (categories: TCategory[]): TCategory[] => {
    return categories.map(item => [item, ...flatCategories(item.childrens)]).flat(100)
}

export const getCategoryOptionIdById = (categories: TCategory[], id: number): string => {
    const flattedCategories = flatCategories(categories);

    const item = flattedCategories.find(cat => cat.id === id)

    if (item?.category_parent_id) {
        return `${item.category_parent_id}-${id}`
    }
    return `${id}`
}

export const getAllCategoriesIdsForTree = (data: TreeProps['treeData']): string[] => {
    return data?.map(item => [item.key.toString(), ...getAllCategoriesIdsForTree(item.children || [])]).flat(100) || []
}