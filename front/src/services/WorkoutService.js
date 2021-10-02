import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const baseURL = 'http://localhost:8080/api/workout'
const config = GenerateTokenizedHeader()

const getNext = async () => {
    console.log('** Local storage Workoutissa: ', localStorage)
    const config = GenerateTokenizedHeader()
    const response = await axios.get(`${baseURL}/next`, config)
    console.log('** WorkoutService, getNext: ', response)
    return response.data
}

const start = async (id) => {
    const url = `${baseURL}/start/${id}`
    const response = await axios.get(url, config)
    console.log('** WorkoutService, start: ', response)
    return response.data
}

const reset = async (id) => {
    const url = `${baseURL}/reset/${id}`
    const response = await axios.get(url, config)
    return response.data
}

const finish = async (id) => {
    const url = `${baseURL}/finish/${id}`
    const response = await axios.get(url, config)
    return response.data
}

const getAllFinished = async () => {

}

export default { getNext, start, reset, finish, getAllFinished }
