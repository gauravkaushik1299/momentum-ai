import styles from './StatusBadge.module.css';

/**
 * Displays the current status of a task.
 */
const StatusBadge = ({ status = 'Todo' }) => {
    const normalizedStatus = status
        .toLowerCase()
        .replace(/\s+/g, '');

    return (
        <span
            className={`${styles.badge} ${styles[normalizedStatus]}`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;