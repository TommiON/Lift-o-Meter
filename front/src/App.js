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
import WorkoutService from './services/WorkoutService'
import Notification from './components/Notification'

import Container from 'react-bootstrap/Container'
import NavigationBar from './components/NavigationBar'
import { Button, Spinner } from 'react-bootstrap'

function App() {
  
  const [loggedUser, setLoggedUser] = useState(null)
  const [workout, setWorkout] = useState({
    sets: [],
    startTime: null,
    id: null,
    type: null
  })
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
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('accessToken')
    AuthService
            .login(userdata)
            .then(response => {
                window.localStorage.setItem('username', response.data.username)
                window.localStorage.setItem('accessToken', response.data.accessToken)
                setLoggedUser(response.data.username)
                WorkoutService
                    .getNext()
                    .then(response => {
                        setWorkout({
                            sets: response.sets,
                            startTime: response.date,
                            id: response.id,
                            type: response.type
                        })
                    })
                    .catch(
                        error => console.log('Workouttien lataaminen meni vituiksi päätasolla', error.response)
                    )
              notify(`Tervetuloa, ${window.localStorage.getItem('username')}!`)
              })
            .catch(error => {
                notify('Ongelma kirjautumisessa - väärä tunnus tai salasana?', true)
            })
  }

  const logout = () => {
    AuthService
            .logout()
            .then(response => {
                window.localStorage.removeItem('username')
                window.localStorage.removeItem('accessToken')
                setLoggedUser(null)
                setWorkout({
                  sets: [],
                  startTime: null,
                  id: null,
                  type: null
                })
            })
            .catch(error => {
                
            })
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
            {loggedUser ?
                <Workout workoutData={workout} /> 
                        : 
                <LoginScreen loginFunction={login} visible={!loggedUser} />
            }
          </Route>
          <Route path="/profile">
            {loggedUser ?
                <AccountDetails /> 
                        :
                <LoginScreen loginFunction={login} visible={!loggedUser} />
            }
          </Route>
          <Route path="/logout">
            <Redirect to="/" />
          </Route>
          <Route path="/">
            {loggedUser ?
                <Redirect to="/next" />
                        :
                <LoginScreen loginFunction={login} visible={!loggedUser} />
            }
            {loggedUser ? 
                <p></p> 
                        :
                <p>Ei käyttäjätunnusta? <Link to="/signup">Rekisteröidy</Link></p>
            }
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

export default App;