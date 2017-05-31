import React from 'react';

import Flex from './Flex';
import Title from './Title';
import UserInfo from './UserInfo';
import UserList from './UserList';
import PersonButton from './PersonButton';

export default function App({
    isLoading,
    user,
    users,
    types,
    title,
    handleClickAdd,
    handleClickRemove,
}) {
    if (!user) {
        return <Title title={title} />;
    }

    return (
        <div>
            <Title title={title} />
            <UserInfo user={user} imageSize="large" isLoading={isLoading} />
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
