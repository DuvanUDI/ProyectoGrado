import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Library from './Library';
import NotFound from './NotFound';

function App(){
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/library" component={Library} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}