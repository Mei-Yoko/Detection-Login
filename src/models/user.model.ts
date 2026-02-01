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

})