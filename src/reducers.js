import { combineReducers } from 'redux';

import { REQUEST_USER, RECEIVE_USER, ADD_PERSON } from './actions';

function user(
    state = {
        isFetching: false,
        data: null,
    },
    action
) {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                isFetching: true,
            };

        case RECEIVE_USER:
            return {
                data: action.user,
                isFetching: false,
            };

        default:
            return state;
    }
}

function types(
    state = [
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
    action
) {
    switch (action.type) {
        case ADD_PERSON:
            return state.map(type => {
                if (action.id !== type.id) {
                    return type;
                }
                return {
                    ...type,
                    people: [...type.people, action.user],
                };
            });

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    types,
});

export default rootReducer;
