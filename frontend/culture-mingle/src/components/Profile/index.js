import { useState, React, useEffect } from 'react';
import styles from './index.module.css';
import EventComponent from '../EventList/EventComponent';
import GroupComponent from '../GroupList/GroupComponent';
import { Card, Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    
    const [eventData, setEventData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [groupIds, setGroupIds] = useState("");
    const [eventIds, setEventIds] = useState("");
    const { Meta } = Card;
    const attendee = {
        userId: localStorage.getItem("userId"),
        userEmail: localStorage.getItem("userEmail"),
        username: localStorage.getItem("userName"),
        avatar: "https://joesch.moe/api/v1/random?key=1",
    }
    useEffect(() => {
        const getUserInfo = async () => {
            const userId = localStorage.getItem("userId");
            try {
                axios.get(
                    `http://localhost:3000/users/${userId}`
                ).then(
                    res => {
                        console.log(res.data);
                        setEventIds(res.data.eventHistory);
                        setGroupIds(res.data.groups);
                        const requests = res.data.eventHistory.map(id => axios.get(`http://localhost:8080/events/${id}`));
                        console.log(requests);
                        Promise.all(requests).then(responses => {
                            const newEvents = responses.map((response) => response.data);
                            setEventData(newEvents);
                        });

                        //for group:
                        const requests2 = res.data.groups.map(id => axios.get(`http://localhost:8080/groups/${id}`));
                        console.log(requests2);
                        Promise.all(requests2).then(responses2 => {
                            const newGroups = responses2.map((response2) => response2.data);
                            setGroupData(newGroups);
                        });
                    }
                ).catch((error) => {
                    //console.log(error.response);
                })
            } catch (err) {
                console.log(err);
            }
        }
        getUserInfo();
    }, []);

    return (
        <div className={styles.layout}>
            <Card>
                <Meta
                    avatar={<Avatar size={50} src={attendee.avatar}/>}
                    title={attendee.username}
                    description={attendee.userEmail}
                />
            </Card>
            <div className={styles.subLayout}>
                <h1 className={styles.contentTitle}>My Events</h1>
                {eventIds && eventIds.length !== 0 ?
                    <div>
                        {eventData && eventData.map(item => (
                            <EventComponent key={item.id} event={item} />
                        ))}
                    </div> :
                    <div className={styles.noEvent}>
                        Currently No Event! Click here to <NavLink to="/">Discover More Event</NavLink>,
                        or <NavLink to="/createEvent">Create your own Event!</NavLink>
                    </div>}
            </div>
            <div className={styles.subLayout}>
                <h1 className={styles.contentTitle}>My Groups</h1>
                {groupIds && groupIds.length !== 0 ?
                    <div>
                        {groupData && groupData.map(item => (
                            <GroupComponent key={item.id} group={item} />
                        ))}
                    </div> :
                    <div className={styles.noEvent}>
                        Currently No Group! Click here to <NavLink to="/">Find more interesting Groups!</NavLink>
                    </div>}
            </div>
        </div>
    )
}
export default Profile;