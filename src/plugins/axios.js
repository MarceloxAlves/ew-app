
import axios from 'axios'
import app from '../main'
//import { loadProgressBar } from 'axios-progress-bar'

let loadFunction = config => {
  app.$Progress.start();
  return config
}
let finishFunction = response => {
  app.$Progress.finish();
  return response
}
let errorFunction = error => {
  app.$Progress.finish();
  return Promise.reject(error)
}



const axiosEW =
     //axios.create({ baseURL: 'http://localhost:8081/' })
     axios.create({ baseURL: 'http://localhost:3000/' })

axiosEW.interceptors.request.use(loadFunction)

axiosEW.interceptors.response.use(finishFunction, errorFunction)

export default axiosEW
