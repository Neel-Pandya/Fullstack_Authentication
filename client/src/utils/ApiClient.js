import axios from "axios";

class ApiClient {
    static #apiClient = null;

    constructor() {
        if (ApiClient.#apiClient) {
            return ApiClient.#apiClient;
        }
        
        this.client = axios.create({
            baseURL: "http://localhost:3000/api/v1/",
            responseType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 10000
        })
        this.client.interceptors.request.use((config) => {
            if (config.data){
                config.headers["Content-Type"] = this.determineContentType(config.data);
            }

            const token = localStorage.getItem('auth-token');
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            
            return config;
        }, (error) => Promise.reject(this.formatError(error)));

        this.client.interceptors.response.use((response) => response.data, (error) => {
            return Promise.reject(this.formatError(error));
        })
        return ApiClient.#apiClient = this;
    }

    formatError(error) {
        const responseError = new Error();
        if (error.response) {
            responseError.message = error.response.data?.message || "Request Failed";
            responseError.status = error.response.status;
        }
        else if (error.request) {
            responseError.message = "No response recieved from server";
        } else {
            responseError.message = "Unexpected Error";
        }

        return responseError;

    }

    determineContentType(data) {
        if (data instanceof FormData){
            return "multipart/form-data";
        }

        else if (typeof data === "string"){
            return "text/plain";
        }
        else {
            return "application/json"
        }
    }

    static getInstance() {
        if (!ApiClient.#apiClient) {
            new ApiClient();
        }
        return this.#apiClient.client;
    }

    async request(config) {
        try {
            return await this.client(config);
        } catch (error) {
            throw error; // error is already formatted then throw
        }
    }

    async get(url, params = {}) {
        return await this.request({ ...params, method: "GET", url })
    }

    async post(url, data, params = {}) {
        return await this.request({ ...params, method: "POST", url, data });
    }

    async put(url, data, params = {}) {
        return await this.request({ ...params, method: "PUT", url, data })
    }

    async delete(url, data, params = {}) {
        return await this.request({ ...params, method: "DELETE", url, data })
    }
}

export const apiClient = ApiClient.getInstance();