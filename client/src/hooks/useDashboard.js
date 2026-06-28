import { useMemo } from "react";

import useTasks from "./useTasks";

const isToday = (dateString) => {
  if (!dateString) return false;

  const today = new Date();
  const date = new Date(dateString);

  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
};

const useDashboard = () => {
  const { tasks, loading } = useTasks();

  return useMemo(() => {
    const completedTasks = tasks.filter((task) => task.status === "Completed");

    const activeTasks = tasks.filter((task) => task.status !== "Completed");

    const tasksToday = tasks.filter((task) => isToday(task.dueDate));

    const completedToday = tasksToday.filter(
      (task) => task.status === "Completed",
    );

    const productivity =
      tasksToday.length === 0
        ? 0
        : Math.round((completedToday.length / tasksToday.length) * 100);

    const upcomingTasks = [...activeTasks]
      .filter((task) => task.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    return {
      loading,

      tasks,

      tasksToday,

      completedTasks: completedTasks.length,

      activeTasks: activeTasks.length,

      productivity,

      upcomingTasks,
    };
  }, [tasks, loading]);
};

export default useDashboard;
