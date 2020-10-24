import React, { useState } from 'react'
import { StandardButton } from '../styles/Buttons'
import { Input} from '../styles/styles'
import AuthService from '../services/AuthService'

const UserAdder = () => {

    const [userdata, setUserdata] = useState({
        username: '',
        password: '',
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
        console.log('USERDATA', userdata)
        console.log(typeof(userdata.height))
        AuthService
            .signup(userdata)
            .then(response => console.log(response))
        setUserdata({
            username: '',
            password: '',
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
        let value = null
        if(field === 'age') {
            value = parseInt(event.target.value, 10)
        } else if(field === 'username' || field === 'password') {
            value = event.target.value
        } else {
            value = parseFloat(event.target.value)
        }
        setUserdata({
            ...userdata, [field]:value
        })
    }

    return(
        <div>
            <h3>Lisää uusi käyttäjä</h3>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Käyttäjätunnus:</td>
                            <td><Input type="textfield" name="username" value={userdata.username} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Salasana:</td>
                            <td><Input type="password" name="password" value={userdata.password} onChange={handleChange} /></td>
                        </tr>
                        <hr></hr>
                        <tr>
                            <td>Ikä:</td>
                            <td><Input type="textfield" name="age" value={userdata.age} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Paino (kg):</td>
                            <td><Input type="textfield" name="weight" value={userdata.weight} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Pituus (cm):</td>
                            <td><Input type="textfield" name="height" value={userdata.height} onChange={handleChange} /></td>
                        </tr>
                        <hr></hr>
                        <tr>
                            <td>Kyykyn maksimi (kg):</td>
                            <td><Input type="textfield" name="bestSquat" value={userdata.bestSquat} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Penkin maksimi (kg):</td>
                            <td><Input type="textfield" name="bestBenchPress" value={userdata.bestBenchPress} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Kulmasoudun maksimi (kg):</td>
                            <td><Input type="textfield" name="bestBarbellRow" value={userdata.bestBarbellRow} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Pystypunnerruksen maksimi (kg):</td>
                            <td><Input type="textfield" name="bestOverheadPress" value={userdata.bestOverheadPress} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Maastavedon maksimi (kg):</td>
                            <td><Input type="textfield" name="bestDeadlift" value={userdata.bestDeadlift} onChange={handleChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <StandardButton type="submit">Rekisteröidy</StandardButton>
            </form>
        </div>
    )
}

export default UserAdder