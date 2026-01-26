import {Document, DocumentSetOptions} from 'mongoose';

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


comparePassword(candidatePassword: string): Promise<boolean>;
incrementLoginAttempts(): Promise<void>;
resetLoginAttempts(): Promise<void>;
}

export interface ILoginAttempts extends Document{
    email: string;
    ipAddress: string;
    userAgent: string;
    success: boolean;
    failureReson?: string;
    timeStamp: Date;
    location?: { country?: string; city?: string; };   
}

export interface IBlockIP extends Document{
    ipAddress: string;
    reason: string;
    blockedAt: Date;
    blockedUntil: Date;
    attempCount: number;
    isActive: boolean;
}

export enum SecurityEventType{
    Login_Success = 'login_Success', Login_Failed = 'login_Fail',
    Account_Locked = ' Account_Locked', Account_UnLocked = 'Account_UnLocked',
    Ip_Bloked = 'Ip_Blocked', Ip_UnBlocked = 'Ip_UnBlocke',
    Brute_Force_Detect = 'Brute_Force_Detect', Password_Change = 'Password_Change',
    Suspicious_Activity = 'Suspicious_Activity'
}