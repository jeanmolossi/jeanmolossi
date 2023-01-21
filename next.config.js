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
    }
}

module.exports = nextConfig
