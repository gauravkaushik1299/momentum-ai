import {
    CalendarPlus,
    ListChecks,
    Target,
} from 'lucide-react';

import Button from '../../ui/Button';

import styles from './DayAgenda.module.css';

const DayAgenda = ({
    date,
    events = [],
    onAddTask,
    onAddGoal,
}) => {
    if (!date) {
        return null;
    }

    const tasks = events.filter(
        (event) => event.type === 'task'
    );

    const goals = events.filter(
        (event) => event.type === 'goal'
    );

    return (
        <section className={styles.panel}>
            <header className={styles.header}>
                <CalendarPlus size={24} />

                <div>
                    <h2>
                        {date.toLocaleDateString()}
                    </h2>

                    <p>
                        {events.length} scheduled item
                        {events.length !== 1 && 's'}
                    </p>
                </div>
            </header>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <ListChecks size={18} />
                    <span>
                        Tasks ({tasks.length})
                    </span>
                </div>

                {tasks.length === 0 ? (
                    <p className={styles.empty}>
                        No tasks scheduled.
                    </p>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className={styles.item}
                        >
                            {task.title}
                        </div>
                    ))
                )}
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <Target size={18} />
                    <span>
                        Goals ({goals.length})
                    </span>
                </div>

                {goals.length === 0 ? (
                    <p className={styles.empty}>
                        No goals scheduled.
                    </p>
                ) : (
                    goals.map((goal) => (
                        <div
                            key={goal.id}
                            className={styles.item}
                        >
                            {goal.title}
                        </div>
                    ))
                )}
            </div>

            <div className={styles.actions}>
                <Button
                    variant="secondary"
                    onClick={onAddTask}
                >
                    + Add Task
                </Button>

                <Button
                    onClick={onAddGoal}
                >
                    + Add Goal
                </Button>
            </div>
        </section>
    );
};

export default DayAgenda;