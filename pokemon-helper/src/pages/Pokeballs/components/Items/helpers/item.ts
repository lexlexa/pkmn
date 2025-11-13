import type { TItem, TUpdateItem } from "../../../store/items";


export const transformItemToUpdateItem = (item: TItem): TUpdateItem => {
    return {
        id: item.id,
        name: item.name,
        category_id: item.category_id,
        price: item.price,
        items_filament: item.items_filament.map(fil => ({ id: fil.filament_id, count: fil.count })),
        items_images: item.items_images.map(img => img.image_id)
    }
}