import { useState } from "react";

import {
    AlertTriangle,
    CalendarClock,
    CheckCircle2,
    Sparkles,
    Target,
    X,
} from "lucide-react";

import useAnalytics from "../../../hooks/useAnalytics";

import styles from "./NotificationsDropdown.module.css";

const NotificationsDropdown = () => {
    const {
        overdueTasks,
        dueTodayTasks,
        activeGoals,
        completedTasks,
        productivity,
    } = useAnalytics();

    const [dismissed, setDismissed] = useState([]);

    const notifications = [];

    if (overdueTasks.length > 0) {
        notifications.push({
            id: "overdue",
            icon: AlertTriangle,
            color: "danger",
            title: "Overdue Tasks",
            text: `${overdueTasks.length} overdue task${overdueTasks.length > 1 ? "s require" : " requires"
                } your attention.`,
        });
    }

    if (dueTodayTasks.length > 0) {
        notifications.push({
            id: "today",
            icon: CalendarClock,
            color: "warning",
            title: "Due Today",
            text: `${dueTodayTasks.length} task${dueTodayTasks.length > 1 ? "s are" : " is"
                } due today.`,
        });
    }

    if (activeGoals > 0) {
        notifications.push({
            id: "goals",
            icon: Target,
            color: "primary",
            title: "Goals",
            text: `You currently have ${activeGoals} active goal${activeGoals > 1 ? "s" : ""
                }.`,
        });
    }

    if (completedTasks > 0) {
        notifications.push({
            id: "progress",
            icon: CheckCircle2,
            color: "success",
            title: "Progress",
            text: `You've completed ${completedTasks} task${completedTasks > 1 ? "s" : ""
                }. Great work!`,
        });
    }

    notifications.push({
        id: "ai",
        icon: Sparkles,
        color: "primary",
        title: "Momentum AI",
        text: `Today's AI recommendations are ready. Current productivity: ${productivity}%.`,
    });

    const visibleNotifications = notifications.filter(
        (notification) =>
            !dismissed.includes(notification.id)
    );

    return (
        <div className={styles.dropdown}>
            <div className={styles.header}>
                <h4>Notifications</h4>

                <span>
                    {visibleNotifications.length}
                </span>
            </div>

            {visibleNotifications.length === 0 ? (
                <div className={styles.empty}>
                    <Sparkles size={34} />

                    <p>
                        You're all caught up!
                    </p>

                    <small>
                        No new notifications.
                    </small>
                </div>
            ) : (
                visibleNotifications.map(
                    (notification) => {
                        const Icon =
                            notification.icon;

                        return (
                            <div
                                key={
                                    notification.id
                                }
                                className={
                                    styles.item
                                }
                            >
                                <button
                                    className={
                                        styles.closeButton
                                    }
                                    onClick={() =>
                                        setDismissed(
                                            (
                                                previous
                                            ) => [
                                                    ...previous,
                                                    notification.id,
                                                ]
                                        )
                                    }
                                    aria-label="Dismiss notification"
                                >
                                    <X
                                        size={
                                            14
                                        }
                                    />
                                </button>

                                <div
                                    className={`${styles.icon} ${styles[
                                        notification
                                            .color
                                    ]
                                        }`}
                                >
                                    <Icon
                                        size={
                                            18
                                        }
                                    />
                                </div>

                                <div
                                    className={
                                        styles.content
                                    }
                                >
                                    <strong>
                                        {
                                            notification.title
                                        }
                                    </strong>

                                    <span>
                                        {
                                            notification.text
                                        }
                                    </span>
                                </div>
                            </div>
                        );
                    }
                )
            )}
        </div>
    );
};

export default NotificationsDropdown;