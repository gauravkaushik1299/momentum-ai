import { Sparkles, ArrowRight } from "lucide-react";

import { useAI } from "../../ai/AIProvider";

import useAnalytics from "../../../hooks/useAnalytics";

import styles from "./AIRecommendation.module.css";

const AIRecommendation = () => {
    const {
        productivity,
        overdueTasks,
        highPriorityTasks,
        upcomingTasks,
    } = useAnalytics();

    const { openPanel } = useAI();

    const topTask =
        overdueTasks[0] ??
        highPriorityTasks[0] ??
        upcomingTasks[0];

    return (
        <section className={styles.card}>
            <div className={styles.icon}>
                <Sparkles size={26} />
            </div>

            <div className={styles.content}>
                <span className={styles.badge}>
                    Momentum AI
                </span>

                <h2>
                    Today's Recommendation
                </h2>

                {topTask ? (
                    <>
                        <h3>
                            {topTask.title}
                        </h3>

                        <p>
                            {overdueTasks.length > 0
                                ? "This task is overdue and should be completed first."
                                : "This task has the highest priority based on your workload."}
                        </p>

                        <div className={styles.footer}>
                            <span>
                                Productivity:
                                {" "}
                                <strong>
                                    {productivity}%
                                </strong>
                            </span>

                            <button
                                onClick={
                                    openPanel
                                }
                            >
                                Open AI Coach

                                <ArrowRight
                                    size={18}
                                />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h3>
                            You're all caught up 🎉
                        </h3>

                        <p>
                            No urgent work at the moment.
                            Consider creating a new goal.
                        </p>

                        <button
                            onClick={
                                openPanel
                            }
                        >
                            Ask Momentum AI
                        </button>
                    </>
                )}
            </div>
        </section>
    );
};

export default AIRecommendation;