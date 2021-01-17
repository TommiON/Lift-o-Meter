import React, {useState, useEffect} from 'react'
import Spinner from './Spinner'
import workoutService from '../services/WorkoutService'
import moveSetService from '../services/MoveSetService'
import MoveSet from './MoveSet'
import { StandardButton } from '../styles/Buttons'
import DecreaseUsingRollover from '../services/DecreaseUsingRollover'

const Workout = () => {

    const [workout, setWorkout] = useState({
        sets: [],
        startTime: null,
        id: null,
        type: null
    })

    const [started, setStarted] = useState(false)

    console.log('workoutin state, setit', workout.sets)

    useEffect(() => {
        workoutService
            .getNext()
            .then(response => {
                setWorkout({
                    sets: response.sets,
                    startTime: response.date,
                    id: response.id,
                    type: response.type
                })
            })
            .catch(error => console.log('vituiksi meni', error.response))
    }, [])

    const handleClick = (id) => {
        const updatedSets = workout.sets
        updatedSets.forEach(s => {
            if(s.id === id) {
                s.repetitions = DecreaseUsingRollover(s.repetitions)
                moveSetService
                    .putChanged(s.id, s.repetitions)
                    .then(setWorkout({...workout, sets: updatedSets}))
                    .catch(error => console.log('vituiksi meni ', error))
            }
        })
    }

    const startWorkout = () => {
        workoutService
            .start(workout.id)
            .then(response => {
                setWorkout({
                    ...workout,
                    startTime: response.date
                })
                setStarted(true)
            })
            .catch(error => console.log('virhe', error))
    }

    const finishWorkout = () => {
        workoutService
            .finish(workout.id)
            .then(response => {
                console.log('Workout päätökseen:', response)
            })
            .catch(error => console.log('virhe', error))
    }

    const cancelWorkout = () => {
        workoutService
            .reset(workout.id)
            .then(response => {
                setWorkout({
                    sets: response.sets,
                    startTime: response.date,
                    id: response.id,
                    type: response.type
                })
                setStarted(false)
            })
            .catch(error => console.log('virhe', error))
    }

    if (workout.sets == null) {
        return(<Spinner />)
    }

    return(
        <div>
            Seuraavana:
            {workout.sets.map(s => <MoveSet move={s.move} reps={s.repetitions} weigth={s.weigth} id={s.id} key={s.id} workoutStarted={started} clickHandler={handleClick}/>
            )}
            {!started ? <StandardButton onClick={startWorkout}>aloita</StandardButton> : <StandardButton onClick={cancelWorkout}>keskeytä</StandardButton>}
            {started ? <StandardButton onClick={finishWorkout}>VALMIS!</StandardButton> : <div></div>}
        </div>
    )
}

export default Workout