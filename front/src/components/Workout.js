import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import ActiveMoveSet from './ActiveMoveSet'
import FrozenMoveSet from './FrozenMoveSet'
import workoutService from '../services/WorkoutService'

const Workout = () => {
    const id = useParams().id

    const [data, setData] = useState({})

    useEffect(() => {
        workoutService
            .start('A')
            .then(response => setData(response))
            .catch(error => console.log('vituiksi meni', error))
    }, [])

    const mockActiveWorkoutSetIds = [1,2]
    const mockArchivedWorkoutSetIds = [5,6]

    return(
        <div>
            <p>Meneillään oleva treeni...</p>
            {mockActiveWorkoutSetIds.map(item => <ActiveMoveSet id={item} key={item} />)}
            <p>Arkistoitu treeni...</p>
            {mockArchivedWorkoutSetIds.map(item => <FrozenMoveSet id={item} key={item} />)}
        </div>
    )
}

export default Workout