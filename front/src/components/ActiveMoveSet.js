import React, { useState, useEffect } from 'react'
import { MoveSetButton } from '../styles/Buttons'
import moveSetService from '../services/MoveSetService'

const ActiveMoveSet = ( {moveValue, weigthValue, repetitionsValue, idValue, workoutStarted} ) => {    
    const [data, setData] = useState({
        move: moveValue,
        weigth: weigthValue,
        repetitions: repetitionsValue,
        id: idValue
    })
    
    let counter = data.repetitions

    /*
    useEffect(() => {
        moveSetService
            .getOne(id)
            .then(response => setData(response))
            .catch(response => console.log('Virhe haettaessa sarjaa tietokannasta!', response))
    }, [])

    useEffect(() => {
        console.log('useEffect laukeaa')
        const updatedData = {...data, repetitions: data.repetitions}
        moveSetService
            .putChanged(id, data)
            .then(response => console.log('kantaan kirjoitettu, vastaus: ', response))
            .catch(response => console.log('Virhe putatessa sarjaa tietokantaan!', response))        
    }, [data.repetitions])
    */

    const handleClick = () => {
        if (counter === null || counter === undefined || counter === 0 || counter === -1) {
            counter = 5
        } else {
            counter -= 1
        }
        setData({...data, repetitions: counter})
        moveSetService
            .putChanged(data.id, data)
            .then(response => response)
            .catch(error => console.log('vituiksi meni ', error))
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

    const getRepetitions = (reps) => {
        if (workoutStarted) {
            if (counter === 5) {
                return(
                    <div>
                        <MoveSetButton fullSet onClick={handleClick}>{data.repetitions}</MoveSetButton>
                    </div>
                )
            } else  if (counter === -1) {
                return(
                    <div>
                        <MoveSetButton emptySet onClick={handleClick}>X</MoveSetButton>
                    </div>
                )
            } else {
                return(
                    <div>
                        <MoveSetButton partialSet onClick={handleClick}>{data.repetitions}</MoveSetButton>
                    </div>
                )
            }
        } else {
            return null
        }
    }

    console.log('**counter ', counter)
    console.log('**state ', data.repetitions)
    
    return(
        <tr>
            <td>{getPlainName(data.move)}</td>
            <td>{data.weigth} kg</td>
            <td>{getRepetitions(data.repetitions)}</td>
        </tr>
    )
    


    /*
    return(
        <div>
            {console.log('*STATE:', data)}
            {console.log('*COUNTER:', counter)}
            {data.label}
            {data.repetitions === null ?
                <MoveSetButton emptySet onClick={handleClick}>{data.repetitions}</MoveSetButton>
                :
                data.repetitions === 5 ?
                    <MoveSetButton fullSet onClick={handleClick}>{data.repetitions}</MoveSetButton>
                    : 
                    <MoveSetButton partialSet onClick={handleClick}>{data.repetitions}</MoveSetButton>
            }
        </div>
    )
    */
}

export default ActiveMoveSet