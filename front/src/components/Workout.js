import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import Timer from './Timer'

const Workout = () => {
    const id = useParams().id

    return(
        <div>
            <p>Treeni numero {id}</p>
            <Timer startTime={180} headsUpTime={90} />
        </div>
    )
}

export default Workout