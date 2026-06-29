import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import AppLayout from '../../components/layout/AppLayout';
import PageHeader from '../../components/common/PageHeader';

import CalendarView from '../../components/calendar/CalendarView';
import DayAgenda from '../../components/calendar/DayAgenda';
import EventDetails from '../../components/calendar/EventDetails';

import Modal from '../../components/ui/Modal';

import TaskForm from '../../components/tasks/TaskForm';
import GoalForm from '../../components/goals/GoalForm';

import useCalendar from '../../hooks/useCalendar';
import useTasks from '../../hooks/useTasks';
import useGoals from '../../hooks/useGoals';

import styles from './CalendarPage.module.css';

const CalendarPage = () => {
    const {
        events,
        loading,
    } = useCalendar();

    const { addTask } = useTasks();
    const { addGoal } = useGoals();

    const [selectedEvent, setSelectedEvent] =
        useState(null);

    const [selectedDate, setSelectedDate] =
        useState(new Date());

    const [currentDate, setCurrentDate] =
        useState(new Date());

    const [currentView, setCurrentView] =
        useState('month');

    const [isTaskModalOpen, setIsTaskModalOpen] =
        useState(false);

    const [isGoalModalOpen, setIsGoalModalOpen] =
        useState(false);

    /**
     * Events for currently selected day.
     */
    const selectedDateEvents = useMemo(() => {
        return events.filter(
            (event) =>
                event.start.toDateString() ===
                selectedDate.toDateString()
        );
    }, [events, selectedDate]);

    /**
     * User clicked a day.
     */
    const handleSelectSlot = (slotInfo) => {
        setSelectedDate(slotInfo.start);
    };

    /**
     * Open Task modal.
     */
    const handleAddTask = () => {
        setIsTaskModalOpen(true);
    };

    /**
     * Open Goal modal.
     */
    const handleAddGoal = () => {
        setIsGoalModalOpen(true);
    };

    /**
     * Create task.
     */
    const handleCreateTask = async (task) => {
        try {
            await addTask(task);

            toast.success(
                'Task created successfully.'
            );

            setIsTaskModalOpen(false);
        } catch (error) {
            console.error(error);

            toast.error(
                'Failed to create task.'
            );
        }
    };

    /**
     * Create goal.
     */
    const handleCreateGoal = async (goal) => {
        try {
            await addGoal(goal);

            toast.success(
                'Goal created successfully.'
            );

            setIsGoalModalOpen(false);
        } catch (error) {
            console.error(error);

            toast.error(
                'Failed to create goal.'
            );
        }
    };

    return (
        <AppLayout>
            <div className={styles.page}>
                <PageHeader
                    title="Calendar"
                    subtitle="Plan your work visually."
                />

                <CalendarView
                    events={events}
                    loading={loading}
                    currentDate={currentDate}
                    currentView={currentView}
                    onNavigate={setCurrentDate}
                    onView={setCurrentView}
                    onSelectEvent={setSelectedEvent}
                    onSelectSlot={handleSelectSlot}
                />

                <DayAgenda
                    date={selectedDate}
                    events={selectedDateEvents}
                    onAddTask={handleAddTask}
                    onAddGoal={handleAddGoal}
                />

                <Modal
                    isOpen={!!selectedEvent}
                    title={
                        selectedEvent?.type ===
                            'task'
                            ? 'Task'
                            : 'Goal'
                    }
                    onClose={() =>
                        setSelectedEvent(null)
                    }
                >
                    <EventDetails
                        event={selectedEvent}
                    />
                </Modal>

                <Modal
                    isOpen={isTaskModalOpen}
                    title="Create Task"
                    onClose={() =>
                        setIsTaskModalOpen(false)
                    }
                >
                    <TaskForm
                        initialValues={{
                            dueDate:
                                selectedDate
                                    .toISOString()
                                    .split('T')[0],
                        }}
                        onCancel={() =>
                            setIsTaskModalOpen(false)
                        }
                        onSubmit={
                            handleCreateTask
                        }
                    />
                </Modal>

                <Modal
                    isOpen={isGoalModalOpen}
                    title="Create Goal"
                    onClose={() =>
                        setIsGoalModalOpen(false)
                    }
                >
                    <GoalForm
                        initialValues={{
                            targetDate:
                                selectedDate
                                    .toISOString()
                                    .split('T')[0],
                        }}
                        onCancel={() =>
                            setIsGoalModalOpen(false)
                        }
                        onSubmit={
                            handleCreateGoal
                        }
                    />
                </Modal>
            </div>
        </AppLayout>
    );
};

export default CalendarPage;