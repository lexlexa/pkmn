import type { TFilamentsBrand, TFilamentsTypes } from "../../../../store/filaments";


export const mapBrandsToOptions = (items: TFilamentsBrand[]) => {
    return items.map(item => ({label: item.name, value: item.id.toString()})) 
}

export const mapTypesByBrandToOptions = (brand_id?: number) => (items: Record<number, TFilamentsTypes[]>) => {
    return brand_id ? items[brand_id].map(item => ({label: item.name, value: item.id.toString()})) : []
}