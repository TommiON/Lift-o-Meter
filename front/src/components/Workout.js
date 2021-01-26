import React, {useState, useEffect} from 'react'
import Spinner from './Spinner'
import workoutService from '../services/WorkoutService'
import moveSetService from '../services/MoveSetService'
import MoveSet from './MoveSet'
import { StandardButton } from '../styles/Buttons'
import DecreaseUsingRollover from '../services/DecreaseUsingRollover'
import FindUniqueEntries from '../services/FindUniqueEntries'

const Workout = () => {

    const [workout, setWorkout] = useState({
        sets: [],
        startTime: null,
        id: null,
        type: null
    })

    const [started, setStarted] = useState(false)

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

    const getPlainName = (move) => {
        switch (move) {
            case 'SQUAT':
                return 'Kyykky'
            case 'BENCH':
                return 'Penkkipunnerrus'
            case 'ROW':
                return 'Kulmasoutu'
            case 'OVERHEAD':
                return 'Pystypunnerrus'
            case 'DEADLIFT':
                return 'Maastaveto'
            default:
                break;
        }
    }

    const reduceToMoves = () => {
        const moves = workout.sets.map(s => s.move)
        return FindUniqueEntries(moves)
    }

    const findWeightForMove = (moveName) => {
        let weigth
        workout.sets.forEach(
            (element) => {
                if(element.move === moveName) {
                    weigth = element.weigth
                }
            }
        )

        if(moveName === 'DEADLIFT') {
            return `1 x ${weigth} kg`
        } else {
            return `5 x ${weigth} kg`
        }
    }

    const findSetsForMove = (moveName) => {
        return workout.sets.filter(
            element => element.move === moveName
        )
    }

    if (workout.sets == null) {
        return(<Spinner />)
    }

    return(
        <div>
        <table>
            <tbody>
            {reduceToMoves().map(
                (move) =>
                    <div>
                    <tr>
                        {getPlainName(move)} {findWeightForMove(move)}
                    </tr>
                    <tr>
                        {findSetsForMove(move).map(
                            (set) =>
                                <td>
                                    <MoveSet reps={set.repetitions} id={set.id} key={set.id} workoutStarted={started} clickHandler={handleClick}/>
                                </td>
                        )}
                    </tr>
                    </div>
            )}
            </tbody>
        </table>
        {!started ? <StandardButton onClick={startWorkout}>aloita</StandardButton> : <StandardButton onClick={cancelWorkout}>keskeytä</StandardButton>}
        {started ? <StandardButton onClick={finishWorkout}>VALMIS!</StandardButton> : <div></div>}
        </div>
    )
}

export default Workout