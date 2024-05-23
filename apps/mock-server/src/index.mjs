import jsonServer from 'json-server';
import { router as postsRouter } from './artigos.mjs';

const server = jsonServer.create();
const router = jsonServer.router('./src/data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
    jsonServer.rewriter({
        '/artigos/:id': '/artigos/data/:id',
    }),
);

server.use('/', postsRouter);

server.use(router);

const port = process.env.PORT || 9997;

server.listen(port, () => {
    console.log('JSON Server is running on port ' + port);
});
