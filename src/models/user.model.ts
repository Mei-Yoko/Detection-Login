import  mongoose,{Schema}  from "mongoose";
import bcrypt from 'bcryptjs';
import { Iuser } from "../types";

const UserSchema = new Schema<Iuser>({
    
    email: {
        type: String,required:true,
        unique: true,lowercas:true,trim:true, 
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please provide a valid email']
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength:[5,'Username must be least 5'],
        maxlength:[30,'Username  max exceed 30']
    },

    password:{
        type: String,
        requried: true,
        minlength:[12,'Password must least 12'],
        select: false
    },

    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },

    //Account Status
    isActive: {
        type: Boolean,
        default: true
    },

    //Account Locked
    isLocked:{
        type: Boolean,
        default: false
    },

    //login time
    lockUntil:{
        type: Date,
        default: null
    },

    //count login attempt
    failedLoginAttempt:{
        type: Number,
        default: 0
    },

    //loginผิดครั้งล่าสุด
    lastFailedLogin: {
        type: Date
    }
},{
    timestamps: true
});

//index performance
UserSchema.index({email: 1}),
UserSchema.index({username: 1}),
UserSchema.index({isLocked: 1, lockUntil: 1 });

// Middleware Hashpass
UserSchema.pre('save', async function () {
    
    if (!this.isModified('password')) {
      return ;
    }
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
      this.password = await bcrypt.hash(this.password, saltRounds);
  });

//เทียบ password กับ database
UserSchema.methods.comparePassword = async function(userPassword:string): Promise<boolean>{
    try{
        return await bcrypt.compare(userPassword, this.password)
    }catch(error){
        throw new Error('Error Compare Password');
    }
};

/*
  เพิ่มจำนวนครั้งที่ login ผิด
  ถ้าเกินจำนวนที่กำหนด จะล็อค account
 */
UserSchema.methods.incrementLoginAttempts = async function (): Promise<void> {
    //ถ้าaccount lock จะปลดเวลา
    if(this.lockUntil && this.lockUntil < new Date()){
        return await this.updateOne({
            $set: {failedLoginAttempts: 1, lastFailedLogin: new Date()},
            $unset:{lockUntil: 1, isLocked: 1}
        });
    }
    //failed attempts
    const updates: any ={
        $inc:{failedLoginAttempts: 1},
        $set:{lastLoginAttempts: new Date()}
    };
    //ตรวจสอบ max attempt
    const maxAttempt = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5')
    
}
 