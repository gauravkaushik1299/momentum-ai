import { useEffect, useState } from 'react';

import Button from '../../ui/Button';

import styles from './GoalForm.module.css';

/**
 * Goal Form
 *
 * Used for:
 * - Create Goal
 * - Edit Goal
 */
const GoalForm = ({
    initialValues = null,
    onCancel,
    onSubmit,
}) => {
    const getInitialState = () => ({
        title: initialValues?.title ?? '',
        description:
            initialValues?.description ?? '',
        category:
            initialValues?.category ?? 'Career',
        priority:
            initialValues?.priority ?? 'Medium',
        progress:
            initialValues?.progress ?? 0,
        targetDate:
            initialValues?.targetDate ?? '',
        status:
            initialValues?.status ??
            'Not Started',
        notes:
            initialValues?.notes ?? '',
    });

    const [formData, setFormData] =
        useState(getInitialState);

    useEffect(() => {
        setFormData(getInitialState());
    }, [initialValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.title.trim()) {
            alert('Goal title is required.');
            return;
        }

        onSubmit({
            ...formData,
            progress: Number(formData.progress),
        });
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <label>Goal Title</label>

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Become a Full Stack Developer"
                />
            </div>

            <div className={styles.field}>
                <label>Description</label>

                <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe this goal..."
                />
            </div>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option>Career</option>
                        <option>Education</option>
                        <option>Health</option>
                        <option>Finance</option>
                        <option>Personal</option>
                        <option>Learning</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label>Priority</label>

                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            </div>

            <div className={styles.field}>
                <div className={styles.progressHeader}>
                    <label>Progress</label>

                    <strong>
                        {formData.progress}%
                    </strong>
                </div>

                <input
                    className={styles.slider}
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    name="progress"
                    value={formData.progress}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label>Target Date</label>

                    <input
                        type="date"
                        name="targetDate"
                        value={formData.targetDate}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>

            <div className={styles.field}>
                <label>Notes</label>

                <textarea
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Additional notes..."
                />
            </div>

            <div className={styles.actions}>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button type="submit">
                    {initialValues
                        ? 'Update Goal'
                        : 'Create Goal'}
                </Button>
            </div>
        </form>
    );
};

export default GoalForm;