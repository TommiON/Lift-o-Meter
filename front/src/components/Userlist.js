import React, { useState, useEffect } from 'react'
import userService from '../services/userService'
import User from './User'
import UserForm from './UserForm'

const Userlist = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(response => setUsers(response))
    }, [])

    return(
        <div>
            <UserForm />
            <h3>Käyttäjät</h3>
            {users.map(user => <User key={user.id} userdata={user} />)}
        </div>
    )
}

export default Userlist