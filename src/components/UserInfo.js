import React from 'react';

import './UserInfo.css';

export default function UserInfo({user, imageSize = 'thumbnail', isLoading}) {
    if (isLoading) {
        return (
            <div className="UserInfo  is-loading">
                <div className="UserInfo__name">Finding a user...</div>
                <div className="UserInfo__img UserInfo__img--hold" />
            </div>
        );
    }

    const fullName = `${user.name.first} ${user.name.last}`;
    const image = user.picture[imageSize];

    return (
        <div className="UserInfo">
            <div className="UserInfo__name">
                {fullName}
            </div>
            <img className="UserInfo__img" src={image} alt={fullName} />
        </div>
    );
}
