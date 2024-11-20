import axios from 'axios';

export const telegram = axios.create({
    baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`,
});
