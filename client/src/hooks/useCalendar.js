import { useMemo } from "react";

import useTasks from "./useTasks";
import useGoals from "./useGoals";

const useCalendar = () => {
  const { tasks, loading: tasksLoading } = useTasks();

  const { goals, loading: goalsLoading } = useGoals();

  const events = useMemo(() => {
    const taskEvents = tasks
      .filter((task) => task.dueDate)
      .map((task) => ({
        id: `task-${task.id}`,
        title: task.title,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        allDay: true,
        type: "task",
        resource: task,
      }));

    const goalEvents = goals
      .filter((goal) => goal.targetDate)
      .map((goal) => ({
        id: `goal-${goal.id}`,
        title: goal.title,
        start: new Date(goal.targetDate),
        end: new Date(goal.targetDate),
        allDay: true,
        type: "goal",
        resource: goal,
      }));

    return [...taskEvents, ...goalEvents];
  }, [tasks, goals]);

  return {
    events,
    loading: tasksLoading || goalsLoading,
  };
};

export default useCalendar;
