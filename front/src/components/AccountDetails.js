import React, { useState, useEffect } from 'react'
import { StandardButton } from '../styles/Buttons'
import userService from '../services/UserService'

const AccountDetails = ( {userdata, handleDelete} ) => {
    const [profile, setProfile] = useState([])

    useEffect(() => {
        userService
            .getCurrent()
            .then(response => setProfile(response))
    }, [])

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td><b>Profiili: {profile}</b></td>
                    <td> <StandardButton onClick={handleDelete}>poista</StandardButton></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AccountDetails