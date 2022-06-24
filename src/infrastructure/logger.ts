import { randomUUID } from 'crypto';
import { NextApiRequest } from 'next';
import pino, { Logger as PinoLogger, LoggerOptions } from 'pino';
import os from 'os';
import { NextWebVitalsMetric } from 'next/app';

interface Context {
    index: string;
    transactionId?: string;
    level?: 'debug' | 'info' | 'warning' | 'error' | 'critical';
    http?: {
        request?: {
            userAgent?: string;
            path?: string;
        };
    };
    webVitals?: WebVitals;
}

export class Logger {
    private context: Context = {} as any;
    private logger: PinoLogger<LoggerOptions>;

    private constructor(context: Context = {} as any) {
        this.context = context;
        const transactionId = context.transactionId;
        delete context.transactionId;

        this.logger = pino<LoggerOptions>(
            {
                base: {
                    env: process.env.NODE_ENV,
                    pid: process.pid,
                    hostname: os.hostname(),
                },
                level: 'info',
                messageKey: 'message',
                formatters: {
                    level: level => ({ level }),
                    log: options => ({
                        ...options,
                        ...context,
                        'transaction-id': transactionId || randomUUID(),
                    }),
                },
                timestamp: () =>
                    `,"time":"${new Date(Date.now()).toISOString()}"`,
            },
            process.stdout,
        );
    }

    static init(request: NextApiRequest) {
        let path = request.url;
        let body = {};

        if (typeof request.body === 'string') {
            try {
                const unparseBody = JSON.parse(request.body);
                body = unparseBody;
                path = unparseBody.url;
            } catch {}
        }

        const ctx: Context = {
            transactionId: request.headers['x-transaction-id'] as string,
            http: {
                request: {
                    userAgent: request.headers['user-agent'] as string,
                    path,
                },
            },
            webVitals: webVitalsToContext(request.body),
            index: `${process.env.INDEX_NAME!}-${process.env.NODE_ENV}`,
        };

        return new Logger(ctx);
    }

    info(message: string, ...args: any[]) {
        this.logger.info({ ...args, ...this.context }, message);
    }

    warn(message: string, ...args: any[]) {
        this.logger.warn({ ...args, ...this.context }, message);
    }

    error(message: string, ...args: any[]) {
        this.logger.error({ ...args, ...this.context }, message);
    }
}

enum webVitalEvent {
    TTFB = 'Time to First Byte',
    FCP = 'First Contentful Paint',
    LCP = 'Largest Contentful Paint',
    FID = 'First Input Delay',
    CLS = 'Cumulative Layout Shift',
    custom = 'Custom Event',
}

interface WebVitals {
    event: webVitalEvent;
    startTime: number;
    value: number;
}

function webVitalsToContext(metrics: string): WebVitals | undefined {
    let metric: NextWebVitalsMetric = {} as any;

    try {
        metric = JSON.parse(metrics);
    } catch {}

    if (!metric.id || metric.label !== 'web-vital') {
        return undefined;
    }

    const isWebVital = metric.label === 'web-vital';
    const event = webVitalEvent[isWebVital ? metric.name : 'custom'];
    const startTime = Math.round(metric.startTime);
    const value = Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value,
    );

    return {
        event,
        startTime,
        value,
    };
}
