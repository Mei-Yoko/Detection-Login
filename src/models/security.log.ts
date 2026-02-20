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

SecurityLogSchema.index(
    {timeStamp: 1},
    {}
);
