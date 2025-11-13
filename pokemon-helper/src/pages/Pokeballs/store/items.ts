import { createStore } from "effector";
import { getEffectorCrud } from "../../../helpers/effector-crud";
import { flatCategories } from "../components/Items/helpers/categories";

type TItemFilament = {
    id: number;
    item_id: number;
    filament_id: number;
    count: number;
    created_at: string;
}

type TItemImage = {
    id: number;
    item_id: number;
    image_id: string;
    created_at: string;
}


export type TCreateItem = {
    category_id: number;
    price: number;
    name: string;
    items_filament: Partial<Pick<TItemFilament, 'id' | 'count'>>[],
    items_images: string[]
}

export type TUpdateItem = TCreateItem & {
    id: number;
}

export type TItem = {
    id: number;
    category_id: number;
    price: number;
    name: string;
    created_at: string;
    items_filament: TItemFilament[],
    items_images: TItemImage[]
}

export type TCreateCategory = {
    slug: string;
    category_parent_id: number | null;
    name: string;
}

export type TUpdateCategory = TCreateCategory & {
    id: number,
}

export type TCategory = TUpdateCategory & {
    childrens: TCategory[];
}

export const itemsFxs = getEffectorCrud<TCreateItem, TUpdateItem, TItem[]>({
    url: '/api/pokeprints/items'
})

export const categoriesFxs = getEffectorCrud<TCreateCategory, TUpdateCategory, TCategory[]>({
    url: '/api/pokeprints/items/categories'
})

export const $categories = createStore<TCategory[]>([])
    .on(categoriesFxs.readFx.doneData, (_, payload) => payload)
    .on(categoriesFxs.updateFx.doneData, (_, payload) => payload)
    .on(categoriesFxs.createFx.doneData, (_, payload) => payload);

export const $categoryById = $categories.map<Record<number, TCategory>>(items => flatCategories(items).reduce((acc, curr) => {
    return {
        ...acc,
        [curr.id]: curr
    }
}, {}))

export const $items = createStore<TItem[]>([])
    .on(itemsFxs.readFx.doneData, (_, payload) => payload)
    .on(itemsFxs.updateFx.doneData, (_, payload) => payload)
    .on(itemsFxs.createFx.doneData, (_, payload) => payload);

export const $itemsByCategory = $items.map<Record<number, TItem[]>>((items) => items.reduce((acc: Record<number, TItem[]>, curr) => ({
    ...acc,
    [curr.category_id]: [...(acc[curr.category_id] || []), curr]
}), {}))