import AppLayout from '../../components/layout/AppLayout';

import PageHeader from '../../components/common/PageHeader';

import DashboardStats from '../../components/dashboard/DashboardStats';
import TodayTasks from '../../components/dashboard/TodayTasks';
import UpcomingDeadlines from '../../components/dashboard/UpcomingDeadlines';

import { useAuth } from '../../contexts/AuthContext';

import { getGreeting } from '../../utils/getGreeting';

const DashboardPage = () => {
    const { user } = useAuth();

    const firstName =
        user?.displayName?.split(' ')[0] ?? 'there';

    return (
        <AppLayout>
            <PageHeader
                title={`${getGreeting()}, ${firstName} 👋`}
                subtitle="Welcome back! Here's your productivity overview."
            />

            <DashboardStats />

            <TodayTasks />

            <UpcomingDeadlines />
        </AppLayout>
    );
};

export default DashboardPage;