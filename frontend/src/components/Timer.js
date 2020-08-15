import React, { useState } from 'react'

const Timer = ({startTime, headsUpTime}) => {
    const [clock, setClock] = useState(startTime)
    
    const getSeconds = rawTimeInSeconds => {
        let seconds = rawTimeInSeconds % 60
        if (seconds < 10) {
            seconds = ('0' + seconds).slice(-2)
        }
        return seconds
    }
    
    const getMinutes = rawTimeInSeconds => Math.floor(rawTimeInSeconds / 60)
    
    setTimeout(() => setClock(clock - 1), 1000)

    return(
        <div>
            {(clock > headsUpTime)
                ? <h3>{getMinutes(clock)} : {getSeconds(clock)}</h3>
                : (clock > 0 && clock <= headsUpTime)
                    ? <div><h3>{getMinutes(clock)} : {getSeconds(clock)}</h3><p>Aloita jos äskeinen sarja tuntui kevyeltä</p></div>
                    : <div><h3>0 : 00</h3><p>Aloita!</p></div>
            }
        </div>
    )
}

export default Timer