import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUser, addUser } from '../actions';
import { commaText } from '../helpers/text';

import App from '../components/App';

class AppContainer extends Component {
    componentDidMount() {
        if (!this.props.currentUserId) {
            this.props.dispatch(fetchUser());
        }
    }

    addUserById = id => {
        const { dispatch, currentUserId } = this.props;
        dispatch(addUser(currentUserId, id));
        dispatch(fetchUser());
    };

    render() {
        const { isLoading, currentUserId, users, types } = this.props;
        const currentUser = users[currentUserId];
        const namesText = commaText(
            Object.keys(types).map(type => types[type].name),
            'or'
        );

        let title;
        if (!currentUser || isLoading) {
            title = `Finding ${namesText} people...`;
        } else {
            title = `Is ${currentUser.name.first} a ${namesText} person?`;
        }

        return (
            <App
                isLoading={isLoading}
                user={currentUser}
                users={users}
                types={types}
                title={title}
                handleClick={this.addUserById}
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
