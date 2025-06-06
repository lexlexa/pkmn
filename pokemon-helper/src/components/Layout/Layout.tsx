import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
import styles from "./Layout.module.css";
import { Layout as AntdLayout } from "antd";
const { Content } = AntdLayout;

type TLayoutProps = {
  children: React.ReactNode;
  noPadding?: boolean;
};

export const Layout = ({ children, noPadding }: TLayoutProps) => {
  return (
    <div className={styles.container}>
      <AntdLayout>
        <div>
          <HeaderMenu />
        </div>
        <Content className={styles.contentContainer}>
          <div
            style={{ padding: noPadding ? "" : 16 }}
            className={styles.content}
          >
            {children}
          </div>
        </Content>
      </AntdLayout>
    </div>
  );
};
