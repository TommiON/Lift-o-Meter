import React, { useState } from 'react'
import { StandardButton } from '../styles/Buttons'
import { Button, Input} from '../styles/styles'

const UserForm = ( {additionHandler} ) => {

    const [userdata, setUserdata] = useState({
        name: '',
        admin: false,
        age: '',
        weight: '',
        height: '',
        bestSquat: '',
        bestBenchPress: '',
        bestBarbellRow: '',
        bestOverheadPress: '',
        bestDeadlift: ''
    })
    
    const handleSubmit = (event) => {
        event.preventDefault()
        additionHandler(userdata)
        setUserdata({
            name: '',
            admin: false,
            age: '',
            weight: '',
            height: '',
            bestSquat: '',
            bestBenchPress: '',
            bestBarbellRow: '',
            bestOverheadPress: '',
            bestDeadlift: ''
        })
    }

    const handleChange = (event) => {
        event.preventDefault()
        const field = event.target.name
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setUserdata({
            ...userdata, [field]:value
        })
    }

    return(
        <div>
            <h3>Lisää uusi käyttäjä</h3>
            <form onSubmit={handleSubmit}>
                nimi: <Input type="textfield" name="name" value={userdata.name} onChange={handleChange} /><br></br>
                ylläpitäjä: <Input type="checkbox" name="admin" checked={userdata.admin ? userdata.admin : false} value={userdata.admin} onChange={handleChange} /><br></br>
                ikä: <Input type="textfield" name="age" value={userdata.age} onChange={handleChange} /><br></br>
                paino: <Input type="textfield" name="weight" value={userdata.weight} onChange={handleChange} /><br></br>
                pituus: <Input type="textfield" name="height" value={userdata.height} onChange={handleChange} /><br></br>
                kyykyn maksimi: <Input type="textfield" name="bestSquat" value={userdata.bestSquat} onChange={handleChange} /><br></br>
                penkin maksimi: <Input type="textfield" name="bestBenchPress" value={userdata.bestBenchPress} onChange={handleChange} /><br></br>
                soudun maksimi: <Input type="textfield" name="bestBarbellRow" value={userdata.bestBarbellRow} onChange={handleChange} /><br></br>
                pystypunnerruksen maksimi: <Input type="textfield" name="bestOverheadPress" value={userdata.bestOverheadPress} onChange={handleChange} /><br></br>
                maastavedon maksimi: <Input type="textfield" name="bestDeadlift" value={userdata.bestDeadlift} onChange={handleChange} /><br></br>
                <StandardButton type="submit">Lisää</StandardButton>
            </form>
        </div>
    )

}

export default UserForm