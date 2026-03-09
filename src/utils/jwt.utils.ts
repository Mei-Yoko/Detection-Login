import { sign, verify } from 'jsonwebtoken';  

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}


/**
 * สร้าง Access Token (JWT)
 * @param payload - ข้อมูลที่ต้องการเก็บใน token
 * @returns JWT token string
 */
export const generateAccessToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  
  return sign(payload, secret, {expiresIn: '24h'});
};



/**
 * สร้าง Refresh Token
 * @param payload - ข้อมูลที่ต้องการเก็บใน token
 * @returns Refresh token string
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }

  return sign(payload, secret, {expiresIn: '7d' });
};
/**
 * ตรวจสอบและ decode JWT token
 * @param token - JWT token ที่ต้องการตรวจสอบ
 * @returns Decoded payload หรือ null ถ้า invalid
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
 * ตรวจสอบ Refresh Token
 * @param token - Refresh token
 * @returns Decoded payload หรือ null
 */
export const verifyRefreshToken = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not defined');
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
 * สร้าง token pair (access + refresh)
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