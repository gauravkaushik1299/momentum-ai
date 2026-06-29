export const generateRecommendations = (analytics) => {
  const recommendations = [];

  if (analytics.overdueTasks.length) {
    recommendations.push({
      type: "warning",
      title: "Overdue Task",
      message: `Complete "${analytics.overdueTasks[0].title}" first.`,
    });
  }

  if (analytics.productivity < 50) {
    recommendations.push({
      type: "tip",
      title: "Low Productivity",
      message: "Try finishing one high-priority task today.",
    });
  }

  return recommendations;
};
