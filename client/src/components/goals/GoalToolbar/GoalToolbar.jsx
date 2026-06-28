import { Plus, Search } from 'lucide-react';

import Button from '../../ui/Button';

import styles from './GoalToolbar.module.css';

/**
 * Goal Toolbar
 *
 * Handles:
 * - Search
 * - Create Goal
 */
const GoalToolbar = ({
    search,
    onSearchChange,
    onCreateGoal,
}) => {
    return (
        <section className={styles.toolbar}>
            <div className={styles.search}>
                <Search
                    size={18}
                    className={styles.searchIcon}
                />

                <input
                    type="text"
                    placeholder="Search goals..."
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                />
            </div>

            <Button
                onClick={onCreateGoal}
                leftIcon={<Plus size={18} />}
                className={styles.newTaskButton}
            >
                New Goal
            </Button>
        </section>
    );
};

export default GoalToolbar;