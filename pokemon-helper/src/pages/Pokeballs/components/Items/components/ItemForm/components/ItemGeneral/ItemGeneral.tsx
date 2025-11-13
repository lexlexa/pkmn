import { Flex } from "antd"
import { useItemForm } from "../../form"
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input"
import { FormTreeSelect } from "../../../../../../../../components/Form/components/TreeSelect/TreeSelect"
import { $categories } from "../../../../../../store/items"
import { useUnit } from "effector-react"
import { getCategoryOptionIdById, transformCategoriesToTreeDataOptions } from "../../../../helpers/categories"


export const ItemGeneral = () => {
    const categories = useUnit($categories)


    const {
        errors,
        values: { name, category_id },
        handlers: { setName, setCategory } } = useItemForm()


    const options = transformCategoriesToTreeDataOptions(categories)

    const handleChangeCategory = (value: string) => {
        setCategory(Number(value.split('-').at(-1)))
    }

    const selectedCategoryId = category_id ? getCategoryOptionIdById(categories, category_id) : undefined
    console.log(selectedCategoryId, category_id, options)
    return <Flex vertical gap={8}>
        <FormTreeSelect
            label="Категория"
            placeholder="Не выбрано"
            options={options}
            onChange={handleChangeCategory}
            value={selectedCategoryId}
        />
        <FormInput
            label="Название"
            onChange={setName}
            placeholder="Bulbasaur"
            value={name}
            required
            error={errors.name}
        />
    </Flex>
}