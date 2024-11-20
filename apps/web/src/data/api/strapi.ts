import axios from 'axios';
import { format } from 'util';

export const strapi = axios.create({
    baseURL: format('%s/api', process.env.STRAPI_URL!),
    headers: {
        Authorization: format('Bearer %s', process.env.STRAPI_AUTH_TOKEN!),
        'Content-Type': 'application/json',
    },
});

strapi.defaults.params = {
    pagination: {
        limit: 10,
        start: 0,
    },
    sort: ['publishedAt:desc'],
};
