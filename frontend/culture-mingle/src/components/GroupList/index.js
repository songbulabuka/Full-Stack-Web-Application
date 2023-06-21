import React from 'react';
import GroupComponent from './GroupComponent';

function GroupList({ groups }) {

    return (
        <div>
            {groups && groups.map(item => (
                <GroupComponent key={item.id} group={item} />
            ))}
        </div>
    )
}
export default GroupList 