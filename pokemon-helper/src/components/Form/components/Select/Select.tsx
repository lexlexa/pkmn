import { Flex, Select, Typography, type SelectProps } from "antd";
import type { FC } from "react";

type Props = {
  value?: string;
  options: SelectProps['options'];
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fixedWidth?: number | string;
  required?: boolean,
  disabled?: boolean;
};

export const FormSelect: FC<Props> = ({
  value,
  label,
  onChange,
  placeholder = 'Не выбрано',
  options,
  fixedWidth,
  required,
  disabled
}) => {
  return (
    <Flex vertical gap={4} style={{ width: fixedWidth }}>
      <Typography.Text strong>
        {label}
        {required && <span style={{ color: 'red' }}>*</span>}
      </Typography.Text>
      <Select
        style={{ width: fixedWidth, flexShrink: 0 }}
        options={options}
        value={value}
        showSearch
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        optionFilterProp="label"
      />
    </Flex>
  );
};
