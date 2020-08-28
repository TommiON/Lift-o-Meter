import React, { useState } from 'react'
import { Button, Input} from '../styles/styles'

const UserForm = ( {additionHandler} ) => {

    const [userdata, setUserdata] = useState({
        name: '',
        admin: false,
        age: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        additionHandler(userdata)
        setUserdata({
            name: '',
            admin: false,
            age: ''
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
                <Input type="textfield" name="name" value={userdata.name} onChange={handleChange} /><br></br>
                <Input type="checkbox" name="admin" checked={userdata.admin ? userdata.admin : false} value={userdata.admin} onChange={handleChange} /><br></br>
                <Input type="textfield" name="age" value={userdata.age} onChange={handleChange} /><br></br>
                <Button type="submit">Lisää</Button>
            </form>
        </div>
    )

}

export default UserForm