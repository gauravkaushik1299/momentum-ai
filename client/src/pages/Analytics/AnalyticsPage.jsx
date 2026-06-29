import AppLayout from "../../components/layout/AppLayout";

import PageHeader from "../../components/common/PageHeader";

import AnalyticsStats from "../../components/analytics/AnalyticsStats";
import GoalProgressChart from "../../components/analytics/GoalProgressCharts";
import ProductivityInsights from "../../components/analytics/ProductivityInsights";
import TaskCompletionChart from "../../components/analytics/TaskCompletionChart";
import TaskStatusChart from "../../components/analytics/TaskStatusChart";
import WeeklyOverview from "../../components/analytics/WeeklyOverview";

import styles from "./AnalyticsPage.module.css";

const AnalyticsPage = () => {
    return (
        <AppLayout>
            <div className={styles.page}>
                <PageHeader
                    title="Analytics"
                    subtitle="Track your productivity and progress."
                />

                <AnalyticsStats />

                <div className={styles.chartGrid}>
                    <TaskCompletionChart />

                    <GoalProgressChart />
                </div>

                <div className={styles.chartGrid}>
                    <TaskStatusChart />

                    <WeeklyOverview />
                </div>

                <div className={styles.chartGrid}>
                    <ProductivityInsights />
                </div>
            </div>
        </AppLayout>
    );
};

export default AnalyticsPage;