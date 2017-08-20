import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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

function mapStateToProps({users, types}) {
    const isLoading = users.isFetching;
    const currentUser = users.byId[users.currentUserId];
    const namesText = commaText(Object.keys(types).map(type => types[type].name), 'or');

    let title;
    if (!currentUser || isLoading) {
        title = `Finding ${namesText} people...`;
    } else {
        title = `Is ${currentUser.name.first} a ${namesText} person?`;
    }

    return {
        isLoading,
        title,
        currentUser,
        dogPeople: getUsersByType(types.dog.userIds, users.byId),
        catPeople: getUsersByType(types.cat.userIds, users.byId),
        ratPeople: getUsersByType(types.rat.userIds, users.byId),
    };
}

function getUsersByType(userIds, users) {
    return userIds.map(userId => users[userId]);
}

export default connect(mapStateToProps)(AppContainer);
