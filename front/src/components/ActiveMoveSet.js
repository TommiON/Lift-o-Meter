import React, { useState, useEffect } from 'react'
import useRolloverCounter from '../customHooks/useRolloverCounter'
import { MoveSetButton } from '../styles/Buttons'
import moveSetService from '../services/MoveSetService'

const ActiveMoveSet = ( {id} ) => {    
    const [data, setData] = useState({})
    let counter = data.repetitions
    // const counter = useRolloverCounter(data.repetitions)

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

    const handleClick = () => {
        if (counter === null || counter === undefined || counter === 0) {
            counter = 5
        } else {
            counter -= 1
        }
        setData({...data, repetitions: counter})
    }

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
}

export default ActiveMoveSet