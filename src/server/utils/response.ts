import { Response } from "@/types/IData"

export const resError = (message: string): Response<unknown> => ({ message, code: 0, data: [] });
export const resSuccess = <T>(data: T): Response<T> => ({ message: "success", data, code: 200 });