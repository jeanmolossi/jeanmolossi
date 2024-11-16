import type { NextConfig } from 'next';
import BundleAnalyzer from '@next/bundle-analyzer';
import { remotePatterns } from './src/config/remote-patterns';
const withBundleAnalyzer = BundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,

    images: {
        remotePatterns: remotePatterns(),
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
