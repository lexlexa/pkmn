import { createContext, useContext, useState, type FC, type PropsWithChildren } from "react"
import { type TPokeball } from "../../../../store"
import type { TPokebalFormProps } from "./PokeballForm"


type FormValues = Omit<TPokeball, 'id'>

const defaultFormValue: FormValues = {
    name: '',
    pokedexIndex: '',
    price: '',
    filament: [{ id: '', count: '' }],
    images: [],
    createdAt: ''
}

const usePokeballFormValues = (defaultValues: FormValues) => {
    const [values, setValues] = useState(defaultValues)

    const handleChangeTextField = (key: keyof FormValues) => (value: string) => {
        setValues({ ...values, [key]: value })
    }

    const handleAddImage = (image: string) => {
        setValues({ ...values, images: [...values.images, image] })
    }

    const handleDeleteImage = (image: string) => () => {
        setValues({ ...values, images: values.images.filter(i => i !== image) })
    }

    const handleChangeFilament = (index: number, key: keyof FormValues['filament'][0]) => (value: string) => {
        setValues({ ...values, filament: values.filament.map((item, i) => index === i ? ({ ...item, [key]: value }) : item) })
    }

    const handleAddFilament = () => {
        setValues({ ...values, filament: [...values.filament, { id: '', count: '' }] })
    }

    const handleDeleteFilament = (index: number) => () => {
        setValues({ ...values, filament: values.filament.filter((_, i) => i !== index) })
    }

    const isValidForm = Boolean(values.name) &&
        Boolean(values.pokedexIndex) &&
        Boolean(values.price) &&
        values.filament.every(({ count, id }) => count && id);

    return {
        values,
        isValidForm,
        handlers: {
            setName: handleChangeTextField('name'),
            setPokedexIndex: handleChangeTextField("pokedexIndex"),
            setPrice: handleChangeTextField("price"),

            addImage: handleAddImage,
            deleteImage: handleDeleteImage,

            addFilament: handleAddFilament,
            editFilament: handleChangeFilament,
            deleteFilament: handleDeleteFilament
        }
    }
}


export const PokeballFormContext = createContext<ReturnType<typeof usePokeballFormValues> | null>(null)

export const PokeballFormProvider: FC<PropsWithChildren & { defaultValues: FormValues }> = ({ children, defaultValues }) => {
    const form = usePokeballFormValues(defaultValues)

    return <PokeballFormContext.Provider value={form}>
        {children}
    </PokeballFormContext.Provider>
}

export const usePokeballForm = () => {
    const value = useContext(PokeballFormContext)

    if (!value) {
        throw new Error('Error Pokeball Context')
    }

    return value
}

export const withPokeballFormProvider = (Component: FC<TPokebalFormProps>) => (props: TPokebalFormProps) => (
    <PokeballFormProvider defaultValues={props.item || defaultFormValue}>
        <Component {...props} />
    </PokeballFormProvider>
)