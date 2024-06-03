'use server';

import { Api } from '@/config/constants';
import { AUTH_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from '@jeanmolossi/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const __PROD__ = process.env.NODE_ENV === 'production';

export async function login(data: FormData) {
    const secret = data.get('password');

    const { BASE_URL } = Api();

    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: 'POST',
        body: JSON.stringify({ secret }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        return redirect('/login?error=' + encodeURIComponent(message));
    }

    const { authToken, refreshToken } = await response.json();

    const cookieStore = cookies();
    cookieStore.set('auth-token', authToken, {
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

    return redirect('/dashboard');
}
