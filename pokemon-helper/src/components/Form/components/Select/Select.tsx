import { Flex, Select, Typography } from "antd";
import type { FC } from "react";

type Props = {
  value?: string;
  options: { label: string; value: string }[];
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fixedWidth?: number | string;
  required?: boolean
};

export const FormSelect: FC<Props> = ({
  value,
  label,
  onChange,
  placeholder,
  options,
  fixedWidth,
  required
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
        placeholder={placeholder}
        onChange={onChange}
        optionFilterProp="label"
      />
    </Flex>
  );
};
