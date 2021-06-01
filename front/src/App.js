import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Workout from './components/Workout'
import Userlist from './components/Userlist'
import UserAdder from './components/UserAdder'
import { Page, Navigation } from './styles/styles'
import { StandardButton } from './styles/Buttons'
import LoginScreen from './components/LoginScreen'
import AccountDetails from './components/AccountDetails'
import AuthService from './services/AuthService'
import GenerateTokenizedHeader from './services/GenerateTokenizedHeader'

import Container from 'react-bootstrap/Container'
import NavigationBar from './components/NavigationBar'

function App() {
  
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    if (username) {
      setLoggedUser(username)
    }
  }, [])

  const showLogin = () => ( <LoginScreen loginFunction={login} /> )

  const login = (userdata) => {
    AuthService
            .login(userdata)
            .then(response => {
                window.localStorage.setItem('username', response.data.username)
                window.localStorage.setItem('accessToken', response.data.accessToken)
                setLoggedUser(response.data.username)
            })
  }

  const logout = () => {
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('accessToken')
    setLoggedUser(undefined)
  }

  /*
   {loggedUser !== null ? <span><b>{loggedUser}</b> kirjautunut. <a href="" onClick={logout}>Kirjaudu ulos</a></span> : <div></div> }
        {loggedUser !== null ? <Link to="/profile" style={temporaryStyle}>Oma profiili</Link> : <div></div>}
  */

  return (
    <Container>
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/signup">
            <UserAdder />
          </Route>
          <Route path="/next">
            <Workout />
          </Route>
          <Route path="/users">
            <Userlist />
          </Route>
          <Route path="/profile">
            <AccountDetails />
          </Route>
        </Switch>
      </BrowserRouter>
      {loggedUser === null && showLogin()}
    </Container>
  )
}

export default App;