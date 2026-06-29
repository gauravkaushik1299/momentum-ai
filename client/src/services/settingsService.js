/**
 * ============================================================================
 * Settings Service
 * ============================================================================
 */

import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "./firebase";

const getSettingsRef = (userId) =>
  doc(db, "users", userId, "settings", "preferences");

const defaultSettings = {
  workStart: "09:00",
  workEnd: "18:00",

  dailyFocusGoal: 240,

  pomodoroLength: 25,

  shortBreak: 5,

  longBreak: 15,

  notifications: true,

  theme: "light",
};

/**
 * Subscribe to user settings.
 */
export const subscribeToSettings = (userId, callback) => {
  const settingsRef = getSettingsRef(userId);

  return onSnapshot(settingsRef, async (snapshot) => {
    if (!snapshot.exists()) {
      await setDoc(settingsRef, {
        ...defaultSettings,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      callback(defaultSettings);

      return;
    }

    callback(snapshot.data());
  });
};

/**
 * Update settings.
 */
export const updateSettings = async (userId, updates) => {
  await setDoc(
    getSettingsRef(userId),
    {
      ...updates,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );
};
