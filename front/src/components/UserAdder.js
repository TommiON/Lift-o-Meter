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
        if(field === 'username' || field === 'password') {
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
                        Lisäksi tarvitaan maksimituloksesi seuraavissa klassisissa voimailuliikkeissä - siis kuinka suuren kuorman pystyt tai uskot pystyväsi nostamaan seuraavissa liikkeissä <i>yhden kerran</i>.
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