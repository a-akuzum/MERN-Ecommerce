import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom' // to access props on browser
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Menu from './core/Menu'

//instead of div, BrowserRouter used
const Routes = () => {
    return (
        <BrowserRouter> 
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </Switch>      
        </BrowserRouter>)
}

export default Routes;
