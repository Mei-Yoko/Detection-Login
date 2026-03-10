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
  
