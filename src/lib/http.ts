import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }

  get<R = unknown>(
    url: string,
    query?: Record<string, string | number>,
    config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "get"
    })
  }

  post<R = unknown>(
    url: string,
    data?: any,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "post"
    })
  }

  delete<R = unknown>(
    url: string, 
    query?: Record<string, string>, 
    config?: Omit<AxiosRequestConfig, 'params'>
  ) {
    return this.instance.request<R>({ 
      ...config, 
      url, 
      params: query, 
      method: 'delete' 
    })
  }

}

export const http = new Http('/dev')

// 拦截器
http.instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});