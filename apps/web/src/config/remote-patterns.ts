import { RemotePattern } from 'next/dist/shared/lib/image-config';

const supabaseRemote = (): RemotePattern | undefined => {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!SUPABASE_URL) {
        return;
    }

    const protocol: 'http' | 'https' = SUPABASE_URL.substring(0, 5).replace(/:$/, '') as any;
    const scheme = `${protocol}://`;
    const hostname = SUPABASE_URL.replace(scheme, '').split('/').at(0) || '';
    const port = protocol === 'https' ? '443' : '80';

    return {
        protocol,
        hostname,
        port,
        pathname: '/**',
    };
};

export const remotePatterns = (): RemotePattern[] => {
    const patterns: RemotePattern[] = [
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'i.ytimg.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'media.dev.to',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 's3.amazonaws.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '1337',
            pathname: '/uploads/**',
        },
        {
            protocol: 'https',
            hostname: '*.easypanel.host',
            port: '',
            pathname: '/uploads/**',
        },
        {
            protocol: 'https',
            hostname: '*.jeanmolossi.com.br',
            port: '',
            pathname: '/uploads/**',
        },
    ];

    const supabaseRemoteConfig = supabaseRemote();
    if (supabaseRemoteConfig) {
        patterns.push(supabaseRemoteConfig);
    }

    return patterns;
};
