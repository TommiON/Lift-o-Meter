import axios from 'axios'

const baseURL = 'http://localhost:3001/users'

const getAll = async () => {
    const response = await axios.get(`${baseURL}`)
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
    const response = await axios.delete(`${baseURL}/${id}`)
    return response
}

export default { getAll, getOne, postNew, deleteOne }