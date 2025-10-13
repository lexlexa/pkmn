import { Drawer } from "antd";
import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

export const WithDrawer: FC<Props> = ({ children, open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} closable>
      {children}
    </Drawer>
  );
};
