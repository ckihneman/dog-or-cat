import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {fetchUser, addUser, removeUser} from '../actions';
import {commaText} from '../helpers/text';

import App from '../components/App';

class AppContainer extends Component {
    componentDidMount() {
        if (!this.props.currentUser) {
            this.props.dispatch(fetchUser());
        }
    }

    addCurrentUserToType = typeId => {
        const {dispatch, currentUser} = this.props;
        dispatch(addUser(currentUser.id, typeId));
        dispatch(fetchUser());
    };

    removeUserFromType = (userId, typeId) => {
        const {dispatch} = this.props;
        dispatch(removeUser(userId, typeId));
    };

    render() {
        return (
            <App
                {...this.props}
                addCurrentUserToType={this.addCurrentUserToType}
                removeUserFromType={this.removeUserFromType}
            />
        );
    }
}

AppContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    currentUser: PropTypes.any,
    dogPeople: PropTypes.array.isRequired,
    catPeople: PropTypes.array.isRequired,
    ratPeople: PropTypes.array.isRequired,
};

const isLoadingSelector = ({users}) => users.isFetching;
const currentUserSelector = ({users}) => users.byId[users.currentUserId];
const typeNamesSelector = ({types}) => Object.keys(types).map(type => types[type].name);

const titleSelector = createSelector(
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

const dogPeopleSelector = createSelector(usersByIdSelector, dogIdSelector, (users, ids) =>
    ids.map(id => users[id])
);
const catPeopleSelector = createSelector(usersByIdSelector, catIdSelector, (users, ids) =>
    ids.map(id => users[id])
);
const ratPeopleSelector = createSelector(usersByIdSelector, ratIdSelector, (users, ids) =>
    ids.map(id => users[id])
);

function mapStateToProps(state) {
    return {
        isLoading: isLoadingSelector(state),
        title: titleSelector(state),
        currentUser: currentUserSelector(state),
        dogPeople: dogPeopleSelector(state),
        catPeople: catPeopleSelector(state),
        ratPeople: ratPeopleSelector(state),
    };
}

export default connect(mapStateToProps)(AppContainer);
