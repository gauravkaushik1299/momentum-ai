/**
 * ============================================================================
 * File: taskMapper.js
 * Path: client/src/utils/taskMapper.js
 * ----------------------------------------------------------------------------
 * Converts task form data into the format expected by Firestore.
 * ============================================================================
 */

/**
 * Converts TaskForm values into a Firestore document.
 */
export const mapTaskFormToDocument = (task) => ({
  title: task.title.trim(),

  description: task.description.trim(),

  priority: task.priority,

  status: task.status,

  dueDate: task.dueDate || null,

  estimatedMinutes: Number(task.estimatedMinutes),

  tags: task.tags,

  completed: task.status === "Completed",

  archived: false,
});
