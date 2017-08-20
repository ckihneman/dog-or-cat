import React from 'react';

import UserInfo from './UserInfo';

import './UserList.css';

export default function UserList({listId, title, users, handleClickRemove}) {
    let userNodes;
    if (!users.length) {
        userNodes = <li>No one yet...</li>;
    } else {
        userNodes = users.map(user => {
            return (
                <li className="UserList__item" key={user.id}>
                    <button onClick={() => handleClickRemove(user.id, listId)}>
                        Remove
                    </button>
                    <UserInfo user={user} />
                </li>
            );
        });
    }

    return (
        <div className="UserList">
            <h2 className="UserList__title">
                {title}
            </h2>
            <ul className="UserList__list">
                {userNodes}
            </ul>
        </div>
    );
}
