import { Flex } from "antd"
import { ItemsItem } from "../ItemsItem/ItemsItem"
import { useUnit } from "effector-react"
import { $itemsBySelectedCategory, $selectedCategory, ItemModal } from "../../store/ui"
import { FormInput } from "../../../../../../components/Form/components/Input/Input"
import { useEffect, useState } from "react"

export const ItemsList = () => {
    const [search, setSearch] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const itemsBySelectedCategory = useUnit($itemsBySelectedCategory)
    const selectedCategory = useUnit($selectedCategory)

    useEffect(() => {
        setSearch('')
        setMinPrice('')
        setMaxPrice('')
    }, [selectedCategory])

    const filteredValues = itemsBySelectedCategory.filter(item => {
        if (!item.name.toLowerCase().includes(search.toLowerCase())) return false
        if (minPrice && Number(item.price) < Number(minPrice)) return false
        if (maxPrice && Number(item.price) > Number(maxPrice)) return false
        return true
    })

    return <Flex vertical gap={16} style={{ flexGrow: 1 }}>
        <Flex gap={16}>
            <FormInput allowClear placeholder="Поиск" value={search} onChange={setSearch} />
            <Flex gap={8} style={{ width: 300 }}>
                <FormInput allowClear placeholder="Мин. цена" value={minPrice} onChange={setMinPrice} />
                {'-'}
                <FormInput allowClear placeholder="Макс. цена" value={maxPrice} onChange={setMaxPrice} />
            </Flex>
        </Flex>
        <Flex gap={16} wrap>
            {filteredValues.map(item => <ItemsItem key={item.id} item={item} onEdit={ItemModal.openEditModal} />)}
        </Flex>
    </Flex>
}