import { useState } from "react";

export const useForm = <T extends {}>({
  defaultValues,
  onSubmit,
}: {
  defaultValues: T;
  onSubmit: (values: T) => void;
}) => {
  const [values, setValues] = useState(defaultValues);

  return {
    values,
    onInputChange:
      (key: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) =>
        setValues({ ...values, [key]: event.target.value }),

    handleSubmit: () => onSubmit(values),
  };
};
