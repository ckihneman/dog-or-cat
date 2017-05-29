import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser, addPerson } from '../actions';
import { commaText } from '../helpers/text';

import App from '../components/App';

class AppAsync extends Component {
    componentDidMount() {
        if (!this.props.user) {
            this.props.dispatch(fetchUser());
        }
    }

    handleButtonClick = id => {
        const { dispatch, user } = this.props;
        dispatch(addPerson(user, id));
        dispatch(fetchUser());
    };

    render() {
        const { isLoading, user, types } = this.props;
        const namesText = commaText(types.map(type => type.name), 'or');

        let title;
        if (!user || isLoading) {
            title = `Finding ${namesText} people...`;
        } else {
            title = `Is ${user.name.first} a ${namesText} person?`;
        }

        return (
            <App
                isLoading={isLoading}
                user={user}
                types={types}
                title={title}
                handleButtonClick={this.handleButtonClick}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.user.isFetching,
        user: state.user.data,
        types: state.types,
    };
}

export default connect(mapStateToProps)(AppAsync);
