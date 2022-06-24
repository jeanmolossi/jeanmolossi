import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

export const cors = initMiddleware(
    Cors({
        methods: ['POST', 'OPTIONS'],
        allowedHeaders: 'x-transaction-id',
        origin: 'https://jeanmolossi.com.br,http://localhost:3000',
    }),
);

export function initMiddleware(middleware: any) {
    return (req: NextApiRequest, res: NextApiResponse) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result: any) => {
                if (result instanceof Error) {
                    return reject(result);
                }

                return resolve(result);
            });
        });
}
