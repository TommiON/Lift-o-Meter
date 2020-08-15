import React, { useState } from 'react'
import { useParams } from "react-router-dom"

const Workout = () => {
    const id = useParams().id

    return(
        <div>
            <p>Treeni numero {id}</p>
        </div>
    )
}

export default Workout