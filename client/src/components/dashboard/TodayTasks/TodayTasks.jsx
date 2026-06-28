import { CalendarDays } from 'lucide-react';

import Card from '../../ui/Card';

import useDashboard from '../../../hooks/useDashboard';

import styles from './TodayTasks.module.css';

const TodayTasks = () => {
    const { loading, tasksToday } = useDashboard();

    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <h2>Today's Tasks</h2>

                <CalendarDays size={20} />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : tasksToday.length === 0 ? (
                <p className={styles.empty}>
                    No tasks scheduled for today.
                </p>
            ) : (
                <ul className={styles.list}>
                    {tasksToday.map((task) => (
                        <li
                            key={task.id}
                            className={styles.item}
                        >
                            <div>
                                <h3>{task.title}</h3>

                                <span>{task.priority}</span>
                            </div>

                            <small>{task.status}</small>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
};

export default TodayTasks;