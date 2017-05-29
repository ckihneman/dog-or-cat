import React, { Component } from 'react';

import App from './App';

import { commaText } from './helpers/text';

class AppContainer extends Component {
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
            {
                id: 'rat',
                name: 'Rat',
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

        return (
            <App
                isLoading={isLoading}
                user={user}
                types={types}
                title={title}
                handlePetSelect={this.handlePetSelect}
            />
        );
    }
}

export default AppContainer;
