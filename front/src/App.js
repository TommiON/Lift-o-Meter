import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Workout from './components/Workout'
import Timer from './components/Timer'
import Userlist from './components/Userlist'

function App() {
  
  const temporaryStyle = {
    padding: 5
  }

  return (
    <div>
    <BrowserRouter>
      <div>
        <Link to="/workouts/:id" style={temporaryStyle}>Vuorossa</Link>
        <Link to="/workouts" style={temporaryStyle}>Aiemmat treenit</Link>
        <Link to="/statistics" style={temporaryStyle}>Tilastoja</Link>
        <Link to="/users" style={temporaryStyle}>Käyttäjähallinta</Link>
      </div>

      <Switch>
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

    </div>
  )
}

export default App;
