import axios from 'axios'
const baseURL = 'http://localhost:3001'

const getAll = async () => {
    const response = await axios.get(`${baseURL}/users`)
    return response.data
}

const getOne = async (userId) => {
    const response = await axios.get(`${baseURL}/users/${userId}`)
    return response.data
}

const postNew = async (userdata) => {
    const response = await axios.post(`${baseURL}/users`, userdata)
    return response
}

const deleteOne = async (userId) => {
    const response = await axios.delete(`${baseURL}/users/${userId}`)
    return response
}

export default { getAll, getOne, postNew, deleteOne }