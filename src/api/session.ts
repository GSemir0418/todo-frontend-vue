import { http } from "../lib/http";

export const session = async (postData: {email: string, code: string}) => http.post<any>('/api/v1/session', postData)