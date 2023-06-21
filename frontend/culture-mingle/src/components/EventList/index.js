import React from 'react';
import EventComponent from './EventComponent';

function EventList({ events }) {
    return (
        <div>
            {events && events.map(item => (
                <EventComponent key={item.id} event={item} />
            ))}
        </div>
    )
}
export default EventList 