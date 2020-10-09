import axios from 'axios'

const baseURL = 'http://localhost:3001/movesets'

/**
 * Kokeilua, tällaista ei oikeasti käytetä, vaan haetaan aina id:illä
 */
const getAll = async () => {
    const response = await axios.get(`${baseURL}`)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseURL}/${id}`)
    console.log('*TIETOKANTAPALVELU, getOne', id, response)
    return response.data 
}

const postNew = async (data) => {
    const response = await axios.post(`${baseURL}`, data)
    return response
}

const putChanged = async (id, data) => {
    console.log('** puttiin tulee', data)
    const response = await axios.put(`${baseURL}/${id}`, data)
    return response
}

export default { getAll, getOne, postNew, putChanged }

