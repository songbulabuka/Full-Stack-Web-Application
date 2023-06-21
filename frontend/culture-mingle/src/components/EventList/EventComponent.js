import React from 'react';
import styles from './EventComponent.module.css';
import { Col, Row } from 'antd';
import { normalizeDate } from '../../store/events'
import { NavLink } from 'react-router-dom';


function EventComponent({ event }) {
    return (
        <NavLink to={`/events/${event.id}`} style={{ color: 'black' }}>
            <div className={styles.eventLayout}>
                <Row width="100%">
                    <Col span={18} order={1} className={styles.eventDesc}>
                        <div className={styles.eventTime}>
                            {normalizeDate(event.time)}
                        </div>
                        <div className={styles.eventName}>{event.title}</div>
                        {/* <div className={styles.eventGroup}>{event.group.groupName}</div> */}
                        <div className={styles.eventLocation}>{event.location}</div>
                        {
                            event.attendees &&
                            <div className={styles.eventAttendee}>
                                {event.attendees.length} attendee{event.attendees.length > 1 && <>s</>}
                            </div>
                        }
                    </Col>
                    <Col span={6} order={2}>
                        {event.imageUrls && event.imageUrls[0] && <img className={styles.eventImage} src={event.imageUrls[0]} alt=" " loading="lazy" />}
                    </Col>
                </Row>
            </div>
        </NavLink>
    )
}
export default EventComponent 