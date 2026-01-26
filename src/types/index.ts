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
    
}