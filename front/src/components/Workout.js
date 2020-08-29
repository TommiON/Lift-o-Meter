import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Timer from './Timer'
import MoveSet from './MoveSet'
import moveSetService from '../services/MoveSetService'

const Workout = () => {
    const id = useParams().id

    const [movesets, setMovesets] = useState([])

    useEffect(() => {
        moveSetService
            .getAll()
            .then(response => setMovesets(response))
    }, [])

    // Päivittää yhden hallinnoimansa sarjan, tarvitsee put-metodiin id:n ja itse sarjadatan, ensiksi mainitun saa jälkimmäisestä?
    // Päivittää lopuksi tämän komponentin tilan, jolloin renderöidään uudelleen ja myös useEffect() laukeaa ja hakee uudet datat?
    const updateMoveSet = (data) => {
        // console.log('Päivitetään sarja id:llä ', data.id)
        console.log('Kantaan menossa: ', data)
    }

    return(
        <div>
            {movesets.map(item => <MoveSet data={item} changePropagator={() => updateMoveSet()} key={item.id} />)}
            <Timer startTime={180} headsUpTime={90} />
        </div>
    )
}

export default Workout