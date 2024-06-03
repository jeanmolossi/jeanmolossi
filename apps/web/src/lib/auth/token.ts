import { Api } from '@/config/constants';
import { importPKCS8, importSPKI, SignJWT, jwtVerify } from 'jose';

type SessionPayload = Record<string, string>;

const ALGORITHM = 'RS256';

export async function generateToken(
    payload: SessionPayload,
    expiresIn: string,
) {
    const { PRIVATE_KEY } = Api();
    const privateKeyStr = Buffer.from(PRIVATE_KEY, 'base64').toString('ascii');

    const privateKey = await importPKCS8(privateKeyStr, 'RS256');

    return await new SignJWT(payload)
        .setProtectedHeader({ typ: 'JWT', alg: ALGORITHM })
        .setIssuer('own')
        .setSubject('jeanmolossi')
        .setExpirationTime(expiresIn)
        .sign(privateKey);
}

export async function verifyToken(token: string) {
    const { PUBLIC_KEY } = Api();
    const publicKeyStr = Buffer.from(PUBLIC_KEY, 'base64').toString('ascii');

    const publicKey = await importSPKI(publicKeyStr, 'RS256');

    return await jwtVerify(token, publicKey, {
        issuer: 'own',
        subject: 'jeanmolossi',
    });
}
