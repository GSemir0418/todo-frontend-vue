import { http } from "../lib/http";

export const getItems = async (page: number) =>
  http.get<any>('/api/v1/items', { page })

export const createItem = async (postData: any) => http.post<any>('api/v1/items', postData)
export const removeItem = async (id: number) => http.delete<any>(`api/v1/items/${id}`)