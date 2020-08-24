import React, { useState } from 'react'

const UserForm = () => {

    const [userdata, setUserdata] = useState({
        name: '',
        admin: false,
        age: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Lisää käyttäjä -nappia painettu: ', event)
    }

    const handleChange = (event) => {
        event.preventDefault()
        const field = event.target.name
        console.log('kentän nimi: ', field)
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        console.log('arvo: ', value)
        setUserdata({
            ...userdata, [field]:value
        })
    }

    return(
        <div>
            <h3>Lisää uusi käyttäjä</h3>
            {console.log('tilan name: ', userdata.name)}
            {console.log('tilan admin: ', userdata.admin)}
            {console.log('tilan age: ', userdata.age)}
            <form onSubmit={handleSubmit}>
                <input type="textfield" name="name" value={userdata.name} onChange={handleChange} /><br></br>
                <input type="checkbox" name="admin" checked={userdata.admin ? userdata.admin : false} value={userdata.admin} onChange={handleChange} /><br></br>
                <input type="textfield" name="age" value={userdata.age} onChange={handleChange} /><br></br>
                <button type="submit">Lisää</button>
            </form>
        </div>
    )

}

export default UserForm