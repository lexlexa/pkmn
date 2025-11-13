import { Button, Flex } from "antd"
import { $categories, categoriesFxs, type TCategory } from "../../../../store/items";
import { useState, type FC } from "react";
import { getCategoryOptionIdById, transformCategoriesToTreeDataOptions } from "../../helpers/categories";
import { useUnit } from "effector-react";
import { FormTreeSelect } from "../../../../../../components/Form/components/TreeSelect/TreeSelect";
import { FormInput } from "../../../../../../components/Form/components/Input/Input";

type Props = {
    item?: TCategory;
    onClose: () => void
}

export const CategoryFormInner: FC<Props> = ({ onClose, item }) => {
    const categories = useUnit($categories)



    const selectedCategoryId = item ? getCategoryOptionIdById(categories, item.id) : undefined

    const [parentCategory, setParentCategory] = useState<string | undefined>(selectedCategoryId)
    const [name, setName] = useState(item?.name || '')
    const [slug, setSlug] = useState(item?.slug || '')

    const treeData = transformCategoriesToTreeDataOptions(categories)

    const handleSubmit = async () => {
        if (item) {
            await categoriesFxs.updateFx({ ...item, name, slug })
        } else {
            if (!parentCategory) return
            await categoriesFxs.createFx({ name, slug, category_parent_id: Number(parentCategory.split('-').at(-1)) })
        }
        onClose()
    }

    const isValidForm = parentCategory && name && slug

    console.log('>>>', parentCategory)

    return <Flex vertical gap={16}>
        <FormTreeSelect value={parentCategory} disabled={!!item} options={treeData} onChange={setParentCategory} label="Категория" />
        <FormInput value={name} label="Название" placeholder="Покеболы" onChange={setName} />
        <FormInput value={slug} label="Slug" placeholder="pokeballs" onChange={setSlug} />
        <Button disabled={!isValidForm} onClick={handleSubmit}>Сохранить</Button>
    </Flex>
}

export const CategoryForm = ({ id, onClose }: { id: number, onClose: () => void }) => {
    const categories = useUnit($categories)
    const editCategory = categories.find(item => item.id === id)
    return <CategoryFormInner onClose={onClose} item={editCategory} />
}