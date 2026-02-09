import mongoose, { Schema } from "mongoose";
import { ILoginAttempts } from "../types";

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

    location: {

    }









})