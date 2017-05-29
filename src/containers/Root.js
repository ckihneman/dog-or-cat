import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from '../configureStore';
import AppContainer from './AppContainer';

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
