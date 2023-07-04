import { http } from "../lib/http";

export const sendValidationCode = async (email: string) => http.post<any>('/api/v1/validation_codes', { email })