import GoalCard from '../GoalCard';

import styles from './GoalList.module.css';

/**
 * Displays all goals.
 */
const GoalList = ({
    goals,
    onEdit,
    onDelete,
}) => {
    if (goals.length === 0) {
        return (
            <div className={styles.empty}>
                <h2>No goals yet</h2>

                <p>
                    Create your first goal to start
                    tracking your long-term progress.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {goals.map((goal) => (
                <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default GoalList;