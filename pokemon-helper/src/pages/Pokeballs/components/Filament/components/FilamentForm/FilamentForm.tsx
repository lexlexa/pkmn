import { useEffect, useState, type FC } from "react";
import { $filamentTypesByBrand, type TFilament, $filamentsBrands, filamentsFxs } from "../../../../store/filaments";
import { Button, Drawer, Flex, Switch, Typography } from "antd";

import { useFilamentForm } from "./form";
import { FormInput } from "../../../../../../components/Form/components/Input/Input";
import { FormSelect } from "../../../../../../components/Form/components/Select/Select";
import { useStoreMap, useUnit } from "effector-react";
import { mapBrandsToOptions, mapTypesByBrandToOptions } from "./helpers";

type Props = {
    item?: TFilament;
    open: boolean;
    onCancel: () => void;
};

export const FilamentForm: FC<Props> = ({ item, onCancel, open }) => {
    const [selectedBrand, setSelectedBrand] = useState<number | undefined>(item?.brand_id || undefined)

    const brandsOptions = useStoreMap($filamentsBrands, mapBrandsToOptions)
    const typesByBrand = useUnit($filamentTypesByBrand)
    const typesByBrandOptions = mapTypesByBrandToOptions(selectedBrand)(typesByBrand)

    const { values, handlers: { setName, setCode, setColor, setTypeId, setInStock }, isValidForm } = useFilamentForm(item)

    const handleSubmit = async () => {
        if (item) {
            await filamentsFxs.updateFx({
                ...values,
                id: item.id,
                type_id: values.type_id!
            })
        } else {
            await filamentsFxs.createFx({ ...values, type_id: values.type_id! })
        }
        onCancel()
    }

    useEffect(() => {
        if (selectedBrand !== item?.brand_id) {
            setTypeId(null)
        }
    }, [selectedBrand])

    return (
        <Drawer open={open} onClose={onCancel}>
            <Flex vertical gap={8}>
                <Typography.Title style={{ marginTop: 0 }} level={5}>
                    {item ? "Изменить филамент" : "Добавить филамент"}{" "}
                </Typography.Title>
                <FormSelect
                    value={selectedBrand?.toString()}
                    onChange={(value) => setSelectedBrand(Number(value))}
                    options={brandsOptions} label="Бренд" />
                <FormSelect
                    value={values.type_id?.toString() || undefined}
                    disabled={!selectedBrand}
                    options={typesByBrandOptions}
                    onChange={(value) => setTypeId(Number(value))}
                    label="Тип"
                />
                <FormInput
                    value={values.name}
                    onChange={setName}
                    label="Название"
                    placeholder="Ivory White"
                />
                <Flex gap={8}>
                    <FormInput
                        value={values.code}
                        onChange={setCode}
                        label="Код"
                        placeholder="100200"
                    />
                    <FormInput
                        value={values.color}
                        onChange={setColor}
                        label="Цвет"
                        placeholder="#ffffff"
                    />
                </Flex>
                <Flex gap={8}>
                    В наличии{" "}
                    <Switch
                        checked={values.in_stock}
                        onChange={setInStock}
                    />
                </Flex>
                <Button disabled={!isValidForm} onClick={handleSubmit}>Сохранить</Button>
            </Flex></Drawer>
    );
};
