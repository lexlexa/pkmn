import { Layout } from "../components/Layout/Layout";

export const withLayout =
  (Component: React.FC, data?: { noPadding: boolean }) => () => {
    return (
      <Layout noPadding={data?.noPadding}>
        <Component />
      </Layout>
    );
  };
