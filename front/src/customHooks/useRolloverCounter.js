import { useState } from 'react'

const useRolloverCounter = (maxValue) => {
    const [value, setValue] = useState(maxValue)
   
    const decrease = () => {
        if (value === '?' || value === 0) {
            setValue(maxValue)
        } else {
            setValue(value - 1)
        }
    }

    return { value, decrease }
}

export default useRolloverCounter
