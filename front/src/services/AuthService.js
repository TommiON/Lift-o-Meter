import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/api/auth'
const config = GenerateTokenizedHeader()

const login = async credentials => {
    const response = await axios.post(`${baseURL}/login`, credentials)
    return response
}

const signup = async userData => {
    const response = await axios.post(`${baseURL}/signup`, userData)
        .catch(e => {
            console.log('** axios-error!', e)
            throw e
    })
    return response
}

const logout = async () => {
    const config = GenerateTokenizedHeader()
    const response = await axios.get(`${baseURL}/logout`, config)
    return response
}

export default {login, signup, logout}