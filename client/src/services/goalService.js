/**
 * ============================================================================
 * Goal Service
 * ============================================================================
 */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

const getGoalCollection = (userId) => collection(db, "users", userId, "goals");

/**
 * Subscribe to goals.
 */
export const subscribeToGoals = (userId, callback) => {
  const goalQuery = query(
    getGoalCollection(userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(goalQuery, (snapshot) => {
    callback(
      snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })),
    );
  });
};

/**
 * Create goal.
 */
export const createGoal = async (userId, goal) => {
  await addDoc(getGoalCollection(userId), {
    ...goal,

    progress: goal.progress ?? 0,

    completed: false,

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),
  });
};

/**
 * Update goal.
 */
export const updateGoal = async (userId, goalId, updates) => {
  await updateDoc(doc(db, "users", userId, "goals", goalId), {
    ...updates,

    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete goal.
 */
export const deleteGoal = async (userId, goalId) => {
  await deleteDoc(doc(db, "users", userId, "goals", goalId));
};
