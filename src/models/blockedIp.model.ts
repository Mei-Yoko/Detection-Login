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

//delete Ip timeout
BlockedIPSchema.index({blockedUntil: 1}, {expireAfterSeconds: 0});

//check Ip has been block
BlockedIPSchema.statics.isBlocked = async function(ipAddress: string): Promise<boolean>{
    const blocked = await this.findOne({
        ipAddress,
        isActive: true,
        blockedUntil: { $get: new Date() }
    });
    return !!blocked;
};

BlockedIPSchema.statics.blockIP = async function (
    ipAddress: string,
    durationMinutes: number,
    attemptCount: number = 0
  ): Promise<IBlockIP> {

    const blockedUntil = new Date(Date.now() + durationMinutes * 60 * 1000);

    const existing = await this.findOne({ipAddress});
    
    if(existing){
        existing.blockedUntil = blockedUntil;
        existing.attempCount +=  attemptCount ?? 1;
        existing.isActive = true;
        existing.blockedAt = new Date();
        return await existing.save();
    }
    //build new one
    return await this.create({
        ipAddress,
        blockedUntil,
        attempCount: attemptCount ?? 1,
        isActive: true,
        blockedAt: new Date(),
        reason:'Too many failed login attempt'
    });
};

//unlockIP
BlockedIPSchema.statics.unblockIP = async function (ipAddress: String): Promise<void> {
    await this.updateOne({ipAddress},{$set:{isActive: false}});
}

BlockedIPSchema.statics.getBlockedList = async function () {
  return await this.find({
    isActive: true,
    blockedUntil: {$gt: new Date()}
  })
  
}