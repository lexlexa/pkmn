import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Button, type ButtonProps } from "antd";
import type { FC } from "react";

export const DeleteButton: FC<ButtonProps> = ({ onClick }) => (
  <Button onClick={onClick} color="red" size="small" variant="outlined">
    Удалить
  </Button>
);

export const ExpandButton: FC<ButtonProps & { hidden: boolean }> = ({
  onClick,
  hidden,
}) => (
  <Button
    onClick={onClick}
    size="small"
    icon={!hidden ? <CaretUpOutlined /> : <CaretDownOutlined />}
  />
);
