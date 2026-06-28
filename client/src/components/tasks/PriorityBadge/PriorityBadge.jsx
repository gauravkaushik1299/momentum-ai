import styles from './PriorityBadge.module.css';

/**
 * Displays the priority level of a task.
 */
const PriorityBadge = ({ priority = 'Low' }) => {
    const normalizedPriority = priority.toLowerCase();

    return (
        <span
            className={`${styles.badge} ${styles[normalizedPriority]}`}
        >
            {priority}
        </span>
    );
};

export default PriorityBadge;