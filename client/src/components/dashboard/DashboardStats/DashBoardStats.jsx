import {
    CheckSquare,
    ClipboardList,
    Target,
    TrendingUp,
} from 'lucide-react';

import useDashboard from '../../../hooks/useDashboard';

import StatCard from '../StatCard';

import styles from './DashboardStats.module.css';

/**
 * Dashboard statistics.
 */
const DashboardStats = () => {
    const {
        loading,
        productivity,
        tasksToday,
        activeTasks,
        completedTasks,
    } = useDashboard();

    if (loading) {
        return (
            <section className={styles.grid}>
                <StatCard title="Productivity" value="..." />
                <StatCard title="Today's Tasks" value="..." />
                <StatCard title="Active Tasks" value="..." />
                <StatCard title="Completed" value="..." />
            </section>
        );
    }

    return (
        <section className={styles.grid}>
            <StatCard
                title="Productivity"
                value={`${productivity}%`}
                icon={TrendingUp}
            />

            <StatCard
                title="Today's Tasks"
                value={tasksToday.length}
                icon={CheckSquare}
            />

            <StatCard
                title="Active Tasks"
                value={activeTasks}
                icon={ClipboardList}
            />

            <StatCard
                title="Completed"
                value={completedTasks}
                icon={Target}
            />
        </section>
    );
};

export default DashboardStats;