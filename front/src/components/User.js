import React from 'react'
import { Button } from '../styles/styles'

const User = ( {userdata, handleDelete} ) => {

    return (
        <div>
            <p>
                {userdata.name}
                {userdata.admin? <i>(ylläpitäjä)</i> : <i></i>}
                <Button tiny onClick={handleDelete}>poista</Button>
            </p>
        </div>
    )
}

export default User