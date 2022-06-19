import axios from 'axios';

export const youtube = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
});

youtube.defaults.params = {
    key: process.env.YOUTUBE_API_KEY,
    channelId: process.env.YOUTUBE_CHAN_ID,
    maxResults: 10,
};
