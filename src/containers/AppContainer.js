import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUser, addUser, removeUser } from '../actions';

import App from '../components/App';

class AppContainer extends Component {
    componentDidMount() {
        if (!this.props.currentUserId) {
            this.props.dispatch(fetchUser());
        }
    }

    addCurrentUserToType = id => {
        const { dispatch, currentUserId } = this.props;
        dispatch(addUser(currentUserId, id));
        dispatch(fetchUser());
    };

    removeUserFromType = (userId, id) => {
        const { dispatch } = this.props;
        dispatch(removeUser(userId, id));
    };

    render() {
        return (
            <App
                {...this.props}
                handleClickAdd={this.addCurrentUserToType}
                handleClickRemove={this.removeUserFromType}
            />
        );
    }
}

AppContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    currentUserId: PropTypes.any,
    users: PropTypes.object.isRequired,
    types: PropTypes.object.isRequired,
};

function mapStateToProps({ users, types }) {
    return {
        isLoading: users.isFetching,
        currentUserId: users.currentUserId,
        users: users.byId,
        types,
    };
}

export default connect(mapStateToProps)(AppContainer);
