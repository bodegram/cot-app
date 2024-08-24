import Axios from 'axios'

const baseURL = 'https://cot-server.onrender.com/api'

export const api = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: 'application/json'
  }
})

api.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

api.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
}, error => {
  console.log('Error:', error)
  return Promise.reject(error)
})
