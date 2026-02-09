"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String, required: true,
        unique: true, lowercas: true, trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [5, 'Username must be least 5'],
        maxlength: [30, 'Username  max exceed 30']
    },
    password: {
        type: String,
        requried: true,
        minlength: [12, 'Password must least 12'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    //Account Status
    isActive: {
        type: Boolean,
        default: true
    },
    //Account Locked
    isLocked: {
        type: Boolean,
        default: false
    },
    //login time
    lockUntil: {
        type: Date,
        default: null
    },
    //count login attempt
    failedLoginAttempt: {
        type: Number,
        default: 0
    },
    //loginผิดครั้งล่าสุด
    lastFailedLogin: {
        type: Date
    }
}, {
    timestamps: true
});
//index performance
UserSchema.index({ email: 1 }),
    UserSchema.index({ username: 1 }),
    UserSchema.index({ isLocked: 1, lockUntil: 1 });
// Middleware Hashpass
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    this.password = await bcryptjs_1.default.hash(this.password, saltRounds);
});
//เทียบ password กับ database
UserSchema.methods.comparePassword = async function (userPassword) {
    try {
        return await bcryptjs_1.default.compare(userPassword, this.password);
    }
    catch (error) {
        throw new Error('Error Compare Password');
    }
};
/*
  เพิ่มจำนวนครั้งที่ login ผิด
  ถ้าเกินจำนวนที่กำหนด จะล็อค account
 */
UserSchema.methods.incrementLoginAttempts = async function () {
    //ถ้าaccount lock จะปลดเวลา
    if (this.lockUntil && this.lockUntil < new Date()) {
        return await this.updateOne({
            $set: { failedLoginAttempts: 1, lastFailedLogin: new Date() },
            $unset: { lockUntil: 1, isLocked: 1 }
        });
    }
    //failed attempts
    const updates = {
        $inc: { failedLoginAttempts: 1 },
        $set: { lastLoginAttempts: new Date() }
    };
    //ตรวจสอบ max attempt
    const maxAttempt = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5');
    const lockTime = parseInt(process.env.LOCK_TIME || '10');
    //Lockin เกิน account lock
    if (this.failedLoginAttempts + 1 >= maxAttempt && !this.isLockedlock) {
        updates.$isLocked = true;
        updates.$lockUntil = new Date(Date.now() + lockTime * 60 * 1000);
    }
    await this.updateOne(updates);
};
/*
*reset n login to 0
*Call when login complete
*/
UserSchema.methods.resetLoginAttempts = async function () {
    await this.upadateOne({
        //use when login complete
        $set: { failedLoginAttempts: 0, lastSuccessfulLogin: new Date() },
        $unset: { lastUntil: 1, isLocked: 1, lastFailedLogin: 1 }
    });
};
//Check if Account is Currently Locked
UserSchema.virtual('isCurrentlyLocked').get(function () {
    //Account lock but not times up
    return (this.isLocked && this.lockUntil && this.lockUntil > new Date());
});
//export model
exports.User = mongoose_1.default.model('User', UserSchema);
