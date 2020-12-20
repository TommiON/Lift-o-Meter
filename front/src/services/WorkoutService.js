import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/api/workout'
const config = GenerateTokenizedHeader()

const getNext = async () => {
    const response = await axios.get(`${baseURL}/next`, config)
    return response.data
}

export default { getNext }
