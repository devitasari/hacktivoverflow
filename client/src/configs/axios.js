import axios from 'axios'

const myaxios = axios.create({
  baseURL: 'http://localhost:3000'
})

export default myaxios
