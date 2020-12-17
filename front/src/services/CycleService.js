import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/api/cycle'
const config = GenerateTokenizedHeader()

const getCurrent = async () => {
    const response = await axios.get(`${baseURL}/current`, config)
    return response.data
}

export default {getCurrent}