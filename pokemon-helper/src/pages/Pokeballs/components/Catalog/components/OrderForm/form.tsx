import { createContext, useContext, useState, type FC, type PropsWithChildren } from "react"
import { Accessories, OrderItemStatuses, OrderStatues, type TOrder, type TOrderItem } from "../../../../store"
import type { TOrderFormProps } from "./OrderForm"
import { generateUUID } from "../../../../../Sale/helpers"

type FormValues = Omit<TOrder, 'id'>

const defaultFormValue: FormValues = {
    items: [],
    isSubscriber: false,
    clientName: '',
    clientLink: '',
    status: OrderStatues.NONE,
    price: '',
    discountPrice: '',
    additionalDiscountPercent: '',
    createdAt: ''
}

const useOrderFormValues = (defaultValues: FormValues) => {
    const [values, setValues] = useState(defaultValues)

    const setClientName = (value: string) => {
        setValues({ ...values, clientName: value })
    }

    const setClientLink = (value: string) => {
        setValues({ ...values, clientLink: value })
    }

    const setAdditionalDiscountPercent = (value: string) => {
        setValues({ ...values, additionalDiscountPercent: value })
    }

    const setIsSubscriber = (value: boolean) => {
        setValues({ ...values, isSubscriber: value })
    }

    const addItem = () => {
        setValues({
            ...values, items: [...values.items, {
                pokeballId: '',
                accessories: [],
                price: '',
                comment: '',
                id: generateUUID(),
                status: OrderItemStatuses.NONE
            }]
        })
    }

    const updateItem = (id: string, fn: (item: TOrderItem) => TOrderItem) => {
        setValues({ ...values, items: values.items.map((item) => item.id === id ? fn(item) : item) })
    }

    const deleteItem = (id: string) => () => {
        setValues({ ...values, items: values.items.filter((item) => item.id !== id) })
    }

    const setItemPokeballId = (id: string) => (value: string) => {
        updateItem(id, (item) => ({ ...item, pokeballId: value }))
    }

    const setItemPrice = (id: string) => (value: string) => {
        updateItem(id, (item) => ({ ...item, price: value }))
    }

    const setItemComment = (id: string) => (value: string) => {
        updateItem(id, (item) => ({ ...item, comment: value }))
    }

    const addItemAccessory = (id: string, value: [Accessories, number]) => () => {
        updateItem(id, (item) => ({ ...item, accessories: [...item.accessories, value] }))
    }

    const deleteItemAccessory = (id: string, index: number) => () => {
        updateItem(id, (item) => ({ ...item, accessories: item.accessories.filter((_, i) => index !== i) }))
    }

    // const isValidForm = Boolean(values.name) &&
    //     Boolean(values.pokedexIndex) &&
    //     Boolean(values.price) &&
    //     values.filament.every(({ count, id }) => count && id);

    const isValidForm =
        Boolean(values.clientLink) &&
        Boolean(values.clientName) &&
        Boolean(values.items.length) &&
        values.items.every((item) => item.pokeballId && item.price);

    return {
        values,
        isValidForm,
        handlers: {
            setClientName,
            setClientLink,
            setAdditionalDiscountPercent,
            setIsSubscriber,

            addItem,
            deleteItem,
            setItemPokeballId,
            setItemPrice,
            setItemComment,
            addItemAccessory,
            deleteItemAccessory,
            //     setName: handleChangeTextField('name'),
            //     setPokedexIndex: handleChangeTextField("pokedexIndex"),
            //     setPrice: handleChangeTextField("price"),

            //     addImage: handleAddImage,
            //     deleteImage: handleDeleteImage,

            //     addFilament: handleAddFilament,
            //     editFilament: handleChangeFilament,
            //     deleteFilament: handleDeleteFilament
        }
    }
}


export const OrderFormContext = createContext<ReturnType<typeof useOrderFormValues> | null>(null)

export const OrderFormProvider: FC<PropsWithChildren & { defaultValues: FormValues }> = ({ children, defaultValues }) => {
    const form = useOrderFormValues(defaultValues)

    return <OrderFormContext.Provider value={form}>
        {children}
    </OrderFormContext.Provider>
}

export const useOrderForm = () => {
    const value = useContext(OrderFormContext)

    if (!value) {
        throw new Error('Error Order Context')
    }

    return value
}

export const withOrderFormProvider = (Component: FC<TOrderFormProps>) => (props: TOrderFormProps) => (
    <OrderFormProvider defaultValues={defaultFormValue}>
        <Component {...props} />
    </OrderFormProvider>
)