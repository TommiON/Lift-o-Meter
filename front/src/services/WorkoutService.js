import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/api/workout'

const getNext = async () => {
    const config = GenerateTokenizedHeader()
    const response = await axios.get(`${baseURL}/next`, config)
    return response.data
}

const start = async (id) => {
    const url = `${baseURL}/start/${id}`
    const config = GenerateTokenizedHeader()
    const response = await axios.get(url, config)
    return response.data
}

const reset = async (id) => {
    const url = `${baseURL}/reset/${id}`
    const config = GenerateTokenizedHeader()
    const response = await axios.get(url, config)
    return response.data
}

const finish = async (id) => {
    const url = `${baseURL}/finish/${id}`
    const config = GenerateTokenizedHeader()
    const response = await axios.get(url, config)
    return response.data
}

const getCompleted = async () => {
    const url = `${baseURL}/completed/`
    const config = GenerateTokenizedHeader()
    const response = await axios.get(url, config)
    return response.data
}

export default { getNext, start, reset, finish, getCompleted }
