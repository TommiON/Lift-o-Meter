import React, {useState, useEffect} from 'react'
import { MoveSetButton } from '../styles/Buttons'

const MoveSet = ({move, reps, id, workoutStarted, clickHandler}) => {

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

    const getRepetitionButton = () => {
        if(!workoutStarted) {
            return null
        }

        switch(reps) {
            case -1:
                return(
                    <div>
                        <MoveSetButton emptySet onClick={() => clickHandler(id)}>X</MoveSetButton>
                    </div>
                )
            case 5:
                return(
                    <div>
                        <MoveSetButton fullSet onClick={() => clickHandler(id)}>{reps}</MoveSetButton>
                    </div>
                )
            default:
                return(
                    <div>
                        <MoveSetButton partialSet onClick={() => clickHandler(id)}>{reps}</MoveSetButton>
                    </div>
                )
        }

    }

    return(
        <div>
            {getPlainName(move)} {getRepetitionButton(reps)}
        </div>
    )

}

export default MoveSet