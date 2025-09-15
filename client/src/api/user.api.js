import { apiClient } from "../utils/ApiClient"

export const registerApi = async (data) => {
    return await apiClient.post('auth/register', data)
}

export const loginApi = async (data) => {
    return await apiClient.post('auth/login', data);
}

export const profileApi = async () => {
    return await apiClient.get('auth/profile');
}

export const logoutApi = async () => {
    return await apiClient.post('auth/logout');
}