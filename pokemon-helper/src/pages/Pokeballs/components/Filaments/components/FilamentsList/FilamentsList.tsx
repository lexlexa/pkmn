import type { FC } from "react";
import type { TFilament } from "../../../../store";
import { FilamentItem } from "../FilamentItem/FilamentItem";
import { Flex } from "antd";

type Props = {
  list: TFilament[];
  onEdit: (id: string) => void;
};

export const FilamentsList: FC<Props> = ({ list, onEdit }) => {
  console.log(">>>", list);
  return (
    <Flex vertical gap={8}>
      {list.map((item) => (
        <FilamentItem onEdit={onEdit} item={item} />
      ))}
    </Flex>
  );
};
