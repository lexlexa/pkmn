import { useEffect } from "react";
import { withLayout } from "../../hocs/withLayout";
import styles from "./Dashboard.module.css";
import { DashBoardItem } from "./DashboardItem/DashboardItem";
import { $dashboardData, loadDashboardFx } from "./store";
import { useUnit } from "effector-react";

export const Dashboard = withLayout(() => {
  const dashboardData = useUnit($dashboardData);
  useEffect(() => {
    loadDashboardFx();
  }, []);

  return (
    <div className={styles.container}>
      {dashboardData.map((item) => (
        <DashBoardItem key={item.slug} {...item} />
      ))}
    </div>
  );
});
