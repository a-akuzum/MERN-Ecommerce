import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom' // to access props on browser
import Signup from './user/Signup'
import Signin from './user/Signin'

const Routes = () => {
    return (<div>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>      
    </div>)
}
