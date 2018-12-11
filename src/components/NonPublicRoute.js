import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const NonPublicRoute = (props) => {

    const { component : Component, authenticated, authRedirect, ...rest } = props;

    return (
        <Route {...rest} 
            render={params => authenticated ? <Component {...params} /> : <Redirect to={authRedirect} />}
         />
    );
};

export default NonPublicRoute;