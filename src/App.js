import React from 'react';

import Flex from './components/Flex';
import Title from './components/Title';
import UserInfo from './components/UserInfo';
import UserList from './components/UserList';
import PersonButton from './components/PersonButton';

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
