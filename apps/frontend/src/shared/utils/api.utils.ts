import { environment } from "../enviroments/enviroment";
import axios from 'axios';

export const api = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});


export const get = async <ResponseType>(url: string, params?: Record<string, unknown>): Promise<ResponseType> => {
  const response = await api.get<ResponseType>(url, { params });
  return response.data;
};

export const post = async <ResponseType, BodyType = unknown>(url: string, body: BodyType): Promise<ResponseType> => {
  const response = await api.post<ResponseType>(url, body);
  return response.data;
};

export const put = async <ResponseType, BodyType = unknown>(url: string, body: BodyType): Promise<ResponseType> => {
  const response = await api.put<ResponseType>(url, body);
  return response.data;
};

export const patch = async <ResponseType, BodyType = unknown>(url: string, body: BodyType): Promise<ResponseType> => {
  const response = await api.patch<ResponseType>(url, body);
  return response.data;
};

export const apiDelete = async <ResponseType>(url: string): Promise<ResponseType> => {
  const response = await api.delete<ResponseType>(url);
  return response.data;
};
