import { SecurityLog } from "../models/SecurityLog.model";
import { SecurityEventType } from "../types";

/**
 * Detect Log Success
 */
export const logLoginSuccess = async(
    userId: string,
    email: string,
    ipAddress: string,
    userAgent: string): Promise<void> => {}