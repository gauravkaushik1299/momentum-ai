import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import ChartCard from '../ChartCard';
import EmptyChart from '../EmptyChart';

import useAnalytics from '../../../hooks/useAnalytics';

import { chartTheme } from '../../../constants/chartTheme';

const GoalProgressChart = () => {
    const { goalProgress } =
        useAnalytics();

    if (goalProgress.length === 0) {
        return (
            <ChartCard
                title="Goal Progress"
                subtitle="Current completion percentage"
            >
                <EmptyChart message="Create a goal to start tracking your progress." />
            </ChartCard>
        );
    }

    return (
        <ChartCard
            title="Goal Progress"
            subtitle="Current completion percentage"
        >
            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <BarChart
                    data={goalProgress}
                >
                    <CartesianGrid
                        stroke={
                            chartTheme.grid
                        }
                    />

                    <XAxis dataKey="name" />

                    <YAxis
                        domain={[0, 100]}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="progress"
                        fill={
                            chartTheme.success
                        }
                        radius={[
                            6,
                            6,
                            0,
                            0,
                        ]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default GoalProgressChart;