import { useUnit } from "effector-react";
import styles from "./PokeballsFilaments.module.css";
import { Button, Flex } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { $filaments } from "../../../../../../store";
import { FormSelect } from "../../../../../../../../components/Form/components/Select/Select";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";
import { usePokeballForm } from "../../form";

export const PokeballFilaments = () => {
  const filaments = useUnit($filaments);
  const {
    values: { filament },
    handlers: { addFilament, editFilament, deleteFilament } } = usePokeballForm()


  return (
    <div className={styles.filamentList}>
      {filament.map((item, index) => (
        <Flex align="flex-end" key={index} className={styles.filamentItem}>
          <FormSelect
            options={filaments.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
            label="Филамент"
            value={item.id}
            onChange={editFilament(index, 'id')}
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
