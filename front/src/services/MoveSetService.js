import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/api/moveset'
const config = GenerateTokenizedHeader()

const putChanged = async (id, reps) => {
    const url = `${baseURL}/${id}`
    const payload = {
        newRepetitions: reps
    }
    const response = await axios.put(url, payload, config)
    return response

}

export default { putChanged }

