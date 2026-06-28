import Button from '../../ui/Button';

import styles from './DeleteGoalDialog.module.css';

/**
 * Delete Goal Confirmation Dialog
 */
const DeleteGoalDialog = ({
    goal,
    onCancel,
    onConfirm,
}) => {
    return (
        <div className={styles.container}>
            <p className={styles.message}>
                Are you sure you want to delete this goal?
            </p>

            <h3 className={styles.title}>
                "{goal?.title}"
            </h3>

            <p className={styles.warning}>
                This action cannot be undone.
            </p>

            <div className={styles.actions}>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    variant="danger"
                    onClick={() => onConfirm(goal.id)}
                >
                    Delete Goal
                </Button>
            </div>
        </div>
    );
};

export default DeleteGoalDialog;