import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const CalendarView = ({ itineraries }) => {
    const events = itineraries.map((itinerary) => ({
        title: itinerary.title,
        start: new Date(itinerary.startDate),
        end: new Date(itinerary.endDate),
    }));

    return (
        <div>
            <h2>Itinerary Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default CalendarView;
