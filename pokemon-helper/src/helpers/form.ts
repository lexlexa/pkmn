import { useState } from "react";

export type TuseFormArguments<T extends {}> = {
  defaultValues: T;
  onSubmit: (data: T) => void;
};

export const useForm = <T extends {}>({
  defaultValues,
  onSubmit,
}: TuseFormArguments<T>) => {
  const [values, setValues] = useState(defaultValues);

  return {
    values,
    onInputChange:
      (key: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) =>
        setValues({ ...values, [key]: event.target.value }),
    onCheckboxChange: (key: keyof T) => () => {
      setValues({ ...values, [key]: !values[key] });
    },

    handleSubmit: () => onSubmit(values),
    updateValues: (data: T) => setValues(data),
  };
};
