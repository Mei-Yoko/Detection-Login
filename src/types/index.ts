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
    
}