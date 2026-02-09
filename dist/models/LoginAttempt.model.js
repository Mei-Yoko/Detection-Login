"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LoginAttemptSchema = new mongoose_1.Schema({
    // Email ที่พยายาม login
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    // IP Address ที่พยายาม login
    ipAddress: {
        type: String,
        required: true
    },
    //user agent
    userAgent: {
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
    failureReson: {
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
    },
}, {
    timestamps: true
});
LoginAttemptSchema.index({ email: 1, timeStamp: -1 });
LoginAttemptSchema.index({ ipAddress: 1, timeStamp: -1 });
