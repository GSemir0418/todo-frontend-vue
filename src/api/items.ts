import { http } from "../lib/http";

export const getItems = async (page: number) => 
  http.get<any>('/api/v1/items', { page })
