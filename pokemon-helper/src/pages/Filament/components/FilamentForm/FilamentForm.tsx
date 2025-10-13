import { Button, Input } from "antd";
import styles from "./FilamentForm.module.css";
import { useForm } from "../../../../helpers/form";
import {
  fetchAddFilamentFx,
  fetchEditFilamentFx,
  type Filament,
} from "../../store";
import { generateUUID } from "../../../Sale/helpers";
import type { FC } from "react";

type Props = {
  item?: Filament;
  onSuccess: () => void;
};

export const FilamentForm: FC<Props> = ({ item, onSuccess }) => {
  const idEdit = !!item?.id;

  const { values, onInputChange, handleSubmit } = useForm({
    defaultValues: item || {
      title: "",
      color: "",
      code: "",
    },
    onSubmit: (data) => {
      if (idEdit) {
        fetchEditFilamentFx({ ...item, ...data });
      } else {
        fetchAddFilamentFx({
          ...data,
          id: generateUUID(),
        });
      }
      onSuccess();
    },
  });

  return (
    <div className={styles.form}>
      <Input
        value={values.title}
        onChange={onInputChange("title")}
        placeholder="Название"
      />
      <Input
        value={values.color}
        onChange={onInputChange("color")}
        placeholder="Цвет"
      />
      <Input
        value={values.code}
        onChange={onInputChange("code")}
        placeholder="Код"
      />
      <Button onClick={handleSubmit}>
        {idEdit ? "Редактировать" : "Добавить"}
      </Button>
    </div>
  );
};
