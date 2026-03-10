import mongoose,{Schema} from "mongoose";
import { ISecurityLog, SecurityEventType } from "../types";
import { timeStamp } from "console";

const SecurityLogSchema = new Schema <ISecurityLog>(
    {
        //event type
        eventType:{
            type: String,
            required: true,
            enum: Object.values(SecurityEventType)
        },
        //user
        userId:{
            type: String
        },
         // IP Address
        ipAddress: {
        type: String,
        required: true
        },
        //userAgent
        userAgent: {
            type: String
        },
        //descrip
        description: {
            type: String,
            required: true
        },
        //level aware
        severaity: {
            enum:['low','medium','high','critical'],
            default: 'low',
            required: true
        },
        //event
        timeStamp:{
            type: Date,
            default: Date.now,
            required: true
        },
        //meta data
        metadata:{
            type: Schema.Types.Mixed
        }
    },{
        timestamps: true
    }
);

//index
SecurityLogSchema.index({ eventType: 1, timeStamp: -1});
SecurityLogSchema.index({ userId: 1, timeStamp: -1});
SecurityLogSchema.index({ ipAddress: 1, timeStamp: -1});
SecurityLogSchema.index({ severity: 1, timeStamp: -1});
SecurityLogSchema.index({ timeStamp: -1});

//delete old logs
SecurityLogSchema.index(
    {timeStamp: 1},
    {expireAfterSeconds: 180 * 24 * 60 * 60} // 180 days
);

interface LogEventPayload {
    userId?: string;
    email?: string;
    ipAddress: string;
    userAgent?: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    metadata?: any;
  }

SecurityLogSchema.statics.logEvent = async function (
    eventType: SecurityEventType,
    data: LogEventPayload
  ) {
    return this.create({
      eventType,
      ...data,
      timeStamp: new Date(),
    });
  };
  
//pull recent security events
SecurityLogSchema.statics.getRecentEvents = async function (limit: number = 50) {
    return await this.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('eventType email ipAddress severity description timestamp');
  };

//pull critical events
SecurityLogSchema.statics.getCriticalEvents = async function (userId: string,limit: number = 100) 
{
    return await this.find({userId}).sort({timeStamp: -1}).limit(limit);
}

//Pull event Ip address
SecurityLogSchema.statics.getIPEvents = async function (ipAddress: string,limit: number = 100)
{
    return await this.find({ipAddress}).sort({timeStamp: -1}).limit(limit);
};

SecurityLogSchema.statics.getEventStats = async function (hoursBack: number = 24){
    const since = new Date(Date.now() - hoursBack *60*60*1000);

    return await this.aggregate([
        {$match: {timesamp: {$gte: since}}},
        {
            $group: {
                _id: '$eventType',
                count: { $sum: 1 }
        }
    },
    { $sort: { count: -1 } }
    ]);
};

