import { SecurityLog } from "../models/SecurityLog.model";
import { SecurityEventType } from "../types";

/**
 * Detect Log Success
 */
export const logLoginSuccess = async(
    userId: string,
    email: string,
    ipAddress: string,
    userAgent: string): Promise<void> => { await SecurityLog.logEvent(SecurityEventType.LOGIN_SUCCESS,{
        userId,
        email,
        ipAddress,
        userAgent,
        description: `User ${email} logged in successfully`,
        severity: 'low'
    });
    };
    
/**
 * Detect login failed
 */
export const logLoginFailure = async(
    email: string,
    ipAddress: string,
    reason: string,
    userAgent?: string ): Promise<void> => { await SecurityLog.logEvent(SecurityEventType.LOGIN_FAILED,{
        email,
        ipAddress,
        userAgent,
        description: `Failed login attempt for ${email}: ${reason}`,
        severity: `medium`
    });
};
/**
 * Detect Suspiciou activity
 */
export const logSuspiciousActivity = async(
    email: string,
    ipAddress: string,
    description: string,
    metadata: any
):Promise<void> =>{
    await SecurityLog.logEvent(SecurityEventType.SUSPICIOUS_ACTIVITY,{
        email,
        ipAddress,
        description,
        severity:`high`,
        metadata
    });
};