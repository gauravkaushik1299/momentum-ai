import { useMemo } from "react";

import useTasks from "./useTasks";
import useGoals from "./useGoals";

const isToday = (dateString) => {
  if (!dateString) {
    return false;
  }

  const today = new Date();
  const date = new Date(dateString);

  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
};

const useDashboard = () => {
  const { tasks, loading: tasksLoading } = useTasks();

  const { goals, loading: goalsLoading } = useGoals();

  return useMemo(() => {
    const completedTasks = tasks.filter((task) => task.status === "Completed");

    const activeTasks = tasks.filter((task) => task.status !== "Completed");

    const tasksToday = tasks.filter((task) => isToday(task.dueDate));

    const productivity =
      tasks.length === 0
        ? 0
        : Math.round((completedTasks.length / tasks.length) * 100);

    const upcomingTasks = [...activeTasks]
      .filter((task) => task.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    const completedGoals = goals.filter((goal) => goal.status === "Completed");

    const activeGoals = goals.filter((goal) => goal.status !== "Completed");

    return {
      loading: tasksLoading || goalsLoading,

      tasks,

      goals,

      totalTasks: tasks.length,

      completedTasks: completedTasks.length,

      activeTasks: activeTasks.length,

      totalGoals: goals.length,

      completedGoals: completedGoals.length,

      activeGoals: activeGoals.length,

      tasksToday,

      productivity,

      upcomingTasks,
    };
  }, [tasks, goals, tasksLoading, goalsLoading]);
};

export default useDashboard;
