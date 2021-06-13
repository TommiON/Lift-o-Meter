import axios from 'axios'

const baseURL = 'http://localhost:8080/api/auth'

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
    console.log('** AuthService signup:', response)
    return response
}

export default {login, signup}