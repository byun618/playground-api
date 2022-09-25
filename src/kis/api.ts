import axios from 'axios'

const api = axios.create({
  baseURL: process.env.KIS_URL,
})

export const setHeader = (key: string, value: string) => {
  api.defaults.headers.common[key] = value
}

export default api
