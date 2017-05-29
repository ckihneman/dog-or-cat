import React, { Component } from 'react';

import Flex from './components/Flex';
import Title from './components/Title';
import UserInfo from './components/UserInfo';
import UserList from './components/UserList';
import PersonButton from './components/PersonButton';

import { commaText } from './helpers/text';

class App extends Component {
    state = {
        isLoading: false,
        user: null,
        types: [
            {
                id: 'dog',
                name: 'Dog',
                people: [],
            },
            {
                id: 'cat',
                name: 'Cat',
                people: [],
            },
        ],

        // To test latency/loading state, add a delay
        delay: 0,
    };

    getUserData = () => {
        this.setState({
            isLoading: true,
        });
        fetch('https://randomuser.me/api/')
            .then(data => data.json())
            .then(data => {
                setTimeout(() => {
                    this.setState({
                        user: data.results[0],
                        isLoading: false,
                    });
                }, this.state.delay);
            });
    };

    handlePetSelect = pet => {
        const { user, types } = this.state;

        this.setState({
            types: types.map(type => {
                if (pet !== type.id) {
                    return type;
                }
                return {
                    ...type,
                    people: [...type.people, user],
                };
            }),
        });

        this.getUserData();
    };

    componentDidMount() {
        this.getUserData();
    }

    render() {
        const { isLoading, user, types } = this.state;
        const namesText = commaText(types.map(type => type.name), 'or');

        let title;
        if (!user || isLoading) {
            title = `Finding ${namesText} people...`;
        } else {
            title = `Is ${user.name.first} a ${namesText} person?`;
        }

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
                                onClick={() => this.handlePetSelect(type.id)}
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
}

export default App;
