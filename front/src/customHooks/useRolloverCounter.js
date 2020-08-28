import React, { useState } from 'react'

const useRolloverCounter = (initialValue) => {
    const [counter, setCounter] = useState(initialValue = 5)

    const decrease = () => {
        if (counter == 0) {
            setCounter(initialValue)
        } else {
            setCounter(counter - 1)
        }
    }

    return { counter, decrease }
}

export default useRolloverCounter
