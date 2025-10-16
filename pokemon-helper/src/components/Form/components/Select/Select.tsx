import { Flex, Select, Typography } from "antd";
import type { FC } from "react";

type Props = {
  value?: string;
  options: { label: string; value: string }[];
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fixedWidth?: number;
};

export const FormSelect: FC<Props> = ({
  value,
  label,
  onChange,
  placeholder,
  options,
  fixedWidth,
}) => {
  return (
    <Flex vertical gap={4}>
      <Typography.Text strong>{label}</Typography.Text>
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
