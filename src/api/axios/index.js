import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

/*  Read more:
*   https://github.com/axios/axios?tab=readme-ov-file#interceptors
*/
axiosInstance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
          const { accessToken } = response.data

          localStorage.setItem('accessToken', accessToken)
          axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
          originalRequest.headers.Authorization = `Bearer ${accessToken}`

          // Retry the original request
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/auth/login'
          return Promise.reject(refreshError)
        }
      } else if (!window.location.pathname.includes('/auth/')) {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  },
)

async function $get(url, config = {}) {
  const response = await axiosInstance.get(url, config)
  return response.data
}

async function $post(url, data, config = {}) {
  const response = await axiosInstance.post(url, data, config)
  return response.data
}

async function $put(url, data, config = {}) {
  const response = await axiosInstance.put(url, data, config)
  return response.data
}

async function $patch(url, data, config = {}) {
  const response = await axiosInstance.patch(url, data, config)
  return response.data
}

async function $delete(url, config = {}) {
  const response = await axiosInstance.delete(url, config)
  return response.data
}

export { $delete, $get, $patch, $post, $put }

