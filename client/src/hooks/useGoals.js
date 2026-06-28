import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";

import {
  createGoal,
  deleteGoal,
  subscribeToGoals,
  updateGoal,
} from "../services/goalService";

const useGoals = () => {
  const { user } = useAuth();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setGoals([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToGoals(user.uid, (goalList) => {
      setGoals(goalList);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addGoal = async (goal) => {
    await createGoal(user.uid, goal);
  };

  const editGoal = async (goalId, updates) => {
    await updateGoal(user.uid, goalId, updates);
  };

  const removeGoal = async (goalId) => {
    await deleteGoal(user.uid, goalId);
  };

  return {
    goals,
    loading,
    addGoal,
    editGoal,
    removeGoal,
  };
};

export default useGoals;
