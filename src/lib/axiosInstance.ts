import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized error (token expired)
    if (error.response?.status === 401 && originalRequest) {
      try {
        // Get refresh token
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
          // Call refresh token endpoint
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken,
          })

          if (response.data.accessToken) {
            // Update tokens
            localStorage.setItem("accessToken", response.data.accessToken)
            if (response.data.refreshToken) {
              localStorage.setItem("refreshToken", response.data.refreshToken)
            }

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
            }
            return axios(originalRequest)
          }
        }
      } catch (refreshError) {
        // Log the refresh token error
        console.error("Token refresh failed:", refreshError)
        // Handle refresh token failure
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        // Redirect to login page if in browser environment
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }
    }

    // Handle other errors
    return Promise.reject(error)
  }
)

export default axiosInstance
