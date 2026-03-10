import{LoginAttempt} from '../models/LoginAttempt.model';
import { BlockedIP } from '../models/BlockedIP.model';
import { SecurityLog } from '../models/SecurityLog.model';
import { SecurityEventType } from '../types';

/**
 * check for Ip is blocked or not
 * @param ipAddress -Ip for check
 * @returns true if blocked
 */
export const isIPBlocked = async (ipAddress: string): Promise<boolean> => {
    try {
      const record = await BlockedIP.findOne({ where: { ipAddress } });
      return !!record;
    } catch (error) {
      console.error('Error checking IP block status:', error);
      return false;
    }
  };

  /**
  * login attempt
  * @param email - Email try to login
  * @param ipAddress - IP address
  * @param success - Login success or not
  * @param userAgent - Browser/device info
  * @param failureReason - reason for failed
  */
 export const recordLoginAttempt = async (
   email: string,
   ipAddress: string,
   success: boolean,
   userAgent?: string,
   failureReson?: 'invalid_credentials' | 'account_locked' | 'account_inactive' | 'ip_blocked' | 'rate_limited'
 ): Promise<void> => {
   await LoginAttempt.create({
     email,
     ipAddress,
     success,
     userAgent,
     failureReson,
   });
 };
  
