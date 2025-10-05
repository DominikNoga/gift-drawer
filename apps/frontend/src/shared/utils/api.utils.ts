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

export const post = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  const response = await api.post<T>(url, body);
  return response.data;
};

export const put = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  const response = await api.put<T>(url, body);
  return response.data;
};

export const patch = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  const response = await api.patch<T>(url, body);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};
