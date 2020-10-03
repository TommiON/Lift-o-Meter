import axios from 'axios'

const baseURL = 'http://localhost:3001/workouts'

const start = async (data) => {
    // simuloidaan tässä kohtaa sarjojen alustaminen (oikeasti back tekee sen)
    const workout = {
        "type": data,
        "date": new Date(),
        "setIds": [100, 101, 102, 103, 104]
    }
    
    const response = await axios.post(`${baseURL}`, workout)
    return response
}

export default { start }
