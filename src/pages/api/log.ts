import { cors } from '@/infrastructure';
import { Logger } from '@/infrastructure/logger';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    await cors(request, response);

    let body: any = {
        level: 'info',
    };

    if (typeof request.body === 'string') {
        try {
            body = JSON.parse(request.body);
        } catch {}
    }

    const log = Logger.init(request);

    switch (body.level) {
        case 'warn':
            log.warn(body.message || 'received');
        case 'error':
            log.error(body.message || 'received');
        case 'info':
        default:
            log.info(body.message || 'received');
    }

    response.status(202).json({ event: 'received' });
    return;
}
