import mongoose, { Schema } from 'mongoose';
import { IBlockIP } from '../types';

const BlockedIPSchema = new Schema<IBlockIP>(
  {
    //Ip address have been block
    ipAddress: {
      type: String,
      required: true,
      unique: true
    },
    //reason
    reason: {
      type: String,
      required: true,
      default: 'Too many failed login attempts'
    },
    // time block
    blockedAt: {
      type: Date,
      default: Date.now
    },
    //block till
    blockedUntil: {
      type: Date,
      required: true
    },
    // n try to login
    attempCount: {
      type: Number,
      default: 0
    },
    //(active/inactve)
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const BlockedIP = mongoose.model<IBlockIP>('BlockedIP',BlockedIPSchema);

//index
BlockedIPSchema.index({ipAddress: 1});
BlockedIPSchema.index({isActive: 1, BlockedIP: 1});
BlockedIPSchema.index({blockedUntil: 1});