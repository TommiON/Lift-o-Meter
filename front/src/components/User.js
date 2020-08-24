import React from 'react'

const User = ( {userdata} ) => {

    return (
        <div>
            <p>{userdata.name} {userdata.admin? <i>(ylläpitäjä)</i> : <i></i>}</p>
        </div>
    )
}

export default User