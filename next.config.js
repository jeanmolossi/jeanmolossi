const headers = require('./src/config/security-headers')

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: [
            'res.cloudinary.com',
            's3.amazonaws.com',
            'i.ytimg.com'
        ]
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
