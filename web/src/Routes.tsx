import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Test } from './pages/Test'

export const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <div>
            <Link to='/'>Home</Link>
          </div>
          <div>
            <Link to='/register'>Register</Link>
          </div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
          <div>
            <Link to='/test'>Test</Link>
          </div>
        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/test' component={Test} />
        </Switch>
      </div>
    </Router>
  )
}
