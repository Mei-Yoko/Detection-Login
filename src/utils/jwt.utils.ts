import { sign, verify } from 'jsonwebtoken';  

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}


/**
 * build Access Token (JWT)
 * @param payload - collect in token
 * @returns JWT token string
 */
export const generateAccessToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET not defined in env variables');
  }

  
  return sign(payload, secret, {expiresIn: '24h'});
};



/**
 * build Refresh Token
 * @param payload - collect in token
 * @returns Refresh token string
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET not defined');
  }
    return sign(payload, secret, {expiresIn: '7d'});
};
/**
 * check decode JWT token
 * @param token - JWT token 
 * @returns Decoded payload or null for invalid
 */
export const verifyAccessToken = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = verify(token, secret);
    
    // Type guard
    if (typeof decoded === 'string') {
      return null;
    }
    
    return decoded as JWTPayload;
  } catch (error) {
    return null;
  }
};

/**
 * check Refresh Token
 * @param token - Refresh token
 * @returns Decoded payload or null
 */
export const verifyRefreshToken = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET not defined');
    }

    const decoded = verify(token, secret);
    
    if (typeof decoded === 'string') {
      return null;
    }
    
    return decoded as JWTPayload;
  } catch (error) {
    return null;
  }
};


/**
 * build token pair (access + refresh)
 * @param payload - User data
 * @returns Object containing both tokens
 */
export const generateTokenPair = (payload: JWTPayload): {
    accessToken: string;
    refreshToken: string;
  } => {
    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload)
    };
  };