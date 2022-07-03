import os from 'os';
import pino from 'pino';
import { randomUUID } from 'crypto';

const logger = pino(
    {
        base: {
            environment: process.env.NODE_ENV,
            pid: process.pid,
            hostname: os.hostname(),
        },
        level: 'info',
        messageKey: 'message',
        formatters: {
            level: level => ({ level }),
            log: options => ({
                ...options,
                'transaction-id': randomUUID(),
            }),
        },
        timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
    },
    process.stdout,
);

export default logger;
