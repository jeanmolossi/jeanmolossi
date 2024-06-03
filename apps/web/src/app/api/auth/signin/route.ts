import { Api } from '@/config/constants';
import { generateToken } from '@/lib/auth/token';
import {
    AUTH_TOKEN_EXPIRES_IN,
    AUTH_TOKEN_MAX_AGE,
    REFRESH_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_MAX_AGE,
} from '@jeanmolossi/utils';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const __PROD__ = process.env.NODE_ENV === 'production';

export async function POST(request: NextRequest) {
    const { SECRET } = Api();

    const body = await request.json();

    if (SECRET !== body.secret) {
        return NextResponse.json(
            { message: 'Credenciais inválidas' },
            { status: 401 },
        );
    }

    const sessionToken = await generateToken(
        { user: 'jeanmolossi' },
        AUTH_TOKEN_EXPIRES_IN,
    );
    const refreshToken = await generateToken(
        { user: 'jeanmolossi' },
        REFRESH_TOKEN_EXPIRES_IN,
    );

    const cookieStore = cookies();
    cookieStore.set('auth-token', sessionToken, {
        path: '/',
        maxAge: AUTH_TOKEN_MAX_AGE,
        sameSite: 'strict',
        secure: __PROD__,
    });

    cookieStore.set('refresh-token', refreshToken, {
        path: '/',
        maxAge: REFRESH_TOKEN_MAX_AGE,
        sameSite: 'strict',
        secure: __PROD__,
    });

    const response = new Response(
        JSON.stringify({
            authToken: sessionToken,
            refreshToken,
        }),
    );

    return response;
}
