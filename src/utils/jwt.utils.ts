import jwt from 'jsonwebtoken';
import { JWTpayload } from '../types';

/**
 * Access token (JWT)
 * @param payload -data collect in token
 * @returns JWT Token string
 */
export const generateAccessToken = (payload:JWTpayload): string =>{
    const secret =
}