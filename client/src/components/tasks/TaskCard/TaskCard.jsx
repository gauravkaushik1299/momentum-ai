import {
    CalendarDays,
    Clock3,
    Pencil,
    Trash2,
} from 'lucide-react';

import PriorityBadge from '../PriorityBadge';
import StatusBadge from '../StatusBadge';

import styles from './TaskCard.module.css';

/**
 * Displays a single task.
 */
const TaskCard = ({
    task,
    onEdit,
    onDelete,
}) => {
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h3>{task.title}</h3>

                    <p>{task.description}</p>
                </div>

                <div className={styles.badges}>
                    <PriorityBadge
                        priority={task.priority}
                    />

                    <StatusBadge
                        status={task.status}
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.meta}>
                    <span>
                        <CalendarDays size={16} />

                        {task.dueDate}
                    </span>

                    <span>
                        <Clock3 size={16} />

                        {task.estimatedMinutes} mins
                    </span>
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={onEdit}
                        aria-label="Edit Task"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={onDelete}
                        aria-label="Delete Task"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {task.tags?.length > 0 && (
                <div className={styles.tags}>
                    {task.tags.map((tag) => (
                        <span
                            key={tag}
                            className={styles.tag}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
};

export default TaskCard;