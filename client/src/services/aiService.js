import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("Gemini API Key not found.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

/*
==================================
Build Context
==================================
*/

const buildContext = (analytics) => {
  return `
You are Momentum AI.

You are NOT a chatbot.

You are an intelligent productivity coach whose job is to help users finish important work before deadlines.

Current Productivity:
${analytics.productivity}%

Total Tasks:
${analytics.totalTasks}

Completed Tasks:
${analytics.completedTasks}

Active Tasks:
${analytics.activeTasks}

Overdue Tasks:
${analytics.overdueTasks.length}

Due Today:
${analytics.dueTodayTasks.length}

High Priority Tasks:
${analytics.highPriorityTasks.length}

Average Goal Progress:
${analytics.averageGoalProgress}%

Upcoming Tasks:

${analytics.upcomingTasks
  .map(
    (task) => `
Title: ${task.title}
Priority: ${task.priority}
Status: ${task.status}
Due Date: ${task.dueDate}
`,
  )
  .join("\n")}

Current Goals:

${analytics.goals
  .map(
    (goal) => `
Goal: ${goal.title}
Progress: ${goal.progress ?? 0}%
Status: ${goal.status}
Target Date: ${goal.targetDate ?? "N/A"}
`,
  )
  .join("\n")}
`;
};

/*
==================================
AI Coach
==================================
*/

export const analyzeProductivity = async (analytics) => {
  try {
    const prompt = `
${buildContext(analytics)}

Generate ONLY valid JSON.

{
"summary":"",
"highestPriorityTask":"",
"reason":"",
"schedule":[
"",
"",
""
],
"motivation":""
}

Do not include markdown.

Do not wrap inside code blocks.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return JSON.parse(text);
  } catch (error) {
    console.error(error);

    return {
      summary: "Unable to analyze productivity.",

      highestPriorityTask: "",

      reason: "",

      schedule: [],

      motivation: "Please try again.",
    };
  }
};

/*
==================================
Ask Momentum AI
==================================
*/

export const askMomentumAI = async (analytics, question) => {
  try {
    const prompt = `
${buildContext(analytics)}

User Question:

${question}

Keep your answer concise.

Maximum 200 words.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error(error);

    return "Unable to contact Gemini.";
  }
};
