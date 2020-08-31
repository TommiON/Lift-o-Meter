import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import ActiveMoveSet from './ActiveMoveSet'
import ArchivedMoveSet from './ArchivedMoveSet'
import moveSetService from '../services/MoveSetService'
import {activeSetMock, archivedSetMock} from '../mockData/mockSets'

const Workout = () => {
    const id = useParams().id

    const mockActiveWorkoutSetIds = [1,2]
    const mockArchivedWorkoutSetIds = [5,6]

    return(
        <div>
            <p>Meneillään oleva treeni...</p>
            {mockActiveWorkoutSetIds.map(item => <ActiveMoveSet id={item} key={item} />)}
            <p>Arkistoitu treeni...</p>
            {mockArchivedWorkoutSetIds.map(item => <ArchivedMoveSet id={item} key={item} />)}
        </div>
    )
}

export default Workout