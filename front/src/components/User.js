import React from 'react'
import { StandardButton } from '../styles/Buttons'

const User = ( {userdata, handleDelete} ) => {

    return (
        <div>
            <p>
                {userdata.name}
                {userdata.admin? <i>(ylläpitäjä)</i> : <i></i>}
                <StandardButton onClick={handleDelete}>poista</StandardButton>
            </p>
        </div>
    )
}

export default User