import mongoose,{Schema} from "mongoose";
import { ISecurityLog, SecurityEventType } from "../types";

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
            
        }

})


