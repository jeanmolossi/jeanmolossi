import logger from '@/config/logger/logger';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    logger.info('pong');
    return NextResponse.json({ response: 'pong' });
}
