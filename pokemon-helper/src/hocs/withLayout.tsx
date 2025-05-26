import { Layout } from "../components/Layout/Layout";

export const withLayout = (Component: React.FC) => () => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};
