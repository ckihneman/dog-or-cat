import { combineReducers } from 'redux';

import { REQUEST_USER, RECEIVE_USER, ADD_USER } from './actions';

function users(
    state = {
        isFetching: false,
        currentUserId: null,
        byId: {},
    },
    { type, user }
) {
    switch (type) {
        case REQUEST_USER:
            return {
                ...state,
                isFetching: true,
            };

        case RECEIVE_USER:
            return {
                isFetching: false,
                currentUserId: user.email,
                byId: {
                    ...state.byId,
                    [user.email]: user,
                },
            };

        default:
            return state;
    }
}

function types(
    state = {
        dog: {
            name: 'Dog',
            userIds: [],
        },
        cat: {
            name: 'Cat',
            userIds: [],
        },
        rat: {
            name: 'Rat',
            userIds: [],
        },
    },
    { type, userId, id }
) {
    switch (type) {
        case ADD_USER:
            const entity = state[id];
            return {
                ...state,
                [id]: {
                    ...entity,
                    userIds: [...entity.userIds, userId],
                },
            };

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    users,
    types,
});

export default rootReducer;
