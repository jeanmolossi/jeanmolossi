import jsonServer from 'json-server';

const router = jsonServer.router('./src/videos.json');
export { router };
