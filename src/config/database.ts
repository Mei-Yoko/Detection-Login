import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
    try{
        // ดึง MongoDB URI
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/secure_login_db';
        // เชื่อมต่อกับ MongoDB
        const conn = await mongoose.connect(mongoUri);

        console.log(`MongoDB Connect: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);

        mongoose.connection.on('error', (err) => {
            console.log('Mongo Connection Error', err);
        });

        mongoose.connection.on('disconnected',() => {
            console.log('Mongo Disconected');
        });

        process.on('SIGINT', async () =>{
            await mongoose.connection.close();
            console.log('Mongo Shutdown by terminal');
            process.exit(0);
        });

    }
}