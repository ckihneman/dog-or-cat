export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const ADD_PERSON = 'ADD_PERSON';

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
                dispatch(receiveUser(data.results[0]));
            });
    };
}

export function addPerson(user, id) {
    return {
        type: ADD_PERSON,
        user,
        id,
    };
}
