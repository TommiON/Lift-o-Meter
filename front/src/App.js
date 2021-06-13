import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom"
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

  const notify = (message, error) => {
    setNotification({ 
      message: message,
      error: error 
    })
    setTimeout(() => setNotification({
      message: '' 
    }), 3000)
  }

  const login = (userdata) => {
    AuthService
            .login(userdata)
            .then(response => {
              window.localStorage.removeItem('username')
              window.localStorage.removeItem('accessToken')
              window.localStorage.setItem('username', response.data.username)
              window.localStorage.setItem('accessToken', response.data.accessToken)
              setLoggedUser(response.data.username)
              notify(`Tervetuloa, ${window.localStorage.getItem('username')}!`)
            })
            .catch(error => {
              notify('Ongelma kirjautumisessa - väärä tunnus tai salasana?', true)
              console.log('** App, login, error: ', error)
            })
  }

  const logout = () => {
    console.log('Kirjaudutaan ulos...')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('accessToken')
    setLoggedUser(null)
  }

  return (
    <Container>
      <BrowserRouter>
        <NavigationBar logoutFunction={() => logout()} loggedIn={loggedUser} />
        <Notification message={notification.message} error={notification.error} />
        <Switch>
          <Route path="/signup">
            <UserAdder notificationCallback={notify} visible={!loggedUser} />
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
          <Route path="/">
            {console.log('*** LoggedUserin status:', loggedUser)}
            {loggedUser ? <Redirect to="/next" /> : <LoginScreen loginFunction={login} visible={!loggedUser} />}
            {loggedUser ? <p></p> : <p>Ei käyttäjätunnusta? <Link to="/signup">Rekisteröidy</Link></p>}
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

export default App;