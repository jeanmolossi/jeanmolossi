const headers = require('./src/config/security-headers')

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },

    poweredByHeader: false,
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },

    images: {
        loader: 'custom',
        loaderFile: !isProd ? './src/lib/local-strapi-loader.js' : './src/lib/prod-strapi-loader.js',

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'media.dev.to',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 's3.amazonaws.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**'
            },
            {
                protocol: 'https',
                hostname: '*.easypanel.host',
                port: '',
                pathname: '/uploads/**'
            },
            {
                protocol: 'https',
                hostname: '*.jeanmolossi.com.br',
                port: '',
                pathname: '/uploads/**'
            }
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers,
            }
        ]
    }
}

module.exports = nextConfig
