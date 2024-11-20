const PORT = process.env.PORT || 3000;

export const APP_HOSTNAMES = new Set([`jeanmolossi.com.br`, `localhost:${PORT}`]);

export const APP_DOMAIN =
    process.env.NODE_ENV === 'production'
        ? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
        : `http://localhost:${PORT}`;
