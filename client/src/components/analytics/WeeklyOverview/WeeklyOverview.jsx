import {
    CalendarCheck,
    CalendarDays,
    CheckCircle2,
    Clock3,
    TrendingUp,
    TriangleAlert,
} from 'lucide-react';

import ChartCard from '../ChartCard';

import useAnalytics from '../../../hooks/useAnalytics';

import styles from './WeeklyOverview.module.css';

const WeeklyOverview = () => {
    const {
        productivity,
        completedThisWeek,
        completedThisMonth,
        dueToday,
        overdue,
        activeGoals,
    } = useAnalytics();

    const items = [
        {
            title: 'Completed This Week',
            value: completedThisWeek,
            icon: CheckCircle2,
        },
        {
            title: 'Completed This Month',
            value: completedThisMonth,
            icon: CalendarDays,
        },
        {
            title: 'Due Today',
            value: dueToday,
            icon: Clock3,
        },
        {
            title: 'Overdue Tasks',
            value: overdue,
            icon: TriangleAlert,
        },
        {
            title: 'Active Goals',
            value: activeGoals,
            icon: CalendarCheck,
        },
        {
            title: 'Productivity',
            value: `${productivity}%`,
            icon: TrendingUp,
        },
    ];

    return (
        <ChartCard
            title="Weekly Overview"
            subtitle="Your productivity at a glance"
        >
            <div className={styles.grid}>
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className={styles.item}
                        >
                            <div className={styles.icon}>
                                <Icon size={22} />
                            </div>

                            <div>
                                <h3>{item.value}</h3>

                                <p>{item.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ChartCard>
    );
};

export default WeeklyOverview;