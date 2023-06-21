import styles from './index.module.css';
import 'antd/dist/reset.css';
import { Layout, Space, Card, FloatButton } from 'antd';
import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { normalizeDate } from '../../store/events'
import { useParams } from 'react-router-dom';
import MemberList from '../MemberList';
import Join from '../Join';

const { Sider, Content } = Layout;

const EventDetail = (props) => {
    const { eventId } = useParams();

    const [data, setData] = useState([]);
    const [description, setDescription] = useState([]);
    const [groupName, setGroupName] = useState("");

    const fetchEventData = async (eventId) => {
        try {
            const response = await axios.get(`/events/${eventId}`);
            setData(response.data);
            setDescription(response.data.description);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGroupName = async (groupId) => {
        try {
            if (groupId !== "") {
                const groupResponse = await axios.get(`/groups/${groupId}`);
                setGroupName(groupResponse.data.groupName);
            } else {
                setGroupName("This event does not have a group");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const eventData = await fetchEventData(eventId);
            await fetchGroupName(eventData.group);
        };
        fetchData();
    }, []);

    // Set description as paragraphs
    var paralists;
    if (description.includes("\n")) {
        const paras = description.split('\n');
        paralists = paras.map(
            (para) => (<p>{para}</p>)
        );
    } else {
        paralists = <p>{description}</p>
    }

    return (
        <Space direction="vertical" style={{ width: '100%', }} size={[0, 48]}>

            <Layout style={{ paddingBottom: '64px' }}>
                <div className={styles.headerStyle} data-testid="1">
                    <div className={styles.time}>
                        {normalizeDate(data.time)}
                    </div>
                    <div className={styles.title}>
                        {data.title}
                    </div>
                </div>

                <Layout>
                    <Content className={styles.contentStyle} width='70%'>
                        <div className={styles.subtitles}>Details</div>
                        <div className={styles.description}>
                            {paralists}
                        </div>
                        <div className={styles.subtitles}>Attendees</div>
                        <div className={styles.anttendees}>
                            <MemberList hostId={data.host} attendeesId={data.attendees}></MemberList>
                        </div>
                    </Content>

                    <Sider className={styles.siderStyle} width='30%'>
                        <Card title="Location" extra={<a href="https://www.google.com/maps">Open in Google Map</a>} className={styles.card}>
                            {data.venue}
                        </Card>
                        <Card title="Group" className={styles.card}>
                            {groupName}
                        </Card>
                    </Sider>

                </Layout>

                <FloatButton.BackTop />

            </Layout>
            <Join joinId={eventId} type="events"></Join>

        </Space >
    );
}

export default EventDetail;
