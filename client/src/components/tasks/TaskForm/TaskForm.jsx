import { useEffect, useState } from 'react';

import Button from '../../ui/Button';

import styles from './TaskForm.module.css';

/**
 * Task Form
 *
 * Used for:
 * - Creating a task
 * - Editing a task
 */
const TaskForm = ({
    initialValues = null,
    onCancel,
    onSubmit,
}) => {
    const getInitialState = () => ({
        title: initialValues?.title ?? '',
        description:
            initialValues?.description ?? '',
        priority:
            initialValues?.priority ?? 'Medium',
        status:
            initialValues?.status ?? 'Todo',
        dueDate:
            initialValues?.dueDate ?? '',
        estimatedMinutes:
            initialValues?.estimatedMinutes ?? 60,
        tags:
            initialValues?.tags?.join(', ') ??
            '',
    });

    const [formData, setFormData] =
        useState(getInitialState);

    /**
     * Update form when switching
     * between Create and Edit.
     */
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
            alert('Task title is required.');
            return;
        }

        onSubmit({
            ...formData,

            tags: formData.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean),
        });
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <label>Title</label>

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label>Description</label>

                <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.grid}>
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

                <div className={styles.field}>
                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label>Due Date</label>

                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <label>Estimated Minutes</label>

                    <input
                        type="number"
                        min="5"
                        step="5"
                        name="estimatedMinutes"
                        value={formData.estimatedMinutes}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label>Tags</label>

                <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="React, Firebase"
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
                        ? 'Update Task'
                        : 'Create Task'}
                </Button>
            </div>
        </form>
    );
};

export default TaskForm;