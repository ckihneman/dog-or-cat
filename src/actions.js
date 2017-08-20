export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

function requestUser() {
    return {
        type: REQUEST_USER,
    };
}

function receiveUser(user) {
    return {
        type: RECEIVE_USER,
        user,
    };
}

export function fetchUser() {
    return function(dispatch) {
        dispatch(requestUser());

        return fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data => {
                const user = data.results[0];
                user['id'] = user.email;
                dispatch(receiveUser(user));
            });
    };
}

export function addUser(userId, typeId) {
    return {
        type: ADD_USER,
        userId,
        typeId,
    };
}

export function removeUser(userId, typeId) {
    return {
        type: REMOVE_USER,
        userId,
        typeId,
    };
}
