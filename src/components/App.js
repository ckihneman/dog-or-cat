import React from 'react';

import Flex from './Flex';
import Title from './Title';
import UserInfo from './UserInfo';
import UserList from './UserList';
import PersonButton from './PersonButton';

export default function App({
    isLoading,
    user,
    types,
    title,
    handlePetSelect,
}) {
    if (!user) {
        return <Title title={title} />;
    }

    return (
        <div>
            <Title title={title} />
            <UserInfo user={user} imageSize="large" isLoading={isLoading} />
            <Flex>
                {types.map(type => {
                    return (
                        <PersonButton
                            key={type.id}
                            text={`${type.name} Person`}
                            onClick={() => handlePetSelect(type.id)}
                            className={`PersonButton--${type.id}`}
                            disabled={isLoading}
                        />
                    );
                })}
            </Flex>
            <Flex>
                {types.map(type => (
                    <UserList
                        key={type.id}
                        title={`${type.name} People`}
                        users={type.people}
                    />
                ))}
            </Flex>
        </div>
    );
}
