import React from 'react';

import Flex from './Flex';
import Title from './Title';
import UserInfo from './UserInfo';
import UserList from './UserList';
import PersonButton from './PersonButton';

export default function App({
    isLoading,
    title,
    currentUser,
    dogPeople,
    catPeople,
    ratPeople,
    handleClickAdd,
    handleClickRemove,
}) {
    if (!currentUser) {
        return <Title title={title} />;
    }

    return (
        <div>
            <Title title={title} />
            <UserInfo user={currentUser} imageSize="large" isLoading={isLoading} />
            <Flex>
                <PersonButton
                    listId="dog"
                    text="Dog Person"
                    onClick={() => handleClickAdd('dog')}
                    disabled={isLoading}
                />
                <PersonButton
                    listId="cat"
                    text="Cat Person"
                    onClick={() => handleClickAdd('cat')}
                    disabled={isLoading}
                />
                <PersonButton
                    listId="rat"
                    text="Rat Person"
                    onClick={() => handleClickAdd('rat')}
                    disabled={isLoading}
                />
            </Flex>
            <Flex>
                <UserList
                    listId="dog"
                    title="Dog People"
                    users={dogPeople}
                    handleClickRemove={handleClickRemove}
                />
                <UserList
                    listId="cat"
                    title="Cat People"
                    users={catPeople}
                    handleClickRemove={handleClickRemove}
                />
                <UserList
                    listId="rat"
                    title="Rat People"
                    users={ratPeople}
                    handleClickRemove={handleClickRemove}
                />
            </Flex>
        </div>
    );
}
