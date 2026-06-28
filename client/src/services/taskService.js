/**
 * ============================================================================
 * File: taskService.js
 * Path: client/src/services/taskService.js
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

import { mapTaskFormToDocument } from "../utils/taskMapper";

const getTaskCollection = (userId) => collection(db, "users", userId, "tasks");

/**
 * Subscribe to realtime task updates.
 */
export const subscribeToTasks = (userId, callback) => {
  const taskQuery = query(
    getTaskCollection(userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(taskQuery, (snapshot) => {
    const tasks = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    callback(tasks);
  });
};

/**
 * Create task.
 */
export const createTask = async (userId, task) => {
  await addDoc(getTaskCollection(userId), {
    ...mapTaskFormToDocument(task),

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),
  });
};

/**
 * Update task.
 */
export const updateTask = async (userId, taskId, updates) => {
  await updateDoc(doc(db, "users", userId, "tasks", taskId), {
    ...updates,

    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete task.
 */
export const deleteTask = async (userId, taskId) => {
  await deleteDoc(doc(db, "users", userId, "tasks", taskId));
};
