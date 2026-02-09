import mongoose, { Model, Schema } from "mongoose";
import { ILoginAttempts } from "../types";

interface LoginAttemptModel extends Model<ILoginAttempts> {
    countFailedAttempts(ipAddress: string, minutes?: number): Promise<number>;
  }
  
const LoginAttemptSchema = new Schema<ILoginAttempts>({
    // Email ที่พยายาม login
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    // IP Address ที่พยายาม login
    ipAddress:{
        type: String,
        required: true
    },
    //user agent
    userAgent:{
        type: String,
        default: 'Unknown'
    },
    // Login สำเร็จหรือไม่
    success: {
        type: Boolean,
        required: true,
        default: false
    },

    // เหตุผลที่ login ไม่สำเร็จ
    failureReson:{
        type: String,
        enum: [
            'invalid_credentials',
            'account_locked',
            'account_inactive',
            'ip_blocked',
            'rate_limited' 
        ]
    },
    // เวลาที่พยายาม login
    timeStamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    // Location data
    location: {
        country: String,
        city: String
      }
    },
    {
      timestamps: true
    });

LoginAttemptSchema.index({email: 1, timeStamp: -1});
LoginAttemptSchema.index({ipAddress: 1, timeStamp: -1});
LoginAttemptSchema.index({success: 1});
LoginAttemptSchema.index({timeStamp: -1});

//delete old data after 90 days
LoginAttemptSchema.index({timeStamp: 1},{expireAfterSeconds: 90 * 24 * 60 * 60});

//static methods
/**
 * count fault IP in timeframe 
 */
LoginAttemptSchema.statics.countFailedAttempts = async function (ipAddress: string,minutes: number = 15): Promise<number>
 
   {const since = new Date(Date.now() - minutes * 60 * 1000);
    return this.countDocuments({
      ipAddress,
      success: false,
      createdAt: { $gte: since }
    });
  };
  
  //Export Model
  export const LoginAttempt = mongoose.model<ILoginAttempts,LoginAttemptModel>('LoginAttempt',LoginAttemptSchema);
