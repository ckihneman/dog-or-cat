import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchUser, addUser, removeUser} from '../actions';
import {
    isLoadingSelector,
    titleSelector,
    currentUserSelector,
    dogPeopleSelector,
    catPeopleSelector,
    ratPeopleSelector,
} from '../selectors';

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
