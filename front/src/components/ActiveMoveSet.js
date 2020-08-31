import React, { useState, useEffect } from 'react'
import useRolloverCounter from '../customHooks/useRolloverCounter'
import { MoveSetButton } from '../styles/Buttons'
import moveSetService from '../services/MoveSetService'

const ActiveMoveSet = ( {id} ) => {
    const counter = useRolloverCounter(5)
    
    const [data, setData] = useState({
        'id': undefined,
        'label': undefined,
        'repetitions': undefined
    })

    useEffect(() => {
        moveSetService
            .getOne(id)
            .then(response => setData(response))
            .catch(response => console.log('Virhe haettaessa sarjaa tietokannasta!', response))
    }, [])

    useEffect(() => {
        console.log('toistot muuttuneet, nyt: ', data.repetitions)
        moveSetService
            .putChanged(id, data)
            .then(response => console.log('kantaan kirjoitettu, vastaus: ', response))
            .catch(response => console.log('Virhe putatessa sarjaa tietokantaan!', response))        
    }, [data.repetitions])

    const handleClick = () => {
        counter.decrease()
        setData({ ...data, repetitions: counter.value })
    }

    return(
        <div>
            {data.label}
            {data.repetitions === undefined ?
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

/**
 {data.reps === undefined
            ?
                counter.value === '?'
                ?
                    <MoveSetButton emptySet onClick={handleClick}>{counter.value}</MoveSetButton>
                :
                    counter.value === 5
                    ?
                        <MoveSetButton fullSet onClick={handleClick}>{counter.value}</MoveSetButton>
                    :
                        <MoveSetButton partialSet onClick={handleClick}>{counter.value}</MoveSetButton>           
            :
            <MoveSetButton passiveSet>{data.reps}</MoveSetButton>
            }
 */