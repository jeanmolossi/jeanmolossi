import BundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = BundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const SUPABASE = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: SUPABASE.protocol.substring(0, 5),
                hostname: SUPABASE.hostname,
                port: SUPABASE.port,
                pathname: '/**'
            },
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
        ],
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer-when-downgrade',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                ],
            },
        ];
    },
};

export default withBundleAnalyzer(nextConfig);
