import jsonServer from 'json-server';
import { router as articlesRouter } from './artigos.mjs';
import { router as playlistsRouter } from './playlists.mjs';
import { router as videosRouter } from './videos.mjs';

const server = jsonServer.create();
const router = jsonServer.router('./src/data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
    jsonServer.rewriter({
        '/api/artigos*': '/artigos/artigos$1',
        '/api/playlists*': '/playlists/playlists$1',
        '/api/videos*': '/videos/videos$1',
    }),
);

server.use('/artigos', articlesRouter);
server.use('/playlists', playlistsRouter);
server.use('/videos', videosRouter);

server.use(router);

const port = process.env.PORT || 9997;

server.listen(port, () => {
    console.log('JSON Server is running on port ' + port);
});
