import React, {useState, useEffect} from 'react'
import SpinnerIndicator from './SpinnerIndicator'
import workoutService from '../services/WorkoutService'
import moveSetService from '../services/MoveSetService'
import MoveSet from './MoveSet'
import { StandardButton } from '../styles/Buttons'
import DecreaseUsingRollover from '../services/DecreaseUsingRollover'
import FindUniqueEntries from '../services/FindUniqueEntries'

const Workout = ( {workoutData} ) => {

    const [workout, setWorkout] = useState(workoutData)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        setWorkout(
            {
                ...workoutData
            }
        )
    }, [workoutData])

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

    if(workout.id === undefined || workout.id === null) {
        return <SpinnerIndicator />
    }

    return(
        <div>

            <p>Seuraavana vuorossa...</p>
            {reduceToMoves().map(
                (move) => {
                    return(
                        <div>
                            <h6> {getPlainName(move)} {findWeightForMove(move)} </h6>
                            <table><tr>
                                {findSetsForMove(move).map(
                                    (set) => {
                                        return(
                                            <td>
                                                <MoveSet reps={set.repetitions} id={set.id} key={set.id} workoutStarted={started} clickHandler={handleClick} />
                                            </td>
                                        )
                                    }
                                )}
                            </tr></table>
                        </div>
                    )
                }
            )}
            
            {!started ? <StandardButton onClick={startWorkout}>aloita</StandardButton> : <StandardButton onClick={cancelWorkout}>keskeytä</StandardButton>}
            {started ? <StandardButton onClick={finishWorkout}>VALMIS!</StandardButton> : <div></div>}
        
        </div>
    )

    /*
    return(
        <div>
        <table>
            <tbody>
            {reduceToMoves().map(
                (move) => {
                    return[
                    <tr key={move}>
                        <td>
                            {getPlainName(move)} {findWeightForMove(move)}
                        </td>
                    </tr>,
                    <tr>
                        {findSetsForMove(move).map(
                            (set) =>
                                <td key={set.id}>
                                    <MoveSet reps={set.repetitions} id={set.id} key={set.id} workoutStarted={started} clickHandler={handleClick} />
                                </td>
                        )}
                    </tr>
                    ]
                }
            )}
            </tbody>
        </table>
        {!started ? <StandardButton onClick={startWorkout}>aloita</StandardButton> : <StandardButton onClick={cancelWorkout}>keskeytä</StandardButton>}
        {started ? <StandardButton onClick={finishWorkout}>VALMIS!</StandardButton> : <div></div>}
        </div>
    )
    */
}

export default Workout