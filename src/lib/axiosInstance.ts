import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
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

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && originalRequest) {
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken,
          })

          if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken)
            if (response.data.refreshToken) {
              localStorage.setItem("refreshToken", response.data.refreshToken)
            }

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
            }
            return axios(originalRequest)
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }
    }

    return Promise.reject(error)
  }
)

export const fetcher = async <T>({
  url,
  method = "GET",
  params = {},
  data = {},
  headers = {},
}: {
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  params?: object
  data?: object
  headers?: object
}): Promise<T> => {
  try {
    const response = await axiosInstance({
      url,
      method,
      params,
      data,
      headers,
    })
    return response.data as T
  } catch (error) {
    throw error
  }
}

export default axiosInstance
