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

export default { getAll, getOne }