import {Document, DocumentSetOptions} from 'mongoose';

//user
export interface Iuser extends Document{
    email: string;
    password: string;
    username: string;
    role: 'user' | 'admin';
    isActive: boolean;
    isLocked: boolean;
    lockUntil: Date;
    failedLoginAttempt: number;
    lastFailedLogin: Date;
    lastSuccessfulLogin: Date;
    createdAt: Date;
    updateAt: Date;

//method
comparePassword(candidatePassword: string): Promise<boolean>;
incrementLoginAttempts(): Promise<void>;
resetLoginAttempts(): Promise<void>;
}

//login attempt type
export interface ILoginAttempts extends Document{
    email: string;
    ipAddress: string;
    userAgent: string;
    success: boolean;
    failureReson?: string;
    timeStamp: Date;
    location?: { country?: string; city?: string; };   
}

//block ip
export interface IBlockIP extends Document{
    ipAddress: string;
    reason: string;
    blockedAt: Date;
    blockedUntil: Date;
    attempCount: number;
    isActive: boolean;
}

//security log
export enum SecurityEventType{
    Login_Success = 'login_Success', Login_Failed = 'login_Fail',
    Account_Locked = ' Account_Locked', Account_UnLocked = 'Account_UnLocked',
    Ip_Bloked = 'Ip_Blocked', Ip_UnBlocked = 'Ip_UnBlocke',
    Brute_Force_Detect = 'Brute_Force_Detect', Password_Change = 'Password_Change',
    Suspicious_Activity = 'Suspicious_Activity'
}

export interface ISecurityLog extends Document{
    eventType: SecurityEventType;
    userId?: string;
    email?: string;
    ipAddress: string;
    userAgent?: string;
    description: string;
    severaity: 'low' | 'medium' | 'high' | 'critical';
    timeStamp: Date;
    metadata?: any;
}

//register,request
export interface ResgisterRequest{
    email: string;
    username: string;
    password: string;
}

export interface LoginRequest{
    email: string;
    password: string;
}

export interface AuthResponse{
    success: boolean;
    message: string;
    token?: string;
    refreshToken?: string;
    user?: {
        id: string;
        email: string;
        username: string;
        role: string;
    };
}

export interface SecurityDashboard{
    totalLoginAttempts: number;
    failedAttempts: number;
    successfulLogins: number;
    blockedIp: number;
    lockedAccounts: number;
    recentEvents: number;
    topAttackers: { ipAddress: string; attemptsr: string;}[];
}

//middleware
export interface JWTpayload {
    userId: string;
    email: string;
    role: string;
}

//request extension
declare global{
    namespace Express{
        interface Request {user?: {userId: string; email: string; role: string;};
    }
}
}
