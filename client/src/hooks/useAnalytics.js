import { useMemo } from "react";

import useDashboard from "./useDashboard";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const useAnalytics = () => {
  const dashboard = useDashboard();

  const analytics = useMemo(() => {
    const { tasks, goals } = dashboard;

    const today = new Date();

    /*
    =============================
    Weekly Tasks
    =============================
    */

    const weeklyTasks = WEEK_DAYS.map((day) => ({
      day,
      created: 0,
      completed: 0,
    }));

    /*
    =============================
    Goal Progress
    =============================
    */

    const goalProgress = goals.map((goal) => ({
      name:
        goal.title.length > 18
          ? `${goal.title.substring(0, 18)}...`
          : goal.title,
      progress: goal.progress ?? 0,
    }));

    /*
    =============================
    Task Status
    =============================
    */

    const statusDistribution = [
      {
        name: "Completed",
        value: dashboard.completedTasks,
      },
      {
        name: "Pending",
        value: dashboard.activeTasks,
      },
    ];

    /*
    =============================
    Time Analytics
    =============================
    */

    let dueToday = 0;
    let overdue = 0;
    let completedThisWeek = 0;
    let completedThisMonth = 0;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    tasks.forEach((task) => {
      if (!task.dueDate) return;

      const date = new Date(task.dueDate);

      weeklyTasks[date.getDay()].created++;

      if (task.status === "Completed") {
        weeklyTasks[date.getDay()].completed++;

        if (date >= startOfWeek) {
          completedThisWeek++;
        }

        if (date >= startOfMonth) {
          completedThisMonth++;
        }
      }

      if (date.toDateString() === today.toDateString()) {
        dueToday++;
      }

      if (task.status !== "Completed" && date < today) {
        overdue++;
      }
    });

    /*
    =============================
    AI DATA
    =============================
    */

    const overdueTasks = tasks.filter((task) => {
      if (!task.dueDate) return false;

      return task.status !== "Completed" && new Date(task.dueDate) < today;
    });

    const dueTodayTasks = tasks.filter((task) => {
      if (!task.dueDate) return false;

      return (
        new Date(task.dueDate).toDateString() === today.toDateString() &&
        task.status !== "Completed"
      );
    });

    const upcomingTasks = [...tasks]
      .filter((task) => task.status !== "Completed" && task.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "High" && task.status !== "Completed",
    );

    const nearestGoal =
      [...goals]
        .filter((goal) => goal.status !== "Completed" && goal.targetDate)
        .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))[0] ||
      null;

    const averageGoalProgress =
      goals.length === 0
        ? 0
        : Math.round(
            goals.reduce((sum, goal) => sum + (goal.progress ?? 0), 0) /
              goals.length,
          );

    return {
      weeklyTasks,

      goalProgress,

      statusDistribution,

      dueToday,

      overdue,

      completedThisWeek,

      completedThisMonth,

      overdueTasks,

      dueTodayTasks,

      upcomingTasks,

      highPriorityTasks,

      nearestGoal,

      averageGoalProgress,
    };
  }, [dashboard]);

  return {
    ...dashboard,

    ...analytics,
  };
};

export default useAnalytics;
