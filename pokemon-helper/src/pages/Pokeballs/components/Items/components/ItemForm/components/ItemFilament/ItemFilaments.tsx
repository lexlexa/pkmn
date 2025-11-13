import { useUnit } from "effector-react";
import styles from "./ItemFilaments.module.css";
import { Button, Flex } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FormSelect } from "../../../../../../../../components/Form/components/Select/Select";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";
import { useItemForm } from "../../form";
import { $filamentsBrands, $filamentsByType, $filamentTypesByBrand } from "../../../../../../store/filaments";


export const ItemFilaments = () => {
  const filamentsBrands = useUnit($filamentsBrands)
  const filamentsTypesByBrand = useUnit($filamentTypesByBrand)
  const filamentsByType = useUnit($filamentsByType)

  const {
    values: { items_filament },
    handlers: { addFilament, editFilament, deleteFilament } } = useItemForm()

  const filamentsOptions2 = filamentsBrands.map(brand => [
    ...filamentsTypesByBrand[brand.id].map(type => ({
      label: `${brand.name} - ${type.name}`,
      title: `${brand.name} - ${type.name}`,
      options: filamentsByType[type.id].map(filament => ({
        label: filament.name,
        value: filament.id.toString()
      }))
    }))
  ]).flat()


  return (
    <div className={styles.filamentList}>
      {items_filament.map((item, index) => (
        <Flex align="flex-end" key={index} className={styles.filamentItem}>
          <FormSelect
            options={filamentsOptions2}
            label="Филамент"
            value={item.id?.toString()}
            onChange={(value) => editFilament(index, 'id')(value)}
            placeholder="Выберите значение"
            fixedWidth={200}
            required
          />
          <FormInput
            value={item.count}
            onChange={editFilament(index, 'count')}
            label="Кол-во (г.)"
            placeholder="0"
            required
          />
          <Button
            color="red"
            variant="outlined"
            style={{ width: 90 }}
            onClick={deleteFilament(index)}
            icon={<DeleteOutlined />}
            block
          />
        </Flex>
      ))}
      <div className={styles.filamentItem}>
        <Button onClick={addFilament} block>
          Добавить
        </Button>
      </div>
    </div>
  );
};
