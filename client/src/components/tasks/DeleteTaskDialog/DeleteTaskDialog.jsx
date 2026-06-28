import Button from '../../ui/Button';

import styles from './DeleteTaskDialog.module.css';

const DeleteTaskDialog = ({
    task,
    onCancel,
    onConfirm,
}) => {
    return (
        <div className={styles.container}>
            <p className={styles.message}>
                Are you sure you want to delete
            </p>

            <h3 className={styles.title}>
                "{task?.title}"
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
                    onClick={() =>
                        onConfirm(task.id)
                    }
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default DeleteTaskDialog;