import TaskCard from '../TaskCard';

import styles from './TaskList.module.css';

/**
 * Displays a collection of tasks.
 */
const TaskList = ({
    tasks = [],
    onEdit,
    onDelete,
}) => {
    if (tasks.length === 0) {
        return (
            <div className={styles.empty}>
                <h3>No tasks yet</h3>

                <p>
                    Create your first task to get
                    started.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => onEdit(task)}
                    onDelete={() =>
                        onDelete(task.id)
                    }
                />
            ))}
        </div>
    );
};

export default TaskList;