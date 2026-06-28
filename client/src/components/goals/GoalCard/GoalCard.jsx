import {
    CalendarDays,
    Pencil,
    Target,
    Trash2,
} from 'lucide-react';

import styles from './GoalCard.module.css';

const GoalCard = ({
    goal,
    onEdit,
    onDelete,
}) => {
    const progress = Math.min(
        Math.max(goal.progress ?? 0, 0),
        100
    );

    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h3>{goal.title}</h3>

                    <p>{goal.description}</p>
                </div>

                <Target
                    size={22}
                    className={styles.icon}
                />
            </div>

            <div className={styles.progressSection}>
                <div className={styles.progressInfo}>
                    <span>Progress</span>

                    <strong>{progress}%</strong>
                </div>

                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.meta}>
                    <span>{goal.category}</span>

                    <span>{goal.priority}</span>

                    <span>
                        <CalendarDays size={15} />

                        {goal.targetDate}
                    </span>
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={() => onEdit(goal)}
                        aria-label="Edit Goal"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() => onDelete(goal)}
                        aria-label="Delete Goal"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default GoalCard;