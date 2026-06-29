import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts';

import ChartCard from '../ChartCard';
import EmptyChart from '../EmptyChart';

import useAnalytics from '../../../hooks/useAnalytics';

import { chartTheme } from '../../../constants/chartTheme';

const COLORS = [
    chartTheme.success,
    chartTheme.warning,
];

const TaskStatusChart = () => {
    const { statusDistribution } =
        useAnalytics();

    const hasData =
        statusDistribution.some(
            (item) => item.value > 0
        );

    if (!hasData) {
        return (
            <ChartCard
                title="Task Status"
                subtitle="Completed vs Pending Tasks"
            >
                <EmptyChart message="Task statistics will appear here once you create tasks." />
            </ChartCard>
        );
    }

    return (
        <ChartCard
            title="Task Status"
            subtitle="Completed vs Pending Tasks"
        >
            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <PieChart>
                    <Pie
                        data={
                            statusDistribution
                        }
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        label
                    >
                        {statusDistribution.map(
                            (_, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index %
                                        COLORS.length
                                        ]
                                    }
                                />
                            )
                        )}
                    </Pie>

                    <Tooltip />

                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default TaskStatusChart;