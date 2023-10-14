import axios from 'axios';

export const youtube = axios.create({
    baseURL: process.env.YOUTUBE_V3_API,
});

youtube.defaults.params = {
    key: process.env.YOUTUBE_API_KEY,
    channelId: process.env.YOUTUBE_CHAN_ID,
    maxResults: 10,
};
