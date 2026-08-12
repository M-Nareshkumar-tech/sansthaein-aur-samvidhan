import { SignJWT, jwtVerify } from 'jose';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Retrieves and validates the JWT symmetric signature secret.
 * Throws a fatal initialization error if undefined or blank.
 */
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim() === '') {
    throw new Error('FATAL: JWT_SECRET environment variable is missing.');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Signs payload data into a symmetric HS256 JWT string.
 * Fails closed by throwing a fatal error if config secrets are missing.
 */
export async function signToken(payload: JWTPayload): Promise<string> {
  const key = getJwtSecret();
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

/**
 * Verifies and parses token signature claims.
 * Fails closed by returning null if signature verification fails or if secrets are missing.
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const key = getJwtSecret();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as JWTPayload;
  } catch (error) {
    console.error('verifyToken claims extraction failed:', error);
    return null;
  }
}
