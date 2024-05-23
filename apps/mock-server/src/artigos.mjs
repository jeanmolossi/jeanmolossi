import jsonServer from 'json-server';

const router = jsonServer.router('./src/artigos.json');
export { router };
