import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Workout from './components/Workout'
import Timer from './components/Timer'

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
          <p>Käyttäjätietoja, tarvitaanko?</p>
        </Route>
      </Switch>
    </BrowserRouter>

    <Timer startTime={180} headsUpTime={90} />
    </div>
  )
}

export default App;
