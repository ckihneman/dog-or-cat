import React, {Component} from 'react';
import {Provider} from 'react-redux';

import rootReducer from '../reducers';
import {loadState, saveState} from '../localStorage';
import configureStore from '../configureStore';
import AppContainer from './AppContainer';

const persistedState = loadState();
const store = configureStore(rootReducer, persistedState);

store.subscribe(() => {
    saveState(store.getState());
});

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
