import {
    CheckCircle2,
    ClipboardList,
    Target,
    TrendingUp,
} from 'lucide-react';

import StatCard from '../../dashboard/StatCard';

import useDashboard from '../../../hooks/useDashboard';

import styles from './AnalyticsStats.module.css';

const AnalyticsStats = () => {
    const {
        productivity,
        activeTasks,
        completedTasks,
        activeGoals,
    } = useDashboard();

    return (
        <section className={styles.grid}>
            <StatCard
                title="Productivity"
                value={`${productivity}%`}
                icon={TrendingUp}
            />

            <StatCard
                title="Pending Tasks"
                value={activeTasks}
                icon={ClipboardList}
            />

            <StatCard
                title="Completed Tasks"
                value={completedTasks}
                icon={CheckCircle2}
            />

            <StatCard
                title="Active Goals"
                value={activeGoals}
                icon={Target}
            />
        </section>
    );
};

export default AnalyticsStats;