import axios from 'axios'
import { API_URL } from 'config/api.url'

/**
 * Axios instance with configured base URL
 */
const request = axios.create({
    baseURL: API_URL,
})

export {
    request
}