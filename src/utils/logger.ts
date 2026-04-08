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