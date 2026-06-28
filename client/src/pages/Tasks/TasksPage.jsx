/**
 * ============================================================================
 * File: TasksPage.jsx
 * Path: client/src/pages/Tasks/TasksPage.jsx
 * ============================================================================
 */

import { useMemo, useState } from 'react';

import AppLayout from '../../components/layout/AppLayout';
import PageHeader from '../../components/common/PageHeader';

import Modal from '../../components/ui/Modal';

import TaskToolbar from '../../components/tasks/TaskToolbar';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import toast from 'react-hot-toast';
import useTasks from '../../hooks/useTasks';

import styles from './TasksPage.module.css';

const TasksPage = () => {
    const {
        tasks,
        loading,
        addTask,
        editTask,
        removeTask,
    } = useTasks();

    const [search, setSearch] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) =>
            task.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [tasks, search]);

    /**
     * Open Create Modal
     */
    const handleCreateClick = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    /**
     * Open Edit Modal
     */
    const handleEditClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    /**
     * Close Modal
     */
    const handleCloseModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    /**
     * Create / Update Task
     */
    const handleSubmit = async (taskData) => {
        try {
            if (selectedTask) {
                await editTask(selectedTask.id, taskData);
                toast.success('Task updated successfully.');
            } else {
                await addTask(taskData);
                toast.success('Task created successfully.');
            }

            handleCloseModal();
        } catch (error) {
            toast.error('Failed to save task.');
            console.error(error);
        }
    };

    /**
     * Delete Task
     */
    const handleDeleteTask = async (taskId) => {
        try {
            await removeTask(taskId);
            toast.success('Task deleted.');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete task.');
        }
    };

    return (
        <AppLayout>
            <div className={styles.page}>
                <PageHeader
                    title="Tasks"
                    subtitle="Manage your daily work."
                />

                <TaskToolbar
                    search={search}
                    onSearchChange={setSearch}
                    onCreateTask={handleCreateClick}
                />

                {loading ? (
                    <p>Loading tasks...</p>
                ) : (
                    <TaskList
                        tasks={filteredTasks}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTask}
                    />
                )}

                <Modal
                    isOpen={isModalOpen}
                    title={
                        selectedTask
                            ? 'Edit Task'
                            : 'Create New Task'
                    }
                    onClose={handleCloseModal}
                >
                    <TaskForm
                        key={selectedTask?.id ?? 'new'}
                        initialValues={selectedTask}
                        onCancel={handleCloseModal}
                        onSubmit={handleSubmit}
                    />
                </Modal>
            </div>
        </AppLayout>
    );
};

export default TasksPage;