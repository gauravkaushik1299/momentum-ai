import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import {
    format,
    getDay,
    parse,
    startOfWeek,
} from 'date-fns';

import { enUS } from 'date-fns/locale';

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

const eventPropGetter = (event) => {
    return {
        style: {
            backgroundColor:
                event.type === 'task'
                    ? '#6366f1'
                    : '#10b981',

            border: 'none',

            borderRadius: '8px',

            color: '#fff',
        },
    };
};

const CalendarView = ({
    events,
    loading,

    currentDate,
    currentView,

    onNavigate,
    onView,

    onSelectEvent,
    onSelectSlot,
}) => {
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
                date={currentDate}
                view={currentView}
                onNavigate={onNavigate}
                onView={onView}
                startAccessor="start"
                endAccessor="end"
                selectable
                eventPropGetter={eventPropGetter}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                style={{
                    height: 700,
                }}
            />
        </div>
    );
};

export default CalendarView;