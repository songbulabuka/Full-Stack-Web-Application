import React from 'react';
import styles from './index.module.css';
import avatar1 from '../../assets/avatar/amber.jpg';
import avatar2 from '../../assets/avatar/yutong.jpg';
import avatar3 from '../../assets/avatar/waq.jpg';
import avatar4 from '../../assets/avatar/aosen.jpg';
import avatar5 from '../../assets/avatar/ryan.jpg';

const GroupIntroduction = () => {
    const members = [
        {
            name: 'Amber Wang',
            role: 'Frontend Developer',
            avatar: avatar1 // Replace with actual avatar image URL
        },
        {
            name: 'Yutong Song',
            role: 'Full Stack Developer',
            avatar: avatar2
        },
        {
            name: 'Anqi Wang',
            role: 'Frontend Designer',
            avatar: avatar3
        },
        {
            name: 'Aosen Xiong',
            role: 'Backend Developer',
            avatar: avatar4
        },
        {
            name: 'Yuren Qin',
            role: 'Backend Developer, 中央數據庫改革領導小組組長',
            avatar: avatar5
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Our Awesome Development Team</h1>
            <div className={styles.membersContainer}>
                {members.map(member => (
                    <div key={member.name} className={styles.member}>
                        <img src={member.avatar} alt={member.name} className={styles.avatar} />
                        <div className={styles.memberName}>{member.name}</div>
                        <div className={styles.memberRole}>{member.role}</div>
                    </div>
                ))}
            </div>
            <p className={styles.description}>
                We are a 5-person development group dedicated to building cutting-edge web applications using the latest technologies.
                With expertise in frontend and backend development, UI/UX design, and project management, we work collaboratively to deliver high-quality software solutions that meet our clients' needs.
            </p>
            <div className={styles.projectContainer}>
                <h2>Introducing CultureMingle</h2>
                <p>
                    Recent data from Immigration, Refugees, and Citizenship Canada (IRCC)
                    shows that the number of international students studying in Canada has
                    seen a significant increase in recent years. However, many of these
                    students often struggle to adapt to their new surroundings and
                    integrate into the local community, particularly those who do not
                    speak English as their first language. The challenges of being away
                    from friends and family, coupled with feelings of loneliness and
                    homesickness, are major issues for this group. Additionally, students
                    from different countries tend to form their own groups, making it
                    difficult for them to interact and connect with one another.
                </p>
                <p>
                    Currently, there is a lack of products available to help bridge these
                    gaps and connect international students from diverse backgrounds. Our
                    goal is to develop CultureMingle, a web-based, user-friendly, and
                    real-time activity planning application specifically tailored to
                    international students. Through the platform, students can create and
                    join various activities such as group games, cultural experiences, and
                    outdoor adventures. Importantly, CultureMingle is committed to
                    ensuring the safety and security of its users</p>
            </div>
        </div>)
};

export default GroupIntroduction;
