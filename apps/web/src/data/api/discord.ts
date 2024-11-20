import axios from 'axios';

export const discord = axios.create({
    baseURL: process.env.DISCORD_WEBHOOK,
});
