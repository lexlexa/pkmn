import { DBClient } from "../../../../clients/db.ts"

export type TFilament = {
    id: number;
    name: string;
    code: string;
    color: string;
    in_stock: boolean;
    brand_id: number;
    type_id: number
};

export const getFilamentsBrandsList = async () => {
    return await DBClient.filament_brands.findMany()
}

export const getFilamentsTypesList = async () => {
    return await DBClient.filament_types.findMany()
}
export const getFilamentsList = async () => {
    return (await DBClient.filaments.findMany({
        relationLoadStrategy: 'join',
        include: {
            filament_types: {
                select: {
                    brand_id: true
                }
            }
        },
        orderBy: {
            created_at: 'asc'
        }
    })).map(({filament_types,...item}) => ({
        ...item,
        brand_id: filament_types.brand_id,
    }))
}

export const createFilamentsItem = async (item: TFilament) => {
    const {id, ...createFields} = item
    return DBClient.filaments.create({
        data: {
            ...createFields
        }
    })
}

export const updateFilamentsItem = async (item: TFilament) => {
    const {id, brand_id, ...updateFields} = item
    console.log(item)
    return DBClient.filaments.update({
        where: {
            id: id
        },
        data: {
            ...updateFields
        }
    })
}