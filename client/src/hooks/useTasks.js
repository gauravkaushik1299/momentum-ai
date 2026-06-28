import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";

import {
  createTask,
  deleteTask,
  subscribeToTasks,
  updateTask,
} from "../services/taskService";

/**
 * Hook for realtime task management.
 */
const useTasks = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToTasks(user.uid, (taskList) => {
      setTasks(taskList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async (task) => {
    await createTask(user.uid, task);
  };

  const editTask = async (taskId, updates) => {
    await updateTask(user.uid, taskId, updates);
  };

  const removeTask = async (taskId) => {
    await deleteTask(user.uid, taskId);
  };

  return {
    tasks,
    loading,

    addTask,
    editTask,
    removeTask,
  };
};

export default useTasks;
