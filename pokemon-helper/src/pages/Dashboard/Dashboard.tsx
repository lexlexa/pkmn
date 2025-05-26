import { useEffect } from "react";
import { withLayout } from "../../hocs/withLayout";
import styles from "./Dashboard.module.css";
import { DashBoardItem } from "./DashboardItem/DashboardItem";
import { $dashboardData, loadDashboardFx } from "./store";
import { useUnit } from "effector-react";

const data = [
  {
    title: "Test",
    slug: "sv1",
    all: { count: 100, max: 200 },
    normal: { count: 100, max: 200 },
    reverse: { count: 100, max: 200 },
    normalHolo: { count: 100, max: 200 },
  },
];

export const Dashboard = withLayout(() => {
  const dashboardData = useUnit($dashboardData);
  useEffect(() => {
    loadDashboardFx();
  }, []);

  return (
    <div className={styles.container}>
      {dashboardData.map((item) => (
        <DashBoardItem {...item} />
      ))}
    </div>
  );
});
