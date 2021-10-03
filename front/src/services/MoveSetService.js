import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/api/moveset'

const putChanged = async (id, reps) => {
    const url = `${baseURL}/${id}`
    const config = GenerateTokenizedHeader()
    const payload = {
        newRepetitions: reps
    }
    console.log('Moveset Service, id & reps: ', id, reps)
    console.log('Moveset Service, url, payload & config: ', url, payload, config)
    const response = await axios.put(url, payload, config)
    return response.data

}

export default { putChanged }

