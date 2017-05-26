import React, { Component } from 'react';

import Title from './components/Title';
import UserInfo from './components/UserInfo';
import UserList from './components/UserList';
import Flex from './components/Flex';
import PersonButton from './components/PersonButton';

class App extends Component {
    state = {
        isLoading: false,
        user: null,
        dogPeople: [],
        catPeople: [],
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
        const { user, dogPeople, catPeople } = this.state;

        switch (pet) {
            case 'dog':
                this.setState({
                    dogPeople: [...dogPeople, user],
                });
                break;
            case 'cat':
                this.setState({
                    catPeople: [...catPeople, user],
                });
                break;

            default:
                break;
        }

        this.getUserData();
    };

    componentDidMount() {
        this.getUserData();
    }

    render() {
        const { isLoading, user, dogPeople, catPeople } = this.state;

        if (!user) {
            return <Title title="Finding dog and cat people..." />;
        }

        return (
            <div>
                <Title title="What kind of person is..." />
                <UserInfo user={user} imageSize="large" isLoading={isLoading} />
                <Flex>
                    <PersonButton
                        text="Dog Person"
                        onClick={() => this.handlePetSelect('dog')}
                        className="PersonButton--dog"
                        disabled={isLoading}
                    />
                    <PersonButton
                        text="Cat Person"
                        onClick={() => this.handlePetSelect('cat')}
                        className="PersonButton--cat"
                        disabled={isLoading}
                    />
                </Flex>
                <Flex>
                    <UserList title="Dog People" users={dogPeople} />
                    <UserList title="Cat People" users={catPeople} />
                </Flex>
            </div>
        );
    }
}

export default App;
