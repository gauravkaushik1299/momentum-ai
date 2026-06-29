import { useContext } from "react";

import AIContext from "./AIContext";

const useAI = () => {
  const context = useContext(AIContext);

  if (!context) {
    throw new Error("useAI must be used within AIProvider.");
  }

  return context;
};

export default useAI;
