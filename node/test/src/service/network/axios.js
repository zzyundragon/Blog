import Axios from 'axios'
Axios.defaults.withCredentials = true

// request interceptor
Axios.interceptors.request.use(function (config) {
  config.headers.sessionToken = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// response interceptor
/* eslint-disable eqeqeq */
Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default Axios
