import { http } from "../lib/http";

export const getCurrentUser = async () => http.get<any>('/api/v1/me')