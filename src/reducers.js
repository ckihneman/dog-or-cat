import {combineReducers} from 'redux';

import {REQUEST_USER, RECEIVE_USER, ADD_USER, REMOVE_USER} from './actions';

function users(
    state = {
        isFetching: false,
        currentUserId: null,
        byId: {},
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
            const {user} = action;
            return {
                isFetching: false,
                currentUserId: user.id,
                byId: {
                    ...state.byId,
                    [user.id]: user,
                },
            };

        case REMOVE_USER:
            delete state.byId[action.userId];
            return {
                ...state,
                byId: state.byId,
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
    action
) {
    const entity = state[action.typeId];
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                [action.typeId]: {
                    ...entity,
                    userIds: [...entity.userIds, action.userId],
                },
            };

        case REMOVE_USER:
            return {
                ...state,
                [action.typeId]: {
                    ...entity,
                    userIds: entity.userIds.filter(userId => action.userId !== userId),
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
