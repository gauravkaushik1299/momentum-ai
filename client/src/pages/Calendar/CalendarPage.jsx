import AppLayout from '../../components/layout/AppLayout';
import PageHeader from '../../components/common/PageHeader';

import CalendarView from '../../components/calendar/CalendarView';

import styles from './CalendarPage.module.css';

const CalendarPage = () => {
    return (
        <AppLayout>
            <div className={styles.page}>
                <PageHeader
                    title="Calendar"
                    subtitle="View your tasks and goals on a unified calendar."
                />

                <CalendarView />
            </div>
        </AppLayout>
    );
};

export default CalendarPage;