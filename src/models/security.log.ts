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
})