import React from 'react';

import UserInfo from './UserInfo';

import './UserList.css';

export default function UserList({ users, title }) {
    let userNodes;
    if (!users.length) {
        userNodes = <li key={title}>No one yet...</li>;
    } else {
        userNodes = users.map(user => (
            <li className="UserList__item" key={user.email}>
                <UserInfo user={user} />
            </li>
        ));
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
