import { combine, createEvent, createStore } from "effector";
import { $itemsByCategory } from "../../../store/items";
import { createEffectorModal } from "../../../../../helpers/effector-modal";


export const changeCategory = createEvent<React.Key[]>()

export const $selectedCategory = createStore<null | number>(null)
    .on(changeCategory, (_, payload) => Number(payload[0].toString().split('-').at(-1)))


export const $itemsBySelectedCategory = combine($selectedCategory, $itemsByCategory, (cat, items) => cat ? items[cat] || [] : [])


export const ItemModal = createEffectorModal()
export const CategoryModal = createEffectorModal()

