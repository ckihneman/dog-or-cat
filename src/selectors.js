import {createSelector} from 'reselect';

import {commaText} from './helpers/text';

export const isLoadingSelector = ({users}) => users.isFetching;
export const currentUserSelector = ({users}) => users.byId[users.currentUserId];
const typeNamesSelector = ({types}) => Object.keys(types).map(type => types[type].name);

export const titleSelector = createSelector(
    isLoadingSelector,
    currentUserSelector,
    typeNamesSelector,
    (isLoading, currentUser, typeNames) => {
        const namesText = commaText(typeNames, 'or');

        let title;
        if (!currentUser || isLoading) {
            title = `Finding ${namesText} people...`;
        } else {
            title = `Is ${currentUser.name.first} a ${namesText} person?`;
        }

        return title;
    }
);

const usersByIdSelector = ({users}) => users.byId;
const dogIdSelector = ({types}) => types.dog.userIds;
const catIdSelector = ({types}) => types.cat.userIds;
const ratIdSelector = ({types}) => types.rat.userIds;

export const dogPeopleSelector = createSelector(usersByIdSelector, dogIdSelector, (users, ids) =>
    ids.map(id => users[id])
);
export const catPeopleSelector = createSelector(usersByIdSelector, catIdSelector, (users, ids) =>
    ids.map(id => users[id])
);
export const ratPeopleSelector = createSelector(usersByIdSelector, ratIdSelector, (users, ids) =>
    ids.map(id => users[id])
);
