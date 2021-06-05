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
import Notification from './components/Notification'

import Container from 'react-bootstrap/Container'
import NavigationBar from './components/NavigationBar'
import { Button } from 'react-bootstrap'

function App() {
  
  const [loggedUser, setLoggedUser] = useState(null)

  const [notification, setNotification] = useState({
    message: '',
    error: false
  })

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    if (username) {
      setLoggedUser(username)
    }
  }, [])

  const showLogin = () => ( <LoginScreen loginFunction={login} /> )

  const showSignup = () => ( <p>Ei tunnusta? <Link to="/signup">Rekisteröidy</Link></p> )

  const notify = (message, error) => {
    setNotification({ message: message, error: error })
    setTimeout(() => setNotification({ message: '' }), 3000)
  }

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
    console.log('Kirjaudutaan ulos...')
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
        <NavigationBar logoutFunction={() => logout()} />
        <Notification message={notification.message} error={notification.error} />
        {loggedUser === null && showLogin()}
        {loggedUser === undefined && showSignup()}
        <Switch>
          <Route path="/signup">
            <UserAdder notificationCallback={notify} />
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
    </Container>
  )
}

export default App;