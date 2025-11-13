import { useState } from "react"
import type { TFilament } from "../../../../store/filaments"

export type FormValues = Omit<TFilament, 'id' | 'brand_id' | 'type_id'> & {type_id: null | number}

const defaultFormValue: FormValues = {
    name: '',
    color: '',
    code: '',
    in_stock: false,
    type_id: null
}

export const useFilamentForm = (defaultValues?: FormValues) => {
    const [values, setValues] = useState(defaultValues || defaultFormValue)


    const setName = (value: string) => {
        setValues({...values, name: value})
    } 

    const setCode = (value: string) => {
        setValues({...values, code: value})
    } 

    const setColor = (value: string) => {
        setValues({...values, color: value})
    } 

    const setInStock = (value: boolean) => {
        setValues({...values, in_stock: value})
    } 

    const setTypeId = (value: number | null) => {
        setValues({...values, type_id: value})
    }

    const isValidForm = values.type_id && values.color && values.name
    console.log(values)
    return {
        values,
        isValidForm,
        handlers: {
            setName,
            setCode,
            setColor,
            setInStock,
            setTypeId
        }
    }
}