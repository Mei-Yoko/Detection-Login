import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
    try{
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/secure_login_db';
        const conn = await mongoose.connect(mongoUri);
    }
}