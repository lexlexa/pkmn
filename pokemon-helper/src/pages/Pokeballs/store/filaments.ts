import { combine, createStore } from "effector";
import { getEffectorCrud } from "../../../helpers/effector-crud"

export type TFilamentsBrand = {
    id: number;
    name: string;
}


export type TFilamentsTypes = {
    id: number;
    name: string;
    brand_id: number
}

export type TFilament = {
    id: number;
    name: string;
    code: string;
    color: string;
    in_stock: boolean;
    brand_id: number;
    type_id: number
};

export const filamentBrandsFxs = getEffectorCrud<TFilamentsBrand, TFilamentsBrand, TFilamentsBrand[]>({
    url: '/api/pokeprints/filaments/brands'
})

export const filamentTypesFxs = getEffectorCrud<TFilamentsTypes, TFilamentsTypes, TFilamentsTypes[]>({
    url: '/api/pokeprints/filaments/types'
})

export const filamentsFxs = getEffectorCrud<Omit<TFilament, 'brand_id' | 'id'>, Omit<TFilament, 'brand_id'>, TFilament[]>({
    url: '/api/pokeprints/filaments'
})


export const $filamentsBrands = createStore<TFilamentsBrand[]>([])
    .on(filamentBrandsFxs.readFx.doneData, (_, payload) => payload)
    .on(filamentBrandsFxs.updateFx.doneData, (_, payload) => payload)
    .on(filamentBrandsFxs.createFx.doneData, (_, payload) => payload);

export const $filamentsTypes = createStore<TFilamentsTypes[]>([])
    .on(filamentTypesFxs.readFx.doneData, (_, payload) => payload)
    .on(filamentTypesFxs.updateFx.doneData, (_, payload) => payload)
    .on(filamentTypesFxs.createFx.doneData, (_, payload) => payload);


export const $filamentTypesByBrand = combine($filamentsBrands, $filamentsTypes, (brands, types) => {
    return brands.reduce((acc: Record<number, TFilamentsTypes[]>, item) => ({ ...acc, [item.id]: types.filter(t => t.brand_id === item.id) }), {})
})


export const $filaments = createStore<TFilament[]>([])
    .on(filamentsFxs.readFx.doneData, (_, payload) => payload)
    .on(filamentsFxs.updateFx.doneData, (_, payload) => payload)
    .on(filamentsFxs.createFx.doneData, (_, payload) => payload);


export const $filamentsByType = combine($filamentsTypes, $filaments, (types, filaments) => {
    console.log('!!!', types, filaments)
    return types.reduce((acc: Record<number, TFilament[]>, item) => ({
        ...acc,
        [item.id]: filaments.filter(t => t.type_id === item.id)
    }), {})
})