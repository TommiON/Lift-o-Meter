import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import ActiveMoveSet from './ActiveMoveSet'
import FrozenMoveSet from './FrozenMoveSet'
import workoutService from '../services/WorkoutService'
import Spinner from './Spinner'
import { StandardButton } from '../styles/Buttons' 

const Workout = () => {

    const [workout, setWorkout] = useState()
    const [started, setStarted] = useState(false)
    const [accomplished, setAccomplished] = useState(false)

    useEffect(() => {
        workoutService
            .getNext()
            .then(response => {
                setWorkout({
                    type: response.type,
                    sets: response.sets,
                    date: response.date,
                    id: response.id
                })
            })
            .catch(error => console.log('vituiksi meni', error.response))
    }, [])

    const startOrCancel = () => {
        setStarted(!started)
    }

    if(started === false) {
        // miten hoidetaan resetointi jos harjoitus perutaan?
    }

    const finish = () => {
        console.log('valmista...')
    }



    if (workout == null) {
        return(<Spinner />)
    }

    console.log('**workoutin state ', workout.sets)
   
    return(
        <div>
            <h3>
                Seuraavana vuorossa
                <StandardButton onClick={startOrCancel}>{started ? <div>peruuta</div> : <div>aloita</div>}</StandardButton>
            </h3>
            <table>
                <tbody>
                    {workout.sets.map(
                        s => <ActiveMoveSet moveValue={s.move} weigthValue={s.weigth} repetitionsValue={s.repetitions} idValue={s.id} key={s.id} workoutStarted={started}/>
                    )}
                </tbody>
            </table>
            <StandardButton onClick={finish} >Valmis</StandardButton>
        </div>
    )
}

export default Workout