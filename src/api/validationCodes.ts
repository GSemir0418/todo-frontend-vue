import { http } from "../lib/http";

export const sendValidationCode = async (email: string) => http.post<any>('dev/api/v1/validation_codes', { email })