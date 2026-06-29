import {
    CheckCircle2,
    ListChecks,
    Target,
    Trophy,
} from 'lucide-react';

import SettingsCard from '../SettingsCard';

import useDashboard from '../../../hooks/useDashboard';

import styles from './ProfileStats.module.css';

const ProfileStats = () => {
    const {
        totalTasks,
        completedTasks,
        totalGoals,
        completedGoals,
    } = useDashboard();

    const stats = [
        {
            title: 'Tasks Created',
            value: totalTasks,
            icon: ListChecks,
        },
        {
            title: 'Completed Tasks',
            value: completedTasks,
            icon: CheckCircle2,
        },
        {
            title: 'Goals Created',
            value: totalGoals,
            icon: Target,
        },
        {
            title: 'Completed Goals',
            value: completedGoals,
            icon: Trophy,
        },
    ];

    return (
        <SettingsCard
            title="Statistics"
            description="Your productivity overview."
        >
            <div className={styles.grid}>
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className={styles.card}
                        >
                            <Icon
                                className={styles.icon}
                                size={28}
                            />

                            <h2>{stat.value}</h2>

                            <p>{stat.title}</p>
                        </div>
                    );
                })}
            </div>
        </SettingsCard>
    );
};

export default ProfileStats;