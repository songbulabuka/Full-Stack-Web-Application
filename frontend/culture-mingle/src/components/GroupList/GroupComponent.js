import React from 'react';
import styles from './GroupComponent.module.css';
import { Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';
import { HeatMapOutlined } from '@ant-design/icons';

function GroupComponent({ group }) {
    return (
        <NavLink to={`/groups/${group.id}`} style={{ color: 'black' }}>
            <div className={styles.groupLayout}>
                <Row width="100%">
                    <Col span={18} order={1} className={styles.groupDesc}>
                        <div className={styles.groupName}>{group.groupName}</div>
                        <div className={styles.groupDesc}>{group.description}</div>
                        <div className={styles.groupLocation}><HeatMapOutlined />{group.location}</div>
                        <div className={styles.groupAttendee}>{group.members.length} member{group.members.length >1 && <>s</> }</div>
                    </Col>
                    <Col span={6} order={2}>
                    {group.logoUrl && <img className={styles.groupImage} src={group.logoUrl} alt=" " loading="lazy" />}
                    </Col>
                </Row>
            </div>
        </NavLink>
    )
}
export default GroupComponent 