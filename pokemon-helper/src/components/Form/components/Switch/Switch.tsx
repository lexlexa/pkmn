import { Flex, Switch, Typography } from "antd";
import type { FC } from "react";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
};

export const FormSwitch: FC<Props> = ({ checked, onChange, label }) => {
  return (
    <Flex gap={8}>
      <Switch checked={checked} onChange={onChange} />
      <Typography.Text>{label}</Typography.Text>
    </Flex>
  );
};
