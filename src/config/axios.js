import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:5000/'
    baseURL: 'https://perfumeshop.club/'
})


export default instance;
