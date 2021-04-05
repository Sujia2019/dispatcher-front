import HttpRequest from '@/libs/axios'
const baseUrl = 'http://localhost:9000/'

const axios = new HttpRequest(baseUrl)
export default axios
