import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
import styles from "./Layout.module.css";
import { Layout as AntdLayout } from "antd";
const { Header, Content } = AntdLayout;

type TLayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: TLayoutProps) => {
  return (
    <div className={styles.container}>
      <AntdLayout>
        <div>
          <HeaderMenu />
        </div>
        <Content className={styles.contentContainer}>
          <div className={styles.content}>{children}</div>
        </Content>
      </AntdLayout>
    </div>
  );
};
