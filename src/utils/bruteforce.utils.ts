import{LoginAttempt} from '../models/LoginAttempt.model';
import { BlockedIP, blockedIP } from '../models/BlockedIP.model';
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
 /**
  * Detect Brute Force Attack
  * Check failed login attempts in timeframe
  * @param ipAddress - Ip check
  * @returns
  */
 export const detectBruteForce = async(ipAddress: string): Promise<boolean> =>{
  try{
    const maxAttempts = parseInt(process.env.MAX_IP_ATTEMPTS || '10');
    const timeWindow = 15;

    //count failed attempt in pass 15 min
    const failedAttempts = await LoginAttempt.countFailedAttempts(ipAddress,timeWindow);

    //if login than limit setup = brute force
    if(failedAttempts >= maxAttempts){
      //block ip
      const blockedIP = new BlockedIP({
        ipAddress,
        failedAttempts,
      });
      await blockedIP.save();
  
      //write the security log
      await SecurityLog.logEvent(SecurityEventType.BRUTE_FORCE_DETECT,{
        ipAddress,
        description:`Brute force attack detected: ${failedAttempts} failed attempts in ${timeWindow} minutes`,
        severity: 'critical',
        metadata: {
          failedAttempts,
          timeWindow
        }
      });
      return true;
    }
      return false;
   }catch(error){
    console.error('Error brute force detection:', error);
    return false;
   }
  };
 
  
