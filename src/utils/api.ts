import axios, { AxiosRequestConfig } from 'axios';

const apiUrl = import.meta.env.BASE_URL;

export default {
    url: import.meta.env.MODE === 'development' ? '/api' : apiUrl,
    getClient(options?: AxiosRequestConfig) {
        return axios.create({
            baseURL: this.url,
            headers: {
                ...options?.headers,
            },
            ...options,
        });
    },
};
