import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import ActiveMoveSet from './ActiveMoveSet'
import FrozenMoveSet from './FrozenMoveSet'

const MoveSetList = (sets) => {

    return(
        <div>
            Tähän sarjoja...
            {console.log('listanäkymään tulee: ', sets, typeof(sets), 'pituutta: ', sets.length)}
        </div>
    )

}

export default MoveSetList