import axios from '../node_modules/axios'

const http = axios.create({
    baseURL: import.meta.env.BASE_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default http