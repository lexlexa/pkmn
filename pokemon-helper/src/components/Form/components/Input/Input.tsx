import { Flex, Input, Typography } from "antd";
import type { FC } from "react";

type Props = {
  value?: string | number;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  error?: string;
};

export const FormInput: FC<Props> = ({
  value,
  label,
  onChange,
  placeholder,
  fullWidth,
  required,
  error
}) => {
  return (
    <Flex style={{ width: fullWidth ? '100%' : '' }} vertical gap={4}>
      <Typography.Text strong>
        {label}
        {required && <span style={{ color: 'red' }}>*</span>}
      </Typography.Text>
      <Input
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
