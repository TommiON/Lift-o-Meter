import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Workout from './components/Workout'
import Userlist from './components/Userlist'
import UserAdder from './components/UserAdder'
import { Page, Navigation } from './styles/styles'
import { StandardButton } from './styles/Buttons'

function App() {
  
  const temporaryStyle = {
    padding: 5
  }

  return (
    <Page>
    <BrowserRouter>
      <Navigation>
        <Link to="/signup" style={temporaryStyle}>Rekisteröidy</Link>
        <Link to="/workouts/:id" style={temporaryStyle}>Vuorossa</Link>
        <Link to="/workouts" style={temporaryStyle}>Aiemmat treenit</Link>
        <Link to="/statistics" style={temporaryStyle}>Tilastoja</Link>
        <Link to="/users" style={temporaryStyle}>Käyttäjähallinta</Link>
      </Navigation>

      <Switch>
        <Route path="/signup">
          <UserAdder />
        </Route>
        <Route path="/workouts/:id">
          <Workout />
        </Route>
        <Route path="/workouts">
          <p>Aiemmat treenit</p>
        </Route>
        <Route path="/statistics">
          <p>Käppyröitä</p>
        </Route>
        <Route path="/users">
          <Userlist />
        </Route>
      </Switch>
    </BrowserRouter>

    <StandardButton>Aloita treeni</StandardButton>


    </Page>
  )
}

export default App;
