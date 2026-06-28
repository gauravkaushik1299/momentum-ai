import { Clock3 } from 'lucide-react';

import Card from '../../ui/Card';

import useDashboard from '../../../hooks/useDashboard';

import styles from './UpcomingDeadlines.module.css';

const UpcomingDeadlines = () => {
    const { loading, upcomingTasks } =
        useDashboard();

    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <h2>Upcoming Deadlines</h2>

                <Clock3 size={20} />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : upcomingTasks.length === 0 ? (
                <p className={styles.empty}>
                    Nothing due soon.
                </p>
            ) : (
                <ul className={styles.list}>
                    {upcomingTasks.map((task) => (
                        <li
                            key={task.id}
                            className={styles.item}
                        >
                            <div>
                                <h3>{task.title}</h3>

                                <small>{task.dueDate}</small>
                            </div>

                            <span>{task.priority}</span>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
};

export default UpcomingDeadlines;