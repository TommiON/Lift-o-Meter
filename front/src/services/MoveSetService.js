import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/api/moveset'
const config = GenerateTokenizedHeader()

const putChanged = async (id, data) => {
   const response = axios.put(
       `${baseURL}/${id}`,
       data,
       config
   )
   return response.data
}

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

export default { getAll, getOne, postNew, putChanged }

