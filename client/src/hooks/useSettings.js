import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";

import {
  subscribeToSettings,
  updateSettings,
} from "../services/settingsService";

const useSettings = () => {
  const { user } = useAuth();

  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSettings(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToSettings(user.uid, (data) => {
      setSettings(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const saveSettings = async (updates) => {
    await updateSettings(user.uid, updates);
  };

  return {
    settings,
    loading,
    saveSettings,
  };
};

export default useSettings;
