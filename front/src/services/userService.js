import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/users'
const config = GenerateTokenizedHeader()

const getAll = async () => {
    const response = await axios.get(`${baseURL}`, config)
    console.log(response)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseURL}/${id}`)
    return response.data
}

const postNew = async (data) => {
    const response = await axios.post(`${baseURL}`, data)
    return response
}

const deleteOne = async (id) => {
    console.log('deleteOne...')
    const response = await axios.delete(`${baseURL}/${id}`)
    return response
}

export default { getAll, getOne, postNew, deleteOne }