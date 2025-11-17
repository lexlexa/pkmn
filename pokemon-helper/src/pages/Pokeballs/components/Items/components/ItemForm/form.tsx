import { createContext, useContext, useState, type FC, type PropsWithChildren } from "react"
// import { $pokeballs } from "../../../../store"
// import { useStoreMap } from "effector-react"
import type { TItemFormProps } from "./ItemForm"
import type { TUpdateItem } from "../../../../store/items"


type FormValues = Omit<TUpdateItem, 'id' | 'price' | 'category_id'> & Partial<Pick<TUpdateItem, 'price' | 'category_id'>>

const defaultFormValue: FormValues = {
    name: '',
    price: undefined,
    // items_filament: [],
    // items_images: [],
    category_id: undefined,
    items_filament: [{ id: undefined, count: undefined }],
    items_images: [],
    // createdAt: ''
}

const useItemFormValues = (defaultValues: FormValues) => {
    // const pokeballsNames = useStoreMap($pokeballs, (state) => state.map(item => item.name))
    const [values, setValues] = useState(defaultValues)

    const handleChangeCategoryId = (value: number) => {
        setValues({ ...values, category_id: value })
    }

    const handleChangeTextField = (key: keyof FormValues) => (value: string) => {
        setValues({ ...values, [key]: value })
    }

    const handleAddImage = (image: string) => {
        setValues({ ...values, items_images: [...values.items_images, image] })
    }

    const handleDeleteImage = (image: string) => () => {
        setValues({ ...values, items_images: values.items_images.filter(i => i !== image) })
    }

    const handleChangeFilament = (index: number, key: keyof FormValues['items_filament'][0]) => (value: number | string) => {
        setValues({ ...values, items_filament: values.items_filament.map((item, i) => index === i ? ({ ...item, [key]: value }) : item) })
    }

    const handleAddFilament = () => {
        setValues({ ...values, items_filament: [...values.items_filament, { id: undefined, count: undefined }] })
    }

    const handleDeleteFilament = (index: number) => () => {
        setValues({ ...values, items_filament: values.items_filament.filter((_, i) => i !== index) })
    }

    const isValidForm = Boolean(values.name) &&
        Boolean(values.price) &&
        values.items_filament.every(({ count, id }) => count && id);

    console.log(defaultValues, values.name)
    const errors: Partial<Record<keyof FormValues, string>> = {
        // name: pokeballsNames.includes(values.name) && values.name !== defaultValues.name ? 'Такой покебол уже есть' : undefined
    }

    return {
        values,
        isValidForm,
        errors,
        handlers: {
            setCategory: handleChangeCategoryId,
            setName: handleChangeTextField('name'),
            setPrice: handleChangeTextField("price"),

            addImage: handleAddImage,
            deleteImage: handleDeleteImage,

            addFilament: handleAddFilament,
            editFilament: handleChangeFilament,
            deleteFilament: handleDeleteFilament
        }
    }
}


export const ItemFormContext = createContext<ReturnType<typeof useItemFormValues> | null>(null)

export const ItemFormProvider: FC<PropsWithChildren & { defaultValues: FormValues }> = ({ children, defaultValues }) => {
    const form = useItemFormValues(defaultValues)

    return <ItemFormContext.Provider value={form}>
        {children}
    </ItemFormContext.Provider>
}

export const useItemForm = () => {
    const value = useContext(ItemFormContext)

    if (!value) {
        throw new Error('Error Pokeball Context')
    }

    return value
}

export const withItemFormProvider = (Component: FC<TItemFormProps>) => (props: TItemFormProps) => (
    <ItemFormProvider defaultValues={props.item || defaultFormValue} >
        <Component {...props} />
    </ItemFormProvider>
)