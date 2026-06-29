import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import useAnalytics from '../../../hooks/useAnalytics';

import { chartTheme } from '../../../constants/chartTheme';

import ChartCard from '../ChartCard';
import EmptyChart from '../EmptyChart';

const TaskCompletionChart = () => {
    const { weeklyTasks } = useAnalytics();

    const hasData = weeklyTasks.some(
        (day) => day.created > 0
    );

    if (!hasData) {
        return (
            <ChartCard
                title="Weekly Task Completion"
                subtitle="Created vs Completed Tasks"
            >
                <EmptyChart message="Create your first task to start viewing weekly analytics." />
            </ChartCard>
        );
    }

    return (
        <ChartCard
            title="Weekly Task Completion"
            subtitle="Created vs Completed Tasks"
        >
            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <BarChart data={weeklyTasks}>
                    <CartesianGrid
                        stroke={chartTheme.grid}
                        strokeDasharray="3 3"
                    />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="created"
                        fill={chartTheme.primary}
                        radius={[6, 6, 0, 0]}
                        name="Created"
                    />

                    <Bar
                        dataKey="completed"
                        fill={chartTheme.success}
                        radius={[6, 6, 0, 0]}
                        name="Completed"
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default TaskCompletionChart;