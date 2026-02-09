import mongoose from "mongoose";
import { IBlockIP } from "../types";

//Block ip
const BlockedIPSchema =  new Schema<IBlockIP>(
{
     // IP Address
    ipAddress:{
        type: String,
        required: true,
        unique: true
    },
     // Reason
    reason:{
        type: String,
        required: true,
        default: 'Too many failed login attempts'
    }


);
