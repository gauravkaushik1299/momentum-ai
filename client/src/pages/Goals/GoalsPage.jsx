import { useMemo, useState } from 'react';

import toast from 'react-hot-toast';

import AppLayout from '../../components/layout/AppLayout';
import PageHeader from '../../components/common/PageHeader';

import Modal from '../../components/ui/Modal';

import GoalToolbar from '../../components/goals/GoalToolbar';
import GoalList from '../../components/goals/GoalList';
import GoalForm from '../../components/goals/GoalForm';
import DeleteGoalDialog from '../../components/goals/DeleteGoalDialog';

import useGoals from '../../hooks/useGoals';

import styles from './GoalsPage.module.css';

const GoalsPage = () => {
    const {
        goals,
        loading,
        addGoal,
        editGoal,
        removeGoal,
    } = useGoals();

    const [search, setSearch] = useState('');

    const [selectedGoal, setSelectedGoal] = useState(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [isDeleteOpen, setIsDeleteOpen] =
        useState(false);

    const filteredGoals = useMemo(() => {
        return goals.filter((goal) =>
            goal.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [goals, search]);

    const handleCreateClick = () => {
        setSelectedGoal(null);

        setIsFormOpen(true);
    };

    const handleEditClick = (goal) => {
        setSelectedGoal(goal);

        setIsFormOpen(true);
    };

    const handleDeleteClick = (goal) => {
        setSelectedGoal(goal);

        setIsDeleteOpen(true);
    };

    const closeForm = () => {
        setSelectedGoal(null);

        setIsFormOpen(false);
    };

    const closeDelete = () => {
        setSelectedGoal(null);

        setIsDeleteOpen(false);
    };

    const handleSubmit = async (goalData) => {
        try {
            if (selectedGoal) {
                await editGoal(
                    selectedGoal.id,
                    goalData
                );

                toast.success(
                    'Goal updated successfully.'
                );
            } else {
                await addGoal(goalData);

                toast.success(
                    'Goal created successfully.'
                );
            }

            closeForm();
        } catch (error) {
            console.error(error);

            toast.error(
                'Failed to save goal.'
            );
        }
    };

    const handleDeleteGoal = async (
        goalId
    ) => {
        try {
            await removeGoal(goalId);

            toast.success(
                'Goal deleted successfully.'
            );

            closeDelete();
        } catch (error) {
            console.error(error);

            toast.error(
                'Failed to delete goal.'
            );
        }
    };

    return (
        <AppLayout>
            <div className={styles.page}>
                <PageHeader
                    title="Goals"
                    subtitle="Track your long-term objectives."
                />

                <GoalToolbar
                    search={search}
                    onSearchChange={setSearch}
                    onCreateGoal={handleCreateClick}
                />

                {loading ? (
                    <p>Loading goals...</p>
                ) : (
                    <GoalList
                        goals={filteredGoals}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                )}

                <Modal
                    isOpen={isFormOpen}
                    title={
                        selectedGoal
                            ? 'Edit Goal'
                            : 'Create Goal'
                    }
                    onClose={closeForm}
                >
                    <GoalForm
                        key={
                            selectedGoal?.id ??
                            'new'
                        }
                        initialValues={
                            selectedGoal
                        }
                        onCancel={closeForm}
                        onSubmit={handleSubmit}
                    />
                </Modal>

                <Modal
                    isOpen={isDeleteOpen}
                    title="Delete Goal"
                    onClose={closeDelete}
                >
                    <DeleteGoalDialog
                        goal={selectedGoal}
                        onCancel={closeDelete}
                        onConfirm={
                            handleDeleteGoal
                        }
                    />
                </Modal>
            </div>
        </AppLayout>
    );
};

export default GoalsPage;