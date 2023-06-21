import { useEffect, useState, React } from 'react';
import { Card, Avatar, Col, Row, Meta } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';

const MemberList = ({ hostId, attendeesId }) => {
    const [attendees, setAttendees] = useState([]);
    const [host, setHost] = useState({});

    const { Meta } = Card;
    const fetchHostData = async (hostId) => {
        try {
            const hostResponse = await axios.get(`/users/${hostId}`);
            const hostInfo = {
                avatar: "https://joesch.moe/api/v1/random?key=1",
                name: hostResponse.data.username,
                identity: "Host"
            };
            setHost(hostInfo);
            return hostInfo;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAttendeesData = async (attendeesId) => {
        try {
            let attendeesArr = [];
            let i = 2;
            if (attendeesId !== null) {
                console.log("1", attendeesId)
                const responses = await Promise.all(attendeesId.map(attendeeId => axios.get(`http://localhost:8080/users/${attendeeId}`)));
                responses.forEach((attResponse) => {
                    const attendee = {
                        avatar: `https://joesch.moe/api/v1/random?key=${i++}`,
                        name: attResponse.data.username,
                        identity: "Attendee"
                    };
                    attendeesArr.push(attendee);
                });
            } else {
                const hostInfo = {
                    avatar: "https://joesch.moe/api/v1/random?key=1",
                    name: host.data.username,
                    identity: "Host"
                };
                attendeesArr.push(hostInfo);
            }
            return attendeesArr;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const hostInfo = await fetchHostData(hostId);
            const attendeesArr = await fetchAttendeesData(attendeesId) || [];
            setAttendees([hostInfo, ...attendeesArr]);
        };
        fetchData();
    }, [hostId, attendeesId]);

    const attendeesList = attendees.map(
        (attendee) => (
            <Col className="gutter-row" span={'30%'} key={attendee.name}>
                <Card hoverable style={{ width: 240 }}>
                    <Meta avatar={<Avatar size={50} src={attendee.avatar} />} title={attendee.name} description={attendee.identity} />
                </Card>
            </Col>
        )
    );

    return (
        <Row gutter={[16, 24]}>
            {attendeesList}
        </Row>
    )
}

export default MemberList;