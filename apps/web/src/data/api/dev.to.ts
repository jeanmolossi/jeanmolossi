import axios from 'axios';

export const devToApi = axios.create({
    baseURL: process.env.DEV_TO_BASE_URL,
    headers: {
        api_key: process.env.DEV_TO_API_KEY || '',
    },
});
