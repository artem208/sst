import React, { Component, Fragment } from 'react';
import initDbState from '../utils/initialDbState';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AuthForm from './AuthForm';
import TaskList from './TaskList';
import Task from './Task';
import { connect } from 'react-redux';
import { checkAuthToken } from '../actions';
import NonPublicRoute from './NonPublicRoute';
import Header from './Header';
import dbMock from '../providers/db';

class App extends Component {

    componentWillMount() {
        initDbState();
        dbMock.loadFromStorage();
        this.props.checkAuthToken();
    }

    render() {
        const { authenticated } = this.props;
        const authRedirectionProps = {
            authenticated,
            authRedirect: '/auth'
        };

        return (
            <Fragment>
                <Header />
                <Route path='/auth' render={()=> authenticated ? <Redirect to="/tasks" /> : <AuthForm /> } />
                <NonPublicRoute path='/tasks' exact component={TaskList} {...authRedirectionProps} />
                <NonPublicRoute path='/tasks/:id' component={Task} {...authRedirectionProps} />
            </Fragment>
        )
    } 
} 

const mapStateToProps = (state) => {

    return {
        authenticated : !!state.auth.user
    }
};

export default withRouter(connect(mapStateToProps, { checkAuthToken })(App));