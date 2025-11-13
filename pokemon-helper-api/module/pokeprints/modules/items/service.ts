import { DBClient } from "../../../../clients/db.ts"

type TCreateCategory = {
    slug: string;
    name: string;
    category_parent_id: number | null;
}

type TCategory = TCreateCategory & {
    id: number;

}

type TCategoryResponse = TCategory & {
    childrens: TCategoryResponse[]
}


const transformCategoriesToTree = (categories: TCategory[]): TCategoryResponse[] => {
    const map: { [key: number]: TCategoryResponse } = {};
    const roots: TCategoryResponse[] = [];

    categories.forEach(item => {
        map[item.id] = { ...item, childrens: [] };
    });

    categories.forEach(item => {
        const node = map[item.id];
        if (item.category_parent_id) {
            const parent = map[item.category_parent_id];
            if (parent) {
                parent.childrens.push(node);
            }
        } else {
            roots.push(node);
        }
    });

    return roots;
}

export const getCategoriesTree = async () => {
    const categories = await DBClient.items_categories.findMany()
    return transformCategoriesToTree(categories)
}

export const createCategory = async (data: TCreateCategory) => {
    await DBClient.items_categories.create({ data: data })
}

export const updateCategory = async ({ id, childrens, ...data }: TCategoryResponse) => {
    await DBClient.items_categories.update({ data: data, where: { id } })
}


type TCreateItem = {
    name: string,
    price: number;
    category_id: number;
    items_filament: { "id": number, "count": number }[],
    items_images: string[]
}


type TUpdateItem = TCreateItem & {
    id: number
}

export const getItemsList = async () => {
    return await DBClient.items.findMany({
        relationLoadStrategy: 'join',
        include: {
            items_filament: true,
            items_images: true,
        }
    })
}


// { 
//     "name": "12312", 
//     "price": "1111", 
//     "category_id": 1, 
//     "items_filament": [{ "id": "21", "count": "1" }], 
//     "items_images": ["c8f0bfbd-5449-4177-8584-326c35576efb.png"] 
// }

export const createItem = async (data: TCreateItem) => {
    await DBClient.$transaction(async (tx) => {
        const item = await tx.items.create({
            data: {
                name: data.name,
                category_id: data.category_id,
                price: data.price
            }
        })

        await tx.items_filament.createMany({
            data: data.items_filament.map(fil => ({ filament_id: fil.id, count: fil.count, item_id: item.id }))
        })

        await tx.items_images.createMany({
            data: data.items_images.map(img => ({ image_id: img, item_id: item.id }))
        })
    })
}

export const updateItem = async (data: TUpdateItem) => {
    await DBClient.$transaction(async (tx) => {
        await tx.items.update({
            data: {
                name: data.name,
                category_id: data.category_id,
                price: data.price
            },
            where: { id: data.id }
        })

        await tx.items_filament.deleteMany({
            where: { item_id: data.id }
        })

        await tx.items_filament.createMany({
            data: data.items_filament.map(fil => ({ filament_id: fil.id, count: fil.count, item_id: data.id }))
        })


        await tx.items_images.deleteMany({
            where: { item_id: data.id }
        })


        await tx.items_images.createMany({
            data: data.items_images.map(img => ({ image_id: img, item_id: data.id }))
        })
    })
}