import React from 'react';

import UserInfo from './UserInfo';

import './UserList.css';

export default function UserList({ userIds, users, title, id, handleClickRemove }) {
    let userNodes;
    if (!userIds.length) {
        userNodes = <li>No one yet...</li>;
    } else {
        userNodes = userIds.map(userId => {
            const user = users[userId];
            return (
                <li className="UserList__item" key={userId}>
                    <button onClick={() => handleClickRemove(userId, id)}>
                        Remove
                    </button>
                    <UserInfo user={user} />
                </li>
            );
        });
    }

    return (
        <div className="UserList">
            <h2 className="UserList__title">{title}</h2>
            <ul className="UserList__list">
                {userNodes}
            </ul>
        </div>
    );
}
