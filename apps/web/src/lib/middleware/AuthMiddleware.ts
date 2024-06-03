import { NextRequest, NextResponse } from 'next/server';
import { generateToken, verifyToken } from '@/lib/auth/token';
import { parse } from './utils';
import { AUTH_TOKEN_EXPIRES_IN, AUTH_TOKEN_MAX_AGE } from '@jeanmolossi/utils';

export async function AuthMiddleware(req: NextRequest) {
    const { key } = parse(req);
    const authToken = req.cookies.get('auth-token')?.value;
    const refreshToken = req.cookies.get('refresh-token')?.value;

    const response = NextResponse.next();

    if (authToken) {
        try {
            await verifyToken(authToken);

            if (key === 'login') {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }

            return response;
        } catch (e) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    if (refreshToken && key === 'dashboard') {
        try {
            await verifyToken(refreshToken);

            const authToken = await generateToken(
                { user: 'jeanmolossi' },
                AUTH_TOKEN_EXPIRES_IN,
            );

            response.cookies.set('auth-token', authToken, {
                httpOnly: true,
                maxAge: AUTH_TOKEN_MAX_AGE,
                sameSite: 'strict',
                secure: process.env.VERCEL_ENV === 'production',
            });

            return response;
        } catch (e) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    if (key === 'login') {
        return response;
    }

    return NextResponse.redirect(new URL('/login', req.url));
}
