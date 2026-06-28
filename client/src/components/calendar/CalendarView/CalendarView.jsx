import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import {
    format,
    getDay,
    parse,
    startOfWeek,
} from 'date-fns';

import { enUS } from 'date-fns/locale';

import useCalendar from '../../../hooks/useCalendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import styles from './CalendarView.module.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CalendarView = () => {
    const { events, loading } =
        useCalendar();

    if (loading) {
        return (
            <div className={styles.loading}>
                Loading calendar...
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: 700,
                }}
            />
        </div>
    );
};

export default CalendarView;