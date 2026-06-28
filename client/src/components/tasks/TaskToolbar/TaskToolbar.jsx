import { Plus, Search } from 'lucide-react';

import Button from '../../ui/Button';

import styles from './TaskToolbar.module.css';

/**
 * Toolbar displayed above the task list.
 */
const TaskToolbar = ({
    search,
    onSearchChange,
    onCreateTask,
}) => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.searchContainer}>
                <Search
                    size={18}
                    className={styles.searchIcon}
                />

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(event) =>
                        onSearchChange(
                            event.target.value
                        )
                    }
                    className={styles.searchInput}
                />
            </div>

            <Button
                onClick={onCreateTask}
                leftIcon={<Plus size={18} />}
                className={styles.newTaskButton}
            >
                New Task
            </Button>
        </div>
    );
};

export default TaskToolbar;