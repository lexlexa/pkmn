import { Flex, Input, Typography } from "antd";
import type { FC } from "react";

type Props = {
  value?: string | number;
  label?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  error?: string;
  allowClear?: boolean;
};

export const FormInput: FC<Props> = ({
  value,
  label,
  onChange,
  placeholder,
  fullWidth,
  required,
  error,
  allowClear
}) => {
  return (
    <Flex style={{ width: fullWidth ? '100%' : '' }} vertical gap={4}>
      {label && <Typography.Text strong>
        {label}
        {required && <span style={{ color: 'red' }}>*</span>}
      </Typography.Text>}
      <Input
        allowClear={allowClear}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <Typography.Text type="danger">
        {error}
      </Typography.Text>}
    </Flex>
  );
};
