import React from 'react';

import { commaText } from '../helpers/text';

import Flex from './Flex';
import Title from './Title';
import UserInfo from './UserInfo';
import UserList from './UserList';
import PersonButton from './PersonButton';

export default function App({
    isLoading,
    currentUserId,
    users,
    types,
    handleClickAdd,
    handleClickRemove,
}) {
    const currentUser = users[currentUserId];
    const namesText = commaText(
        Object.keys(types).map(type => types[type].name),
        'or'
    );

    let title;
    if (!currentUser || isLoading) {
        title = `Finding ${namesText} people...`;
    } else {
        title = `Is ${currentUser.name.first} a ${namesText} person?`;
    }

    if (!currentUser) {
        return <Title title={title} />;
    }

    return (
        <div>
            <Title title={title} />
            <UserInfo
                user={currentUser}
                imageSize="large"
                isLoading={isLoading}
            />
            <Flex>
                {Object.keys(types).map(typeId => {
                    const type = types[typeId];
                    return (
                        <PersonButton
                            key={typeId}
                            text={`${type.name} Person`}
                            onClick={() => handleClickAdd(typeId)}
                            className={`PersonButton--${typeId}`}
                            disabled={isLoading}
                        />
                    );
                })}
            </Flex>
            <Flex>
                {Object.keys(types).map(typeId => {
                    const type = types[typeId];
                    return (
                        <UserList
                            key={typeId}
                            title={`${type.name} People`}
                            userIds={type.userIds}
                            users={users}
                            id={typeId}
                            handleClickRemove={handleClickRemove}
                        />
                    );
                })}
            </Flex>
        </div>
    );
}
