import React, { useState } from 'react'
import useRolloverCounter from '../customHooks/useRolloverCounter'
import { MoveSetButton } from '../styles/Buttons'

const MoveSet = ( { data, changePropagator } ) => {
    const counter = useRolloverCounter(5)

    const handleClick = () => {
        console.log('clicked')
        counter.decrease()
        changePropagator()
    }

    return(
        <div>
            {data.label}
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
        </div>
    )
}

export default MoveSet

/** 
{data.reps === undefined
    ?
        counter.value === '?'
        ?
            <MoveSetButton emptySet onClick={counter.decrease}>{counter.value}</MoveSetButton>
        :
            counter.value === 5
            ?
                <MoveSetButton fullSet onClick={counter.decrease}>{counter.value}</MoveSetButton>
            :
                <MoveSetButton partialSet onClick={counter.decrease}>{counter.value}</MoveSetButton>           
    :
    <MoveSetButton passiveSet>{data.reps}</MoveSetButton>
    }
    */