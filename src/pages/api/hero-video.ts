import fs from 'fs';
import { resolve } from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).json({ error: 'Missing range header' });
        return;
    }

    let videoName = 'Hud-22449';
    if (req.query.filename && Array.isArray(req.query.filename)) {
        videoName = req.query.filename[0];
    }

    if (req.query.filename && typeof req.query.filename === 'string') {
        videoName = req.query.filename;
    }

    if (
        req.headers['user-agent']?.includes('Android') ||
        req.headers['user-agent']?.includes('iPhone')
    ) {
        videoName += '_sm';
    } else {
        videoName += '_lg';
    }

    videoName = videoName.replace(/[\.\\/]*/gi, '').trim();

    let videoPath = `/videos/${videoName}.mp4`;

    if (process.env.NODE_ENV === 'development') {
        videoPath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'public',
            'videos',
            `${videoName}.mp4`,
        );
    }

    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 1024 * 512; // 512KB
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const rangeHeader = `bytes ${start}-${end}/${videoSize}`;

    const headers = {
        'Content-Range': rangeHeader,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
}
