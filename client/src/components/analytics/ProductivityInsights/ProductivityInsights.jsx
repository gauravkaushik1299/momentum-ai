import {
    AlertTriangle,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Sparkles,
    Target,
    TrendingUp,
    TriangleAlert,
} from 'lucide-react';

import ChartCard from '../ChartCard';

import useAnalytics from '../../../hooks/useAnalytics';

import styles from './ProductivityInsights.module.css';

const ProductivityInsights = () => {
    const {
        productivity,
        totalTasks,
        completedTasks,
        activeTasks,
        activeGoals,
        completedThisWeek,
        dueToday,
        overdue,
    } = useAnalytics();

    const insights = [];

    /*
     * Productivity
     */
    if (productivity >= 80) {
        insights.push({
            icon: TrendingUp,
            title: 'Excellent Productivity',
            message: `You've completed ${productivity}% of all your tasks. Keep up the great work!`,
        });
    } else if (productivity >= 50) {
        insights.push({
            icon: CheckCircle2,
            title: 'Good Progress',
            message: `You've completed ${completedTasks} task${completedTasks !== 1 ? 's' : ''
                } so far.`,
        });
    } else {
        insights.push({
            icon: AlertTriangle,
            title: 'Needs Attention',
            message:
                'Completing a few pending tasks will significantly improve your productivity.',
        });
    }

    /*
     * Weekly Progress
     */
    if (completedThisWeek > 0) {
        insights.push({
            icon: CalendarDays,
            title: 'Weekly Progress',
            message: `You've completed ${completedThisWeek} task${completedThisWeek !== 1 ? 's' : ''
                } this week.`,
        });
    }

    /*
     * Due Today
     */
    if (dueToday > 0) {
        insights.push({
            icon: Clock3,
            title: 'Due Today',
            message: `You have ${dueToday} task${dueToday !== 1 ? 's' : ''
                } due today.`,
        });
    }

    /*
     * Overdue Tasks
     */
    if (overdue > 0) {
        insights.push({
            icon: TriangleAlert,
            title: 'Overdue Tasks',
            message: `${overdue} task${overdue !== 1 ? 's are' : ' is'
                } overdue. Consider completing ${overdue !== 1 ? 'them' : 'it'
                } soon.`,
        });
    }

    /*
     * Goals
     */
    if (activeGoals > 0) {
        insights.push({
            icon: Target,
            title: 'Goals in Progress',
            message: `You currently have ${activeGoals} active goal${activeGoals !== 1 ? 's' : ''
                }. Keep the momentum going!`,
        });
    }

    /*
     * Remaining Tasks
     */
    if (activeTasks > 0) {
        insights.push({
            icon: Sparkles,
            title: 'Next Focus',
            message: `Only ${activeTasks} remaining task${activeTasks !== 1 ? 's' : ''
                } to reach 100% productivity.`,
        });
    }

    /*
     * Empty State
     */
    if (totalTasks === 0) {
        return (
            <ChartCard
                title="AI Productivity Insights"
                subtitle="Personalized recommendations"
            >
                <div className={styles.empty}>
                    <Sparkles size={54} />

                    <h3>No insights yet</h3>

                    <p>
                        Create your first task to begin receiving personalized
                        productivity insights.
                    </p>
                </div>
            </ChartCard>
        );
    }

    return (
        <ChartCard
            title="AI Productivity Insights"
            subtitle="Personalized recommendations"
        >
            <div className={styles.list}>
                {insights.map((insight, index) => {
                    const Icon = insight.icon;

                    return (
                        <div
                            key={index}
                            className={styles.item}
                        >
                            <div className={styles.icon}>
                                <Icon size={22} />
                            </div>

                            <div>
                                <h4>{insight.title}</h4>

                                <p>{insight.message}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ChartCard>
    );
};

export default ProductivityInsights;