import jsonServer from 'json-server';

const router = jsonServer.router('./src/playlists.json');
export { router };
