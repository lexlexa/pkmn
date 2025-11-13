import { Button, Flex } from "antd";
import { type FC } from "react";
import { useItemForm, withItemFormProvider } from "./form";
import { ItemGeneral } from "./components/ItemGeneral/ItemGeneral";
import { ItemFilaments } from "./components/ItemFilament/ItemFilaments";
import { ItemImages } from "./components/ItemImages/ItemImages";
import { ItemPrice } from "./components/ItemPrice/ItemPrice";
import { $items, itemsFxs, type TCreateItem, type TUpdateItem } from "../../../../store/items";
import { useUnit } from "effector-react";
import { transformItemToUpdateItem } from "../../helpers/item";

export type TItemFormProps = {
    item?: TUpdateItem;
    onClose: () => void
};

const ItemFormInner: FC<TItemFormProps> = withItemFormProvider(({ item, onClose }) => {
    const { values, isValidForm } = useItemForm()


    const handleSubmit = async () => {

        const data: TCreateItem = {
            ...values,
            category_id: values.category_id!,
            price: Number(values.price)!,
            items_filament: values.items_filament.map(item => ({ id: Number(item.id), count: Number(item.count) }))
        }

        if (item) {
            await itemsFxs.updateFx({ ...data, id: item.id })
        } else {
            await itemsFxs.createFx(data)
        }
        onClose()
    }

    return (
        <Flex vertical gap={8}>
            <ItemGeneral />
            <ItemFilaments />
            <ItemImages />
            <ItemPrice />
            <Button disabled={!isValidForm} onClick={handleSubmit}>
                Сохранить
            </Button>
        </Flex>
    );
});


export const ItemForm = ({ id, onClose }: { id: number, onClose: () => void }) => {
    const items = useUnit($items)
    const editItem = items.find(item => item.id === id)
    return <ItemFormInner onClose={onClose} item={editItem && transformItemToUpdateItem(editItem)} />
}